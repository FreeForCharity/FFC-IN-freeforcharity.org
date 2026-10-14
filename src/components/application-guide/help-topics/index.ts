import type React from 'react'
import type { Track } from '@/data/application-fields'
import type { HelpTopicSlug } from '@/data/application-help'
import MissionStatement from './MissionStatement'
import Getting501c3 from './Getting501c3'
import BoardRequirements from './BoardRequirements'
import PublicContactInfo from './PublicContactInfo'
import MailingAddress from './MailingAddress'
import SocialMedia from './SocialMedia'
import GuidestarCandid from './GuidestarCandid'

/** One content component per help topic, shared by both forms' help pages. */
export const HELP_TOPIC_CONTENT: Record<HelpTopicSlug, React.ComponentType<{ track: Track }>> = {
  'mission-statement': MissionStatement,
  'getting-501c3': Getting501c3,
  'board-requirements': BoardRequirements,
  'public-contact-info': PublicContactInfo,
  'mailing-address': MailingAddress,
  'social-media': SocialMedia,
  'guidestar-candid': GuidestarCandid,
}
