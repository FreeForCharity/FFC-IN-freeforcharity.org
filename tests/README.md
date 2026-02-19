# Test Suite

This directory contains automated end-to-end tests for the Free For Charity web application using Playwright.

## Test Statistics

- **Total Tests**: 29 tests across 6 test suites
- **Status**: ✅ 28 passing, ⏭️ 1 skipped
- **Execution Time**: ~25-30 seconds
- **Framework**: Playwright v1.56.0

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

Tests the Results 2023 section with animated statistics.

**Test Suite**: `Results 2023 Animated Numbers`

**Tests:**

1. **`should display the Results-2023 section with all four statistics`**
   - Verifies all four statistics cards display
   - Checks for: Organizational partners, Total volunteers, Organizations accessing technical assistance offerings, and Volunteer hours contributed to the organization

2. **`should start with numbers at 0 before scrolling into view`**
   - Ensures numbers are not pre-animated
   - Verifies all statistics display 0 before scrolling into view

3. **`should animate numbers only once when scrolled into view`**
   - Verifies animation triggers on scroll and does not repeat
   - Confirms numbers animate from 0 to target values only once per page load

4. **`should display correct descriptions for each statistic`**
   - Ensures each statistic card has the correct label/description
   - Validates descriptions match expected text for each statistic

5. **`should respect prefers-reduced-motion preference`**
   - Accessibility for users with motion sensitivity
   - Animation disabled when prefers-reduced-motion is set

### `mission-video.spec.ts` - Video Functionality (2 tests)

Tests the video element in the mission section.

**Test Suite**: `Mission Video`

**Tests:**

1. **`should display video in mission section`**
   - Verifies video element exists
   - Checks video visibility on page

2. **`should have video source configured correctly`**
   - Validates video source configuration
   - Ensures video src attribute is set correctly

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

# Run only GitHub Pages tests
npx playwright test github-pages.spec.ts

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

Tests are automatically run in GitHub Actions on every push to the main branch.

**Workflow**: `.github/workflows/nextjs.yml`

**CI Pipeline Steps**:

1. ✅ Checkout repository
2. ✅ Setup Node.js 20
3. ✅ Install dependencies (`npm ci`)
4. ✅ Install Playwright browsers with system deps
5. ✅ Build Next.js with GitHub Pages basePath
6. ✅ Run test suite
7. ✅ Upload test artifacts on failure
8. ✅ Deploy only if tests pass

**Test Failure Handling**:

- If any test fails, the build is marked as failed
- Deployment to GitHub Pages is blocked
- Test artifacts and traces are uploaded for debugging
- Team is notified of failure

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

**Test Suite Status**: ✅ 5 passing, 1 skipped  
**Last Updated**: October 2025  
**Framework**: Playwright v1.56.0
