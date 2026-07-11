import React from 'react'
import Image from 'next/image'
import { assetPath } from '@/lib/assetPath'

const Index = () => {
  return (
    <section className="relative overflow-hidden pt-[71px]">
      {/* Top Background SVG */}
      <div className="absolute inset-0 z-[1] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTI4MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2VhZWFlYSI+PHBhdGggZD0iTTAgMTQwaDEyODBDNTczLjA4IDE0MCAwIDAgMCAweiIgZmlsbC1vcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik0wIDE0MGgxMjgwQzU3My4wOCAxNDAgMCAzMCAwIDMweiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik0wIDE0MGgxMjgwQzU3My4wOCAxNDAgMCA2MCAwIDYweiIvPjwvZz48L3N2Zz4=')] bg-[length:100%_100%] scale-[-1] origin-center"></div>

      {/* Main Content */}
      <div className="relative z-[5] w-[90%] max-w-[1300px] mx-auto flex flex-wrap items-start justify-between ">
        {/* Left Section */}
        <div className="w-full md:w-[58.8%] mb-8 md:mb-0">
          <h1
            className="mt-[60px] mb-[20px] font-[700] text-[40px] md:text-[50px] leading-[50px] md:leading-[65px] text-[#1a2e35]"
            data-font="cantata-font"
          >
            Free, fully-managed <br /> .org domains
          </h1>
          <p
            data-font="raleway-font"
            className="text-[18px] md:text-[20px] font-[600] leading-[28px] md:leading-[30px]"
          >
            Free For Charity registers, pays for, and manages your nonprofit&apos;s <b>.org</b>{' '}
            domain in our Cloudflare account — with your team added as domain admins. It&apos;s part
            of our all-in program: domain, Microsoft&nbsp;365 email, and a website, all handled for
            you.
          </p>

          <div className="mt-[28px] flex flex-col sm:flex-row gap-[14px]">
            <a
              href="#apply"
              className="inline-flex items-center justify-center rounded-[10px] bg-[#0567B1] px-[26px] py-[14px] text-[17px] font-[700] text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-[#045a9b]"
              data-font="raleway-font"
            >
              How to apply
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-[10px] border-2 border-[#0567B1] px-[26px] py-[14px] text-[17px] font-[700] text-[#0567B1] transition-colors duration-200 hover:bg-[#0567B1]/5"
              data-font="raleway-font"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[38.2%] flex justify-center md:justify-end">
          <Image
            src={assetPath('/Images/Domains-hero.webp')}
            alt="Free For Charity managed .org domains for nonprofits"
            width={500}
            height={400}
            className="object-contain w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Bottom Blue Background SVG */}
      <div className="absolute bottom-0 inset-x-0 z-[2] h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTI4MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzRmNmVmZiI+PHBhdGggZD0iTTAgMTQwaDEyODBDNTczLjA4IDE0MCAwIDAgMCAweiIgZmlsbC1vcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik0wIDE0MGgxMjgwQzU3My4wOCAxNDAgMCAzMCAwIDMweiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik0wIDE0MGgxMjgwQzU3My4wOCAxNDAgMCA2MCAwIDYweiIvPjwvZz48L3N2Zz4=')] bg-[length:100%_100%]"></div>

      {/* White Curved Overlay */}
      <div className="h-[100px] w-full"></div>

      <div
        className="absolute bottom-0 w-full h-[100px] z-[3] scale-y-[-1]"
        style={{
          backgroundImage:
            'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0wIDkwLjcybDE0MC0yOC4yOCAzMTUuNTIgMjQuMTRMNzk2LjQ4IDY1LjggMTE0MCAxMDQuODlsMTQwLTE0LjE3VjBIMHY5MC43MnoiIGZpbGwtb3BhY2l0eT0iLjUiLz48cGF0aCBkPSJNMCAwdjQ3LjQ0TDE3MCAwbDYyNi40OCA5NC44OUwxMTEwIDg3LjExbDE3MC0zOS42N1YwSDB6Ii8+PC9nPjwvc3ZnPg==)',
        }}
      ></div>
    </section>
  )
}

export default Index
