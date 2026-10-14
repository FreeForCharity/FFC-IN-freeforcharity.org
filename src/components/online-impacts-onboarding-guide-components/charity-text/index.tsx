import React from 'react'
import HelpForCharities from '@/components/ui/help-for-charity'
import Link from 'next/link'

const index = () => {
  return (
    <div className="w-full bg-[#FCFCFC]">
      <div className="w-full max-w-[90%] mx-auto pt-[20px]">
        <HelpForCharities
          title="Free For Charity 501c3 Supported Charity Products and Services for Former Online Impacts Supported Charities"
          description=""
        />
        <h1 className="text-[26px] font-[500] text-[#333] my-[20px]" data-font="lato-font">
          Lets get started on your transfer today
        </h1>
        <p className="text-[18px] font-[500] pb-[1em]" data-font="lato-font">
          Great News. As an Online Impacts supported charity you already have much of what you need
          to convert over to Free For Charity to support your .org domain name, professional
          website, email, and more!
        </p>
        <p className="text-[18px] font-[500]" data-font="lato-font">
          Under the Free For Charity model your .org domain is registered and managed through
          Cloudflare Registrar, your website is a fast, secure GitHub Pages static site that we
          build for you from the Free For Charity template, and your professional email runs on
          Microsoft 365 or Google Workspace once your 501(c)(3) status is confirmed. We handle the
          setup and ongoing management so you can focus on your mission.
        </p>
        <h1
          className="text-[23px] sm:text-[26px] font-[500] text-[#333] my-[20px] leading-[1.4]"
          data-font="lato-font"
        >
          We are here to help. If you run into any issues or have questions about the changes,
          please reach out directly to:
        </h1>

        <h1
          className="text-[23px] sm:text-[26px] font-[500] text-[#333] my-[20px] leading-[1.4]"
          data-font="lato-font"
        >
          Clarke Moyer the founder of Free For Charity at clarkemoyer@freeforcharity.org or text me
          at 520-222-8104
        </h1>
        <h1
          className="text-[23px] sm:text-[26px] font-[500] text-[#333] my-[20px] leading-[1.4]"
          data-font="lato-font"
        >
          Pardhasaradhi Namburi the founder of Online Impacts at pardhu@onlineimpacts.org
        </h1>
        <HelpForCharities
          title="About Free For Charity"
          description="Free For Charity is a US based 501c3 charity for charities that provides other US based 501(c)(3) organizations with free .org domain name registration, professional website design tools and templates, as well as ongoing website management and digital infrastructure services. Our mission is to empower charities with a strong digital presence, enabling them to effectively communicate their cause and engage supporters online. By offering these essential services always at no cost, we ensure that even small non-profits can present themselves professionally in the digital world, enhancing their visibility and impact."
          descriptionAlign="left"
        />

        <div className="w-full h-[1px] bg-[#2D7F87] mt-[30px] mb-[50px]"></div>
        <h2 className="text-[26px] font-[500] text-[#333] mt-[20px]" data-font="lato-font">
          Before You Begin Onboarding
        </h2>
        <p className="text-[18px] font-[500] pb-[1em]" data-font="lato-font">
          Everything the application asks for is explained, field by field, on its application page,
          with a copy-ready worksheet. Save every answer in a Word document or Google Doc first,
          then copy each one into the form.
        </p>
        <p className="text-[18px] font-[500] pb-[40px]" data-font="lato-font">
          Read the{' '}
          <Link href="/501c3/#field-guide" className="text-[#0567B1] underline">
            501(c)(3) application, field by field
          </Link>{' '}
          (or the{' '}
          <Link href="/pre501c3/#field-guide" className="text-[#0567B1] underline">
            pre-501(c)(3) application
          </Link>{' '}
          if the IRS has not recognized your organization yet).
        </p>
      </div>
    </div>
  )
}

export default index
