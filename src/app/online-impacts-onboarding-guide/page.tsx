import { pageMetadata } from '@/lib/page-metadata'
import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import CharityText from '@/components/online-impacts-onboarding-guide-components/charity-text'
import ReadyToGetStartedNow from '@/components/online-impacts-onboarding-guide-components/Ready-To-Get-Started-Now'
import CallSection from '@/components/help-for-charities-components/call-section'
import ShareExperienceCallout from '@/components/testimonials/ShareExperienceCallout'

export const metadata = pageMetadata({
  title: 'Online Impacts Onboarding Guide',
  description:
    'Onboarding guide for charities hosted and designed by Online Impacts, providing instant access to free tools and services.',
  canonical: '/online-impacts-onboarding-guide/',
})

const index = () => {
  return (
    <div>
      <HeroSection
        heading="Online Impacts Onboarding Guide"
        paragraph="If you are representing a charity or you currently work for a charity that was hosted or designed by Online Impacts (onlineimpacts.org) start here to get help for your organization. You get instant access to many of our free tools and products right away!"
        heroImg="/Images/volunteer.webp"
      />
      <CharityText />
      <ReadyToGetStartedNow />
      <div className="w-[90%] md:w-[80%] max-w-[900px] mx-auto">
        <ShareExperienceCallout />
      </div>
      <CallSection />
    </div>
  )
}

export default index
