#!/usr/bin/env node
/**
 * Intake-funnel report (operator-run, local).
 *
 * Fetches `ffc_funnel_counts.json` — the daily counters written by
 * public/api/funnel-beacon.php — from the production host over FTPS and
 * renders a markdown funnel table (per product id: views, completes).
 *
 * The counts file lives OUTSIDE the web root, in the FTP home directory
 * itself (a sibling of `public_html`), so the path relative to the FTP home
 * is simply `ffc_funnel_counts.json`.
 *
 * Usage (credentials come from the environment — never hardcode them):
 *   FTP_HOST=... FTP_USER=... FTP_PASS=... node scripts/funnel-report.mjs
 *
 * Environment variables:
 *   FTP_HOST  FTPS server hostname (required)
 *   FTP_USER  FTPS username        (required)
 *   FTP_PASS  FTPS password        (required)
 *   FTP_PORT  control port         (optional, default 21 — explicit AUTH TLS)
 *
 * Offline mode (render a previously downloaded counts file, no FTP):
 *   node scripts/funnel-report.mjs --file /path/to/ffc_funnel_counts.json
 *
 * Node stdlib only — no dependencies. See docs/funnel-beacon.md.
 */

import net from 'node:net'
import tls from 'node:tls'
import { readFileSync } from 'node:fs'
import process from 'node:process'
import { pathToFileURL } from 'node:url'

const COUNTS_PATH = 'ffc_funnel_counts.json' // relative to the FTP home

// Product-id labels from docs/funnel-beacon.md (WHMCS order forms).
const PID_LABELS = {
  16: 'Pre-501c3 onboarding',
  33: '501c3 onboarding',
  40: 'Website',
  39: 'Domain register',
  41: 'Domain transfer',
  42: 'Email',
  43: 'Email',
  999: 'Contract-test pid (ignore)',
  all: '(no pid — legacy/complete)',
}

/* ------------------------------------------------------------------ */
/* Minimal explicit-FTPS (AUTH TLS) client — control + one RETR.       */
/* ------------------------------------------------------------------ */

/** Reads complete FTP replies (handles multi-line replies). */
function makeReplyReader(socket) {
  let buffer = ''
  const pending = []
  const waiters = []
  const onData = (chunk) => {
    buffer += chunk.toString('latin1')
    // A reply is complete at its first "NNN " (3 digits + space) final line;
    // any lines before it (e.g. "230-...") belong to the same reply.
    let match
    while ((match = buffer.match(/^[\s\S]*?^(\d{3}) [^\r\n]*\r?\n/m))) {
      buffer = buffer.slice(match[0].length)
      const reply = { code: Number(match[1]), text: match[0].trimEnd() }
      const waiter = waiters.shift()
      if (waiter) waiter.resolve(reply)
      else pending.push(reply)
    }
  }
  socket.on('data', onData)
  return {
    next() {
      if (pending.length > 0) return Promise.resolve(pending.shift())
      return new Promise((resolve, reject) => {
        waiters.push({ resolve, reject })
        socket.once('error', reject)
      })
    },
    detach() {
      socket.removeListener('data', onData)
    },
  }
}

async function expectReply(reader, okCodes, context) {
  const reply = await reader.next()
  if (!okCodes.includes(reply.code)) {
    const err = new Error(`FTPS ${context}: unexpected reply ${reply.text}`)
    err.ftpCode = reply.code
    throw err
  }
  return reply
}

function connectPlain(host, port) {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host, port }, () => resolve(socket))
    socket.once('error', reject)
    socket.setTimeout(30_000, () => {
      socket.destroy(new Error('FTPS control connection timed out'))
    })
  })
}

function upgradeToTls(socket, host, session) {
  return new Promise((resolve, reject) => {
    const secure = tls.connect(
      { socket, servername: host, session, rejectUnauthorized: true },
      () => resolve(secure)
    )
    secure.once('error', reject)
  })
}

/** Parses "227 Entering Passive Mode (h1,h2,h3,h4,p1,p2)." */
function parsePasv(text) {
  const m = text.match(/\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)/)
  if (!m) throw new Error(`FTPS: cannot parse PASV reply: ${text}`)
  return { host: `${m[1]}.${m[2]}.${m[3]}.${m[4]}`, port: Number(m[5]) * 256 + Number(m[6]) }
}

/** Parses "229 Extended Passive Mode (|||port|)" */
function parseEpsv(text) {
  const m = text.match(/\(\|\|\|(\d+)\|\)/)
  if (!m) throw new Error(`FTPS: cannot parse EPSV reply: ${text}`)
  return Number(m[1])
}

/**
 * Downloads `filePath` over explicit FTPS. Returns the file contents as a
 * string, or null if the server says the file does not exist (550).
 */
