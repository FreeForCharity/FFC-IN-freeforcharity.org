# Cutover Handoff — Free For Charity WordPress → Next.js

The pre-cutover engineering work is complete. This document inventories
what is done, what is open for human review, and the operator steps that
remain before DNS can flip from WordPress to GitHub Pages (issue #29).

---

## Status at a glance

| Track                                                            | Status                            | Reference                                       |
| ---------------------------------------------------------------- | --------------------------------- | ----------------------------------------------- |
| Phase 1 — Content audit (REST API, URL mapping, media inventory) | ✅ Closed                         | #32 #33 #34 #35 #36                             |
| Phase 2 — Builds for missing pages                               | ✅ Closed                         | (already in `src/app/`)                         |
| Phase 3 — Testing                                                | ✅ Closed                         | #18 #19 #20 #22 #23 #25 #26 #28 #30 #52 #70 #71 |
| Phase 4 — Visual regression harness                              | ✅ Done (PR #125)                 | #24, `docs/visual-regression/`                  |
| Phase 5 — Cloudflare redirects                                   | ✅ Plan + CSV ready (PR #124)     | #27, `docs/cutover-redirects.csv`               |
| Phase 6 — Contact form policy                                    | ✅ Closed (no forms outside /hub) | #44                                             |
| Phase 7 — Pre-cutover review items                               | 🟡 3 open issues                  | #121 #122 #123                                  |
| Phase 8 — DNS cutover                                            | ⛔ Operator action                | #29                                             |

---

## What's done (automated)

### CI gates green on `main`

- **`ci.yml`** — format check, lint, Jest unit tests (115), Next build, internal link check, Playwright E2E (100+ specs incl. accessibility/axe-core, contact, footer, team, mobile + desktop nav, external links, cookie consent, copyright, animated numbers, image loading, logo, mission video).
- **`lighthouse.yml`** — multi-URL Lighthouse CI (warn thresholds).
- **`lychee.yml`** — scheduled external link check.
- **`codeql.yml`** — JS/TS + Actions static analysis.
- **`deploy.yml`** — staged deploy to GitHub Pages on push to main.

### Pre-cutover artifacts in this repo

- [`docs/cutover-redirects.csv`](cutover-redirects.csv) — 30-row Cloudflare Bulk Redirects import file.
- [`docs/CUTOVER-REDIRECTS.md`](CUTOVER-REDIRECTS.md) — operator runbook for the redirect import.
- [`docs/visual-regression/README.md`](visual-regression/README.md) + `scripts/visual-regression/capture.mjs` — `npm run visual-regression` to compare every non-homepage page against the live WordPress origin (homepage excluded because it's a Figma redesign).
- [`docs/STAGING-CHECKLIST.md`](STAGING-CHECKLIST.md) — manual verification checklist.
- [`docs/ROLLBACK.md`](ROLLBACK.md) — emergency rollback procedure.

### Source fixes shipped in the pre-cutover branch series

- E2E coverage for nav, footer, team, contact, external links (PR #120).
- `target="_blank" rel="noopener noreferrer"` on the 3 external links that were missing it: americanlegionpost64.org (Testimonials), GuideStar seal + profile (footer), techsoup.org (FAQ).
- WCAG 2.1 AA color contrast (#92).

---

## Open items requiring human decision before cutover

| #                                                                              | Title                                                                          | Severity                    | Decision needed                                                                                                                                |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [#121](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/121) | General Donations cards link to `/help-for-charities` instead of a donate flow | Functional regression vs WP | Confirm whether the 3 cards on `/donate` (Monthly / One Time / Large) should link to the PayPal hosted button, the Zeffy iframe, or be removed |
| [#122](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/122) | `/home-old` route purpose                                                      | Low                         | Remove if template leftover, keep if intentional                                                                                               |
| [#123](https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/123) | Endowment fund page has no donate path embedded                                | Conversion regression       | Embed Zeffy iframe / PayPal button on `/free-for-charity-endowment-fund` Support-Our-Mission section, or link to `/#donate`                    |

These were filed instead of stubbed per the explicit "no placeholders or
stubs" guidance — fix in code requires intent decisions.

---

## Operator steps for cutover day (#29)

### Pre-flight (≥ 1 hour before flip)

1. **Lower DNS TTL** in Cloudflare for `freeforcharity.org` apex and `www` records to **300s**.
2. **Drain staging cache** if any — GitHub Pages serves fresh on each request.
3. **Resolve open review issues** (#121 #122 #123) or accept the regression risk.
4. **Confirm staging fully passes the checklist** in [`docs/STAGING-CHECKLIST.md`](STAGING-CHECKLIST.md) sections 2–6.
5. **Stage Cloudflare Bulk Redirects** per [`docs/CUTOVER-REDIRECTS.md`](CUTOVER-REDIRECTS.md) — import the CSV, create the rule, **leave the rule disabled**.

### Flip window

1. **In GitHub repo Settings → Pages** — set custom domain to `freeforcharity.org` (`public/CNAME` is already in place).
2. **In Cloudflare DNS** — change apex `A` records from the WordPress origin IP to GitHub Pages IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   …or replace with `CNAME` to `freeforcharity.github.io` (proxied).
3. **Wait for GitHub to provision HTTPS certificate** (a few minutes).
4. **Enable** the Cloudflare Bulk Redirects rule from step 5 of pre-flight.
5. **Smoke test** the 5 sample URLs from `docs/CUTOVER-REDIRECTS.md` section "Operator Steps" #6.

### Post-flip (first 30 minutes)

Follow [`docs/STAGING-CHECKLIST.md`](STAGING-CHECKLIST.md) section 8 "Post-Cutover Monitoring".

### If anything breaks

Follow [`docs/ROLLBACK.md`](ROLLBACK.md). The WordPress server stays running untouched for at least 14 days post-cutover.

---

## Out-of-scope / post-cutover

These were intentionally not done because they need operator credentials, accounts, or further design discussion:

- **#39–#42** — Tawk.to / Microsoft Clarity / PostHog / MS Bot Framework integrations (each needs a property ID or workspace credential).
- **#45** — Decommission WPMUDEV Beehive Analytics (post-cutover cleanup).
- **#46–#48** — GA4 / GTM / Google Search Console setup (need property IDs from Google).
- **#107** — Stop blocking Dependabot on link rot (dependabot CI workflow fix).

These do not block the DNS flip. Pick them up after the cutover stabilizes.

---

## Quick links

| Resource                        | Path                                                              |
| ------------------------------- | ----------------------------------------------------------------- |
| WordPress URL → Next.js URL map | [`docs/CUTOVER-REDIRECTS.md`](CUTOVER-REDIRECTS.md)               |
| Cloudflare Bulk Redirects CSV   | [`docs/cutover-redirects.csv`](cutover-redirects.csv)             |
| Visual regression runbook       | [`docs/visual-regression/README.md`](visual-regression/README.md) |
| Staging verification checklist  | [`docs/STAGING-CHECKLIST.md`](STAGING-CHECKLIST.md)               |
| Rollback procedure              | [`docs/ROLLBACK.md`](ROLLBACK.md)                                 |
| Migration master plan           | [`docs/MIGRATION-PLAN.md`](MIGRATION-PLAN.md) (in PR #38)         |

---

_Last updated: 2026-05-14. Source-of-truth for any time-sensitive details is the issue tracker, not this doc._
