#!/usr/bin/env bash

# Record start time (epoch seconds)
STARTED=$(date +%s)
echo "Build started at: $(date '+%Y-%m-%d %H:%M:%S')"

# Get the project root folder
export PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )
export SCRIPT_DIR="$PROJECT_ROOT/cdn-scripts"

"$SCRIPT_DIR/upload-to-cdn.sh" --source $CDN_ROOT --bucket $CDN_BUCKET --target /
