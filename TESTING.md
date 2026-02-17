# Testing Guide

This guide provides comprehensive documentation for testing the Free For Charity web application.

## Quick Start

### Prerequisites
- Node.js 20.x installed
- Dependencies installed (`npm install`)
- Built application (`npm run build`)

### Run Tests
```bash
# Build the application
npm run build

# Install Playwright browsers (first time only)
npx playwright install chromium

# Run tests
npm test              # Headless mode (default)
npm run test:headed   # With visible browser
npm run test:ui       # Interactive Playwright UI
```

## Quick Test Checklist

### 1. Verify Dependencies
```bash
node --version        # Should be v20.x
npm --version         # Should be 10.x
```

### 2. Install Dependencies
```bash
npm install           # Takes ~10-15 seconds
```

### 3. Run Linter
```bash
npm run lint          # Expect 11 warnings (see below)
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
npm test              # Requires build first
```

## Code Quality & Linting

### ESLint

**Configuration**: `eslint.config.mjs`

```bash
npm run lint
```

**Current Output**: 11 warnings (expected)

**Warning Breakdown**:

1. **Image Optimization Warnings** (6 warnings)
   - Files: `Footer/index.tsx`, `Header/index.tsx`, `General-Donation-Card.tsx`, `trainingcard.tsx`, `About-FFC-Hosting/index.tsx`, `Hero/index.tsx` (endowment fund)
   - Issue: Using `<img>` instead of Next.js `<Image />` component
   - Status: ✅ **Acceptable** - Required for static export with unoptimized images
   - Recommendation: No action needed for static export

2. **Unused Import Warnings** (3 warnings)
   - `Link` in `501c3-components/Ready-to-get-started-and-faqs/index.tsx`
   - `assetPath` in `Figma-Home-Page-Components/Mission/index.tsx`
   - `Image` in `free-charity-web-hosting/About-FFC-Hosting/index.tsx`
   - Status: ⚠️ **Can be cleaned up**
   - Recommendation: Remove unused imports

3. **React Hooks Warnings** (2 warnings)
   - `useEffect` missing dependency in `ClientTestimonials/index.tsx`
   - `ref` cleanup function warning in `CallToActionCard.tsx`
   - Status: ⚠️ **Review recommended**
   - Recommendation: Review and fix if causing issues

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

The project uses **Playwright** for end-to-end testing. All tests run automatically in CI before deployment.

**Test Framework**: Playwright v1.56.0  
**Browser**: Chromium (uses system browser to avoid network restrictions)  
**Test Statistics**: 
- **Total**: 29 tests across 6 test suites
- **Passing**: 28 tests ✅
- **Skipped**: 1 test ⏭️
- **Execution Time**: ~25-30 seconds

### Running Tests

#### Local Development

```bash
# Build the site first (required)
npm run build

# Install Playwright browsers (first time only)
npx playwright install chromium

# Run tests in different modes
npm test              # Headless mode (default)
npm run test:headed   # With browser visible
npm run test:ui       # Interactive Playwright UI
```

#### Individual Test Execution

```bash
# Run specific test file
npx playwright test logo.spec.ts
npx playwright test image-loading.spec.ts
npx playwright test animated-numbers.spec.ts

# Run specific test by name
npx playwright test -g "should display logo"

# Debug mode
npx playwright test --debug
```

#### CI/CD Environment

Tests run automatically in GitHub Actions:
- **Trigger**: Every push to main branch
- **Environment**: Ubuntu latest with Node.js 20
- **Browser Setup**: `npx playwright install --with-deps chromium`
- **Build**: Built with `NEXT_PUBLIC_BASE_PATH=/freeforcharity-web`
- **Retry Logic**: Failed tests retry 2 times
- **Failure Handling**: Deployment blocked if tests fail

### Test Files and Coverage

This section details all 6 test suites and their 29 test cases.

#### 1. Logo and Image Visibility (`tests/logo.spec.ts`) - 3 tests

