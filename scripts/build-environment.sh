#!/bin/bash -f

# Get the project root folder
export PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )
cd "$PROJECT_ROOT"

# If CLANG is installed via MacPorts, use it and the gfortran compiler as
# pre-requisites for building SciPy
if command -v port >/dev/null 2>&1 && port -q installed clang-19 >/dev/null 2>&1; then
    echo "Setting up clang from MacPorts"
    export CC=/opt/local/bin/clang-mp-19
    export CXX=/opt/local/bin/clang++-mp-19
    export FC=/opt/local/bin/gfortran-mp-13
    export PKG_CONFIG_PATH=/opt/local/lib/pkgconfig
fi

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

# Remove the existing gems and re-install them
echo "Removing existing gems ..."
rm -rf vendor/bundle
rm -rf Gemfile.lock

echo "Reinstalling gems ..." 
bundle install
