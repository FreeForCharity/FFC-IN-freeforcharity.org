import { test, expect } from '@playwright/test'

// FAQ accordions are native <details>/<summary> (Modern Web Guidance:
// ui-components/accordion). These checks cover what the browser now does for
// us: mouse and keyboard toggling, answers kept in the page for
// find-in-page, and exclusive groups that open one item at a time.

test.describe('FAQ accordion', () => {
  test('opens and closes from a click and from the keyboard', async ({ page }) => {
    await page.goto('/charity-faq/')
    const item = page.locator('main details').first()
    const summary = item.locator('summary')
    await expect(item).not.toHaveAttribute('open')

    await summary.click()
    await expect(item).toHaveAttribute('open', '')
    await expect(item.locator('summary + *')).toBeVisible()

    await summary.click()
    await expect(item).not.toHaveAttribute('open')

    await summary.focus()
    await page.keyboard.press('Enter')
    await expect(item).toHaveAttribute('open', '')
  })

  test('keeps closed answers in the page for find-in-page', async ({ page }) => {
    await page.goto('/charity-faq/')
    const item = page.locator('main details').first()
    await expect(item).not.toHaveAttribute('open')
    const text = await item.evaluate((el) => el.textContent ?? '')
    expect(text.length).toBeGreaterThan(40)
  })

  test('hosting FAQ columns open one item at a time, first item open', async ({ page }) => {
    await page.goto('/free-charity-web-hosting/')
    const left = page.locator('details[name="hosting-faq-left"]')
    await expect(left).toHaveCount(2)
    await expect(left.nth(0)).toHaveAttribute('open', '')
    await expect(left.nth(1)).not.toHaveAttribute('open')

    await left.nth(1).locator('summary').click()
    await expect(left.nth(1)).toHaveAttribute('open', '')
    // Exclusive group: the browser closes the other item
    await expect(left.nth(0)).not.toHaveAttribute('open')
  })
})
