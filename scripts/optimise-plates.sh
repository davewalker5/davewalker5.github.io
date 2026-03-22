#!/usr/bin/env bash

export PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )
PLATES_FOLDER="$PROJECT_ROOT/assets/plates"
FULL_FOLDER="$PLATES_FOLDER/full"
PREVIEW_FOLDER="$PLATES_FOLDER/preview"

mkdir -p "$PREVIEW_FOLDER"

for plate in "$FULL_FOLDER"/*.png; do
  echo "Optimising $plate ..."
  magick "$plate" \
    -strip \
    -resize 1600x1600\> \
    -dither FloydSteinberg \
    -colors 128 \
    PNG8:"$PREVIEW_FOLDER/$(basename "$plate")"
done
