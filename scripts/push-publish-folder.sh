#!/usr/bin/env bash

FOLDER=$(echo "$PUBLISH_ROOT" | awk -F'/' '{print $(NF-1)"/"$NF}')
section "Pushing $FOLDER"

cd "$PUBLISH_ROOT"
git push --force
