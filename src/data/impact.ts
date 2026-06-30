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

/** Look up a metric by key (throws at module load if the key is unknown). */
export function metric(key: string): Metric {
  const m = impact.metrics[key]
  if (!m) throw new Error(`impact: unknown metric "${key}"`)
  return m
}

export type ResultCard = { title: string; description: string }

// A metric's value, asserting it is actually present. Throws at module load so a
// malformed/incomplete data file fails the build instead of silently shipping a
// bogus card. Centralising the null/empty check here (rather than string-matching
// the formatted title) means formatters like `approxValue` can't smuggle a
// missing value through as "null"/"null+".
function requireValue(key: string): number | string {
  const v = metric(key).value
  if (v === null || v === undefined || v === '') {
    throw new Error(`impact: metric "${key}" has no value but is required for a result card`)
  }
  return v
}

// Format an "approximate" count like "200+", without doubling a "+" if the data
// already stores the value as the string "200+".
function approxValue(key: string): string {
  const s = String(requireValue(key))
  return s.endsWith('+') ? s : `${s}+`
}

// The headline cards rendered in the homepage "Results" section. Only
// high/medium-confidence metrics with a real value are shown here; the
// volunteer/pipeline metrics stay out until the automation backs them with a
// source (see the playbook). `title` is a string so `ResultCard` animates the
// numeric ones and renders the rest (e.g. "200+") as-is.
export const resultCards: ResultCard[] = [
  { title: String(requireValue('domainsManaged')), description: metric('domainsManaged').label },
  { title: String(requireValue('sitesBuilt')), description: metric('sitesBuilt').label },
  {
    title: approxValue('organizationsSupported'),
    description: metric('organizationsSupported').label,
  },
  { title: String(yearsServing), description: 'Years serving nonprofits' },
]
