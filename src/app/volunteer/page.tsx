import type { Metadata } from 'next'
import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import FreeForCharity from '@/components/volunteer/Free-For-Charity'

export const metadata: Metadata = {
  title: 'Volunteer',
  description:
    'Become a Free For Charity volunteer. Gain marketable skills in technology while helping nonprofits with domains, websites, and IT services.',
  alternates: { canonical: '/volunteer' },
}

const index = () => {
  return (
    <div>
      <HeroSection
        heading="Become A Volunteer"
        paragraph="We are always looking for individuals and business to support our training programs. Both donations as well as performing volunteer work for our training programs are critical to the success of Free For Charity and it’s mission."
        heroImg="/Images/volunteer-hero.webp"
        imageContainerWidth="w-[100%]"
      />
      <FreeForCharity />
    </div>
  )
}

export default index
