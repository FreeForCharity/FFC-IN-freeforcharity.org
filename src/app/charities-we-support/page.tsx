import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import directory from '@/data/supported-charities.json'

export const metadata = pageMetadata({
  title: 'Charities We Support',
  description:
    'The nonprofits whose domains, email, and websites run on Free For Charity — a live directory of the organizations our volunteers and donors keep online.',
  canonical: '/charities-we-support/',
})

const { charities, snapshotDate, linksVerifiedDate } = directory as unknown as {
  charities: { domain: string }[]
  snapshotDate: string
  linksVerifiedDate: string
}

export default function CharitiesWeSupport() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-4">
          Charities We Support
        </h1>
        <p className="font-[var(--font-lato)] text-[18px] leading-[28px] text-[#555] mb-2">
          These are {charities.length} organizations with live websites running on Free For
          Charity&rsquo;s donated infrastructure — domains we keep registered, DNS we keep secure,
          and sites our volunteers build and maintain. (Our full estate is larger:{' '}
          <Link href="/impact/" className="text-[#0567B1] underline">
            see the impact numbers
          </Link>
          . This directory lists only currently-live public sites.)
        </p>
        <p className="font-[var(--font-lato)] text-[14px] leading-[22px] text-[#767672] mb-8">
          Snapshot from our operational sites inventory ({snapshotDate}), outbound links verified on{' '}
          {linksVerifiedDate} — the full inventory with health and migration detail is public on{' '}
          <a
            href="https://ffcadmin.org/sites-list/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            FFC Admin
          </a>
          . Listed organization? We&rsquo;re glad to feature you — or remove you on request via the{' '}
          <Link href="/contact-us/" className="underline">
            contact page
          </Link>
          .
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
          {charities.map((c) => (
            <li key={c.domain}>
              <a
                href={`https://${c.domain}/`}
                target="_blank"
                rel="noopener"
                className="font-[var(--font-lato)] text-[16px] leading-[26px] text-[#0567B1] hover:underline break-all"
              >
                {c.domain}
              </a>
            </li>
          ))}
        </ul>

        <div className="prose max-w-none font-[var(--font-lato)] text-[18px] leading-[28px] mt-10">
          <p>
            Want your nonprofit on this list — with the free domain, email, and website that come
            with it? Take the <Link href="/eligibility-check/">two-minute eligibility check</Link>.
            Want to keep these organizations online? Each one costs about $16.50/year —{' '}
            <Link href="/donate/">fund a few</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
