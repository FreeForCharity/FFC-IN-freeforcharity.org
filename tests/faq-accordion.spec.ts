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

  test('renders closed answers in the HTML, hidden until opened', async ({ page }) => {
    await page.goto('/charity-faq/')
    const item = page.locator('main details').first()
    const answer = item.locator('summary + *')
    await expect(item).not.toHaveAttribute('open')
    const answerText = await answer.evaluate((el) => el.textContent?.trim() ?? '')
    expect(answerText.length).toBeGreaterThan(40)
    await expect(answer).toBeHidden()
    await item.locator('summary').click()
    await expect(answer).toBeVisible()
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

  test('hosting FAQ right column starts with its first item open and is exclusive', async ({
    page,
  }) => {
    await page.goto('/free-charity-web-hosting/')
    const right = page.locator('details[name="hosting-faq-right"]')
    expect(await right.count()).toBeGreaterThan(1)
    await expect(right.nth(0)).toHaveAttribute('open', '')
    await expect(right.nth(1)).not.toHaveAttribute('open')
    await right.nth(1).locator('summary').click()
    await expect(right.nth(0)).not.toHaveAttribute('open')
  })

  test('hosting FAQ bottom item is independent of the column groups', async ({ page }) => {
    await page.goto('/free-charity-web-hosting/')
    const all = page.locator('main details')
    const bottom = page.locator('main details:not([name])').last()
    await expect(bottom).not.toHaveAttribute('open')
    await bottom.locator('summary').click()
    await expect(bottom).toHaveAttribute('open', '')
    // The open column items stay open alongside it
    await expect(page.locator('details[name="hosting-faq-left"][open]')).toHaveCount(1)
    await expect(page.locator('details[name="hosting-faq-right"][open]')).toHaveCount(1)
    expect(await all.count()).toBeGreaterThan(2)
  })
})
