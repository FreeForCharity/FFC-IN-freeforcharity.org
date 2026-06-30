// Free For Charity impact metrics — the single source of truth for the
// quantitative figures shown on the site.
//
// `impact.json` is intentionally a plain data file so it can be regenerated /
// overwritten by the metrics automation (see docs/METRICS-PLAYBOOK.md and
// FreeForCharity/FFC-Cloudflare-Automation#490) without touching code. This
// module gives that data a type and derives the small, display-ready shapes the
// components consume.
//
// Every metric carries provenance (`source`, `verifiedAt`, `confidence`) so a
// reviewer can see where a number came from and how trustworthy it is. Metrics
// whose value is `null` (confidence "unknown") are not yet wired to an
// authoritative source — components must not render them as precise figures.

import data from './impact.json'

export type MetricConfidence = 'high' | 'medium' | 'low' | 'unknown'

export type Metric = {
  value: number | string | null
  label: string
  source: string
  verifiedAt?: string
  confidence: MetricConfidence
}

export type ImpactData = {
  generatedAt: string
  reportingYear: number
  irsDesignationYear: number
  metrics: Record<string, Metric>
}

export const impact = data as ImpactData

export const reportingYear = impact.reportingYear

/** Whole years FFC has held its IRS 501(c)(3) designation, as of the reporting year. */
export const yearsServing = impact.reportingYear - impact.irsDesignationYear

/** Look up a metric by key (throws if the key is unknown). */
export function metric(key: string): Metric {
  const m = impact.metrics[key]
  if (!m) throw new Error(`impact: unknown metric "${key}"`)
  return m
}

export type ResultCard = { key: string; title: string; description: string }

/**
 * A metric's value, asserting it is actually present. Throws if the value is
 * null/empty — the result cards below call this at module load, so a
 * malformed/incomplete data file fails the build instead of silently rendering
 * an empty hole. Exported so prose components can require a value the same way.
 */
export function requireValue(key: string): number | string {
  const v = metric(key).value
  if (v === null || v === undefined || v === '') {
    throw new Error(`impact: metric "${key}" has no value but is required for display`)
  }
  return v
}

// Confidence levels permitted on a public-facing headline card.
const CARD_CONFIDENCE: MetricConfidence[] = ['high', 'medium']

// A metric's value for a headline card: must be present AND high/medium
// confidence. Throws otherwise, so the "only high/medium-confidence metrics are
// shown" rule is enforced at module load (adding a low/unknown metric to
// `resultCards` fails the build) rather than merely documented.
function cardValue(key: string): number | string {
  const c = metric(key).confidence
  if (!CARD_CONFIDENCE.includes(c)) {
    throw new Error(
      `impact: metric "${key}" is confidence "${c}"; headline cards must be high/medium`
    )
  }
  return requireValue(key)
}

// Format an "approximate" count like "200+", without doubling a "+" if the data
// already stores the value as the string "200+".
function approxValue(key: string): string {
  const s = String(cardValue(key))
  return s.endsWith('+') ? s : `${s}+`
}

// The headline cards rendered in the homepage "Results" section. Only
// high/medium-confidence metrics with a real value are shown — enforced by
// `cardValue`, so the volunteer/pipeline metrics (low/unknown) can't slip in
// until the automation backs them with a source (see the playbook). `title` is a
// string so `ResultCard` animates the numeric ones and renders the rest (e.g.
// "200+") as-is. `key` is a stable identity independent of the display copy.
export const resultCards: ResultCard[] = [
  {
    key: 'domainsManaged',
    title: String(cardValue('domainsManaged')),
    description: metric('domainsManaged').label,
  },
  {
    key: 'sitesBuilt',
    title: String(cardValue('sitesBuilt')),
    description: metric('sitesBuilt').label,
  },
  {
    key: 'organizationsSupported',
    title: approxValue('organizationsSupported'),
    description: metric('organizationsSupported').label,
  },
  { key: 'yearsServing', title: String(yearsServing), description: 'Years serving nonprofits' },
]
