/**
 * The automated-browser guard.
 *
 * Analytics used to be invisible to crawlers by accident — nothing loaded
 * until someone clicked "Accept All", and automation never clicks.
 * Consent Mode removed that gate, and a single crawl of the ~58-page
 * sitemap then produced ~100 sessions against a site that sees ~950 a
 * month. It read as growth, not noise.
 *
 * The e2e suite deliberately opts back in (it exists to exercise tag
 * loading), so without these the guard would have no coverage at all.
 */

function loadFresh(): typeof import('@/lib/analytics-config') {
  let mod!: typeof import('@/lib/analytics-config')
  jest.isolateModules(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    mod = require('@/lib/analytics-config')
  })
  return mod
}

function setWebdriver(value: boolean | undefined) {
  Object.defineProperty(window.navigator, 'webdriver', {
    value,
    configurable: true,
    writable: true,
  })
}

describe('isAutomatedBrowser', () => {
  afterEach(() => {
    setWebdriver(undefined)
    delete (window as { __ffcAllowAutomatedAnalytics?: boolean }).__ffcAllowAutomatedAnalytics
  })

  it('is false for an ordinary browser', () => {
    setWebdriver(undefined)
    expect(loadFresh().isAutomatedBrowser()).toBe(false)
  })

  it('is true when navigator.webdriver is set (Playwright, Puppeteer, Lighthouse)', () => {
    setWebdriver(true)
    expect(loadFresh().isAutomatedBrowser()).toBe(true)
  })

  it('treats webdriver === false as a real browser', () => {
    setWebdriver(false)
    expect(loadFresh().isAutomatedBrowser()).toBe(false)
  })

  // The e2e suite relies on this escape hatch, so it is load-bearing:
  // if it stops working, tag-loading coverage silently disappears rather
  // than failing loudly.
  it('honours the __ffcAllowAutomatedAnalytics opt-in used by the e2e suite', () => {
    setWebdriver(true)
    ;(window as { __ffcAllowAutomatedAnalytics?: boolean }).__ffcAllowAutomatedAnalytics = true
    expect(loadFresh().isAutomatedBrowser()).toBe(false)
  })
})
