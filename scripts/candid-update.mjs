#!/usr/bin/env node
// Generates docs/candid-update.md — the paste sheet for the annual Candid
// (GuideStar) Platinum profile update (METRICS-PLAYBOOK §13: Candid has no
// public write API, the profile is a manual web form, so the "30 minutes a
// year" is: run this, open the sheet, paste).
//
// Reads the same single-source-of-truth data files the site reads
// (src/data/impact.json, text-metrics.json, volunteer-hours-model.json,
// whmcs-members.json) and emits only metrics that pass the publication gate:
// a concrete value AND high/medium confidence AND (for per-year series)
// status "classified".
// Everything else is listed under "Not yet Candid-attributable" with the
// reason — values are never fabricated.
//
// Output is deterministic (versioned by the data files' own stamps, no
// wall-clock), so the committed sheet can be diffed in CI:
//
//   node scripts/candid-update.mjs           # (re)generate docs/candid-update.md
//   node scripts/candid-update.mjs --check   # exit 1 if the committed sheet is stale

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const readJson = (rel) => JSON.parse(readFileSync(join(root, rel), 'utf8'))

const impact = readJson('src/data/impact.json')
const textMetrics = readJson('src/data/text-metrics.json')
const vhModel = readJson('src/data/volunteer-hours-model.json')
const whmcsMembers = readJson('src/data/whmcs-members.json')

const OUT_PATH = join(root, 'docs', 'candid-update.md')
const CARD_CONFIDENCE = ['high', 'medium'] // same gate as impact.ts cardValue()

// FFC's Candid profile identity — verified live via the Candid MCP
// (search_organizations). Update sealStatus/sealVerifiedAt on each re-check.
const CANDID_PROFILE = {
  url: 'https://app.candid.org/profile/9326392/',
  nonprofitId: '9326392',
  ein: '46-2471893',
  sealStatus: '2024 Platinum',
  sealVerifiedAt: '2026-07-01',
}

// --- Derivations (mirror src/data/impact.ts; drift is caught by the jest
// cross-check in __tests__/scripts/candid-update.test.ts) -------------------

const classifiedYears = Object.entries(textMetrics.years)
  .filter(([, y]) => y.status === 'classified')
  .map(([yr]) => yr)
  .sort()

function textSupportHours(year) {
  const y = textMetrics.years[year]
  const model = vhModel.textSupport
  let minutes = 0
  // Same null/typeof guards as impact.ts, so a missing category coefficient or
  // a partially-null year skews toward undercounting instead of throwing/NaN.
  if (y.charityThreadsByCategory) {
    for (const [cat, n] of Object.entries(y.charityThreadsByCategory)) {
      const per = model.minutesPerCharityTextByCategory[cat]
      if (typeof n === 'number' && typeof per === 'number') minutes += n * per
    }
  }
  if (y.byParty && typeof y.byParty.volunteer === 'number') {
    minutes += y.byParty.volunteer * model.minutesPerVolunteerCoordinationText
  }
  return Math.round(minutes / 60)
}

// --- Metric definitions ------------------------------------------------------
// Per-year series for the Platinum "Progress & results" metrics (Candid takes
// one value per fiscal/calendar year per metric).

