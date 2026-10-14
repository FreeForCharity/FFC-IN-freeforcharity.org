import React from 'react'
import Link from 'next/link'
import ReadyToGetStarted from '@/components/help-for-charities-components/Ready-to-Get-Started-Now'
import AccordionItem from '@/components/ui/Accordian'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'
const index = () => {
  return (
    <div className="w-full max-w-[100%]">
      <div className="w-full max-w-[90%] mx-auto">
        <ReadyToGetStarted />
        <AccordionItem number="3" title="Your Website (GitHub Pages) — built and proven first">
          <div className="space-y-6 font-[500] text-[#666]">
            {/* Intro Paragraph */}
            <p className="pb-4 leading-relaxed">
              Your onboarding application already collects your website content, so there is no
              separate website application. Right after your application is approved, a Free For
              Charity volunteer builds your website from the FFC template as a fast, secure GitHub
              Pages static site, using the tagline, descriptions, programs and leaders you gave us.
              Your site goes live on its free GitHub Pages address first (no custom domain yet), and
              we email you a preview link. There is no server to maintain and nothing for you to
              install.
            </p>

            {/* What happens after approval */}
            <div>
              <h2 className="text-[22px] font-[500] text-[#333] mt-6 mb-3">
                What happens after approval
              </h2>
              <ol className="list-decimal list-inside pl-1 space-y-1">
                <li>We approve your application.</li>
                <li>A volunteer builds your site from the content in your application.</li>
                <li>We email you a preview link on its free GitHub Pages address.</li>
                <li>You review the preview and approve it, or tell us what to change.</li>
                <li>
                  You order your free .org domain with the coupon in your acceptance email (see step
                  4 below).
                </li>
                <li>We set up your charity email.</li>
              </ol>
            </div>

            <p className="leading-relaxed">
              We also invite your maintainer&rsquo;s GitHub account to your site&rsquo;s repository
              (see{' '}
              <a
                href={ffcAdminUrl(adminLinks['accept-invitation'].newModel)}
                className="text-[#0567B1] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                how to accept the invitation
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              ). If you didn&rsquo;t include a logo link, your maintainer gets a first &ldquo;Add
              your logo&rdquo; issue on GitHub and uploads it there.
            </p>

            <p className="leading-relaxed">
              Because your content comes with the application, a complete application is the main
              factor in how quickly your site can launch. Our volunteers handle the build and
              go-live for you.
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
            Free For Charity provides free .org domain names to US 501c3 organizations. Once you
            approve your website preview, order your domain: we register a new .org (or transfer
            your current domain name to us), point it at your approved site, and manage it while
            paying the annual fees. We only purchase domains for websites that are already working
            and approved.
          </p>
          <p className="pb-[1em]">
            Use the coupon in your onboarding acceptance email at checkout to bring the total to $0.
            We never post the code publicly.
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
