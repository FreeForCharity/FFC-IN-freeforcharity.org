import { test, expect } from '@playwright/test'

/**
 * Complete Footer Verification E2E Tests
 *
 * Verifies all three columns of the footer:
 * - Column 1: Endorsements (GuideStar seal, EIN)
 * - Column 2: Quick Links (8 nav links + 7 policy links)
 * - Column 3: Contact Us (email, phone, addresses, social icons)
 * - Bottom bar: Copyright with current year
 */

test.describe('Footer - Column 1: Endorsements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display Endorsements heading', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText('Endorsements')).toBeVisible()
  })

  test('should display GuideStar Platinum seal image', async ({ page }) => {
    const footer = page.locator('footer')
    const sealImg = footer.locator('img[alt*="GuideStar"]')
    await expect(sealImg).toBeVisible()
  })

  test('should display Direct GuideStar Profile Link button', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText('Direct GuideStar Profile Link')).toBeVisible()
  })

  test('should display EIN number', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText('46-2471893')).toBeVisible()
  })
})

test.describe('Footer - Column 2: Quick Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display Quick Links heading', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText('Quick Links')).toBeVisible()
  })

  test('should have 8 quick navigation links', async ({ page }) => {
    const footer = page.locator('footer')
    const expectedLinks = [
      { text: 'Home', href: '/' },
      { text: 'About Us', href: '/about-us/' },
      { text: 'Donate', href: '/donate/' },
      { text: 'Volunteer', href: '/volunteer/' },
      { text: 'Help For Charities', href: '/help-for-charities/' },
      { text: 'Pre-501c3 Onboarding', href: '/pre501c3/' },
      { text: '501c3 Onboarding', href: '/501c3/' },
      { text: 'Supported Charity Login', href: /hub/ },
    ]

    for (const { text, href } of expectedLinks) {
      const link = footer.getByRole('link', { name: text, exact: true })
      await expect(link).toBeVisible()
      if (typeof href === 'string') {
        await expect(link).toHaveAttribute('href', href)
      } else {
        await expect(link).toHaveAttribute('href', href)
      }
    }
  })

  test('should display Free For Charity Policy sub-heading', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText('Free For Charity Policy')).toBeVisible()
  })

  test('should have 7 policy links', async ({ page }) => {
    const footer = page.locator('footer')
    const policyLinks = [
      { text: 'Donation Policy', href: '/donation-policy/' },
      { text: 'Free For Charity Donation Policy', href: '/free-for-charity-donation-policy/' },
      { text: 'Free For Charity Privacy Policy', href: '/privacy-policy/' },
      { text: 'Free For Charity Cookie Policy', href: '/cookie-policy/' },
      { text: 'Free For Charity Terms of Service', href: '/terms-of-service/' },
      {
        text: 'Free For Charity Vulnerability Disclosure Policy',
        href: '/vulnerability-disclosure-policy/',
      },
      {
        text: 'Free For Charity Security Acknowledgement',
        href: '/security-acknowledgements/',
      },
    ]

    for (const { text, href } of policyLinks) {
      const link = footer.getByRole('link', { name: text, exact: true })
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('href', href)
    }
  })
})

test.describe('Footer - Column 3: Contact Us', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display Contact Us heading', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText('Contact Us', { exact: true })).toBeVisible()
  })

  test('should display email link', async ({ page }) => {
    const footer = page.locator('footer')
    const emailLink = footer.locator('a[href="mailto:clarkemoyer@freeforcharity.org"]')
    await expect(emailLink).toBeVisible()
    await expect(emailLink).toContainText('clarkemoyer@freeforcharity.org')
  })

  test('should display phone link', async ({ page }) => {
    const footer = page.locator('footer')
    const phoneLink = footer.locator('a[href="tel:+15202228104"]')
    await expect(phoneLink).toBeVisible()
    await expect(phoneLink).toContainText('(520) 222-8104')
  })

  test('should display Main Address', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText('Main Address')).toBeVisible()
    await expect(footer.getByText('4030 Wake Forrest Road')).toBeVisible()
    await expect(footer.getByText('Carolina 27609')).toBeVisible()
  })

  test('should display PA Office Address', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText('PA Office Address')).toBeVisible()
    await expect(footer.getByText('301 Science Park Road')).toBeVisible()
    await expect(footer.getByText('State College PA 16803')).toBeVisible()
  })

  test('should display 4 social media icons', async ({ page }) => {
    const footer = page.locator('footer')
    const socialLinks = footer.locator(
      'a[href*="facebook.com"], a[href*="x.com"], a[href*="linkedin.com/company"], a[href*="github.com"]'
    )
    await expect(socialLinks).toHaveCount(4)
  })
})

test.describe('Footer - Copyright', () => {
  test('should display copyright with current year and freeforcharity.org link', async ({
    page,
  }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const currentYear = new Date().getFullYear().toString()

    await expect(footer.getByText(new RegExp(`© ${currentYear}`))).toBeVisible()
    await expect(footer.locator('a[href="https://freeforcharity.org"]')).toBeVisible()
  })
})