const seriesMetrics = [
  {
    name: 'Nonprofit support interactions handled (text channel)',
    value: (yr) => textMetrics.years[yr].charityThreads,
    definition:
      'Text-message conversation threads with nonprofit organizations (new inquiries + ' +
      'existing partners) handled by Free For Charity volunteers, per calendar year.',
    methodology:
      'Full census of the FFC Google Voice line: every thread individually classified by ' +
      'party; charity-org threads = newCharity + existingCharity. See text-metrics.json.',
  },
  {
    name: 'New nonprofit organizations reaching out (text channel)',
    value: (yr) => textMetrics.years[yr].netNewReachouts.newCharity,
    definition:
      'Distinct nonprofit organizations making first contact with Free For Charity by text ' +
      'message, per calendar year.',
    methodology:
      'Distinct first-contact senders, deduplicated across all classified years by first ' +
      'appearance (an organization first seen in an earlier year is not recounted).',
  },
  {
    name: 'New volunteers engaged (text channel)',
    value: (yr) => textMetrics.years[yr].netNewReachouts.volunteer,
    definition:
      'Distinct volunteers making first contact with Free For Charity by text message, per ' +
      'calendar year.',
    methodology: 'Same distinct first-contact enumeration as the nonprofit series.',
  },
  {
    name: 'Active volunteers engaged (text channel)',
    value: (yr) => textMetrics.years[yr].activeContacts.volunteer,
    definition:
      'Distinct volunteers with at least one FFC coordination thread during the calendar ' +
      'year (active that year, regardless of when first engaged).',
    methodology:
      'Distinct contacts per year from the full Google Voice census, merged across phone ' +
      'numbers; excludes contractors and non-FFC traffic.',
  },
  {
    name: 'Active nonprofit organizations engaged (text channel)',
    value: (yr) => textMetrics.years[yr].activeContacts.charityOrgs,
    definition:
      'Distinct nonprofit organizations with at least one charity-service thread during ' +
      'the calendar year (an organization active in multiple years counts in each).',
    methodology:
      'Distinct organizations per year from the full Google Voice census; multiple contacts ' +
      'from one organization are merged and counted once.',
  },
  {
    name: 'Volunteer hours contributed — text-based nonprofit support',
    value: (yr) => textSupportHours(yr),
    definition:
      'Volunteer hours spent supporting nonprofits over the text channel, per calendar year.',
    methodology:
      `Modeled from the full thread census x per-category minutes ` +
      `(volunteer-hours-model.json v${vhModel.version}, pending org ratification): each ` +
      'charity thread costed by product category, volunteer-coordination threads at ' +
      `${vhModel.textSupport.minutesPerVolunteerCoordinationText} min.`,
  },
]

// Reporting-year snapshot metrics from impact.json. `key` must exist in
// impact.metrics; the gate (value + confidence) decides paste vs pending.
const snapshotMetrics = [
  { key: 'organizationsSupported', candidName: 'Nonprofit organizations supported (total)' },
  { key: 'domainsManaged', candidName: 'Nonprofit domains managed' },
  { key: 'sitesBuilt', candidName: 'Nonprofit websites built (cumulative)' },
  { key: 'migratedStable', candidName: 'Legacy nonprofit sites migrated to stable hosting' },
  { key: 'costPerCharityUsdPerYear', candidName: 'Program cost per nonprofit per year (USD)' },
  { key: 'textMessagesHandled', candidName: 'Support text threads handled (3-year total)' },
]

// Known-pending items surfaced explicitly so the operator sees what is NOT in
// the paste sheet and why (metrics below the gate are added automatically).
const pending = [
  {
    name: 'Total modeled volunteer hours (per engagement)',
    reason:
      'volunteer-hours-model.json coefficients are proposed but pending org ratification; ' +
      'm365Email/onboarding lines also lack authoritative unit counts.',
  },
  {
    name: 'Uncaptured charity leads (discovery pipeline)',
    reason: 'confidence "low" — manual sample only, pending the automated M365 discovery run.',
  },
]

// --- Render ------------------------------------------------------------------

const lines = []
const push = (...xs) => lines.push(...xs)

push(
  '<!-- GENERATED FILE — do not edit by hand. -->',
  '<!-- Regenerate: node scripts/candid-update.mjs   Verify: node scripts/candid-update.mjs --check -->',
  '',
  '# Candid (GuideStar) Platinum update — paste sheet',
  '',
  `Generated from \`impact.json\` (generatedAt ${impact.generatedAt}, reporting year ` +
    `${impact.reportingYear}), \`text-metrics.json\` (v${textMetrics.version}), ` +
    `\`volunteer-hours-model.json\` (v${vhModel.version}) and \`whmcs-members.json\` ` +
    `(v${whmcsMembers.version}).`,
  '',
  'How to use: sign in to the Candid nonprofit profile for Free For Charity, open',
  '**Progress & results (Platinum)**, and enter each metric below with its per-year values.',
  'Definitions/methodology text is written to paste into each metric description. After',
  'submitting, update `verifiedAt` on the touched metrics in `impact.json`.',
  '',
  '## Profile & seal status',
  '',
  `- **Profile:** ${CANDID_PROFILE.url} (nonprofit_id ${CANDID_PROFILE.nonprofitId}, EIN ` +
    `${CANDID_PROFILE.ein})`,
  `- **Current seal:** ${CANDID_PROFILE.sealStatus} (verified ${CANDID_PROFILE.sealVerifiedAt} ` +
    'via the Candid MCP). Candid profiles **expire two years after the last published update**,',
  '  so a 2024 seal is at the expiration cliff — publish promptly.',
  '- **Renewal checklist (per Candid Help):** Bronze/Silver prerequisites (basics + program',
  '  info), Gold (2024-or-2025 financials — a Form 990/990-N upload suffices — plus leader',
  '  demographics), then Platinum: goals & strategies, board demographics, and **at least one',
  '  impact metric from 2025** — the per-year table below satisfies that requirement.',
  '',
  '## Per-year metrics (Progress & results)',
  '',
  `Classified calendar years: ${classifiedYears.join(', ')}. Candid takes one value per year.`,
  ''
)

