#!/usr/bin/env bash

FOLDER=$(echo "$1" | awk -F'/' '{print $(NF-1)"/"$NF}')
section "Check Out $FOLDER"

cd "$1"
git checkout main
# git reset --hard HEAD
# git clean -fd