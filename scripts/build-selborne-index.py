from __future__ import annotations

from pathlib import Path
import re
import yaml
from collections import defaultdict


ROOT = Path(".")
SELBORNE_DIR = ROOT / "wildlife" / "selborne"
OUTPUT_FILE = ROOT / "_data" / "selborne.yml"
IMAGE_CREDITS_FILE = ROOT / "assets" / "images" / "selborne" / "_credits.yml"

DEFAULT_FRONT_MATTER = {
    "permalink": "/selborne/{slug}/",
}

EXCLUSIONS = [
    "index.md",
    "by-letter.md",
    "by-category.md"
]


def load_front_matter(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")

    if not text.startswith("---\n"):
        raise ValueError(f"{path} has no YAML front matter")

    parts = text.split("---", 2)
    if len(parts) < 3:
        raise ValueError(f"{path} has malformed front matter")

    front_matter_text = parts[1]
    data = yaml.safe_load(front_matter_text) or {}

    if not isinstance(data, dict):
        raise ValueError(f"{path} front matter is not a mapping")

    return data


def split_front_matter(text: str) -> tuple[str, str, str]:
    if not text.startswith("---\n"):
        raise ValueError("File has no YAML front matter")

    match = re.match(r"^---\n(.*?)\n---\n?", text, re.DOTALL)
    if not match:
        raise ValueError("File has malformed YAML front matter")

    front_matter_text = match.group(1)
    body = text[match.end():]
    return "---\n", front_matter_text, body



def ensure_front_matter_defaults(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    opening, front_matter_text, body = split_front_matter(text)

    data = yaml.safe_load(front_matter_text) or {}
    if not isinstance(data, dict):
        raise ValueError(f"{path} front matter is not a mapping")

    slug = str(data.get("slug") or path.stem)

    updated = False
    for key, template in DEFAULT_FRONT_MATTER.items():
        if key not in data or data[key] in (None, ""):
            data[key] = template.format(slug=slug)
            updated = True

    if updated:
        new_front_matter = yaml.safe_dump(
            data,
            sort_keys=False,
            allow_unicode=True,
            default_flow_style=False,
        ).strip()
        new_text = f"{opening}{new_front_matter}\n---\n{body}"
        path.write_text(new_text, encoding="utf-8")

    return data


def normalize_list(value) -> list[str]:
    if value is None:
        return []
    if isinstance(value, list):
        return [str(v).strip() for v in value if str(v).strip()]
    return [str(value).strip()] if str(value).strip() else []


def normalize_image_records(value) -> list[dict[str, str]]:
    if value is None:
        return []

    if isinstance(value, str):
        value = [value]

    images: list[dict[str, str]] = []

    if isinstance(value, list):
        for item in value:
            if isinstance(item, str):
                name = item.strip()
                if name:
                    images.append(
                        {
                            "name": name,
                            "path": f"/assets/images/selborne/{name}",
                            "alt": "",
                            "caption": "",
                            "credit": "",
                            "license": "",
                            "license_link": "",
                            "source": "",
                        }
                    )
            elif isinstance(item, dict):
                name = str(item.get("name", "") or "").strip()
                path = str(item.get("path", "") or "").strip()
                if not path and name:
                    path = f"/assets/images/selborne/{name}"
                if name or path:
                    images.append(
                        {
                            "name": name,
                            "path": path,
                            "alt": str(item.get("alt", "") or ""),
                            "caption": str(item.get("caption", "") or ""),
                            "credit": str(item.get("credit", "") or ""),
                            "license": str(item.get("license", "") or ""),
                            "license_link": str(item.get("license_link", "") or ""),
                            "source": str(item.get("source", "") or ""),
                        }
                    )

    return images


def extract_images_from_front_matter(fm: dict) -> list[dict[str, str]]:
    if "images" in fm:
        return normalize_image_records(fm.get("images"))

    if "image" in fm:
        return normalize_image_records(fm.get("image"))

    image_name = str(fm.get("image_name", "") or "").strip()
    if image_name:
        return normalize_image_records(image_name)

    return []


def build_image_catalogue(terms: list[dict]) -> dict:
    catalogue: dict[str, dict] = {}

    for term in terms:
        for img in term.get("images", []):
            name = str(img.get("name", "") or "").strip()
            if not name:
                continue

            record = catalogue.setdefault(
                name,
                {
                    "name": name,
                    "path": str(img.get("path", "") or f"/assets/images/selborne/{name}"),
                    "alt": str(img.get("alt", "") or ""),
                    "caption": str(img.get("caption", "") or ""),
                    "credit": str(img.get("credit", "") or ""),
                    "license": str(img.get("license", "") or ""),
                    "license_link": str(img.get("license_link", "") or ""),
                    "source": str(img.get("source", "") or ""),
                    "used_by": [],
                },
            )

            used_by_entry = {
                "slug": term["slug"],
                "title": term["title"],
                "path": term["path"],
            }

            if used_by_entry not in record["used_by"]:
                record["used_by"].append(used_by_entry)

            # Fill in missing metadata from any richer occurrence
            for key in ["alt", "caption", "credit", "license", "license_link", "source"]:
                if not record.get(key) and img.get(key):
                    record[key] = img[key]

    sorted_catalogue = dict(sorted(catalogue.items()))

    for record in sorted_catalogue.values():
        record["used_by"] = sorted(record["used_by"], key=lambda x: x["title"].lower())

    return sorted_catalogue


def build_term_record(path: Path) -> dict:
    fm = ensure_front_matter_defaults(path)

    slug = fm.get("slug") or path.stem
    title = fm.get("title", slug)
    category = fm.get("category", "uncategorized")
    images = extract_images_from_front_matter(fm)

    record = {
        "title": str(title),
        "slug": str(slug),
        "category": str(category),
        "tags": sorted(normalize_list(fm.get("tags"))),
        "scientific_name": str(fm.get("scientific_name", "") or ""),
        "white_term": str(fm.get("white_term", "") or ""),
        "modern_equivalent": str(fm.get("modern_equivalent", "") or ""),
        "summary": str(fm.get("summary", "") or ""),
        "related_terms": normalize_list(fm.get("related_terms")),
        "images": images,
        "has_images": bool(images),
        "order": fm.get("order", 9999),
        "status": str(fm.get("status", "published")),
        "source_file": path.name,
        "permalink": str(fm.get("permalink") or f"/selborne/{slug}/"),
        "path": str(fm.get("permalink") or f"/selborne/{slug}/"),
    }

    return record


def main() -> None:
    if not SELBORNE_DIR.exists():
        raise SystemExit(f"Missing directory: {SELBORNE_DIR}")

    terms = []
    seen_slugs = set()

    paths = sorted(SELBORNE_DIR.glob("*.md"))
    selected_paths = [p for p in paths if p.name not in EXCLUSIONS]

    for path in selected_paths:
        print(f"Processing {path} ...")
        term = build_term_record(path)

        slug = term["slug"]
        if slug in seen_slugs:
            raise ValueError(f"Duplicate slug: {slug}")
        seen_slugs.add(slug)

        terms.append(term)

    terms.sort(key=lambda t: (t["category"], t.get("order", 9999), t["title"].lower()))

    by_category = defaultdict(list)
    by_tag = defaultdict(list)

    for term in terms:
        by_category[term["category"]].append(term["slug"])
        for tag in term["tags"]:
            by_tag[tag].append(term["slug"])

    output = {
        "terms": terms,
        "by_category": dict(sorted(by_category.items())),
        "by_tag": dict(sorted(by_tag.items())),
    }

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(
        yaml.safe_dump(output, sort_keys=False, allow_unicode=True),
        encoding="utf-8",
    )

    print(f"Wrote {OUTPUT_FILE} with {len(terms)} terms.")

    image_catalogue = build_image_catalogue(terms)

    IMAGE_CREDITS_FILE.parent.mkdir(parents=True, exist_ok=True)
    IMAGE_CREDITS_FILE.write_text(
        yaml.safe_dump(image_catalogue, sort_keys=False, allow_unicode=True),
        encoding="utf-8",
    )

    print(f"Wrote {IMAGE_CREDITS_FILE} with {len(image_catalogue)} images.")



if __name__ == "__main__":
    main()