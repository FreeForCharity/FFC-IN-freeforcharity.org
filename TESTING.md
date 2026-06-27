# Testing Guide

This guide provides comprehensive documentation for testing the Free For Charity web application.

## Quick Start

### Prerequisites

- Node.js 24.x installed
- Dependencies installed (`npm install`)
- Built application (`npm run build`)

### Run Tests

```bash
# Jest unit / component / a11y tests (jsdom — no build required)
npm test              # Run the Jest suite once
npm run test:watch    # Jest in watch mode
npm run test:coverage # Jest with coverage report

# Playwright E2E tests (require a production build first)
npm run build                       # Build the static site
npx playwright install chromium     # Install browsers (first time only)
npm run test:e2e          # Headless mode (default)
npm run test:e2e:headed   # With visible browser
npm run test:e2e:ui       # Interactive Playwright UI
```

## Quick Test Checklist

### 1. Verify Dependencies

```bash
node --version        # Should be v24.x
npm --version         # Should be 10.x
```

### 2. Install Dependencies

```bash
npm install           # Takes ~10-15 seconds
```

### 3. Run Linter

```bash
npm run lint          # Passes clean: 0 errors
```

### 4. Build Application

```bash
npm run build         # Takes ~15-20 seconds
```

### 5. Preview Build

```bash
npm run preview       # Visit http://localhost:3000
```

### 6. Run Automated Tests

```bash
npm test              # Jest unit/component/a11y tests (no build required)
npm run test:e2e      # Playwright E2E tests (requires build first)
```

## Code Quality & Linting

### ESLint

**Configuration**: `eslint.config.mjs`

```bash
npm run lint
```

**Current Output**: Passes clean — **0 errors**.

The source tree lints without errors. (A trivial "Unused eslint-disable directive" warning may surface in generated files under `coverage/`, which is not part of the source and can be ignored.)

**Rules Enabled**:

- Next.js core-web-vitals
- TypeScript recommended rules
- React hooks rules

**Ignored Paths**:

- `node_modules/`
- `.next/`
- `out/`
- `build/`
- `test-results/`
- `playwright-report/`

### TypeScript

**Configuration**: `tsconfig.json`

- **Strict Mode**: Enabled
- **Type Checking**: Runs during build
- **Target**: ES2017+ with Next.js optimizations
- **Path Aliases**: `@/*` maps to `src/*`

**Check Types**:

```bash
npm run build  # Type checking is part of build process
```

**Current Status**: ✅ No type errors

## Automated Test Suite

### Overview

The project uses **Playwright** for end-to-end (E2E) testing and **Jest + React Testing Library + jest-axe** (jsdom) for unit, component, and accessibility tests. All tests run automatically in CI (`.github/workflows/ci.yml`) before the production deploy to InterServer cPanel (`.github/workflows/deploy-cpanel.yml`). GitHub Pages is now a manual staging/preview surface only (`.github/workflows/deploy-gh-pages-staging.yml`), not production.

The suite is organized in two layers:

- **Jest unit / component / a11y layer** — **20 test files** under `__tests__/`. Uses Jest + React Testing Library + jest-axe in a jsdom environment to render components and pages and assert on markup, behavior, data integrity, and accessibility (axe). Runs with `npm test` (no build required).
- **Playwright E2E layer** — **18 spec files** in `tests/` (`*.spec.ts`). Drives a real browser against the built site to verify end-to-end behavior, navigation, and rendering. Runs with `npm run test:e2e` (requires `npm run build` first).

**E2E Test Framework**: Playwright (Chromium — uses system browser to avoid network restrictions)  
**Unit/Component Framework**: Jest + React Testing Library + jest-axe (jsdom)

### Running Tests

#### Local Development

```bash
# Jest unit/component/a11y tests (no build required)
npm test              # Run once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage

# Playwright E2E tests
npm run build                       # Build the site first (required)
npx playwright install chromium     # Install browsers (first time only)
npm run test:e2e          # Headless mode (default)
npm run test:e2e:headed   # With browser visible
npm run test:e2e:ui       # Interactive Playwright UI
```

#### Individual Test Execution

