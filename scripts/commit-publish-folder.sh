#!/usr/bin/env bash

FOLDER=$(echo "$PUBLISH_ROOT" | awk -F'/' '{print $(NF-1)"/"$NF}')
section "Committing $FOLDER"

TIMESTAMP=$(date +"%d-%b-%Y %H:%M:%S")

# Stage and commit the changes in the publication folder working copy
cd "$PUBLISH_ROOT"

git stage .
git status
git commit -m "Report update @ $TIMESTAMP"

TARGET_COMMIT=HEAD

# Find the base commit, 1 entry down
NEW_ROOT=$(git commit-tree \
  "$(git rev-parse "$TARGET_COMMIT^{tree}")" \
  -m "Report update @ $TIMESTAMP")

# Do a hard reset to that tag
git reset --hard "$NEW_ROOT"

# Cleanup local refs/objects
git reflog expire --expire=now --all
git gc --prune=now

# Push the changes
git push --force-with-lease origin main
git push --tags --force-with-lease
