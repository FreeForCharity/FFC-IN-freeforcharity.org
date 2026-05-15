# Staging Verification Checklist

Use this checklist to verify the staged Next.js site before swapping
the cPanel document root from `public_html` (WordPress) to
`public_html_next` (the new build).

The cutover target is **InterServer cPanel**, not GitHub Pages — the
apex domain stays on the existing origin so that WHMCS at `/hub/`
keeps working. There is no DNS change.

**Two valid staging surfaces:**

- The GitHub Pages preview at `https://freeforcharity.github.io/FFC-IN-freeforcharity.org/` (run `Deploy to GitHub Pages (staging)` from Actions to refresh).
- The cPanel `~/public_html_next/` directory itself — once the first cPanel deploy has run, you can preview it by temporarily pointing a subdomain (e.g., `staging.freeforcharity.org`) at the same directory in cPanel's "Domains" panel.

**Prerequisite:** CI must be green on `main` and the chosen staging
surface must have the latest build before running manual checks.

---

## 1. Automated Checks (CI Must Pass)

CI-based checks in this table run automatically on every push to `main`; rows
marked `manual` must be run by hand. Confirm all checks are green or completed
before proceeding to the manual checks below.

| Check             | Workflow                      | What It Verifies                                                                                                                             |
| ----------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Format            | `ci.yml`                      | Prettier formatting                                                                                                                          |
| Lint              | `ci.yml`                      | ESLint — no errors                                                                                                                           |
| Unit tests        | `ci.yml`                      | Jest (metadata, sitemap, data files, assetPath)                                                                                              |
| Build             | `ci.yml`                      | `next build` — static export succeeds                                                                                                        |
| Internal links    | `ci.yml`                      | Playwright: no broken internal links (`post-deploy-smoke.spec.ts`)                                                                           |
| External links    | `lychee.yml`                  | Scheduled Lychee link checker against deployed site                                                                                          |
| Accessibility     | `ci.yml`                      | axe-core via Playwright (`tests/accessibility.spec.ts`) — WCAG 2.1 AA                                                                        |
| E2E tests         | `ci.yml`                      | Playwright: navigation, images, cookie consent, copyright, contact page, footer, team, mobile nav, dropdowns, external links                 |
| Lighthouse        | `lighthouse.yml`              | Performance / a11y / SEO / best practices thresholds on multiple URLs                                                                        |
| CodeQL            | `codeql.yml`                  | Static analysis for JS/TS and Actions                                                                                                        |
| Linkinator        | manual                        | Optional: run `npm run check-links` on `./out` for additional coverage                                                                       |
| Visual regression | manual                        | Run `npm run visual-regression` to compare each non-homepage page against the live WordPress origin (see `docs/visual-regression/README.md`) |
| Deploy            | `deploy-cpanel.yml`           | Manual-trigger FTPS upload of `out/` to `~/public_html_next/` on InterServer cPanel (production)                                             |
| Staging preview   | `deploy-gh-pages-staging.yml` | Manual-trigger GitHub Pages preview build (optional; useful for `npm run visual-regression`)                                                 |

---

## 2. Manual Visual Verification

Open each URL in a clean browser (incognito or private mode) and check the
boxes as you go.

**Base URLs:**

- GitHub Pages preview: `https://freeforcharity.github.io/FFC-IN-freeforcharity.org` (refreshed by manually running `Deploy to GitHub Pages (staging)`).
- Pre-flip cPanel preview (optional): `https://<staging-subdomain>.freeforcharity.org/` pointing at `~/public_html_next/`.

Section 2c "Navigation and Footer" and the `/hub/` check below MUST be done on the cPanel preview, not on the GH Pages preview, because the GH Pages site doesn't host `/hub/`.

### 2a. Critical Pages

- [ ] **Homepage** `/` — hero loads, Zeffy endowment-fund iframe renders in
      the `#donate` section, team section visible
- [ ] **About Us** `/about-us` — team member cards and photos appear
- [ ] **Donate** `/donate` — PayPal "Donate Today" button (hosted button
      `9ZKQ23YC3G2J2`) appears in the Measurable Impact section
- [ ] **Endowment Fund** `/free-for-charity-endowment-fund` — see #123
      (donate path on this page is under review)
