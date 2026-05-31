#!/usr/bin/env bash

section "Checking Build Status"

if [[ "$DRY_RUN" == "true" ]]; then
    echo "Dry run requested : Buld required is true for $1"
    exit 1
fi

SITES=(
    "aircraft"
    "microscopy"
    "recordings"
    "weather"
    "wildlife"
)

ASSET=(
    "$CDN_ROOT/downloads/databases/flightrecorder.db.gz"
    "$PROJECT_ROOT/_data/leitz_plates.csv"
    "$PROJECT_ROOT/_data/recording_index.csv"
    "$CDN_ROOT/downloads/databases/weather.db.gz"
    "$CDN_ROOT/downloads/databases/naturerecorder.db.gz"
)

LIVE_DBS=(
    "$FLIGHT_RECORDER_DB"
    "$MICROSCOPY_PLATE_LIBRARY/plate_library.db"
    "$WILDLIFE_RECORDINGS_LIBRARY/Index.xlsx"
    "$WEATHER_DB"
    "$NATURE_RECORDER_DB"
)

BUILD_REQUIRED=0

for i in "${!SITES[@]}"; do
    if [[ -z "$1" || ${SITES[$i]} == "$1" ]]; then
        ASSET_PATH="${ASSET[$i]}"

        ASSET_MODIFIED=$([[ -f "$ASSET_PATH" ]] && stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" "$ASSET_PATH" || echo "None")
        LIVE_MODIFIED=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" "${LIVE_DBS[$i]}")

        echo "${SITES[$i]} Site:"
        echo "   Asset File Path : $ASSET_PATH ($ASSET_MODIFIED)"
        echo "   Live File Path  : ${LIVE_DBS[$i]} ($LIVE_MODIFIED)"

        if [[ ! -f "$ASSET_PATH" ]] || [[ "${LIVE_DBS[$i]}" -nt "$ASSET_PATH" ]]; then
            OUT_OF_DATE=1
        else
            OUT_OF_DATE=0
        fi

        echo "   Build Required : $OUT_OF_DATE"

        if [[ $OUT_OF_DATE -eq 1 ]]; then
            BUILD_REQUIRED=1
        fi
    fi
done

exit $BUILD_REQUIRED
