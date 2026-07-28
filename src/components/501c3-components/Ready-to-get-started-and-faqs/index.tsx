import React from 'react'
import Link from 'next/link'
import ReadyToGetStarted from '@/components/help-for-charities-components/Ready-to-Get-Started-Now'
import AccordionItem from '@/components/ui/Accordian'
const index = () => {
  return (
    <div className="w-full max-w-[100%]">
      <div className="w-full max-w-[90%] mx-auto">
        <ReadyToGetStarted />
        <AccordionItem number="3" title="Your Website (GitHub Pages) — built and proven first">
          <div className="space-y-6 font-[500] text-[#666]">
            {/* Intro Paragraph */}
            <p className="pb-4 leading-relaxed">
              Once your onboarding application is approved, you will receive an email from the
              system with the code to submit your website application. A Free For Charity volunteer
              then builds your website from the FFC template as a fast, secure GitHub Pages static
              site. Your site goes live on its free GitHub Pages address first — no custom domain
              yet — and we validate it with you end to end. There is no server to maintain and
              nothing for you to install.
            </p>

            {/* What we need from you */}
            <div>
              <h2 className="text-[22px] font-[500] text-[#333] mt-6 mb-3">
                What we need from you
              </h2>
              <ul className="list-disc list-inside pl-1">
                <li>Your logo</li>
                <li>Photos of your organization and its work</li>
                <li>Your mission text</li>
                <li>Descriptions of your programs</li>
              </ul>
            </div>

            <p className="leading-relaxed">
              Having this content ready is the main factor in how quickly your site can launch. Once
              we have it, our volunteers handle the build and go-live for you.
            </p>

            {/* Contact */}
            <p>
              As always, if you run into problems, contact us anytime{' '}
              <a href="mailto:clarkemoyer@freeforcharity.org" className="text-[#0567B1] underline">
                clarkemoyer@freeforcharity.org
              </a>{' '}
              520-222-8104
            </p>
          </div>
        </AccordionItem>
        <AccordionItem number="4" title="Free For Charity Domain Name and Email Hosting Request">
          <p className="pb-[1em]">
            Free For Charity provides free .org domain names to US 501c3 organizations. Once your
            website is live and validated on its GitHub Pages address, request your domain — we
            register a new .org (or transfer your current domain name to us), point it at your
            validated site, and manage it while paying the annual fees. We only purchase domains for
            websites that are already working and validated.
          </p>
          <h1 className="pb-[1em] font-[700]">
            Visit{' '}
            <Link href="/domains/" className="text-[#0567B1]">
              https://freeforcharity.org/domains
            </Link>{' '}
            and follow all steps
          </h1>
          <p className="pb-[1em]">
            Once we have the domain name under management we can then set up your professional email
            addresses e.g. board@yourcharityname.org
          </p>
          <p className="pb-[1em]">
            Professional email can be set up with Microsoft 365 or Google Workspace, both free for
            eligible 501(c)(3) nonprofits.
          </p>
          <h1 className="font-[700]">
            As always if you run into problems contact us at anytime{' '}
            <a href="mailto:clarkemoyer@freeforcharity.org" className="text-[#0567B1]">
              clarkemoyer@freeforcharity.org
            </a>{' '}
            <a href="tel:+15202228104">520-222-8104</a>
          </h1>
        </AccordionItem>
      </div>
    </div>
  )
}

export default index
