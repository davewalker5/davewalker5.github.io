#!/usr/bin/env bash

section "Parsing Arguments"

# Initialise build parameters
export SITE_NAME=""
export COUNTRY=""
export LOCATION=""
export CATEGORY=""
export YEAR=""
export DRY_RUN=""
export STATUS_ONLY=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --site)
            export SITE_NAME=$2
            shift 2
            ;;
        --country)
            export COUNTRY=$2
            shift 2
            ;;
        --location)
            export LOCATION=$2
            shift 2
            ;;
        --category)
            export CATEGORY=$2
            shift 2
            ;;
        --year)
            export YEAR=$2
            shift 2
            ;;
        --dry-run)
            export DRY_RUN="true"
            shift 1
            ;;
        --no-upload)
            export NO_UPLOAD="true"
            shift 1
            ;;
        --status)
            export STATUS_ONLY="true"
            shift 1
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done
