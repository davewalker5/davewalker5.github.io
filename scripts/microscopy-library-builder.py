import pandas as pd
import argparse
import shutil
import subprocess
import os
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

INCLUDED_EXTENSIONS = [".png"]

COLUMN_RENAMES = {
    "Scientific Name": "Scientific",
    "Common Name": "Common",
    "Objective Magnification": "ObjectiveMagnification",
    "Lower Effective Magnification": "LowerCameraMagnification",
    "Upper Effective Magnification": "UpperCameraMagnification"
}

PLATE_LIBRARY_FOLDER_ENV = "MICROSCOPY_PLATE_LIBRARY"
DEFAULT_INDEX_NAME = "Index.xlsx"
DEFAULT_START_DATE = "12/03/2026"
DEFAULT_END_DATE = date.today().strftime("%d/%m/%Y")


def filter_plate_index(inputpath, outputpath, start_date, end_date):
    """
    Create a CSV format copy of a plate index, filtering by date and series and applying
    column renaming
    """

    print(f"Source Index File: {inputpath}")
    print(f"Output Index File: {outputpath}")

    # Load spreadsheet
    df = pd.read_excel(inputpath)

    # Normalize Series column
    df[SERIES_COLUMN_NAME] = df[SERIES_COLUMN_NAME].astype(str).str.strip()

    # Convert the date column to a date
    df[DATE_COLUMN_NAME] = pd.to_datetime(df[DATE_COLUMN_NAME], dayfirst=True, errors="coerce")

    # Filter rows (series exclusion)
    filtered_df = df[~df[SERIES_COLUMN_NAME].isin(EXCLUDE_SERIES)]

    # Apply start date filter
    if start_date:
        start_date = pd.to_datetime(start_date, dayfirst=True)
        filtered_df = filtered_df[filtered_df[DATE_COLUMN_NAME] >= start_date]

    # Apply end date filter
    if end_date:
        end_date = pd.to_datetime(end_date, dayfirst=True)
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

    # Rename columns
    filtered_df = filtered_df.rename(columns=COLUMN_RENAMES, errors="ignore")

    # Save CSV
    filtered_df.to_csv(outputpath, index=False)

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


def copy_plate_images(plate_names, input_dir, output_dir):
    """
    Copy matching plate images from input_dir (searched recursively)
    into output_dir/full (original files), create optimised preview
    images in output_dir/preview, and create smaller thumbnail images
    in output_dir/lightbox from the preview images.

    :param plate_names: List of plate image file names
    :param input_dir: Folder to search for plate image files
    :param output_dir: Root output folder containing full, preview,
                       and lightbox subfolders
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
        full_destination = full_output_dir / plate_name
        preview_destination = preview_output_dir / plate_name
        lightbox_destination = lightbox_output_dir / plate_name

        # Skip processing if all output files already exist
        if (
            full_destination.exists()
            and preview_destination.exists()
            and lightbox_destination.exists()
        ):
            skipped += 1
            continue

        # Copy the original file to the full output folder if needed
        if not full_destination.exists():
            shutil.copy2(source, full_destination)

        # Generate the preview image if needed
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

        # Create the lightbox image from the preview image if needed
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

        copied += 1

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
        print("\nAmbiguous plate files (more than one source file found):")
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

    # Configure the command line parser and parse the command line
    parser.add_argument("-i", "--input", default=default_index, help="Path to the plate index spreadsheet")
    parser.add_argument("-o", "--output", help="Path to the output CSV file")
    parser.add_argument("-sd", "--start-date", default=DEFAULT_START_DATE, help="Only include plates on or after this date")
    parser.add_argument("-ed", "--end-date", default=DEFAULT_END_DATE, help="Only include plates upp to this date")
    parser.add_argument("-pid", "--plate-input-dir", default=plate_library_folder, help="Root folder to search for plate image files")
    parser.add_argument("-pod", "--plate-output-dir", help="Plate image output folder")

    args = parser.parse_args()
    
    # Filter the index
    filtered_df = filter_plate_index(args.input, args.output, args.start_date, args.end_date)
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