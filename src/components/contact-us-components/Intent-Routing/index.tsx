import React from 'react'
import Link from 'next/link'
import { hubUrl } from '@/lib/config'

/**
 * Intent-based contact routing (issue #414): sends each kind of visitor to
 * the channel that actually resolves their need, with honest response-time
 * expectations, instead of funneling everything into one inbox.
 */

interface IntentPath {
  heading: string
  body: string
  cta: { label: string; href: string; external?: boolean }
  expectation: string
}

const paths: IntentPath[] = [
  {
    heading: "I'm a supported charity and need help",
    body: 'Site changes, email problems, domain questions, or anything broken. Include your organization name, the page or address affected, and what you expected to happen.',
    cta: { label: 'Open the support portal', href: hubUrl(), external: true },
    expectation: 'Typical response: 1–2 business days. Something urgent? Say “urgent” up front.',
  },
  {
    heading: 'I want FFC to help my charity',
    body: 'Free domain, email at your own address, and a website — check what the program includes and start the application.',
    cta: { label: 'See Help for Charities', href: '/help-for-charities/' },
    expectation:
      'Check the charity FAQ and onboarding journey first — most questions are answered there.',
  },
  {
    heading: 'I want to volunteer',
    body: 'IT project managers, webmasters, designers, and M365 admins — training provided, real charities helped.',
    cta: { label: 'Explore volunteering', href: '/volunteer/' },
    expectation: 'The volunteer page lists roles and the application path.',
  },
  {
    heading: 'I want to donate or partner',
    body: '100% of donations reach the mission (0% processing fees), and corporate/technology partnerships multiply what volunteers can deliver.',
    cta: { label: 'Ways to give', href: '/donate/' },
    expectation:
      'Partnership inquiries: use the contact details below and mention your organization.',
  },
]

const IntentRouting = () => {
  return (
    <section className="ffc-container py-10" aria-labelledby="contact-routing-heading">
      <div className="max-w-5xl mx-auto">
        <h2
          id="contact-routing-heading"
          className="font-[var(--font-faustina)] text-[32px] leading-[40px] mb-6 text-center"
        >
          What brings you here?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {paths.map((path) => (
            <div key={path.heading} className="border border-gray-200 rounded-lg p-6 flex flex-col">
              <h3
                className="font-[var(--font-lato)] text-[20px] font-[600] text-[#333] mb-2"
                data-font="lato-font"
              >
                {path.heading}
              </h3>
              <p className="font-[var(--font-lato)] text-[16px] leading-[25px] text-[#555] mb-3 grow">
                {path.body}
              </p>
              {path.cta.external ? (
                <a
                  href={path.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[var(--font-lato)] text-[16px] font-[600] text-[#0567B1] underline"
                >
                  {path.cta.label} →
                </a>
              ) : (
                <Link
                  href={path.cta.href}
                  className="font-[var(--font-lato)] text-[16px] font-[600] text-[#0567B1] underline"
                >
                  {path.cta.label} →
                </Link>
              )}
              <p className="font-[var(--font-lato)] text-[13px] leading-[19px] text-[#767672] mt-2">
                {path.expectation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntentRouting
