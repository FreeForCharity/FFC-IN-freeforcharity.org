import type { Metadata } from 'next'
import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import ReadyToGetStarted from '@/components/help-for-charities-components/Ready-to-Get-Started-Now'
import CharityNonprofitDirectorFaq from '@/components/help-for-charities-components/Charity-Nonprofit-Director-Faq'
import CallSection from '@/components/help-for-charities-components/call-section'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'
import Faqs from '@/components/pre501c3-components/Faqs'
import Charity from '@/components/pre501c3-components/charity'

export const metadata: Metadata = {
  title: 'Pre-501(c)(3) Onboarding Guide',
  description:
    'For charities pending 501(c)(3) status: apply to get a free website—a fast, secure GitHub Pages site built with AI—plus free tools and services from Free For Charity while your application is in progress.',
  alternates: { canonical: '/pre501c3/' },
}

const index = () => {
  return (
    <div className="w-full">
      <HeroSection
        heading="Pre-501(c)3 Onboarding Guide"
        paragraph="Even while your 501(c)(3) is pending, apply to start getting help for your organization—including a free, professionally built website (a fast, secure GitHub Pages site built with AI), free domains, and Microsoft 365. You get instant access to many of our free products right away."
        heroImg="/Images/volunteer.webp"
      />
      <div className="w-[90%] max-w-[720px] mx-auto mt-[32px]">
        <AdminGuideLink
          href={ffcAdminUrl(adminLinks.onboarding.newModel)}
          description="Before you apply: review the charity prerequisites and the full step-by-step onboarding on the FFC Admin portal."
        />
      </div>
      <Charity />
      <Faqs />
      <ReadyToGetStarted />
      <CharityNonprofitDirectorFaq />
      <ReadyToGetStarted />
      <CallSection />
    </div>
  )
}

export default index
