import React from 'react'
import Image from 'next/image'
import DomainCard from '@/components/ui/Domain-Card'
import { IoCall } from 'react-icons/io5'
import { IoMdMail } from 'react-icons/io'
import { hubUrl } from '@/lib/config'
import { assetPath } from '@/lib/assetPath'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'

const index = () => {
  return (
    <div className="py-[40px]">
      <div className="w-[90%] mx-auto">
        <div className="pt-[24px] pb-[3px] w-[80%] mx-auto">
          <h1
            className="mt-[2px] mb-[12px] pb-[10px] text-[30px] md:text-[35px] font-[700] leading-[46px] text-[#0567B1] text-center"
            data-font="cantata-font"
          >
            YOUR DOMAIN IS MANAGED IN CLOUDFLARE
          </h1>
          <p
            className="mb-[13px] w-full lg:w-[85%] mx-auto font-[500] text-[20px] leading-[30px] text-center"
            data-font="raleway-font"
          >
            Your domain is registered and managed for you in Cloudflare by Free For Charity. There
            is nothing for you to verify — unlike a traditional registrar, there are no verification
            emails that you need to act on.
          </p>
          <p
            className="mt-[30px] font-[600] text-[27px] leading-[35px] text-center"
            data-font="raleway-font"
          >
            So what do you actually do? Just one thing: get admin access.
          </p>
        </div>
      </div>

      <div className="w-[90%] md:w-[80%] max-w-[1080px] mx-auto pt-[22px]">
        <div className="mb-[13px] w-full md:w-fit max-w-[610px] text-[23px] text-black leading-[1.3em] rounded-[10px] overflow-hidden p-[30px] mx-auto bg-cover bg-center shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Image */}
            <div className="mb-4 md:mb-0 md:mr-4">
              <div className="relative h-[100px] w-[100px]">
                <Image
                  src={assetPath('/Images/1.webp')}
                  fill
                  alt="Cloudflare managed domain"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              <h2
                className="text-[31px] font-[700] leading-[31px] pb-[10px]"
                data-font="cantata-font"
              >
                Step 1
              </h2>
              <p className="text-[23px] font-[500] leading-[30px]" data-font="raleway-font">
                Create a free personal Cloudflare account and send us the email address you used. We
                add that email as a domain admin on your organization&apos;s domain — repeat for
                anyone on your team who needs access.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-[13px] max-w-[610px] mx-auto">
          <AdminGuideLink
            href={ffcAdminUrl(adminLinks['cloudflare-account'].newModel)}
            label="Cloudflare account setup guide on FFC Admin"
            description="New to Cloudflare? Our step-by-step guide walks you through creating your free personal account with two-factor authentication so it's ready for our invite. One important rule: don't add your domain to your personal account — we manage it for you in the FFC Cloudflare account."
          />
        </div>

        {/* Bottom note */}
        <p className="font-[500] text-[20px] leading-[30px] text-center" data-font="raleway-font">
          There are a few things to keep in mind.
        </p>
      </div>

      <div className="w-[87%] max-w-[1300px] mx-auto py-[22px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[35px] items-stretch">
        <DomainCard
          imageSrc="/Images/1.webp"
          imageAlt="Cloudflare managed domain icon"
          text="There are no verification emails to accept — Free For Charity manages your domain in Cloudflare on your behalf."
        />
        <DomainCard
          imageSrc="/Images/2.webp"
          imageAlt="Support ticket icon"
          text="Need a DNS record or any domain change? Open a support ticket and an FFC volunteer will take care of it for you."
        />
        <DomainCard
          imageSrc="/Images/3.webp"
          imageAlt="Team access icon"
          text="Add as many teammates as you need — send us each person's Cloudflare account email and we grant them domain-admin access."
        />
      </div>

      <div className="w-[90%] md:w-[80%] max-w-[1080px] mx-auto pt-[22px]">
        <div className="mb-[13px] w-full md:w-fit max-w-[610px] text-[23px] text-black leading-[1.3em] rounded-[10px] overflow-hidden p-[30px] mx-auto bg-cover bg-center shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Image */}
            <div className="mb-4 md:mb-0 md:mr-4">
              <div className="relative h-[100px] w-[100px]">
                <Image
                  src={assetPath('/Images/2.webp')}
                  fill
                  alt="domain management hub"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              <h2
                className="text-[31px] font-[700] leading-[31px] pb-[10px]"
                data-font="cantata-font"
              >
                Step 2
              </h2>
              <p
                className="text-[23px] font-[500] leading-[30px] pb-[1em]"
                data-font="raleway-font"
              >
                Any DNS or domain change goes through a support ticket. You can view your domain
                anytime by accessing our system with the account you created at checkout.
              </p>
              <a
                href={hubUrl()}
                data-font="raleway-font"
                className="italic text-[23px] font-[500] leading-[46px] break-all"
              >
                https://freeforcharity.org/hub
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[30px] py-[50px] mt-[50px] md:w-[80%] max-w-[1080px] mx-auto flex flex-col lg:flex-row">
        {/* Left Column */}
        <div className="w-full lg:w-[47.25%] md:mr-[46px] mb-8 md:mb-0">
          <div className="mt-[2px] mb-[12px]">
            <h2
              className="pb-[10px] text-[#333] text-[35px] font-[700] leading-[46px] text-center"
              data-font="cantata-font"
            >
              Have any Question
            </h2>
          </div>
          <p
            className="w-full md:w-[85%] mx-auto text-[27px] font-[600] leading-[35px] text-center"
            data-font="raleway-font"
          >
            If at anytime after your order has been placed you have any questions about your domain
            please contact
          </p>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-auto md:pl-[15px] flex flex-col items-center lg:items-start">
          <h2
            className="pb-[10px] mt-2 mb-[12px] text-[35px] font-[700] leading-[46px] text-center lg:text-left"
            data-font="cantata-font"
          >
            Contact <br /> Clarke Moyer
          </h2>

          <div className="mb-[10px] flex items-center">
            <IoCall className="text-[34px] font-[400] leading-[34px] text-[#0460C0]" />
            <a
              href="tel:+15202228104"
              className="pl-[15px] text-[28px] font-[500] leading-[42px] text-[#0567B1]"
              data-font="raleway-font"
            >
              520-222-8104
            </a>
          </div>
          <div className="mt-[3px] flex items-center">
            <IoMdMail className="text-[34px] font-[400] leading-[34px] text-[#0460C0]" />
            <a
              href="mailto:clarkemoyer@freeforcharity.org"
              className="text-center pl-[15px] text-[28px] font-[500] leading-[42px] text-[#0567B1] break-all  inline-block"
              data-font="raleway-font"
            >
              clarkemoyer@freeforcharity.org
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
