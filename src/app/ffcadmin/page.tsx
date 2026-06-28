import type { Metadata } from 'next'
import React from 'react'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'

export const metadata: Metadata = {
  title: 'FFC Admin',
  description: 'Free For Charity internal administration portal.',
  robots: { index: false, follow: false },
}

const index = () => {
  return (
    <div className="min-h-screen w-[90%] max-w-[640px] mx-auto flex flex-col items-center justify-center text-center gap-[20px]">
      <h1 className="text-[34px] font-[600] text-[#333]">FFC Admin</h1>
      <p className="text-[16px] leading-[26px] font-[500] text-[#555]">
        The Free For Charity administration and training portal—covering the current GitHub Pages +
        AI-driven development workflow, charity onboarding, and volunteer guides—lives at FFC Admin.
      </p>
      <div className="w-full max-w-[480px]">
        <AdminGuideLink
          href={ffcAdminUrl(adminLinks.ffcadmin.newModel)}
          label="Go to the FFC Admin portal"
          description="All step-by-step admin, developer, and onboarding guides are maintained here."
        />
      </div>
    </div>
  )
}

export default index
