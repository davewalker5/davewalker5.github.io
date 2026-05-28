import argparse
import json
from pathlib import Path
from datetime import datetime


def print_message(message):
    """
    Show a timestamped message

    :param message: Message text
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"{timestamp} : {message}")


def title_from_location(location: str) -> str:
    """
    Convert a location, derived from the last element of the classification file path, into
    a title case location name

    :param location: Raw path element
    :return: Formatted location name
    """
    return location.replace("_", " ").title()


def species_from_filename(path: Path) -> str:
    """
    Given a classification file path, "<species>_classification.json", extract and return
    the species name part, <species>
    
    :param path: File path
    :return: Species name component of the file name
    """
    suffix = "_classification"
    stem = path.stem

    if not stem.endswith(suffix):
        raise ValueError(f"Unexpected filename: {path.name}")

    return stem[: -len(suffix)]


def render_template(template: str, replacements: dict[str, str]) -> str:
    """
    Replace the placeholders in the specified template text with the supplied values
    
    :param template: Template text
    :param replacements: Dictionary of placeholder/value pairs
    :return: Text after placeholder replacement
    """
    rendered = template
    for key, value in replacements.items():
        rendered = rendered.replace(f"${key}", value)
    return rendered


def main() -> None:
    default_template = Path(__file__).parent.parent / "_templates" / "classification_template.md"

    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--input_folder", required=True, help="Folder containing *_classification.json files")
    parser.add_argument("-o", "--output_folder", required=True, help="Folder where generated .md files will be written")
    parser.add_argument("-t", "--template-file", default=default_template, help="Markdown template file")

    args = parser.parse_args()

    # Set up paths
    input_folder = Path(args.input_folder)
    output_folder = Path(args.output_folder)
    template_file = Path(args.template_file)

    # Check the input folder exists
    if not input_folder.is_dir():
        raise NotADirectoryError(f"Input folder does not exist: {input_folder}")

    # Make sure the output folder exists
    output_folder.mkdir(parents=True, exist_ok=True)

    # Read the template
    template = template_file.read_text(encoding="utf-8")

    # Set up common placeholder replacement values
    location = input_folder.name
    location_name = title_from_location(location)
    seasonal_folder = location_name.replace(" ", "-")

    # Iterate over the classification files
    json_files = sorted(input_folder.glob("*_classification.json"))
    for json_path in json_files:
        # Load the data
        with json_path.open("r", encoding="utf-8") as f:
            data = json.load(f)

        # Set up species-specific replacement values
        name = data["species"]
        model = data["model_family"].split("_")[0]
        classification_file = json_path.stem
        species = species_from_filename(json_path)
        species_hyphenated = species.replace("_", "-")

        # Note that key order is significant : LOCATION_NAME must come before LOCATION and
        # SPECIES_HYPHENATED before SPECIES
        replacements = {
            "NAME": name,
            "CLASSIFICATION_FILE": classification_file,
            "LOCATION_NAME": location_name,
            "LOCATION": location,
            "SEASONAL_FOLDER": seasonal_folder,
            "SPECIES_HYPHENATED": species_hyphenated,
            "SPECIES": species,
            "MODEL": model
        }

        # Render the template to the output file
        output_text = render_template(template, replacements)
        output_path = output_folder / f"{species}.md"
        output_path.write_text(output_text, encoding="utf-8")

        print_message(f"Created {output_path}")


if __name__ == "__main__":
    main()
