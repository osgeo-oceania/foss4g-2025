# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "shpyx",
#     "typer",
#     "geopandas",
# ]
# ///

import geopandas as gpd
from pathlib import Path
import typer
import shpyx
import json

BOUNDS_PATH = Path("src/data/bounds.geojson")
TMP_DATA_DIR = Path("src/data/tmp/")
RAW_DATA_DIR = Path("src/data/raw/")
BUILDINGS_PATH = RAW_DATA_DIR / "lds-nz-building-outlines-GPKG.zip"
DEMDSM_DIR = RAW_DATA_DIR / "demdsm/"

LINZ_QUAD_IDS = ["BA31", "BA32"]

app = typer.Typer()


@app.command()
def build(gdal_path: str = "gdal"):
    TMP_DATA_DIR.mkdir(parents=True, exist_ok=True)

    ## build clipped & negative buffered buildings
    AUCKLAND_BUILDINGS = TMP_DATA_DIR / "auckland-buildings.gpkg"

    if not AUCKLAND_BUILDINGS.exists():
        cmd = [
            f"{gdal_path} vector pipeline --progress",
            # read from inside zip file
            f'read --input "/vsizip/{BUILDINGS_PATH}/nz-building-outlines.gpkg"',
            # clip the source input to features that intersect buildings bounds
            f'clip --like "{BOUNDS_PATH}" --like-where "name=\'buildings\'"',
            # negative buffer 0.00002 deg (aprox 2m)
            "geom buffer --distance=-0.00002 --endcap-style=flat --join-style=mitre",
            # filter out null geometries
            'filter --where "OGR_GEOMETRY IS NOT NULL"',
            # make sure all output is multi polygon (some negative buffers result in >1 polygon)
            "geom set-type --multi",
            # write as gpkg
            f"write --overwrite --output-format=GPKG {AUCKLAND_BUILDINGS}",
        ]

        shpyx.run(" ! ".join(cmd), log_cmd=True, log_output=True)

    ## height calculation dem-dsm
    HEIGHT_RASTER = TMP_DATA_DIR / "height.tif"

    # build vrt for dem and dsm separately
    vrt_paths = []

    for demdsm in DEMDSM_DIR.glob("*/"):
        model = "dem" if "dem" in demdsm.stem else "dsm"
        tifs = list(demdsm.glob("**/*.tiff"))
        vrt_path = TMP_DATA_DIR / f"{model}.vrt"

        cmd = [
            f"{gdal_path} raster mosaic",
            "--overwrite",
            "--resolution highest",
            " ".join([str(tif) for tif in tifs]),
            str(vrt_path),
        ]

        shpyx.run(" ".join(cmd), log_cmd=True, log_output=True)
        vrt_paths.append(vrt_path)

    # stack and clip rasters, save output
    cmd = [
        f"{gdal_path} raster stack",
        "--overwrite",
        "--output-format=GTiff",
        "--creation-option COMPRESS=DEFLATE",
        "--creation-option PREDICTOR=3",
        "--bbox=1750497,5909801,1769263,5922342",  # TODO auto calculate
        " ".join([str(vrt_path) for vrt_path in vrt_paths]),
        str(HEIGHT_RASTER),
    ]

    shpyx.run(" ".join(cmd), log_cmd=True, log_output=True)


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


if __name__ == "__main__":
    app()
