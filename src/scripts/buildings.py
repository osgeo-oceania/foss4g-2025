# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "shpyx",
#     "typer",
#     "geopandas",
#     "exactextract",
#     "numpy",
#     "rasterio"
# ]
# ///

from exactextract import exact_extract
from shapely.geometry import Point
import geopandas as gpd
from pathlib import Path
import pandas as pd
import numpy as np
import rasterio
import typer
import shlex
import shpyx
import json

BOUNDS_PATH = Path("src/data/bounds.geojson")
OUTPUT_PATH = Path("src/data/buildings.gpkg")

## input files
RAW_DATA_DIR = Path("src/data/raw/")
BUILDINGS_PATH = RAW_DATA_DIR / "lds-nz-building-outlines-GPKG.zip"
DEMDSM_DIR = RAW_DATA_DIR / "demdsm/"

## temporary files
TMP_DATA_DIR = Path("src/data/tmp/")
BUILDINGS_EXTRACT = TMP_DATA_DIR / "buildings-extract.gpkg"
BUILDINGS_INBUFFERED = TMP_DATA_DIR / "buildings-inbuffered.gpkg"
HEIGHT_RASTER = TMP_DATA_DIR / "height.tif"

LINZ_QUAD_IDS = ["BA31", "BA32"]

app = typer.Typer()


@app.command()
def build(gdal_path: str = "gdal"):
    TMP_DATA_DIR.mkdir(parents=True, exist_ok=True)

    ## extract subset of buildings data from nz buildings

    if not BUILDINGS_EXTRACT.exists():
        cmd = [
            f"{gdal_path} vector pipeline --progress",
            f'read --input "/vsizip/{BUILDINGS_PATH}/nz-building-outlines.gpkg"',
            f'clip --like "{BOUNDS_PATH}" --like-where "name=\'buildings\'"',
            f"write --overwrite --output-format=GPKG {BUILDINGS_EXTRACT}",
        ]

        shpyx.run(" ! ".join(cmd), log_cmd=True, log_output=True)

    ## build clipped & negative buffered buildings

    if not BUILDINGS_INBUFFERED.exists():
        cmd = [
            f"{gdal_path} vector pipeline --progress",
            f'read --input "{BUILDINGS_EXTRACT}"',
            # negative buffer 0.00002 deg (aprox 2m)
            "geom buffer --distance=-0.00002 --endcap-style=flat --join-style=mitre",
            'filter --where "OGR_GEOMETRY IS NOT NULL"',
            "geom set-type --multi",
            f"write --overwrite --output-format=GPKG {BUILDINGS_INBUFFERED}",
        ]

        shpyx.run(" ! ".join(cmd), log_cmd=True, log_output=True)

    ## height calculation dem-dsm

    if not HEIGHT_RASTER.exists():
        ## get bbox of buildings in epsg:2193
        bldgs_bounds = gpd.read_file(str(BUILDINGS_EXTRACT)).total_bounds

        corners_wgs84 = gpd.GeoDataFrame(
            geometry=[
                Point(bldgs_bounds[0], bldgs_bounds[1]),
                Point(bldgs_bounds[2], bldgs_bounds[3]),
            ],
            crs="EPSG:4326",
        )

        corners_2193 = corners_wgs84.to_crs("EPSG:2193")
        min_coords = corners_2193.geometry.iloc[0].coords[0]
        max_coords = corners_2193.geometry.iloc[1].coords[0]

        bounds_2193 = [min_coords[0], min_coords[1], max_coords[0], max_coords[1]]

        gdalgs = {
            # TODO bug with any other path than current directory
            "dem": Path(".") / "dem.gdalg.json",
            "dsm": Path(".") / "dsm.gdalg.json",
        }

        # make gdalgs for dem and dsm raster mosaics
        for demdsm in DEMDSM_DIR.glob("*/"):
            model = "dem" if "dem" in demdsm.stem else "dsm"
            tifs = list(demdsm.glob("**/*.tiff"))

            cmd = [
                f"{gdal_path} raster mosaic",
                "--overwrite",
                "--src-nodata -9999",
                "--dst-nodata -9999",
                f"--bbox={','.join([str(coord) for coord in bounds_2193])}",
                f'{" ".join([str(tif) for tif in tifs])}',
                f"{gdalgs[model]}",
            ]

            shpyx.run(" ".join(cmd), log_cmd=True, log_output=True)

        # calculate height and output
        cmd = [
            f"{gdal_path} raster calc",
            "--overwrite",
            "--output-format=GTiff",
            "--creation-option COMPRESS=DEFLATE",
            "--creation-option PREDICTOR=3",
            # subtract DSM from DEM; nodata is -9999
            f'--calc "((dsm>=0) && (dem>=0)) * (dsm - dem)"',
            " ".join([f'--input "{key}={val}"' for key, val in gdalgs.items()]),
            f"{HEIGHT_RASTER}",
        ]

        shpyx.run(" ".join(cmd), log_cmd=True, log_output=True)

    if not OUTPUT_PATH.exists():
        raster = rasterio.open(str(HEIGHT_RASTER))
        buildings = gpd.read_file(str(BUILDINGS_EXTRACT))

        buildings_inbuf = gpd.read_file(str(BUILDINGS_INBUFFERED))
        buildings_inbuf = buildings_inbuf[
            ~(buildings_inbuf.geometry.is_empty | buildings_inbuf.geometry.isna())
        ].to_crs("EPSG:2193")

        results = exact_extract(
            raster,
            buildings_inbuf,
            extract_building_height,
            include_cols=["building_id"],
            include_geom=False,
            progress=False,
            output="pandas",
        )

        buildings_result = gpd.GeoDataFrame(
            pd.merge(
                results.rename(columns={"extract_building_height": "height"}),
                buildings[["building_id", "geometry"]],
                on=["building_id"],
                how="left",
            )
        )

        buildings_result.to_file(str(OUTPUT_PATH), driver="GPKG")
        print(f"output {buildings_result}")


def extract_building_height(values, coverage_fractions):
    values = np.array(values)

    # remove invalid values
    valid_mask = np.isfinite(values) & (values >= 0)
    valid_values = values[valid_mask]

    # remove outliers
    if len(valid_values) >= 5:
        q1 = np.percentile(valid_values, 25)
        q3 = np.percentile(valid_values, 75)
        iqr = q3 - q1

        # outlier bounds
        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr

        # remove outliers
        outlier_mask = (valid_values >= lower_bound) & (valid_values <= upper_bound)
        cleaned_values = valid_values[outlier_mask]
    else:
        cleaned_values = valid_values

    if len(cleaned_values) < 1:
        return np.nan

    # use 98th percentile
    height_98th = np.percentile(cleaned_values, 98)

    return height_98th


@app.command()
def download():
    includes = [
        f'--include="*{model}_1m/2193/{quad_id}.tiff"'
        for model in ["dem", "dsm"]
        for quad_id in LINZ_QUAD_IDS
    ]

    cmd = [
        "aws s3 cp",
        "--recursive",
        "--no-sign-request",
        '--exclude="*"',
        " ".join(includes),
        "s3://nz-elevation/new-zealand/new-zealand/",
        str(DEMDSM_DIR),
    ]

    shpyx.run(" ".join(cmd), log_cmd=True, log_output=True)


@app.command()
def clean():
    for file in [BUILDINGS_EXTRACT, BUILDINGS_INBUFFERED, HEIGHT_RASTER, OUTPUT_PATH]:
        if file.exists():
            print(f"deleting {file}")
            file.unlink()


if __name__ == "__main__":
    app()
