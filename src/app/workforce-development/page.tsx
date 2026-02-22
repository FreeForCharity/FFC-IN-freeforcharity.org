import React from 'react'
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'

export const metadata: Metadata = {
  title: 'Workforce Development',
  description:
    'Free workforce development and training programs in web development and programming. Build your skills while helping charities.',
  alternates: {
    canonical: '/workforce-development',
  },
}

const webDevSkills = [
  'Website Maintenance',
  'WordPress Theme and Plugin Setup',
  'Content Creation',
  'Form Creation',
  'CSS Customization',
  'Basic HTML',
  'Microsoft Office 365 Skills',
]

const programmingSkills = [
  'Create Applications Using PHP, JavaScript, Python and More',
  'Use GitHub to Save Progress and Track Your Contributions Online',
  'Help Charities by Working on Production Systems',
  'Work With Common Business Applications and APIs',
  'Learn How to Manage Projects',
]

const WorkforceDevelopmentPage = () => {
  return (
    <div>
      <HeroSection
        heading="Workforce Development"
        paragraph="Build your career skills through hands-on experience helping nonprofits. Learn web development and programming while making a difference."
        heroImg="/Images/donation.webp"
      />

      {/* Main Content */}
      <section className="py-[60px] bg-[#fcfcfc]">
        <div className="w-[90%] md:w-[80%] max-w-[1000px] mx-auto">
          <h2 className="text-[30px] md:text-[40px] font-[700] leading-[44px] text-center text-[#f27022] mb-4">
            Workforce Development &amp; Training
          </h2>
          <div className="w-[18%] mx-auto h-[5px] bg-[#e88d33] mb-12" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Web Developer / Web Design */}
            <div className="bg-white rounded-[20px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.1)] p-8">
              <h3 className="text-[24px] font-[700] text-[#2583ab] leading-[32px] mb-4">
                Web Developer / Web Design
              </h3>
              <p className="text-[16px] font-[500] leading-[26px] text-[#333] mb-6" id="lato-font">
                Learn how to create and manage web pages. Use the tools and applications that are
                used every day by businesses. Learn new skills and practice them by making websites
                and applications for charities. You will be able to learn:
              </p>
              <ul className="space-y-3">
                {webDevSkills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 text-[16px] font-[500] text-[#333]"
                    id="lato-font"
                  >
                    <div className="w-2 h-2 bg-[#e88d33] rounded-full flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Programming */}
            <div className="bg-white rounded-[20px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.1)] p-8">
              <h3 className="text-[24px] font-[700] text-[#2583ab] leading-[32px] mb-4">
                Programming
              </h3>
              <p className="text-[16px] font-[500] leading-[26px] text-[#333] mb-6" id="lato-font">
                Build your resume and hone your skills by programming for nonprofits. Build your
                programming profile on GitHub. Help produce solutions for problems charities face
                every day. You will be able to:
              </p>
              <ul className="space-y-3">
                {programmingSkills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 text-[16px] font-[500] text-[#333]"
                    id="lato-font"
                  >
                    <div className="w-2 h-2 bg-[#e88d33] rounded-full flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-[14px] text-[#666] italic mt-8 text-center" id="lato-font">
            NOTE: Workforce Development Programs are only accessible to US citizens who are not dual
            citizens of any other nation.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[50px] bg-[#0c5575]">
        <div className="w-[90%] md:w-[80%] max-w-[900px] mx-auto text-center">
          <h3 className="text-[24px] md:text-[30px] font-[600] text-white leading-[36px] mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-[18px] text-white/90 font-[500] leading-[28px] mb-4" id="lato-font">
            Give a real person a text:
          </p>
          <p className="text-[20px] text-white font-[600] mb-6">
            Free For Charity Founder: Clarke Moyer{' '}
            <a href="tel:+15202228104" className="text-[#e88d33] underline">
              (520) 222-8104
            </a>
          </p>
          <a
            href="/volunteer"
            className="inline-block px-[30px] py-[10px] text-white border border-[#f27022] rounded-[10px] text-[18px] bg-[#f27022] font-[600] shadow-md hover:shadow-[0px_12px_18px_-6px_#f27022] transition-all duration-300"
            id="montserrat-font"
          >
            Volunteer Now
          </a>
        </div>
      </section>
    </div>
  )
}

export default WorkforceDevelopmentPage
