#!/bin/bash -f

# Get the project root folder
export PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )
export PUBLISH_ROOT="${PROJECT_ROOT%/*/*}/GitHub/davewalker5.github.io"

# If an (optional) site has been specified, make sure it exists
SITE_NAME=""
COUNTRY=""
LOCATION=""
CATEGORY=""
YEAR=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --site)
            SITE_NAME=$2
            shift 2
            ;;
        --country)
            COUNTRY=$2
            shift 2
            ;;
        --location)
            LOCATION=$2
            shift 2
            ;;
        --category)
            CATEGORY=$2
            shift 2
            ;;
        --year)
            YEAR=$2
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Site to build for
if [ ! -z "$SITE_NAME" ]; then
    SITE_FOLDER="$PROJECT_ROOT/notebooks/$SITE_NAME"
    if [ ! -d "$SITE_FOLDER" ]; then
        echo "Site folder '$SITE_FOLDER' not found"
        exit 1
    fi
fi

echo
echo "Build Parameters:"
echo
echo "Site     : $SITE_NAME"
echo "Country  : $COUNTRY"
echo "Location : $LOCATION"
echo "Category : $CATEGORY"
echo "Year     : $YEAR"
echo

# Activate the virtual environment
. $PROJECT_ROOT/venv/bin/activate

# Suppress warnings about the output file extension
export PYTHONWARNINGS="ignore"

# Define a list of notebooks to skip
declare -a exclusions=(
    "database.ipynb"
    "definitions.ipynb"
    "export.ipynb"
    "pathutils.ipynb"
    "utils.ipynb"
)

# Store the current working directory so we can restore it
CURDIR=`pwd`

# If specified, change to the folder containing the reports to run
if [ -n "$SITE_FOLDER" ]; then
    cd "$SITE_FOLDER"
fi

# Copy the database files into place
if [[ -z "$1" || "$1" == "aircraft" ]]; then
    cp "$FLIGHT_RECORDER_DB" "$PROJECT_ROOT/assets/downloads"
fi

if [[ -z "$1" || "$1" == "wildlife" ]]; then
    cp "$NATURE_RECORDER_DB" "$PROJECT_ROOT/assets/downloads"
fi

# Get a list of Jupyter Notebooks and iterate over them
files=$(find . -name '*.ipynb')
while IFS= read -r file; do
    # Get the notebook file name and extension without the path
    folder=$(dirname "$file")
    filename=$(basename -- "$file")

    # See if the notebook is in the exclusions list
    found=0
    if [[ " ${exclusions[@]} " =~ " $filename " ]]; then
        echo "Notebook $filename is in the exclusions list and will not be run"
        found=1
    fi

    # If this notebook isn't in the exclusions list, run it
    if [[ found -eq 0 ]]; then
        cd "$folder"
        if [[ "$folder" == "wildlife" ]]; then
            papermill "$filename" /dev/null \
                -p country "$COUNTRY" \
                -p location "$LOCATION" \
                -p category "$CATEGORY" \
                -p year "$YEAR"
        else
            papermill "$filename" /dev/null
        fi
    fi
done <<< "$files"

# If this isn't the publication folder, copy the aircraft and wildlife reports output and the
# downloadable assets to that folder and commit the changes
shopt -s nocasematch

if [[ "$PROJECT_ROOT" =~ "github" ]]; then
    # Define the list of folders to copy
    folders=(
        "_data/"
        "_includes/"
        "_layouts/"
        "aircraft/"
        "assets/"
        "notebooks/"
        "reference/"
        "scripts/"
        "wildlife/"
        "_config.yml"
        ".gitignore"
        "Gemfile"
        "Gemfile.lock"
        "index.md"
    )

    # Copy them
    for folder in "${folders[@]}"; do
        rsync -av --delete "$PROJECT_ROOT/$folder" "$PUBLISH_ROOT/$folder"
    done

    # Commit the changes
    cd "$PUBLISH_ROOT"
    timestamp=$(date +"%d-%b-%Y %H:%M:%S")
    git stage .
    git status
    git commit -m "Report update @ $timestamp"
fi

shopt -u nocasematch

# Restore the current working directory
cd "$CURDIR"

# Now build the Jekyll site
bundle exec jekyll build
