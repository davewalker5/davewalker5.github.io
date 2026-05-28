from __future__ import annotations

import argparse
from pathlib import Path
from typing import Callable, Iterable

import yaml


ManifestEntry = tuple[str, str]
Record = dict[str, str]
Extractor = Callable[[Path, Iterable[ManifestEntry]], list[Record]]


def read_manifest(path: Path) -> list[ManifestEntry]:
    """
    Read a TSV manifest as (path, checksum) pairs
    """
    entries: list[ManifestEntry] = []

    for line_no, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        line = line.strip()

        if not line:
            continue

        try:
            rel_path, checksum = line.split("\t", 1)
        except ValueError as exc:
            raise ValueError(
                f"{path}: line {line_no} is not valid TSV: expected path<TAB>hash"
            ) from exc

        entries.append((rel_path.strip("/"), checksum.strip()))

    return entries


def extract_aircraft_manufacturers(cdn_folder: Path, entries: Iterable[ManifestEntry]) -> list[Record]:
    """
    Extract aircraft manufacturer report definitions. The path pattern for these entries
    is expected to be:

    aircraft/reports/manufacturer/<manufacturer>/<base>.xlsx

    :param cdn_folder: Path to the CDN root folder
    :param entries:
    :return: Dictionary of the manufacturer name, base name, PNG file path and XLSX path
    """
    rows: dict[tuple[str, str], Record] = {}

    for rel_path, _checksum in entries:
        parts = rel_path.split("/")

        if len(parts) < 5:
            continue

        if parts[:3] != ["aircraft", "reports", "manufacturer"]:
            continue

        manufacturer = parts[3]
        filename = parts[4]

        if not filename.endswith(".xlsx"):
            continue

        base = filename.removesuffix(".xlsx")
        key = (manufacturer, base)
        
        xlsx_path = f"/aircraft/reports/manufacturer/{manufacturer}/{base}.xlsx"
        if not (cdn_folder / xlsx_path).exists():
            xlsx_path = ""

        rows[key] = {
            "manufacturer": manufacturer,
            "base": base,
            "png_path": f"/aircraft/reports/manufacturer/{manufacturer}/{base}.png",
            "xlsx_path": xlsx_path
        }

    return sorted(rows.values(), key=lambda r: (r["manufacturer"].lower(), r["base"].lower()))


def title_from_base(base: str) -> str:
    """
    Convert a report base filename into a display title. For example:

    manufacturer-popularity-share -> Manufacturer Popularity Share

    :param base: Report file base name
    :return: Report title
    """
    return base.replace("-", " ").replace("_", " ").title()


def extract_aircraft_reports(cdn_folder: Path, entries: Iterable[ManifestEntry]) -> list[Record]:
    """
    Extract top-level aircraft report definitions. The path pattern for these entries
    is expected to be:

    aircraft/reports/<base>.png
    aircraft/reports/<base>.xlsx

    Manufacturer-specific reports are deliberately excluded because they live under:

    aircraft/reports/manufacturer/<manufacturer>/<base>.<ext>

    :param cdn_folder: Path to the CDN root folder
    :param entries:
    :return: Dictionary of base name, title, PNG file path and XLSX path
    """
    seen: dict[str, set[str]] = {}

    for rel_path, _checksum in entries:
        parts = rel_path.split("/")

        if len(parts) != 3:
            continue

        if parts[:2] != ["aircraft", "reports"]:
            continue

        filename = parts[2]

        if "." not in filename:
            continue

        base, ext = filename.rsplit(".", 1)
        ext = ext.lower()

        if ext not in {"png", "xlsx"}:
            continue

        seen.setdefault(base, set()).add(ext)

    rows: list[Record] = []

    for base, _ in seen.items():
        xlsx_path = f"/aircraft/reports/{base}.xlsx"
        if not (cdn_folder / xlsx_path).exists():
            xlsx_path = ""

        rows.append(
            {
                "base": base,
                "title": title_from_base(base),
                "png_path": f"/aircraft/reports/{base}.png",
                "xlsx_path": xlsx_path
            }
        )

    return sorted(rows, key=lambda r: r["base"].lower())


