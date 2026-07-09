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
    await expect(page.locator('a[href*="a=add&pid=33"]').first()).toHaveCount(1)
    await expect(page.locator('a[href*="confproduct"]')).toHaveCount(0)
  })

  test('pre501c3 page links Get Started to onboarding product pid 16', async ({ page }) => {
    await page.goto('/pre501c3')
    await expect(page.locator('a[href*="a=add&pid=16"]').first()).toHaveCount(1)
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
  test('website stage precedes email stage and both providers appear', async ({ page }) => {
    await page.goto('/charity-onboarding-journey')
    const body = await page.locator('body').innerText()
    expect(body).toContain('Google Workspace')
    // Stage headings are numbered; the Website stage must come before Email.
    const websiteIdx = body.indexOf('Website')
    const emailIdx = body.lastIndexOf('Email')
    expect(websiteIdx).toBeGreaterThan(-1)
    expect(emailIdx).toBeGreaterThan(-1)
    expect(websiteIdx).toBeLessThan(emailIdx)
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
      const body = (await page.locator('body').innerText()).toLowerCase()
      expect(body).not.toContain('freeforcharity2026')
    })
  }
})
