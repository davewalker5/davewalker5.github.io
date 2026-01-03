#!/usr/bin/env bash

section "Copying SQLite Databases"

# If this is a "no update" run, don't copy the database files
if [[ "$NO_UPDATE" == "true" ]]; then
    exit 0
fi

# Copy the database files into place
if [[ -z "$SITE_NAME" || "$SITE_NAME" == "aircraft" ]]; then
    echo "Copying $FLIGHT_RECORDER_DB"
    cp "$FLIGHT_RECORDER_DB" "$PROJECT_ROOT/assets/downloads"
fi

if [[ -z "$SITE_NAME" || "$SITE_NAME" == "wildlife" ]]; then
    echo "Copying $NATURE_RECORDER_DB"
    cp "$NATURE_RECORDER_DB" "$PROJECT_ROOT/assets/downloads"
fi

if [[ -z "$SITE_NAME" || "$SITE_NAME" == "weather" ]]; then
    echo "Copying $WEATHER_DB"
    cp "$WEATHER_DB" "$PROJECT_ROOT/assets/downloads"
fi