def extract_weather_reports(cdn_folder: Path, entries: Iterable[ManifestEntry]) -> list[Record]:
    """
    Extract weather report definitions. The path pattern for these entries is
    expected to be:

    weather/reports/<category>/<base>.png
    weather/reports/<category>/<base>.xlsx

    The output is deliberately one flat data file with a category field, so the
    weather landing page can derive its category list and category pages can
    filter reports from the same canonical source.

    :param cdn_folder: Path to the CDN root folder
    :param entries:
    :return: Dictionary of category, category title, base name, report title, PNG path and XLSX path
    """
    seen: dict[tuple[str, str], set[str]] = {}

    for rel_path, _checksum in entries:
        parts = rel_path.split("/")

        if len(parts) != 4:
            continue

        if parts[:2] != ["weather", "reports"]:
            continue


        category = parts[2]
        filename = parts[3]

        if "." not in filename:
            continue

        base, ext = filename.rsplit(".", 1)
        ext = ext.lower()

        if ext not in {"png", "xlsx"}:
            continue

        seen.setdefault((category, base), set()).add(ext)

    rows: list[Record] = []

    for (category, base), _ in seen.items():
        xlsx_path = f"/weather/reports/{category}/{base}.xlsx"
        if not (cdn_folder / xlsx_path).exists():
            xlsx_path = ""

        rows.append(
            {
                "category": category,
                "base": base,
                "title": title_from_base(base),
                "png_path": f"/weather/reports/{category}/{base}.png",
                "xlsx_path": xlsx_path
            }
        )

    return sorted(rows, key=lambda r: (r["category"].lower(), r["base"].lower()))



def title_from_slug(value: str) -> str:
    """
    Convert a path slug or filename base into a display label.
    Keeps existing spaces, and treats hyphens/underscores as word separators.
    """
    return value.replace("-", " ").replace("_", " ").title()


def add_wildlife_asset(
    rows: dict[tuple[str, ...], Record],
    key: tuple[str, ...],
    rel_path: str,
    ext: str,
    metadata: Record,
) -> None:
    """
    Add or update a wildlife report record using one manifest asset.
    The manifest is treated as the source of truth, so a path is present only
    when that exact file appears in the manifest.
    """
    row = rows.setdefault(key, dict(metadata))
    row[f"{ext}_path"] = f"/{rel_path}"


