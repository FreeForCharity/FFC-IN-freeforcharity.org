import React from 'react'
import Link from 'next/link'
import {
  APPLICATION_FIELDS_POLICY,
  REQUIREMENT_LABELS,
  TRACKS,
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
import WrongTrackWarning from './WrongTrackWarning'
import ApplyBlock from './ApplyBlock'
import FieldTable from './FieldTable'

const h3 = 'text-[13px] font-[700] uppercase tracking-wide text-[#555] mb-[4px]'
const linkClass = 'text-[#0567B1] underline font-[500]'

export function StepByStepLinks({ hrefs }: { hrefs: string[] }) {
  const resolved = hrefs
    .map((href) => resolveApplicationFieldLink(href))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))
  if (resolved.length === 0) return null
  return (
    <div className="mt-[18px]">
      <h3 className={h3}>Step-by-step help</h3>
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
    <div className="mt-[18px] rounded-[8px] bg-[#f2f8fd] px-[14px] py-[10px]">
      <h3 className={h3}>In-depth help</h3>
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

/** Every question this form asks, numbered with literal text so it pastes cleanly. */
function ApplicationWorksheet({ track }: { track: Track }) {
  let n = 0
  const groups = worksheetForTrack(track).map((group) => ({
    title: group.title,
    items: group.items.map((item) => ({ ...item, number: ++n })),
  }))
  return (
    <section
      id="worksheet"
      aria-labelledby="worksheet-heading"
      className="mb-[40px] scroll-mt-[120px] rounded-[12px] border-2 border-[#0567B1]/40 bg-white p-[20px] sm:p-[24px]"
    >
      <h2
        id="worksheet-heading"
        className="mb-[8px] text-[26px] font-[700] leading-[34px] text-[#111]"
        data-font="lato-font"
      >
        Application worksheet
      </h2>
      <p className="mb-[18px] text-[16px] leading-[25px] text-[#333]">
        Every question on the {TRACKS[track].name} application, in the order the form shows them.
        Select the list, copy it into your Word document or Google Doc, and write your answer under
        each question.
      </p>
      <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-[18px] text-[15px] text-[#111]">
        {groups.map((group) => (
          <div key={group.title} className="mb-[16px] last:mb-0">
            <h3 className="mb-[4px] font-[700]">{group.title}</h3>
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
    </section>
  )
}

/**
 * One application's field guide: /501c3/application-guide/ or
 * /pre501c3/application-guide/. Shows only the fields that form asks, with
 * that form's requirements, and the form's own Apply button. Section ids are
 * stable: WHMCS deep-links each field to #<section id>.
 */
const ApplicationGuide: React.FC<{ track: Track }> = ({ track }) => {
  const info = TRACKS[track]
  const sections = sectionsForTrack(track)
  return (
    <div className="ffc-container pt-[120px] pb-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-[8px] text-[15px]">
          <Link href={info.onboardingPath} className={linkClass}>
            ← {info.name} Onboarding Guide
          </Link>{' '}
          ·{' '}
          <Link href="/application-guide/" className={linkClass}>
            Which application is mine?
          </Link>
        </p>
        <h1 className="mb-[16px] font-[var(--font-faustina)] text-[40px] leading-[50px] sm:text-[48px] sm:leading-[60px]">
          {info.guideTitle}
        </h1>
        <p className="mb-[24px] text-[18px] leading-[28px] text-[#333]">
          Every field on the {info.name} application: whether you need it, why we ask, and how to
          get it for free.
        </p>

        <WrongTrackWarning track={track} idSuffix="top" />

        <section
          aria-labelledby="required-fields-policy"
          className="mt-[24px] rounded-[10px] border-2 border-[#b35000] bg-[#fff7f0] px-[20px] py-[18px]"
        >
          <h2
            id="required-fields-policy"
            className="mb-[8px] text-[22px] font-[700] leading-[30px] text-[#9a3412]"
            data-font="lato-font"
          >
            {APPLICATION_FIELDS_POLICY.title}
          </h2>
          {APPLICATION_FIELDS_POLICY.body.map((paragraph) => (
            <p
              key={paragraph}
              className="mb-[8px] text-[16px] leading-[25px] text-[#333] last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </section>

        <section
          aria-labelledby="save-answers"
          className="mt-[24px] rounded-[10px] border border-[#0567B1]/40 bg-[#f2f8fd] px-[20px] py-[18px]"
        >
          <h2
            id="save-answers"
            className="mb-[8px] text-[22px] font-[700] leading-[30px] text-[#04508c]"
            data-font="lato-font"
          >
            Save every answer in a Word document or Google Doc first
          </h2>
          <p className="mb-[10px] text-[16px] leading-[25px] text-[#333]">
            Before you put anything into our form, type or paste each answer into a Word document on
            your computer or a Google Doc. Then copy each answer from your document into the form.
            If a field is rejected or you have to resubmit, nothing is lost: your answers are still
            in your document.
          </p>
          <p className="mb-[14px] text-[16px] leading-[25px] text-[#333]">
            Keep the document after you apply. It’s also useful when we build your website. The{' '}
            <a href="#worksheet" className={linkClass}>
              application worksheet
            </a>{' '}
            below lists every question in order, ready to copy into it.
          </p>
          <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
            <div className="rounded-[8px] border border-[#0567B1]/20 bg-white p-[14px]">
              <h3 className="mb-[4px] text-[16px] font-[700] text-[#111]">Microsoft Word</h3>
              <p className="text-[15px] leading-[23px] text-[#444]">
                Open Word, choose <strong>File</strong>, then <strong>New</strong>, then{' '}
                <strong>Blank document</strong>. Choose <strong>Save</strong> and give it a name
                you’ll find again, such as “FFC application”.
              </p>
            </div>
            <div className="rounded-[8px] border border-[#0567B1]/20 bg-white p-[14px]">
              <h3 className="mb-[4px] text-[16px] font-[700] text-[#111]">Google Docs</h3>
              <p className="text-[15px] leading-[23px] text-[#444]">
                Go to{' '}
                <a
                  href="https://docs.new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  docs.new
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>{' '}
                to start a blank document, then click “Untitled document” at the top left to rename
                it. Google saves it for you as you type.
              </p>
            </div>
          </div>
        </section>

        <p className="mt-[24px] mb-[32px] text-[17px] leading-[27px] text-[#222]">
          <strong>Read this whole page before you start:</strong> the application’s first question
          asks you to confirm you have (see{' '}
          <a href="#before-you-start" className={linkClass}>
            Before you start
          </a>
          ).
        </p>

        <nav
          aria-labelledby="toc-heading"
          className="mb-[40px] rounded-[12px] border border-[#e5e7eb] bg-white p-[20px] shadow-sm"
        >
          <h2 id="toc-heading" className="mb-[12px] text-[18px] font-[700] text-[#111]">
            On this page
          </h2>
          <ol className="grid grid-cols-1 gap-x-[24px] gap-y-[6px] sm:grid-cols-2">
            <li>
              <a href="#worksheet" className={`${linkClass} text-[15px] font-[700]`}>
                Application worksheet (copy into your document)
              </a>
            </li>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className={`${linkClass} text-[15px]`}>
                  {section.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#apply-bottom" className={`${linkClass} text-[15px] font-[700]`}>
                Apply
              </a>
            </li>
          </ol>
        </nav>

        <ApplicationWorksheet track={track} />

        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="mb-[32px] scroll-mt-[120px] rounded-[12px] border border-[#e5e7eb] bg-white p-[20px] sm:p-[24px]"
          >
            <h2
              id={`${section.id}-heading`}
              className="mb-[14px] text-[24px] font-[700] leading-[32px] text-[#111]"
              data-font="lato-font"
            >
              {section.title}
            </h2>
            <div className="mb-[18px]">
              <FieldTable
                track={track}
                fields={section.fields}
                caption={`Fields in this section: ${section.title}`}
              />
            </div>
            <h3 className={h3}>Why we ask</h3>
            <p className="mb-[14px] text-[16px] leading-[25px] text-[#333]">{section.why}</p>
            <h3 className={h3}>How to get it</h3>
            <p className="text-[16px] leading-[25px] text-[#333]">{section.how}</p>
            {section.optionalWhy && (
              <>
                <h3 className={`${h3} mt-[14px]`}>Why it’s optional</h3>
                <p className="text-[16px] leading-[25px] text-[#333]">{section.optionalWhy}</p>
              </>
            )}
            <HelpTopicLinks track={track} slugs={section.help} />
            <StepByStepLinks hrefs={section.hrefs} />
          </section>
        ))}

        <ApplyBlock track={track} idSuffix="bottom" />
      </div>
    </div>
  )
}

export default ApplicationGuide
