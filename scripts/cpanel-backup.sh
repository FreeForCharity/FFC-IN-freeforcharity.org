#!/usr/bin/env bash
#
# scripts/cpanel-backup.sh — trigger a full cPanel account backup via UAPI,
# wait for it to finish, and download the tarball locally.
#
# Used by cutover step PRE1 (issue #143) and for routine pre-deploy backups.
# Replaces the cPanel → Backup → "Generate Full Backup" UI walk.
#
# Required env vars:
#   CPANEL_USER     cPanel account username
#   CPANEL_SERVER   cPanel hostname (NOT the port)
#   CPANEL_TOKEN    API token from cPanel → Manage API Tokens
#
# Optional env vars:
#   CPANEL_PORT     cPanel SSL port (default 2083)
#   NOTIFY_EMAIL    email to receive backup completion notice (default: noreply@CPANEL_SERVER)
#   POLL_INTERVAL   seconds between completion polls (default 60)
#   MAX_WAIT        maximum total wait in seconds (default 3600 = 1 h)
#   DOWNLOAD_DIR    local directory to download into (default ./cpanel-backups)
#   DOWNLOAD_METHOD scp | ftps | none (default: scp, falls back to ftps if SSH unreachable)
#   FTP_USER        FTPS download username (defaults to CPANEL_USER)
#   FTP_PASSWORD    FTPS download password (required if DOWNLOAD_METHOD=ftps)
#
# Exit codes:
#   0  success — local backup verified
#   1  bad usage / missing env
#   2  cPanel API rejected the request
#   3  timed out waiting for backup file
#   4  download failed
#   5  downloaded file failed integrity check
#
# Example:
#   export CPANEL_USER=myuser
#   export CPANEL_SERVER=interserver.example.net
#   export CPANEL_TOKEN=ABCDEF1234567890
#   ./scripts/cpanel-backup.sh

set -euo pipefail

# ---------------------------------------------------------------------
# Config + validation
# ---------------------------------------------------------------------
: "${CPANEL_USER:?CPANEL_USER is required}"
: "${CPANEL_SERVER:?CPANEL_SERVER is required}"
: "${CPANEL_TOKEN:?CPANEL_TOKEN is required}"

CPANEL_PORT="${CPANEL_PORT:-2083}"
NOTIFY_EMAIL="${NOTIFY_EMAIL:-noreply@${CPANEL_SERVER}}"
POLL_INTERVAL="${POLL_INTERVAL:-60}"
MAX_WAIT="${MAX_WAIT:-3600}"
DOWNLOAD_DIR="${DOWNLOAD_DIR:-./cpanel-backups}"
DOWNLOAD_METHOD="${DOWNLOAD_METHOD:-scp}"
FTP_USER="${FTP_USER:-$CPANEL_USER}"

API_URL="https://${CPANEL_SERVER}:${CPANEL_PORT}/execute/Backup/fullbackup_to_homedir"
AUTH_HEADER="Authorization: cpanel ${CPANEL_USER}:${CPANEL_TOKEN}"

log()  { printf '[%(%Y-%m-%dT%H:%M:%S%z)T] %s\n' -1 "$*" >&2; }
fail() { log "ERROR: $*"; exit "${2:-1}"; }

mkdir -p "$DOWNLOAD_DIR"

# ---------------------------------------------------------------------
# Step 1 — kick off the backup
# ---------------------------------------------------------------------
log "Triggering full backup for ${CPANEL_USER}@${CPANEL_SERVER} (notify: ${NOTIFY_EMAIL})"

response=$(curl -sS \
  --max-time 30 \
  -H "$AUTH_HEADER" \
  --data-urlencode "email=${NOTIFY_EMAIL}" \
  --get \
  "$API_URL") || fail "Could not reach cPanel API at ${API_URL}" 2

# UAPI returns JSON: {"errors":null,"messages":[...],"status":1,"data":{...}} on success
status=$(printf '%s' "$response" | grep -oE '"status":[[:space:]]*[01]' | head -1 | grep -oE '[01]$' || echo 0)
if [ "$status" != "1" ]; then
  log "API response: $response"
  fail "cPanel API rejected the backup request (status != 1)" 2