def extract_wildlife_reports(cdn_folder: Path, entries: Iterable[ManifestEntry]) -> list[Record]:
    """
    Extract wildlife report definitions from manifest paths.

    Supported patterns:

    wildlife/reports/<country>/abundance/<location>/<category>/abundance.png|xlsx
    wildlife/reports/<country>/composition/<location>/<category>/composition.png|xlsx
    wildlife/reports/<country>/heatmap/<year>/<location>/<category>/heatmap.png|xlsx
    wildlife/reports/<country>/richness/<year>/richness.html|xlsx
    wildlife/reports/<country>/trend/<location>/<category>/<species>.png|xlsx

    The output is one flat YAML file with a report_type field. Landing pages can
    filter by report_type, country, year, location, category, or species as needed.
    """
    del cdn_folder  # The manifest is the authority for which files exist.

    rows: dict[tuple[str, ...], Record] = {}

    for rel_path, _checksum in entries:
        parts = rel_path.split("/")

        if len(parts) < 5:
            continue

        if parts[:2] != ["wildlife", "reports"]:
            continue

        country = parts[2]
        report_type = parts[3]
        filename = parts[-1]

        if "." not in filename:
            continue

        base, ext = filename.rsplit(".", 1)
        ext = ext.lower()

        common: Record = {
            "report_type": report_type,
            "report_type_title": title_from_slug(report_type),
            "country": country,
            "country_title": title_from_slug(country),
        }

        if report_type in {"abundance", "composition"}:
            # wildlife/reports/<country>/<type>/<location>/<category>/<type>.<ext>
            if len(parts) != 7:
                continue
            if ext not in {"png", "xlsx"}:
                continue
            if base != report_type:
                continue

            location = parts[4]
            category = parts[5]
            key = (report_type, country, location, category)
            metadata = {
                **common,
                "location": location,
                "location_title": title_from_slug(location),
                "category": category,
                "category_title": title_from_slug(category),
                "base": base,
                "title": title_from_slug(base),
            }
            add_wildlife_asset(rows, key, rel_path, ext, metadata)

        elif report_type == "heatmap":
            # wildlife/reports/<country>/heatmap/<year>/<location>/<category>/heatmap.<ext>
            if len(parts) != 8:
                continue
            if ext not in {"png", "xlsx"}:
                continue
            if base != "heatmap":
                continue

            year = parts[4]
            location = parts[5]
            category = parts[6]
            key = (report_type, country, year, location, category)
            metadata = {
                **common,
                "year": year,
                "location": location,
                "location_title": title_from_slug(location),
                "category": category,
                "category_title": title_from_slug(category),
                "base": base,
                "title": title_from_slug(base),
            }
            add_wildlife_asset(rows, key, rel_path, ext, metadata)

        elif report_type == "richness":
            # wildlife/reports/<country>/richness/<year>/richness.html|xlsx
            if len(parts) != 6:
                continue
            if ext not in {"html", "xlsx"}:
                continue
            if base != "richness":
                continue

            year = parts[4]
            key = (report_type, country, year)
            metadata = {
                **common,
                "year": year,
                "base": base,
                "title": title_from_slug(base),
            }
            add_wildlife_asset(rows, key, rel_path, ext, metadata)

        elif report_type == "trend":
            # wildlife/reports/<country>/trend/<location>/<category>/<species>.png|xlsx
            if len(parts) != 7:
                continue
            if ext not in {"png", "xlsx"}:
                continue

            location = parts[4]
            category = parts[5]
            species = base
            key = (report_type, country, location, category, species)
            metadata = {
                **common,
                "location": location,
                "location_title": title_from_slug(location),
                "category": category,
                "category_title": title_from_slug(category),
                "species": species,
                "species_title": title_from_slug(species),
                "base": base,
                "title": title_from_slug(species),
            }
            add_wildlife_asset(rows, key, rel_path, ext, metadata)

    return sorted(
        rows.values(),
        key=lambda r: (
            r.get("report_type", "").lower(),
            r.get("country_title", "").lower(),
            r.get("year", ""),
            r.get("location_title", "").lower(),
            r.get("category_title", "").lower(),
            r.get("species_title", "").lower(),
            r.get("base", "").lower(),
        ),
    )


def write_yaml(records: list[Record], path: Path) -> None:
    """
    Write records as a Jekyll-friendly YAML data file
    
    :param records: List of records to write
    :param path: Path to the YAML file to write
    """
    path.parent.mkdir(parents=True, exist_ok=True)

    with path.open("w", encoding="utf-8") as f:
        yaml.safe_dump(
            records,
            f,
            sort_keys=False,
            allow_unicode=True,
        )


EXTRACTORS: dict[str, Extractor] = {
    "aircraft-manufacturers": extract_aircraft_manufacturers,
    "aircraft-reports": extract_aircraft_reports,
    "weather-reports": extract_weather_reports,
    "wildlife-reports": extract_wildlife_reports,
}

DATA_FILES: dict[str, str] = {
    "aircraft-manufacturers": "aircraft_manufacturer_reports.yml",
    "aircraft-reports": "aircraft_reports.yml",
    "weather-reports": "weather_reports.yml",
    "wildlife-reports": "wildlife_reports.yml",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("-m", "--manifest", required=True, type=Path,
                        help="Path to the TSV manifest file.")
    parser.add_argument("-t", "--type", required=True, choices=sorted(EXTRACTORS),
                        help="Type of extraction to perform.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    print(f"Generating data file type {EXTRACTORS[args.type]} from the CDN manifest")

    entries = read_manifest(args.manifest)
    cdn_folder = Path(args.manifest).parent
    extractor = EXTRACTORS[args.type]
    output = Path(__file__).parent.parent / "_data" / DATA_FILES[args.type]
    records = extractor(cdn_folder, entries)

    write_yaml(records, Path(output))

    print(f"Wrote {len(records)} records to {output}")


if __name__ == "__main__":
    main()
