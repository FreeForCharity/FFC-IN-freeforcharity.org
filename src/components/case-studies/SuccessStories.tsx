import React from 'react'
import Link from 'next/link'
import caseStudiesData from '@/data/case-studies.json'

/**
 * FFC success stories (issue #378): before/after case studies of charities
 * FFC serves. Only entries with status 'published' render — consent is
 * governed by /publicity-consent-policy/ and recorded per entry in
 * src/data/case-studies.json.
 */

interface CaseStudy {
  slug: string
  organization: string
  website: string
  status: string
  problem: string
  provided: string[]
  outcome: string
  quote: { text: string; author: string; role: string }
}

const published = (caseStudiesData.caseStudies as CaseStudy[]).filter(
  (s) => s.status === 'published'
)

export default function SuccessStories() {
  if (published.length === 0) return null
  return (
    <section className="py-[60px] bg-white">
      <div className="w-[90%] md:w-[80%] max-w-[900px] mx-auto">
        <h2 className="text-[28px] md:text-[36px] font-[700] leading-[42px] text-[#b35000] mb-3">
          Free For Charity Success Stories
        </h2>
        <p
          className="text-[18px] font-[500] leading-[28px] text-[#333] mb-10"
          data-font="lato-font"
        >
          Real charities we serve: what they were missing, what FFC provided free of charge, and
          what changed. Every story is published with the organization&rsquo;s consent under our{' '}
          <Link href="/publicity-consent-policy/" className="text-[#0567B1] underline">
            publicity &amp; story consent policy
          </Link>
          .
        </p>

        <div className="space-y-10">
          {published.map((study) => (
            <article
              key={study.slug}
              id={study.slug}
              className="bg-[#fcfcfc] rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] p-6 md:p-8"
            >
              <h3 className="text-[24px] font-[700] leading-[32px] text-[#1D6E90] mb-4">
                {study.website ? (
                  <a
                    href={study.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {study.organization}
                  </a>
                ) : (
                  study.organization
                )}
              </h3>

              <div
                className="space-y-4 text-[17px] font-[500] leading-[27px] text-[#333]"
                data-font="lato-font"
              >
                <p>
                  <span className="font-[700]">The challenge: </span>
                  {study.problem}
                </p>
                <div>
                  <p className="font-[700] mb-1">What FFC provided — free:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {study.provided.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <p>
                  <span className="font-[700]">The result: </span>
                  {study.outcome}
                </p>
              </div>

              {study.quote.text && (
                <blockquote
                  className="mt-5 border-l-4 border-[#b35000] pl-4 italic text-[17px] leading-[27px] text-[#555]"
                  data-font="lato-font"
                >
                  &ldquo;{study.quote.text}&rdquo;
                  <footer className="not-italic mt-2 text-[15px] font-[600] text-[#333]">
                    — {study.quote.author}
                    {study.quote.role ? `, ${study.quote.role}` : ''}
                  </footer>
                </blockquote>
              )}
            </article>
          ))}
        </div>

        <p className="text-[17px] font-[500] leading-[27px] text-[#333] mt-8" data-font="lato-font">
          Want your charity&rsquo;s story here? It starts with free services:{' '}
          <Link href="/help-for-charities/" className="text-[#0567B1] underline">
            see what FFC provides
          </Link>{' '}
          or{' '}
          <Link href="/contact-us/" className="text-[#0567B1] underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
