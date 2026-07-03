import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import BarChart from '@/components/impact/BarChart'
import whmcsMembers from '@/data/whmcs-members.json'
import { textMetrics, metric, textSupportHoursByYear } from '@/data/impact'

export const metadata = pageMetadata({
  title: '2025 Annual Report',
  description:
    "Free For Charity's 2025 annual report: 248 nonprofits served, 106 new members, 41 active volunteers — every figure derived from dated records and published to Candid.",
  canonical: '/annual-report-2025/',
})

// The report is generated entirely from the canonical data files, so next
// year's edition is a re-parameterization, not a rewrite (issue #388).
const YEAR = '2025'

interface ServedYear {
  servedNonprofits: number
  newMembers: number
  cumulativeMembers: number
  domainsUnderManagement: number
}

const served = (
  whmcsMembers as unknown as {
    served: { years: Record<string, ServedYear>; ytdYear: string }
    candid: { profileUrl: string; publishedAt: string }
  }
).served
const candid = (whmcsMembers as unknown as { candid: { profileUrl: string; publishedAt: string } })
  .candid

const y = served.years[YEAR]
const prior = served.years[String(Number(YEAR) - 1)]
const census = textMetrics.years[YEAR]
const servedSeries = Object.keys(served.years)
  .sort()
  .filter((yr) => yr <= YEAR)
  .slice(-6)
  .map((yr) => ({ label: yr, value: served.years[yr].servedNonprofits }))

const h2 =
  'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-10 mb-4 print:text-[22px] print:leading-[28px] print:mt-5 print:mb-2'

export default function AnnualReport2025() {
  const cost = Number(metric('costPerCharityUsdPerYear').value)
  const hours = textSupportHoursByYear[YEAR]

  return (
    <div className="ffc-container py-16 print:py-4">
      <div className="max-w-4xl mx-auto">
        <p className="font-[var(--font-lato)] text-[14px] uppercase tracking-wider text-[#767672] mb-2">
          Free For Charity · EIN 46-2471893
        </p>
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-4 print:text-[30px] print:leading-[36px]">
          2025 Annual Report
        </h1>
        <p className="font-[var(--font-lato)] text-[18px] leading-[28px] text-[#555]">
          Our busiest year yet — and the first reported entirely from dated records rather than
          estimates (
          <Link href="/how-we-count/" className="text-[#0567B1] underline">
            how we count
          </Link>
          ). The same figures are published on our{' '}
          <a
            href={candid.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0567B1] underline"
          >
            Candid profile
          </a>{' '}
          (Platinum Transparency).
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 print:grid-cols-4">
          {[
            { value: y.servedNonprofits, label: 'Nonprofits served' },
            { value: y.newMembers, label: 'New members onboarded' },
            { value: census?.activeContacts?.volunteer ?? 0, label: 'Active volunteers' },
            { value: y.domainsUnderManagement, label: 'Domains under management' },
          ].map((s) => (
            <div key={s.label} className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="font-[var(--font-faustina)] text-[36px] leading-[42px] text-[#0567B1]">
                {s.value}
              </div>
              <div className="font-[var(--font-lato)] text-[14px] text-[#555] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className={h2}>The year in one chart</h2>
        <BarChart
          title="Nonprofits served per year (span evidence)"
          unit="nonprofits served"
          data={servedSeries}
          source={`Source: dated WHMCS records — published to Candid ${candid.publishedAt}.`}
        />
        <p className="font-[var(--font-lato)] text-[17px] leading-[27px] text-[#555]">
          {y.servedNonprofits} nonprofits had a charity service or managed domain in force during{' '}
          {YEAR} — up {y.servedNonprofits - prior.servedNonprofits} (
          {Math.round(
            ((y.servedNonprofits - prior.servedNonprofits) / prior.servedNonprofits) * 100
          )}
          %) from {prior.servedNonprofits} in {Number(YEAR) - 1}. {y.newMembers} organizations
          joined the program, our largest intake ever.
        </p>

        <h2 className={h2}>Hands-on support</h2>
        <p className="font-[var(--font-lato)] text-[17px] leading-[27px] text-[#555]">
          Our volunteers handled{' '}
          <strong>{census?.charityThreads} charity support conversations</strong> in {YEAR} (every
          thread individually classified — no sampling), engaging{' '}
          {census?.activeContacts?.charityOrgs} distinct partner organizations. Text-channel support
          alone represents a floor of {hours} volunteer hours; {census?.activeContacts?.volunteer}{' '}
          volunteers were active during the year.
        </p>

        <h2 className={h2}>The economics</h2>
        <p className="font-[var(--font-lato)] text-[17px] leading-[27px] text-[#555]">
          A charity&rsquo;s full digital presence — domain, DNS, hosting, email — costs the program
          about <strong>${cost} per year</strong> (commercially: $300–1,500). Volunteer labor and
          engineered-to-be-free infrastructure do the rest. Details:{' '}
          <Link href="/cost-transparency/" className="text-[#0567B1] underline">
            cost transparency
          </Link>
          .
        </p>

        <h2 className={h2}>What 2026 is about</h2>
        <ul className="list-disc list-inside font-[var(--font-lato)] text-[17px] leading-[27px] text-[#555] space-y-1">
          <li>
            Self-service at scale: the guides hub, eligibility checker, and charity FAQ launched
            mid-2026 to answer before charities need to ask.
          </li>
          <li>
            Fully automated, auditable metrics: monthly pipeline refreshes replacing every manual
            read.
          </li>
          <li>
            Growing the volunteer engine — more webmasters and M365 admins means more charities
            served.
          </li>
          <li>
            The endowment: toward permanent funding of every supported charity&rsquo;s digital
            presence.
          </li>
        </ul>

        <p className="font-[var(--font-lato)] text-[15px] leading-[24px] text-[#767672] mt-10 print:mt-6">
          Published July 2026. Every metric derives from the versioned data files that also power{' '}
          <Link href="/impact/" className="underline">
            the live impact dashboard
          </Link>
          ; corrections and methodology are documented publicly. This page is print-formatted — use
          your browser&rsquo;s print dialog for a PDF copy.
        </p>
      </div>
    </div>
  )
}
