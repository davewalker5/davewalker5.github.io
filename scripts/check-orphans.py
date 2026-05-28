from __future__ import annotations

import argparse
import fnmatch
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote


LINK_ATTRS = {
    "a": ["href"],
    "link": ["href"],
    "script": ["src"],
    "img": ["src", "srcset"],
    "source": ["src", "srcset"],
    "audio": ["src"],
    "video": ["src", "poster"],
    "iframe": ["src"],
}


DEFAULT_EXCLUDES = [
    "publication/**",
    ".git/**",
    "*.map",
]


class LinkExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links: list[str] = []

    def handle_starttag(self, tag, attrs):
        attr_map = dict(attrs)
        for attr in LINK_ATTRS.get(tag, []):
            value = attr_map.get(attr)
            if not value:
                continue

            if attr == "srcset":
                for part in value.split(","):
                    self.links.append(part.strip().split()[0])
            else:
                self.links.append(value)


def is_excluded(rel_path: Path, patterns: list[str]) -> bool:
    rel = rel_path.as_posix()
    return any(fnmatch.fnmatch(rel, pattern) for pattern in patterns)


def normalise_link(link: str) -> str | None:
    link = link.strip()

    if not link:
        return None

    parsed = urlparse(link)

    if parsed.scheme in {"http", "https", "mailto", "tel", "javascript", "data"}:
        return None

    if parsed.netloc:
        return None

    path = unquote(parsed.path)

    if not path:
        return None

    return path


def resolve_link(root: Path, source_file: Path, link_path: str) -> Path | None:
    if link_path.startswith("/"):
        candidate = root / link_path.lstrip("/")
    else:
        candidate = source_file.parent / link_path

    candidate = candidate.resolve()

    try:
        candidate.relative_to(root.resolve())
    except ValueError:
        return None

    if candidate.is_dir():
        index = candidate / "index.html"
        if index.exists():
            return index

    if candidate.exists():
        return candidate

    # Jekyll-style pretty URL fallback: /foo -> /foo.html or /foo/index.html
    if candidate.suffix == "":
        for ext in [".html", ".htm"]:
            with_ext = candidate.with_suffix(ext)
            if with_ext.exists():
                return with_ext

        index = candidate / "index.html"
        if index.exists():
            return index

    return None


def extract_links_from_html(path: Path) -> list[str]:
    parser = LinkExtractor()
    try:
        parser.feed(path.read_text(encoding="utf-8", errors="ignore"))
    except Exception as exc:
        print(f"Warning: could not parse {path}: {exc}", file=sys.stderr)
    return parser.links


def main() -> int:
    argp = argparse.ArgumentParser()
    argp.add_argument("-r", "--root", nargs="?", default="_site", help="Root folder for the site")
    argp.add_argument("-e", "--exclude", action="append", default=[], help="Glob pattern relative to site root; may be repeated")
    argp.add_argument("-ia", "--include-assets", action="store_true", help="Also report orphan non-HTML assets")
    args = argp.parse_args()

    root = Path(args.root).resolve()
    excludes = DEFAULT_EXCLUDES + args.exclude

    if not root.exists():
        print(f"Site root does not exist: {root}", file=sys.stderr)
        return 2

    html_files = [
        p for p in root.rglob("*.html")
        if not is_excluded(p.relative_to(root), excludes)
    ]

    all_files = {
        p.resolve()
        for p in root.rglob("*")
        if p.is_file()
        and not is_excluded(p.relative_to(root), excludes)
    }

    if not args.include_assets:
        all_files = {p for p in all_files if p.suffix.lower() in {".html", ".htm"}}

    referenced: set[Path] = set()

    # Treat homepage as intentionally reachable.
    for name in ["index.html", "index.htm"]:
        home = root / name
        if home.exists():
            referenced.add(home.resolve())

    inbound_count: dict[Path, int] = {}

    for html in html_files:
        for raw_link in extract_links_from_html(html):
            link_path = normalise_link(raw_link)
            if link_path is None:
                continue

            target = resolve_link(root, html, link_path)
            if target is None:
                continue

            target = target.resolve()
            referenced.add(target)
            inbound_count[target] = inbound_count.get(target, 0) + 1

    orphans = sorted(all_files - referenced)

    if not orphans:
        print("No orphan files found.")
        return 0

    print("Orphan files:")
    for path in orphans:
        print(f"  {path.relative_to(root)}")

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
