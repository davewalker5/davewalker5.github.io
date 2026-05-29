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

"$SCRIPT_DIR/check-build-required.sh" wildlife
WILDLIFE_BUILD_REQUIRED=$?

"$SCRIPT_DIR/check-build-required.sh" weather
WEATHER_BUILD_REQUIRED=$?

# Check whether the microscopy plate library needs building
MICROSCOPY_BUILD_REQUIRED=0
source_plate_index="$MICROSCOPY_PLATE_LIBRARY/plate_library.db"
target_plate_index="$PROJECT_ROOT/_data/leitz_plates.csv"
source_plate_index_modified=`stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" "$source_plate_index"`
target_plate_index_modified=`stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" "$target_plate_index"`
if [[ "$FORCE" == "true" || ! -f "$target_plate_index" || "$source_plate_index" -nt "$target_plate_index" ]]; then
    MICROSCOPY_BUILD_REQUIRED=1
fi

# Check whether the media library needs building
RECORDINGS_BUILD_REQUIRED=0
source_media_index="$WILDLIFE_RECORDINGS_LIBRARY/Index.xlsx"
target_media_index="$PROJECT_ROOT/_data/recording_index.csv"
source_media_index_modified=`stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" "$source_plate_index"`
target_media_index_modified=`stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" "$target_plate_index"`
if [[ "$FORCE" == "true" || ! -f "$target_media_index" || "$source_media_index" -nt "$target_media_index" ]]; then
    RECORDINGS_BUILD_REQUIRED=1
fi

# Show the build parameters
section "Build Parameters"
echo "Project Folder     : $PROJECT_ROOT"
echo "Site               : $SITE_NAME"
echo "Notebooks Folder   : $NOTEBOOKS_FOLDER"
echo "Country            : $COUNTRY"
echo "Location           : $LOCATION"
echo "Category           : $CATEGORY"
echo "Year               : $YEAR"
echo "No updates         : $NO_UPDATE"
echo "Aircraft rebuild   : $AIRCRAFT_BUILD_REQUIRED"
echo "Wildlife rebuild   : $WILDLIFE_BUILD_REQUIRED"
echo "Weather rebuild    : $WEATHER_BUILD_REQUIRED"
echo "Microscopy rebuild : $MICROSCOPY_BUILD_REQUIRED ($source_plate_index_modified vs $target_plate_index_modified)"
echo "Recordings rebuild : $RECORDINGS_BUILD_REQUIRED ($source_media_index_modified vs $target_media_index_modified)"
echo "Force build        : $FORCE"

# If a build isn't required, exit
if [[ $AIRCRAFT_BUILD_REQUIRED -eq 0 && $WILDLIFE_BUILD_REQUIRED -eq 0 && $WEATHER_BUILD_REQUIRED -eq 0  && $MICROSCOPY_BUILD_REQUIRED -eq 0 && $RECORDINGS_BUILD_REQUIRED -eq 0 ]]; then
    echo "Rebuild is not required"
    exit 0
fi

# Rebuild the virtual environment, if needed
"$SCRIPT_DIR/build-environment.sh"

# Activate the virtual environment
. "$PROJECT_ROOT/venv/bin/activate"

# Copy the database files into place
"$SCRIPT_DIR/copy-db-files.sh"

# If a plate library rebuild is required, run it
if [[ "$NO_UPDATE" != "true" && $MICROSCOPY_BUILD_REQUIRED -eq 1 ]]; then
    python "$PROJECT_ROOT/cdn-scripts/microscopy-library-builder.py" \
        -po "$target_plate_index" \
        -io "$PROJECT_ROOT/_data/microscopy_investigations.csv" \
        -pod "$CDN_ROOT/plates"
fi

# If a wildlife recordings library rebuild is required, run it
if [[ "$NO_UPDATE" != "true" && $RECORDINGS_BUILD_REQUIRED -eq 1 ]]; then
    python "$PROJECT_ROOT/cdn-scripts/recordings-library-builder.py" \
        -o "$target_media_index" \
        -mod "$CDN_ROOT/recordings"
fi

# Run the Jupyter notebooks to update the reports
"$SCRIPT_DIR/run-notebooks.sh" $AIRCRAFT_BUILD_REQUIRED $WILDLIFE_BUILD_REQUIRED $WEATHER_BUILD_REQUIRED

# Perform the transfer to the CDN - this will also generate the CDN manifest
# "$SCRIPT_DIR/upload-to-cdn.sh" --source $CDN_ROOT --bucket $CDN_BUCKET --target /

# Build the site data files
declare -a DATA_FILE_TYPES=(
    "aircraft-manufacturers"
    "aircraft-reports"
    "weather-reports"
    "wildlife-reports"
)

for data_type in "${DATA_FILE_TYPES[@]}"; do
    python "$SCRIPT_DIR/generate-report-data.py" --manifest "$CDN_MANIFEST" --type $data_type
done

# Record end time (epoch seconds)
ENDED=$(date +%s)
echo "Build completed at: $(date '+%Y-%m-%d %H:%M:%S')"

# Calculate elapsed time in seconds
ELAPSED=$(( $ENDED - $STARTED ))

# Convert seconds into HH:MM:SS
DURATION=$(printf "%02d:%02d:%02d" $(($ELAPSED/3600)) $((($ELAPSED%3600)/60)) $(($ELAPSED%60)))
echo "Build time: $DURATION"
