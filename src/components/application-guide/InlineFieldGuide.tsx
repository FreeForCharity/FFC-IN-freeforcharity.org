import React from 'react'
import Link from 'next/link'
import {
  REQUIREMENT_LABELS,
  TRACKS,
  fieldRequirement,
  resolveApplicationFieldLink,
  sectionsForTrack,
  worksheetForTrack,
  type Track,
} from '@/data/application-fields'
import {
  getHelpTopic,
  helpPath,
  helpTopicApplies,
  type HelpTopicSlug,
} from '@/data/application-help'
import FieldTable from './FieldTable'
import HashAutoExpand from './HashAutoExpand'
import { linkClass, sectionH2, smallH } from './styles'

const groupClass =
  'group scroll-mt-[120px] rounded-[12px] border border-[#e5e7eb] bg-white open:shadow-sm'
const summaryClass =
  'flex cursor-pointer list-none items-center justify-between gap-[12px] px-[18px] py-[14px] [&::-webkit-details-marker]:hidden'

function Chevron() {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 text-[20px] text-[#0567B1] transition-transform group-open:rotate-90"
    >
      ›
    </span>
  )
}

export function StepByStepLinks({ hrefs }: { hrefs: string[] }) {
  const resolved = hrefs
    .map((href) => resolveApplicationFieldLink(href))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))
  if (resolved.length === 0) return null
  return (
    <div className="mt-[16px]">
      <h4 className={smallH}>Step-by-step help</h4>
      <ul className="list-disc space-y-[4px] pl-[20px]">
        {resolved.map((link) => (
          <li key={link.href} className="text-[15px]">
            {link.external ? (
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function HelpTopicLinks({ track, slugs }: { track: Track; slugs?: HelpTopicSlug[] }) {
  const topics = (slugs ?? [])
    .filter((slug) => helpTopicApplies(slug, track))
    .map((slug) => getHelpTopic(slug)!)
  if (topics.length === 0) return null
  return (
    <div className="mt-[16px] rounded-[8px] bg-[#f2f8fd] px-[14px] py-[10px]">
      <h4 className={smallH}>In-depth help</h4>
      <ul className="space-y-[4px]">
        {topics.map((topic) => (
          <li key={topic.slug} className="text-[15px]">
            <Link href={helpPath(track, topic.slug)} className={`${linkClass} font-[700]`}>
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Section 6 of an application page: the field guide, inline, as collapsible
 * groups in the form's display order, showing only this form's fields. Each
 * group keeps its stable section id, so WHMCS can deep-link /501c3/#ein and
 * HashAutoExpand opens and scrolls to it. The worksheet is #worksheet.
 */
const InlineFieldGuide: React.FC<{ track: Track }> = ({ track }) => {
  const info = TRACKS[track]
  const sections = sectionsForTrack(track)
  let n = 0
  const worksheet = worksheetForTrack(track).map((group) => ({
    title: group.title,
    items: group.items.map((item) => ({ ...item, number: ++n })),
  }))

  return (
    <section id="field-guide" aria-labelledby="field-guide-heading" className="scroll-mt-[120px]">
      <HashAutoExpand />
      <h2 id="field-guide-heading" className={sectionH2} data-font="lato-font">
        The application, field by field
      </h2>
      <p className="mb-[16px] text-[17px] leading-[27px] text-[#333]">
        Every question on the {info.name} application, in the order the form asks it: whether you
        need it, why we ask, and how to get it for free. Open a group to read it.
      </p>

      <div className="space-y-[10px]">
        <details id="worksheet" className={`${groupClass} border-2 border-[#0567B1]/40`}>
          <summary className={summaryClass}>
            <span>
              <h3 className="inline text-[19px] font-[700] text-[#111]">Application worksheet</h3>
              <span className="ml-[8px] text-[14px] text-[#555]">
                every question, ready to copy into your document
              </span>
            </span>
            <Chevron />
          </summary>
          <div className="px-[18px] pb-[18px]">
            <p className="mb-[14px] text-[16px] leading-[25px] text-[#333]">
              Select the list, copy it into your Word document or Google Doc, and write your answer
              under each question.
            </p>
            <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-[16px] text-[15px] text-[#111]">
              {worksheet.map((group) => (
                <div key={group.title} className="mb-[14px] last:mb-0">
                  <h4 className="mb-[4px] font-[700]">{group.title}</h4>
                  <ol className="list-none space-y-[2px]">
                    {group.items.map((item) => (
                      <li key={item.number}>
                        {item.number}. {item.label} ({REQUIREMENT_LABELS[item.requirement]})
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </details>

        {sections.map((section) => {
          const required = section.fields.filter((f) => fieldRequirement(f, track) === 'R').length
          const optional = section.fields.length - required
          return (
            <details key={section.id} id={section.id} className={groupClass}>
              <summary className={summaryClass}>
                <span>
                  <h3 className="inline text-[19px] font-[700] text-[#111]">{section.title}</h3>
                  <span className="ml-[8px] whitespace-nowrap text-[14px] text-[#555]">
                    {required > 0 ? `${required} required` : ''}
                    {required > 0 && optional > 0 ? ', ' : ''}
                    {optional > 0 ? `${optional} optional` : ''}
                  </span>
                </span>
                <Chevron />
              </summary>
              <div className="px-[18px] pb-[18px]">
                <div className="mb-[16px]">
                  <FieldTable
                    track={track}
                    fields={section.fields}
                    caption={`Fields in this section: ${section.title}`}
                  />
                </div>
                <h4 className={smallH}>Why we ask</h4>
                <p className="mb-[12px] text-[16px] leading-[25px] text-[#333]">{section.why}</p>
                <h4 className={smallH}>How to get it</h4>
                <p className="text-[16px] leading-[25px] text-[#333]">{section.how}</p>
                {section.optionalWhy && (
                  <>
                    <h4 className={`${smallH} mt-[12px]`}>Why it’s optional</h4>
                    <p className="text-[16px] leading-[25px] text-[#333]">{section.optionalWhy}</p>
                  </>
                )}
                <HelpTopicLinks track={track} slugs={section.help} />
                <StepByStepLinks hrefs={section.hrefs} />
              </div>
            </details>
          )
        })}
      </div>
    </section>
  )
}

export default InlineFieldGuide
