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
 *   FTP_HOST         FTPS server hostname (required)
 *   FTP_USER         FTPS username        (required)
 *   FTP_PASS         FTPS password        (required)
 *   FTP_PORT         control port         (optional, default 21 — explicit AUTH TLS)
 *   FTP_VERIFY_CERT  set to 1 to enforce TLS certificate verification.
 *                    Default is OFF: the cPanel host presents a self-signed
 *                    certificate (the deploy workflow sets
 *                    `ssl:verify-certificate no` for the same host in
 *                    .github/workflows/deploy-cpanel.yml). The channel is
 *                    still encrypted either way.
 *
 * Offline mode (render a previously downloaded counts file, no FTP):
 *   node scripts/funnel-report.mjs --file /path/to/ffc_funnel_counts.json
 *
 * TLS notes (Pure-FTPd/cPanel):
 *   - The server requires the data connection to REUSE the control
 *     connection's TLS session. On TLS 1.3 `getSession()` does not return a
 *     resumable session (tickets arrive after the handshake via the
 *     'session' event), so we capture tickets from that event and hand the
 *     latest one to the data connection. If the data handshake still fails,
 *     we retry the whole download once forcing `maxVersion: 'TLSv1.2'` on
 *     BOTH connections, where synchronous session reuse works reliably.
 *   - If a PASV reply advertises a private/loopback address that differs
 *     from the control host (NAT misconfiguration), we connect to the
 *     control host instead — the same fix-up curl and lftp apply.
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

/**
 * Synthetic/test product ids excluded from the funnel totals (they would
 * pollute views/completes and any filter-rate math). They are still shown,
 * but only on a separate "synthetic/test traffic" line.
 */
export const IGNORED_PIDS = ['999']

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

function upgradeToTls(socket, host, { session, rejectUnauthorized = true, maxVersion } = {}) {
  return new Promise((resolve, reject) => {
    const secure = tls.connect(
      {
        socket,
        servername: host,
        session,
        rejectUnauthorized,
        ...(maxVersion ? { maxVersion } : {}),
      },
      () => resolve(secure)
    )
    secure.once('error', reject)
  })
}

/**
 * Picks the TLS session for the data connection. TLS 1.3 delivers resumable
 * session tickets AFTER the handshake via the socket's 'session' event —
 * `getSession()` there returns a non-resumable stub — so prefer the latest
 * captured ticket and fall back to `getSession()` (valid for TLS 1.2).
 */
export function selectDataSession(capturedSessions, controlSession) {
  if (capturedSessions.length > 0) return capturedSessions[capturedSessions.length - 1]
  return controlSession ?? undefined
}

/** RFC1918 / loopback / link-local IPv4. */
export function isPrivateIPv4(host) {
  return /^(10\.|127\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)\d/.test(host)
}

/**
 * PASV fix-up (matches curl/lftp behavior): if the 227 reply advertises a
 * private/loopback address different from the control host, the server is
 * behind NAT and advertising its internal address — connect to the control
 * host instead.
 */
