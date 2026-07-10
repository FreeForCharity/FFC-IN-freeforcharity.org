import React from 'react'
import Image from 'next/image'
import { assetPath } from '@/lib/assetPath'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'

const index = () => {
  return (
    <div className="pt-[40px] pb-[81px] ">
      <div className="w-[80%] mx-auto">
        <div className="pt-[24px] pb-[3px]">
          <h1
            className="mt-[2px] mb-[12px] pb-[10px] text-[30px] md:text-[35px] font-[700] leading-[46px] text-[#0567B1] text-center"
            data-font="cantata-font"
          >
            HOW TO SET UP EMAIL HOSTING FOR THE NEW DOMAIN
          </h1>
          <p
            className="mb-[13px] w-[85%] mx-auto font-[500] text-[20px] leading-[30px] text-center"
            data-font="raleway-font"
          >
            Email hosting means you get email addresses at your own domain — like
            board@yourcharity.org. It&apos;s a 501(c)(3) benefit: eligible nonprofits get it free
            through Microsoft 365 or Google Workspace.
          </p>
        </div>
      </div>

      <div className="w-[90%] md:w-[87%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between py-[27px] mx-auto gap-[35px]">
        <a
          href="mailto:yourname@yourdomain.org"
          className="bg-white rounded-[8px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)] 
    border-l-[8px] border-[#0567B1]
    p-[20px] text-center text-[20px] md:text-[22px] font-[600] leading-[31px] text-[#0567B1]
    break-words inline-block"
          data-font="raleway-font"
        >
          yourname@yourdomain.org
        </a>

        <a
          href="mailto:contactus@yourdomain.org"
          className="bg-white rounded-[8px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)] 
    border-l-[8px] border-[#0567B1]
    p-[20px] text-center text-[20px] md:text-[22px] font-[600] leading-[31px] text-[#0567B1]
    break-words inline-block"
          data-font="raleway-font"
        >
          contactus@yourdomain.org
        </a>

        <a
          href="mailto:board@yourdomain.org"
          className="bg-white rounded-[8px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)] 
    border-l-[8px] border-[#0567B1]
    p-[20px] text-center text-[20px] md:text-[22px] font-[600] leading-[31px] text-[#0567B1]
    break-words inline-block"
          data-font="raleway-font"
        >
          board@yourdomain.org
        </a>
      </div>

      <div className="w-[90%] md:w-[80%] max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-[27px] gap-[33px] items-stretch justify-between">
        <div className="p-[20px] text-center bg-white rounded-[10px] overflow-hidden pt-[30px] pr-[20px] pb-[30px] pl-[20px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)]">
          {/* Circle Image */}
          <div className="mx-auto flex-shrink-0 w-[100px] h-[100px] overflow-hidden mb-[30px]">
            <Image
              src={assetPath('/Images/1.webp')}
              alt="Step Illustration"
              width={56}
              height={56}
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <h2
            className="text-[31px] font-[700] leading-[31px] pb-[30px] text-[#0567B1]"
            data-font="cantata-font"
          >
            Step 1
          </h2>
          <p
            className="text-[#333] text-[22px] font-[700] leading-[22px] text-center pb-[10px]"
            data-font="raleway-font"
          >
            Select an email provider
          </p>

          {/* Text Content */}
          <p className="text-[18px] leading-[32px] font-[500]" data-font="raleway-font">
            Choose the provider that fits your charity: Microsoft 365 or Google Workspace. Both are
            free for eligible 501(c)(3) nonprofits and come with many additional collaboration
            services at no cost.
          </p>
        </div>

        <div className="p-[20px] text-center bg-white rounded-[10px] overflow-hidden pt-[30px] pr-[20px] pb-[30px] pl-[20px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)]">
          {/* Circle Image */}
          <div className="mx-auto flex-shrink-0 w-[100px] h-[100px] overflow-hidden mb-[30px]">
            <Image
              src={assetPath('/Images/2.webp')}
              alt="Step Illustration"
              width={56}
              height={56}
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <h2
            className="text-[31px] font-[700] leading-[31px] pb-[30px] text-[#0567B1]"
            data-font="cantata-font"
          >
            Step 2
          </h2>
          <p
            className="text-[#333] text-[22px] font-[700] leading-[22px] text-center pb-[10px]"
            data-font="raleway-font"
          >
            Set up a Microsoft 365 Business Premium account
          </p>

          {/* Text Content */}
          <p className="text-[18px] leading-[32px] font-[500] pb-[1em]" data-font="raleway-font">
            Follow the following simple steps to set up your Microsoft 365 Business Premium Account
          </p>
          <a
            href="/domains/#setupstep2"
            className="text-[25px] leading-[32px] font-[600] text-[#0460C0]"
            data-font="raleway-font"
          >
            See the Microsoft 365 setup steps
          </a>
        </div>

        <div className="p-[20px] text-center bg-white rounded-[10px] overflow-hidden pt-[30px] pr-[20px] pb-[30px] pl-[20px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)]">
          {/* Circle Image */}
          <div className="mx-auto flex-shrink-0 w-[100px] h-[100px] overflow-hidden mb-[30px]">
            <Image
              src={assetPath('/Images/3.webp')}
              alt="Step Illustration"
              width={56}
              height={56}
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <h2
            className="text-[31px] font-[700] leading-[31px] pb-[30px] text-[#0567B1]"
            data-font="cantata-font"
          >
            Step 3
          </h2>
          <p
            className="text-[#333] text-[22px] font-[700] leading-[22px] text-center pb-[10px]"
            data-font="raleway-font"
          >
            Or set up a Google Workspace account
          </p>

          {/* Text Content */}
          <p className="text-[18px] leading-[32px] font-[500] pb-[1em]" data-font="raleway-font">
            Prefer Google? Follow these simple steps to set up your Google Workspace for Nonprofits
            account
          </p>
          <a
            href="/google-for-nonprofits-guide/"
            className="text-[25px] leading-[32px] font-[600] text-[#0460C0]"
            data-font="raleway-font"
          >
            See the Google Workspace setup steps
          </a>
        </div>
      </div>

      <div className="w-[90%] md:w-[80%] max-w-[680px] mx-auto mt-[40px] flex flex-col gap-[20px]">
        <AdminGuideLink
          href={ffcAdminUrl(adminLinks.domains.newModel)}
          label="Full Microsoft 365 email guide on FFC Admin"
          description="Follow the full Microsoft 365 email setup guide on the FFC Admin portal."
        />
        <AdminGuideLink
          href="/google-for-nonprofits-guide/"
          label="Full Google Workspace email guide"
          description="Prefer Google? Follow the full Google Workspace for Nonprofits setup guide."
        />
      </div>
    </div>
  )
}

export default index
