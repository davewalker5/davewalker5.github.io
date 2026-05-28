#!/usr/bin/env bash

export PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )
cd "$PROJECT_ROOT"

"$PROJECT_ROOT/cdn-scripts/build-environment.sh"

bundle exec jekyll build --config _config.yml,_config.local.yml
