import React from 'react'
import Link from 'next/link'
import { FiAlertOctagon } from 'react-icons/fi'
import { TRACKS, type Track } from '@/data/application-fields'

/** The warning copy per form; the link always goes to the other form's guide. */
export const WRONG_TRACK_WARNING: Record<Track, { headline: string; stop: string }> = {
  '501c3': {
    headline: 'Only apply here if your organization is already IRS-recognized as a 501(c)(3).',
    stop: 'Not yet? STOP: do not click Apply. Use the Pre-501(c)(3) application instead.',
  },
  pre501c3: {
    headline: 'Only apply here if your organization is NOT yet IRS-recognized as a 501(c)(3).',
    stop: 'Already recognized, with an IRS determination letter? STOP: do not click Apply. Use the 501(c)(3) application instead.',
  },
}

interface WrongTrackWarningProps {
  track: Track
  /** Keeps ids unique when the warning appears more than once on a page. */
  idSuffix: string
}

/**
 * The unmissable "wrong application?" warning shown at the top of every
 * application guide and help page, and next to every Apply button. Applying on
 * the wrong form is the most common reason an application has to be redone.
 */
const WrongTrackWarning: React.FC<WrongTrackWarningProps> = ({ track, idSuffix }) => {
  const copy = WRONG_TRACK_WARNING[track]
  const other = TRACKS[TRACKS[track].other]
  const id = `wrong-application-${idSuffix}`
  return (
    <div
      role="note"
      aria-labelledby={id}
      data-testid="wrong-application-warning"
      className="rounded-[12px] border-4 border-[#b91c1c] bg-[#fef2f2] p-[18px] sm:p-[24px] text-left"
    >
      <div className="flex gap-[14px] sm:gap-[18px]">
        <FiAlertOctagon
          aria-hidden="true"
          className="h-[40px] w-[40px] shrink-0 text-[#b91c1c] sm:h-[52px] sm:w-[52px]"
        />
        <div>
          <p
            id={id}
            className="text-[20px] font-[800] leading-[28px] text-[#7f1d1d] sm:text-[24px] sm:leading-[32px]"
            data-font="lato-font"
          >
            {copy.headline}
          </p>
          <p
            className="mt-[8px] text-[17px] font-[700] leading-[26px] text-[#7f1d1d] sm:text-[19px]"
            data-font="lato-font"
          >
            {copy.stop}
          </p>
          <Link
            href={other.guidePath}
            className="mt-[12px] inline-flex items-center gap-[8px] text-[17px] font-[700] text-[#7f1d1d] underline underline-offset-4"
          >
            <span>Go to the {other.guideTitle}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WrongTrackWarning