async function ftpsDownload({ host, port, user, pass }, filePath) {
  const raw = await connectPlain(host, port)
  let reader = makeReplyReader(raw)
  await expectReply(reader, [220], 'greeting')

  raw.write('AUTH TLS\r\n')
  await expectReply(reader, [234], 'AUTH TLS')
  reader.detach()

  const control = await upgradeToTls(raw, host)
  reader = makeReplyReader(control)

  control.write(`USER ${user}\r\n`)
  await expectReply(reader, [331, 230], 'USER')
  control.write(`PASS ${pass}\r\n`)
  await expectReply(reader, [230], 'PASS (check FTP_USER/FTP_PASS)')

  control.write('PBSZ 0\r\n')
  await expectReply(reader, [200], 'PBSZ')
  control.write('PROT P\r\n')
  await expectReply(reader, [200], 'PROT P')
  control.write('TYPE I\r\n')
  await expectReply(reader, [200], 'TYPE I')

  // Prefer EPSV (NAT-safe); fall back to PASV.
  let dataHost = host
  let dataPort
  control.write('EPSV\r\n')
  const epsv = await reader.next()
  if (epsv.code === 229) {
    dataPort = parseEpsv(epsv.text)
  } else {
    control.write('PASV\r\n')
    const pasv = await expectReply(reader, [227], 'PASV')
    const parsed = parsePasv(pasv.text)
    dataHost = parsed.host
    dataPort = parsed.port
  }

  const dataRaw = await connectPlain(dataHost, dataPort)
  control.write(`RETR ${filePath}\r\n`)
  const retr = await reader.next()
  if (retr.code === 550) {
    dataRaw.destroy()
    control.write('QUIT\r\n')
    control.end()
    return null // file not yet created — no beacon hits recorded yet
  }
  if (![125, 150].includes(retr.code)) {
    dataRaw.destroy()
    throw new Error(`FTPS RETR: unexpected reply ${retr.text}`)
  }

  // Data connection is TLS too (PROT P); most servers require reusing the
  // control connection's TLS session.
  const data = await upgradeToTls(dataRaw, host, control.getSession())
  const chunks = []
  await new Promise((resolve, reject) => {
    data.on('data', (c) => chunks.push(c))
    data.on('end', resolve)
    data.on('error', reject)
  })
  await expectReply(reader, [226, 250], 'transfer complete')
  control.write('QUIT\r\n')
  control.end()
  return Buffer.concat(chunks).toString('utf8')
}

/* ------------------------------------------------------------------ */
/* Markdown rendering                                                  */
/* ------------------------------------------------------------------ */

/**
 * counts shape (from funnel-beacon.php): { "YYYY-MM-DD": { "<pid>": { "view": n, "complete": n } } }
 * Renders a per-pid totals table plus a per-day breakdown.
 */
export function renderMarkdown(counts) {
  const perPid = new Map()
  const dates = Object.keys(counts).sort()
  for (const date of dates) {
    for (const [pid, steps] of Object.entries(counts[date])) {
      const agg = perPid.get(pid) ?? { view: 0, complete: 0 }
      agg.view += Number(steps.view ?? 0)
      agg.complete += Number(steps.complete ?? 0)
      perPid.set(pid, agg)
    }
  }

  const lines = []
  lines.push('# Intake-funnel report')
  lines.push('')
  if (dates.length === 0) {
    lines.push('_No beacon counts recorded yet._')
    return lines.join('\n')
  }
  lines.push(
    `Data from **${dates[0]}** to **${dates[dates.length - 1]}** (${dates.length} day(s)).`
  )
  lines.push('')
  lines.push('| PID | Product | Views | Completes |')
  lines.push('| --- | ------- | ----: | --------: |')
  const pids = [...perPid.keys()].sort((a, b) => {
    const na = Number(a)
    const nb = Number(b)
    if (Number.isNaN(na)) return 1
    if (Number.isNaN(nb)) return -1
    return na - nb
  })
  for (const pid of pids) {
    const { view, complete } = perPid.get(pid)
    lines.push(`| ${pid} | ${PID_LABELS[pid] ?? '—'} | ${view} | ${complete} |`)
  }
  lines.push('')
  lines.push('> **Caveat:** WHMCS order reports are authoritative for submissions — the')
  lines.push("> beacon's `complete` count is a same-day sanity check, not the source of")
  lines.push('> truth. Client-side beacons undercount (ad blockers, JS off) — treat')
  lines.push('> trends, not absolutes. Filter rate ≈ WHMCS orders ÷ beacon views.')
  return lines.join('\n')
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

async function main() {
  const fileFlag = process.argv.indexOf('--file')
  let raw
  if (fileFlag !== -1) {
    const path = process.argv[fileFlag + 1]
    if (!path) {
      console.error('Usage: node scripts/funnel-report.mjs --file <counts.json>')
      process.exit(2)
    }
    raw = readFileSync(path, 'utf8')
  } else {
    const { FTP_HOST, FTP_USER, FTP_PASS, FTP_PORT } = process.env
    if (!FTP_HOST || !FTP_USER || !FTP_PASS) {
      console.error(
        'Missing credentials. Set FTP_HOST, FTP_USER and FTP_PASS in the environment\n' +
          '(FTP_PORT optional, default 21), or use --file <counts.json> for offline mode.\n' +
          'Never hardcode credentials — see docs/funnel-beacon.md.'
      )
      process.exit(2)
    }
    raw = await ftpsDownload(
      { host: FTP_HOST, port: Number(FTP_PORT ?? 21), user: FTP_USER, pass: FTP_PASS },
      COUNTS_PATH
    )
    if (raw === null) {
      console.log(
        `\`${COUNTS_PATH}\` does not exist on the server yet — the beacon has not ` +
          'recorded any hits. Nothing to report.'
      )
      return
    }
  }

  let counts
  try {
    counts = JSON.parse(raw || '{}')
  } catch {
    console.error('Counts file is not valid JSON — is the beacon writing correctly?')
    process.exit(1)
  }
  console.log(renderMarkdown(counts))
}

// Only run when executed directly (allows importing renderMarkdown in tests).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main()
}
