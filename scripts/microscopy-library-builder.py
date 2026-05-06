import pandas as pd
import argparse
import shutil
import subprocess
import os
import sqlite3
import csv
from pathlib import Path
from datetime import date

PROGRAM_NAME = "Microscopy Plate Library Parser"
PROGRAM_VERSION = "1.0.0"
PROGRAM_DESCRIPTION = "Export the microscopy plate library for use in the sightings web site"

DATE_COLUMN_NAME = "Date"
SERIES_COLUMN_NAME = "Series"
PLATE_COLUMN_NAME = "Plate"

EXCLUDE_SERIES = [
    "Course of Elementary Discipline"
]

INCLUDED_EXTENSIONS = [".png", ".mp4"]

PLATE_LIBRARY_FOLDER_ENV = "MICROSCOPY_PLATE_LIBRARY"
DEFAULT_INDEX_NAME = "plate_library.db"
DEFAULT_START_DATE = "12/03/2026"


def export_to_csv(input_path, sql_file, output_path):
    """
    Execute the supplied SQL against the SQLite database and write the results
    to the requested CSV file.
    """

    print(f"Source Index: {input_path}")
    print(f"Output Index: {output_path}")

    # Read the query file
    with open(sql_file, "r", encoding="utf-8") as f:
        sql = f.read()

    # Run the query on the plate library database
    with sqlite3.connect(input_path) as conn:
        df = pd.read_sql_query(sql, conn)

    # Save CSV
    df.to_csv(output_path, index=False)

    print(f"Rows exported: {len(df)}")


def filter_plate_index(input_path, export_plates_sql, output_path, start_date, end_date):
    """
    Create a CSV format copy of a plate index, filtering by date and series and applying
    column renaming
    """

    print(f"Source Index: {input_path}")
    print(f"Output Index: {output_path}")

    # Load the SQL queries
    with open(export_plates_sql, "r", encoding="utf-8") as f:
        sql = f.read()

    # Run the query on the plate library database to retrieve the plate index
    with sqlite3.connect(input_path) as conn:
        df = pd.read_sql_query(sql, conn)

    # Normalize Series column
    df[SERIES_COLUMN_NAME] = df[SERIES_COLUMN_NAME].astype(str).str.strip()

    # Convert the date column to a date
    df[DATE_COLUMN_NAME] = pd.to_datetime(df[DATE_COLUMN_NAME], format="%d/%m/%Y", errors="coerce")

    # Filter rows (series exclusion)
    filtered_df = df[~df[SERIES_COLUMN_NAME].isin(EXCLUDE_SERIES)]

    # Apply start date filter
    if start_date:
        start_date = pd.to_datetime(start_date, format="%d/%m/%Y")
        filtered_df = filtered_df[filtered_df[DATE_COLUMN_NAME] >= start_date]

    # Apply end date filter
    if end_date:
        end_date = pd.to_datetime(end_date, format="%d/%m/%Y")
        filtered_df = filtered_df[filtered_df[DATE_COLUMN_NAME] <= end_date]

    # Filter by file extension
    if INCLUDED_EXTENSIONS:
        allowed = tuple(ext.lower() for ext in INCLUDED_EXTENSIONS)

        filtered_df = filtered_df[
            filtered_df[PLATE_COLUMN_NAME]
            .astype(str)
            .str.lower()
            .str.endswith(allowed)
        ]

    # Save CSV
    filtered_df.to_csv(output_path, index=False)

    print(f"Original index rows: {len(df)}")
    print(f"Filtered index rows: {len(filtered_df)}")

    return filtered_df


def collect_plate_names(df):
    """
    Return a set of non-empty plate filenames from the Plate column

    :param df: Data frame including a 'Plate' column specifying the plate image file name
    :returns: A set of plate file names
    """

    if PLATE_COLUMN_NAME not in df.columns:
        return set()

    plates = df[PLATE_COLUMN_NAME].dropna().astype(str).str.strip()
    plates = plates[plates != ""]
    return set(plates.tolist())