```bash
# Run a specific Jest test file
npx jest __tests__/components/header/index.test.tsx

# Run a specific Playwright spec file
npx playwright test logo.spec.ts
npx playwright test image-loading.spec.ts
npx playwright test animated-numbers.spec.ts

# Run a specific Playwright test by name
npx playwright test -g "should display logo"

# Debug mode
npx playwright test --debug
```

#### CI/CD Environment

Tests run automatically in GitHub Actions (`ci.yml`):

- **Trigger**: Every push / pull request to the `main` branch
- **Environment**: Ubuntu latest with Node.js 24.x
- **Pipeline**: Format check, lint, Jest unit/component tests, build, internal link check, then Playwright E2E
- **Browser Setup**: `npx playwright install --with-deps chromium`
- **Production build**: Built at root path with `NEXT_PUBLIC_BASE_PATH=''` (the cPanel apex docroot). The GitHub Pages staging build uses `NEXT_PUBLIC_BASE_PATH=/FFC-IN-freeforcharity.org`.
- **Retry Logic**: Failed E2E tests retry 2 times
- **Failure Handling**: The production deploy (`deploy-cpanel.yml`) only runs after CI is green

### Test Files and Coverage

This section summarizes the two test layers by file and area. It describes coverage by file/category rather than enumerating individual test cases, since both suites evolve.

#### Playwright E2E layer (`tests/` — 18 spec files)

Each file below is a `*.spec.ts` in `tests/`, grouped by area:

**Navigation & layout**

- `navigation.spec.ts` — primary site navigation and routing
- `dropdown-navigation.spec.ts` — dropdown menu behavior
- `mobile-navigation.spec.ts` — mobile menu / hamburger navigation
- `trailing-slash.spec.ts` — trailing-slash URL handling
- `external-links.spec.ts` — external link targets and attributes

**Page content & sections**

- `contact-page.spec.ts` — contact page rendering and behavior
- `team-section.spec.ts` — team / board member section
- `footer-complete.spec.ts` — footer content and completeness
- `copyright.spec.ts` — footer copyright notice (current year, org link)
- `logo.spec.ts` — header logo and hero image visibility
- `image-loading.spec.ts` — image loading and visibility
- `mission-video.spec.ts` — mission section video element
- `animated-numbers.spec.ts` — Results section animated statistics

**Behavior & integrations**

- `cookie-consent.spec.ts` — cookie consent banner and preferences modal
- `donation-flows.spec.ts` — donation flow paths
- `analytics-loading.spec.ts` — analytics script loading
- `accessibility.spec.ts` — accessibility checks (`@axe-core/playwright`)
- `post-deploy-smoke.spec.ts` — post-deploy smoke checks

#### Jest unit / component / a11y layer (`__tests__/` — 20 test files)

Jest + React Testing Library + jest-axe (jsdom) render components and pages and assert on markup, behavior, data integrity, and accessibility. Grouped by area:

**App / routing / metadata**

- `app/metadata.test.ts` — page metadata
- `app/sitemap.test.ts` — sitemap generation
- `app/page-render.test.tsx` — page render smoke tests
- `app/all-sections` and `components/all-sections.test.tsx` — broad section rendering coverage

**Components**

- `components/header/index.test.tsx` — site header
- `components/home/MissionSection.test.tsx`, `home/Contactus/index.test.tsx`, `home/Ourblogs/index.test.tsx` — homepage sections
- `components/donate-components/Free-for-Charity-Donation-Options/index.test.tsx`, `donate-components/measurable-impact.test.tsx` — donate components
- `components/guidestar-guide/Faqs.test.tsx`, `guidestar-guide/Free-for-charity/index.test.tsx` — GuideStar guide components
- `components/free-charity-web-hosting/About-FFC-Hosting/index.test.tsx` — hosting page component
- `components/ui/ui-batch-1.test.tsx`, `ui/ui-batch-2.test.tsx`, `ui/ui-batch-3.test.tsx` — UI component batches

**Data & libraries**

- `data/data-files.test.ts` — data file integrity (team, FAQs, testimonials)
- `data/image-paths.test.ts` — image path validity
- `lib/assetPath.test.ts` — `assetPath()` helper
- `lib/config.test.ts` — configuration helpers

