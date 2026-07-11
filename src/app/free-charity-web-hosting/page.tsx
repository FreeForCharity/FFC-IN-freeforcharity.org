import { pageMetadata } from '@/lib/page-metadata'
import React from 'react'
import Hero from '@/components/free-charity-web-hosting/Hero'
import WhatsIncluded from '@/components/free-charity-web-hosting/WhatsIncluded'
import AboutFFCHosting from '@/components/free-charity-web-hosting/About-FFC-Hosting'
import HowToApply from '@/components/free-charity-web-hosting/HowToApply'
import ChooseYourTemplate from '@/components/free-charity-web-hosting/ChooseYourTemplate'
import ReadyToGetStarted from '@/components/free-charity-web-hosting/ReadyToGetStarted'
import ClientTestimonials from '@/components/free-charity-web-hosting/ClientTestimonials'
import SupportThisCampaign from '@/components/free-charity-web-hosting/SupportThisCampaign'
import FAQs from '@/components/free-charity-web-hosting/FAQs'

export const metadata = pageMetadata({
  title: 'Free Nonprofit Web Hosting',
  description:
    'Free website hosting for nonprofits—fast, secure GitHub Pages static sites built with AI development agents—plus free domain registration and Microsoft 365 email, with legacy WordPress hosting still available. Powered by Free For Charity volunteers.',
  canonical: '/free-charity-web-hosting/',
})

const index = () => {
  return (
    <div>
      <Hero />
      <WhatsIncluded />
      <AboutFFCHosting />
      <HowToApply />
      <ChooseYourTemplate />
      <ClientTestimonials />
      <SupportThisCampaign />
      <FAQs />
      <ReadyToGetStarted />
    </div>
  )
}

export default index
