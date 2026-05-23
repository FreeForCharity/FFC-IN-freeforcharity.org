import React from 'react'

const Section8TawkTo = () => {
  return (
    <>
      {/* 8. Tawk.to */}
      <section id="section8" className="mb-6">
        <ol className="list-decimal list-inside" start={8}>
          <li className="text-[30px] md:text-[36px]  font-[700] text-[#005AA0] mt-16 mb-6 pb-3 border-b border-[#e1e5eb]">
            Tawk.to Live Chat (Support)
          </li>
        </ol>
        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-10 mb-4">
          8.1. Setup Process
        </h3>

        <ul className="pl-[1.5rem] p-[0_0_23px_1em] list-disc">
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            Create an account at{' '}
            <a href="https://www.tawk.to/" className="text-[#0066B8] underline">
              Tawk.to.
            </a>
          </li>
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            Follow the setup wizard to create a property for the charitys website.
          </li>
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            Install the Tawk.to WordPress plugin or add the provided JavaScript snippet to the
            websites footer.
          </li>
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            Customize the chat widgets appearance and settings in the Tawk.to dashboard.
          </li>
        </ul>

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-[3rem] mb-6">
          8.2. Learning Resources
        </h3>
        <ul className="p-[0_0_23px_1.5rem] list-disc">
          <li className="underline pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px]">
            <a href="https://help.tawk.to/" target="_blank" rel="noopener noreferrer">
              Tawk.to Help Center
            </a>
          </li>
          <li className="underline pl-[0.5rem] mb-[0.75rem] text-[14px] text-[#0066B8] leading-[26px]">
            <a href="https://www.tawk.to/academy/" target="_blank" rel="noopener noreferrer">
              Tawk.to Academy
            </a>
          </li>
        </ul>
      </section>
    </>
  )
}

export default Section8TawkTo
