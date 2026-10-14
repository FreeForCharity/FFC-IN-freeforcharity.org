import { pageMetadata } from '@/lib/page-metadata'
import HeroSection from '@/components/ui/HeroSection'
import TrackPage from '@/components/application-guide/TrackPage'

export const metadata = pageMetadata({
  title: '501(c)(3) Application',
  description:
    'Apply to Free For Charity as an IRS-recognized 501(c)(3): who qualifies, what you commit to, how it works, and every application field explained, with one Apply button.',
  canonical: '/501c3/',
})

/** The single page for the 501(c)(3) application (WHMCS pid 33). */
const index = () => {
  return (
    <div>
      <HeroSection
        heading="501(c)(3) Application"
        paragraph="Apply to get a free, professionally built website for your charity (a fast, secure GitHub Pages site built with AI), plus a free .org domain and Microsoft 365 email. Everything you need to apply is on this one page."
        heroImg="/Images/volunteer.webp"
      />
      <TrackPage track="501c3" />
    </div>
  )
}

export default index
