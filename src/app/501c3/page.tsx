import { pageMetadata } from '@/lib/page-metadata'
import HeroSection from '@/components/ui/HeroSection'
import HelpForCharitiesandNonprofit from '@/components/501c3-components/Help-For-Charities-and-Nonprofit'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import RequiredFieldsNotice from '@/components/ui/RequiredFieldsNotice'
import SaveAnswersFirst from '@/components/ui/SaveAnswersFirst'
import ReadyToGetStartedAndFaq from '@/components/501c3-components/Ready-to-get-started-and-faqs'
import CallSection from '@/components/help-for-charities-components/call-section'

export const metadata = pageMetadata({
  title: '501(c)(3) Onboarding Guide',
  description:
    'Apply to get a free website for your 501(c)(3)—a fast, secure GitHub Pages site built with AI—plus free domains, Microsoft 365 email, and technology tools from Free For Charity.',
  canonical: '/501c3/',
})

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
          href="/501c3/application-guide/"
          label="Read the 501(c)(3) Application Guide"
          description="Before you apply: every field on the 501(c)(3) application, why we ask, and how to get it for free."
        />
        <div className="mt-[20px]">
          <RequiredFieldsNotice track="501c3" />
        </div>
        <div className="mt-[20px]">
          <SaveAnswersFirst track="501c3" />
        </div>
      </div>
      <HelpForCharitiesandNonprofit />
      <ReadyToGetStartedAndFaq />
      <CallSection />
    </div>
  )
}

export default index
