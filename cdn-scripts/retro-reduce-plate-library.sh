#!/usr/bin/env bash

set -euo pipefail

shopt -s nullglob

for file in *.png; do

    echo "Processing: $file"

    original_size=$(stat -f%z "$file")

    tmp_file="${file%.png}-tmp.png"

    # Run pngquant
    pngquant \
        --quality=75-80 \
        --speed=1 \
        --force \
        --output "$tmp_file" \
        "$file"

    # Further optimise
    oxipng \
        -o max \
        --strip all \
        "$tmp_file"

    new_size=$(stat -f%z "$tmp_file")

    # Replace original
    mv "$tmp_file" "$file"

    saved=$((original_size - new_size))
    percent=$((saved * 100 / original_size))

    original_mb=$(awk "BEGIN {printf \"%.2f\", $original_size/1024/1024}")
    new_mb=$(awk "BEGIN {printf \"%.2f\", $new_size/1024/1024}")

    echo "  ${original_mb} MB -> ${new_mb} MB  (${percent}% saved)"
    echo

done

echo "Done."