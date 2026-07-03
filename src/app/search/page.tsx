import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import SiteSearch from '@/components/search/SiteSearch'

export const metadata = pageMetadata({
  title: 'Search',
  description:
    'Search every Free For Charity guide, page, and post — email setup, domains, Ad Grants, 990 filings, volunteering, and more.',
  canonical: '/search/',
})

export default function SearchPage() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-4">
          Find What You Need
        </h1>
        <p className="font-[var(--font-lato)] text-[18px] leading-[28px] text-[#555] mb-8">
          Every guide, page, and post on freeforcharity.org, one search box away. Prefer to browse?
          The{' '}
          <Link href="/guides/" className="text-[#0567B1] underline">
            guides hub
          </Link>{' '}
          groups everything by journey stage.
        </p>
        <SiteSearch />
      </div>
    </div>
  )
}
