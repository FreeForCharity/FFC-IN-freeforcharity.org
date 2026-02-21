import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { siteRoutes } from './routes'

/**
 * Accessibility Tests (WCAG 2.1 AA)
 *
 * Runs axe-core against every page in the shared route list.
 * Violations at the 'critical' and 'serious' levels cause test failures.
 * Violations with no impact level are also treated as blocking (err on
 * the side of caution when axe cannot determine severity).
 * 'moderate' and 'minor' violations are reported but do not fail.
 *
 * Known limitations:
 * - color-contrast is currently disabled pending a brand color design review.
 *   The FFC orange (#f57c20, #f27022) and teal (#7EBEC5) brand colors fail
 *   WCAG 2.1 AA contrast requirements on several pages.
 *   Tracked in: https://github.com/FreeForCharity/FFC-IN-freeforcharity.org/issues/80
 *
 * - Third-party donation iframes (OnlineFundraising, Network for Good) are
 *   excluded — their internal DOM is outside our control.
 */

test.describe('Accessibility (WCAG 2.1 AA)', () => {
  for (const { route, name } of siteRoutes) {
    test(`${name} (${route}) has no critical or serious violations`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' })

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        // color-contrast requires brand design review — tracked in issue #80
        .disableRules(['color-contrast'])
        // Exclude all iframes — third-party donation widgets (OnlineFundraising,
        // Network for Good) contain components we cannot control
        .exclude('iframe')
        .analyze()

      // Treat critical, serious, and unknown-impact violations as blocking.
      // Unknown impact (null/undefined) is included because axe could not
      // determine severity — we err on the side of caution.
      const blocking = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious' || !v.impact
      )
      const advisory = results.violations.filter(
        (v) => v.impact === 'moderate' || v.impact === 'minor'
      )

      if (advisory.length > 0) {
        console.warn(
          `\n[a11y advisory] ${name}: ${advisory.length} moderate/minor violation(s):\n` +
            advisory
              .map(
                (v) =>
                  `  - [${v.impact}] ${v.id}: ${v.description}\n` +
                  v.nodes
                    .slice(0, 2)
                    .map((n) => `      ${n.target}`)
                    .join('\n')
              )
              .join('\n')
        )
      }

      expect(
        blocking,
        `Critical/serious a11y violations on ${name} (${route}):\n` +
          blocking
            .map(
              (v) =>
                `\n  [${v.impact ?? 'unknown'}] ${v.id}: ${v.description}\n` +
                `  Help: ${v.helpUrl}\n` +
                v.nodes
                  .slice(0, 3)
                  .map((n) => `    - ${n.target}: ${n.failureSummary}`)
                  .join('\n')
            )
            .join('\n')
      ).toHaveLength(0)
    })
  }
})
