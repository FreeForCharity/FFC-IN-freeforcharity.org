import React from 'react'
import Image from 'next/image'
import { assetPath } from '@/lib/assetPath'

const Index = () => {
  return (
    <div className="relative pb-[74px]">
      {' '}
      {/* 👈 This makes bottom div position correctly */}
      <div className="w-[90%] md:w-[80%] max-w-[1080px] mx-auto relative z-[2]">
        <div className="relative py-[27px] flex flex-col md:flex-row items-start">
          {/* Image Section */}
          <div className="relative w-full md:w-[48.5%] h-[350px] mb-[25px] md:mb-0 md:mr-[32px]">
            <Image
              src={assetPath('/Images/domains-black-section.webp')}
              alt="domains-blue-section"
              fill
              className="object-contain rounded-[10px]"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-[48.5%] text-[15px] leading-[1.6]">
            <ul
              className="list-disc pl-[20px] text-[17px] leading-[26px] font-[500]"
              data-font="raleway-font"
            >
              <li>
                NOTE: Save your admin account name (e.g. yourcharity.onmicrosoft.com) in a password
                manager, use a unique password, and turn on multi-factor authentication.
              </li>
              <li>
                Add your domain in the Microsoft 365 admin center. When Microsoft shows the DNS
                verification codes, send them to us: Free For Charity adds the DNS records for you.
                You never edit DNS yourself.
              </li>
              <li>
                Stuck? Open a ticket with Microsoft, or text Free For Charity at 520-222-8104.
              </li>
            </ul>
          </div>
        </div>

        <div className="py-[27px]">
          <p
            className="text-[14px] font-[500] leading-[24px] text-[#666] pt-[25px]"
            data-font="aria-font"
          >
            DOMAIN NAME COUPON Thank you for choosing us to help with your domain name and email
            setup. Apply on the 501(c)(3) or pre-501(c)(3) application page and the coupon arrives
            in your acceptance email — hold onto it. The domain order itself unlocks later, once
            your website is live and you have approved it. Checkout shows a $1 verification charge,
            and the coupon brings it to $0. Questions? Text (520) 222-8104.
          </p>
        </div>
      </div>
      {/* Background Wave */}
      <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiMwMDAwMDAiPjxwYXRoIGQ9Ik0wIDQ3LjQ0TDE3MCAwbDYyNi40OCA5NC44OUwxMTEwIDg3LjExbDE3MC0zOS42N1YxNDBIMFY0Ny40NHoiIGZpbGwtb3BhY2l0eT0iLjUiLz48cGF0aCBkPSJNMCA5MC43MmwxNDAtMjguMjggMzE1LjUyIDI0LjE0TDc5Ni40OCA2NS44IDExNDAgMTA0Ljg5bDE0MC0xNC4xN1YxNDBIMFY5MC43MnoiLz48L2c+PC9zdmc+')] bg-[length:100%_100px] h-[100px] absolute bottom-0 left-0 w-full z-[1] scale-[1]" />
    </div>
  )
}

export default Index
