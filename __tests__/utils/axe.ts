import { configureAxe } from 'jest-axe'

/**
 * Shared axe runner for component-level (fragment) accessibility tests.
 *
 * Components are rendered in isolation, outside the page <main>/landmark
 * structure that src/app/layout.tsx provides. A few axe rules only make
 * sense for a complete document and produce false positives against an
 * isolated fragment:
 *   - region / landmark-one-main: a fragment has no page landmarks.
 *   - page-has-heading-one: a section legitimately starts at <h2>.
 *   - heading-order: a section's first heading need not be <h1> in context.
 *
 * Everything else (alt text, form labels, ARIA validity, empty headings,
 * duplicate ids, color where computable, etc.) stays enabled, so real
 * accessibility regressions still fail the test. Full-page a11y is also
 * covered against the built site in tests/accessibility.spec.ts (Playwright).
 */
export const axe = configureAxe({
  rules: {
    region: { enabled: false },
    'landmark-one-main': { enabled: false },
    'page-has-heading-one': { enabled: false },
    'heading-order': { enabled: false },
  },
})
