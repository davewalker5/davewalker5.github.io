#!/bin/bash -f

# Get the project root folder
export PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )
cd "$PROJECT_ROOT"

# See if the virtual environment needs a rebuild
./scripts/check-venv-os.sh
rebuild_required=$?

if [[ $rebuild_required -eq 1 ]]; then
    . ./scripts/build-environment.sh
fi

# Activate the virtual environment
. ./venv/bin/activate

pip freeze --local | grep -v '^\-e' | cut -d = -f 1 | xargs -n1 pip3 install -U 
pip freeze > ./scripts/requirements.txt
