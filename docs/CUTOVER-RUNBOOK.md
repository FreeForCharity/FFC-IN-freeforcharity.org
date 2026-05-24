# Cutover Day Runbook

A single, chronological checklist for flipping freeforcharity.org from
WordPress to the Next.js static export. Follow top to bottom. Each step
links to the detailed doc when you need the full reasoning.

**The flip itself is one cPanel action** (change the apex document root
from `public_html` → `public_html_next`). DNS does not change. WHMCS at
`/hub/` is never touched. Rollback is the same action in reverse, ~2–5 min.

Deep-dive docs:
[CUTOVER-HANDOFF](CUTOVER-HANDOFF.md) ·
[STAGING-CHECKLIST](STAGING-CHECKLIST.md) ·
[ROLLBACK](ROLLBACK.md) ·
[CUTOVER-REDIRECTS](CUTOVER-REDIRECTS.md)

---

## T-minus: one-time prep (any time before cutover day)

- [ ] **Full cPanel backup** taken and downloaded off-server ([#143])
- [ ] **`/hub/` snapshot** — `tar -czf ~/hub-backup-$(date +%Y%m%d).tar.gz -C ~/public_html hub` ([#148])
- [ ] **WHMCS DB export** via phpMyAdmin, downloaded ([#149])
- [ ] **GitHub repo secrets set** ([#150]):
  - Required: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
  - Analytics (already set this session): `NEXT_PUBLIC_CLARITY_PROJECT_ID`, `NEXT_PUBLIC_GTM_CONTAINER_ID`, `NEXT_PUBLIC_TAWK_TO_PROPERTY`
  - Optional: `NEXT_PUBLIC_SENTRY_DSN` (after you make a Sentry project)
- [ ] **GA4 tag wired inside GTM** container `GTM-NJ4DXH9` (so analytics flows; see CUTOVER-HANDOFF "analytics")
- [ ] DNS TTL: **leave on Auto** — nothing to change (DNS isn't moving)

## Step 1 — First deploy (populates `public_html_next/`)

- [ ] GitHub → Actions → **Deploy to InterServer cPanel (production)** → Run workflow on `main` ([#151])
  - The workflow refuses to run unless CI is green on that commit, builds with all analytics secrets baked in, FTPS-uploads to `~/public_html_next/`, and runs the full smoke suite against production.
- [ ] SSH/Terminal verify the upload ([#152]):
  ```bash
  ls ~/public_html_next/ | head
  test -f ~/public_html_next/.htaccess && echo "htaccess deployed"
  ls ~/public_html_next/_next/   # hashed assets present
  ```
- [ ] **Create the `/hub` symlink** so the swap doesn't take WHMCS offline ([#153]):
  ```bash
  ln -s ~/public_html/hub ~/public_html_next/hub
  test -L ~/public_html_next/hub && echo "symlink OK"
  ```

## Step 2 — Validate on staging before flipping (recommended)

- [ ] Point a staging subdomain at `public_html_next` ([#155]) and walk
      [STAGING-CHECKLIST](STAGING-CHECKLIST.md) §2–6
- [ ] Confirm `/hub/` renders WHMCS on staging ([#157])
- [ ] Run the smoke suite against staging:
  ```bash
  BASE_URL=https://staging.freeforcharity.org npm run smoke-test
  ```

## Step 3 — THE FLIP

- [ ] cPanel → **Domains → freeforcharity.org → change document root**
      from `public_html` to `public_html_next` ([#139]). Takes effect on
      the next request — no DNS wait.
- [ ] Cloudflare → Caching → **Purge Everything**
- [ ] Smoke the live origin immediately:
  ```bash
  BASE_URL=https://freeforcharity.org npm run smoke-test
  ```
  Expect: every sitemap URL 200, WP→Next 301s firing, `/hub/` serving
  WHMCS, unknown URL 404.

## Step 4 — First 30 minutes ([#141])

- [ ] Homepage renders the Figma redesign in an incognito window
- [ ] `/donate/` — PayPal button + Zeffy iframe load
- [ ] `/hub/` — WHMCS billing renders, can log in
- [ ] Do a **real $5 PayPal donation** end-to-end, confirm the return URL
- [ ] Cookie banner → Accept → GTM + Clarity + Tawk load (DevTools Network)
- [ ] Watch Cloudflare 5xx rate + cPanel `error_log`

## Step 5 — 48-hour soak ([#142])

- [ ] Twice-daily spot checks (the daily scheduled smoke workflow also
      runs automatically and opens a `production-health` issue on failure)
- [ ] Watch for any `production-health` issue or Sentry alerts
- [ ] Confirm an off-hours WHMCS billing cycle ran cleanly

## Step 6 — 14-day decommission ([#144])

- [ ] No rollback-triggering incidents during the soak → archive WP:
  ```bash
  mv ~/public_html ~/public_html_wp_archive_$(date +%Y%m%d)
  ```
  (then re-point the `/hub` symlink target if needed)
- [ ] Drop the WordPress database once the archive is confirmed safe

---

## If anything breaks → ROLLBACK

Follow [ROLLBACK.md](ROLLBACK.md). One cPanel action reverts the document
root to `public_html` (WordPress). ~2–5 min, no DNS propagation. The WP
install is never modified during cutover, so it's always a clean target.

```
cPanel → Domains → freeforcharity.org → document root → public_html
Cloudflare → Caching → Purge Everything
curl -I https://freeforcharity.org   # expect WP headers back
```

---

## Issue references

[#143]: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/143
[#148]: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/148
[#149]: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/149
[#150]: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/150
[#151]: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/151
[#152]: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/152
[#153]: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/153
[#155]: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/155
[#157]: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/157
[#139]: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/139
[#141]: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/141
[#142]: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/142
[#144]: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/144
