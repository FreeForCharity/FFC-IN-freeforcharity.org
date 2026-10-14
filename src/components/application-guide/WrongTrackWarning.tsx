import React from 'react'
import Link from 'next/link'
import { FiAlertOctagon } from 'react-icons/fi'
import { TRACKS, type Track } from '@/data/application-fields'
import { FFC_TEL_HREF, FFC_TEXT_NUMBER } from '@/data/charity-terms'

/** The warning copy per form; the link always goes to the other form's page. */
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
  /** Extra content inside the box (the criteria and the picker, on application pages). */
  children?: React.ReactNode
  /** Optional heading above the headline, e.g. "Is this the right application?". */
  heading?: string
}

/**
 * The unmissable "wrong application?" warning. On an application page it is
 * the big red box at the top (with the criteria and the Help me choose picker
 * inside) and it is repeated right above the Apply button; help pages show it
 * at the top and above their Apply button. The only link is a text link to
 * the other form's page, never the other form's Apply button.
 */
const WrongTrackWarning: React.FC<WrongTrackWarningProps> = ({
  track,
  idSuffix,
  children,
  heading,
}) => {
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
        <div className="min-w-0 flex-1">
          {heading ? (
            <h2
              id={id}
              className="mb-[6px] text-[26px] font-[800] leading-[34px] text-[#7f1d1d] sm:text-[30px] sm:leading-[38px]"
              data-font="lato-font"
            >
              {heading}
            </h2>
          ) : null}
          <p
            id={heading ? undefined : id}
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
          <p className="mt-[10px] text-[17px] font-[700] leading-[26px] text-[#7f1d1d]">
            <Link href={other.pagePath} className="underline underline-offset-4">
              Go to the {other.pageTitle} page
            </Link>{' '}
            or text{' '}
            <a href={FFC_TEL_HREF} className="underline underline-offset-4">
              {FFC_TEXT_NUMBER}
            </a>
            .
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}

export default WrongTrackWarning
