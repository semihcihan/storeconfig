#! /bin/bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
site_id="${NETLIFY_SITE_ID:-464c8d96-3579-40bb-b386-326a23f64be5}"

cd "$repo_root"

if ! command -v netlify >/dev/null 2>&1; then
  echo "Netlify CLI is required for manual deploys. Automatic deploys run from Git on Netlify."
  exit 1
fi

netlify deploy --build --prod --site "$site_id"
