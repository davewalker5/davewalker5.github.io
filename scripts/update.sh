#!/bin/bash -f

# Get the project root folder
export PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )

# Activate the virtual environment
. "$PROJECT_ROOT/venv/bin/activate"

pip freeze --local | grep -v '^\-e' | cut -d = -f 1 | xargs -n1 pip3 install -U 
pip freeze > "$PROJECT_ROOT/scripts/requirements.txt"
