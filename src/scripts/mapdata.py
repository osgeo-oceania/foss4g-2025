# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "typer",
# ]
# ///


from pathlib import Path
import typer
import json
import os

## data sources:
##   linz-landcover: https://lris.scinfo.org.nz/layer/104400-lcdb-v50-land-cover-database-version-50-mainland-new-zealand/
##   linz-buildings: https://data.linz.govt.nz/layer/101290-nz-building-outlines/
##   linz-coastline: https://data.linz.govt.nz/layer/51559-nz-coastlines-and-islands-polygons-topo-1250k/
##   linz-road-centrelines: https://data.linz.govt.nz/layer/50329-nz-road-centrelines-topo-150k/
##   linz-place-names: https://data.linz.govt.nz/layer/51681-nz-place-names-nzgb/
##   auckland-parks: https://data-aucklandcouncil.opendata.arcgis.com/datasets/3135043373ba48b7a9b5240370cb53ac_0/explore
##   auckland-alcohol-control-area: https://data-aucklandcouncil.opendata.arcgis.com/datasets/af300c4cc33b4dff8218394a1eeefe50_0/explore


config = {
    "TILES_OUT_PATH": Path("src/data/auckland.pmtiles"),
    "TILES_YML_PATH": Path("src/scripts/config/planetiler.yml"),
    "BOUNDS_PATH": Path("src/data/bounds.json"),
}

app = typer.Typer()


@app.command()
def build_pmtiles(
    jar_path: Path,
    out_path: Path = config["TILES_OUT_PATH"],
    gb_ram: int = 1,
    overwrite: bool = False,
):

    if out_path.exists():
        if overwrite:
            print(f"overwriting {out_path}")
            out_path.unlink()
        else:
            print(f"not overwriting {out_path}")
            return

    bounds = json.loads(config["BOUNDS_PATH"].read_bytes())
    bounds_str = ",".join([str(lonlat) for lonlat in bounds["mapdata"]])

    cmd = " ".join(
        [
            f"java -Xmx{gb_ram}g",
            f'-jar "{jar_path.absolute()}"',
            "generate-custom",
            f'--bounds="{bounds_str}"',
            f"--schema=\"{config['TILES_YML_PATH']}\"",
            f'--output="{out_path}"',
        ]
    )

    print(f"running cmd {cmd}")

    os.system(cmd)


@app.command()
def foobar():
    pass


if __name__ == "__main__":
    app()
