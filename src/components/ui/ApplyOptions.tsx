import React from 'react'
import HelpMeChoose from '@/components/ui/HelpMeChoose'
import { ApplyButton } from '@/components/ui/apply-buttons'

/**
 * On-page apply block: the two clear application options for people who already
 * know how to apply, plus the inline "Help me choose" guide for anyone unsure of
 * the IRS jargon. Everything happens on the page — no separate eligibility-wizard
 * page to bounce out to — and the WHMCS application forms do the real screening.
 */

interface ApplyOptionsProps {
  /** Optional heading; pass '' to omit. */
  heading?: string
}

const ApplyOptions: React.FC<ApplyOptionsProps> = ({ heading = 'Ready to apply?' }) => {
  return (
    <section id="apply" className="w-full py-[50px] scroll-mt-[120px]">
      <div className="w-[90%] md:w-[80%] max-w-[1000px] mx-auto text-center">
        {heading ? (
          <h2 className="text-[26px] md:text-[30px] font-[700] text-[#0567B1] mb-[10px]">
            {heading}
          </h2>
        ) : null}
        <p
          className="text-[17px] font-[500] leading-[27px] text-[#555] max-w-[720px] mx-auto mb-[30px]"
          data-font="lato-font"
        >
          Free For Charity serves <b>US-based</b> nonprofits (US territories included) with annual
          revenue under $1&nbsp;million. Pick the option that matches your organization — the
          application itself walks you through what we need. Not sure which fits? Use{' '}
          <b>Help me choose</b>.
        </p>

        {/* The two clear apply options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] text-left">
          <div className="bg-white rounded-[12px] border border-[#e6edf3] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.1)] p-[28px] flex flex-col">
            <h3 className="text-[20px] font-[700] text-[#1a2e35] mb-[8px]" data-font="lato-font">
              501(c)(3) charities
            </h3>
            <p className="text-[16px] leading-[25px] text-[#555] mb-[22px]" data-font="lato-font">
              Your nonprofit already has its IRS 501(c)(3) determination letter. Have your EIN
              handy.
            </p>
            <div className="mt-auto">
              <ApplyButton kind="full501c3" className="w-full" />
            </div>
          </div>

          <div className="bg-white rounded-[12px] border border-[#e6edf3] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.1)] p-[28px] flex flex-col">
            <h3 className="text-[20px] font-[700] text-[#1a2e35] mb-[8px]" data-font="lato-font">
              Pre-501(c)(3) organizations
            </h3>
            <p className="text-[16px] leading-[25px] text-[#555] mb-[22px]" data-font="lato-font">
              You&apos;re formed (articles of incorporation + EIN) and still working toward IRS
              501(c)(3) determination.
            </p>
            <div className="mt-auto">
              <ApplyButton kind="pre501c3" className="w-full" />
            </div>
          </div>
        </div>

        <HelpMeChoose className="mt-[28px]" />
      </div>
    </section>
  )
}

export default ApplyOptions
