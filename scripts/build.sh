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
COMMIT=""
PUSH=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --copy)
            COPY="true"
            shift 1
            ;;
        --commit)
            COPY="true"
            COMMIT="true"
            shift 1
            ;;
        --push)
            COPY="true"
            COMMIT="true"
            PUSH="true"
            shift 1
            ;;
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

# See if the virtual environment needs a rebuild
"$PROJECT_ROOT/scripts/check-venv-os.sh"
rebuild_required=$?

if [[ $rebuild_required -eq 1 ]]; then
    . "$PROJECT_ROOT/scripts/build-environment.sh"
fi

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
STARTING_DIR=`pwd`

# If specified, change to the folder containing the reports to run
if [ -n "$SITE_FOLDER" ]; then
    cd "$SITE_FOLDER"
else
    cd "$PROJECT_ROOT"
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
    sitename=$(basename "$(dirname "$file")")
    filename=$(basename -- "$file")

    # See if the notebook is in the exclusions list
    found=0
    if [[ " ${exclusions[@]} " =~ " $filename " ]]; then
        echo "Notebook $filename is in the exclusions list and will not be run"
        found=1
    fi

    # If this notebook isn't in the exclusions list, run it
    if [[ found -eq 0 ]]; then
        # Make sure we're in the right folder to run it
        CURRENT_DIR=`pwd`
        cd "$PROJECT_ROOT/notebooks/$sitename"

        # The wildlife site notebooks require parameters while the aircraft site notebooks don't, so run papermill
        # with appropriate parameters
        if [[ "$sitename" == "wildlife" ]]; then
            papermill "$filename" /dev/null \
                -p country "$COUNTRY" \
                -p location "$LOCATION" \
                -p category "$CATEGORY" \
                -p year "$YEAR"
        else
            papermill "$filename" /dev/null
        fi

        # Restore the working folder
        cd "$CURRENT_DIR"
    fi
done <<< "$files"

# If this isn't the GitHub working copy, copy the potentially amended files and folders to that working copy
shopt -s nocasematch
if [[ "$COPY" == "true" && "$PROJECT_ROOT" =~ "github" ]]; then
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

    for folder in "${folders[@]}"; do
        rsync -av --delete "$PROJECT_ROOT/$folder" "$PUBLISH_ROOT/$folder"
    done
fi
shopt -u nocasematch

# Commit changes, if requested
if [ "$COMMIT" == "true" ]; then

# Commit the changes
if [ "$COMMIT" == "true" ]; then
    timestamp=$(date +"%d-%b-%Y %H:%M:%S")
    cd "$PROJECT_ROOT"
    git stage .
    git status
    git commit -m "Report update @ $timestamp"

    cd "$PUBLISH_ROOT"
    git stage .
    git status
    git commit -m "Report update @ $timestamp"
fi

# Push changes, if requested
if [ "$PUSH" == "true" ]; then
    cd "$PUBLISH_ROOT"
    git push
fi

# Restore the current working directory
cd "$STARTING_DIR"

# Now build the Jekyll site
bundle exec jekyll build
