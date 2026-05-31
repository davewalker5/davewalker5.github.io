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

# Get the project root folder
export PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )
export SCRIPT_DIR="$PROJECT_ROOT/cdn-scripts"

# Parse the command line arguments
. "$SCRIPT_DIR/arg-parser.sh" "$@"

# Locate the folder containing the notebooks
. "$SCRIPT_DIR/locate-notebook-folder.sh"

# Determine which sites need a rebuild
"$SCRIPT_DIR/check-build-required.sh" aircraft
AIRCRAFT_BUILD_REQUIRED=$?

"$SCRIPT_DIR/check-build-required.sh" microscopy
MICROSCOPY_BUILD_REQUIRED=$?

"$SCRIPT_DIR/check-build-required.sh" recordings
RECORDINGS_BUILD_REQUIRED=$?

"$SCRIPT_DIR/check-build-required.sh" weather
WEATHER_BUILD_REQUIRED=$?

"$SCRIPT_DIR/check-build-required.sh" wildlife
WILDLIFE_BUILD_REQUIRED=$?

# Show the build parameters
section "Build Parameters"
echo "Local CDN Folder   : $CDN_ROOT"
echo "CDN Manifest       : $CDN_MANIFEST"
echo "Project Folder     : $PROJECT_ROOT"
echo "Site               : $SITE_NAME"
echo "Notebooks Folder   : $NOTEBOOKS_FOLDER"
echo "Country            : $COUNTRY"
echo "Location           : $LOCATION"
echo "Category           : $CATEGORY"
echo "Year               : $YEAR"
echo "Dry run            : $DRY_RUN"
echo "No CDN upload      : $NO_UPLOAD"
echo "Aircraft rebuild   : $AIRCRAFT_BUILD_REQUIRED"
echo "Wildlife rebuild   : $WILDLIFE_BUILD_REQUIRED"
echo "Weather rebuild    : $WEATHER_BUILD_REQUIRED"
echo "Microscopy rebuild : $MICROSCOPY_BUILD_REQUIRED"
echo "Recordings rebuild : $RECORDINGS_BUILD_REQUIRED"

# If the status has been requested but no build is intended, go no further
if [[ "$STATUS_ONLY" == "true" ]]; then
    exit 0
fi

# If a build isn't required, exit
if [[ $AIRCRAFT_BUILD_REQUIRED -eq 0 && $WILDLIFE_BUILD_REQUIRED -eq 0 && $WEATHER_BUILD_REQUIRED -eq 0  && $MICROSCOPY_BUILD_REQUIRED -eq 0 && $RECORDINGS_BUILD_REQUIRED -eq 0 ]]; then
    echo "Rebuild is not required"
    exit 0
fi

# Set up dry run arguments for the build processes that support them
DRY_RUN_ARGS=$([[ "$DRY_RUN" == "true" ]] && echo "--dry-run")

# Rebuild the virtual environment, if needed
"$SCRIPT_DIR/build-environment.sh"

# Activate the virtual environment
. "$PROJECT_ROOT/venv/bin/activate"

# Copy the database files into place
"$SCRIPT_DIR/copy-db-files.sh"

# If a plate library rebuild is required, run it
if [[ $MICROSCOPY_BUILD_REQUIRED -eq 1 ]]; then
    python "$PROJECT_ROOT/cdn-scripts/microscopy-library-builder.py" \
        -po "$PROJECT_ROOT/_data/leitz_plates.csv" \
        -io "$PROJECT_ROOT/_data/microscopy_investigations.csv" \
        -pod "$CDN_ROOT/plates" \
        $DRY_RUN_ARGS

    if [[ "$DRY_RUN" != "true" ]]; then
        touch "$PROJECT_ROOT/_data/leitz_plates.csv"
    fi
fi

# If a wildlife recordings library rebuild is required, run it
if [[ $RECORDINGS_BUILD_REQUIRED -eq 1 ]]; then
    python "$PROJECT_ROOT/cdn-scripts/recordings-library-builder.py" \
        -o "$PROJECT_ROOT/_data/recording_index.csv" \
        -mod "$CDN_ROOT/recordings" \
        $DRY_RUN_ARGS

    if [[ "$DRY_RUN" != "true" ]]; then
        touch "$PROJECT_ROOT/_data/recording_index.csv"
    fi
fi

# Run the Jupyter notebooks to update the reports
"$SCRIPT_DIR/run-notebooks.sh" $AIRCRAFT_BUILD_REQUIRED $WILDLIFE_BUILD_REQUIRED $WEATHER_BUILD_REQUIRED

# Perform the transfer to the CDN - this will also generate the CDN manifest
if [[ "$NO_UPLOAD" != "true" ]]; then
    "$SCRIPT_DIR/upload-to-cdn.sh" --source $CDN_ROOT --bucket $CDN_BUCKET --target / $DRY_RUN_ARGS

    # Build the site data files
    declare -a DATA_FILE_TYPES=(
        "aircraft-manufacturers"
        "aircraft-reports"
        "weather-reports"
        "wildlife-reports"
    )

    for data_type in "${DATA_FILE_TYPES[@]}"; do
        python "$SCRIPT_DIR/generate-report-data.py" --manifest "$CDN_MANIFEST" --type $data_type $DRY_RUN_ARGS
    done
fi

# Record end time (epoch seconds)
ENDED=$(date +%s)
echo "Build completed at: $(date '+%Y-%m-%d %H:%M:%S')"

# Calculate elapsed time in seconds
ELAPSED=$(( $ENDED - $STARTED ))

# Convert seconds into HH:MM:SS
DURATION=$(printf "%02d:%02d:%02d" $(($ELAPSED/3600)) $((($ELAPSED%3600)/60)) $(($ELAPSED%60)))
echo "Build time: $DURATION"
