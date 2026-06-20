# Cutover Handoff — Free For Charity WordPress → Next.js (InterServer cPanel)

The pre-cutover engineering work is complete. This document describes
what is done and the operator steps that remain.

> **Cutover day?** Follow [CUTOVER-RUNBOOK.md](CUTOVER-RUNBOOK.md) — a
> single chronological checklist that links back here for the details.
> This doc is the "why / what's done" reference; the runbook is the
> "do this, then this" sequence.

> **Target host:** InterServer cPanel (the same VPS that already runs
> WHMCS at `/hub/`). DNS does **not** change for cutover. We swap the
> document root for the apex from the WordPress install to the Next.js
> static export, leaving `/hub/` untouched.

---

## Status at a glance

| Track                                                            | Status                            | Reference                                                      |
| ---------------------------------------------------------------- | --------------------------------- | -------------------------------------------------------------- |
| Phase 1 — Content audit (REST API, URL mapping, media inventory) | ✅ Closed                         | #32 #33 #34 #35 #36                                            |
| Phase 2 — Builds for missing pages                               | ✅ Closed                         | (already in `src/app/`)                                        |
| Phase 3 — Testing                                                | ✅ Closed                         | #18 #19 #20 #22 #23 #25 #26 #28 #30 #52 #70 #71                |
| Phase 4 — Visual regression harness                              | ✅ Merged (PR #125)               | #24, `docs/visual-regression/`                                 |
| Phase 5 — Apache `.htaccess` redirects + cPanel deploy workflow  | ✅ Pivoted from GH Pages          | #27, `public/.htaccess`, `.github/workflows/deploy-cpanel.yml` |
| Phase 6 — Contact form policy                                    | ✅ Closed (no forms outside /hub) | #44                                                            |
| Phase 7 — Donate flows + /home-old cleanup                       | ✅ Merged                         | #121 #122 #123                                                 |
| Phase 8 — Document-root swap on InterServer                      | ⛔ Operator action                | #29                                                            |

---

## Why cPanel, not GitHub Pages

The original plan flipped DNS to GitHub Pages, but `/hub/` (WHMCS
billing, store, client portal) lives at the same apex domain as the
public site, in the same `public_html/` document root. Splitting `/hub/`
to a subdomain would require touching every WHMCS URL across the
codebase (search: `freeforcharity.org/hub`). Keeping WHMCS at the apex
means the Next.js site has to share the same origin, so it deploys to
cPanel alongside WHMCS rather than to GitHub Pages.

Side benefits: DNS doesn't change, rollback is a single cPanel
document-root swap, the nonprofit-tier cPanel hosting is already paid for.

---

## What's done (automated)

### CI gates green on `main`

- **`ci.yml`** — format check, lint, Jest unit tests (115), Next build, internal link check, Playwright E2E (~100 specs incl. accessibility/axe-core, contact, footer, team, mobile + desktop nav, external links, cookie consent, copyright, animated numbers, image loading, logo, mission video).
- **`lighthouse.yml`** — multi-URL Lighthouse CI (warn thresholds).
- **`lychee.yml`** — scheduled external link check.
- **`codeql.yml`** — JS/TS + Actions static analysis.

### Deploy workflows

- **`deploy-cpanel.yml`** — production. Builds with empty basePath and `lftp`-uploads `out/` to `~/public_html_next/` on the InterServer cPanel host. Manual-trigger only. Uses the same **Azure OIDC → Key Vault** credential model as `deploy-cpanel-staging.yml` (no raw `FTP_*` repo secrets) via the `cpanel-production` GitHub Environment. Upload and post-cutover smoke are split: a default dispatch only writes to `public_html_next/` (zero live impact); pass `run_smoke=true` after the docroot swap to verify the live apex. Preserves `~/public_html/hub/` (WHMCS), which lives outside the upload target dir.
- **`deploy-gh-pages-staging.yml`** — optional. Manual-trigger only. Useful for hosting a no-DNS preview at the GH Pages URL if needed (e.g., to re-run `npm run visual-regression`).

### Pre-cutover artifacts in this repo

- [`public/.htaccess`](../public/.htaccess) — Apache config that ships with the static export. Handles trailing-slash stripping, `.html` resolution, WP→Next 301/302 redirects (incl. PayPal callbacks), `/hub/` pass-through, WP-legacy path blocking, cache + compression, security headers.
- [`docs/cutover-redirects.csv`](cutover-redirects.csv) — same 30-row redirect set as a Cloudflare Bulk Redirects import (optional; `.htaccess` already covers it, but Cloudflare can preempt before hitting origin).
- [`docs/CUTOVER-REDIRECTS.md`](CUTOVER-REDIRECTS.md) — operator runbook.
- [`docs/visual-regression/README.md`](visual-regression/README.md) + `scripts/visual-regression/capture.mjs` — `npm run visual-regression` to compare every non-homepage page against the live WordPress origin (homepage excluded because it's a Figma redesign).
- [`docs/STAGING-CHECKLIST.md`](STAGING-CHECKLIST.md) — manual verification checklist.
- [`docs/ROLLBACK.md`](ROLLBACK.md) — emergency rollback procedure (document-root swap).

### Source fixes shipped in the pre-cutover branch series

- E2E coverage for nav, footer, team, contact, external links (PR #120).
- `target="_blank" rel="noopener noreferrer"` on the 3 external links that were missing it: americanlegionpost64.org (Testimonials), GuideStar seal + profile (footer), techsoup.org (FAQ).
- WCAG 2.1 AA color contrast (#92).
- All three review issues (#121, #122, #123) resolved (see prior commits).

---

## Operator steps for cutover day (#29)

The flip itself is now a **single cPanel action**: change the apex
domain's document root from `public_html` to `public_html_next`.
Rollback is the same action in reverse. WHMCS at `/hub/` is unaffected
because it lives in a sibling directory.

### Pre-flight (do once, ahead of time)

1. **Full cPanel backup** ([#143](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/143)) — cPanel → Backup → "Generate Full Backup". Download the `.tar.gz` locally and keep it. Don't skip this.
2. **Snapshot `/hub/`** ([#148](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/148)) — defense-in-depth on top of the full backup:
   ```bash
   # In cPanel → Terminal (or external SSH)
   tar -czf ~/hub-backup-$(date +%Y%m%d).tar.gz -C ~/public_html hub
   ```
3. **WHMCS database export** ([#149](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/149)) — cPanel → phpMyAdmin → select the WHMCS database → Export → SQL → download.
4. **Provision the `cpanel-production` deploy path** ([#150](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/150)). The production deploy uses Azure OIDC → Key Vault (no raw `FTP_*` repo secrets). One-time admin setup:

   **Required (deploy fails without these):**
   - GitHub Environment **`cpanel-production`** with environment secrets `WR_ALL_FFC_AZURE_KV_CLIENT_ID` and `WR_ALL_FFC_AZURE_TENANT_ID` (same KV-writer Entra app as `cpanel-staging`).
   - Azure **federated credential** on that Entra app for subject `repo:FreeForCharity/FFC-IN-freeforcharity.org:environment:cpanel-production` (case-sensitive).
   - Key Vault `kv-ffc-admin-prod-cbm` secrets: `wr-all-cbm-cpanel-ffc-interserver-ftp-host`, `…-ftp-port` (both shared with staging), plus production-specific `…-deploy-prod-ftp-user` and `…-deploy-prod-ftp-password`. The prod FTP user needs write access to `~/public_html_next/` (the main cPanel account or an account-root deploy user — not a subdomain-jailed user).

   **Optional (analytics is silently disabled without these — see [`.env.example`](../.env.example) for full inventory):**
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 Measurement ID (`G-XXXXXXXXXX`)
   - `NEXT_PUBLIC_CLARITY_PROJECT_ID` — Microsoft Clarity Project ID
   - `NEXT_PUBLIC_META_PIXEL_ID` — Meta Pixel ID (if running Meta ads)

   The deploy workflow (`.github/workflows/deploy-cpanel.yml`) already maps these secrets into the `npm run build` step's `env:` block. Once the secret is populated in repo settings, the next deploy bakes the value into the static export (no further workflow edit needed). Without the secret, the corresponding analytics script never loads (no placeholder fallbacks).

5. **DNS TTL — leave on "Auto"** ([#136](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/136)). For this cutover, DNS doesn't change — the swap happens at the cPanel document-root level on the same origin. Cloudflare's "Auto" TTL already serves proxied records at 300s, so manually lowering buys nothing and forgetting to restore it after costs subsequent-deploy propagation time. **Skip this step unless you're also planning a DNS change** (and you aren't).

### First deploy (creates `public_html_next/`)

1. **Run the workflow** ([#151](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/151)). In GitHub → Actions → "Deploy to InterServer cPanel (production)" → **Run workflow** on `main`. The job builds with empty basePath, FTPS-uploads `out/` to `~/public_html_next/`, and smoke-tests the apex.
2. **SSH/Terminal verify** ([#152](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/152)) into cPanel:
   ```bash
   ls ~/public_html_next/ | head
   ls ~/public_html_next/_next/  # hashed asset directory should exist
   test -f ~/public_html_next/.htaccess && echo "htaccess deployed"
   ```
3. **Link `/hub` from the new directory** ([#153](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/153)) so document-root swap doesn't take WHMCS offline:
   ```bash
   ln -s ~/public_html/hub ~/public_html_next/hub
   ```

### Staging review on cPanel preview (recommended)

1. **Point a staging subdomain** ([#155](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/155)) at `~/public_html_next/` (cPanel → Domains → Create A New Domain → docroot `public_html_next`), OR use a local hosts-file override.
2. **Walk the staging checklist** ([#156](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/156)) sections 2–6 of [`docs/STAGING-CHECKLIST.md`](STAGING-CHECKLIST.md) against the staging URL.
3. **Verify `/hub/` via the staging URL** ([#157](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/157)) — WHMCS storefront + admin login + a sample product page (§2d).

### Flip window

1. **In cPanel → Domains → manage `freeforcharity.org` → change document root** ([#139](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/139)) from `public_html` to `public_html_next`. Apply.
2. **Smoke-test in incognito** ([#140](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/140)), in this order:
   - `https://freeforcharity.org/` — homepage renders the Figma redesign.
   - `https://freeforcharity.org/about-us` — content loads, no 404.
   - `https://freeforcharity.org/donate` — PayPal button visible (`hosted_button_id=9ZKQ23YC3G2J2`).
   - `https://freeforcharity.org/hub/` — **WHMCS billing renders**. Critical check.
   - `https://freeforcharity.org/free-for-charity-terms-of-service/` — should 301-redirect to `/terms-of-service`.
3. (Optional) Stage Cloudflare Bulk Redirects from [`docs/cutover-redirects.csv`](cutover-redirects.csv) per [`docs/CUTOVER-REDIRECTS.md`](CUTOVER-REDIRECTS.md). The `.htaccess` already covers these at the origin; Cloudflare-level rules are redundant but preempt origin traffic.

### Post-flip

1. **First 30 min** ([#141](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/141)) — keep an eye on Apache error logs, Cloudflare 5xx rate, WHMCS at `/hub/`. Per [`docs/STAGING-CHECKLIST.md`](STAGING-CHECKLIST.md) §8.
2. **48-hour soak** ([#142](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/142)) — let organic traffic + an off-hours billing cycle hit the new stack before declaring it stable.
3. **DNS TTL: nothing to do.** Cloudflare "Auto" is what we want. The Auto setting already serves proxied apex records at 300s. Manually pinning a value (and forgetting to restore it) is the failure mode this step was guarding against — pre-flight step 5 above no longer recommends lowering it.
4. **14-day decommission** ([#144](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/144)) — archive WordPress files, drop WP database. Confirms there have been no rollback-triggering incidents during the soak window.

### If anything breaks

Follow [`docs/ROLLBACK.md`](ROLLBACK.md). One cPanel click reverts document root to `public_html` (WordPress).

---

## Out-of-scope / post-cutover

These do not block the document-root swap; pick them up after cutover stabilizes.

- **#39–#42** — Tawk.to / Microsoft Clarity / PostHog / MS Bot Framework integrations (each needs a workspace credential).
- **#45** — Decommission WPMUDEV Beehive Analytics (post-cutover cleanup).
- **#46–#48** — GA4 / GTM / Google Search Console setup (need property IDs).
- **#107** — Stop blocking Dependabot on link rot (workflow fix).
- Subsequent deploys: once you're comfortable, edit `.github/workflows/deploy-cpanel.yml` to fire on `push: branches: [main]` instead of `workflow_dispatch` only.

---

## Quick links

| Resource                         | Path                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------- |
| Apache config (rewrites + cache) | [`public/.htaccess`](../public/.htaccess)                                       |
| cPanel deploy workflow           | [`.github/workflows/deploy-cpanel.yml`](../.github/workflows/deploy-cpanel.yml) |
| WordPress URL → Next.js URL map  | [`docs/CUTOVER-REDIRECTS.md`](CUTOVER-REDIRECTS.md)                             |
| Cloudflare Bulk Redirects CSV    | [`docs/cutover-redirects.csv`](cutover-redirects.csv)                           |
| Visual regression runbook        | [`docs/visual-regression/README.md`](visual-regression/README.md)               |
| Staging verification checklist   | [`docs/STAGING-CHECKLIST.md`](STAGING-CHECKLIST.md)                             |
| Rollback procedure               | [`docs/ROLLBACK.md`](ROLLBACK.md)                                               |

---

_Last updated: 2026-05-15. Source-of-truth for any time-sensitive details is the issue tracker, not this doc._
