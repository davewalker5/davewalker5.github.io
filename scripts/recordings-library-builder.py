import pandas as pd
import argparse
import shutil
import subprocess
import os
from pathlib import Path
from datetime import date
import tempfile


PROGRAM_NAME = "Wildlife Recordings Library Parser"
PROGRAM_VERSION = "1.0.0"
PROGRAM_DESCRIPTION = "Export the wildlife recordings library for use in the sightings web site"

DATE_COLUMN_NAME = "Date"
SERIES_COLUMN_NAME = "Series"
MEDIA_COLUMN_NAME = "Media"

EXCLUDE_SERIES = []

INCLUDED_EXTENSIONS = [".m4v", "mp4", ".mp3"]

COLUMN_RENAMES = {
    "Scientific Name": "Scientific",
    "Common Name": "Common",
}

MEDIA_LIBRARY_FOLDER_ENV = "WILDLIFE_RECORDINGS_LIBRARY"
DEFAULT_INDEX_NAME = "Index.xlsx"
DEFAULT_START_DATE = "01/01/1900"
DEFAULT_END_DATE = date.today().strftime("%d/%m/%Y")


def filter_recordings_index(inputpath, outputpath, start_date, end_date):
    """
    Create a CSV format copy of a recordings index, filtering by date and series and applying
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
            filtered_df[MEDIA_COLUMN_NAME]
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


def collect_media_names(df):
    """
    Return a set of non-empty media filenames from the Media column

    :param df: Data frame including a 'Media' column specifying the plate image file name
    :returns: A set of plate file names
    """

    if MEDIA_COLUMN_NAME not in df.columns:
        return set()

    plates = df[MEDIA_COLUMN_NAME].dropna().astype(str).str.strip()
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


def run_ffmpeg(cmd):
    """Run ffmpeg command and raise a useful error if it fails."""
    print("Running:", " ".join(str(c) for c in cmd))
    subprocess.run(cmd, check=True)


def find_input_file(filename, input_root):
    """
    Find the first matching file anywhere under input_root.
    Returns a Path or None.
    """
    matches = list(input_root.rglob(filename))
    if not matches:
        return None
    if len(matches) > 1:
        print(f"Warning: multiple matches found for {filename}; using first: {matches[0]}")
    return matches[0]


def copy_media_files(media_files, input_dir, output_dir):
    """
    Process media files from anywhere under input_dir and place outputs under output_dir.

    Behaviour:
    - mp3:
        * if output_dir/audio/<filename> exists -> do nothing
        * else copy it there
    - mp4 / m4v:
        * output video always ends up as output_dir/movies/<stem>.mp4
        * if that already exists -> do nothing
        * else:
            - m4v -> convert to intermediate mp4
            - mp4 -> copy to intermediate mp4
            - compress intermediate to output_dir/movies/<stem>.mp4
            - capture thumbnail frame to output_dir/lightbox/<stem>.png
            - remove intermediate file
    """

    input_root = Path(input_dir)
    output_root = Path(output_dir)

    audio_dir = output_root / "audio"
    movies_dir = output_root / "movies"
    lightbox_dir = output_root / "lightbox"

    audio_dir.mkdir(parents=True, exist_ok=True)
    movies_dir.mkdir(parents=True, exist_ok=True)
    lightbox_dir.mkdir(parents=True, exist_ok=True)

    for media_file in media_files:
        source_path = find_input_file(media_file, input_root)

        if source_path is None:
            print(f"Skipping {media_file}: not found under {input_root}")
            continue

        ext = source_path.suffix.lower()
        stem = source_path.stem

        # -------------------------
        # Audio
        # -------------------------
        if ext == ".mp3":
            target_audio = audio_dir / source_path.name

            if target_audio.exists():
                print(f"Audio exists, skipping: {target_audio}")
                continue

            print(f"Copying audio: {source_path} -> {target_audio}")
            shutil.copy2(source_path, target_audio)
            continue

        # -------------------------
        # Video
        # -------------------------
        if ext in {".m4v", ".mp4"}:
            target_video = movies_dir / f"{stem}.mp4"
            target_image = lightbox_dir / f"{stem}.png"

            if target_video.exists():
                print(f"Video exists, skipping: {target_video}")
                continue

            with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as tmp:
                intermediate_path = Path(tmp.name)

            try:
                # Step 1: create intermediate mp4
                if ext == ".m4v":
                    print(f"Converting m4v to intermediate mp4: {source_path} -> {intermediate_path}")
                    run_ffmpeg([
                        "ffmpeg",
                        "-y",
                        "-i", str(source_path),
                        "-c:v", "libx264",
                        "-profile:v", "high",
                        "-level", "4.0",
                        "-pix_fmt", "yuv420p",
                        "-crf", "23",
                        "-c:a", "aac",
                        "-b:a", "128k",
                        "-movflags", "+faststart",
                        str(intermediate_path),
                    ])
                else:
                    print(f"Copying mp4 to intermediate: {source_path} -> {intermediate_path}")
                    shutil.copy2(source_path, intermediate_path)

                # Step 2: reduce size to final movie output
                print(f"Compressing video: {intermediate_path} -> {target_video}")
                run_ffmpeg([
                    "ffmpeg",
                    "-y",
                    "-i", str(intermediate_path),
                    "-c:v", "libx264",
                    "-crf", "26",
                    "-preset", "slow",
                    "-pix_fmt", "yuv420p",
                    "-an",
                    "-movflags", "+faststart",
                    str(target_video),
                ])

                # Step 3: extract thumbnail from final output
                print(f"Creating thumbnail: {target_video} -> {target_image}")
                run_ffmpeg([
                    "ffmpeg",
                    "-y",
                    "-ss", "00:00:02",
                    "-i", str(target_video),
                    "-frames:v", "1",
                    "-vf", "scale=800:-1",
                    "-q:v", "2",
                    str(target_image),
                ])

            finally:
                if intermediate_path.exists():
                    print(f"Deleting intermediate file: {intermediate_path}")
                    intermediate_path.unlink()

            continue

        # -------------------------
        # Unsupported file type
        # -------------------------
        print(f"Skipping {media_file}: unsupported extension {ext}")


def main():
    parser = argparse.ArgumentParser(
        prog=f"{PROGRAM_NAME} v{PROGRAM_VERSION}",
        description=PROGRAM_DESCRIPTION
    )

    # Construct the default plate library index file name
    plate_library_folder = os.environ[MEDIA_LIBRARY_FOLDER_ENV] if MEDIA_LIBRARY_FOLDER_ENV in os.environ else None
    default_index = (Path(plate_library_folder) / DEFAULT_INDEX_NAME).absolute() if plate_library_folder else None

    # Configure the command line parser and parse the command line
    parser.add_argument("-i", "--input", default=default_index, help="Path to the recording index spreadsheet")
    parser.add_argument("-o", "--output", help="Path to the output CSV file")
    parser.add_argument("-sd", "--start-date", default=DEFAULT_START_DATE, help="Only include media on or after this date")
    parser.add_argument("-ed", "--end-date", default=DEFAULT_END_DATE, help="Only include media upp to this date")
    parser.add_argument("-mid", "--media-input-dir", default=plate_library_folder, help="Root folder to search for media files")
    parser.add_argument("-mod", "--media-output-dir", help="Media output folder")

    args = parser.parse_args()
    
    # Filter the index
    filtered_df = filter_recordings_index(args.input, args.output, args.start_date, args.end_date)
    media_input_dir = Path(args.media_input_dir)
    media_output_dir = Path(args.media_output_dir)

    # Check the plate image folders
    if not media_input_dir.exists():
        raise FileNotFoundError(f"Media input directory does not exist: {media_input_dir}")

    if not media_input_dir.is_dir():
        raise NotADirectoryError(f"Media input path is not a directory: {media_input_dir}")

    media_names = collect_media_names(filtered_df)
    copy_media_files(media_names, media_input_dir, media_output_dir)


if __name__ == "__main__":
    main()