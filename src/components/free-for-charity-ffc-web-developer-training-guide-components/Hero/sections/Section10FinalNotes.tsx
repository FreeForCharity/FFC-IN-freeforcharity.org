import React from 'react'

const Section10FinalNotes = () => {
  return (
    <>
      {/* 10. Final Notes */}
      <section id="section10" className="mb-6">
        <ol className="list-decimal list-inside" start={10}>
          <li className="text-[30px] md:text-[36px]  font-[700] text-[#005AA0] mt-16 mb-6 pb-3 border-b border-[#e1e5eb]">
            Final Notes
          </li>
        </ol>

        <p className="text-[14px] font-[500] leading-[25px] text-[#333d47]">
          By following the steps in this guide and using the linked resources:
        </p>

        <ul className="mt-[20px] pl-[1.5rem] p-[0_0_23px_1em] list-disc">
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            You will be able to efficiently set up new charity accounts, configure domain
            management, secure email hosting, and create a robust web presence using the tools FFC
            supports.
          </li>
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            Whenever you encounter an issue—for example, with domain transfers or DNS
            configuration—refer to both the official documentation and trusted external tutorials
            for alternate perspectives and troubleshooting tips.
          </li>
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            For setting up the email connection in Microsoft 365, remember that Microsoft’s admin
            portal now allows you to leverage your Cloudflare credentials to automatically insert
            the required MX, SPF, and DKIM records, streamlining the verification process.
          </li>
        </ul>

        <p className="pb-[1em] text-[14px] font-[500] leading-[25px] text-[#333d47]">
          This guide is designed to be both a step-by-step procedural reference and a gateway to
          deeper learning. As you gain confidence with each tool, you’re encouraged to explore the
          additional materials provided in the external resources sections.
        </p>
        <p className="pb-[1em] text-[14px] font-[500] leading-[25px] text-[#333d47]">
          Happy developing and supporting the charities in their mission!
        </p>
        <p className="text-[14px] font-[500] leading-[25px] text-[#333d47]">
          If you have further questions or need clarification on any of these steps, feel free to
          ask your fellow team members in the internal channels or consult the provided
          documentation links.
        </p>
      </section>
    </>
  )
}

export default Section10FinalNotes
