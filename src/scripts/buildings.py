# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "shpyx",
#     "typer",
#     "geopandas",
# ]
# ///
import typer

from pathlib import Path
import shpyx
import typer

LINZ_RAW_DATA_DIR = Path("src/data/raw/")
LINZ_QUAD_IDS = ["BA31", "BA32"]

app = typer.Typer()


@app.command()
def build():
    pass


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
        str(LINZ_RAW_DATA_DIR),
    ]

    shpyx.run(" ".join(cmd), log_cmd=True, log_output=True)


if __name__ == "__main__":
    app()