Many component and page tests include jest-axe assertions for accessibility; a shared axe helper lives at `__tests__/utils/axe.ts`.

### Test Configuration

**Playwright Config** (`playwright.config.ts`)

Key settings:

- **Test Directory**: `./tests`
- **Base URL**: `http://localhost:3000`
- **Parallel Execution**: Enabled locally, disabled in CI for stability
- **Retries**: 2 in CI, 0 locally
- **Web Server**: Auto-starts `npm run preview` before tests (120s timeout)
- **Browser**: System Chromium (fallback to Playwright's if unavailable)
- **Trace Collection**: On first retry for debugging
- **Reporter**: HTML report (view with `npx playwright show-report`)

**Special Features**:

- Automatically detects and uses system Chromium browser
- Works in restricted network environments (no external downloads)
- Prevents accidental `test.only` in CI (`forbidOnly: true`)
- Smart web server management (auto-start/stop)

## CI/CD Integration

### GitHub Actions Workflows

**CI** (`.github/workflows/ci.yml`) — runs on every push / PR to `main`:

1. ✅ Checkout repository
2. ✅ Setup Node.js 24.x with caching
3. ✅ Install dependencies (`npm ci`)
4. ✅ Format check and lint
5. ✅ Run Jest unit/component/a11y tests (jest-axe, jsdom)
6. ✅ Build the site
7. ✅ Internal link check
8. ✅ Install Playwright browsers with system dependencies
9. ✅ Run Playwright E2E suite (with `CI=true`)

**Production deploy** (`.github/workflows/deploy-cpanel.yml`) — runs only after CI is green on `main`. It mirrors the built `out/` directory into `~/public_html` on InterServer cPanel (the live apex docroot for `freeforcharity.org`, served at the root path with `NEXT_PUBLIC_BASE_PATH=''`), excluding the WHMCS install at `~/public_html/hub`.

**Staging / preview deploy** (`.github/workflows/deploy-gh-pages-staging.yml`) — manual only. Publishes to GitHub Pages at the subpath `https://freeforcharity.github.io/FFC-IN-freeforcharity.org/`, where `basePath` `/FFC-IN-freeforcharity.org` plus the `assetPath()` helper apply.

**Other workflows**: `lighthouse.yml` (performance), `lychee.yml` (link checking), `scheduled-prod-smoke.yml` (scheduled production smoke checks).

> Note: the old GitHub Pages **production** workflows (`deploy.yml` / `nextjs.yml`) have been removed — production is no longer served from GitHub Pages.

**Failure Handling**:

- CI must pass before the production deploy runs
- Build artifacts uploaded even on test failure
- Traces and screenshots available for debugging

### Post-Deploy Smoke Tests

After a production deploy, run the smoke harness against the live site:

```bash
npm run smoke-test    # runs scripts/smoke-test.mjs
```

It hits the live apex (`freeforcharity.org`), the WHMCS hub at `/hub`, and verifies key redirects. The `scheduled-prod-smoke.yml` workflow runs these checks on a schedule.

### TypeScript

**Configuration**: `tsconfig.json`

- **Strict Mode**: Enabled
- **Type Checking**: Runs during build
- **Path Aliases**: Configured for clean imports
- **Target**: ES2017+ with Next.js optimizations

## Security Testing

### npm audit

Check for security vulnerabilities in dependencies:

```bash
npm audit
```

**Current Status**: ✅ 0 vulnerabilities (as of build)

**Best Practices**:

- Run `npm audit` regularly
- Update dependencies promptly when vulnerabilities are discovered
- Enable Dependabot for automated security updates
- Review and test updates before deploying

### Recommended Security Enhancements

1. **GitHub Dependabot**: Enable automated dependency updates
2. **CodeQL**: Add GitHub CodeQL for code security scanning
3. **npm audit CI**: Add automated audit checks to CI pipeline
4. **SAST Tools**: Consider static application security testing tools

## Manual Testing Checklist

### Visual Elements

- [ ] Logo displays in Header (top navigation)
- [ ] Logo renders correctly on all pages
- [ ] Images load on both the production apex (root path) and the GitHub Pages staging/preview subpath
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Mobile navigation menu functions correctly
- [ ] All animations work smoothly

### Content Verification

- [ ] Homepage loads completely
- [ ] All 35 page routes are accessible
- [ ] Team members display correctly (5 board members)
- [ ] Testimonials render properly (3 testimonials)
- [ ] FAQs are visible and formatted correctly
- [ ] Footer links work correctly
- [ ] Header navigation links work

### Forms and Interactions

- [ ] Contact form submission works
- [ ] Donate page loads correctly
- [ ] Volunteer page loads correctly
- [ ] Cookie consent banner appears
- [ ] External links open correctly

### Cross-Browser Testing

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

## Expected Content

### Team Members (src/data/team/)

1. **Clarke Moyer** - Founder/President
2. **Chris Rae** - Vice President
3. **Tyler Carlotto** - Secretary
4. **Brennan Darling** - Treasurer
5. **Rebecca Cook** - Member at Large

### Testimonials (src/data/testimonials/)

1. Professional online presence testimonial
2. Free domain and email testimonial
3. Core mission focus testimonial

### FAQs (src/data/faqs/)

1. **What is the organization aiming to accomplish?** (JSON file)
2. **Are you really a Charity?** (JSON file)
3. Additional FAQs defined inline in `src/data/faqs.ts`

## Common Issues & Troubleshooting

### Build Issues

**Issue: Build fails with network errors**

- **Status**: ✅ **RESOLVED** - Google Fonts have been removed
- **Current**: Build works without modifications
- **Build time**: ~15-20 seconds

**Issue: Build cache not found warning**

- **Cause**: First build or cache was cleared
- **Solution**: Normal behavior, subsequent builds will be faster
- **Impact**: None - just informational

### Development Server Issues

**Issue: Port 3000 already in use**

```bash
# Kill process on port 3000
npx kill-port 3000
# Or specify different port
npm run dev -- -p 3001
```

**Issue: Changes not reflecting**

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Test Issues

**Issue: Playwright browsers not found**

```bash
# Install browsers with system dependencies
npx playwright install chromium --with-deps
```

**Issue: Tests timeout**

- **Cause**: Web server didn't start in time
- **Solution**: Timeout is set to 120s in `playwright.config.ts`
- **Check**: Ensure build completed successfully
- **Verify**: Run `npm run preview` manually to test

**Issue: Tests pass locally but fail in CI**

- **Check**: GitHub Actions logs for specific errors
- **Review**: Test artifacts (screenshots, traces) in Actions
- **Compare**: Local vs CI environment differences
- **Consider**: Timing/race conditions in tests

**Issue: Image dimension test skipped**

- **Status**: Expected behavior
- **Reason**: `naturalWidth`/`naturalHeight` unreliable in CI
- **Impact**: None - other tests cover image loading

### Content Issues

**Issue: Content not showing**

```bash
# Check JSON file validity
cat src/data/team/clarke-moyer.json | jq .

# Verify imports in data loader files
cat src/data/team.ts
```

**Issue: Images not loading**

- **Production (cPanel apex)**: Images load from the root path (`NEXT_PUBLIC_BASE_PATH=''`)
- **GitHub Pages staging/preview**: Images need the `/FFC-IN-freeforcharity.org` basePath prefix
- **Solution**: Use `assetPath()` helper from `src/lib/assetPath.ts` so both surfaces resolve correctly

## File Structure Reference

```
freeforcharity-web/
├── tests/                          # Playwright E2E specs (18 *.spec.ts files)
│   ├── logo.spec.ts               # Logo / hero image visibility
│   ├── navigation.spec.ts         # Site navigation
│   ├── cookie-consent.spec.ts     # Cookie consent banner & modal
│   └── ...                        # (see "Test Files and Coverage")
├── __tests__/                      # Jest unit/component/a11y tests (20 files)
│   ├── components/                # Component render + axe tests
│   ├── app/                       # Page render, metadata, sitemap
│   ├── data/                      # Data file integrity
│   ├── lib/                       # Helper unit tests
│   └── utils/axe.ts               # Shared jest-axe helper
├── playwright.config.ts            # Playwright configuration
├── .github/workflows/
│   ├── ci.yml                     # CI: format, lint, Jest, build, links, Playwright E2E
│   ├── deploy-cpanel.yml          # Production deploy to InterServer cPanel (apex)
│   └── deploy-gh-pages-staging.yml # Manual GitHub Pages staging/preview deploy
├── public/                         # Static assets
├── src/data/
│   ├── faqs/
│   │   ├── what-is-the-organization-aiming-to-accomplish.json
│   │   └── are-you-really-a-charity.json
│   ├── team/
│   │   ├── clarke-moyer.json
│   │   ├── chris-rae.json
│   │   ├── tyler-carlotto.json
│   │   ├── brennan-darling.json
│   │   └── rebecca-cook.json
│   ├── testimonials/
│   │   ├── testimonial-1.json
│   │   ├── testimonial-2.json
│   │   └── testimonial-3.json
│   ├── faqs.ts                    # Imports FAQ JSON files
│   ├── team.ts                    # Imports team JSON files
│   └── testimonials.ts            # Imports testimonial JSON files
├── TESTING.md                     # This file
└── README.md                      # Project overview with testing summary
```

## Recommended Testing Enhancements

### High Priority

1. **Accessibility Testing** (partially adopted)
   - Tool: `@axe-core/playwright` (E2E) and `jest-axe` (unit/component)
   - Purpose: Automated WCAG 2.1 compliance checks
   - Status: In use today; expand coverage to remaining pages/components

2. **Mobile Responsive Testing**
   - Tool: Playwright viewport configuration
   - Purpose: Test multiple device sizes and orientations
   - Benefit: Validate responsive design works correctly

3. **Cross-Browser Testing**
   - Browsers: Firefox, WebKit (Safari)
   - Purpose: Ensure consistent behavior across browsers
   - Benefit: Catch browser-specific issues

### Medium Priority

4. **Performance Testing**
   - Tool: Lighthouse CI
   - Purpose: Monitor Core Web Vitals, SEO, Best Practices
   - Benefit: Track performance regression over time

5. **Visual Regression Testing**
   - Tool: Percy.io or Playwright screenshots
   - Purpose: Detect unintended UI changes
   - Benefit: Prevent visual bugs from reaching production

6. **Link Validation**
   - Tool: Custom Playwright tests or broken-link-checker
   - Purpose: Verify all internal and external links work
   - Benefit: Prevent 404 errors and broken navigation

### Lower Priority

7. **Test Coverage Reporting**
   - Tool: Istanbul/NYC with Playwright
   - Purpose: Track test coverage percentage
   - Benefit: Identify untested code paths

8. **Bundle Size Monitoring**
   - Tool: next-bundle-analyzer
   - Purpose: Track bundle size over time
   - Benefit: Prevent performance degradation from large bundles

9. **Dependency Vulnerability Scanning**
   - Tool: GitHub Dependabot + CodeQL
   - Purpose: Automated security vulnerability detection
   - Benefit: Early warning of security issues

### GitHub Actions Enhancements

10. **Branch Protection Rules**
    - Require status checks to pass before merge
    - Require code review approval
    - Prevent direct pushes to main

11. **Automated PR Comments**
    - Post test results to PR comments
    - Include test coverage reports
    - Show performance comparison

12. **Preview Deployments**
    - Deploy PR preview to GitHub Pages subdomain
    - Allow testing changes before merge
    - Include preview URL in PR comment

13. **Caching Optimization**
    - Cache npm dependencies between runs
    - Cache Playwright browsers
    - Cache Next.js build cache

14. **Parallel Test Execution**
    - Split test suite into parallel jobs
    - Reduce total CI runtime
    - Faster feedback on failures

## Next Steps for Production

1. **Implement Priority Test Enhancements**
   - Start with accessibility testing
   - Add mobile responsive tests
   - Enable cross-browser testing

## Documentation

- Quick start: [README.md](./README.md#content-management)
- Test suite: [tests/README.md](./tests/README.md)
- Playwright docs: https://playwright.dev/docs/intro

---

**Test Suite Status**: ✅ Jest (20 test files) + Playwright E2E (18 spec files), lint clean (0 errors)  
**Integration Status**: ✅ Complete
