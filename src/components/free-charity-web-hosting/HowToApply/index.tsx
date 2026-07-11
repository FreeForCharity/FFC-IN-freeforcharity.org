import React from 'react'
import Link from 'next/link'

interface Step {
  number: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '1',
    title: 'Check your eligibility',
    description:
      'Answer five quick questions to confirm your nonprofit qualifies and see which free programs fit — domain, email, website, or a migration.',
  },
  {
    number: '2',
    title: 'Apply & get validated',
    description:
      'Submit the onboarding form with your EIN and legal name. We verify your IRS status and Candid profile, then confirm program fit — usually within a few days.',
  },
  {
    number: '3',
    title: 'We build your site',
    description:
      'Send your logo, photos, and mission text. A volunteer registers your domain, sets up Microsoft 365, and builds your site, reviewing it with you along the way.',
  },
  {
    number: '4',
    title: 'Launch & stay supported',
    description:
      'Your site goes live on your .org domain. We keep it hosted and maintained so it stays fast, secure, and online — free, going forward.',
  },
]

const HowToApply = () => {
  return (
    <section id="how-to-apply" className="py-[60px] bg-[#F5F8FB] scroll-mt-[120px]">
      <div className="w-[90%] lg:w-[80%] max-w-[1200px] mx-auto">
        <div className="text-center max-w-[720px] mx-auto mb-[48px]">
          <h2
            className="mb-[14px] text-[31px] font-[700] leading-[38px] text-[#0567B1]"
            data-font="cantata-font"
          >
            How to apply — four simple steps
          </h2>
          <p className="text-[18px] font-[500] leading-[29px] text-[#333]" data-font="raleway-font">
            The whole process is guided. You bring your mission and content; we handle the technical
            work.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[28px] mb-[44px]">
          {steps.map((step) => (
            <li
              key={step.number}
              className="relative bg-white rounded-[10px] p-[28px] pt-[36px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.12)] border border-[#e6edf3]"
            >
              <span
                className="absolute -top-[22px] left-[24px] flex items-center justify-center w-[44px] h-[44px] rounded-full bg-[#0567B1] text-white text-[20px] font-[700] shadow-[0px_2px_10px_0px_rgba(5,103,177,0.4)]"
                data-font="cantata-font"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3
                className="mb-[10px] text-[19px] font-[700] leading-[25px] text-[#1a2e35]"
                data-font="cantata-font"
              >
                {step.title}
              </h3>
              <p
                className="text-[16px] font-[500] leading-[25px] text-[#555]"
                data-font="raleway-font"
              >
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-[16px]">
          <a
            href="#apply"
            className="inline-flex items-center justify-center rounded-[10px] bg-[#0567B1] px-[28px] py-[15px] text-[17px] font-[700] text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-[#045a9b]"
            data-font="raleway-font"
          >
            Start your application
          </a>
          <Link
            href="/charity-onboarding-journey/"
            className="inline-flex items-center justify-center rounded-[10px] border-2 border-[#0567B1] px-[28px] py-[15px] text-[17px] font-[700] text-[#0567B1] transition-colors duration-200 hover:bg-[#0567B1]/5"
            data-font="raleway-font"
          >
            See the full onboarding journey
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HowToApply
