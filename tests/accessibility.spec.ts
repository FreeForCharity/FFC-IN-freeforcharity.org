import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Accessibility Tests (WCAG 2.1 AA)
 *
 * Runs axe-core against key pages of the static build.
 * Violations at the 'critical' and 'serious' levels cause test failures.
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

const pagesToAudit = [
  { route: '/', name: 'Homepage' },
  { route: '/about-us', name: 'About Us' },
  { route: '/donate', name: 'Donate' },
  { route: '/volunteer', name: 'Volunteer' },
  { route: '/domains', name: 'Domains' },
  { route: '/free-charity-web-hosting', name: 'Free Charity Web Hosting' },
  { route: '/help-for-charities', name: 'Help for Charities' },
  { route: '/contact-us', name: 'Contact Us' },
  { route: '/free-for-charity-endowment-fund', name: 'Endowment Fund' },
  { route: '/501c3', name: '501c3' },
  { route: '/pre501c3', name: 'Pre-501c3' },
  { route: '/blog', name: 'Blog' },
  { route: '/privacy-policy', name: 'Privacy Policy' },
  { route: '/terms-of-service', name: 'Terms of Service' },
  { route: '/guidestar-guide', name: 'GuideStar Guide' },
  { route: '/free-for-charitys-tools-for-success', name: 'Tools for Success' },
  { route: '/free-training-programs', name: 'Free Training Programs' },
  { route: '/consulting', name: 'Consulting' },
]

test.describe('Accessibility (WCAG 2.1 AA)', () => {
  for (const { route, name } of pagesToAudit) {
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

      // Separate critical/serious (must fix) from moderate/minor (should fix)
      const blocking = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
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
                `\n  [${v.impact}] ${v.id}: ${v.description}\n` +
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
