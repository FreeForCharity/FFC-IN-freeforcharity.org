'use client'

import React from 'react'
import AccordionItem from '@/components/ui/Accordian'

const faqs = [
  {
    question:
      'How do your training programs in business and technology fields help me to get employment in the real world?',
    answer:
      'Our training programs provide hands-on experience with real nonprofit projects. You build a portfolio of work that demonstrates your skills to potential employers, while learning tools and methods used in professional settings every day.',
  },
  {
    question:
      'How do we offer free classes and projects when a college or for-profit company costs thousands of dollars?',
    answer:
      'We are a 501(c)(3) nonprofit organization. Our training programs are funded through donations and volunteer effort. The projects you work on directly benefit charities, creating a mutually beneficial model that does not require tuition.',
  },
  {
    question: 'What do you require of someone to join your programs?',
    answer:
      'We require a willingness to learn and a commitment to helping nonprofits. There are no prerequisites or fees. You just need a computer, internet access, and the motivation to build new skills while making a difference.',
  },
]

const FaqSection = () => {
  return (
    <section className="py-[60px] bg-[#f5f5f5]">
      <div className="w-[90%] md:w-[80%] max-w-[900px] mx-auto">
        <h2 className="text-[28px] md:text-[36px] font-[700] leading-[40px] text-center text-[#333] mb-8">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, idx) => (
          <AccordionItem key={faq.question} number={String(idx + 1)} title={` ${faq.question}`}>
            {faq.answer}
          </AccordionItem>
        ))}

        <div className="text-center mt-8">
          <p className="text-[18px] font-[600] text-[#f27022]" id="lato-font">
            Sign up today and start learning these new skills while helping charities.
          </p>
        </div>
      </div>
    </section>
  )
}

export default FaqSection
