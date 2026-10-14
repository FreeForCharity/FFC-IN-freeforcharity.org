import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { pageMetadata } from '@/lib/page-metadata'
import { TRACKS, type Track } from '@/data/application-fields'
import {
  getHelpTopic,
  helpPath,
  helpTopicsForTrack,
  type HelpTopicSlug,
} from '@/data/application-help'

/**
 * Shared plumbing for the two help routes (src/app/501c3/help/[slug] and
 * src/app/pre501c3/help/[slug]): each form only builds the topics that apply
 * to it, so /501c3/help/getting-501c3/ simply does not exist.
 */
export type HelpRouteProps = { params: Promise<{ slug: string }> }

export function helpStaticParams(track: Track): { slug: string }[] {
  return helpTopicsForTrack(track).map((t) => ({ slug: t.slug }))
}

/** The topic slug for this form, or a 404 if the topic does not apply to it. */
export function helpSlugOrNotFound(track: Track, slug: string): HelpTopicSlug {
  const topic = getHelpTopic(slug)
  if (!topic || !topic.tracks.includes(track)) notFound()
  return topic.slug
}

export function helpMetadata(track: Track, slug: string): Metadata {
  const topic = getHelpTopic(slug)
  if (!topic || !topic.tracks.includes(track)) return {}
  return pageMetadata({
    title: `${topic.title} (${TRACKS[track].name} application)`,
    description: topic.summary,
    canonical: helpPath(track, topic.slug),
  })
}
