#!/usr/bin/env bash
set -euo pipefail

# Record start time (epoch seconds)
STARTED=$(date +%s)
echo "Build started at: $(date '+%Y-%m-%d %H:%M:%S')"

# Get the project root folder
export PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )
export SCRIPT_DIR="$PROJECT_ROOT/cdn-scripts"

UPLOAD_ARGS=(
    --source "$CDN_ROOT"
    --bucket "$CDN_BUCKET"
    --target /
)

if [[ $# -gt 1 || ( $# -eq 1 && "$1" != "--dry-run" ) ]]; then
    echo "Usage: $(basename -- "$0") [--dry-run]"
    exit 1
fi

if [[ "${1:-}" == "--dry-run" ]]; then
    UPLOAD_ARGS+=(--dry-run)
fi

"$SCRIPT_DIR/upload-to-cdn.sh" "${UPLOAD_ARGS[@]}"
