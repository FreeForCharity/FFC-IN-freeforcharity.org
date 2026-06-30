import type { Metadata } from 'next'
import React from 'react'
import Hero from '@/components/free-charity-web-hosting/Hero'
import Hosting from '@/components/free-charity-web-hosting/hosting'
import AboutFFCHosting from '@/components/free-charity-web-hosting/About-FFC-Hosting'
import ThreeCards from '@/components/free-charity-web-hosting/ThreeCards'
import BecomePartOfOurMission from '@/components/free-charity-web-hosting/BecomePartOfOurMission'
import ReadyToGetStarted from '@/components/free-charity-web-hosting/ReadyToGetStarted'
import ClientTestimonials from '@/components/free-charity-web-hosting/ClientTestimonials'
import FAQs from '@/components/free-charity-web-hosting/FAQs'

export const metadata: Metadata = {
  title: 'Free Nonprofit Web Hosting',
  description:
    'Free website hosting for nonprofits—fast, secure GitHub Pages static sites built with AI development agents—plus free domain registration and Microsoft 365 email, with legacy WordPress hosting still available. Powered by Free For Charity volunteers.',
  alternates: { canonical: '/free-charity-web-hosting/' },
}

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
