import { pageMetadata } from '@/lib/page-metadata'
import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import HelpForCharities from '@/components/ui/help-for-charity'
import AccordionSection from '@/components/help-for-charities-components/AccordianSection'
import ApplyOptions from '@/components/ui/ApplyOptions'
import CharityNonprofitDirectorFaq from '@/components/ui/Charity-Nonprofit-Director-Faq'
import CallSection from '@/components/help-for-charities-components/call-section'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'

export const metadata = pageMetadata({
  title: 'Help for Charities',
  description:
    'Free For Charity gives verified nonprofits a complete online presence—a managed website, .org domain, and Microsoft 365 email—plus the tools, directories, and hands-on help to run leaner. Start even while pending 501(c)(3) status.',
  canonical: '/help-for-charities/',
})

const index = () => {
  return (
    <div className="bg-[#FCFCFC]">
      <HeroSection
        heading="Help For Charities"
        paragraph="Free For Charity gives verified nonprofits a complete online presence—a managed website, .org domain, and Microsoft 365 email—plus the tools, directories, and hands-on help to run leaner. You can start even while you're still pending 501(c)(3) status."
        heroImg="/Images/volunteer.webp"
      />

      {/* On-page CTAs — no separate wizard page to bounce out to. */}
      <div className="w-[90%] max-w-[860px] mx-auto mt-[36px] flex flex-col sm:flex-row items-center justify-center gap-[16px]">
        <a
          href="#apply"
          className="inline-flex items-center justify-center rounded-[10px] bg-[#0567B1] px-[28px] py-[15px] text-[17px] font-[700] text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-[#045a9b]"
          data-font="lato-font"
        >
          How to apply
        </a>
        <a
          href="#whats-included"
          className="inline-flex items-center justify-center rounded-[10px] border-2 border-[#0567B1] px-[28px] py-[15px] text-[17px] font-[700] text-[#0567B1] transition-colors duration-200 hover:bg-[#0567B1]/5"
          data-font="lato-font"
        >
          See what&apos;s included
        </a>
      </div>

      <div className="w-[90%] max-w-[720px] mx-auto mt-[32px]">
        <AdminGuideLink
          href={ffcAdminUrl(adminLinks['help-for-charities'].newModel)}
          description="See everything FFC delivers—including your free, AI-built GitHub Pages website—on the FFC Admin portal."
        />
      </div>

      <div className="w-full h-[60px]" />

      <div className="flex w-full max-w-[90%] mx-auto">
        <HelpForCharities
          title="Help For Charities and Nonprofit Groups from an Unbiased Fellow Charity"
          description="Free For Charity is working every day to provide your charity, and you the charity or nonprofit director with the tools and techniques needed to thrive, FREE. Sign up today to get access to all of this for your nonprofit or charity group today even if you are still pending final 501c3 status."
          bg="#FCFCFC"
        />
      </div>

      <div id="whats-included" className="scroll-mt-[120px]">
        <AccordionSection />
      </div>

      <div className="w-[90%] max-w-[720px] mx-auto py-[20px] text-center">
        <p className="text-[18px] font-[500] leading-[28px] text-[#333]" data-font="lato-font">
          Wondering what this looks like in practice? Read the{' '}
          <a
            href="/charity-and-nonprofit-case-studies/"
            className="text-[#0567B1] underline font-[600]"
          >
            success stories of charities FFC serves
          </a>{' '}
          — what they were missing, what we provided free, and what changed.
        </p>
      </div>

      <CharityNonprofitDirectorFaq />

      <ApplyOptions />
      <CallSection />
    </div>
  )
}

export default index
