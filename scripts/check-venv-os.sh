#!/usr/bin/env bash

set -euo pipefail

VENV_DIR=$( cd "$( dirname "$0" )/../venv" && pwd )
PY_CMD="${2:-python3}"

current_mac_ver="$(sw_vers -productVersion)"   # e.g., 10.13.6 / 12.7.6 / 15.0
current_arch="$(uname -m)"                     # x86_64 or arm64

get_venv_info() {
  local binpy="$1/bin/python"
  "$binpy" - <<'PY'
import json, platform, sys
mac_ver = platform.mac_ver()[0] or None
info = {
    "mac_ver": mac_ver,                     # macOS version the interpreter is running on NOW
    "machine": platform.machine(),          # arm64 / x86_64
    "python": sys.version.split()[0],       # e.g., 3.11.9
}
print(json.dumps(info))
PY
}

needs_rebuild=0
reason=""

if [[ ! -x "$VENV_DIR/bin/python" ]]; then
  needs_rebuild=1
  reason="Missing or non-executable $VENV_DIR/bin/python"
else
  if ! vinfo_json="$(get_venv_info "$VENV_DIR" 2>/dev/null)"; then
    needs_rebuild=1
    reason="Virtual environment python failed to run (copied between machines or bad shebang)"
  else
    # Extract values from the JSON
    v_mac_ver="$(
      /usr/bin/python3 -c 'import sys,json; print(json.load(sys.stdin)["mac_ver"] or "")' <<<"$vinfo_json"
    )"
    v_arch="$(
      /usr/bin/python3 -c 'import sys,json; print(json.load(sys.stdin)["machine"])' <<<"$vinfo_json"
    )"

    # Compare architecture first
    if [[ "$v_arch" != "$current_arch" ]]; then
      needs_rebuild=1
      reason="Architecture mismatch: Virtual environment = $v_arch, current = $current_arch"
    fi

    # Compare macOS major (patch differences are fine)
    if [[ $needs_rebuild -eq 0 ]]; then
      mac_major() {
        local v="$1"
        IFS='.' read -r a b _ <<<"$v"
        if [[ -z "$a" ]]; then
          echo ""
        elif [[ "$a" == "10" ]]; then
          echo "10.$b"   # keep 10.13 vs 10.14 distinct
        else
          echo "$a"      # 11, 12, 13, 14, 15...
        fi
      }
      v_major="$(mac_major "$v_mac_ver")"
      c_major="$(mac_major "$current_mac_ver")"
      if [[ -n "$v_major" && "$v_major" != "$c_major" ]]; then
        needs_rebuild=1
        reason="macOS major mismatch: venv=$v_major, current=$c_major"
      fi
    fi
  fi
fi

if [[ $needs_rebuild -eq 1 ]]; then
  echo "Virtual environment needs a rebuild"
  echo "$reason"
else
  echo "Environment rebuild not required"
fi

exit $needs_rebuild
