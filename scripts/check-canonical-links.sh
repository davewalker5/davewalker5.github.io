#!/usr/bin/env bash

if (( $# != 1 )); then
    scriptname=$(basename -- "$0")
    echo Usage: $scriptname DOMAIN
    exit 1
fi

# Define the pages to check
declare -a pages=(
    ""
    "blog"
    "aircraft"
    "microscopy"
    "weather"
    "wildlife"
    "reference"
    "about"
)

# Iterate over the pages
for i in "${!pages[@]}"; do
    # Construct the URL
    url="https://$1${pages[$i]:+/${pages[$i]}}/"

    # Retrieve the page and collect the status, redirect status and canonical URL
    echo "=== $url ==="
    final_url=$(curl -s -o /dev/null -w "%{url_effective}" -L "$url")
    status=$(curl -s -o /dev/null -w "%{http_code}" -L "$url")
    redirect=$( [ "$url" != "$final_url" ] && echo "yes" || echo "no" )
    canonical=$(curl -sL "$url" | grep -i canonical | grep -i link | sed -E 's/.*href="([^"]+)".*/\1/')

    # Report the results
    echo "Status:     $status"
    echo "Redirected: $redirect"
    echo "Final URL:  $final_url"
    echo "Canonical:  $canonical"
    echo
done
