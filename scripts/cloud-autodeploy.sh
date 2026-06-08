#!/usr/bin/env bash
#
# Auto-deploy the dev worker when running inside a Claude Code cloud session.
#
# This is wired into the repo's SessionStart hook (.claude/settings.json). It
# deploys to https://casos-dev.axlotl.dev exactly once per cloud container, and
# only when a Cloudflare deploy token has been configured as an environment
# variable on the cloud environment. It is a no-op locally and a no-op when the
# token is absent, so it never interferes with ordinary sessions.
#
# To enable: add CLOUDFLARE_API_TOKEN (and ideally CLOUDFLARE_ACCOUNT_ID,
# APP_PASSWORD, JWT_SECRET) to the cloud environment's variables, then start a
# fresh session. The deploy runs automatically before Claude launches.
set -uo pipefail

cd "$(dirname "$0")/.."

# Only act inside cloud sessions; do nothing on a developer's laptop.
if [[ "${CLAUDE_CODE_REMOTE:-}" != "true" ]]; then
  exit 0
fi

# Without a deploy token there is nothing we can do — skip quietly.
if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "[cloud-autodeploy] CLOUDFLARE_API_TOKEN not set — skipping. Add it to the"
  echo "[cloud-autodeploy] cloud environment's variables and start a new session to deploy."
  exit 0
fi

# Deploy at most once per container (resumes reuse the same container).
SENTINEL="/tmp/.casos-dev-deployed"
if [[ -f "$SENTINEL" ]]; then
  echo "[cloud-autodeploy] dev worker already deployed in this container — skipping."
  exit 0
fi

LOG="/tmp/casos-dev-deploy.log"
echo "[cloud-autodeploy] Deploying dev worker to https://casos-dev.axlotl.dev (full log: $LOG) ..."
if WORKER_ENV=dev bash scripts/deploy.sh >"$LOG" 2>&1; then
  touch "$SENTINEL"
  echo "[cloud-autodeploy] SUCCESS — https://casos-dev.axlotl.dev is live."
  tail -n 3 "$LOG"
else
  echo "[cloud-autodeploy] FAILED — deploy did not complete. Last lines of $LOG:"
  tail -n 20 "$LOG"
fi

# Always succeed so a deploy hiccup never blocks the session from starting.
exit 0