// Values table
push(`| Metric | ${classifiedYears.join(' | ')} |`)
push(`| --- | ${classifiedYears.map(() => '---:').join(' | ')} |`)
for (const m of seriesMetrics) {
  push(`| ${m.name} | ${classifiedYears.map((yr) => m.value(yr)).join(' | ')} |`)
}
push('')

// Definition/methodology blocks (paste text)
for (const m of seriesMetrics) {
  push(
    `### ${m.name}`,
    '',
    `- **Definition:** ${m.definition}`,
    `- **Methodology:** ${m.methodology}`,
    ''
  )
}

// --- WHMCS membership series -------------------------------------------------
const whmcsYears = Object.keys(whmcsMembers.years).sort()
push(
  '## WHMCS membership series (nonprofit member accounts)',
  '',
  `Source: ${whmcsMembers.source} (v${whmcsMembers.version}; total clients ` +
    `${whmcsMembers.totalClients}).`,
  '',
  '**Use `activeCumulativeByYearEnd` to continue the profile\'s "active members" series.**',
  'IMPORTANT methodology note to paste with it: WHMCS stores only current client status',
  '(no history), so historical point-in-time active counts cannot be reproduced. The',
  "profile's 2021 (76) and 2022 (104) values look like point-in-time WHMCS active",
  "snapshots taken at the time (2022's 104 vs today's floor of 94 implies ~10 then-active",
  "members have since closed); 2023's 221 cannot be WHMCS members (only 183 accounts of",
  'any status existed by end-2023). From 2024 the series counts member accounts signed up',
  'by year-end and Active today — a reproducible, conservative floor.',
  '',
  '| Year | New members | Cumulative by year-end | Active cumulative (floor) |',
  '| --- | ---: | ---: | ---: |'
)
for (const yr of whmcsYears) {
  const m = whmcsMembers.years[yr]
  const label = yr === whmcsMembers.ytdYear ? `${yr} (YTD)` : yr
  push(`| ${label} | ${m.newClients} | ${m.cumulativeByYearEnd} | ${m.activeCumulativeByYearEnd} |`)
}
push('')

push('## Reporting-year snapshot metrics', '')
push('| Candid metric | Value | Year | Source (paste as methodology) |')
push('| --- | ---: | --- | --- |')

const belowGate = []
for (const { key, candidName } of snapshotMetrics) {
  const m = impact.metrics[key]
  if (!m) throw new Error(`candid-update: unknown impact metric "${key}"`)
  if (m.value === null || m.value === undefined || !CARD_CONFIDENCE.includes(m.confidence)) {
    belowGate.push({
      name: `${candidName} (\`${key}\`)`,
      reason: `value=${m.value}, confidence "${m.confidence}" — below the high/medium gate`,
    })
    continue
  }
  const src = String(m.source).replaceAll('|', '\\|')
  push(`| ${candidName} | ${m.value} | ${impact.reportingYear} | ${src} |`)
}
push('')

push('## Not yet Candid-attributable (do NOT paste)', '')
for (const p of [...pending, ...belowGate]) {
  push(`- **${p.name}** — ${p.reason}`)
}
push('')

const output = lines.join('\n')

// --- Write / check -----------------------------------------------------------

if (process.argv.includes('--check')) {
  let committed = ''
  try {
    committed = readFileSync(OUT_PATH, 'utf8')
  } catch {
    /* missing counts as stale */
  }
  if (committed !== output) {
    console.error(
      'docs/candid-update.md is stale — regenerate with: node scripts/candid-update.mjs'
    )
    process.exit(1)
  }
  console.log('docs/candid-update.md is up to date.')
} else {
  writeFileSync(OUT_PATH, output)
  console.log(`Wrote ${OUT_PATH}`)
}
