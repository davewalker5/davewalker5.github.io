#!/bin/bash -f

# Get the project root folder
export PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )

# If an (optional) site has been specified, make sure it exists
SITE_FOLDER=""
COUNTRY=$2
LOCATION=$3
CATEGORY=$4
YEAR=$5

# Site to build for
if [ ! -z $1 ]; then
    SITE_FOLDER="$PROJECT_ROOT/notebooks/$1"
    if [ ! -d "$SITE_FOLDER" ]; then
        echo "Site folder '$1' not found"
        exit 1
    fi
fi

echo
echo "Build Parameters:"
echo
echo "Site     : $SITE_FOLDER"

if [[ "$1" == "wildlife" ]]; then
    echo "Country  : $COUNTRY"
    echo "Location : $LOCATION"
    echo "Category : $CATEGORY"
    echo "Year     : $YEAR"
fi

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

# Restore the current working directory
cd "$CURDIR"

# Now build the Jekyll site
bundle exec jekyll build
