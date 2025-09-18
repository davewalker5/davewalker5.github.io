#!/usr/bin/env bash

FOLDER=$(echo "$PUBLISH_ROOT" | awk -F'/' '{print $(NF-1)"/"$NF}')
section "Committing $FOLDER"

TIMESTAMP=$(date +"%d-%b-%Y %H:%M:%S")

# Stage and commit the changes in the publication folder working copy
cd "$PUBLISH_ROOT"

git stage .
git status
git commit -m "Report update @ $TIMESTAMP"

# Remove all but the most recent history entry
git reset --hard $(git commit-tree HEAD^{tree} -m "Report update @ $TIMESTAMP")

# Remove references to commits that are no longer accessible after history has been
# pruned and clean up versions of objects that are no longer accessible
git reflog expire --expire=now --all
git gc --prune=now --aggressive