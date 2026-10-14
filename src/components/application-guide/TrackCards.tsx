import React from 'react'
import Link from 'next/link'
import HelpMeChoose from '@/components/ui/HelpMeChoose'
import { TRACKS, TRACK_KEYS } from '@/data/application-fields'

const WHO: Record<string, string> = {
  '501c3': 'Your organization is IRS-recognized as a 501(c)(3) and has its determination letter.',
  pre501c3:
    'Your nonprofit is formed but not IRS-recognized yet: still forming, or waiting on the IRS.',
}

interface TrackCardsProps {
  /** Show the Help me choose picker under the cards. */
  withPicker?: boolean
  className?: string
}

/**
 * "Go to your application page" cards: the two big doors to /501c3/ and
 * /pre501c3/. Funnel pages use these instead of Apply buttons, so every
 * application starts on its own page, under the wrong-application warning.
 */
const TrackCards: React.FC<TrackCardsProps> = ({ withPicker = true, className = '' }) => (
  <div className={className}>
    <div className="grid grid-cols-1 gap-[20px] text-left md:grid-cols-2">
      {TRACK_KEYS.map((track) => {
        const info = TRACKS[track]
        return (
          <Link
            key={track}
            href={info.pagePath}
            data-testid="track-card"
            className="flex flex-col rounded-[14px] border-2 border-[#0567B1] bg-white p-[24px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#f2f8fd]"
          >
            <span
              className="mb-[8px] text-[24px] font-[800] leading-[32px] text-[#0567B1]"
              data-font="lato-font"
            >
              {info.pageTitle} →
            </span>
            <span className="text-[16px] leading-[25px] text-[#333]">{WHO[track]}</span>
          </Link>
        )
      })}
    </div>
    {withPicker ? (
      <div className="mt-[24px] flex justify-center">
        <HelpMeChoose />
      </div>
    ) : null}
  </div>
)

export default TrackCards
