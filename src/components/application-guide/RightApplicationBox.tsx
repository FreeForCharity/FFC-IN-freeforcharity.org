import React from 'react'
import HelpMeChoose from '@/components/ui/HelpMeChoose'
import { type Track } from '@/data/application-fields'
import WrongTrackWarning from './WrongTrackWarning'

/** Who each application is for. The $1M revenue limit is a hard gate. */
export const TRACK_CRITERIA: Record<Track, string[]> = {
  '501c3': [
    'The IRS has recognized your organization as a 501(c)(3), and you have its determination letter.',
    'You are based in the United States (US territories count).',
    'Your annual revenue is under $1 million. This is a hard limit.',
    'You are not primarily funded by federal grants or contracts.',
    'You are not a fiscally sponsored project. If you are, your sponsor applies here for you.',
  ],
  pre501c3: [
    'Your nonprofit is formed in a US state (articles of incorporation), but the IRS has not recognized it as a 501(c)(3) yet.',
    'You are based in the United States (US territories count).',
    'Your annual revenue is under $1 million. This is a hard limit.',
    'You are not primarily funded by federal grants or contracts.',
    'You are not a fiscally sponsored project. If you are, your sponsor applies on the 501(c)(3) application (unless you are also pursuing your own 501(c)(3)).',
  ],
}

/**
 * Section 2 of an application page: the big red "Is this the right
 * application?" box, with the criteria and the Help me choose picker inside.
 */
const RightApplicationBox: React.FC<{ track: Track }> = ({ track }) => (
  <section id="right-application" className="scroll-mt-[120px]">
    <WrongTrackWarning track={track} idSuffix="top" heading="Is this the right application?">
      <div data-testid="right-application-box" className="mt-[16px]">
        <p className="mb-[8px] text-[17px] font-[700] text-[#111]">
          This application is for you only if all of these are true:
        </p>
        <ul className="mb-[18px] list-disc space-y-[6px] pl-[22px] text-[16px] leading-[25px] text-[#222]">
          {TRACK_CRITERIA[track].map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <HelpMeChoose embedded currentTrack={track} />
      </div>
    </WrongTrackWarning>
  </section>
)

export default RightApplicationBox
