import React from 'react'

const Section3Microsoft365 = () => {
  return (
    <>
      {/* 3. Microsoft 365 */}
      <section id="section3" className="mb-6">
        <ol className="list-decimal list-inside" start={3}>
          <li className="text-[30px] md:text-[36px]  font-[700] text-[#005AA0] mt-16 mb-6 pb-3 border-b border-[#e1e5eb]">
            Microsoft 365 (Email Hosting)
          </li>
        </ol>

        <p className="text-[14px] font-[500] leading-[25px] text-[#333d47]">
          Microsoft 365 provides the email hosting solution for charity accounts, ensuring seamless
          communication and collaboration.
        </p>

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-10 mb-4">
          3.1. Setup Process
        </h3>

        <ul className="pl-[1.5rem] p-[0_0_23px_1em] list-disc">
          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Apply for NonProfit Email Hosting:</span>{' '}
            Visit the{' '}
            <a
              href="https://www.microsoft.com/en-us/nonprofits/offers-for-nonprofits"
              className="text-[#0066B8] underline"
            >
              Microsoft Nonprofits page
            </a>{' '}
            to learn about eligibility and application steps.
          </li>

          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Configure Email Hosting:</span> Once
            approved, follow the steps in the Microsoft 365 Admin Portal to set up and configure
            email accounts for your charity. Detailed instructions can be found here:{' '}
            <a
              href="https://learn.microsoft.com/en-us/microsoft-365/admin/setup/add-domain?view=o365-worldwide"
              className="text-[#0066B8] underline"
            >
              Microsoft 365 Admin Documentation.
            </a>
          </li>
        </ul>

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-[3rem] mb-4">
          3.2. Learning Resources
        </h3>

        <h4 className="text-[#1c2a38] text-[18px] pb-[10px] font-[700] leading-[23px] mt-[1rem]">
          Official Microsoft 365 Learning Resources:
        </h4>
        <ul className="p-[0_0_23px_1.5rem] list-disc">
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://learn.microsoft.com/en-us/microsoft-365/admin/?view=o365-worldwide"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft 365 Admin Help
            </a>
          </li>

          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a href="https://support.microsoft.com/en-us" target="_blank" rel="noopener noreferrer">
              Microsoft 365 Training Portal
            </a>
          </li>

          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://www.microsoft.com/en-us/nonprofits/resources"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Nonprofit Resource Center
            </a>
          </li>
        </ul>

        <h4 className="text-[#1c2a38] text-[18px] pb-[10px] font-[700] leading-[23px] mt-[1rem]">
          External Microsoft 365 Learning Resources:
        </h4>

        <ul className="p-[0_0_23px_1.5rem] list-disc">
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] leading-[26px] ">
            Microsoft 365 Setup Video Tutorials:
            <a
              href="https://www.youtube.com/results?search_query=Microsoft+365+for+nonprofits+tutorial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0066B8] underline"
            >
              (Search for “Microsoft 365 for nonprofits tutorial” on YouTube.)
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://www.avepoint.com/blog/office-365/microsoft-365-nonprofits/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog Guide by AvePoint
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://learn.microsoft.com/en-us/industry/nonprofit/microsoft-for-nonprofits/program-overview"
              target="_blank"
              rel="noopener noreferrer"
            >
              Step-by-Step Guide on Setup
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://learn.microsoft.com/en-us/microsoft-365/admin/setup/add-domain?view=o365-worldwide"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Official Guide: Adding Domains to M365
            </a>
          </li>
          <li className="underline  pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px] ">
            <a
              href="https://techcommunity.microsoft.com/t5/nonprofits/ct-p/Nonprofits"
              target="_blank"
              rel="noopener noreferrer"
            >
              Community Forum Discussions
            </a>
          </li>
        </ul>
      </section>
    </>
  )
}

export default Section3Microsoft365
