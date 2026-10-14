import React from 'react'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'

/**
 * Required-fields notice shown on both onboarding guides (/501c3/ and
 * /pre501c3/). Explains that, because the free service is in high demand,
 * every required field on the WHMCS application must be completed and we can't
 * make exceptions. Links to the field-by-field guide on FFC Admin, which
 * explains each field and links its free setup guide.
 */
const RequiredFieldsNotice: React.FC = () => {
  return (
    <section
      id="required-fields"
      aria-labelledby="required-fields-heading"
      className="scroll-mt-[120px] rounded-[10px] border-2 border-[#b35000] bg-[#fff7f0] px-[20px] py-[18px]"
    >
      <h2
        id="required-fields-heading"
        className="mb-[8px] text-[22px] font-[700] leading-[30px] text-[#9a3412]"
        data-font="lato-font"
      >
        Why every required field is required
      </h2>
      <p className="mb-[10px] text-[16px] leading-[25px] text-[#333]" data-font="lato-font">
        Our services are free, and demand for them is very high. To review every application fairly
        and quickly, we need each required field completed, so we&rsquo;re not able to make
        exceptions. Everything we ask for is free to set up, and each field links to a step-by-step
        guide.
      </p>
      <a
        href={ffcAdminUrl(adminLinks['application-fields'].newModel)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-[8px] text-[16px] font-[600] text-[#9a3412] underline underline-offset-4"
      >
        <span>Read the step-by-step guide to every application field</span>
        <span aria-hidden="true">&rarr;</span>
        <span className="sr-only">(opens FFC Admin in a new tab)</span>
      </a>
    </section>
  )
}

export default RequiredFieldsNotice
