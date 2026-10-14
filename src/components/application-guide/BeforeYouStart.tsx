import React from 'react'
import { APPLICATION_FIELDS_POLICY } from '@/data/application-fields'
import { linkClass, sectionH2 } from './styles'

/**
 * Section 5 of an application page: save every answer in a document first,
 * and why every required field is required. (The id is `get-ready`, because
 * `before-you-start` is the field guide's first section id.)
 */
const BeforeYouStart: React.FC = () => (
  <section id="get-ready" aria-labelledby="get-ready-heading" className="scroll-mt-[120px]">
    <h2 id="get-ready-heading" className={sectionH2} data-font="lato-font">
      Before you start
    </h2>

    <div
      id="save-your-answers"
      className="rounded-[10px] border border-[#0567B1]/40 bg-[#f2f8fd] px-[20px] py-[18px]"
    >
      <h3
        className="mb-[8px] text-[21px] font-[700] leading-[29px] text-[#04508c]"
        data-font="lato-font"
      >
        Save every answer in a Word document or Google Doc first
      </h3>
      <p className="mb-[10px] text-[16px] leading-[25px] text-[#333]">
        Before you put anything into our form, type or paste each answer into a Word document on
        your computer or a Google Doc. Then copy each answer from your document into the form. If a
        field is rejected or you have to resubmit, nothing is lost: your answers are still in your
        document.
      </p>
      <p className="mb-[14px] text-[16px] leading-[25px] text-[#333]">
        Keep the document after you apply. It’s also useful when we build your website. The{' '}
        <a href="#worksheet" className={linkClass}>
          application worksheet
        </a>{' '}
        below lists every question in order, ready to copy into it.
      </p>
      <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
        <div className="rounded-[8px] border border-[#0567B1]/20 bg-white p-[14px]">
          <h4 className="mb-[4px] text-[16px] font-[700] text-[#111]">Microsoft Word</h4>
          <p className="text-[15px] leading-[23px] text-[#444]">
            Open Word, choose <strong>File</strong>, then <strong>New</strong>, then{' '}
            <strong>Blank document</strong>. Choose <strong>Save</strong> and give it a name you’ll
            find again, such as “FFC application”.
          </p>
        </div>
        <div className="rounded-[8px] border border-[#0567B1]/20 bg-white p-[14px]">
          <h4 className="mb-[4px] text-[16px] font-[700] text-[#111]">Google Docs</h4>
          <p className="text-[15px] leading-[23px] text-[#444]">
            Go to{' '}
            <a
              href="https://docs.new"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              docs.new
              <span className="sr-only"> (opens in a new tab)</span>
            </a>{' '}
            to start a blank document, then click “Untitled document” at the top left to rename it.
            Google saves it for you as you type.
          </p>
        </div>
      </div>
    </div>

    <div
      id="required-fields"
      className="mt-[18px] rounded-[10px] border-2 border-[#b35000] bg-[#fff7f0] px-[20px] py-[18px]"
    >
      <h3
        className="mb-[8px] text-[21px] font-[700] leading-[29px] text-[#9a3412]"
        data-font="lato-font"
      >
        {APPLICATION_FIELDS_POLICY.title}
      </h3>
      {APPLICATION_FIELDS_POLICY.body.map((paragraph) => (
        <p key={paragraph} className="mb-[8px] text-[16px] leading-[25px] text-[#333] last:mb-0">
          {paragraph}
        </p>
      ))}
    </div>

    <p className="mt-[18px] text-[17px] leading-[27px] text-[#222]">
      <strong>Read the whole field guide below before you start:</strong> the application’s first
      question asks you to confirm you have.
    </p>
  </section>
)

export default BeforeYouStart
