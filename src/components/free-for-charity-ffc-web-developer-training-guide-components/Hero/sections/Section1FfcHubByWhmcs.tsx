import React from 'react'

const Section1FfcHubByWhmcs = () => {
  return (
    <>
      {/* 1. FFC Hub by WHMCS */}
      <section id="section1" className="mb-6">
        <ol className="list-decimal list-inside">
          <li className="text-[30px] md:text-[36px]  font-[700] text-[#005AA0] mt-16 mb-6 pb-3 border-b border-[#e1e5eb]">
            FFC Hub by WHMCS
          </li>
        </ol>

        <p className="text-[14px] font-[500] leading-[25px] text-[#333d47]">
          WHMCS powers the FFC Hub, which handles domain name orders, client data, billing and
          support tickets. Below are practical steps and troubleshooting notes for everyday tasks.
        </p>

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-10 mb-4">
          1.1. Login URLs
        </h3>

        <ul className="pl-[1.5rem] p-[0_0_23px_1em] list-disc">
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Charity Login URL:</span>{' '}
            <a
              href="https://freeforcharity.org/hub/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#005a9c]"
            >
              https://freeforcharity.org/hub
            </a>
          </li>
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Admin Login URL:</span>{' '}
            <a
              href="https://freeforcharity.org/hub/globaladmin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#005a9c]"
            >
              https://freeforcharity.org/hub/globaladmin
            </a>
          </li>
        </ul>

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-[3rem] mb-4">
          1.2. Main Setup Steps
        </h3>

        <ul className="pl-[1.5rem] p-[0_0_23px_1em] list-disc">
          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Primary Contact Information:</span> Ensure
            the account’s primary email is not based on the charity’s domain (e.g. use{' '}
            <code className="bg-[#f1f3f5] text-[#B82B5A] py-[0.3em] px-[0.5em] rounded-[6px] text-[0.9em]">
              charityname@outlook.com
            </code>{' '}
            instead of an address like{' '}
            <code className="bg-[#f1f3f5] text-[#B82B5A] py-[0.3em] px-[0.5em] rounded-[6px] text-[0.9em]">
              info@charityname.org
            </code>
            .
          </li>

          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Multiple Contacts:</span> Add at least two
            administrators to the account to avoid lockouts.
          </li>

          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Domain Purchase & Configuration:</span>{' '}
            Guide the charity through purchasing a{' '}
            <code className="bg-[#f1f3f5] text-[#B82B5A] py-[0.3em] px-[0.5em] rounded-[6px] text-[0.9em]">
              .org
            </code>{' '}
            domain via WHMCS and confirm coupon codes from onboarding emails.
          </li>
        </ul>

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-[3rem] mb-4">
          1.3. Common Issues & Solutions
        </h3>

        <ul className="pl-[1.5rem] p-[0_0_23px_1em] list-disc">
          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Incomplete Onboarding Form:</span>{' '}
            <ul className="list-disc pl-[20px] pb-[20px] mt-[0.75rem]">
              <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
                <span className="italic text-[#1c2a38]">Issue:</span> Charity hasnt completed the
                onboarding form.
              </li>
              <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
                <span className="italic text-[#1c2a38]">Solution:</span> Schedule a Teams
                screen-share or escalate to a Global Admin.
              </li>
            </ul>
          </li>

          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Charity Order Flagged as Fraud:</span>{' '}
            <ul className="list-disc pl-[20px] pb-[20px] mt-[0.75rem]">
              <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
                <span className="italic text-[#1c2a38]">Issue:</span> Order flagged by fraud checks.
              </li>
              <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
                <span className="italic text-[#1c2a38]">Solution:</span> Confirm order origin (US),
                billing address match, and escalate when necessary.
              </li>
            </ul>
          </li>

          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Domain Transfer Failures:</span>{' '}
            <ul className="list-disc pl-[20px] pb-[20px] mt-[0.75rem]">
              <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
                <span className="italic text-[#1c2a38]">Issue:</span> Incorrect EPP code or privacy
                enabled.
              </li>
              <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
                <span className="italic text-[#1c2a38]">Solution:</span> Disable privacy, verify
                EPP, and resubmit transfer.
              </li>
            </ul>
          </li>
        </ul>

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-[3rem] mb-6">
          1.4. Learning Resources
        </h3>

        <h4 className="text-[#1c2a38] text-[18px] pb-[10px] font-[700] leading-[23px]">
          Official WHMCS Learning Resources:
        </h4>
        <ul className="p-[0_0_23px_1.5rem] list-disc">
          <li className="underline pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a href="https://docs.whmcs.com/" target="_blank" rel="noopener noreferrer">
              WHMCS Documentation
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a href="https://docs.whmcs.com/" target="_blank" rel="noopener noreferrer">
              WHMCS Knowledgebase
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a href="https://www.youtube.com/user/whmcs" target="_blank" rel="noopener noreferrer">
              WHMCS YouTube Channel
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a href="https://blog.whmcs.com/" target="_blank" rel="noopener noreferrer">
              WHMCS Official Blog
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a href="https://whmcs.community/" target="_blank" rel="noopener noreferrer">
              WHMCS Community Forum
            </a>
          </li>
        </ul>

        <h4 className="text-[#1c2a38] text-[18px] pb-[10px] font-[700] leading-[23px]">
          External WMHCS Learning Resources:
        </h4>
        <ul className="p-[0_0_23px_1.5rem] list-disc">
          <li className="underline pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a href="https://docs.whmcs.com/" target="_blank" rel="noopener noreferrer">
              WHMCS Official Documentation
            </a>
          </li>
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] leading-[26px] ">
            WHMCS Basics on YouTube:{' '}
            <a
              href="https://www.youtube.com/results?search_query=WHMCS+Tutorial"
              className="text-[#0066B8] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              (Search for “WHMCS Tutorial” on YouTube)
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://www.nexcess.net/blog/whmcs-best-practices/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog Post on WHMCS Best Practices
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://www.inmotionhosting.com/support/edu/whmcs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              WHMCS Setup Guide by InMotion Hosting
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://www.g2.com/products/whmcs/reviews"
              target="_blank"
              rel="noopener noreferrer"
            >
              Community Comparisons & Reviews
            </a>
          </li>
        </ul>
      </section>
    </>
  )
}

export default Section1FfcHubByWhmcs
