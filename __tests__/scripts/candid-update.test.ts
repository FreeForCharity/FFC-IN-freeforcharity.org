import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { textSupportHoursByYear, textMetrics } from '../../src/data/impact'

const root = join(__dirname, '..', '..')

describe('candid-update paste sheet', () => {
  it('committed docs/candid-update.md is current (regenerate with node scripts/candid-update.mjs)', () => {
    // --check exits non-zero when the committed sheet no longer matches the
    // data files, so a data change without a regenerated sheet fails CI here.
    execSync('node scripts/candid-update.mjs --check', { cwd: root, stdio: 'pipe' })
  })

  it('sheet hour figures match the impact.ts derivation (no mjs/ts drift)', () => {
    const sheet = readFileSync(join(root, 'docs', 'candid-update.md'), 'utf8')
    const years = Object.entries(textMetrics.years)
      .filter(([, y]) => y.status === 'classified')
      .map(([yr]) => yr)
      .sort()
    const row = sheet
      .split('\n')
      .find((l) => l.startsWith('| Volunteer hours contributed — text-based nonprofit support'))
    expect(row).toBeDefined()
    const values = row!
      .split('|')
      .map((c) => c.trim())
      .filter((c) => /^\d+$/.test(c))
      .map(Number)
    expect(values).toEqual(years.map((yr) => textSupportHoursByYear[yr]))
  })
})
