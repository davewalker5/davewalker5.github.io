import argparse
import csv
import json
from decimal import Decimal
from pathlib import Path
import xml.etree.ElementTree as ET

import matplotlib.pyplot as plt


PROGRAM_NAME = "Simulation Plotter"
PROGRAM_VERSION = "1.0.0"
PROGRAM_DESCRIPTION = "Chart Normalise Simulation Output"

T_FIELD = "t"
Y_FIELD = "y_normalised"


def to_float(value):
    return float(Decimal(str(value)))


# ---------- Readers ----------

def read_csv(path):
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    return [(to_float(r[T_FIELD]), to_float(r[Y_FIELD])) for r in rows]


def read_json(path):
    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    return [(to_float(r[T_FIELD]), to_float(r[Y_FIELD])) for r in data]


def read_xml(path):
    tree = ET.parse(path)
    root = tree.getroot()

    points = []
    for point in root.findall("point"):
        t = point.find(T_FIELD).text
        y = point.find(Y_FIELD).text
        points.append((to_float(t), to_float(y)))

    return points


# ---------- Main ----------

def main():
    parser = argparse.ArgumentParser(
        prog=f"{PROGRAM_NAME} v{PROGRAM_VERSION}",
        description=PROGRAM_DESCRIPTION
    )
    parser.add_argument("-i", "--input", required=True, help="Input file (csv, json, xml)")
    parser.add_argument("-t", "--title", required=True, help="Chart title")
    parser.add_argument("-o", "--output", required=True, help="Output PNG file")

    args = parser.parse_args()

    input_path = Path(args.input)
    ext = input_path.suffix.lower()

    if ext == ".csv":
        data = read_csv(input_path)
    elif ext == ".json":
        data = read_json(input_path)
    elif ext == ".xml":
        data = read_xml(input_path)
    else:
        raise ValueError(f"Unsupported format: {ext}")

    if not data:
        raise ValueError("No data found in input")

    # Sort by t (just in case)
    data.sort(key=lambda x: x[0])

    t_vals = [d[0] for d in data]
    y_vals = [d[1] for d in data]

    # ---------- Plot ----------

    plt.figure()
    plt.plot(t_vals, y_vals)

    plt.xlabel("Time")
    plt.ylabel("Normalised activity (index)")
    plt.title(args.title)

    plt.tight_layout()
    plt.savefig(args.output)
    plt.close()


if __name__ == "__main__":
    main()