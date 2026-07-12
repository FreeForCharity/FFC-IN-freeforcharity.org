import { test, expect } from '@playwright/test'

/**
 * Live contract test for the intake-funnel beacon endpoint
 * (`public/api/funnel-beacon.php`, deployed to the production cPanel host —
 * see docs/funnel-beacon.md and epic FreeForCharity/FFC-Cloudflare-Automation#676).
 *
 * The beacon's contract with the WHMCS storefront theme:
 *   1. A valid hit  (`?s=view&p=<pid>`) returns HTTP 204 with no body.
 *   2. Invalid params (`?s=bogus`, `?p=abc`) STILL return HTTP 204 — the
 *      storefront must never care about beacon errors.
 *   3. No `Set-Cookie` header, ever — the consent-free guarantee (nothing
 *      user-identifying is stored, so no consent banner is needed).
 *
 * Like tests/zeffy-links.spec.ts this hits the LIVE endpoint rather than the
 * local static build, so it only runs when `FUNNEL_LIVE=1` in an environment
 * with egress to freeforcharity.org:
 *   FUNNEL_LIVE=1 npx playwright test tests/funnel-beacon.spec.ts
 *
 * NOTE: the valid-hit test uses pid 999 — an intentionally unused product id —
 * so real funnel counters (pids 16/33/39/40/41/42/43) are never polluted.
 */
const LIVE = process.env.FUNNEL_LIVE === '1'
const t = LIVE ? test : test.skip
const BEACON = 'https://freeforcharity.org/api/funnel-beacon.php'

test.describe('funnel beacon live contract', () => {
  test.describe.configure({ timeout: 30_000 })

  t('valid view beacon (test pid 999) returns 204', async ({ request }) => {
    const res = await request.get(`${BEACON}?s=view&p=999`)
    expect(res.status(), 'valid beacon hit must return 204').toBe(204)
    expect((await res.body()).length, '204 must carry no body').toBe(0)
  })

  t('invalid step (?s=bogus) still returns 204 — the beacon never errors', async ({ request }) => {
    const res = await request.get(`${BEACON}?s=bogus&p=999`)
    expect(res.status(), 'invalid step must not surface an error').toBe(204)
  })

  t('invalid pid (?p=abc) still returns 204 — the beacon never errors', async ({ request }) => {
    const res = await request.get(`${BEACON}?s=view&p=abc`)
    expect(res.status(), 'invalid pid must not surface an error').toBe(204)
  })

  t('missing params still return 204 — the beacon never errors', async ({ request }) => {
    const res = await request.get(BEACON)
    expect(res.status(), 'missing params must not surface an error').toBe(204)
  })

  t('never sets a cookie (consent-free guarantee)', async ({ request }) => {
    // `p=999` keeps even the `complete` sanity counter on the unused test pid.
    for (const qs of ['?s=view&p=999', '?s=complete&p=999', '?s=bogus&p=abc']) {
      const res = await request.get(`${BEACON}${qs}`)
      const cookies = res
        .headersArray()
        .filter((h) => h.name.toLowerCase() === 'set-cookie')
        .map((h) => h.value)
      expect(cookies, `${qs} must not set any cookie`).toEqual([])
    }
  })
})
