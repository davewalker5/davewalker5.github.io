#!/usr/bin/env bash

section "Running Jupyter Notebooks"

# Capture the site rebuild flags
RUN_AIRCRAFT_NOTEBOOKS=$1
RUN_WILDLIFE_NOTEBOOKS=$2
RUN_WEATHER_NOTEBOOKS=$3

# Suppress warnings about the output file extension
export PYTHONWARNINGS="ignore"

# Define a list of notebooks to skip
declare -a exclusions=(
    "database.ipynb"
    "definitions.ipynb"
    "export.ipynb"
    "pathutils.ipynb"
    "utils.ipynb"
    "health.ipynb"
)

# Get a list of Jupyter Notebooks and iterate over them
files=$(find "$NOTEBOOKS_FOLDER" -name '*.ipynb')
while IFS= read -r file; do
    # Get the notebook file name and extension without the path
    sitename=$(basename "$(dirname "$file")")
    filename=$(basename -- "$file")

    # See if the notebook is in the exclusions list
    EXCLUDED=0
    if [[ " ${exclusions[@]} " =~ " $filename " ]]; then
        echo "Notebook $sitename/$filename is in the exclusions list and will not be run"
        EXCLUDED=1
    fi

    # Also see if the site the notebook relates to requires a build
    RUN_NOTEBOOK=0
    if [[ $RUN_AIRCRAFT_NOTEBOOKS -eq 1 && "$sitename" == "aircraft" ]]; then
        RUN_NOTEBOOK=1
    fi

    if [[ $RUN_WILDLIFE_NOTEBOOKS -eq 1 && "$sitename" == "wildlife" ]]; then
        RUN_NOTEBOOK=1
    fi

    if [[ $RUN_WEATHER_NOTEBOOKS -eq 1 && "$sitename" == "weather" ]]; then
        RUN_NOTEBOOK=1
    fi

    # If this notebook isn't in the exclusions list, run it
    if [[ $EXCLUDED -eq 0 && $RUN_NOTEBOOK -eq 1 ]]; then
        # Make sure we're in the right folder to run it
        cd "$PROJECT_ROOT/notebooks/$sitename"

        # The wildlife site notebooks require parameters while the aircraft site notebooks don't, so run papermill
        # with appropriate parameters
        echo "Running notebook $sitename/$filename ..."
        if [[ "$NO_UPDATE" == "" ]]; then
            if [[ "$sitename" == "wildlife" ]]; then
                papermill "$filename" /dev/null \
                    -p country "$COUNTRY" \
                    -p location "$LOCATION" \
                    -p category "$CATEGORY" \
                    -p year "$YEAR"
            else
                papermill "$filename" /dev/null
            fi
        fi
    fi
done <<< "$files"
