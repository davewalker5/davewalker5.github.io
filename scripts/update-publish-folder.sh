#!/usr/bin/env bash

FOLDER=$(echo "$PUBLISH_ROOT" | awk -F'/' '{print $(NF-1)"/"$NF}')
section "Copying Reports to $FOLDER"

# If this isn't the GitHub working copy, copy the potentially amended files and folders to that working copy
shopt -s nocasematch
if [[ "$COPY" == "true" && "$PROJECT_ROOT" =~ "github" ]]; then
    folders=(
        "_data/"
        "_includes/"
        "_layouts/"
        "aircraft/"
        "assets/"
        "notebooks/"
        "reference/"
        "scripts/"
        "weather/"
        "wildlife/"
        "_config.yml"
        ".gitignore"
        "Gemfile"
        "index.md"
    )

    for folder in "${folders[@]}"; do
        rsync -av --delete "$PROJECT_ROOT/$folder" "$PUBLISH_ROOT/$folder"
    done
fi
shopt -u nocasematch
