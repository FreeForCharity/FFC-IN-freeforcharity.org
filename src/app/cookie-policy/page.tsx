import type { Metadata } from 'next'
import React from 'react'
import WhatAreCookies from '@/components/cookie-policy-components/WhatAreCookies'
import HowWeUseCookies from '@/components/cookie-policy-components/HowWeUseCookies'
import TypesOfCookiesWeUse from '@/components/cookie-policy-components/TypesOfCookiesWeUse'
import HowToManageCookies from '@/components/cookie-policy-components/HowToManageCookies'
import AdditionalInfo from '@/components/cookie-policy-components/AdditionalInfo'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Free For Charity cookie policy explaining how we use cookies and similar tracking technologies on our website.',
  alternates: { canonical: '/cookie-policy' },
}

// Update this date when the policy changes
const LAST_UPDATED = 'November 26, 2025'

export default function CookiePolicy() {
  return (
    <div className="pt-[140px] pb-[54px]">
      <div className="py-[27px] w-[90%] md:w-[80%] mx-auto">
        <div id="aria-font">
          <h1 className="text-[30px] text-[#333] pb-[10px] leading-[1em] font-[500]">
            <strong>Cookie Policy</strong>
          </h1>
          <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
            <em>Last Updated: {LAST_UPDATED}</em>
          </p>

          <WhatAreCookies />
          <HowWeUseCookies />
          <TypesOfCookiesWeUse />
          <HowToManageCookies />
          <AdditionalInfo />
        </div>
      </div>
    </div>
  )
}
