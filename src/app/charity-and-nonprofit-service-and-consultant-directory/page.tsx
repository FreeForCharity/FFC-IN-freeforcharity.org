import React from 'react'
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'

export const metadata: Metadata = {
  title: 'Charity and Nonprofit Service and Consultant Directory',
  description:
    'Find nonprofit consultants and service providers for marketing, legal, IT, HR, fundraising, and more. A free resource from Free For Charity.',
  alternates: {
    canonical: '/charity-and-nonprofit-service-and-consultant-directory',
  },
}

const topics = [
  'Marketing',
  'Legal expertise',
  'IT (information technology)',
  'HR (human resources)',
  'Fundraising',
  'Corporate structure',
]

const ServiceDirectoryPage = () => {
  return (
    <div>
      <HeroSection
        heading="Service & Consultant Directory"
        paragraph="A free directory connecting nonprofits with consultants and service providers across key operational areas."
        heroImg="/Images/donation.webp"
      />

      {/* Intro */}
      <section className="py-[60px] bg-[#fcfcfc]">
        <div className="w-[90%] md:w-[80%] max-w-[900px] mx-auto">
          <h2 className="text-[28px] md:text-[36px] font-[700] leading-[40px] text-center text-[#f27022] mb-8">
            Topics Covered by Services and Consultants
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {topics.map((topic) => (
              <div
                key={topic}
                className="bg-white rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] p-5 text-center"
              >
                <p className="text-[18px] font-[600] text-[#2583ab]">{topic}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6" id="lato-font">
            <p className="text-[18px] font-[500] leading-[28px] text-[#333]">
              Every nonprofit organization needs help from time to time and there is no reason why
              they can&apos;t ask for it through the various services and consultants that are out
              there. Many of the companies and consultants listed on the directory deal solely with
              nonprofits, so they are able to provide personalized service to nonprofit
              organizations.
            </p>

            <p className="text-[18px] font-[500] leading-[28px] text-[#333]">
              This directory is designed to provide assistance to nonprofit organizations in terms
              of how and why to choose a consultant. This process can be overwhelming, so being able
              to identify the various companies and consultants can help to simplify the process.
            </p>

            <p className="text-[18px] font-[500] leading-[28px] text-[#333]">
              This directory is also provided as a way for consultants and businesses to promote
              their services to nonprofit organizations. Many companies have no idea how to reach
              nonprofit organizations, even though they have a great product or service to offer.
            </p>

            <p className="text-[18px] font-[500] leading-[28px] text-[#333]">
              Free for Charity is a resource that, as the name implies, is free for charities.
              Charities are already doing something good for their community or for a specific
              cause, so they need to have the assistance they require available to them without
              adding a lot of work to their plate.
            </p>

            <p className="text-[18px] font-[500] leading-[28px] text-[#555] italic">
              Please note that a consultant listing on this website does not mean that Free for
              Charity is endorsing the services. The information provided on the website is simply
              for nonprofit organizations to gain access to services and consultants. It is up to
              each organization to research the company/consultant prior to engaging their services.
            </p>

            <p className="text-[18px] font-[500] leading-[28px] text-[#333]">
              The Charity and Nonprofit Service and Consultant Directory is constantly growing and
              evolving. The goal is for it to be a free resource. As nonprofits discuss their needs
              with Free for Charity, the directory is likely going to change in order to meet those
              needs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[50px] bg-[#2583ab]">
        <div className="w-[90%] md:w-[80%] max-w-[900px] mx-auto text-center">
          <h2 className="text-[28px] md:text-[36px] font-[700] text-white leading-[40px] mb-4">
            Want to Be Listed in the Directory?
          </h2>
          <p className="text-[18px] text-white/90 font-[500] leading-[28px] mb-6" id="lato-font">
            For more information about Free for Charity or to obtain information about being added
            to the directory, please contact us.
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

export default ServiceDirectoryPage
