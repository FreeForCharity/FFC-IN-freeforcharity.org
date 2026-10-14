import React from 'react'
import Link from 'next/link'
import { TRACKS, sectionsForTrack, type Track } from '@/data/application-fields'
import {
  getHelpTopic,
  helpPath,
  helpTopicsForTrack,
  type HelpTopicSlug,
} from '@/data/application-help'
import { HELP_TOPIC_CONTENT } from './help-topics'
import WrongTrackWarning from './WrongTrackWarning'
import ApplyBlock from './ApplyBlock'
import FieldTable from './FieldTable'

const linkClass = 'text-[#0567B1] underline font-[500]'

// Styles the shared help-topic copy (plain h2/h3/p/ul/ol/blockquote markup).
const copyClass = [
  'text-[17px] leading-[27px] text-[#333]',
  '[&_h2]:mt-[36px] [&_h2]:mb-[12px] [&_h2]:text-[26px] [&_h2]:font-[700] [&_h2]:leading-[34px] [&_h2]:text-[#111] [&_h2]:scroll-mt-[120px]',
  '[&_h3]:mt-[24px] [&_h3]:mb-[8px] [&_h3]:text-[20px] [&_h3]:font-[700] [&_h3]:text-[#111]',
  '[&_p]:mb-[14px]',
  '[&_ul]:mb-[14px] [&_ul]:list-disc [&_ul]:pl-[24px] [&_ol]:mb-[14px] [&_ol]:list-decimal [&_ol]:pl-[24px] [&_li]:mb-[6px]',
  '[&_a]:text-[#0567B1] [&_a]:underline',
  '[&_code]:rounded [&_code]:bg-[#f3f4f6] [&_code]:px-[4px] [&_code]:text-[15px]',
  '[&_blockquote]:my-[16px] [&_blockquote]:border-l-4 [&_blockquote]:border-[#0567B1]/40 [&_blockquote]:bg-[#f9fafb] [&_blockquote]:px-[16px] [&_blockquote]:py-[8px]',
].join(' ')

/**
 * One help topic as one form shows it (/501c3/help/<slug>/ or
 * /pre501c3/help/<slug>/): that form's requirements for the topic, the
 * wrong-form warning, the shared topic copy, and that form's Apply button.
 */
const HelpTopicPage: React.FC<{ track: Track; slug: HelpTopicSlug }> = ({ track, slug }) => {
  const info = TRACKS[track]
  const topic = getHelpTopic(slug)!
  const Content = HELP_TOPIC_CONTENT[slug]
  const sections = sectionsForTrack(track).filter((s) => topic.sections.includes(s.id))
  const otherTopics = helpTopicsForTrack(track).filter((t) => t.slug !== slug)

  return (
    <div className="ffc-container pt-[120px] pb-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-[8px] text-[15px]">
          <Link href={info.guidePath} className={linkClass}>
            ← {info.guideTitle}
          </Link>
        </p>
        <h1 className="mb-[12px] font-[var(--font-faustina)] text-[36px] leading-[46px] sm:text-[44px] sm:leading-[56px]">
          {topic.title}
        </h1>
        <p className="mb-[24px] text-[18px] leading-[28px] text-[#333]">{topic.summary}</p>

        <WrongTrackWarning track={track} idSuffix="top" />

        <section
          aria-labelledby="form-asks-heading"
          className="mt-[24px] rounded-[12px] border border-[#e5e7eb] bg-white p-[20px] sm:p-[24px]"
        >
          <h2
            id="form-asks-heading"
            className="mb-[12px] text-[22px] font-[700] leading-[30px] text-[#111]"
            data-font="lato-font"
          >
            What the {info.name} application asks
          </h2>
          {sections.map((section) => (
            <div key={section.id} className="mb-[18px] last:mb-0">
              <h3 className="mb-[6px] text-[17px] font-[700]">
                <Link href={`${info.guidePath}#${section.id}`} className={linkClass}>
                  {section.title}
                </Link>
              </h3>
              <FieldTable
                track={track}
                fields={section.fields}
                caption={`${section.title}: fields on the ${info.name} application`}
              />
            </div>
          ))}
        </section>

        <article className={`mt-[32px] ${copyClass}`}>
          <Content track={track} />
        </article>

        <div className="mt-[32px]">
          <ApplyBlock track={track} idSuffix="bottom" />
        </div>

        <nav
          aria-labelledby="more-help-heading"
          className="mt-[32px] rounded-[12px] bg-[#f2f8fd] p-[20px]"
        >
          <h2 id="more-help-heading" className="mb-[8px] text-[18px] font-[700] text-[#111]">
            More help with the {info.name} application
          </h2>
          <ul className="space-y-[6px] text-[16px]">
            <li>
              <Link href={info.guidePath} className={`${linkClass} font-[700]`}>
                Back to the {info.guideTitle}
              </Link>
            </li>
            {otherTopics.map((t) => (
              <li key={t.slug}>
                <Link href={helpPath(track, t.slug)} className={linkClass}>
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default HelpTopicPage