def index_files_by_name(root_dir):
    """
    Recursively index all files under root_dir by basename.

    :param root_dir: Path to the root folder for plate images
    :returns: Dictionary of plate image details
    """
    file_index: dict[str, list[Path]] = {}

    for path in root_dir.rglob("*"):
        if path.is_file():
            file_index.setdefault(path.name, []).append(path)

    return file_index


def process_image_plate(
    source,
    plate_name,
    full_output_dir,
    preview_output_dir,
    lightbox_output_dir,
):
    """
    Process a standard image plate:
    - copy to full/
    - generate preview/
    - generate lightbox/ from preview
    """
    stem = source.stem

    full_destination = full_output_dir / plate_name
    preview_destination = preview_output_dir / plate_name
    lightbox_destination = lightbox_output_dir / f"{stem}.png"

    # Skip if everything already exists
    if (
        full_destination.exists()
        and preview_destination.exists()
        and lightbox_destination.exists()
    ):
        return "skipped"

    # Copy full
    if not full_destination.exists():
        shutil.copy2(source, full_destination)

    # Generate preview
    if not preview_destination.exists():
        subprocess.run(
            [
                "magick",
                str(full_destination),
                "-strip",
                "-resize",
                "1600x1600>",
                "-dither",
                "FloydSteinberg",
                "-colors",
                "128",
                f"PNG8:{preview_destination}",
            ],
            check=True,
        )

    # Generate lightbox
    if not lightbox_destination.exists():
        shutil.copy2(preview_destination, lightbox_destination)

        subprocess.run(
            [
                "magick",
                "mogrify",
                "-strip",
                "-resize",
                "400x400>",
                "-colors",
                "64",
                "-define",
                "png:compression-level=9",
                str(lightbox_destination),
            ],
            check=True,
        )

    return "copied"


def process_video_plate(
    source,
    plate_name,
    file_index,
    full_output_dir,
    preview_output_dir,
    lightbox_output_dir,
):
    """
    Process a video plate:
    - copy MP4 to full/
    - find companion PNG
    - generate lightbox PNG from companion
    """
    stem = source.stem

    full_destination = full_output_dir / plate_name
    preview_destination = preview_output_dir / f"{stem}.png"
    lightbox_destination = lightbox_output_dir / f"{stem}.png"

    companion_name = f"{stem}.png"
    companion_matches = file_index.get(companion_name, [])

    if len(companion_matches) == 0:
        return ("missing", companion_name)

    if len(companion_matches) > 1:
        return ("ambiguous", companion_name, companion_matches)

    companion_source = companion_matches[0]

    # Skip if outputs already exist
    if full_destination.exists() and lightbox_destination.exists():
        return "skipped"

    # Copy MP4
    if not full_destination.exists():
        shutil.copy2(source, full_destination)

    # Generate preview from companion PNG
    if not preview_destination.exists():
        shutil.copy2(companion_source, preview_destination)

        subprocess.run(
            [
                "magick",
                str(preview_destination),
                "-strip",
                "-resize",
                "1600x1600>",
                "-dither",
                "FloydSteinberg",
                "-colors",
                "128",
                f"PNG8:{preview_destination}",
            ],
            check=True,
        )

    # Generate lightbox from companion PNG
    if not lightbox_destination.exists():
        shutil.copy2(companion_source, lightbox_destination)

        subprocess.run(
            [
                "magick",
                "mogrify",
                "-strip",
                "-resize",
                "400x400>",
                "-colors",
                "64",
                "-define",
                "png:compression-level=9",
                str(lightbox_destination),
            ],
            check=True,
        )

    return "copied"


