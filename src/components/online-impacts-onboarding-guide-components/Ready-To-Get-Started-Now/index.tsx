import React from 'react'
import TransparentBtn from '@/components/ui/Transparentbtn'
import AccordionItem from '@/components/ui/Accordian'
import { hubAddProduct, ONBOARDING_PID } from '@/lib/config'
// import { Link } from "lucide-react";

const index = () => {
  return (
    <div className="bg-white">
      <div className="w-full max-w-[90%] mx-auto">
        <div className="flex items-center flex-col text-center pb-[40px]">
          <h1 className="text-[26px] font-[500] text-[#333] pb-[10px]" data-font="aria-font">
            Ready to Get Started Now?
          </h1>
          <TransparentBtn
            text="Online Impacts to Free For Charity Onboarding Form"
            href={hubAddProduct(ONBOARDING_PID.full501c3)}
          />
        </div>

        <AccordionItem number="3" title=" Your Website (GitHub Pages) — built and proven first">
          <div className="space-y-6 font-[500] text-[#666]">
            <p className="pb-4 leading-relaxed">
              Free For Charity builds your website for you. Once your onboarding application is
              approved, we start from our tested FFC template and publish a fast, secure GitHub
              Pages static site. Your site goes live on its free GitHub Pages address first — no
              custom domain yet — and we validate it with you end to end. There is nothing for you
              to install, host, or maintain — no servers, control panels, or plugins to manage.
            </p>

            <div>
              <h2 className="text-[22px] font-[500] text-[#333] mt-6 mb-3">What We Handle</h2>
              <ul className="list-disc list-inside pl-1">
                <li>Building your site from the Free For Charity template</li>
                <li>
                  Publishing it as a GitHub Pages static site (fast, secure, and free to host)
                </li>
                <li>
                  Validating it live on its GitHub Pages address, then connecting it to your
                  Cloudflare-managed domain with HTTPS once we register it
                </li>
                <li>Ongoing hosting, updates, and maintenance</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[22px] font-[500] text-[#333] mt-6 mb-3">
                What We Need From You
              </h2>
              <p className="leading-relaxed">
                Your launch timing is driven by content readiness. The sooner you provide your logo,
                mission, program details, photos, and page copy, the sooner we can build and launch.
                If you already have an existing website, share the URL and we will carry the
                relevant content into your new FFC site.
              </p>
            </div>

            <p className="font-[700]">
              As always, if you run into problems, contact us anytime{' '}
              <a href="mailto:clarkemoyer@freeforcharity.org" className="text-[#0567B1] underline">
                clarkemoyer@freeforcharity.org
              </a>{' '}
              520-222-8104
            </p>
          </div>
        </AccordionItem>

        <AccordionItem
          number="4"
          title=" Free For Charity Domain Name and Microsoft 365 Email Hosting Request"
        >
          <p className="text-[18px] font-[500] text-[#4a4a4a] mb-[1em]" data-font="lato-font">
            Free For Charity provides free .org domain names to US 501c3 organizations. Once your
            website is live and validated on its GitHub Pages address, request your domain — we
            register a new .org (or transfer your current domain name to us), point it at your
            validated site, and manage it while paying the annual fees. We only purchase domains for
            websites that are already working and validated.
          </p>

          <p className="text-[18px] font-[700] text-[#4a4a4a] mb-[1em]">
            Visit{' '}
            <a href="/domains/" className="text-[#0567B1]">
              https://freeforcharity.org/domains
            </a>{' '}
            and follow all steps
          </p>
          <p className="text-[18px] font-[500] text-[#4a4a4a] mb-[1em]">
            Once we have the domain name under management we can then set up your professional email
            addresses e.g. board@yourcharityname.org
          </p>
          <p className="text-[18px] font-[700] text-[#4a4a4a]">
            As always if you run into problems contact us at anytime{' '}
            <a href="mailto:clarkemoyer@freeforcharity.org" className="text-[#0567B1]">
              clarkemoyer@freeforcharity.org
            </a>{' '}
            520-222-8104
          </p>
        </AccordionItem>
      </div>
    </div>
  )
}

export default index
