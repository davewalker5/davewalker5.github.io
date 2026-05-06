#!/usr/bin/env bash

section "Locating Notebooks Folder"

if [ ! -z "$SITE_NAME" ]; then
    export NOTEBOOKS_FOLDER="$PROJECT_ROOT/notebooks/$SITE_NAME"
    if [ ! -d "$NOTEBOOKS_FOLDER" ]; then
        echo "Notebooks folder '$NOTEBOOKS_FOLDER' not found"
        exit 1
    fi
else
    export NOTEBOOKS_FOLDER="$PROJECT_ROOT/notebooks"
fi