def copy_plate_images(plate_names, input_dir, output_dir):
    """
    Main dispatcher for plate processing.
    """
    full_output_dir = output_dir / "full"
    preview_output_dir = output_dir / "preview"
    lightbox_output_dir = output_dir / "lightbox"

    full_output_dir.mkdir(parents=True, exist_ok=True)
    preview_output_dir.mkdir(parents=True, exist_ok=True)
    lightbox_output_dir.mkdir(parents=True, exist_ok=True)

    file_index = index_files_by_name(input_dir)

    copied = 0
    skipped = 0
    missing = []
    ambiguous = []

    for plate_name in sorted(plate_names):
        matches = file_index.get(plate_name, [])

        if len(matches) == 0:
            missing.append(plate_name)
            continue

        if len(matches) > 1:
            ambiguous.append((plate_name, matches))
            continue

        source = matches[0]
        suffix = source.suffix.lower()

        # --- VIDEO ---
        if suffix == ".mp4":
            result = process_video_plate(
                source,
                plate_name,
                file_index,
                full_output_dir,
                preview_output_dir,
                lightbox_output_dir,
            )

            if result == "copied":
                copied += 1
            elif result == "skipped":
                skipped += 1
            elif result[0] == "missing":
                missing.append(result[1])
            elif result[0] == "ambiguous":
                ambiguous.append((result[1], result[2]))

            continue

        # --- IMAGE (default) ---
        result = process_image_plate(
            source,
            plate_name,
            full_output_dir,
            preview_output_dir,
            lightbox_output_dir,
        )

        if result == "copied":
            copied += 1
        elif result == "skipped":
            skipped += 1

    # --- REPORTING ---
    print(f"Plate images requested: {len(plate_names)}")
    print(f"Plate images copied:    {copied}")
    print(f"Plate images skipped:   {skipped}")
    print(f"Plate images missing:   {len(missing)}")
    print(f"Plate images ambiguous: {len(ambiguous)}")

    if missing:
        print("\nMissing plate files:")
        for name in missing:
            print(f"  - {name}")

    if ambiguous:
        print("\nAmbiguous plate files:")
        for name, matches in ambiguous:
            print(f"  - {name}")
            for match in matches:
                print(f"      {match}")


def main():
    parser = argparse.ArgumentParser(
        prog=f"{PROGRAM_NAME} v{PROGRAM_VERSION}",
        description=PROGRAM_DESCRIPTION
    )

    # Construct the default plate library index file name
    plate_library_folder = os.environ[PLATE_LIBRARY_FOLDER_ENV] if PLATE_LIBRARY_FOLDER_ENV in os.environ else None
    default_index = (Path(plate_library_folder) / DEFAULT_INDEX_NAME).absolute() if plate_library_folder else None

    # Construct the default export SQL query path for the microscopy plate index
    project_folder = parent_of_parent = Path(__file__).resolve().parent.parent
    default_plate_sql = (project_folder / "microscopy" / "sql" / "export-plates.sql").resolve()
    default_investigation_sql = (project_folder / "microscopy" / "sql" / "export-investigations.sql").resolve()

    # Configure the command line parser and parse the command line
    parser.add_argument("-i", "--input", default=default_index, help="Path to the plate index database")
    parser.add_argument("-ps", "--plate-sql", default=default_plate_sql, help="Path to the default plate export SQL query")
    parser.add_argument("-is", "--investigation-sql", default=default_investigation_sql, help="Path to the default investigation export SQL query")
    parser.add_argument("-po", "--plate-output", help="Path to the output plate CSV file")
    parser.add_argument("-io", "--investigation-output", help="Path to the output investigation CSV file")
    parser.add_argument("-sd", "--start-date", default=DEFAULT_START_DATE, help="Only include plates on or after this date")
    parser.add_argument("-ed", "--end-date", default=None, help="Only include plates upp to this date")
    parser.add_argument("-pid", "--plate-input-dir", default=plate_library_folder, help="Root folder to search for plate image files")
    parser.add_argument("-pod", "--plate-output-dir", help="Plate image output folder")

    args = parser.parse_args()
    
    # Export the investigation list
    export_to_csv(args.input, args.investigation_sql, args.investigation_output)

    # Filter the plate index
    filtered_df = filter_plate_index(args.input, args.plate_sql, args.plate_output, args.start_date, args.end_date)
    plate_input_dir = Path(args.plate_input_dir)
    plate_output_dir = Path(args.plate_output_dir)

    # Check the plate image folders
    if not plate_input_dir.exists():
        raise FileNotFoundError(f"Plate input directory does not exist: {plate_input_dir}")

    if not plate_input_dir.is_dir():
        raise NotADirectoryError(f"Plate input path is not a directory: {plate_input_dir}")

    plate_names = collect_plate_names(filtered_df)
    copy_plate_images(plate_names, plate_input_dir, plate_output_dir)


if __name__ == "__main__":
    main()