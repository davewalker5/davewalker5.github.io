import argparse
import csv
import json
from decimal import Decimal, InvalidOperation
from pathlib import Path
import xml.etree.ElementTree as ET

PROGRAM_NAME = "Simulation Normaliser"
PROGRAM_VERSION = "1.0.0"
PROGRAM_DESCRIPTION = "Normalise Simulation Output"

Y_FIELD = "y"
NORMALISED_FIELD = "y_normalised"


def to_decimal(value):
    try:
        return Decimal(str(value))
    except (InvalidOperation, TypeError):
        raise ValueError(f"Cannot convert y value to Decimal: {value}")


def normalise_rows(rows):
    y_values = [to_decimal(row[Y_FIELD]) for row in rows]
    max_y = max(y_values)

    if max_y == 0:
        normalised = [Decimal("0") for _ in y_values]
    else:
        normalised = [y / max_y for y in y_values]

    for row, y_norm in zip(rows, normalised):
        row[NORMALISED_FIELD] = str(+y_norm)

    return rows


def read_csv(path):
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def write_csv(path, rows):
    fieldnames = list(rows[0].keys())

    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def read_json(path):
    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    if not isinstance(data, list):
        raise ValueError("JSON input must be a list of simulation point objects")

    return data


def write_json(path, rows):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(rows, f, indent=4)


def read_xml(path):
    tree = ET.parse(path)
    root = tree.getroot()

    rows = []
    for point in root.findall("point"):
        row = {}
        for child in point:
            row[child.tag] = child.text
        rows.append(row)

    return rows


def write_xml(path, rows):
    root = ET.Element("simulation")

    for row in rows:
        point = ET.SubElement(root, "point")
        for key, value in row.items():
            child = ET.SubElement(point, key)
            child.text = str(value)

    tree = ET.ElementTree(root)
    ET.indent(tree, space="    ")
    tree.write(path, encoding="utf-8", xml_declaration=True)


def main():
    parser = argparse.ArgumentParser(
        prog=f"{PROGRAM_NAME} v{PROGRAM_VERSION}",
        description=PROGRAM_DESCRIPTION
    )

    parser.add_argument("-i", "--input", required=True, help="Input file path: csv, json, or xml")
    parser.add_argument("-o", "--output", required=True, help="Output file path: csv, json, or xml")

    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)

    input_ext = input_path.suffix.lower()
    output_ext = output_path.suffix.lower()

    if input_ext == ".csv":
        rows = read_csv(input_path)
    elif input_ext == ".json":
        rows = read_json(input_path)
    elif input_ext == ".xml":
        rows = read_xml(input_path)
    else:
        raise ValueError(f"Unsupported input format: {input_ext}")

    if not rows:
        raise ValueError("Input contains no rows")

    rows = normalise_rows(rows)

    if output_ext == ".csv":
        write_csv(output_path, rows)
    elif output_ext == ".json":
        write_json(output_path, rows)
    elif output_ext == ".xml":
        write_xml(output_path, rows)
    else:
        raise ValueError(f"Unsupported output format: {output_ext}")


if __name__ == "__main__":
    main()
