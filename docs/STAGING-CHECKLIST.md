# Staging Verification Checklist

Use this checklist to verify the GitHub Pages staging site
(`https://freeforcharity.github.io/FFC-IN-freeforcharity.org/`) before
cutting DNS over to it for production.

**Prerequisite:** CI must be green on `main` and the deploy workflow must have
completed successfully before running manual checks.

---

## 1. Automated Checks (CI Must Pass)

These run automatically on every push to `main`. Confirm all are green before
proceeding to manual checks.

| Check          | Workflow     | What It Verifies                                          |
| -------------- | ------------ | --------------------------------------------------------- |
| Format         | `ci.yml`     | Prettier formatting                                       |
| Lint           | `ci.yml`     | ESLint — no errors                                        |
| Unit tests     | `ci.yml`     | Jest (metadata, sitemap, data files, assetPath)           |
| Build          | `ci.yml`     | `next build` — static export succeeds                     |
| Internal links | `ci.yml`     | Linkinator crawls `./out` — no dead routes                |
| E2E tests      | `ci.yml`     | Playwright: navigation, images, cookie consent, copyright |
| Accessibility  | `ci.yml`     | axe-core WCAG 2.1 AA (critical/serious violations)        |
| Deploy         | `deploy.yml` | GitHub Pages deployment                                   |

---

## 2. Manual Visual Verification

Open each URL in a clean browser (incognito or private mode) and check the
boxes as you go.

**Base URL:** `https://freeforcharity.github.io/FFC-IN-freeforcharity.org`

### 2a. Critical Pages

- [ ] **Homepage** `/` — hero loads, mission video plays, team section visible
- [ ] **About Us** `/about-us` — team member cards and photos appear
- [ ] **Donate** `/donate` — donation form widget loads (iframe renders)
- [ ] **Volunteer** `/volunteer` — page loads fully
- [ ] **Domains** `/domains` — domain ordering card renders correctly
- [ ] **Free Hosting** `/free-charity-web-hosting` — testimonials carousel works
- [ ] **Help for Charities** `/help-for-charities` — accordion sections expand
- [ ] **Contact Us** `/contact-us` — contact form renders
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
- [ ] Footer GitHub URL points to `https://github.com/FreeForCharity`
- [ ] Social icons in footer open correct external URLs

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

- [ ] Cookie consent banner appears on first visit (incognito)
- [ ] Accepting cookies hides banner and persists preference on reload
- [ ] Mobile menu opens and closes correctly (resize browser to < 768px)
- [ ] Testimonial carousel on homepage auto-advances
- [ ] Animated number counters trigger on scroll (Results section)
- [ ] Accordion items on Help for Charities expand/collapse smoothly

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
- [ ] `robots.txt` accessible at `/robots.txt` — allows Googlebot

---

## 6. Performance Spot Check

- [ ] Run Lighthouse on homepage via Chrome DevTools → **Lighthouse** tab
  - Performance ≥ 55
  - Accessibility ≥ 90
  - Best Practices ≥ 65
  - SEO ≥ 95
- [ ] No console errors in DevTools on homepage load
- [ ] No console errors on /donate page (donation widget)

---

## 7. Pre-Cutover Final Gate

All items below must be confirmed before initiating DNS cutover:

- [ ] All automated CI checks are green on the latest `main` commit
- [ ] No open `incident` or `deployment` GitHub Issues (would indicate recent failure)
- [ ] All critical pages load correctly in incognito (section 2a above)
- [ ] Images all load (section 3 above)
- [ ] `NEXT_PUBLIC_BASE_PATH` will be cleared to `''` at cutover time
  - Confirm with team: who will trigger the cutover deploy?
- [ ] DNS TTL has been lowered to 300s (5 min) in Cloudflare at least 1 hour before cutover
- [ ] WordPress server is confirmed running at `66.45.234.13` (rollback target)
- [ ] Rollback procedure reviewed: [`docs/ROLLBACK.md`](ROLLBACK.md)

---

## 8. Post-Cutover Monitoring (First 30 Minutes)

After DNS cutover, monitor:

- [ ] `https://freeforcharity.org` returns 200 with GitHub Pages headers
- [ ] `https://www.freeforcharity.org` redirects/resolves correctly
- [ ] Homepage loads without any `404` or `5xx` errors
- [ ] Donation forms on `/donate` and `/free-for-charity-endowment-fund` still work
- [ ] No incident issues auto-created by the deploy workflow

If anything fails, follow [`docs/ROLLBACK.md`](ROLLBACK.md) immediately.

---

_Last updated: 2026-02-20_
