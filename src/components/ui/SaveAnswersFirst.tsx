import React from 'react'
import Link from 'next/link'
import { TRACKS, type Track } from '@/data/application-fields'

/**
 * "Before you apply" step shown on both onboarding guides (/501c3/ and
 * /pre501c3/): draft every answer in a local Word document or Google Doc, then
 * copy each one into the WHMCS application, so nothing is lost if the
 * application has to be fixed and resubmitted. Links to the worksheet on that
 * form's application guide.
 */
const SaveAnswersFirst: React.FC<{ track: Track }> = ({ track }) => {
  return (
    <section
      id="save-your-answers"
      aria-labelledby="save-your-answers-heading"
      className="scroll-mt-[120px] rounded-[10px] border border-[#0567B1]/40 bg-[#f2f8fd] px-[20px] py-[18px]"
    >
      <h2
        id="save-your-answers-heading"
        className="mb-[8px] text-[20px] font-[700] leading-[28px] text-[#04508c]"
        data-font="lato-font"
      >
        Before you apply: save every answer in a Word document or Google Doc first
      </h2>
      <p className="mb-[10px] text-[16px] leading-[25px] text-[#333]" data-font="lato-font">
        Type or paste each answer into a Word document or Google Doc on your own computer or
        account, then copy each one into the application form. If something has to be fixed and you
        resubmit, nothing is lost.
      </p>
      <Link
        href={`${TRACKS[track].guidePath}#worksheet`}
        className="inline-flex items-center gap-[8px] text-[16px] font-[600] text-[#04508c] underline underline-offset-4"
      >
        <span>Use the application worksheet</span>
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </section>
  )
}

export default SaveAnswersFirst
