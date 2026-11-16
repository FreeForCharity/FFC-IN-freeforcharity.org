import { test, expect, type Page } from '@playwright/test'

/** The testimonial headings, and which one is actually scrolled into view. */
function carousel(page: Page) {
  const region = page.getByRole('region', { name: 'Testimonials' })
  const slides = region.locator('[aria-roledescription="slide"]')
  return { region, slides }
}

/**
 * Slide `index` is the one scrolled into the carousel's view: its left edge
 * sits at the scroller's left edge, and it is marked active.
 */
async function expectShown(page: Page, index: number, timeout = 5000) {
  const slide = carousel(page).slides.nth(index)
  await expect
    .poll(
      () =>
        slide.evaluate((el) => {
          const scroller = el.parentElement as HTMLElement
          return Math.abs(scroller.scrollLeft - (el as HTMLElement).offsetLeft) < 2
        }),
      { timeout }
    )
    .toBe(true)
  await expect(slide).toHaveAttribute('data-active', 'true', { timeout })
}

for (const viewport of [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 412, height: 915 },
]) {
  test.describe(`testimonial navigation on ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } })

    test('arrows and dots scroll the matching testimonial into view', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' }) // no rotation, instant scroll
      await page.goto('/')
      const { region, slides } = carousel(page)
      // Scroll with the DOM API: this page re-renders during hydration, so
      // Playwright's scrollIntoViewIfNeeded can find the node detached.
      await region.evaluate((el) => el.scrollIntoView({ block: 'center' }))
      await expectShown(page, 0)

      const next = region.getByRole('button', { name: 'Next testimonial', exact: true })
      // Retry the first press until the page has hydrated.
      await expect(async () => {
        await next.click()
        await expectShown(page, 1, 1000)
      }).toPass({ timeout: 15_000 })

      await region.getByRole('button', { name: 'Previous testimonial', exact: true }).click()
      await expectShown(page, 0)

      const last = (await slides.count()) - 1
      await region.getByRole('button', { name: `Go to testimonial ${last + 1}` }).click()
      await expectShown(page, last)
      await expect(
        region.getByRole('button', { name: `Go to testimonial ${last + 1}` })
      ).toHaveAttribute('aria-current', 'true')
      // Next wraps around from the last testimonial, and keeps focus.
      await next.focus()
      await page.keyboard.press('Enter')
      await expectShown(page, 0)
      await expect(next).toBeFocused()
    })
  })
}

/**
 * Wait, in real time, until the row of slides has stopped on the slide the
 * carousel has marked active.
 *
 * The smooth scroll runs on real time, while the carousel's timers run on the
 * fake clock. While this waits, the fake clock only moves at real speed, as it
 * would for a visitor, instead of leaping ahead of the scroll, so the
 * carousel's 1.5 s "the scroll never arrived" timer does not fire mid-scroll
 * just because the test jumped the clock. Comparing against the active slide, not just
 * any resting position, keeps this from passing in the moment before a
 * scroll the carousel has just asked for gets going.
 */
async function waitForScrollToLand(page: Page) {
  const row = carousel(page).region.getByRole('group', { name: 'Testimonial slides' })
  let previous = Number.NaN
  await expect
    .poll(
      async () => {
        const { left, onActive } = await row.evaluate((el) => {
          const active = el.querySelector<HTMLElement>('[data-active="true"]')
          return {
            left: el.scrollLeft,
            onActive: !active || Math.abs(el.scrollLeft - active.offsetLeft) < 2,
          }
        })
        const landed = left === previous && onActive
        previous = left
        return landed
      },
      { timeout: 10_000, intervals: [50] }
    )
    .toBe(true)
}

/**
 * Advance the fake clock by `ms`, at most half a second at a time, letting any
 * smooth scroll land before jumping the clock again. Half a second is well
 * inside the 1.5 s settle timer, so no jump can carry the clock past it
 * mid-scroll.
 *
 * The fake clock also runs at real speed between jumps, so the target is a
 * fixed fake time read from the page, not a sum of jumps: otherwise the time
 * spent waiting for scrolls would add up across ticks, and on a slow runner a
 * tick would let the carousel rotate twice.
 */
async function tick(page: Page, ms: number) {
  const end = (await page.evaluate(() => Date.now())) + ms
  for (;;) {
    const left = end - (await page.evaluate(() => Date.now()))
    if (left <= 0) return
    await page.clock.runFor(Math.min(500, left))
    await waitForScrollToLand(page)
  }
}

/**
 * Advance the fake clock until the carousel rotates to slide 2. The first
 * rotation is also the sign the page has hydrated: before that, the timer
 * does not exist yet. The clock moves half a second at a time and stops as
 * soon as slide 2 is current, so a slow hydration can never carry it on past
 * slide 2 to slide 3.
 */
async function waitForFirstRotation(page: Page) {
  const dot2 = carousel(page).region.getByRole('button', { name: 'Go to testimonial 2' })
  // Hydration takes real time, not fake time, so a slow runner needs more
  // steps here; the test's own timeout is the real-time limit.
  for (let step = 0; (await dot2.getAttribute('aria-current')) !== 'true'; step++) {
    if (step > 120) throw new Error('The carousel never rotated to slide 2')
    await tick(page, 500)
  }
  await expectShown(page, 1)
}

test.describe('testimonial rotation', () => {
  test.use({ viewport: { width: 1280, height: 800 } })
  // Each test steps a fake clock through several rotations and smooth
  // scrolls. That takes about 5 s here, but on a busy CI runner it has run
  // past the default 30 s.
  test.describe.configure({ timeout: 90_000 })

  test.beforeEach(async ({ page }) => {
    await page.clock.install()
    await page.goto('/')
    await page.mouse.move(0, 0) // keep the pointer off the carousel
  })

  test('rotates on its own, and the pause button stops it', async ({ page }) => {
    const { region, slides } = carousel(page)
    await waitForFirstRotation(page)

    await region.getByRole('button', { name: 'Pause testimonials' }).click()
    await expect(region.getByRole('button', { name: 'Play testimonials' })).toBeVisible()
    await page.mouse.move(0, 0)
    await tick(page, 12_000)
    await expect(slides.nth(1)).toHaveAttribute('data-active', 'true')

    // Play resumes it, even though focus is still on the button.
    await region.getByRole('button', { name: 'Play testimonials' }).click()
    await page.mouse.move(0, 0)
    await tick(page, 5500)
    await expect(slides.nth(2)).toHaveAttribute('data-active', 'true')
  })

  test('Pause still pauses when the button takes focus before the click', async ({ page }) => {
    // Chrome on Android, and desktop browsers on mousedown, focus the button
    // first; focus moving into the carousel must not undo the press.
    const { region, slides } = carousel(page)
    await waitForFirstRotation(page)
    const pause = region.getByRole('button', { name: 'Pause testimonials' })
    await pause.focus()
    await expect(pause).toHaveAccessibleName('Pause testimonials')
    await pause.click()
    await expect(region.getByRole('button', { name: 'Play testimonials' })).toBeVisible()
    await page.mouse.move(0, 0)
    await tick(page, 12_000)
    await expect(slides.nth(1)).toHaveAttribute('data-active', 'true')
  })

  test('the pause button comes first in the carousel tab order', async ({ page }) => {
    const { region } = carousel(page)
    const first = region.locator('button, [tabindex="0"]').first()
    await expect(first).toHaveAccessibleName(/Pause testimonials|Play testimonials/)
  })

  test('after the last testimonial it rotates back to the first', async ({ page }) => {
    const { slides } = carousel(page)
    await waitForFirstRotation(page)
    const count = await slides.count()
    for (let i = 2; i <= count; i++) {
      await tick(page, 5500)
      await expect(slides.nth(i % count)).toHaveAttribute('data-active', 'true')
    }
    await expectShown(page, 0)
  })

  test('keyboard focus moving in stops rotation until Play is pressed', async ({ page }) => {
    const { region, slides } = carousel(page)
    await waitForFirstRotation(page)
    const scroller = region.getByRole('group', { name: 'Testimonial slides' })
    await scroller.focus()
    await expect(region.getByRole('button', { name: 'Play testimonials' })).toBeVisible()
    // Focus leaving does not restart it.
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur())
    await tick(page, 12_000)
    await expect(slides.nth(1)).toHaveAttribute('data-active', 'true')

    await region.getByRole('button', { name: 'Play testimonials' }).click()
    await page.mouse.move(0, 0)
    await tick(page, 5500)
    await expect(slides.nth(2)).toHaveAttribute('data-active', 'true')
  })

  test('the mouse over the carousel holds rotation, and leaving resumes it', async ({ page }) => {
    const { slides } = carousel(page)
    await waitForFirstRotation(page)
    await slides.nth(1).hover()
    await tick(page, 12_000)
    await expect(slides.nth(1)).toHaveAttribute('data-active', 'true')
    await page.mouse.move(0, 0)
    await tick(page, 5500)
    await expect(slides.nth(2)).toHaveAttribute('data-active', 'true')
  })

  test('automatic rotation is not announced', async ({ page }) => {
    const { region } = carousel(page)
    await waitForFirstRotation(page)
    await tick(page, 5500)
    await expect(region.locator('[aria-live="polite"]')).toHaveText('')
  })
})

test('reduced motion: no rotation and no pause button', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.clock.install()
  await page.goto('/')
  const { region, slides } = carousel(page)
  // The server render shows the button; it goes once the page has hydrated.
  await expect(region.getByRole('button', { name: /Pause testimonials/ })).toHaveCount(0)
  await tick(page, 12_000)
  await expect(slides.nth(0)).toHaveAttribute('data-active', 'true')
})

test('the target dot stays current for the whole of a smooth scroll', async ({ page }) => {
  // Real clock and no reduced motion, so the jump really animates.
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')
  const { region } = carousel(page)
  const dot4 = region.getByRole('button', { name: 'Go to testimonial 4' })
  // Wait for hydration: the pause button responds once it has happened.
  await expect(async () => {
    await region.getByRole('button', { name: /testimonials$/ }).click()
    await expect(region.getByRole('button', { name: 'Play testimonials' })).toBeVisible({
      timeout: 1000,
    })
  }).toPass({ timeout: 15_000 })

  const samples = await dot4.evaluate(async (button: HTMLButtonElement) => {
    const dots = [...document.querySelectorAll('[aria-label^="Go to testimonial"]')]
    const seen: number[] = []
    button.click()
    const start = performance.now()
    while (performance.now() - start < 1200) {
      await new Promise((resolve) => setTimeout(resolve, 30))
      seen.push(dots.findIndex((dot) => dot.getAttribute('aria-current') === 'true'))
    }
    return seen
  })
  expect(new Set(samples)).toEqual(new Set([3]))
  await expectShown(page, 3)
  await expect(region.locator('[aria-live="polite"]')).toHaveText('Testimonial 4 of 4')
})

test.describe('testimonials on a touch screen', () => {
  test.use({ hasTouch: true, viewport: { width: 412, height: 915 } })

  test('tapping the slides stops rotation', async ({ page }) => {
    await page.goto('/')
    const { region } = carousel(page)
    const slides = region.getByRole('group', { name: 'Testimonial slides' })
    await slides.evaluate((el) => el.scrollIntoView({ block: 'center' }))
    await expect(async () => {
      await slides.tap()
      await expect(region.getByRole('button', { name: 'Play testimonials' })).toBeVisible({
        timeout: 1000,
      })
    }).toPass({ timeout: 15_000 })
  })
})

test('an interrupted jump leaves the dots on the slide where it stopped', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')
  const { region } = carousel(page)
  await expect(async () => {
    await region.getByRole('button', { name: /testimonials$/ }).click()
    await expect(region.getByRole('button', { name: 'Play testimonials' })).toBeVisible({
      timeout: 1000,
    })
  }).toPass({ timeout: 15_000 })

  // Start a smooth jump to the last slide, then cut it short on slide 2,
  // as a swipe would.
  await region.getByRole('button', { name: 'Go to testimonial 4' }).evaluate(
    (button: HTMLButtonElement) =>
      new Promise<void>((resolve) => {
        button.click()
        setTimeout(() => {
          const row = document.querySelector('[aria-label="Testimonial slides"]') as HTMLElement
          row.scrollTo({ left: row.clientWidth, behavior: 'instant' })
          resolve()
        }, 80)
      })
  )
  await expectShown(page, 1)
  await expect(region.getByRole('button', { name: 'Go to testimonial 2' })).toHaveAttribute(
    'aria-current',
    'true'
  )
})
