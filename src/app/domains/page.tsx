import { pageMetadata } from '@/lib/page-metadata'
import React from 'react'
import Hero from '@/components/domains/Hero'
import DearProspective from '@/components/domains/Dear-Prospective'
import CheckYourOrg from '@/components/domains/Check-Your-Org'
import OrderYourDomain from '@/components/domains/Order-Your-Domain'
import VerifyYourDomain from '@/components/domains/Verify-Your-Domain'
import SetupEmailHosting from '@/components/domains/Setup-Email-Hosting'
import CurvedBlueSection from '@/components/domains/Curved-Blue-Section'
import CurvedBlackSection from '@/components/domains/Curved-Black-Section'
import GetNewWebsite from '@/components/domains/Get-New-Website'

export const metadata = pageMetadata({
  title: 'Free Domains for Nonprofits',
  description:
    'Free For Charity provides free domain registration, DNS management, and email setup for verified 501(c)(3) nonprofit organizations.',
  canonical: '/domains/',
})

const index = () => {
  return (
    <div>
      <div className="pt-[80px]">
        <Hero />
        <DearProspective />
        <CheckYourOrg />
        <OrderYourDomain />
        <VerifyYourDomain />
        <SetupEmailHosting />
        <CurvedBlueSection />
        <CurvedBlackSection />
        <GetNewWebsite />
      </div>
    </div>
  )
}

export default index
