#!/usr/bin/env bash

FOLDER=$(echo "$PUBLISH_ROOT" | awk -F'/' '{print $(NF-1)"/"$NF}')
section "Pushing $FOLDER"

# This script is run from cron and so won't inherit SSH_AUTH_SOCK
export SSH_AUTH_SOCK="$(/bin/launchctl getenv SSH_AUTH_SOCK)"

cd "$PUBLISH_ROOT"
git push --force
