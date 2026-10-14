import React from 'react'
import { ApplyButton } from '@/components/ui/apply-buttons'
import { TRACKS, type Track } from '@/data/application-fields'
import WrongTrackWarning from './WrongTrackWarning'

interface ApplyBlockProps {
  track: Track
  idSuffix: string
}

/**
 * The only Apply button on the application guides and help pages: always the
 * page's own form (exact WHMCS pid), always directly under the wrong-form
 * warning.
 */
const ApplyBlock: React.FC<ApplyBlockProps> = ({ track, idSuffix }) => {
  const headingId = `apply-heading-${idSuffix}`
  return (
    <section
      id={`apply-${idSuffix}`}
      aria-labelledby={headingId}
      className="scroll-mt-[120px] rounded-[12px] border border-[#e6edf3] bg-white p-[20px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.08)] sm:p-[28px]"
    >
      <h2
        id={headingId}
        className="mb-[14px] text-[24px] font-[700] leading-[32px] text-[#0567B1]"
        data-font="lato-font"
      >
        Apply: the {TRACKS[track].name} application
      </h2>
      <WrongTrackWarning track={track} idSuffix={idSuffix} />
      <p
        className="mt-[16px] mb-[16px] text-[16px] leading-[25px] text-[#333]"
        data-font="lato-font"
      >
        Have every answer saved in your own document first, then copy each one into the form.
      </p>
      <ApplyButton kind={track === '501c3' ? 'full501c3' : 'pre501c3'} />
    </section>
  )
}

export default ApplyBlock
