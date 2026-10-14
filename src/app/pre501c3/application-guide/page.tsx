import { pageMetadata } from '@/lib/page-metadata'
import ApplicationGuide from '@/components/application-guide/ApplicationGuide'

export const metadata = pageMetadata({
  title: 'Pre-501(c)(3) Application Guide',
  description:
    'Every field on the Free For Charity pre-501(c)(3) application: whether it is required, why we ask, how to get it for free, and a copy-ready worksheet.',
  canonical: '/pre501c3/application-guide/',
})

export default function ApplicationPre501c3GuidePage() {
  return <ApplicationGuide track="pre501c3" />
}
