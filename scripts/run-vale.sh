#!/usr/bin/env bash

if (( $# != 1 )); then
    scriptname=$(basename -- "$0")
    echo Usage: $scriptname FOLDER-PATH
    exit 1
fi

vale "$1"
