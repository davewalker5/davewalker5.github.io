#!/usr/bin/env bash
set -euo pipefail

usage() {
    scriptname=$(basename -- "$0")
    echo "Usage:"
    echo "  $scriptname --source SOURCE_FOLDER --bucket BUCKET --target TARGET_FOLDER [--force]"
    exit 1
}

SOURCE_FOLDER=""
BUCKET=""
TARGET_FOLDER=""
FORCE_UPLOAD=false

while [[ $# -gt 0 ]]; do
    case "$1" in
        --source)
            SOURCE_FOLDER="${2:-}"
            shift 2
            ;;
        --bucket)
            BUCKET="${2:-}"
            shift 2
            ;;
        --target)
            TARGET_FOLDER="${2:-}"
            shift 2
            ;;
        --force)
            FORCE_UPLOAD=true
            shift
            ;;
        -h|--help)
            usage
            ;;
        *)
            echo "Unknown argument: $1"
            usage
            ;;
    esac
done

if [[ -z "$SOURCE_FOLDER" || -z "$BUCKET" || -z "$TARGET_FOLDER" ]]; then
    usage
fi

SOURCE_FOLDER="${SOURCE_FOLDER%/}"
TARGET_FOLDER="${TARGET_FOLDER%/}"
TARGET_FOLDER="${TARGET_FOLDER#/}"
TARGET_FOLDER="${TARGET_FOLDER%/}"

MANIFEST="$SOURCE_FOLDER/.cdn-upload-manifest.tsv"
NEW_MANIFEST="$(mktemp)"

# Files with these extensions should be served as downloads rather than opened inline.
# Extend this list as needed, using lowercase extensions without the leading dot.
declare -a ATTACHMENT_EXTENSIONS=(
    "pdf"
    "mp4"
)

declare -a EXCLUDED_FILES=(
    ".DS_Store"
)

is_excluded() {
    local filename="$1"

    for excluded in "${EXCLUDED_FILES[@]}"; do
        [[ "$filename" == "$excluded" ]] && return 0
    done

    return 1
}

file_extension() {
    local filename="$1"
    local basename

    basename="$(basename "$filename")"

    if [[ "$basename" == *.* ]]; then
        printf '%s\n' "${basename##*.}" | tr '[:upper:]' '[:lower:]'
    else
        printf '\n'
    fi
}

needs_attachment_disposition() {
    local ext="$1"

    for attachment_ext in "${ATTACHMENT_EXTENSIONS[@]}"; do
        [[ "$ext" == "$attachment_ext" ]] && return 0
    done

    return 1
}

content_type_for_file() {
    local file="$1"
    local ext

    ext="$(file_extension "$file")"

    case "$ext" in
        css)       printf 'text/css; charset=utf-8\n' ;;
        csv)       printf 'text/csv; charset=utf-8\n' ;;
        gif)       printf 'image/gif\n' ;;
        html|htm)  printf 'text/html; charset=utf-8\n' ;;
        ico)       printf 'image/x-icon\n' ;;
        jpg|jpeg)  printf 'image/jpeg\n' ;;
        js|mjs)    printf 'text/javascript; charset=utf-8\n' ;;
        json)      printf 'application/json; charset=utf-8\n' ;;
        mp4)       printf 'video/mp4\n' ;;
        pdf)       printf 'application/pdf\n' ;;
        png)       printf 'image/png\n' ;;
        svg)       printf 'image/svg+xml\n' ;;
        txt)       printf 'text/plain; charset=utf-8\n' ;;
        webp)      printf 'image/webp\n' ;;
        xml)       printf 'application/xml; charset=utf-8\n' ;;
        zip)       printf 'application/zip\n' ;;
        *)
            file --brief --mime-type "$file" 2>/dev/null || printf 'application/octet-stream\n'
            ;;
    esac
}

find "$SOURCE_FOLDER" -type f \
    ! -name ".cdn-upload-manifest.tsv" \
    -print0 |
while IFS= read -r -d '' FILE; do

    RELATIVE_PATH="${FILE#$SOURCE_FOLDER/}"
    FILENAME="$(basename "$FILE")"

    if is_excluded "$FILENAME"; then
        echo "Excluded: $RELATIVE_PATH"
        continue
    fi

    HASH="$(sha256sum "$FILE" | awk '{print $1}')"

    OLD_HASH="$(awk -F '\t' -v p="$RELATIVE_PATH" '$1 == p { print $2 }' "$MANIFEST" 2>/dev/null || true)"

    SHOULD_UPLOAD=false

    if [[ "$FORCE_UPLOAD" == true ]]; then
        SHOULD_UPLOAD=true
        echo "Force upload: $RELATIVE_PATH"
    elif [[ "$HASH" != "$OLD_HASH" ]]; then
        SHOULD_UPLOAD=true
    fi

    if [[ "$SHOULD_UPLOAD" == false ]]; then
        echo "Unchanged: $RELATIVE_PATH"
    else
        if [[ -n "$TARGET_FOLDER" ]]; then
            OBJECT_KEY="$TARGET_FOLDER/$RELATIVE_PATH"
        else
            OBJECT_KEY="$RELATIVE_PATH"
        fi

        EXT="$(file_extension "$FILE")"
        CONTENT_TYPE="$(content_type_for_file "$FILE")"

        WRANGLER_ARGS=(
            r2 object put
            "$BUCKET/$OBJECT_KEY"
            --file "$FILE"
            --content-type "$CONTENT_TYPE"
            --remote
        )

        if needs_attachment_disposition "$EXT"; then
            WRANGLER_ARGS+=(
                --content-disposition "attachment; filename=\"$FILENAME\""
            )
        fi

        echo "Uploading: $RELATIVE_PATH [$CONTENT_TYPE]"
        if needs_attachment_disposition "$EXT"; then
            echo "  Content-Disposition: attachment; filename=\"$FILENAME\""
        fi

        wrangler "${WRANGLER_ARGS[@]}"
    fi

    printf '%s\t%s\n' "$RELATIVE_PATH" "$HASH" >> "$NEW_MANIFEST"

done

mv "$NEW_MANIFEST" "$MANIFEST"
echo "Manifest updated: $MANIFEST"
