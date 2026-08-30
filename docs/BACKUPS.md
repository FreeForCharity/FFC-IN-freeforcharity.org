# cPanel Backups — WHMCS & WordPress → OneDrive

**Status: working (automated daily).** This runbook documents how the FFC cPanel
account is backed up off-server, what is and isn't covered, and how to restore.

## TL;DR

- **Softaculous** (on the InterServer cPanel server) already creates **app-aware,
  restorable** backups: **WHMCS daily**, **WordPress weekly** — each archive
  contains both the files and the database.
- A **daily GitHub Actions workflow** (`cpanel-softaculous-backup-sync.yml`)
  pulls any new archives over **FTPS** and uploads them to **OneDrive**, then
  prunes by retention.
- **WHMCS is the priority** (the FFC Hub: domains, clients, billing) and is
  captured **daily** with roughly a **24-hour RPO**.

## Why this design (and not the full-account tarball)

A cPanel **full-account** backup (`Backup/fullbackup_to_homedir`) is a single
opaque `.tar.gz`. On **shared hosting we cannot do an account-level restore**
(that's a WHM/root operation we don't have), so the full tarball is awkward to
recover from. **Softaculous** backups are **per-app and restore directly**
(files **and** DB) via _Softaculous → Restore_ — which is exactly what real
recovery needs. WHMCS is the crown jewel, so it gets a daily app backup.

The server only keeps **~7 days** of these locally and rotates the rest away, so
copying them **off-server** (to OneDrive) is the whole point of the automation.

## What is backed up

| App           | Database         | Server schedule       | Local filename pattern                 | OneDrive destination                                                          |
| ------------- | ---------------- | --------------------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| **WHMCS**     | `freeforc_whmcs` | **daily** ~00:50      | `whmcs.144_96417.<date>_<time>.tar.gz` | `/1-Backups/1# freeforcharity.org Backups/FFC WHMCS/Softaculous Specific`     |
| **WordPress** | `freeforc_ffcwp` | **weekly** Fri ~12:30 | `wp.26_81762.<date>_<time>.tar.gz`     | `/1-Backups/1# freeforcharity.org Backups/FFC Wordpress/Softaculous Specific` |

Each `.tar.gz` is an app-aware Softaculous backup (files + DB), ~0.8–1.0 GB.
The OneDrive folders sit under clarkemoyer@freeforcharity.org's **OneDrive for
Business** (~1 TB, plenty of headroom).

## What is **not** covered (and why)

- **Email, DNS zones, cron, addon-domain files outside the two apps.** Softaculous
  covers WHMCS + WordPress only. The coarse full-account tarball can be produced
  on demand through the gateway (`Backup/fullbackup_to_homedir`) if a complete
  snapshot is ever needed, but it is not part of the routine restorable set.
- **Direct per-database SQL dumps via `getsqlbackup`.** Blocked: cPanel rejects
  **API-token** auth on that endpoint (it wants the account password). Not needed
  — the SQL lives **inside** each Softaculous archive.
- **Softaculous API automation (trigger/restore).** Blocked for the same reason
  (a cPanel _frontend_ endpoint that needs the account password, which we don't
  store). We rely on Softaculous's existing on-server schedule and just pull the
  results.

## Architecture / data flow

```
Softaculous (cPanel server, scheduled)
   │  writes app backups to ~/softaculous_backups  (WHMCS daily, WP weekly)
   ▼
[ FTPS :21 ]  ── pulled by ──▶  GitHub Actions runner (daily)
                                   │  verifies each archive name (allowlist)
                                   │  downloads to a unique temp file
                                   ▼
                              [ Microsoft Graph ]  ──▶  OneDrive folders
                                   │  resumable upload (~1 GB), conflictBehavior=replace
                                   ▼
                              Retention prune (keep 90d daily, then monthly 1y)
```

