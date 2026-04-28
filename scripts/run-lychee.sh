#!/usr/bin/env bash

export PROJECT_ROOT=$( cd "$( dirname "$0" )/.." && pwd )
cd "$PROJECT_ROOT"

lychee --accept 200,429 \
        --root-dir _site \
        --index-files _site/index.html,index.html,index.htm \
        --fallback-extensions html,htm \
        --exclude 'file://.*/view-recording\.html(%23|#).*' \
        --exclude 'https://www.tripadvisor.co.uk/Profile/DaveWalker5' \
        --exclude 'http://www.bats.org.uk/' \
        --exclude-path '_site/publication/**' \
        '_site/**/*.html'
