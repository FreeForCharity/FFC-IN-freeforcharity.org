import React from 'react'
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import FaqSection from '@/components/free-training-programs-components/faq-section'

export const metadata: Metadata = {
  title: 'Free Training Programs',
  description:
    'Build real-world skills in business and technology through hands-on projects that help nonprofit organizations. Free for Charity offers training in research, business analysis, and web development.',
  alternates: {
    canonical: '/free-training-programs',
  },
}

const programs = [
  {
    title: 'Researchers',
    subtitle: 'Online and offline research and data control training program',
    level: 'Entry to mid-level program',
    description:
      'Everyone knows how to search the web to find what they need. Now it is time to move beyond Google and learn how to research and control data with Free for Charity projects. For our research projects you will help the whole nonprofit community. Your research is used by charities to make decisions on how best to use their resources.',
    skillNote:
      'In addition to helping charities you are starting to learn a key skill set of research and data control. These skills are geographically independent and you can help growing businesses from anywhere as an online employee.',
    salary: '$24,000 to $52,000 per year',
    cta: 'Click here now to sign up for the research and data control training programs with Free for Charity.',
  },
  {
    title: 'Business Analysts',
    subtitle: 'Online and offline business analyst training program',
    level: 'Entry to high-level program',
    description:
      'In your day to day life you might never meet a fully paid business or market analyst but you do make decisions about what to buy and from whom every day. That is the basic level of what a company or product analyst does. Free for Charity is offering a program to train you on how to take that skill of comparing products, companies, and services to a professional level.',
    skillNote:
      'This means something as simple as a comparison between two similar products based on your research or something as complex as deciding what types of products meet a specific business need. Most people with the formal title of Business Analyst have a college degree but many employers still want to see work product to back it up.',
    salary: '$52,898 average per year',
    cta: 'Click here now to sign up for the business analyst training program with Free for Charity.',
  },
  {
    title: 'Web Developers',
    subtitle: 'Website, web application, web development training program',
    level: 'Entry to high-level program',
    description:
      'From creating free charity websites to creating engaging content for a charity; web developers are critical members of any team. You can learn or expand on your skills in the Free for Charity web developer training program. With such a broad range of skills it is common for someone to be an expert in a single area.',
    skillNote: '',
    salary: '$69,781 average per year',
    cta: 'Click here now to sign up for the web developer training program with Free for Charity.',
  },
]

const FreeTrainingProgramsPage = () => {
  return (
    <div>
      <HeroSection
        heading="Free Training Programs"
        paragraph="Build real-world skills in business and technology through hands-on projects that help nonprofit organizations."
        heroImg="/Images/donation.webp"
      />

      {/* Win-Win-Win */}
      <section className="py-[60px] bg-[#fcfcfc]">
        <div className="w-[90%] md:w-[80%] max-w-[1000px] mx-auto">
          <h2 className="text-[28px] md:text-[36px] font-[700] leading-[40px] text-center text-[#b35000] mb-4">
            Free Training Programs in Business and Technology Skills
          </h2>
          <div className="w-[18%] mx-auto h-[5px] bg-[#b35000] mb-8" />

          <p
            className="text-[18px] font-[500] leading-[28px] text-[#333] text-center mb-8"
            id="lato-font"
          >
            At Free for Charity the projects you will work on while training and expanding your
            skills will help both Free for Charity directly and the assisted charities that we work
            with. It is truly a win-win-win.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] p-6 text-center">
              <div className="text-[40px] mb-2">&#127891;</div>
              <h3 className="text-[18px] font-[700] text-[#1D6E90] mb-2">You Win</h3>
              <p className="text-[15px] font-[500] text-[#333]" id="lato-font">
                Get training and skills in real work needed by for-profit and nonprofits alike.
              </p>
            </div>
            <div className="bg-white rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] p-6 text-center">
              <div className="text-[40px] mb-2">&#10084;&#65039;</div>
              <h3 className="text-[18px] font-[700] text-[#1D6E90] mb-2">Charities Win</h3>
              <p className="text-[15px] font-[500] text-[#333]" id="lato-font">
                Instead of your work never being seen again after training, your projects are all
                real-world things needed today.
              </p>
            </div>
            <div className="bg-white rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] p-6 text-center">
              <div className="text-[40px] mb-2">&#127775;</div>
              <h3 className="text-[18px] font-[700] text-[#1D6E90] mb-2">FFC Wins</h3>
              <p className="text-[15px] font-[500] text-[#333]" id="lato-font">
                Free for Charity captures your skills and motivation to bring efficiencies to the
                nonprofit industry as a whole.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-[60px] bg-white">
        <div className="w-[90%] md:w-[80%] max-w-[1000px] mx-auto">
          <h2 className="text-[28px] md:text-[36px] font-[700] leading-[40px] text-center text-[#333] mb-12">
            Our Programs
          </h2>

          <div className="space-y-10">
            {programs.map((program) => (
              <div
                key={program.title}
                className="bg-[#fcfcfc] rounded-[20px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.08)] p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h3 className="text-[26px] font-[700] text-[#1D6E90]">{program.title}</h3>
                  <span className="text-[14px] font-[600] text-white bg-[#b35000] px-3 py-1 rounded-full w-fit">
                    {program.level}
                  </span>
                </div>
                <p className="text-[16px] font-[600] text-[#555] italic mb-4">{program.subtitle}</p>
                <div className="space-y-4" id="lato-font">
                  <p className="text-[16px] font-[500] leading-[26px] text-[#333]">
                    {program.description}
                  </p>
                  {program.skillNote && (
                    <p className="text-[16px] font-[500] leading-[26px] text-[#333]">
                      {program.skillNote}
                    </p>
                  )}
                  <p className="text-[16px] font-[600] text-[#1D6E90]">
                    Average salary: {program.salary}
                  </p>
                </div>
                <a
                  href="/volunteer"
                  className="inline-block mt-6 px-[24px] py-[8px] text-white border border-[#b35000] rounded-[10px] text-[16px] bg-[#b35000] font-[600] shadow-md hover:shadow-[0px_12px_18px_-6px_#b35000] transition-all duration-300"
                  id="montserrat-font"
                >
                  Sign Up Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  )
}

export default FreeTrainingProgramsPage
