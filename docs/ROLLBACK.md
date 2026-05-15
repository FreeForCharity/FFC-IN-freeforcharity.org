# Rollback Procedure: cPanel Document-Root Swap

Roll back the freeforcharity.org website from the Next.js static export
(`public_html_next`) back to the WordPress install (`public_html`).
Used when something breaks in the first 14 days after cutover.

**Estimated rollback time: 2–5 minutes.** No DNS propagation involved
— the document-root swap takes effect immediately on the InterServer
cPanel host.

---

## Prerequisites

You will need access to:

- **InterServer cPanel** for the freeforcharity.org account.
- (Optional) SSH/Terminal access in cPanel for verifying file state.
- The full cPanel backup downloaded during pre-flight (see
  `docs/CUTOVER-HANDOFF.md` → "Pre-flight" step 1) — only needed if the
  swap doesn't recover the WP files for some reason.

The WordPress install at `~/public_html/` is **never modified** during or
after cutover. It remains in place as the rollback target for at least
14 days.

---

## Step 1 — Swap the document root back in cPanel

1. Log in to InterServer cPanel.
2. Go to **Domains → manage `freeforcharity.org`**.
3. Change the document root from `public_html_next` back to `public_html`.
4. Save / apply. The swap takes effect on the next HTTP request.

---

## Step 2 — Bust the Cloudflare cache

Cloudflare caches HTML aggressively. After the swap, force a refresh
so visitors see the WordPress site immediately:

1. Cloudflare dashboard → `freeforcharity.org` zone → **Caching → Configuration**.
2. **Purge Everything**. Confirm.

---

## Step 3 — Verify WordPress is responding

```bash
curl -I https://freeforcharity.org
# Expect: HTTP/2 200 with WordPress-style headers (link rel="https://api.w.org/", etc.)

curl -I https://freeforcharity.org/hub/
# Expect: HTTP/2 200 — WHMCS still works (it never moved)

curl -I https://freeforcharity.org/wp-login.php
# Expect: HTTP/2 200 — WP admin reachable again
```

Also verify visually in an incognito browser. If you see the Figma
redesign, Cloudflare cache hasn't purged yet — wait 1–2 minutes and
retry.

---

## Step 4 — Disable the Next.js deploy workflow (optional)

If you want to prevent accidental redeploys to `public_html_next/`
while you investigate:

1. GitHub repo → **Settings → Actions → General → Workflow permissions**, or
2. Open `.github/workflows/deploy-cpanel.yml` and add `if: false` to the job, or
3. Disable the workflow from the Actions tab in GitHub UI.

This step is optional — the workflow is already manual-trigger only.

---

## Step 5 — Open a post-mortem issue

After stabilizing, open a GitHub issue documenting:

- What broke (specific pages, features, or infra).
- When it was detected.
- How long the outage lasted.
- Root cause.
- Fix required before re-attempting cutover.

---

## Important Notes

| Item                         | Detail                                                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `~/public_html/`             | Original WordPress install. Do not touch for at least 14 days post-cutover.                                                                      |
| `~/public_html/hub/`         | WHMCS. Never modified by the cutover; same files serve both before and after.                                                                    |
| `~/public_html_next/`        | Next.js static export. Created by the first `deploy-cpanel.yml` run.                                                                             |
| `~/public_html_next/hub`     | Symlink to `~/public_html/hub`. Keeps `/hub/` working under the new document root.                                                               |
| Cloudflare role              | Continues to proxy as before — no DNS change in either direction.                                                                                |
| `docs/cutover-redirects.csv` | If Cloudflare Bulk Redirects were enabled, disable that rule too — `.htaccess` redirects vanish automatically when the document root swaps back. |

---

## Escalation Contacts

| Role                          | Contact                                             |
| ----------------------------- | --------------------------------------------------- |
| InterServer cPanel            | InterServer hosting panel + account                 |
| DNS / Cloudflare              | FFC Cloudflare admin account                        |
| GitHub deploy workflow / repo | FreeForCharity GitHub org owner                     |
| WHMCS billing                 | WHMCS admin at `freeforcharity.org/hub/globaladmin` |

---

_Last updated: 2026-05-15 (rewrote for cPanel document-root swap; previous version was for a DNS-flip rollback that no longer applies)._
