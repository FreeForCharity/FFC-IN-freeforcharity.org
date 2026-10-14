import React from 'react'
import { TRACKS, type Track } from '@/data/application-fields'
import RightApplicationBox from './RightApplicationBox'
import CommitmentSummary from './CommitmentSummary'
import HowItWorks from './HowItWorks'
import BeforeYouStart from './BeforeYouStart'
import InlineFieldGuide from './InlineFieldGuide'
import ApplyBlock from './ApplyBlock'
import AfterYouApply from './AfterYouApply'
import TrackContact from './TrackContact'

interface TrackPageProps {
  track: Track
  /** Form-specific extras for "After you apply". */
  afterApply?: React.ReactNode
}

/**
 * The single page per application (/501c3/ and /pre501c3/), top to bottom:
 * 1 who it's for, 2 "Is this the right application?" (with the picker),
 * 3 commitments, 4 how it works, 5 before you start, 6 the field guide,
 * 7 the one Apply button (warning repeated above it), 8 after you apply,
 * 9 contact.
 */
const TrackPage: React.FC<TrackPageProps> = ({ track, afterApply }) => (
  <div className="mx-auto w-[90%] max-w-[880px] space-y-[44px] py-[40px]">
    <p className="text-[20px] font-[700] leading-[30px] text-[#1a2e35]" data-testid="track-intro">
      {TRACKS[track].forWhom}
    </p>
    <RightApplicationBox track={track} />
    <CommitmentSummary />
    <HowItWorks />
    <BeforeYouStart />
    <InlineFieldGuide track={track} />
    <ApplyBlock track={track} idSuffix="apply" />
    <AfterYouApply track={track}>{afterApply}</AfterYouApply>
    <TrackContact />
  </div>
)

export default TrackPage