- [ ] **Volunteer** `/volunteer` — page loads fully
- [ ] **Domains** `/domains` — domain ordering card renders correctly
- [ ] **Free Hosting** `/free-charity-web-hosting` — testimonials carousel works
- [ ] **Help for Charities** `/help-for-charities` — accordion sections expand
- [ ] **Contact Us** `/contact-us` — email, phone, and addresses display
      (no form — matches FFC "no forms outside /hub" policy, see #44)
- [ ] **501(c)(3) Guide** `/501c3` — content loads

### 2b. Legal / Policy Pages

- [ ] **Privacy Policy** `/privacy-policy`
- [ ] **Terms of Service** `/terms-of-service`
- [ ] **Cookie Policy** `/cookie-policy`
- [ ] **Donation Policy** `/donation-policy`
- [ ] **Vulnerability Disclosure Policy** `/vulnerability-disclosure-policy`

### 2c. Navigation and Footer

- [ ] Header nav links all route to correct pages (no 404s)
- [ ] Footer links all route correctly
- [ ] Footer donation policy link points to `/donation-policy`
- [ ] Footer GitHub URL points to `https://github.com/FreeForCharity/FFC-IN-freeforcharity.org`
- [ ] Social icons in footer open correct external URLs

### 2d. WHMCS at /hub/ (cPanel preview only)

The Next.js site and WHMCS share the same `public_html_next/` document
root via a symlink `hub -> ../public_html/hub`. Verify before flipping:

- [ ] `https://<staging-subdomain>.freeforcharity.org/hub/` renders the WHMCS storefront, not a Next.js 404
- [ ] `https://<staging-subdomain>.freeforcharity.org/hub/globaladmin` reaches the WHMCS admin login
- [ ] A test purchase flow at `/hub/store/...` works end-to-end
- [ ] Existing WHMCS sessions are not invalidated by the symlink path

---

## 3. Image and Asset Checks

- [ ] FFC logo appears in header and footer (not broken)
- [ ] Hero images on homepage load without placeholder boxes
- [ ] Team member photos load on About Us
- [ ] Blog card images load
- [ ] No visible broken image icons anywhere on critical pages
- [ ] Run post-deploy smoke test:
  ```bash
  npx playwright test tests/post-deploy-smoke.spec.ts --project=chromium
  ```

---

## 4. Functionality Checks

The following items are covered by CI E2E tests
(`tests/cookie-consent.spec.ts`, `tests/mobile-navigation.spec.ts`,
`tests/dropdown-navigation.spec.ts`, `tests/animated-numbers.spec.ts`,
`tests/footer-complete.spec.ts`, `tests/contact-page.spec.ts`,
`tests/external-links.spec.ts`, `tests/team-section.spec.ts`). Re-run as
a spot-check in a real browser; if CI is green these should all pass.

- [ ] Cookie consent banner appears on first visit (incognito)
- [ ] Accepting cookies hides banner and persists preference on reload
- [ ] Mobile menu opens and closes correctly (resize browser to < 768px)
- [ ] Mobile menu dropdowns reveal sub-items
- [ ] Desktop header dropdowns open on hover
- [ ] Testimonial carousel on homepage auto-advances
- [ ] Animated number counters trigger on scroll (Results section)
- [ ] Accordion items on Help for Charities expand/collapse smoothly
- [ ] All external links open in a new tab with `rel="noopener noreferrer"`

---

## 5. SEO and Meta Checks

Run this in browser DevTools console or use a browser extension:

```js
// Check title and description
document.title
document.querySelector('meta[name="description"]').content
document.querySelector('link[rel="canonical"]').href
```

- [ ] Homepage title: `Free For Charity | Reduce Costs, Increase Impact`
- [ ] Each page has a unique `<title>` tag (use `npm run build` output to verify)
- [ ] Canonical URLs point to `https://www.freeforcharity.org/[path]`
- [ ] On staging: `robots.txt` accessible at `https://freeforcharity.github.io/FFC-IN-freeforcharity.org/robots.txt`; on production: `https://www.freeforcharity.org/robots.txt` — both allow Googlebot
- [ ] `.htaccess` is in place at `~/public_html_next/.htaccess` after first cPanel deploy (check via cPanel File Manager → "Show Hidden Files")

---

## 6. Performance Spot Check

- [ ] Run Lighthouse on homepage via Chrome DevTools → **Lighthouse** tab
  - Performance ≥ 55
  - Accessibility ≥ 90
  - Best Practices ≥ 65
  - SEO ≥ 95
    > **Note:** These thresholds match `lighthouserc.json` but are configured as `warn`
    > level assertions — they will not block CI. Use these as quality indicators, not
    > hard gates.
- [ ] No console errors in DevTools on homepage load
- [ ] No console errors on /donate page (donation widget)

---

## 7. Pre-Cutover Final Gate

All items below must be confirmed before flipping the document root:

- [ ] All automated CI checks are green on the latest `main` commit
- [ ] No recent failed CI or deploy workflow runs on `main` in GitHub Actions
- [ ] First `deploy-cpanel.yml` run completed successfully; `~/public_html_next/` exists on cPanel and contains a fresh build (including `.htaccess`)
- [ ] Symlink `~/public_html_next/hub -> ~/public_html/hub` is in place
- [ ] All critical pages load correctly in incognito on the cPanel preview (sections 2a + 2d above)
- [ ] Images all load (section 3 above)
- [ ] Visual regression run (`npm run visual-regression`) reviewed — no
      missing content on non-homepage pages (see
      [`docs/visual-regression/`](visual-regression/))
- [ ] (Optional) Cloudflare Bulk Redirects rule staged but **not** enabled
      — `.htaccess` already covers these. See [`docs/CUTOVER-REDIRECTS.md`](CUTOVER-REDIRECTS.md)
- [ ] Full cPanel backup downloaded locally (rollback target)
- [ ] Targeted `/hub/` and WHMCS-DB snapshots downloaded
- [ ] Operator confirmed who will trigger the document-root swap
- [ ] Rollback procedure reviewed: [`docs/ROLLBACK.md`](ROLLBACK.md)

---

## 8. Post-Cutover Monitoring (First 30 Minutes)

After the document-root swap, monitor:

- [ ] `https://freeforcharity.org/` returns 200 and serves the Figma redesign (not WordPress)
- [ ] `https://www.freeforcharity.org/` redirects/resolves correctly
- [ ] `https://freeforcharity.org/hub/` renders the WHMCS storefront — **critical billing check**
- [ ] `https://freeforcharity.org/hub/globaladmin` reaches WHMCS admin
- [ ] Homepage loads without any `404` or `5xx` errors
- [ ] Donation buttons on `/donate` and the Zeffy iframe on `/free-for-charity-endowment-fund` still work
- [ ] Sample WP→Next redirects fire (see `docs/CUTOVER-REDIRECTS.md`)
- [ ] WHMCS PHP error logs in cPanel show no new errors related to path changes
- [ ] If problems are detected, on-call manually creates an `incident` issue and begins rollback as needed

If anything fails, follow [`docs/ROLLBACK.md`](ROLLBACK.md) immediately.

---

_Last updated: 2026-05-15 (pivoted from GH Pages to InterServer cPanel)._
