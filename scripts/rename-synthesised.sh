#!/usr/bin/env bash

if (( $# != 2 )); then
    scriptname=$(basename -- "$0")
    echo Usage: $scriptname FOLDER MODEL
    exit 1
fi

MODEL=$2

for f in "$1"/*_synthesised.png; do
    filename="$(basename "$f")"

    base="${filename%_synthesised.png}"
    newbase="${base//_/-}"

    mv "$f" "$1/${MODEL}-${newbase}.png"
done
