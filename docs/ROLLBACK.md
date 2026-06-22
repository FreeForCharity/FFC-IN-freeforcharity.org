# Rollback Procedure: apex static → WordPress (snapshot restore)

Roll back freeforcharity.org from the Next.js static export back to the
WordPress install, after the **in-place overwrite cutover** (executed
**2026-06-22** via the automated two-phase workflows).

> **What the cutover actually did** (this supersedes the older document-root
> swap plan): the apex docroot **stayed `~/public_html`**. STEP 1 copied the
> WordPress files into a sister snapshot dir, then STEP 2 mirrored the static
> export into `public_html` with `--delete`, **excluding the keepers** (`hub/`
> = WHMCS, `cgi-bin/`, `.well-known/`, the parked-domain docroot, and the PHP
> config / cPanel status dotfiles). So WordPress files were **removed** from
> `public_html` — there is no docroot to "swap back". Rollback **restores the
> WordPress files** from the snapshot (or the OneDrive backup).

WHMCS at `~/public_html/hub/` is **never modified** in either direction.

---

## Rollback sources (two layers)

1. **On-server snapshot (instant):** `~/public_html_wp_precutover_<ts>/` — a
   full, verified copy of the WordPress files made by STEP 1 _before_ the flip.
   The cutover on 2026-06-22 produced **`public_html_wp_precutover_20260622193234`**
   (36,163 files, incl. `wp-config.php`). Kept on-server ~14 days.
2. **Durable backup:** the daily Softaculous → OneDrive WordPress archive
   (see [BACKUPS.md](BACKUPS.md)). Restore via _Softaculous → Restore_ if the
   on-server snapshot is gone.

---

## Option A — Automated rollback (preferred)

GitHub → Actions → **cPanel APEX cutover (WordPress -> static, /hub-safe)** →
Run workflow:

| Input          | Value                                                       |
| -------------- | ----------------------------------------------------------- |
| `action`       | `rollback`                                                  |
| `snapshot_dir` | `public_html_wp_precutover_20260622193234` (or the current) |
| `dry_run`      | `true` first (preview), then `false`                        |
| `confirm`      | `CUTOVER freeforcharity.org` (required for the live write)  |

It validates the snapshot exists, **deletes the static files** from
`public_html` (keepers preserved), and **moves the snapshot WordPress files
back**. Then do **Step C** (Cloudflare purge) and **Step D** (verify).

`gh` equivalent:

```bash
gh workflow run cpanel-apex-cutover.yml \
  -f action=rollback \
  -f snapshot_dir=public_html_wp_precutover_20260622193234 \
  -f dry_run=false -f confirm='CUTOVER freeforcharity.org'
```

---

## Option B — Manual rollback (fallback, no workflow)

In cPanel **File Manager** (or over FTPS with the main account):

1. In `~/public_html/`, delete the static-export entries **except the keepers**
   (`hub`, `cgi-bin`, `.well-known`, `wh1319644.ispot.cc`, `.user.ini`,
   `php.ini`, `.cache`, `.tmb`, `.ftpquota`, `.htpasswd*`, `error_log`,
   `.s3backupstatus`, `.synthquota`, `.ht_wsr.txt`).
2. Move every entry from `~/public_html_wp_precutover_<ts>/` back into
   `~/public_html/`.
3. If the snapshot is gone, instead restore the WordPress app from the
   OneDrive Softaculous archive via _cPanel → Softaculous → Backups → Restore_.

---

## Step C — Purge the Cloudflare cache

Cloudflare zone `freeforcharity.org` (id `650f9e6595252cde90a01409289b6e66`):

- Dashboard → **Caching → Configuration → Purge Everything**, or
- API (token in Key Vault `wr-all-ffc-cloudflare-api-token-zone-and-dns`):
  ```bash
  curl -X POST "https://api.cloudflare.com/client/v4/zones/650f9e6595252cde90a01409289b6e66/purge_cache" \
    -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" \
    --data '{"purge_everything":true}'
  ```

---

## Step D — Verify (use a real browser, not curl)

> **Important:** the host returns an intermittent `415` to `curl`/bare HTTP
> clients (a client-fingerprint/bot mitigation); **real browsers get 200**.
> Verify with the visual check or an actual browser, not `curl -I`.

```bash
# Real-browser screenshots + content assertions for apex and /hub:
gh workflow run live-visual-check.yml
# or locally:
BASE_URL=https://freeforcharity.org IGNORE_HTTPS=1 node scripts/live-visual-check.mjs
```

Confirm in an incognito browser: apex shows WordPress, `/hub/` shows the WHMCS
portal, `/wp-login.php` reachable.

---

## Step E — Post-mortem

Open a GitHub issue: what broke, when, duration, root cause, and the fix needed
before re-attempting. Keep the snapshot dir until the post-mortem is closed.

---

## Important notes

| Item                                 | Detail                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| `~/public_html/hub/`                 | WHMCS. Never modified by cutover or rollback; same files serve before and after.           |
| `~/public_html_wp_precutover_<ts>/`  | The on-server WordPress snapshot — the instant rollback source. Don't delete for ~14 days. |
| PHP config (`.user.ini` / `php.ini`) | Kept in `public_html` through the flip so `/hub` (which inherits them) keeps its PHP env.  |
| Cloudflare                           | Proxies as before; no DNS change in either direction. Purge after any flip.                |
| `415` from `curl`                    | Client-fingerprint/bot mitigation — affects automated clients, not real browsers/users.    |

---

## Escalation contacts

| Role                          | Contact                                             |
| ----------------------------- | --------------------------------------------------- |
| InterServer cPanel            | InterServer hosting panel + account                 |
| DNS / Cloudflare              | FFC Cloudflare admin account                        |
| GitHub deploy workflow / repo | FreeForCharity GitHub org owner                     |
| WHMCS billing                 | WHMCS admin at `freeforcharity.org/hub/globaladmin` |

---

_Last updated: 2026-06-22 (rewrote for the snapshot-based rollback after the
in-place-overwrite cutover; the previous document-root-swap version no longer
applies)._
