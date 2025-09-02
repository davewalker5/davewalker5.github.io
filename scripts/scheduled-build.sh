#!/bin/bash

PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )
YEAR=$(date +"%Y")
"$PROJECT_ROOT/scripts/build.sh" --year $YEAR --push
