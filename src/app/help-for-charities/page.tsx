import type { Metadata } from 'next'
import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import HelpForCharities from '@/components/ui/help-for-charity'
import AccordionSection from '@/components/help-for-charities-components/AccordianSection'
import ReadyToGetStarted from '@/components/help-for-charities-components/Ready-to-Get-Started-Now'
import CharityNonprofitDirectorFaq from '@/components/ui/Charity-Nonprofit-Director-Faq'
import CallSection from '@/components/help-for-charities-components/call-section'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'

export const metadata: Metadata = {
  title: 'Help for Charities',
  description:
    'Resources and support for charity and nonprofit directors. Get instant access to free tools, domains, hosting, and technology services from Free For Charity.',
  alternates: { canonical: '/help-for-charities/' },
}

const index = () => {
  return (
    <div className="bg-[#FCFCFC]">
      <HeroSection
        heading="Help For Charities"
        paragraph="If you are representing a charity or you currently work for a charity and want to improve your own skills start here to get help for your organization. You get instant access to many of our free tools and products right away!"
        heroImg="/Images/volunteer.webp"
      />

      <div className="w-[90%] max-w-[720px] mx-auto mt-[32px]">
        <AdminGuideLink
          href={ffcAdminUrl(adminLinks['help-for-charities'].newModel)}
          description="See everything FFC delivers—including your free, AI-built GitHub Pages website—on the FFC Admin portal."
        />
      </div>

      <div className="w-full h-[80px]" />

      <div className="flex w-full max-w-[90%] mx-auto">
        <HelpForCharities
          title="Help For Charities and Nonprofit Groups from an Unbiased Fellow Charity"
          description="Free for Charity is working every day to provide your charity, and you the charity or nonprofit director with the tools and techniques needed to thrive, FREE. Sign up today to get access to all of this for your nonprofit or charity group today even if you are still pending final 501c3 status."
          bg="#FCFCFC"
        />
      </div>

      <AccordionSection />
      <ReadyToGetStarted />
      <CharityNonprofitDirectorFaq />
      <ReadyToGetStarted />
      <CallSection />
    </div>
  )
}

export default index
