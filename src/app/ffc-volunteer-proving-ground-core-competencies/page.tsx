import type { Metadata } from 'next'
import React from 'react'
import Header from '@/components/ffc-volunteer-proving-ground-core-competencies/Header'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'

export const metadata: Metadata = {
  title: 'Volunteer Proving Ground: Core Competencies',
  description:
    'Mandatory first step for FFC volunteers. Learn foundational tools for security and effective collaboration in nonprofit technology services—and the path into our AI-driven static-site development workflow.',
  alternates: { canonical: '/ffc-volunteer-proving-ground-core-competencies/' },
}
import ContentSection from '@/components/ffc-volunteer-proving-ground-core-competencies/ContentSection'
import Modulessection from '@/components/ffc-volunteer-proving-ground-core-competencies/Modules-section'
import Footer from '@/components/ffc-volunteer-proving-ground-core-competencies/Footer'

const index = () => {
  return (
    <div className="w-full pt-[150px]" data-font="segoe-font">
      <div className="w-full max-w-[90%] md:max-w-[80%] md:p-[2rem] mx-auto">
        <Header />
        <ContentSection />
        <div className="max-w-[760px] mx-auto my-[32px]">
          <AdminGuideLink
            href={ffcAdminUrl(adminLinks['volunteer-core-competencies'].newModel)}
            description="See the full volunteer onboarding and the contributor ladder on the FFC Admin portal."
          />
        </div>
        <Modulessection />
        <Footer />
      </div>
    </div>
  )
}

export default index
