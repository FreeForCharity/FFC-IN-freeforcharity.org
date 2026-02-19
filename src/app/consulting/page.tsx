import React from 'react'
import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'

export const metadata: Metadata = {
  title: 'Consulting',
  description:
    'Free nonprofit consulting services from Free For Charity. Get expert help with charity operations, technology, and strategy at no cost.',
  alternates: {
    canonical: '/consulting',
  },
}

const ConsultingPage = () => {
  return (
    <div>
      <HeroSection
        heading="Charity Consulting"
        paragraph="Free For Charity provides free consulting services to nonprofits. Our team helps charities with technology, operations, and strategy — all at no cost."
        heroImg="/Images/donation.webp"
      />

      {/* Main Content */}
      <section className="py-[60px] bg-[#fcfcfc]">
        <div className="w-[90%] md:w-[80%] max-w-[900px] mx-auto text-center">
          <h2 className="text-[30px] md:text-[40px] font-[700] leading-[44px] text-[#f27022] mb-6">
            Need Any Charity Consulting?
          </h2>

          <p
            className="text-[18px] md:text-[20px] font-[500] leading-[28px] md:leading-[30px] text-[#333] mb-8"
            id="lato-font"
          >
            Have questions about consultation services? Want to know more about nonprofits? Looking
            to chat? Give a real person a call for free:
          </p>

          <div className="bg-white rounded-[20px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.1)] p-8 inline-block">
            <p className="text-[22px] font-[600] text-[#2583ab]">Clarke Moyer</p>
            <a
              href="tel:+15202228104"
              className="text-[24px] font-[700] text-[#f27022] hover:underline"
            >
              (520) 222-8104
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[50px] bg-[#2583ab]">
        <div className="w-[90%] md:w-[80%] max-w-[900px] mx-auto text-center">
          <h2 className="text-[28px] md:text-[36px] font-[700] text-white leading-[40px] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-[18px] text-white/90 font-[500] leading-[28px] mb-6" id="lato-font">
            Reach out today and let us help your nonprofit succeed.
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

export default ConsultingPage
