import React from 'react'
import ReadyToGetStarted from '@/components/help-for-charities-components/Ready-to-Get-Started-Now'
import AccordionItem from '@/components/ui/Accordian'
const index = () => {
  return (
    <div className="w-full max-w-[100%]">
      <div className="w-full max-w-[90%] mx-auto">
        <ReadyToGetStarted />
        <AccordionItem number="3" title=" Free For Charity Domain Name and Email Hosting Request">
          <p className="pb-[1em]">
            Free For Charity Provides free .org domain names to US 501c3 organizations. Once your
            onboarding forms are accepted you will receive an email from the system with the
            discount code to request a new domain name or to transfer your current domain name to us
            so we can start managing it and paying the annual fees.
          </p>
          <h1 className="pb-[1em] font-[700]">
            Visit{' '}
            <a href="/domains/" className="text-[#0567B1]">
              https://freeforcharity.org/domains
            </a>{' '}
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
        <AccordionItem number="4" title="Your Website (GitHub Pages)">
          <div className="space-y-6 font-[500] text-[#666]">
            {/* Intro Paragraph */}
            <p className="pb-4 leading-relaxed">
              Once your domain name is set up, a Free For Charity volunteer builds your website from
              the FFC template as a fast, secure GitHub Pages static site and launches it on your
              Cloudflare-managed domain. There is no server to maintain and nothing for you to
              install.
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
      </div>
    </div>
  )
}

export default index