export function choosePasvHost(pasvHost, controlHost) {
  if (pasvHost !== controlHost && isPrivateIPv4(pasvHost)) return controlHost
  return pasvHost
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
 * One download attempt over explicit FTPS. Returns the file contents as a
 * string, or null if the server says the file does not exist (550).
 * `maxVersion` (optional) caps the TLS version on BOTH connections.
 */
async function ftpsDownloadAttempt({ host, port, user, pass, verifyCert }, filePath, maxVersion) {
  const tlsOpts = { rejectUnauthorized: verifyCert, maxVersion }
  const raw = await connectPlain(host, port)
  let reader = makeReplyReader(raw)
  await expectReply(reader, [220], 'greeting')

  raw.write('AUTH TLS\r\n')
  await expectReply(reader, [234], 'AUTH TLS')
  reader.detach()

  const control = await upgradeToTls(raw, host, tlsOpts)
  // TLS 1.3 session tickets arrive after the handshake — capture them all
  // so the data connection can resume with the latest one (Pure-FTPd
  // requires data-connection session reuse under PROT P).
  const capturedSessions = []
  control.on('session', (session) => capturedSessions.push(session))
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
    dataHost = choosePasvHost(parsed.host, host)
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

  // Data connection is TLS too (PROT P); the server requires reusing the
  // control connection's TLS session — see selectDataSession().
  let data
  try {
    data = await upgradeToTls(dataRaw, host, {
      ...tlsOpts,
      session: selectDataSession(capturedSessions, control.getSession()),
    })
  } catch (err) {
    // Mark data-connection handshake failures so the caller can retry once
    // on TLS 1.2, where synchronous session reuse works.
    err.ftpsDataHandshake = true
    control.destroy()
    throw err
  }
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

/**
 * Downloads `filePath` over explicit FTPS, retrying once on TLS 1.2 if the
 * data-connection handshake fails (TLS 1.3 session-ticket reuse is not
 * guaranteed to satisfy Pure-FTPd's reuse requirement; on TLS 1.2 the
 * session from the control handshake resumes reliably).
 */
async function ftpsDownload(config, filePath) {
  try {
    return await ftpsDownloadAttempt(config, filePath, undefined)
  } catch (err) {
    if (!err?.ftpsDataHandshake) throw err
    console.error(
      `note: data-connection TLS handshake failed (${err.message}); ` +
        'retrying once with maxVersion TLSv1.2 on both connections ' +
        '(TLS 1.3 session reuse is not reliable for FTPS data connections).'
    )
    return await ftpsDownloadAttempt(config, filePath, 'TLSv1.2')
  }
}

/* ------------------------------------------------------------------ */
/* Markdown rendering                                                  */
/* ------------------------------------------------------------------ */

/**
 * counts shape (from funnel-beacon.php): { "YYYY-MM-DD": { "<pid>": { "view": n, "complete": n } } }
 * Renders a per-pid totals table plus a per-day breakdown. Pids in
 * IGNORED_PIDS (synthetic/contract-test traffic) are excluded from the
 * funnel table and totals, and reported on a separate line instead.
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
  const sortPids = (keys) =>
    keys.sort((a, b) => {
      const na = Number(a)
      const nb = Number(b)
      if (Number.isNaN(na)) return 1
      if (Number.isNaN(nb)) return -1
      return na - nb
    })
  const pids = sortPids([...perPid.keys()].filter((pid) => !IGNORED_PIDS.includes(pid)))
  const ignored = sortPids([...perPid.keys()].filter((pid) => IGNORED_PIDS.includes(pid)))
  for (const pid of pids) {
    const { view, complete } = perPid.get(pid)
    lines.push(`| ${pid} | ${PID_LABELS[pid] ?? '—'} | ${view} | ${complete} |`)
  }
  if (ignored.length > 0) {
    lines.push('')
    const parts = ignored.map((pid) => {
      const { view, complete } = perPid.get(pid)
      return `pid ${pid} (${PID_LABELS[pid] ?? '—'}) — ${view} view(s), ${complete} complete(s)`
    })
    lines.push(`_Synthetic/test traffic (excluded from the funnel above): ${parts.join('; ')}._`)
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
    const { FTP_HOST, FTP_USER, FTP_PASS, FTP_PORT, FTP_VERIFY_CERT } = process.env
    if (!FTP_HOST || !FTP_USER || !FTP_PASS) {
      console.error(
        'Missing credentials. Set FTP_HOST, FTP_USER and FTP_PASS in the environment\n' +
          '(FTP_PORT optional, default 21), or use --file <counts.json> for offline mode.\n' +
          'Never hardcode credentials — see docs/funnel-beacon.md.'
      )
      process.exit(2)
    }
    const verifyCert = FTP_VERIFY_CERT === '1'
    if (!verifyCert) {
      console.error(
        'note: channel encrypted; cert not verified — the cPanel host presents a ' +
          "self-signed certificate (matches deploy workflow behavior: deploy-cpanel.yml's " +
          '`ssl:verify-certificate no`). Set FTP_VERIFY_CERT=1 to enforce verification.'
      )
    }
    raw = await ftpsDownload(
      {
        host: FTP_HOST,
        port: Number(FTP_PORT ?? 21),
        user: FTP_USER,
        pass: FTP_PASS,
        verifyCert,
      },
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
