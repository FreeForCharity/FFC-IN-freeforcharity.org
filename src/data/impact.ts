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

// The headline cards rendered in the homepage "Results" section. Only
// high/medium-confidence metrics with a real value are shown here; the
// volunteer/pipeline metrics stay out until the automation backs them with a
// source (see the playbook). `title` is a string so `ResultCard` animates the
// numeric ones and renders the rest (e.g. "200+") as-is.
export const resultCards: ResultCard[] = [
  { title: String(metric('domainsManaged').value), description: metric('domainsManaged').label },
  { title: String(metric('sitesBuilt').value), description: metric('sitesBuilt').label },
  {
    title: `${metric('organizationsSupported').value}+`,
    description: metric('organizationsSupported').label,
  },
  { title: String(yearsServing), description: 'Years serving nonprofits' },
]

// Asserted at module load so a malformed data file fails the build instead of
// silently shipping an empty or partial Results section.
if (resultCards.some((c) => !c.title || c.title === 'null' || c.title === 'undefined')) {
  throw new Error('impact: every result card must have a concrete value (check impact.json)')
}
