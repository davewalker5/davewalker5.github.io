#!/usr/bin/env bash
set -euo pipefail

# Get the project root folder
export PROJECT_ROOT
PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )
export SCRIPT_DIR="$PROJECT_ROOT/cdn-scripts"

if [[ -z "${CDN_ROOT:-}" ]]; then
    echo "CDN_ROOT is not set"
    exit 1
fi

if [[ ! -d "$CDN_ROOT" ]]; then
    echo "CDN root folder does not exist: $CDN_ROOT"
    exit 1
fi

export CDN_MANIFEST="$CDN_ROOT/.cdn-upload-manifest.tsv"
FILE_LIST="$(mktemp)"
UPDATED_MANIFEST="$(mktemp "${CDN_MANIFEST}.updated.XXXXXX")"

cleanup() {
    rm -f "$FILE_LIST" "$UPDATED_MANIFEST"
}

trap cleanup EXIT

# Build a complete manifest directly from the local CDN contents. Snapshot the
# paths first so replacing the manifest cannot affect the directory traversal.
find "$CDN_ROOT" -type f \
    ! -name ".cdn-upload-manifest.tsv" \
    ! -name ".cdn-upload-manifest.tsv.*" \
    ! -name ".DS_Store" \
    -print0 > "$FILE_LIST"

while IFS= read -r -d '' file; do
    relative_path="${file#$CDN_ROOT/}"
    hash="$(sha256sum "$file" | awk '{print $1}')"
    printf '%s\t%s\n' "$relative_path" "$hash" >> "$UPDATED_MANIFEST"
done < "$FILE_LIST"

mv "$UPDATED_MANIFEST" "$CDN_MANIFEST"
echo "Regenerated local CDN manifest: $CDN_MANIFEST"

# Activate the virtual environment
. "$PROJECT_ROOT/venv/bin/activate"

# Build the site data files
declare -a DATA_FILE_TYPES=(
    "aircraft-manufacturers"
    "aircraft-reports"
    "weather-reports"
    "wildlife-reports"
)

for data_type in "${DATA_FILE_TYPES[@]}"; do
    python "$SCRIPT_DIR/generate-report-data.py" --manifest "$CDN_MANIFEST" --type $data_type
done
