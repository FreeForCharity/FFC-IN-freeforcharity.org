import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import guidesData from '@/data/guides.json'

export const metadata = pageMetadata({
  title: 'Guides for Charities & Volunteers',
  description:
    'Every Free For Charity guide in one place: getting started, email and domains, fundraising visibility, compliance, security, and volunteer training.',
  canonical: '/guides/',
})

interface Guide {
  href: string
  title: string
  promise: string
  group: string
  minutes?: number
}

const { groups, guides } = guidesData as unknown as { groups: string[]; guides: Guide[] }

function minutesLabel(minutes?: number) {
  if (!minutes) return null
  if (minutes >= 60) {
    const hours = Math.round((minutes / 60) * 10) / 10
    return `~${hours} hr${hours === 1 ? '' : 's'}`
  }
  return `~${minutes} min`
}

export default function GuidesHub() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-4">
          Guides for Charities &amp; Volunteers
        </h1>
        <p className="font-[var(--font-lato)] text-[18px] leading-[28px] mb-10 text-[#555]">
          Everything we teach, in one place — organized by where you are in the journey. Each guide
          is free, and most take only a few minutes.
        </p>

        {groups.map((group) => {
          const entries = guides.filter((g) => g.group === group)
          if (entries.length === 0) return null
          return (
            <section key={group} className="mb-10">
              <h2 className="font-[var(--font-faustina)] text-[32px] leading-[40px] mb-4">
                {group}
              </h2>
              <ul className="space-y-4">
                {entries.map((guide) => (
                  <li
                    key={guide.href}
                    className="border border-gray-200 rounded-lg p-5 hover:border-[#0567B1] transition-colors"
                  >
                    <Link href={guide.href} className="group block">
                      <span className="flex items-baseline justify-between gap-4">
                        <span
                          className="font-[var(--font-lato)] text-[20px] font-[600] text-[#0567B1] group-hover:underline"
                          data-font="lato-font"
                        >
                          {guide.title}
                        </span>
                        {minutesLabel(guide.minutes) ? (
                          <span className="shrink-0 text-[14px] font-[500] text-[#666]">
                            {minutesLabel(guide.minutes)}
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 block font-[var(--font-lato)] text-[16px] leading-[24px] text-[#555]">
                        {guide.promise}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}

        <p className="font-[var(--font-lato)] text-[16px] leading-[26px] text-[#555]">
          Can&rsquo;t find what you need? Ask us via the{' '}
          <Link href="/contact-us/" className="text-[#0567B1] underline">
            contact page
          </Link>{' '}
          — unanswered questions become new guides.
        </p>
      </div>
    </div>
  )
}