> The **APIM gateway is not used for backups** — it is HTTP(S)/UAPI-only and not
> a bulk file mover. The backup file transfer goes over **FTPS (port 21)**, which
> is reachable from GitHub runners (only cPanel's `:2083` is Imunify-blocked).

## Schedule & retention

- **Sync workflow:** daily at **06:00 UTC** (after the ~00:50 WHMCS run), plus
  manual dispatch.
- **OneDrive retention** (`scripts/onedrive_backup_sync.py`): keep **all backups
  ≤ 90 days**, then **one per calendar month up to 1 year**, delete older.
- **Server-side retention:** ~7 days (WHMCS) / ~5 weeks (WordPress) — rotated by
  Softaculous; this is why the off-server copy must run regularly.

## Identity, secrets & auth (all in Azure Key Vault `kv-ffc-admin-prod-cbm`)

- **Runner identity:** the workflow runs in the **`cpanel-apim-deploy`**
  environment and authenticates to Azure via **OIDC as `ffc-admin-kv-writer`**
  (Key Vault **Secrets Officer** — reads the secrets below _and_ writes the
  rotated OneDrive token). The OIDC inputs `AZURE_DEPLOY_CLIENT_ID`,
  `AZURE_TENANT_ID`, and `AZURE_SUBSCRIPTION_ID` are configured as secrets on
  the **`cpanel-apim-deploy` GitHub Environment** (consumed via the `secrets`
  context in the workflow).
- **cPanel FTPS:** `wr-all-cbm-cpanel-ffc-interserver-ftp-{user,password,port}`;
  the host is the **hostname** parsed from the
  `wr-all-cbm-cpanel-ffc-interserver-server` secret (so the FTPS certificate is
  **verified** by default — the host presents a valid AutoSSL cert).
- **OneDrive:** a dedicated app **`ffc-onedrive-backup`** with **delegated**
  `Files.ReadWrite.All` (scoped to clarkemoyer's OneDrive — _not_ tenant-wide).
  Its refresh token is `wr-all-ffc-onedrive-backup-refresh-token` (+
  `read-all-ffc-onedrive-backup-client-id`, `…-tenant-id`). The workflow mints a
  short-lived Graph token each run and **persists the rotated refresh token**.

## Running it manually

- **UI:** Actions → **"cPanel Softaculous backups -> OneDrive"** → _Run workflow_
  (toggle `dry_run` to list actions without uploading/deleting).
- **CLI:** `gh workflow run cpanel-softaculous-backup-sync.yml -f dry_run=true`

## Restore procedure (manual)

Restores are deliberately manual (rare, and a few clicks):

1. **Get the archive.** If it's within the server's ~7-day window it's still in
   `~/softaculous_backups`. Otherwise download the desired
   `whmcs.*`/`wp.*` `.tar.gz` from the OneDrive folder and upload it back into
   `~/softaculous_backups` (cPanel File Manager or FTPS).
2. **cPanel → Softaculous Apps Installer → Backups** (or the app's _Restore_
   action) → pick the archive → **Restore**. Softaculous restores **files + DB**.
3. **WHMCS first** in a disaster; verify login + a recent order/invoice after
   restore. Do a **test restore periodically** so the path is known-good.

## Expectations / SLOs

| Metric                | WHMCS                                  | WordPress     |
| --------------------- | -------------------------------------- | ------------- |
| Backup frequency      | daily (~00:50)                         | weekly (Fri)  |
| RPO (max data loss)   | ~24 hours                              | ~1 week       |
| RTO (restore time)    | minutes–hours (Softaculous restore)    | minutes–hours |
| OneDrive history kept | 90 days daily, then monthly for 1 year | same          |

## Operations & maintenance

- **OneDrive token refresh.** The delegated refresh token rotates on every run,
  so the daily cadence keeps it alive. If the job is paused > ~90 days the token
  can expire; re-auth with a device-code sign-in for the `ffc-onedrive-backup`
  app and update `wr-all-ffc-onedrive-backup-refresh-token` in Key Vault.
- **FTPS certificate.** Verified against the system CA store by default. If the
  host ever presents an unverifiable cert, pin it via the `FTPS_CACERT` env (PEM
  path or contents); `FTPS_INSECURE=1` is an explicit, logged last resort.
- **Monitoring.** Failures surface in the Actions run (and as a non-zero
  conclusion). The job logs a per-folder summary and never prints secrets or
  backup payloads.

## Related

- **APIM gateway** (cPanel UAPI over a static, whitelisted IP — used for ops/
  audit, _not_ backups): [`infra/cpanel-apim/README.md`](../infra/cpanel-apim/README.md)
- **Sync implementation:** `scripts/onedrive_backup_sync.py`,
  `.github/workflows/cpanel-softaculous-backup-sync.yml`
- **Tracking:** FreeForCharity/FFC-IN-ClarkeMoyerAdmin#104 (cloud-native backup),
  #101 (backup lifecycle).
