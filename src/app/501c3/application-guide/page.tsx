import { pageMetadata } from '@/lib/page-metadata'
import ApplicationGuide from '@/components/application-guide/ApplicationGuide'

export const metadata = pageMetadata({
  title: '501(c)(3) Application Guide',
  description:
    'Every field on the Free For Charity 501(c)(3) application: whether it is required, why we ask, how to get it for free, and a copy-ready worksheet.',
  canonical: '/501c3/application-guide/',
})

export default function Application501c3GuidePage() {
  return <ApplicationGuide track="501c3" />
}
