#!/usr/bin/env bash

FOLDER=$(echo "$PROJECT_ROOT" | awk -F'/' '{print $(NF-1)"/"$NF}')
section "Committing $FOLDER"

TIMESTAMP=$(date +"%d-%b-%Y %H:%M:%S")
MAX_COMMITS=10

# Stage and commit the changes in the build folder working copy
cd "$PROJECT_ROOT"

git stage .
git status
git commit -m "Report update @ $TIMESTAMP"

# Make the N'th commit down appear to be the first commit in the repository,
# rewrite history to drop all commits before the apparent first commit (using
# filter-branch as that's supported without additional installs) and remove
# the grafted initial commit as it's no longer needed
export FILTER_BRANCH_SQUELCH_WARNING=1
BASE_COMMIT=$(git rev-list --max-count=1 --skip=$(($MAX_COMMITS-1)) HEAD)
git replace --graft "$BASE_COMMIT"
git filter-branch -- --all
git replace -d "$BASE_COMMIT"

# Remove references to commits that are no longer accessible after history has been
# pruned and clean up versions of objects that are no longer accessible
git reflog expire --expire=now --all
git gc --prune=now --aggressive
