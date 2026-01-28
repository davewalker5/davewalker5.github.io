#!/usr/bin/env bash

# Declare the function to output section headers
section() {
    local title="$*"
    title_upper=$(echo "$title" | tr '[:lower:]' '[:upper:]')
    local width=120
    local prefix="--- "
    local fill='-'

    # Build the left-hand part: '--- ' + UPPERCASE TITLE + ' '
    local head="${prefix}${title_upper} "
    local rest=$(( width - ${#head} ))

    if (( rest > 0 )); then
        printf '%s' "$head"
        printf '%*s\n' "$rest" '' | tr ' ' "$fill"
    else
        # If title is too long, clip to width
        printf '%s\n' "${head:0:$width}"
    fi
}

export -f section

# Record start time (epoch seconds)
STARTED=$(date +%s)
echo "Build started at: $(date '+%Y-%m-%d %H:%M:%S')"

# Capture the versions of Python and Ruby
PYTHON_VER=`python --version 2>&1`
RUBY_VER=`ruby --version 2>&1`

# Get the project root folder
export PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )
export PUBLISH_ROOT="${PROJECT_ROOT%/*/*}/GitHub/davewalker5.github.io"
export SCRIPT_DIR="$PROJECT_ROOT/scripts"

# Parse the command line arguments
. "$SCRIPT_DIR/arg-parser.sh" "$@"

# Locate the folder containing the notebooks
. "$SCRIPT_DIR/locate-notebook-folder.sh"

# Determine which sites need a rebuild
"$SCRIPT_DIR/check-build-required.sh" aircraft
AIRCRAFT_BUILD_REQUIRED=$?

"$SCRIPT_DIR/check-build-required.sh" wildlife
WILDLIFE_BUILD_REQUIRED=$?

"$SCRIPT_DIR/check-build-required.sh" weather
WEATHER_BUILD_REQUIRED=$?

# Show the build parameters
section "Build Parameters"
echo "Project Folder   : $PROJECT_ROOT"
echo "Publish Folder   : $PUBLISH_ROOT"
echo "Python Version   : $PYTHON_VER"
echo "Ruby Version     : $RUBY_VER"
echo "Site             : $SITE_NAME"
echo "Notebooks Folder : $NOTEBOOKS_FOLDER"
echo "Country          : $COUNTRY"
echo "Location         : $LOCATION"
echo "Category         : $CATEGORY"
echo "Year             : $YEAR"
echo "Copy output      : $COPY"
echo "Commit changes   : $COMMIT"
echo "Push changes     : $PUSH"
echo "No updates       : $NO_UPDATE"
echo "Aircraft rebuild : $AIRCRAFT_BUILD_REQUIRED"
echo "Wildlife rebuild : $WILDLIFE_BUILD_REQUIRED"
echo "Weather rebuild  : $WEATHER_BUILD_REQUIRED"
echo "Force build      : $FORCE"

# If a build isn't required, exit
if [[ $AIRCRAFT_BUILD_REQUIRED -eq 0 && $WILDLIFE_BUILD_REQUIRED -eq 0 && $WEATHER_BUILD_REQUIRED -eq 0 ]]; then
    echo "Rebuild is not required"
    exit 0
fi

# Make sure the main branch of local and publish projects are checkout out
"$SCRIPT_DIR/checkout.sh" "$PROJECT_ROOT"
"$SCRIPT_DIR/checkout.sh" "$PUBLISH_ROOT"

# Rebuild the virtual environment, if needed
"$SCRIPT_DIR/build-environment.sh"

# Activate the virtual environment
. "$PROJECT_ROOT/venv/bin/activate"

# Copy the database files into place
"$SCRIPT_DIR/copy-db-files.sh"

# Run the Jupyter notebooks to update the reports
"$SCRIPT_DIR/run-notebooks.sh" $AIRCRAFT_BUILD_REQUIRED $WILDLIFE_BUILD_REQUIRED $WEATHER_BUILD_REQUIRED

# Copy the updated reports to the publish folder
"$SCRIPT_DIR/update-publish-folder.sh"

# Commit the changes
if [ "$COMMIT" == "true" ]; then
    "$SCRIPT_DIR/commit-build-folder.sh"
    "$SCRIPT_DIR/commit-publish-folder.sh"
fi

# Push changes, if requested
if [ "$PUSH" == "true" ]; then
    "$SCRIPT_DIR/push-publish-folder.sh"
fi

# Record end time (epoch seconds)
ENDED=$(date +%s)
echo "Build completed at: $(date '+%Y-%m-%d %H:%M:%S')"

# Calculate elapsed time in seconds
ELAPSED=$(( $ENDED - $STARTED ))

# Convert seconds into HH:MM:SS
DURATION=$(printf "%02d:%02d:%02d" $(($ELAPSED/3600)) $((($ELAPSED%3600)/60)) $(($ELAPSED%60)))
echo "Build time: $DURATION"
