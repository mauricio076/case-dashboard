#!/usr/bin/env bash
#
# Turnkey deploy for the Expediente worker -> axlotl.dev (with D1).
#
# This script is idempotent. It:
#   1. Ensures the D1 database "expediente" exists (creates it if not).
#   2. Writes the resolved database_id into wrangler.toml.
#   3. Applies schema.sql to the remote D1 database.
#   4. Pushes APP_PASSWORD / JWT_SECRET worker secrets (if provided in env).
#   5. Deploys the worker (binds it to axlotl.dev via the routes in wrangler.toml).
#
# Required environment:
#   CLOUDFLARE_API_TOKEN   - token with Workers Scripts + D1 + Workers Routes edit.
#   CLOUDFLARE_ACCOUNT_ID  - (recommended) your Cloudflare account id.
#
# Optional environment (worker secrets, set on first deploy / when changed):
#   APP_PASSWORD           - login password for the app.
#   JWT_SECRET             - random string used to sign session cookies.
#
# Usage:  CLOUDFLARE_API_TOKEN=... ./scripts/deploy.sh
set -euo pipefail

cd "$(dirname "$0")/.."

DB_NAME="expediente"
WRANGLER="npx --yes wrangler@3"

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "ERROR: CLOUDFLARE_API_TOKEN is not set." >&2
  echo "Create one at https://dash.cloudflare.com/profile/api-tokens" >&2
  exit 1
fi

echo "==> Resolving D1 database '$DB_NAME' ..."
# wrangler d1 list --json -> [{ "uuid": "...", "name": "expediente", ... }, ...]
DB_LIST_JSON="$($WRANGLER d1 list --json 2>/dev/null || echo '[]')"
DB_ID="$(DB_LIST_JSON="$DB_LIST_JSON" node -e '
  const name = process.argv[1];
  let list = [];
  try { list = JSON.parse(process.env.DB_LIST_JSON || "[]"); } catch {}
  const hit = (Array.isArray(list) ? list : []).find(d => d.name === name);
  process.stdout.write(hit ? (hit.uuid || hit.database_id || "") : "");
' "$DB_NAME")"

if [[ -z "$DB_ID" ]]; then
  echo "==> D1 database not found. Creating '$DB_NAME' ..."
  CREATE_OUT="$($WRANGLER d1 create "$DB_NAME" 2>&1)"
  echo "$CREATE_OUT"
  # Extract the uuid from the human-readable create output.
  DB_ID="$(printf '%s' "$CREATE_OUT" | grep -oE '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' | head -n1)"
fi

if [[ -z "$DB_ID" ]]; then
  echo "ERROR: could not resolve a D1 database_id." >&2
  exit 1
fi
echo "==> Using D1 database_id: $DB_ID"

echo "==> Writing database_id into wrangler.toml ..."
DB_ID="$DB_ID" node -e '
  const fs = require("fs");
  const p = "wrangler.toml";
  let s = fs.readFileSync(p, "utf8");
  s = s.replace(/database_id = "[^"]*"/, `database_id = "${process.env.DB_ID}"`);
  fs.writeFileSync(p, s);
'

echo "==> Applying schema.sql to remote D1 ..."
$WRANGLER d1 execute "$DB_NAME" --remote --file=schema.sql --yes

if [[ -n "${APP_PASSWORD:-}" ]]; then
  echo "==> Setting APP_PASSWORD secret ..."
  printf '%s' "$APP_PASSWORD" | $WRANGLER secret put APP_PASSWORD
fi
if [[ -n "${JWT_SECRET:-}" ]]; then
  echo "==> Setting JWT_SECRET secret ..."
  printf '%s' "$JWT_SECRET" | $WRANGLER secret put JWT_SECRET
fi

echo "==> Deploying worker -> axlotl.dev ..."
$WRANGLER deploy

echo "==> Done. The worker is live at https://axlotl.dev"