fi
log "Backup queued. Polling for completion..."

# ---------------------------------------------------------------------
# Step 2 — wait for the backup file to appear in the home directory
# ---------------------------------------------------------------------
# The remote file pattern is backup-MM-DD-YYYY_HH-MM-SS_USER.tar.gz
# We poll via the cPanel UAPI Fileman::list_files endpoint rather than
# requiring SSH, since the API token already authorises us.

LIST_URL="https://${CPANEL_SERVER}:${CPANEL_PORT}/execute/Fileman/list_files"

find_latest_backup() {
  curl -sS --max-time 30 \
    -H "$AUTH_HEADER" \
    --data-urlencode "dir=/home/${CPANEL_USER}" \
    --data-urlencode "types=file" \
    --get \
    "$LIST_URL" \
    | grep -oE '"file":"backup-[0-9_-]+_'"${CPANEL_USER}"'\.tar\.gz"' \
    | sort -r \
    | head -1 \
    | sed -E 's/^"file":"([^"]+)"$/\1/'
}

start=$(date +%s)
remote_file=""
while [ -z "$remote_file" ]; do
  remote_file=$(find_latest_backup || true)
  if [ -n "$remote_file" ]; then
    log "Backup ready on server: $remote_file"
    break
  fi
  now=$(date +%s)
  elapsed=$((now - start))
  if [ "$elapsed" -ge "$MAX_WAIT" ]; then
    fail "Timed out after ${MAX_WAIT}s waiting for backup file to appear" 3
  fi
  log "  not ready yet (${elapsed}s elapsed of ${MAX_WAIT}s); sleeping ${POLL_INTERVAL}s"
  sleep "$POLL_INTERVAL"
done

# ---------------------------------------------------------------------
# Step 3 — download the file locally
# ---------------------------------------------------------------------
local_file="${DOWNLOAD_DIR}/${remote_file}"

if [ "$DOWNLOAD_METHOD" = "none" ]; then
  log "DOWNLOAD_METHOD=none, skipping local download. Remote file: ~/$remote_file"
  exit 0
fi

download_via_scp() {
  log "Downloading via scp: ${CPANEL_USER}@${CPANEL_SERVER}:~/${remote_file} -> ${local_file}"
  scp -o BatchMode=yes -o ConnectTimeout=10 \
    "${CPANEL_USER}@${CPANEL_SERVER}:~/${remote_file}" \
    "$local_file"
}

download_via_ftps() {
  : "${FTP_PASSWORD:?FTP_PASSWORD is required for ftps download}"
  log "Downloading via FTPS: ftp://${CPANEL_SERVER}/${remote_file} -> ${local_file}"
  curl -sS --ftp-ssl --ftp-pasv \
    -u "${FTP_USER}:${FTP_PASSWORD}" \
    -o "$local_file" \
    "ftp://${CPANEL_SERVER}/${remote_file}"
}

case "$DOWNLOAD_METHOD" in
  scp)
    if ! download_via_scp; then
      log "scp failed; falling back to FTPS"
      download_via_ftps || fail "Both scp and FTPS download failed" 4
    fi
    ;;
  ftps)
    download_via_ftps || fail "FTPS download failed" 4
    ;;
  *)
    fail "Unknown DOWNLOAD_METHOD: $DOWNLOAD_METHOD (use scp, ftps, or none)" 1
    ;;
esac

# ---------------------------------------------------------------------
# Step 4 — verify integrity
# ---------------------------------------------------------------------
if [ ! -s "$local_file" ]; then
  fail "Downloaded file is empty: $local_file" 5
fi

log "Verifying tarball integrity (tar -tzf | head)..."
if ! tar -tzf "$local_file" >/dev/null 2>&1; then
  fail "Tarball failed integrity check: $local_file" 5
fi

size=$(wc -c <"$local_file" | tr -d ' ')
log "Backup OK: $local_file ($size bytes)"
log ""
log "Next steps:"
log "  1. Copy this file to durable storage (cloud drive, external disk)."
log "  2. Mark issue #143 (cutover/pre-flight: full cPanel backup) complete."
log "  3. Proceed to PRE2a (#148) + PRE2b (#149) for targeted /hub + WHMCS DB snapshots."
