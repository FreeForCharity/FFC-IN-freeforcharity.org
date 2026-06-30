import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import HelpForCharitiesandNonprofit from '@/components/501c3-components/Help-For-Charities-and-Nonprofit'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'
import ReadyToGetStartedAndFaq from '@/components/501c3-components/Ready-to-get-started-and-faqs'
import CallSection from '@/components/help-for-charities-components/call-section'

export const metadata: Metadata = {
  title: '501(c)(3) Onboarding Guide',
  description:
    'Apply to get a free website for your 501(c)(3)—a fast, secure GitHub Pages site built with AI—plus free domains, Microsoft 365 email, and technology tools from Free For Charity.',
  alternates: { canonical: '/501c3/' },
}

const index = () => {
  return (
    <div>
      <HeroSection
        heading="501(c)3 Onboarding Guide"
        paragraph="Apply to get a free, professionally built website for your charity—a fast, secure GitHub Pages site built with AI—plus free .org domains, Microsoft 365 email, and technology tools. Start your application below; you get instant access to many of our free products right away."
        heroImg="/Images/volunteer.webp"
      />
      <div className="w-[90%] max-w-[720px] mx-auto mt-[32px]">
        <AdminGuideLink
          href={ffcAdminUrl(adminLinks.onboarding.newModel)}
          description="Before you apply: review the charity prerequisites and the full step-by-step onboarding on the FFC Admin portal."
        />
      </div>
      <HelpForCharitiesandNonprofit />
      <ReadyToGetStartedAndFaq />
      <CallSection />
    </div>
  )
}

export default index
