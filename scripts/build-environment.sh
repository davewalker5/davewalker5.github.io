#!/usr/bin/env bash

cd "$PROJECT_ROOT"

# See if the virtual environment needs a rebuild
section "Checking Build Environment"
"$PROJECT_ROOT/scripts/check-venv-os.sh"
rebuild_required=$?

if [[ $rebuild_required -eq 0 ]]; then
    exit 0
fi

# If CLANG is installed via MacPorts, use it and the gfortran compiler as
# pre-requisites for building SciPy
if command -v port >/dev/null 2>&1 && port -q installed clang-19 >/dev/null 2>&1; then
    section "Using MacPorts clang"
    export CC=/opt/local/bin/clang-mp-19
    export CXX=/opt/local/bin/clang++-mp-19
    export FC=/opt/local/bin/gfortran-mp-13
    export PKG_CONFIG_PATH=/opt/local/lib/pkgconfig
fi

section "Building Virtual Environment"

# Deactivate and remove the old virtual environment, if present
echo "Removing existing Virtual Environment, if present ..."
deactivate 2> /dev/null || true
rm -fr venv

# Create a new environment and activate it
echo "Creating new Virtual Environment ..."
python -m venv venv
. venv/bin/activate

# Make sure pip is up to date
pip install --upgrade pip

# Install the requirements
pip install -r scripts/requirements.txt

section "Re-installing Ruby Gems"

# Remove the existing gems and re-install them
echo "Removing existing gems ..."
rm -rf vendor/bundle
rm -rf Gemfile.lock

echo "Reinstalling gems ..." 
bundle install
