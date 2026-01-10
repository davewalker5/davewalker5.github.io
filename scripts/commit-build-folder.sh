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

# Safety tag so it's easy to roll back locally if needed
git tag -f "pre-truncate-$(date +%Y%m%d)" HEAD

# Find the base commit, N entries down
BASE_COMMIT=$(git rev-list --max-count=1 --skip=$(($MAX_COMMITS-1)) HEAD)

# Create a NEW ROOT commit with the same tree as BASE_COMMIT
NEW_ROOT=$(git commit-tree \
  "$(git rev-parse "$BASE_COMMIT^{tree}")" \
  -m "Truncate history: new root (kept last $MAX_COMMITS commits)")

# Rebase the commits after BASE_COMMIT onto the new root
git rebase --onto "$NEW_ROOT" "$BASE_COMMIT"

# Cleanup local refs/objects
git reflog expire --expire=now --all
git gc --prune=now
