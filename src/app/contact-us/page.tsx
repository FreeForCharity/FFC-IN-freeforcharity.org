import { pageMetadata } from '@/lib/page-metadata'
import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import IntentRouting from '@/components/contact-us-components/Intent-Routing'
import ContactSection from '@/components/contact-us-components/Contact-Us'

export const metadata = pageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Free For Charity. We connect students, professionals, and businesses with charities in need of support.',
  canonical: '/contact-us/',
})

const index = () => {
  return (
    <div>
      <div>
        <HeroSection
          heading="Get In Touch with Free For Charity"
          paragraph="Connecting Students, Professionals, & Businesses with Charities in Need"
          heroImg="/Images/about-us.webp"
          fontSize={36}
          lineHeight={50}
          imageContainerWidth="w-[100%]"
        />

        <IntentRouting />
        <ContactSection />
      </div>
    </div>
  )
}

export default index