Tests that verify the Free For Charity logo and images display correctly.

**Test Cases:**

1. **`should display logo in header`**
   - **Purpose**: Verifies logo appears in site header
   - **Checks**: Logo visibility, src attribute, alt text
   
2. **`should display hero section image`**
   - **Purpose**: Validates hero section image displays correctly
   - **Checks**: Hero image element present and visible

3. **`both header logo and hero image should be present on the same page`**
   - **Purpose**: Ensures both logo and hero image are visible simultaneously
   - **Checks**: Both images present, consistent display

#### 2. Image Loading (`tests/image-loading.spec.ts`) - 3 tests

Tests that verify image loading performance and visibility.

**Test Cases:**

1. **`images should load correctly and be visible`**
   - **Purpose**: Confirms images load without errors
   - **Checks**: Image visibility, no broken images

2. **`hero image should load from local assets`**
   - **Purpose**: Verifies hero image loads from correct local asset path
   - **Checks**: Hero image src attribute, visibility, not broken

3. **`images have natural dimensions indicating successful load`** ⏭️ **SKIPPED**
   - **Purpose**: Checks images have natural (non-zero) dimensions after loading
   - **Checks**: naturalWidth and naturalHeight properties are greater than zero
   - **Status**: Skipped due to timing/rendering differences in CI

#### 3. Animated Numbers (`tests/animated-numbers.spec.ts`) - 5 tests

Tests the Results 2023 section with animated statistics.

**Test Cases:**

1. **`should display the Results-2023 section with all four statistics`**
   - **Purpose**: Verifies all statistics cards are present
   - **Checks**: Four result cards display correctly

2. **`should start with numbers at 0 before scrolling into view`**
   - **Purpose**: Ensures numbers are not pre-animated
   - **Checks**: All statistics display 0 before scrolling into view

3. **`should animate numbers only once when scrolled into view`**
   - **Purpose**: Verifies animation triggers on scroll and does not repeat
   - **Checks**: Numbers animate from 0 to target values only once per page load

4. **`should display correct descriptions for each statistic`**
   - **Purpose**: Ensures each statistic card has the correct label/description
   - **Checks**: Descriptions match expected text for each statistic

5. **`should respect prefers-reduced-motion preference`**
   - **Purpose**: Accessibility for users with motion sensitivity
   - **Checks**: Animation is disabled when prefers-reduced-motion is set

#### 4. Mission Video (`tests/mission-video.spec.ts`) - 2 tests

Tests the video element in the mission section.

**Test Cases:**

1. **`should display video in mission section`**
   - **Purpose**: Verifies video element exists
   - **Checks**: Video element present and visible

2. **`should have video source configured correctly`**
   - **Purpose**: Validates video source configuration
   - **Checks**: Video src attribute is set correctly

#### 5. Cookie Consent Banner (`tests/cookie-consent.spec.ts`) - 14 tests

Tests the cookie consent banner functionality across 3 test suites.

**Test Suite 1: Cookie Consent Banner** (5 tests)

1. **`should display cookie consent banner on first visit`**
   - **Purpose**: Verifies banner appears for new users
   - **Checks**: Banner visible on initial page load

2. **`should hide banner after clicking Accept All`**
   - **Purpose**: Tests accept all button functionality
   - **Checks**: Banner disappears after clicking Accept All

3. **`should hide banner after clicking Decline All`**
   - **Purpose**: Tests decline all button functionality
   - **Checks**: Banner disappears after clicking Decline All

4. **`should persist Accept All choice and not show banner on subsequent visits`**
   - **Purpose**: Validates accept preference persistence
   - **Checks**: Banner doesn't reappear after acceptance

5. **`should persist Decline All choice and not show banner on subsequent visits`**
   - **Purpose**: Validates decline preference persistence
   - **Checks**: Banner doesn't reappear after declining

**Test Suite 2: Cookie Preferences Modal** (7 tests)

6. **`should open preferences modal when clicking Customize`**
   - **Purpose**: Tests customize button opens modal
   - **Checks**: Modal becomes visible

7. **`should close modal when clicking Cancel`**
   - **Purpose**: Tests cancel button closes modal
   - **Checks**: Modal disappears without saving

8. **`should close modal when pressing Escape key`**
   - **Purpose**: Tests keyboard accessibility
   - **Checks**: Escape key closes modal

9. **`should close modal when clicking outside (overlay)`**
   - **Purpose**: Tests clicking overlay closes modal
   - **Checks**: Modal closes on overlay click

10. **`should have necessary and functional cookies always checked and disabled`**
    - **Purpose**: Ensures essential cookies cannot be disabled
    - **Checks**: Essential cookies checkbox is checked and disabled

11. **`should allow toggling analytics and marketing cookies`**
    - **Purpose**: Tests cookie preference toggles
    - **Checks**: Analytics and marketing checkboxes can be toggled

12. **`should save custom preferences correctly`**
    - **Purpose**: Validates saving custom cookie preferences
    - **Checks**: Selected preferences are saved and persisted

**Test Suite 3: Cookie Consent Accessibility** (2 tests)

13. **`modal should have proper ARIA attributes`**
    - **Purpose**: Ensures modal accessibility
    - **Checks**: Modal has proper ARIA attributes

14. **`banner should have proper ARIA attributes`**
    - **Purpose**: Ensures banner accessibility
    - **Checks**: Banner has proper ARIA attributes

#### 6. Footer Copyright (`tests/copyright.spec.ts`) - 2 tests

Tests the footer copyright notice.

**Test Cases:**

1. **`should display copyright notice with current year`**
   - **Purpose**: Verifies copyright text includes current year
   - **Checks**: Current year appears in copyright notice

2. **`should display link to freeforcharity.org in copyright notice`**
   - **Purpose**: Ensures footer contains link to organization's website
   - **Checks**: Link to https://freeforcharity.org is present in copyright notice

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

### GitHub Actions Workflow

**File**: `.github/workflows/nextjs.yml`

**Pipeline Steps**:
1. ✅ Checkout repository
2. ✅ Setup Node.js 20 with caching
3. ✅ Install dependencies (`npm ci`)
4. ✅ Restore Next.js build cache
5. ✅ Install Playwright browsers with system dependencies
6. ✅ Build with `NEXT_PUBLIC_BASE_PATH=/freeforcharity-web`
7. ✅ Run Playwright test suite (with `CI=true`)
8. ✅ Upload build artifacts (`./out` directory)
9. ✅ Deploy to GitHub Pages (only if tests pass)

**Triggers**:
- Push to `main` branch
- Manual workflow dispatch

**Failure Handling**:
- Tests must pass before deployment
- Build artifacts uploaded even on test failure
- Traces and screenshots available for debugging

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
- [ ] Images load on both custom domain and GitHub Pages
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Mobile navigation menu functions correctly
- [ ] All animations work smoothly

### Content Verification
- [ ] Homepage loads completely
- [ ] All 29 pages are accessible
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
- **Custom domain**: Images should load from root path
- **GitHub Pages**: Images need basePath prefix
- **Solution**: Use `assetPath()` helper from `src/lib/assetPath.ts`

## File Structure Reference

```
freeforcharity-web/
├── tests/                          # Test suite
│   ├── logo.spec.ts               # Logo visibility tests (3 tests)
│   ├── github-pages.spec.ts       # Deployment compatibility tests (3 tests)
│   └── README.md                  # Test documentation
├── playwright.config.ts            # Playwright configuration
├── .github/workflows/
│   └── nextjs.yml                 # CI/CD pipeline with automated tests
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

1. **Accessibility Testing**
   - Tool: @axe-core/playwright
   - Purpose: Automated WCAG 2.1 compliance checks
   - Benefit: Ensure site is accessible to all users

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

**Test Suite Status**: ✅ 5 passing, 1 skipped  
**Integration Status**: ✅ Complete  
**Last Tested**: October 2025
