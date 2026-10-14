/**
 * In-depth help topics for the two application guides, served per form at
 * /501c3/help/<slug>/ and /pre501c3/help/<slug>/. Each topic's content is
 * written once (src/components/application-guide/help-topics/) and rendered
 * only under the forms it applies to.
 *
 * These replace the /intake-help/ pages that used to live on ffcadmin.org.
 * Topics that were too thin to stand alone are folded into a fuller page or
 * into a guide section (see FOLDED_HELP_TOPICS), so no help page has less
 * substance than the guide section it expands.
 */
import type { Track } from './application-fields'

export type HelpTopicSlug =
  | 'mission-statement'
  | 'getting-501c3'
  | 'board-requirements'
  | 'public-contact-info'
  | 'mailing-address'
  | 'social-media'
  | 'guidestar-candid'

export interface HelpTopic {
  slug: HelpTopicSlug
  title: string
  /** One-line summary under the title (and the meta description). */
  summary: string
  /** The forms this topic applies to. */
  tracks: Track[]
  /** Guide section ids this topic expands; their fields make the requirement table. */
  sections: string[]
}

export const HELP_TOPICS: HelpTopic[] = [
  {
    slug: 'mission-statement',
    title: 'Writing your mission, tagline and program descriptions',
    summary:
      'How to write a mission statement a stranger understands, plus the tagline, descriptions and programs we build your website from.',
    tracks: ['501c3', 'pre501c3'],
    sections: ['mission', 'site-content', 'programs'],
  },
  {
    slug: 'getting-501c3',
    title: 'Getting to 501(c)(3)',
    summary:
      'The path from new group to IRS-recognized charity: incorporating, a free EIN, bylaws, Form 1023 or 1023-EZ, and fiscal sponsorship.',
    tracks: ['pre501c3'],
    sections: ['legal-status', 'ein'],
  },
  {
    slug: 'board-requirements',
    title: 'Board requirements',
    summary:
      'Why we ask for a Chair, Secretary and Treasurer with working LinkedIn profiles, and how to get your board ready before you apply.',
    tracks: ['501c3', 'pre501c3'],
    sections: ['officers', 'officer-linkedin', 'other-board', 'team-members', 'site-leaders'],
  },
  {
    slug: 'public-contact-info',
    title: 'Contact information: public and private',
    summary:
      'The phone, email and location your website footer shows, the private contacts we work with, and free ways to set up charity-owned ones.',
    tracks: ['501c3', 'pre501c3'],
    sections: ['contacts', 'public-contact'],
  },
  {
    slug: 'mailing-address',
    title: 'Choosing a mailing address',
    summary:
      'Why your footer shows only a city and state, and your options when you need a mailing address: PO box, commercial mailbox or registered agent.',
    tracks: ['501c3', 'pre501c3'],
    sections: ['public-contact'],
  },
  {
    slug: 'social-media',
    title: 'Setting up your charity’s social media',
    summary:
      'The Facebook and LinkedIn Pages the application requires, how they differ from personal profiles, and the optional channels.',
    tracks: ['501c3', 'pre501c3'],
    sections: ['charity-social', 'other-social'],
  },
  {
    slug: 'guidestar-candid',
    title: 'Your Candid (GuideStar) profile and Gold Seal',
    summary:
      'Claiming your free Candid profile, reaching the Gold Seal of Transparency, and finding the two links the 501(c)(3) application asks for.',
    tracks: ['501c3'],
    sections: ['candid'],
  },
]

/**
 * Former ffcadmin.org /intake-help/ topics that are not pages of their own:
 * each is covered by a section of a fuller help page, or by a guide section.
 */
export const FOLDED_HELP_TOPICS: Record<string, string> = {
  '501c3-application': '/pre501c3/help/getting-501c3/#form-1023',
  'fiscal-sponsorship': '/pre501c3/help/getting-501c3/#fiscal-sponsorship',
  'supporting-documents': '/<track>/help/public-contact-info/#public-and-private',
  'policy-pages': '/<track>/application-guide/#template',
}

export function getHelpTopic(slug: string): HelpTopic | undefined {
  return HELP_TOPICS.find((t) => t.slug === slug)
}

export function helpTopicsForTrack(track: Track): HelpTopic[] {
  return HELP_TOPICS.filter((t) => t.tracks.includes(track))
}

export function helpTopicApplies(slug: string, track: Track): boolean {
  return getHelpTopic(slug)?.tracks.includes(track) ?? false
}

export function helpPath(track: Track, slug: HelpTopicSlug): string {
  return `/${track}/help/${slug}/`
}
