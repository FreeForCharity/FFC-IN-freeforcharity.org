import React from 'react'
import SmartLink from '@/components/ui/SmartLink'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { domainDonationTaxFaq, hostingBacklogFaq } from '@/data/faqs'

/* ---------------------------------------------------
   Reusable AccordionItem Component (Styled)

   Native <details>/<summary> (Modern Web Guidance: ui-components/accordion).
   Items sharing a `name` form an exclusive group: opening one closes the
   others, which the browser does without script (browsers that predate
   <details name> simply allow several open at once). `defaultOpen` renders
   the item open on first paint. No client JavaScript is needed.
--------------------------------------------------- */
interface AccordionItemProps {
  title: string
  name?: string
  defaultOpen?: boolean
  children: React.ReactNode
  small?: boolean // ✅ for bottom style
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  name,
  defaultOpen = false,
  children,
  small = false,
}) => {
  return (
    <details
      name={name}
      open={defaultOpen}
      className="faq-details group mb-4 border-2 border-[#0567B1] rounded-[10px] overflow-hidden bg-white"
    >
      <summary className="w-full px-4 py-3 flex items-center justify-between text-left transition-all duration-300 cursor-pointer list-none [&::-webkit-details-marker]:hidden group-open:bg-white/90">
        <span
          className={`flex-1 pr-3 font-[700] leading-[26px] transition-all duration-300 ease-in-out text-black group-open:text-[#0567B1] ${
            small ? 'text-[18px] text-center' : 'text-[18px] group-open:text-[22px]'
          }`}
          data-font="cantata-font"
        >
          {title}
        </span>

        {/* Decorative icon; the open state is announced from <details> itself */}
        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center" aria-hidden="true">
          <FaPlus className="group-open:hidden w-5 h-5 text-white bg-[#1c6e92] p-1 rounded-full" />
          <FaMinus className="hidden group-open:block w-5 h-5 text-white bg-[#1c6e92] p-1 rounded-full" />
        </span>
      </summary>

      <div
        className={`px-4 pb-4 pt-2 font-[500] ${
          small ? 'text-[16px] leading-[26px]' : 'text-[18px] leading-[29px]'
        }`}
        data-font="raleway-font"
      >
        {children}
      </div>
    </details>
  )
}

/* ---------------------------------------------------
   Main Layout: Left, Right & Bottom Accordions
--------------------------------------------------- */
const AccordionLayout = () => {
  return (
    <div className="py-[40px] flex flex-col items-center gap-6 px-[0px]">
      <div className="w-[90%] md:w-[80%] mx-auto max-w-[1080px]">
        <div className="py-[24px]">
          <h1
            className="mt-[2px] mb-[12px] pb-[10px] text-[31px] font-[700] leading-[31px] text-[#0567B1] text-center"
            data-font="cantata-font"
          >
            FAQS
          </h1>
        </div>

        <div className="pt-[26px]">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Left Column */}
            <div>
              <AccordionItem
                title="How can you afford to give away free domain names?"
                name="hosting-faq-left"
                defaultOpen
              >
                As a 501(c)3 charity ourselves we seek individual, business, and grant sources of
                funding. At current, Free For Charity has not received a grant specifically for
                domain names or hosting but uses individual and business contributions to fund this
                program.
              </AccordionItem>

              <AccordionItem title="Are you really a Charity?" name="hosting-faq-left">
                Yes, We have had IRS designation since 2014 and have been building our systems and
                testing or support for several years. While charities for charities are rare they do
                exist and in fact fill an important need in reducing overhead expenses for other
                nonprofits. Our IRS designation number (EIN) is 46-2471893. You can see our Candid
                (GuideStar) profile{' '}
                <a
                  href="https://app.candid.org/profile/9326392/free-for-charity-46-2471893"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0567B1]"
                >
                  here.
                </a>{' '}
                We are proud to also recommend other charities for charities that inspired us to{' '}
                <a href="https://www.techsoup.org/" className="text-[#0567B1]">
                  create this nonprofit.
                </a>
              </AccordionItem>
            </div>

            {/* Right Column */}
            <div>
              <AccordionItem
                title="Where do you get your domain name packages?"
                name="hosting-faq-right"
                defaultOpen
              >
                Domains are registered and managed directly at Cloudflare Registrar by Free For
                Charity. Cloudflare offers domains at wholesale, at-cost pricing with no markup,
                which lets us provide free .org names to the charities we serve. Managing everything
                in one Cloudflare account also gives us DNS, CDN, and SSL security for every charity
                domain out of the box.
              </AccordionItem>

              <AccordionItem title={hostingBacklogFaq.question} name="hosting-faq-right">
                {hostingBacklogFaq.backlog}
                <br />
                {hostingBacklogFaq.waysHeading}
                <ul className="list-disc list-inside mt-1">
                  {hostingBacklogFaq.ways.map((way) => (
                    <li key={way.before}>
                      {way.before}
                      {way.link && (
                        <SmartLink href={way.link.href} className="text-[#0567B1]">
                          {way.link.label}
                        </SmartLink>
                      )}
                      {way.after}
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            </div>
          </div>

          {/* Bottom Independent Accordion */}
          <div className="w-full max-w-md mx-auto">
            <AccordionItem title={domainDonationTaxFaq.question} small>
              {domainDonationTaxFaq.answer}
            </AccordionItem>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccordionLayout
