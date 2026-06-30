# Test Suite

This directory contains automated end-to-end (E2E) tests for the Free For Charity web application using Playwright. The project also has Jest + React Testing Library + jest-axe unit, component, and accessibility tests (jsdom) that live alongside the source and run in CI before the E2E suite.

## Test Statistics

- **Total Tests**: 125 tests across 9 test suites
- **Status**: ✅ 124 passing, ⏭️ 1 skipped
- **Execution Time**: ~40-60 seconds
- **Framework**: Playwright v1.60

## Test Files

### `logo.spec.ts` - Logo and Image Visibility (3 tests)

Tests logo visibility and image loading across the application.

**Test Suite**: `Logo and Image Visibility`

**Tests:**

1. **`should display logo in header`**
   - Verifies logo appears in site header
   - Checks logo visibility, src attribute, and alt text

2. **`should display hero section image`**
   - Validates hero section image displays correctly
   - Checks hero image element is present and visible

3. **`both header logo and hero image should be present on the same page`**
   - Ensures both logo and hero image are visible simultaneously
   - Validates both images present with consistent display

### `image-loading.spec.ts` - Image Loading (3 tests)

Tests image loading performance and visibility.

**Test Suite**: `Image Loading`

**Tests:**

1. **`images should load correctly and be visible`**
   - Confirms images load without errors
   - Checks image visibility across the site

2. **`hero image should load from local assets`**
   - Verifies that the hero image loads correctly from local assets
   - Ensures the hero image is present and visible on the homepage

3. **`images have natural dimensions indicating successful load`** ⏭️ **SKIPPED**
   - Checks that images have non-zero natural width and height after loading
   - Skipped due to timing or rendering differences in CI environments

### `animated-numbers.spec.ts` - Animated Statistics (5 tests)

Tests the homepage Results section with animated statistics. The section is
data-driven from `src/data/impact.json` (see `docs/METRICS-PLAYBOOK.md`).

**Test Suite**: `Results Animated Numbers`

**Tests:**

1. **`should display the Results section with all four statistics`**
   - Verifies all four statistics cards display
   - Checks for: Charity domains under management, Charity websites built, Charitable organizations supported, and Years serving nonprofits

2. **`should start with numbers at 0 before scrolling into view`**
   - Ensures numbers are not pre-animated
   - Verifies a numeric card (Charity domains under management) starts at 0 before scrolling into view (the non-numeric "200+" card renders as-is and does not animate)

3. **`should animate numbers only once when scrolled into view`**
   - Verifies animation triggers on scroll and does not repeat
   - Confirms numbers animate from 0 to target values only once per page load

4. **`should display correct descriptions for each statistic`**
   - Ensures each statistic card has the correct label/description
   - Validates descriptions match expected text for each statistic

5. **`should respect prefers-reduced-motion preference`**
   - Accessibility for users with motion sensitivity
   - Animation disabled when prefers-reduced-motion is set

### `mission-video.spec.ts` - Video Functionality (3 tests)

Tests the video element in the mission section.

**Test Suite**: `Mission Video`

**Tests:**

1. **`should display video in mission section`**
   - Verifies video element exists
   - Checks video visibility on page

2. **`should have video source configured correctly`**
   - Validates video source configuration
   - Ensures video src attribute is set correctly

3. **`video source URL should resolve to a 200 (no dead off-domain redirect)`**
   - Asserts the `<source>` URL is same-origin (no `ffcsites.org` /
     `ffcadmin.org` / other off-domain hosts)
   - Fetches the resolved URL and verifies it returns 200 or 206
     (catches dead redirect chains before deploy)

### `cookie-consent.spec.ts` - Cookie Consent (14 tests)

Tests the cookie consent banner functionality and GDPR compliance across 3 test suites.

**Test Suite 1**: `Cookie Consent Banner` (5 tests)

1. **`should display cookie consent banner on first visit`**
   - Verifies banner appears for new users
   - Checks banner visibility on initial page load

2. **`should hide banner after clicking Accept All`**
   - Tests Accept All button functionality
   - Confirms banner disappears after acceptance

3. **`should hide banner after clicking Decline All`**
   - Tests Decline All button functionality
   - Verifies banner disappears after declining

4. **`should persist Accept All choice and not show banner on subsequent visits`**
   - Validates accept preference persistence
   - Ensures banner doesn't reappear after acceptance

5. **`should persist Decline All choice and not show banner on subsequent visits`**
   - Validates decline preference persistence
   - Ensures banner doesn't reappear after declining

**Test Suite 2**: `Cookie Preferences Modal` (7 tests)

6. **`should open preferences modal when clicking Customize`**
   - Tests Customize button opens modal
   - Verifies modal becomes visible

7. **`should close modal when clicking Cancel`**
   - Tests Cancel button closes modal
   - Modal disappears without saving changes

8. **`should close modal when pressing Escape key`**
   - Tests keyboard accessibility
   - Escape key closes modal

9. **`should close modal when clicking outside (overlay)`**
   - Tests clicking overlay closes modal
   - Modal closes when clicking outside

10. **`should have necessary and functional cookies always checked and disabled`**
    - Ensures essential cookies cannot be disabled
    - Essential cookies checkbox is checked and disabled

11. **`should allow toggling analytics and marketing cookies`**
    - Tests cookie preference toggles
    - Analytics and marketing checkboxes can be toggled

12. **`should save custom preferences correctly`**
    - Validates saving custom cookie preferences
    - Selected preferences are saved and persisted

**Test Suite 3**: `Cookie Consent Accessibility` (2 tests)

13. **`modal should have proper ARIA attributes`**
    - Ensures modal accessibility
    - Validates proper ARIA attributes on modal

14. **`banner should have proper ARIA attributes`**
    - Ensures banner accessibility
    - Validates proper ARIA attributes on banner

### `accessibility.spec.ts` - Accessibility Audit (33 tests)

Tests WCAG 2.1 AA accessibility compliance using `@axe-core/playwright`.

**Test Suite**: `Accessibility (WCAG 2.1 AA)`

Audits all 33 sitemap pages for critical, serious, and unknown-impact axe-core violations.
`color-contrast` is disabled pending brand color design review (issue #80). Third-party
donation iframes are excluded as their internal DOM is outside FFC control. Routes are
imported from the shared `routes.ts` module.

**Pages Audited:**
Homepage, About Us, Contact Us, Donate, Volunteer, Domains, Free Charity Web Hosting,
Help for Charities, Blog, Consulting, Free Training Programs, Workforce Development,
Service & Consultant Directory, Technology Directory, Case Studies, 501c3, Pre-501c3,
Endowment Fund, GuideStar Guide, Tools for Success, Service Delivery Stages, Web
Developer Training Guide, Volunteer Proving Ground, Charity Validation Guide, Online
Impacts Onboarding Guide, Tech Stack, Donation Policy, FFC Donation Policy, Privacy
Policy, Terms of Service, Cookie Policy, Vulnerability Disclosure Policy, Security
Acknowledgements.

### `navigation.spec.ts` - Header Navigation & Page Loading (16 tests)

Tests header navigation links, critical page loading, and footer content.

**Test Suite 1**: `Header Navigation` (5 tests)

1. **`should display main navigation links`**
   - Verifies main nav items are visible (Home, Help for Charities, Volunteer, Donate, About Us)

2. **`should navigate to About Us page`**
   - Navigates to /about-us and verifies expected content

3. **`should navigate to Contact Us page`**
   - Navigates to /contact-us and verifies expected content

4. **`should navigate to Donate page`**
   - Navigates to /donate and verifies expected content

5. **`should navigate to Volunteer page`**
   - Navigates to /volunteer and verifies expected content

**Test Suite 2**: `Page Loading` (8 tests)

Parameterized tests for 8 critical pages (Home, About Us, Contact Us, Donate, Volunteer, Domains, Privacy Policy, Terms of Service). Each test verifies HTTP 200 status, expected content text, and header/footer presence.

**Test Suite 3**: `Footer` (3 tests)

6. **`should contain social media links`**
   - Verifies Facebook, LinkedIn, and GitHub links in footer

7. **`should contain contact information`**
   - Checks for contact phone link

8. **`should contain policy links`**
   - Verifies privacy policy and terms of service links

### `post-deploy-smoke.spec.ts` - Post-Deploy Smoke Tests (47 tests)

Crawls every page in the sitemap and verifies pages load, images render, and internal links resolve.

**Test Suite 1**: `All pages load successfully` (33 tests)

Parameterized tests for all 33 sitemap routes. Each test verifies the page returns HTTP 200.

**Test Suite 2**: `No broken images` (13 tests)

Parameterized tests for 13 image-heavy pages. Each test monitors network responses for failed image requests and checks all `<img>` elements have loaded (naturalWidth > 0).

**Test Suite 3**: `No broken internal links` (1 test)

1. **`homepage internal links resolve`**
   - Collects all internal `<a href>` values from the homepage
   - Navigates to each and verifies HTTP 200

### `copyright.spec.ts` - Footer Copyright (2 tests)

Tests the footer copyright notice and organizational information.

**Test Suite**: `Footer Copyright Notice`

**Tests:**

1. **`should display copyright notice with current year`**
   - Verifies copyright text includes current year
   - Validates copyright symbol and text

2. **`should display link to freeforcharity.org in copyright notice`**
   - Checks that the footer contains a link to https://freeforcharity.org
   - Verifies the link is present and correctly formatted

## Running Tests

### Prerequisites

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Install Playwright browsers (first time only):**
   ```bash
   npx playwright install chromium
   ```

### Test Commands

```bash
# Run all tests in headless mode (default)
npm test

# Run tests with browser visible (useful for debugging)
npm run test:headed

# Run tests with Playwright UI (interactive mode)
npm run test:ui
```

### Running Individual Tests

```bash
# Run only logo tests
npx playwright test logo.spec.ts

# Run only the post-deploy smoke tests
npx playwright test post-deploy-smoke.spec.ts

# Run a specific test by name
npx playwright test -g "should display logo in top left corner"

# Run in debug mode
npx playwright test --debug
```

## Test Configuration

Tests are configured in `playwright.config.ts` at the project root.

**Key Configuration:**

- **Base URL**: `http://localhost:3000`
- **Browser**: Chromium (uses system browser when available)
- **Web Server**: Auto-starts `npm run preview` before tests
- **Server Timeout**: 120 seconds
- **Parallel Execution**: Enabled locally, disabled in CI
- **Retries**:
  - CI: 2 times
  - Local: 0 times
- **Trace Collection**: On first retry (for debugging)
- **Reporter**: HTML (view with `npx playwright show-report`)

**Special Features**:

- Automatically detects and uses system Chromium browser
- Falls back to Playwright's bundled browser if system browser unavailable
- Works in restricted network environments
- Prevents accidental `test.only` in CI (`forbidOnly: true`)

## CI/CD Integration

Tests run automatically in GitHub Actions on every push / PR to the `main` branch.

**Workflow**: `.github/workflows/ci.yml` ("CI - Build and Test")

**CI Pipeline Steps**:

1. ✅ Checkout repository
2. ✅ Setup Node.js 24.x
3. ✅ Install dependencies (`npm ci`)
4. ✅ Format check and lint
5. ✅ Run Jest unit/component/a11y tests (jest-axe, jsdom)
6. ✅ Build the production site (root path, `NEXT_PUBLIC_BASE_PATH=''`)
7. ✅ Internal link check
8. ✅ Install Playwright browsers with system deps
9. ✅ Run Playwright E2E suite

On green, the production deploy (`.github/workflows/deploy-cpanel.yml`) mirrors `out/` into `~/public_html` on InterServer cPanel (the live apex docroot for `freeforcharity.org`), excluding the WHMCS hub at `~/public_html/hub`. GitHub Pages is now a manual staging/preview surface only (`deploy-gh-pages-staging.yml`) at the `/FFC-IN-freeforcharity.org` subpath, where `basePath` + `assetPath()` apply. The old GitHub Pages production workflows (`deploy.yml` / `nextjs.yml`) have been removed.

After deploy, `npm run smoke-test` (`scripts/smoke-test.mjs`, also run on a schedule via `scheduled-prod-smoke.yml`) verifies the live apex, the WHMCS `/hub`, and key redirects.

**Test Failure Handling**:

- If any test fails, CI is marked as failed
- The production deploy is blocked until CI is green
- Test artifacts and traces are uploaded for debugging

## Writing New Tests

### Basic Test Structure

To add new tests:

1. **Create a new test file** in this directory:

   ```bash
   touch tests/my-feature.spec.ts
   ```

2. **Import Playwright utilities**:

   ```typescript
   import { test, expect } from '@playwright/test'
   ```

3. **Write test cases**:

   ```typescript
   test.describe('My Feature', () => {
     test('should do something', async ({ page }) => {
       await page.goto('/')

       // Your test code here
       const element = page.locator('selector')
       await expect(element).toBeVisible()
     })
   })
   ```

4. **Run your tests**:
   ```bash
   npm test
   ```

### Best Practices

- **Use descriptive test names**: Clearly state what is being tested
- **Group related tests**: Use `test.describe()` blocks
- **Use specific selectors**: Prefer data-testid, role, or aria-label attributes
- **Wait for elements**: Always use Playwright's auto-waiting or explicit waits
- **Test user behavior**: Focus on what users see and do, not implementation details
- **Keep tests independent**: Each test should run in isolation
- **Handle multiple scenarios**: Test both success and failure cases

### Useful Playwright Commands

```typescript
// Navigation
await page.goto('/path')
await page.goBack()
await page.reload()

// Finding elements
const element = page.locator('css-selector')
const byRole = page.getByRole('button', { name: 'Submit' })
const byText = page.getByText('Hello World')

// Assertions
await expect(element).toBeVisible()
await expect(element).toHaveText('Expected Text')
await expect(element).toHaveAttribute('href', '/link')
await expect(page).toHaveURL('/expected-path')

// Interactions
await element.click()
await element.fill('text input')
await element.selectOption('value')

// Network monitoring
page.on('response', (response) => {
  console.log(response.url(), response.status())
})
```

## Test Debugging

### Local Debugging

```bash
# Run tests in headed mode to see browser
npm run test:headed

# Run in debug mode with Playwright Inspector
npx playwright test --debug

# Run with trace collection
npx playwright test --trace on

# View trace file
npx playwright show-trace trace.zip
```

### CI Debugging

When tests fail in CI:

1. Check the GitHub Actions workflow run logs
2. Download test artifacts (screenshots, traces)
3. View HTML report: `npx playwright show-report`
4. Compare local vs CI results

### Common Issues

**Issue**: Test times out waiting for element  
**Solution**: Check selector specificity or increase timeout

**Issue**: Element not visible  
**Solution**: Add explicit waits or check for dynamic loading

**Issue**: Tests pass locally but fail in CI  
**Solution**: Check for timing issues, race conditions, or environment differences

## Recommended Test Additions

### High Priority

1. **Navigation Tests**
   - Verify all navigation links work
   - Test mobile hamburger menu
   - Validate smooth scrolling to sections

2. **Form Tests**
   - Test donation popup form
   - Test volunteer popup form
   - Validate form validation

3. **Responsive Tests**
   - Test mobile viewport (375px)
   - Test tablet viewport (768px)
   - Test desktop viewport (1920px)

4. **Accessibility Tests**
   - Add @axe-core/playwright for WCAG checks
   - Test keyboard navigation
   - Verify screen reader compatibility

### Medium Priority

5. **Content Tests**
   - Verify all team members display
   - Verify all testimonials display
   - Verify all FAQs display

6. **SEO Tests**
   - Test meta tags presence
   - Validate Open Graph tags
   - Check robots.txt and sitemap.xml

7. **Performance Tests**
   - Lighthouse CI integration
   - Core Web Vitals monitoring
   - Bundle size tracking

### Lower Priority

8. **Visual Regression Tests**
   - Screenshot comparison testing
   - Detect unintended UI changes

9. **Cross-Browser Tests**
   - Firefox compatibility
   - WebKit/Safari compatibility

## Resources

- **Playwright Documentation**: https://playwright.dev/docs/intro
- **Best Practices**: https://playwright.dev/docs/best-practices
- **API Reference**: https://playwright.dev/docs/api/class-test
- **Debugging Guide**: https://playwright.dev/docs/debug
- **CI Guide**: https://playwright.dev/docs/ci

---

**Test Suite Status**: ✅ 124 passing, 1 skipped
**Last Updated**: February 2026
**Framework**: Playwright v1.60
