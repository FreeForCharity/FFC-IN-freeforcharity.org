import React from 'react'

const Section4Interserver = () => {
  return (
    <>
      {/* 4. InterServer */}
      <section id="section4" className="mb-6">
        <ol className="list-decimal list-inside" start={4}>
          <li className="text-[30px] md:text-[36px]  font-[700] text-[#005AA0] mt-16 mb-6 pb-3 border-b border-[#e1e5eb]">
            InterServer Web Hosting (with DirectAdmin)
          </li>
        </ol>

        <p className="text-[14px] font-[500] leading-[25px] text-[#333d47]">
          InterServer provides the hosting platform for charity websites.
        </p>

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-10 mb-4">
          4.1. Setup Process
        </h3>

        <ul className="pl-[1.5rem] p-[0_0_23px_1em] list-disc">
          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Apply for a Hosting Account:</span> Directly
            request hosting services for the charity via InterServer:
            <a href="https://www.interserver.net/support/" className="text-[#0066B8] underline">
              InterServer Support.
            </a>
          </li>
          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Configure the Hosting Environment:</span>{' '}
            Use the DirectAdmin panel to set up the website. Detailed guidance and documentation can
            be found on the DirectAdmin Help site:{' '}
            <a href="https://help.directadmin.com/" className="text-[#0066B8] underline">
              DirectAdmin Help Site.
            </a>
          </li>
        </ul>

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-[3rem] mb-6">
          4.2. Learning Resources
        </h3>
        <h4 className="text-[#1c2a38] text-[18px] pb-[10px] font-[700] leading-[23px] mt-[1rem]">
          Official InterServer Resources:
        </h4>

        <ul className="pl-[1.5rem] p-[0_0_23px_1em] list-disc">
          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <a href="https://www.interserver.net/tips/" className="text-[#0066B8] underline">
              InterServer Knowledge Base
            </a>
          </li>
          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <a href="https://docs.directadmin.com/" className="text-[#0066B8] underline">
              DirectAdmin Documentation
            </a>
          </li>
        </ul>
        <h4 className="text-[#1c2a38] text-[18px] pb-[10px] font-[700] leading-[23px] mt-[1rem]">
          External InterServer / DirectAdmin Learning Resources:
        </h4>

        <ul className="pl-[1.5rem] p-[0_0_23px_1em] list-disc">
          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <a href="https://docs.directadmin.com/" className="text-[#0066B8] underline">
              Guide on Setting Up DirectAdmin
            </a>
          </li>
          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            YouTube Tutorials on DirectAdmin:
            <a
              href="https://www.youtube.com/results?search_query=DirectAdmin+Setup+Tutorial"
              className="text-[#0066B8] underline"
            >
              {' '}
              (Search for “DirectAdmin Setup Tutorial” on YouTube.)
            </a>
          </li>
          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <a href="https://forum.directadmin.com/" className="text-[#0066B8] underline">
              Blog Posts & Forums
            </a>
          </li>
          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <a
              href="https://www.webhostingtalk.com/showthread.php?t=1801261"
              className="text-[#0066B8] underline"
            >
              Community Resources on Hosting Setup
            </a>
          </li>
          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            Step-by-Step InterServer Setup Guide: (Look for updated guides on InterServer’s blog.)
          </li>
        </ul>
      </section>
    </>
  )
}

export default Section4Interserver
