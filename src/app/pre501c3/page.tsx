import { pageMetadata } from '@/lib/page-metadata'
import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import ReadyToGetStarted from '@/components/help-for-charities-components/Ready-to-Get-Started-Now'
import CharityNonprofitDirectorFaq from '@/components/help-for-charities-components/Charity-Nonprofit-Director-Faq'
import CallSection from '@/components/help-for-charities-components/call-section'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import RequiredFieldsNotice from '@/components/ui/RequiredFieldsNotice'
import SaveAnswersFirst from '@/components/ui/SaveAnswersFirst'
import ApplicationChecklist from '@/components/pre501c3-components/application-checklist'
import Faqs from '@/components/pre501c3-components/Faqs'
import Charity from '@/components/pre501c3-components/charity'

export const metadata = pageMetadata({
  title: 'Pre-501(c)(3) Onboarding Guide',
  description:
    'For charities pending 501(c)(3) status: apply to get a free website—a fast, secure GitHub Pages site built with AI—plus free tools and services from Free For Charity while your application is in progress.',
  canonical: '/pre501c3/',
})

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
          href="/pre501c3/application-guide/"
          label="Read the Pre-501(c)(3) Application Guide"
          description="Before you apply: every field on the Pre-501(c)(3) application, why we ask, and how to get it for free."
        />
        <div className="mt-[20px]">
          <RequiredFieldsNotice track="pre501c3" />
        </div>
        <div className="mt-[20px]">
          <SaveAnswersFirst track="pre501c3" />
        </div>
      </div>
      <Charity />
      <ApplicationChecklist />
      <Faqs />
      <ReadyToGetStarted />
      <CharityNonprofitDirectorFaq />
      <ReadyToGetStarted />
      <CallSection />
    </div>
  )
}

export default index
