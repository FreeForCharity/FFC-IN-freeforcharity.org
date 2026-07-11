import React from 'react'
import Image from 'next/image'
import { assetPath } from '@/lib/assetPath'

const Index = () => {
  return (
    <section className="relative overflow-hidden pt-[150px] pb-[46px]">
      {/* Top Background SVG */}
      <div className="absolute inset-0 z-[1] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTI4MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2VhZWFlYSI+PHBhdGggZD0iTTAgMTQwaDEyODBDNTczLjA4IDE0MCAwIDAgMCAweiIgZmlsbC1vcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik0wIDE0MGgxMjgwQzU3My4wOCAxNDAgMCAzMCAwIDMweiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik0wIDE0MGgxMjgwQzU3My4wOCAxNDAgMCA2MCAwIDYweiIvPjwvZz48L3N2Zz4=')] bg-[length:100%_100%] scale-[-1] origin-center"></div>

      {/* Main Content */}
      <div className="relative z-[5] w-[90%] max-w-[1300px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[40px]">
        {/* Left Section */}
        <div className="w-full md:w-[46%]">
          <span
            className="inline-block mb-[18px] rounded-full bg-[#0567B1]/10 px-[16px] py-[6px] text-[14px] font-[700] uppercase tracking-[1px] text-[#0567B1]"
            data-font="raleway-font"
          >
            Free for verified 501(c)(3) nonprofits
          </span>
          <h1
            className="mb-[20px] font-[700] text-[38px] md:text-[52px] leading-[46px] md:leading-[60px] text-[#1a2e35]"
            data-font="cantata-font"
          >
            A complete website, domain &amp; email — at no cost
          </h1>
          <p
            data-font="raleway-font"
            className="text-[18px] md:text-[20px] font-[500] leading-[28px] md:leading-[31px] text-[#333]"
          >
            Free For Charity Hosting is a US-based 501(c)(3) &ldquo;charity for charities.&rdquo; We
            build and host a fast, secure website for your nonprofit, register your <b>.org</b>{' '}
            domain, and set up Microsoft&nbsp;365 email — completely free, so you can focus on your
            mission.
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
              href="#whats-included"
              className="inline-flex items-center justify-center rounded-[10px] border-2 border-[#0567B1] px-[26px] py-[14px] text-[17px] font-[700] text-[#0567B1] transition-colors duration-200 hover:bg-[#0567B1]/5"
              data-font="raleway-font"
            >
              See what&apos;s included
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[50%] relative h-[320px] md:h-[460px] rounded-[15px] overflow-hidden shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)]">
          <Image
            src={assetPath('/Images/hero-charity.webp')}
            alt="A nonprofit team collaborating on their new website"
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Bottom Blue Background SVG */}
      <div className="absolute bottom-0 inset-x-0 z-[2] h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTI4MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzRmNmVmZiI+PHBhdGggZD0iTTAgMTQwaDEyODBDNTczLjA4IDE0MCAwIDAgMCAweiIgZmlsbC1vcGFjaXR5PSIuMyIvPjxwYXRoIGQ9Ik0wIDE0MGgxMjgwQzU3My4wOCAxNDAgMCAzMCAwIDMweiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik0wIDE0MGgxMjgwQzU3My4wOCAxNDAgMCA2MCAwIDYweiIvPjwvZz48L3N2Zz4=')] bg-[length:100%_100%]"></div>

      {/* White Curved Overlay */}
      <div className="h-[100px] w-full"></div>
    </section>
  )
}

export default Index
