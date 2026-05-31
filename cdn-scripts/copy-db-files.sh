#!/usr/bin/env bash

section "Copying SQLite Databases"

# Copy the database files into place
if [[ -z "$SITE_NAME" || "$SITE_NAME" == "aircraft" ]]; then
    if [[ "$DRY_RUN" != "true" ]]; then
        echo "Copying $FLIGHT_RECORDER_DB"
        cp "$FLIGHT_RECORDER_DB" "$CDN_ROOT/downloads/databases/"
        filename=$(basename "$FLIGHT_RECORDER_DB")
        gzip -f "$CDN_ROOT/downloads/databases/$filename"
    else
        echo "Would copy $FLIGHT_RECORDER_DB"
    fi
fi

if [[ -z "$SITE_NAME" || "$SITE_NAME" == "wildlife" ]]; then
    if [[ "$DRY_RUN" != "true" ]]; then
        echo "Copying $NATURE_RECORDER_DB"
        cp "$NATURE_RECORDER_DB" "$CDN_ROOT/downloads/databases/"
        filename=$(basename "$NATURE_RECORDER_DB")
        gzip -f "$CDN_ROOT/downloads/databases/$filename"
    else
        echo "Would copy $NATURE_RECORDER_DB"
    fi
fi

if [[ -z "$SITE_NAME" || "$SITE_NAME" == "weather" ]]; then
    if [[ "$DRY_RUN" != "true" ]]; then
        echo "Copying $WEATHER_DB"
        cp "$WEATHER_DB" "$CDN_ROOT/downloads/databases/"
        filename=$(basename "$WEATHER_DB")
        gzip -f "$CDN_ROOT/downloads/databases/$filename"
    else
        echo "Would copy $WEATHER_DB"
    fi
fi

if [[ -z "$SITE_NAME" || "$SITE_NAME" == "microscopy" ]]; then
    if [[ "$DRY_RUN" != "true" ]]; then
        echo "Copying $MICROSCOPY_PLATE_LIBRARY/plate_library.db"
        cp "$MICROSCOPY_PLATE_LIBRARY/plate_library.db" "$CDN_ROOT/downloads/databases/"
        gzip -f "$CDN_ROOT/downloads/databases/plate_library.db"
    else
        echo "Would copy $MICROSCOPY_PLATE_LIBRARY/plate_library.db"
    fi
fi
