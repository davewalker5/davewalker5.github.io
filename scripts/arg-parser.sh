#!/usr/bin/env bash

section "Parsing Arguments"

# Initialise build parameters
export SITE_NAME=""
export COUNTRY=""
export export LOCATION=""
export CATEGORY=""
export YEAR=""
export COMMIT=""
export PUSH=""
export NO_UPDATE=""
export FORCE=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --copy)
            export COPY="true"
            shift 1
            ;;
        --commit)
            export COPY="true"
            export COMMIT="true"
            shift 1
            ;;
        --push)
            export COPY="true"
            export COMMIT="true"
            export PUSH="true"
            shift 1
            ;;
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
        --noupdate)
            export NO_UPDATE="true"
            shift 1
            ;;
        --force)
            export FORCE="true"
            shift 1
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done
