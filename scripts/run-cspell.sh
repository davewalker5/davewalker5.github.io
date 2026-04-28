#!/usr/bin/env bash

if (( $# != 1 )); then
    scriptname=$(basename -- "$0")
    echo Usage: $scriptname FOLDER-PATH
    exit 1
fi

npx cspell "$1" 2>&1 \
  | grep 'Unknown word' \
  | grep -oE '\([^)]*\)' \
  | tr -d '()' \
  | tr '[:upper:]' '[:lower:]' \
  | sort -u
