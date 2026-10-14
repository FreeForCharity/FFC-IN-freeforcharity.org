import React from 'react'
import { HOW_IT_WORKS_STEPS } from '@/data/journey'
import { sectionH2 } from './styles'

interface HowItWorksProps {
  /** Heading level; the journey page nests it under its own h1 as an h2 too. */
  heading?: string
  id?: string
}

/**
 * The ONE canonical "How it works" step list (src/data/journey.ts
 * HOW_IT_WORKS_STEPS), shared by both application pages, the hosting page and
 * the onboarding-journey page so the steps and times cannot drift.
 */
const HowItWorks: React.FC<HowItWorksProps> = ({
  heading = 'How it works',
  id = 'how-it-works',
}) => (
  <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-[120px]">
    <h2 id={`${id}-heading`} className={sectionH2} data-font="lato-font">
      {heading}
    </h2>
    <ol className="space-y-[10px]" data-testid="how-it-works-steps">
      {HOW_IT_WORKS_STEPS.map((step, i) => (
        <li
          key={step.title}
          className="flex gap-[14px] rounded-[10px] border border-[#e5e7eb] bg-white p-[16px]"
        >
          <span
            aria-hidden="true"
            className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#0567B1] text-[17px] font-[700] text-white"
          >
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="text-[17px] font-[700] text-[#111]">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}{' '}
              <span className="ml-[4px] rounded-full bg-[#f3f4f6] px-[8px] py-[1px] text-[13px] font-[600] text-[#374151]">
                {step.who === 'You' ? 'You' : 'Free For Charity'}
              </span>
            </p>
            <p className="mt-[4px] text-[16px] leading-[25px] text-[#444]">{step.detail}</p>
            <p className="mt-[4px] text-[14px] font-[600] text-[#5b6470]">
              Typical time: {step.time}
            </p>
          </div>
        </li>
      ))}
    </ol>
    <p className="mt-[12px] text-[15px] text-[#555]">
      Times are typical, not promises: we’re all volunteers.
    </p>
  </section>
)

export default HowItWorks
