import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

/**
 * Offline contract for scripts/funnel-report.mjs (--file mode): the operator
 * report script must render the beacon counts JSON written by
 * public/api/funnel-beacon.php as a per-pid markdown funnel table, and must
 * handle the not-yet-created / empty cases gracefully.
 */
const root = join(__dirname, '..', '..')
const script = join(root, 'scripts', 'funnel-report.mjs')

function runWithCounts(counts: unknown): string {
  const dir = mkdtempSync(join(tmpdir(), 'funnel-report-'))
  const file = join(dir, 'ffc_funnel_counts.json')
  writeFileSync(file, JSON.stringify(counts))
  try {
    return execFileSync(process.execPath, [script, '--file', file], { encoding: 'utf8' })
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

describe('funnel-report script (offline --file mode)', () => {
  it('renders a per-pid markdown table with views and completes', () => {
    const out = runWithCounts({
      '2026-07-10': { '40': { view: 12, complete: 2 }, '16': { view: 5 } },
      '2026-07-11': { '40': { view: 8, complete: 1 }, all: { complete: 3 } },
    })
    expect(out).toContain('| PID | Product | Views | Completes |')
    expect(out).toContain('| 40 | Website | 20 | 3 |')
    expect(out).toContain('| 16 | Pre-501c3 onboarding | 5 | 0 |')
    expect(out).toContain('**2026-07-10** to **2026-07-11**')
  })

  it('states the WHMCS-orders-are-authoritative caveat', () => {
    const out = runWithCounts({ '2026-07-10': { '40': { view: 1 } } })
    expect(out).toMatch(/WHMCS order reports are authoritative/i)
  })

  it('handles an empty counts file gracefully', () => {
    const out = runWithCounts({})
    expect(out).toMatch(/no beacon counts recorded yet/i)
  })

  it('exits with a clear message when credentials are missing (no --file)', () => {
    let failed = false
    try {
      execFileSync(process.execPath, [script], {
        encoding: 'utf8',
        env: { ...process.env, FTP_HOST: '', FTP_USER: '', FTP_PASS: '' },
      })
    } catch (error) {
      failed = true
      const e = error as { status: number; stderr: string }
      expect(e.status).toBe(2)
      expect(e.stderr).toMatch(/FTP_HOST, FTP_USER and FTP_PASS/)
      expect(e.stderr).toMatch(/Never hardcode credentials/i)
    }
    expect(failed).toBe(true)
  })
})
