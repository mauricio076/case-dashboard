#!/usr/bin/env bash
#
# Turnkey deploy for the Expediente worker (with D1) to a Wrangler environment.
#
# Default target is the DEVELOPMENT environment -> https://dev.axlotl.dev
# Override with WORKER_ENV=production to target -> https://axlotl.dev
#
# This script is idempotent. It:
#   1. Ensures the env's D1 database exists (creates it if not).
#   2. Writes the resolved database_id into the matching block in wrangler.toml.
#   3. Applies schema.sql to that remote D1 database.
#   4. Pushes APP_PASSWORD / JWT_SECRET worker secrets (if provided in env).
#   5. Deploys the worker for the selected environment.
#
# Required environment:
#   CLOUDFLARE_API_TOKEN   - token with Workers Scripts + D1 + Workers Routes edit.
#   CLOUDFLARE_ACCOUNT_ID  - (recommended) your Cloudflare account id.
#
# Optional environment:
#   WORKER_ENV             - "dev" (default) or "production".
#   APP_PASSWORD           - login password for the app.
#   JWT_SECRET             - random string used to sign session cookies.
#
# Usage:  CLOUDFLARE_API_TOKEN=... ./scripts/deploy.sh
set -euo pipefail

cd "$(dirname "$0")/.."

WORKER_ENV="${WORKER_ENV:-dev}"
WRANGLER="npx --yes wrangler@3"

if [[ "$WORKER_ENV" == "production" ]]; then
  DB_NAME="expediente"
  URL="https://axlotl.dev"
else
  WORKER_ENV="dev"
  DB_NAME="expediente-dev"
  URL="https://dev.axlotl.dev"
fi

echo "==> Target environment: $WORKER_ENV  (db: $DB_NAME)"

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "ERROR: CLOUDFLARE_API_TOKEN is not set." >&2
  echo "Create one at https://dash.cloudflare.com/profile/api-tokens" >&2
  exit 1
fi

echo "==> Resolving D1 database '$DB_NAME' ..."
# wrangler d1 list --json -> [{ "uuid": "...", "name": "expediente-dev", ... }, ...]
DB_LIST_JSON="$($WRANGLER d1 list --json 2>/dev/null || echo '[]')"
DB_ID="$(DB_LIST_JSON="$DB_LIST_JSON" DB_NAME="$DB_NAME" node -e '
  let list = [];
  try { list = JSON.parse(process.env.DB_LIST_JSON || "[]"); } catch {}
  const hit = (Array.isArray(list) ? list : []).find(d => d.name === process.env.DB_NAME);
  process.stdout.write(hit ? (hit.uuid || hit.database_id || "") : "");
')"

if [[ -z "$DB_ID" ]]; then
  echo "==> D1 database not found. Creating '$DB_NAME' ..."
  CREATE_OUT="$($WRANGLER d1 create "$DB_NAME" 2>&1)"
  echo "$CREATE_OUT"
  DB_ID="$(printf '%s' "$CREATE_OUT" | grep -oE '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' | head -n1)"
fi

if [[ -z "$DB_ID" ]]; then
  echo "ERROR: could not resolve a D1 database_id for '$DB_NAME'." >&2
  exit 1
fi
echo "==> Using D1 database_id: $DB_ID"

echo "==> Writing database_id into wrangler.toml (block for '$DB_NAME') ..."
DB_NAME="$DB_NAME" DB_ID="$DB_ID" node -e '
  const fs = require("fs");
  const p = "wrangler.toml";
  const lines = fs.readFileSync(p, "utf8").split("\n");
  const dbName = process.env.DB_NAME, dbId = process.env.DB_ID;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`database_name = "${dbName}"`)) {
      for (let j = i; j < Math.min(i + 4, lines.length); j++) {
        if (/database_id = "/.test(lines[j])) {
          lines[j] = lines[j].replace(/database_id = "[^"]*"/, `database_id = "${dbId}"`);
          break;
        }
      }
      break;
    }
  }
  fs.writeFileSync(p, lines.join("\n"));
'

echo "==> Applying schema.sql to remote D1 ($DB_NAME) ..."
$WRANGLER d1 execute "$DB_NAME" --remote --file=schema.sql --yes

if [[ -n "${APP_PASSWORD:-}" ]]; then
  echo "==> Setting APP_PASSWORD secret (--env $WORKER_ENV) ..."
  printf '%s' "$APP_PASSWORD" | $WRANGLER secret put APP_PASSWORD --env "$WORKER_ENV"
fi
if [[ -n "${JWT_SECRET:-}" ]]; then
  echo "==> Setting JWT_SECRET secret (--env $WORKER_ENV) ..."
  printf '%s' "$JWT_SECRET" | $WRANGLER secret put JWT_SECRET --env "$WORKER_ENV"
fi

echo "==> Deploying worker (--env $WORKER_ENV) -> $URL ..."
$WRANGLER deploy --env "$WORKER_ENV"

echo "==> Done. The worker is live at $URL"
