import React from 'react'
import Link from 'next/link'
import spotlightsData from '@/data/spotlights.json'

/**
 * Monthly charity spotlight (issue #380). Static-export friendly: the build
 * picks the queue entry matching the build month (YYYY-MM); when no entry
 * matches, the most recent past entry renders so the section never goes
 * empty. Consent per /publicity-consent-policy/ is recorded on each entry
 * in src/data/spotlights.json.
 */

interface Spotlight {
  month: string
  organization: string
  website: string
  blurb: string
}

function pickSpotlight(): Spotlight | null {
  const entries = (spotlightsData.spotlights as Spotlight[])
    .slice()
    .sort((a, b) => a.month.localeCompare(b.month))
  if (entries.length === 0) return null
  const buildMonth = new Date().toISOString().slice(0, 7)
  const current = entries.filter((e) => e.month <= buildMonth)
  // Before the first queued month, show the earliest entry rather than nothing.
  return current.length > 0 ? current[current.length - 1] : entries[0]
}

export default function CharitySpotlight() {
  const spotlight = pickSpotlight()
  if (!spotlight) return null
  return (
    <section className="py-[40px] bg-[#f4f9fd]">
      <div className="w-[90%] max-w-[900px] mx-auto text-center">
        <p
          className="text-[16px] font-[700] tracking-[2px] uppercase text-[#b35000] mb-2"
          data-font="lato-font"
        >
          Charity Spotlight
        </p>
        <h2
          className="font-[400] text-[32px] lg:text-[40px] leading-[44px] mb-4"
          data-font="faustina-font"
        >
          {spotlight.website ? (
            <a
              href={spotlight.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {spotlight.organization}
            </a>
          ) : (
            spotlight.organization
          )}
        </h2>
        <p
          className="text-[17px] font-[500] leading-[27px] text-[#555] max-w-[700px] mx-auto"
          data-font="lato-font"
        >
          {spotlight.blurb}
        </p>
        <p className="text-[15px] font-[500] leading-[24px] text-[#777] mt-4" data-font="lato-font">
          A different supported charity is featured each month.{' '}
          <Link href="/charity-and-nonprofit-case-studies/" className="text-[#0567B1] underline">
            Read their full stories
          </Link>{' '}
          or{' '}
          <Link href="/charities-we-support/" className="text-[#0567B1] underline">
            see every charity we support
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
