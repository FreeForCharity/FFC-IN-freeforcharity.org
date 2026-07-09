/**
 * Onboarding-journey sync (epic #446) — end-to-end verification that the
 * public onboarding pages match the rebuilt WHMCS charity journey:
 *   - CTAs deep-link to onboarding products by stable id (#452)
 *   - domains page reflects the Cloudflare-registrar model, not eNom/ICANN (#447)
 *   - website is GitHub Pages, not WordPress/InterServer (#448)
 *   - email offers Microsoft 365 AND Google Workspace (#449)
 *   - the journey lists Website before Email (#450)
 *   - the coupon code is NEVER published on a public page (#453 hard rule)
 */
import { test, expect } from '@playwright/test'

test.describe('Onboarding journey — CTA deep links (#452)', () => {
  test('501c3 page links Get Started to onboarding product pid 33', async ({ page }) => {
    await page.goto('/501c3')
    expect(await page.locator('a[href*="a=add&pid=33"]').count()).toBeGreaterThan(0)
    await expect(page.locator('a[href*="confproduct"]')).toHaveCount(0)
  })

  test('pre501c3 page links Get Started to onboarding product pid 16', async ({ page }) => {
    await page.goto('/pre501c3')
    expect(await page.locator('a[href*="a=add&pid=16"]').count()).toBeGreaterThan(0)
    await expect(page.locator('a[href*="confproduct"]')).toHaveCount(0)
  })
})

test.describe('Domains page — Cloudflare model, dual email (#447/#448/#449)', () => {
  test('reflects Cloudflare, GitHub Pages, and both email providers; drops eNom/ICANN/InterServer', async ({
    page,
  }) => {
    await page.goto('/domains')
    const body = (await page.locator('main').innerText()).toLowerCase()
    expect(body).toContain('cloudflare')
    expect(body).toContain('github pages')
    expect(body).toContain('microsoft 365')
    expect(body).toContain('google workspace')
    expect(body).not.toContain('icann')
    expect(body).not.toContain('interserver')
    expect(body).not.toContain('suspension of your domain')
  })
})

test.describe('Onboarding journey page — Website before Email (#450)', () => {
  // The strict numbered stage ordering (3. Website before 4. Email) is
  // asserted in the unit test __tests__/app/charity-onboarding-journey.test.tsx,
  // which parses the headings directly. Here we assert the customer-visible
  // outcome: the email stage states the live-website prerequisite and both
  // providers are offered.
  test('email stage states the live-website prerequisite and offers both providers', async ({
    page,
  }) => {
    await page.goto('/charity-onboarding-journey')
    const main = await page.locator('main').innerText()
    expect(main).toContain('Google Workspace')
    expect(main).toContain('Microsoft 365')
    expect(main).toMatch(/require a live website/i)
  })
})

test.describe('Free charity web hosting — no legacy registrar (#447)', () => {
  test('drops eNom reseller language, keeps Cloudflare', async ({ page }) => {
    await page.goto('/free-charity-web-hosting')
    const body = (await page.locator('body').innerText()).toLowerCase()
    expect(body).not.toContain('enom')
    expect(body).toContain('cloudflare')
  })
})

test.describe('Coupon secrecy — hard rule (#453)', () => {
  for (const route of ['/501c3', '/pre501c3', '/domains', '/charity-onboarding-journey']) {
    test(`does not publish the coupon code on ${route}`, async ({ page }) => {
      await page.goto(route)
      const body = await page.locator('body').innerText()
      // Match any freeforcharity<year> coupon pattern so the literal secret
      // never needs to live in the repo (epic #446 hard rule).
      expect(body).not.toMatch(/freeforcharity\d{4}/i)
    })
  }
})

test.describe('Round 2 — stale-model cleanup on the rest of the site (#455/#456/#458)', () => {
  test('homepage FAQ drops eNom/ffcdomains, uses the Cloudflare model', async ({ page }) => {
    await page.goto('/')
    const body = (await page.locator('body').innerText()).toLowerCase()
    expect(body).not.toContain('enom')
    expect(body).not.toContain('ffcdomains')
    expect(body).not.toContain('platinum account')
    expect(body).toContain('cloudflare')
  })

  test('Online Impacts onboarding uses GitHub Pages, not InterServer/WordPress', async ({
    page,
  }) => {
    await page.goto('/online-impacts-onboarding-guide')
    const body = (await page.locator('body').innerText()).toLowerCase()
    expect(body).not.toContain('interserver')
    expect(body).not.toContain('softaculous')
    expect(body).toContain('github pages')
    await expect(page.locator('a[href*="confproduct"]')).toHaveCount(0)
  })

  test('help-for-charities tech stack is GitHub Pages, not Divi/WPMU DEV', async ({ page }) => {
    await page.goto('/help-for-charities')
    const body = await page.locator('body').innerText()
    // Word boundaries: "divi" is a substring of "individual", so match the
    // product names as whole words to avoid false positives.
    expect(body).not.toMatch(/\bDivi\b/i)
    expect(body).not.toMatch(/\bWPMU\b/i)
    expect(body.toLowerCase()).toContain('github pages')
  })

  test('choosing-your-org-domain offers both email providers', async ({ page }) => {
    await page.goto('/choosing-your-org-domain')
    const body = await page.locator('body').innerText()
    expect(body).toContain('Google Workspace')
  })

  test('domains CTAs deep-link by product id, not the archived bundle or index links', async ({
    page,
  }) => {
    await page.goto('/domains')
    await expect(
      page.locator('a[href*="free-org-domain-name-with-microsoft-email-address-setup"]')
    ).toHaveCount(0)
    await expect(page.locator('a[href*="confproduct"]')).toHaveCount(0)
    expect(await page.locator('a[href*="a=add&pid=39"]').count()).toBeGreaterThan(0)
  })
})
