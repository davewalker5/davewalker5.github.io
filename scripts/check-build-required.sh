#!/usr/bin/env bash

section "Checking Build Status"

if [[ "$FORCE" == "true" ]]; then
    echo "Forced build requested - bypassing database checks"
    exit 1
fi

SITES=("aircraft" "wildlife" "weather")
ASSET=("flightrecorder.db" "naturerecorder.db" "weather.db")
LIVE_DBS=("$FLIGHT_RECORDER_DB" "$NATURE_RECORDER_DB" "$WEATHER_DB")
BUILD_REQUIRED=0

for i in "${!SITES[@]}"; do
    if [[ -z "$1" || ${SITES[$i]} == "$1" ]]; then
        ASSET_PATH="$PROJECT_ROOT/assets/downloads/${ASSET[$i]}"

        echo "${SITES[$i]} Site:"
        echo "   Asset Database : $ASSET_PATH"
        echo "   Live Database  : ${LIVE_DBS[$i]}"

        if [[ ! -f "$ASSET_PATH" ]] || ! cmp -s "$ASSET_PATH" "${LIVE_DBS[$i]}"; then
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
