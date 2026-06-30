import { defineConfig, devices } from '@playwright/test'
import { execSync } from 'child_process'

// Prefer a system Chromium when present (local dev / sandbox); fall back to
// Playwright's bundled browser (installed via `npx playwright install chromium`
// in the zeffy-link-check workflow). Mirrors playwright.config.ts.
function findChromiumExecutable(): string | undefined {
  for (const name of ['chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable']) {
    try {
      const path = execSync(`which ${name}`, {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'ignore'],
      }).trim()
      if (path) return path
    } catch {
      // try next
    }
  }
  return undefined
}

/**
 * Dedicated config for the LIVE Zeffy link check (`tests/zeffy-links.spec.ts`).
 *
 * Unlike the main config there is NO webServer: the spec navigates directly to
 * zeffy.com (not the local static build), so it needs real-browser egress to
 * Zeffy. Run it only where that exists — the `zeffy-link-check` GitHub workflow,
 * or locally:
 *   ZEFFY_LIVE=1 npx playwright install chromium
 *   ZEFFY_LIVE=1 npx playwright test --config playwright.zeffy-links.config.ts
 */
export default defineConfig({
  testDir: './tests',
  testMatch: 'zeffy-links.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  reporter: process.env.CI ? 'list' : 'html',
  use: {
    ...devices['Desktop Chrome'],
    launchOptions: {
      executablePath: findChromiumExecutable(),
    },
    trace: 'on-first-retry',
  },
})
