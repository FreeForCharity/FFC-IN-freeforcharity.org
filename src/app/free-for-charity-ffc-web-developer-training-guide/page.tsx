import type { Metadata } from 'next'
import React from 'react'
import Hero from '@/components/free-for-charity-ffc-web-developer-training-guide-components/Hero'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'

export const metadata: Metadata = {
  title: 'Web Developer Training Guide',
  description:
    'FFC web developer training for the modern stack—building GitHub Pages static sites with AI development agents (Claude and GitHub Copilot), Next.js, Cloudflare, and Microsoft 365—with the legacy WordPress workflow retained for existing sites.',
  alternates: { canonical: '/free-for-charity-ffc-web-developer-training-guide/' },
}

const index = () => {
  return (
    <div>
      <div className="" data-font="segoe-font">
        <Hero />
        <div className="w-[90%] max-w-[760px] mx-auto mt-[32px] mb-[48px]">
          <AdminGuideLink
            href={ffcAdminUrl(adminLinks['web-developer-training'].newModel)}
            description="The current developer training—setting up Claude-driven development and building charity sites—lives on the FFC Admin portal."
          />
          <div className="mt-[16px]">
            <AdminGuideLink
              variant="legacy"
              href={ffcAdminUrl(adminLinks['web-developer-training'].legacy)}
              description="The WordPress developer workflow below is retained as a labeled legacy reference for existing sites."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
