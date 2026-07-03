import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'

export const metadata = pageMetadata({
  title: 'How We Count What We Report',
  description:
    'The methodology behind every Free For Charity metric: span evidence from dated records, a full census of support conversations, and the corrections we made to our own history.',
  canonical: '/how-we-count/',
})

const h2 = 'font-[var(--font-faustina)] text-[32px] leading-[40px] mt-8 mb-4'

export default function HowWeCount() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-8">
          How We Count What We Report
        </h1>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px]">
          <p>
            Most nonprofit metrics are estimates typed into a form once a year. Ours are computed —
            every number on our <Link href="/impact/">impact page</Link> and our Candid profile is
            derived programmatically from records that carry their own dates, so anyone re-running
            the derivation gets the same answer. This page states each definition and the honest
            caveats.
          </p>

          <h2 className={h2}>&ldquo;Nonprofits served&rdquo; — span evidence</h2>
          <p>
            A nonprofit counts as served in year Y when a charity service or registered domain was{' '}
            <strong>in force during Y</strong> — measured from each record&rsquo;s registration date
            to its next-due or expiry date (active services run through today). We deliberately do{' '}
            <em>not</em> count from billing: our services are free, so most invoices are $0 and
            payment events dramatically undercount actual service delivery. We also don&rsquo;t
            count from &ldquo;current status&rdquo; flags, which carry no history.
          </p>

          <h2 className={h2}>&ldquo;Domains under management&rdquo;</h2>
          <p>
            Distinct domains whose registration span covers the year. The current-year figure also
            includes organizations on legacy hosting that we manage outside our billing system —
            counted from our operational sites inventory, which is rebuilt weekly from live
            infrastructure (DNS, hosting, and health probes).
          </p>

          <h2 className={h2}>Support and volunteer metrics — a full census</h2>
          <p>
            For 2023–2025 we individually classified <strong>every conversation thread</strong> on
            the FFC support line — 5,951 threads read and categorized by hand, of which 1,153 were
            charity or volunteer traffic. Per-year interaction counts, active volunteers, active
            charity partners, and text-support hours all come from that census. No sampling, no
            extrapolation; only aggregate counts are ever published.
          </p>

          <h2 className={h2}>Volunteer hours — a conservative floor</h2>
          <p>
            We publish modeled hours from the census (each thread costed by its support category)
            rather than guessed totals. This <em>undercounts</em> — founder hours and untracked
            project work aren&rsquo;t included — and we say so on the profile rather than inflating
            the number.
          </p>

          <h2 className={h2}>The corrections we made to our own history</h2>
          <p>
            Radical transparency includes our mistakes. When we rebuilt the metrics pipeline in
            2026, we found our previously published member counts came from point-in-time dashboard
            readings with inconsistent method. Re-deriving from dated records showed:
          </p>
          <ul>
            <li>
              The <strong>2022 value (104)</strong> was validated — span evidence gives 99, so the
              old reading was honest.
            </li>
            <li>
              The <strong>2023 value (221) was wrong</strong> — it was a 2024 reading of a{' '}
              <em>total accounts</em> counter, not members served. The corrected value is{' '}
              <strong>108</strong>, and that is what our profile now shows.
            </li>
          </ul>
          <p>
            We chose to publish the smaller, defensible number. If you see our growth curve jump in
            2024–2025, that&rsquo;s real growth measured consistently — not a methodology change
            flattering us.
          </p>

          <h2 className={h2}>Privacy</h2>
          <p>
            All published figures are aggregate integer counts. No donor, charity contact, or
            volunteer&rsquo;s personal information is ever included in the data files that drive
            this site.
          </p>

          <p className="mt-8">
            Questions about a specific number? <Link href="/contact-us/">Ask us</Link> — the
            derivation exists in code and we&rsquo;re glad to show our work.
          </p>
        </div>
      </div>
    </div>
  )
}
