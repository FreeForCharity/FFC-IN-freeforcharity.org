import HelpTopicPage from '@/components/application-guide/HelpTopicPage'
import {
  helpMetadata,
  helpSlugOrNotFound,
  helpStaticParams,
  type HelpRouteProps,
} from '@/components/application-guide/help-route'

export const dynamicParams = false

export function generateStaticParams() {
  return helpStaticParams('501c3')
}

export async function generateMetadata({ params }: HelpRouteProps) {
  return helpMetadata('501c3', (await params).slug)
}

export default async function Help501c3Page({ params }: HelpRouteProps) {
  const slug = helpSlugOrNotFound('501c3', (await params).slug)
  return <HelpTopicPage track="501c3" slug={slug} />
}
