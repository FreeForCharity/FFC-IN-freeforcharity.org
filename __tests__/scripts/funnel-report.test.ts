import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

/**
 * Offline contract for scripts/funnel-report.mjs (--file mode): the operator
 * report script must render the beacon counts JSON written by
 * public/api/funnel-beacon.php as a per-pid markdown funnel table, and must
 * handle the not-yet-created / empty cases gracefully.
 *
 * The FTPS helpers that can be tested without a server (PASV host fix-up,
 * TLS data-session selection, ignored-pid handling) are exercised by
 * importing the module in a child node process — same spawn pattern as the
 * --file tests, and it keeps the ESM script out of the jest/ts transform.
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

/** Evaluates `expr` in a child node process with the script imported as `m`. */
function evalWithModule(expr: string): unknown {
  const href = pathToFileURL(script).href
  const out = execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `const m = await import(${JSON.stringify(href)}); process.stdout.write(JSON.stringify(${expr}))`,
    ],
    { encoding: 'utf8' }
  )
  return JSON.parse(out)
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

  it('excludes the synthetic contract-test pid 999 from the funnel table', () => {
    const out = runWithCounts({
      '2026-07-10': { '40': { view: 10, complete: 2 }, '999': { view: 7, complete: 4 } },
    })
    // Real traffic stays in the table…
    expect(out).toContain('| 40 | Website | 10 | 2 |')
    // …but pid 999 must not appear as a funnel row (it would pollute totals
    // and filter-rate math).
    expect(out).not.toMatch(/^\| 999 \|/m)
    // It is reported on a separate synthetic/test-traffic line instead.
    expect(out).toMatch(/synthetic\/test traffic \(excluded from the funnel above\)/i)
    expect(out).toContain('pid 999')
    expect(out).toContain('7 view(s), 4 complete(s)')
  })

  it('exports pid 999 in the IGNORED_PIDS list', () => {
    expect(evalWithModule('m.IGNORED_PIDS')).toContain('999')
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

describe('funnel-report FTPS helpers (offline)', () => {
  it('choosePasvHost falls back to the control host when PASV advertises a private address', () => {
    // NAT misconfiguration: server advertises its internal RFC1918 address.
    expect(evalWithModule("m.choosePasvHost('192.168.1.20', '203.0.113.7')")).toBe('203.0.113.7')
    expect(evalWithModule("m.choosePasvHost('10.0.0.5', '203.0.113.7')")).toBe('203.0.113.7')
    expect(evalWithModule("m.choosePasvHost('172.31.0.9', '203.0.113.7')")).toBe('203.0.113.7')
    expect(evalWithModule("m.choosePasvHost('127.0.0.1', '203.0.113.7')")).toBe('203.0.113.7')
  })

  it('choosePasvHost keeps a public PASV address', () => {
    expect(evalWithModule("m.choosePasvHost('198.51.100.4', '203.0.113.7')")).toBe('198.51.100.4')
    // 172.32.x.x is outside 172.16/12 — public, keep it.
    expect(evalWithModule("m.choosePasvHost('172.32.0.9', '203.0.113.7')")).toBe('172.32.0.9')
  })

  it('choosePasvHost keeps the address when it equals the control host (LAN servers)', () => {
    expect(evalWithModule("m.choosePasvHost('192.168.1.20', '192.168.1.20')")).toBe('192.168.1.20')
  })

  it('isPrivateIPv4 classifies RFC1918/loopback/link-local ranges', () => {
    expect(evalWithModule("m.isPrivateIPv4('10.1.2.3')")).toBe(true)
    expect(evalWithModule("m.isPrivateIPv4('172.16.0.1')")).toBe(true)
    expect(evalWithModule("m.isPrivateIPv4('169.254.9.9')")).toBe(true)
    expect(evalWithModule("m.isPrivateIPv4('8.8.8.8')")).toBe(false)
    expect(evalWithModule("m.isPrivateIPv4('172.15.0.1')")).toBe(false)
  })

  it('selectDataSession prefers the latest TLS 1.3 session ticket over getSession()', () => {
    // Tickets captured from the control socket's 'session' event win —
    // getSession() is not resumable on TLS 1.3.
    expect(evalWithModule("m.selectDataSession(['ticket1', 'ticket2'], 'stub')")).toBe('ticket2')
  })

  it('selectDataSession falls back to the control session (TLS 1.2) when no tickets arrived', () => {
    expect(evalWithModule("m.selectDataSession([], 'tls12-session')")).toBe('tls12-session')
    expect(evalWithModule("m.selectDataSession([], null) ?? 'undefined'")).toBe('undefined')
  })
})
