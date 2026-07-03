import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import BarChart from '@/components/impact/BarChart'
import whmcsMembers from '@/data/whmcs-members.json'
import { textMetrics, metric, reportingYear } from '@/data/impact'

export const metadata = pageMetadata({
  title: 'Our Impact — Evidence-Based Metrics',
  description:
    'Free For Charity impact, from dated records: nonprofits served per year, domains under management, support interactions, and volunteers — the same numbers published on our Candid profile.',
  canonical: '/impact/',
})

interface ServedYear {
  servedNonprofits: number
  newMembers: number
  cumulativeMembers: number
  domainsUnderManagement: number
  billingActive: number
}

const served = (
  whmcsMembers as unknown as {
    served: {
      years: Record<string, ServedYear>
      ytdYear: string
      nonprofitClientsAllTime: number
    }
    candid: { profileUrl: string; publishedAt: string }
  }
).served
const candid = (whmcsMembers as unknown as { candid: { profileUrl: string; publishedAt: string } })
  .candid

const servedYears = Object.keys(served.years).sort()
const completeYears = servedYears.filter((y) => y !== served.ytdYear)
const yearLabel = (y: string) => (y === served.ytdYear ? `${y}*` : y)

const servedSeries = servedYears.map((y) => ({
  label: yearLabel(y),
  value: served.years[y].servedNonprofits,
}))
const domainsSeries = servedYears.map((y) => ({
  label: yearLabel(y),
  value: served.years[y].domainsUnderManagement,
}))
const newMembersSeries = completeYears.slice(-6).map((y) => ({
  label: y,
  value: served.years[y].newMembers,
}))

const censusYears = Object.entries(textMetrics.years)
  .filter(([, y]) => y.status === 'classified')
  .map(([yr]) => yr)
  .sort()

const interactionsSeries = censusYears.map((y) => ({
  label: y,
  value: textMetrics.years[y].charityThreads ?? 0,
}))
const volunteersSeries = censusYears.map((y) => ({
  label: y,
  value: textMetrics.years[y].activeContacts?.volunteer ?? 0,
}))

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-10 mb-2'
const sectionNote = 'font-[var(--font-lato)] text-[16px] leading-[25px] text-[#555] mb-2'

export default function ImpactPage() {
  const latestYear = completeYears[completeYears.length - 1]
  const domains = metric('domainsManaged')

  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-4">
          Our Impact — From Dated Records, Not Estimates
        </h1>
        <p className="font-[var(--font-lato)] text-[18px] leading-[28px] text-[#555]">
          Every number on this page is derived programmatically from records that carry their own
          dates — service registrations, domain lifespans, and a full census of our support
          conversations. The same series is published on our Candid nonprofit profile. Read{' '}
          <Link href="/how-we-count/" className="text-[#0567B1] underline">
            how we count
          </Link>{' '}
          for definitions and honest caveats.
        </p>

        {/* Headline stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            {
              value: served.years[latestYear]?.servedNonprofits,
              label: `Nonprofits served in ${latestYear}`,
            },
            { value: served.nonprofitClientsAllTime, label: 'Nonprofit members all-time' },
            { value: domains.value, label: 'Domains under management' },
            {
              value: textMetrics.years[latestYear]?.charityThreads,
              label: `Support interactions in ${latestYear}`,
            },
          ].map((s) => (
            <div key={s.label} className="border border-gray-200 rounded-lg p-4 text-center">
              <div
                className="font-[var(--font-faustina)] text-[36px] leading-[42px] text-[#0567B1]"
                data-font="aria-font"
              >
                {String(s.value)}
              </div>
              <div className="font-[var(--font-lato)] text-[14px] text-[#555] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className={h2}>Nonprofits served per year</h2>
        <p className={sectionNote}>
          A nonprofit counts as served in a year when a charity service or registered domain was in
          force during that year. (*{served.ytdYear} is year-to-date.)
        </p>
        <BarChart
          title={`Nonprofits served, ${servedYears[0]}–${served.ytdYear}`}
          unit="nonprofits served"
          data={servedSeries}
          source={`Source: WHMCS span evidence — published to Candid ${candid.publishedAt}.`}
        />

        <h2 className={h2}>Domains under management</h2>
        <p className={sectionNote}>
          Each domain is a charity&rsquo;s web and email identity that we keep registered, secured,
          and renewed. The current-year figure includes organizations on legacy hosting we manage
          outside WHMCS.
        </p>
        <BarChart
          title={`Charity domains under management by year-end`}
          unit="domains"
          data={domainsSeries}
          source="Source: WHMCS domain registration spans + the FFC sites-list."
        />

        <h2 className={h2}>New nonprofit members</h2>
        <BarChart
          title={`New members by first charity service, last ${newMembersSeries.length} complete years`}
          unit="new members"
          data={newMembersSeries}
          source="Source: first charity-service registration dates in WHMCS."
        />

        <h2 className={h2}>Hands-on support, from a full census</h2>
        <p className={sectionNote}>
          We individually classified every conversation thread on our support line for{' '}
          {censusYears.join(', ')} — {Number(metric('textMessagesHandled').value)} charity and
          volunteer threads in total. No sampling, no extrapolation.
        </p>
        <BarChart
          title="Charity support interactions per year"
          unit="support threads"
          data={interactionsSeries}
          color="#F26721"
          source="Source: full census of the FFC support text line (aggregate counts only)."
        />
        <BarChart
          title="Active volunteers engaged per year"
          unit="active volunteers"
          data={volunteersSeries}
          color="#F26721"
          source="Source: distinct volunteers with at least one coordination thread in the year."
        />

        {/* Candid profile card (#390) */}
        <h2 className={h2}>Verified transparency</h2>
        <div className="border border-gray-200 rounded-lg p-6 mt-4 flex flex-col sm:flex-row items-center gap-6">
          <a
            aria-label="Free For Charity Candid profile"
            href={candid.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- external dynamic Candid badge; not a local optimizable asset */}
            <img
              src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/9326392/svg"
              alt="Candid Seal of Transparency"
              width={120}
              height={120}
            />
          </a>
          <div className="font-[var(--font-lato)] text-[16px] leading-[26px] text-[#555]">
            <p>
              These metrics are published on Free For Charity&rsquo;s Candid (GuideStar) nonprofit
              profile — EIN 46-2471893 — most recently on <strong>{candid.publishedAt}</strong>. The
              seal shown here is served live by Candid and always reflects our current transparency
              level.
            </p>
            <p className="mt-2">
              <a
                href={candid.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0567B1] underline"
              >
                View our Candid profile →
              </a>
            </p>
          </div>
        </div>

        <p className="font-[var(--font-lato)] text-[16px] leading-[26px] text-[#555] mt-8">
          Want the economics behind these numbers? See{' '}
          <Link href="/cost-transparency/" className="text-[#0567B1] underline">
            what ${String(metric('costPerCharityUsdPerYear').value)} per charity per year buys
          </Link>
          . Reporting year: {reportingYear}.
        </p>
      </div>
    </div>
  )
}
