#!/usr/bin/env bash

set -euo pipefail

# Port on which the local copy of Field Notes is listening
PORT=8091

PROJECT_ROOT=$(cd "$(dirname "$0")/.." && pwd)
export PROJECT_ROOT
cd "$PROJECT_ROOT"

SITE_ROOT="$PROJECT_ROOT/_site"
LOCAL_URL="http://localhost:$PORT"

# Check the generated build and its running local web server.
if [[ ! -f "$SITE_ROOT/index.html" ]]; then
    echo "Build not found: $SITE_ROOT/index.html" >&2
    exit 1
fi

if ! curl --fail --silent --show-error --location \
    --max-time 10 "$LOCAL_URL/" >/dev/null; then
    echo "Start the Field Notes local web server on port $PORT first." >&2
    exit 1
fi

# Escape the build path for use in a regular expression.
SITE_PATTERN=$(printf '%s' "$SITE_ROOT" |
    sed 's/[][\\.^$*+?(){}|]/\\&/g')

# Run the checks
clear
lychee --accept 200,429 \
    --root-dir "$SITE_ROOT" \
    --remap "^file://${SITE_PATTERN}/ ${LOCAL_URL}/" \
    --remap "^https?://fieldnotesjournal\.uk([/?#]|$) ${LOCAL_URL}\$1" \
    --exclude-path '(^|/)_site/publication(/|$)' \
    --exclude '^https://www\.tripadvisor\.co\.uk/Profile/DaveWalker5([/?#]|$)' \
    --exclude '^http://www\.bats\.org\.uk/' \
    --exclude '^https://www\.airhistory\.org\.uk/' \
    --exclude '^https://www\.airhistory\.net/' \
    --exclude '^https://www\.ebay\.co\.uk/' \
    --exclude '^https://heritage\.baesystems\.com/' \
    --exclude '^https://www\.gutenberg\.org/' \
    --exclude '^https://doi\.org/10\.1901/jeab\.1959\.2-57([?#]|$)' \
    '_site/**/*.html'
