import React from 'react'
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'

export const metadata: Metadata = {
  title: 'Charity and Nonprofit Case Studies',
  description:
    'Real-world nonprofit case studies to help your organization make informed decisions without wasting time and money on experimentation.',
  alternates: {
    canonical: '/charity-and-nonprofit-case-studies',
  },
}

const orgTypes = [
  'Charities',
  'Hospitals',
  'Political organizations',
  'Legal & societies organizations',
  'Volunteer organizations',
]

const studyTopics = [
  'Professionals',
  'Business practitioners',
  'Board members',
  'Management practices',
  'Ways of using technology',
  'Comparison to others in the same sector',
]

const CaseStudiesPage = () => {
  return (
    <div>
      <HeroSection
        heading="Nonprofit Case Studies"
        paragraph="Real-world case studies to help nonprofit organizations make informed decisions and succeed."
        heroImg="/Images/donation.webp"
      />

      {/* Intro */}
      <section className="py-[60px] bg-[#fcfcfc]">
        <div className="w-[90%] md:w-[80%] max-w-[900px] mx-auto">
          <div className="space-y-6 mb-12" id="lato-font">
            <p className="text-[18px] font-[500] leading-[28px] text-[#333]">
              A nonprofit organization is the coming together of some groups of people for a purpose
              other than generating profit. And no part of the management income is shared or
              distributed to its members.
            </p>

            <p className="text-[18px] font-[500] leading-[28px] text-[#333]">
              How can they exist without profit? Case studies help us better understand.
            </p>
          </div>

          {/* Organization Types */}
          <div className="mb-12">
            <h2 className="text-[24px] md:text-[30px] font-[700] leading-[36px] text-[#f27022] mb-6">
              Types of Nonprofit Organizations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {orgTypes.map((type) => (
                <div
                  key={type}
                  className="bg-white rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] p-4 text-center"
                >
                  <p className="text-[16px] font-[600] text-[#2583ab]">{type}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What Case Studies Cover */}
          <div className="mb-12">
            <h2 className="text-[24px] md:text-[30px] font-[700] leading-[36px] text-[#f27022] mb-4">
              What Case Studies Cover
            </h2>
            <p className="text-[18px] font-[500] leading-[28px] text-[#333] mb-6" id="lato-font">
              What is a charity case study? It is a set of skills-based volunteer studies to answer
              the numerous questions people might have, accomplished by looking at real-life
              examples.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {studyTopics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-3 p-3 bg-white rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.05)]"
                >
                  <div className="w-2 h-2 bg-[#e88d33] rounded-full flex-shrink-0" />
                  <p className="text-[16px] font-[500] text-[#333]" id="lato-font">
                    {topic}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Case Studies */}
          <div className="space-y-6" id="lato-font">
            <p className="text-[18px] font-[500] leading-[28px] text-[#333]">
              You will not want to keep experimenting with the resources of your organization. You
              might end up getting what works but in most cases you might end up wasting your
              organization&apos;s money and precious time.
            </p>

            <p className="text-[18px] font-[500] leading-[28px] text-[#333]">
              A charity or nonprofit case study is a document that saves you money by helping the
              nonprofit management understand the competition. It also allows them a real choice
              without &quot;trial and error&quot; of every solution or method.
            </p>

            <p className="text-[18px] font-[500] leading-[28px] text-[#333]">
              Free for Charity has built these nonprofit charity case studies to help many nonprofit
              organizations in making a rightful decision without wasting time and money on
              experimentation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[50px] bg-[#2583ab]">
        <div className="w-[90%] md:w-[80%] max-w-[900px] mx-auto text-center">
          <h2 className="text-[28px] md:text-[36px] font-[700] text-white leading-[40px] mb-4">
            Have a Case Study Request?
          </h2>
          <p className="text-[18px] text-white/90 font-[500] leading-[28px] mb-6" id="lato-font">
            Contact us if you have a particular case study request or want to be featured in a case
            study.
          </p>
          <a
            href="/contact-us"
            className="inline-block px-[30px] py-[10px] text-white border border-[#f27022] rounded-[10px] text-[18px] bg-[#f27022] font-[600] shadow-md hover:shadow-[0px_12px_18px_-6px_#f27022] transition-all duration-300"
            id="montserrat-font"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}

export default CaseStudiesPage
