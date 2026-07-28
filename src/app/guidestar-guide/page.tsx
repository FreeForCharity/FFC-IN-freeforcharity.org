import { pageMetadata } from '@/lib/page-metadata'
import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import FreeForCharity from '@/components/guidestar-guide/Free-for-charity'
import Faqs from '@/components/guidestar-guide/Faqs'
import CallSection from '@/components/help-for-charities-components/call-section'

export const metadata = pageMetadata({
  title: 'GuideStar Guide',
  description:
    "Guide for achieving the Candid (GuideStar) Platinum Seal of Transparency at app.candid.org. Enhance your charity's credibility and visibility for donors.",
  canonical: '/guidestar-guide/',
})

const index = () => {
  return (
    <div>
      <HeroSection
        heading="Guidestar Guide"
        paragraph="Achieving validation through Candid — the service formerly known as GuideStar — enhances your charity’s credibility and visibility. It reassures donors and stakeholders of its legal compliance and ethical standing, potentially increasing funding opportunities. This guide walks the current app.candid.org profile, section by section, so you can make the most of it."
        heroImg="/Images/volunteer.webp"
      />
      <FreeForCharity />
      <Faqs />
      <CallSection />
    </div>
  )
}

export default index
