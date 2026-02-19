import type { Metadata } from 'next'
import React from 'react'
import Hero from '@/components/free-charity-web-hosting/Hero'

export const metadata: Metadata = {
  title: 'Free Nonprofit Web Hosting',
  description:
    'Free WordPress hosting, domain registration, and email setup for nonprofit organizations. Powered by Free For Charity volunteers.',
  alternates: { canonical: '/free-charity-web-hosting' },
}
import Hosting from '@/components/free-charity-web-hosting/hosting'
import AboutFFCHosting from '@/components/free-charity-web-hosting/About-FFC-Hosting'
import ThreeCards from '@/components/free-charity-web-hosting/ThreeCards'
import BecomePartOfOurMission from '@/components/free-charity-web-hosting/BecomePartOfOurMission'
import ReadyToGetStarted from '@/components/free-charity-web-hosting/ReadyToGetStarted'
import ClientTestimonials from '@/components/free-charity-web-hosting/ClientTestimonials'
import FAQs from '@/components/free-charity-web-hosting/FAQs'

const index = () => {
  return (
    <div>
      <Hero />
      <Hosting />
      <AboutFFCHosting />
      <ThreeCards />
      <BecomePartOfOurMission />
      <ReadyToGetStarted />
      <ClientTestimonials />
      <FAQs />
      <ReadyToGetStarted />
    </div>
  )
}

export default index
