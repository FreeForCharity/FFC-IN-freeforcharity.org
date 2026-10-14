import HelpTopicPage from '@/components/application-guide/HelpTopicPage'
import {
  helpMetadata,
  helpSlugOrNotFound,
  helpStaticParams,
  type HelpRouteProps,
} from '@/components/application-guide/help-route'

export const dynamicParams = false

export function generateStaticParams() {
  return helpStaticParams('pre501c3')
}

export async function generateMetadata({ params }: HelpRouteProps) {
  return helpMetadata('pre501c3', (await params).slug)
}

export default async function HelpPre501c3Page({ params }: HelpRouteProps) {
  const slug = helpSlugOrNotFound('pre501c3', (await params).slug)
  return <HelpTopicPage track="pre501c3" slug={slug} />
}
