import React from 'react'

const Section5Divi = () => {
  return (
    <>
      {/* 5. DIVI */}
      <section id="section5" className="mb-6">
        <ol className="list-decimal list-inside" start={5}>
          <li className="text-[30px] md:text-[36px]  font-[700] text-[#005AA0] mt-16 mb-6 pb-3 border-b border-[#e1e5eb]">
            DIVI (WordPress Theme)
          </li>
        </ol>

        <p className="text-[14px] font-[500] leading-[25px] text-[#333d47]">
          DIVI is used to create visually appealing, responsive, and highly functional websites for
          charities.
        </p>

        {/* --- Installation & Customization --- */}
        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-10 mb-4">
          5.1. Installation & Customization Steps
        </h3>

        <ul className="pl-[1.5rem] pb-[23px] list-disc space-y-[0.75rem]">
          <li className="leading-[26px] pl-[0.5rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Install Divi: </span>
            Download the Divi theme (typically provided through internal channels such as the FFC
            Internal Web Developer Microsoft Teams team) and follow the WordPress theme installation
            process.
          </li>
          <li className="leading-[26px] pl-[0.5rem] text-[14px] font-[500] text-[#333d47]">
            <span className="font-[600] text-[#1c2a38]">Customize Divi: </span>
            Use the built-in visual builder to customize page layouts, modify modules, and apply
            global design settings.
          </li>
        </ul>

        {/* --- Learning Resources --- */}
        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-[3rem] mb-6">
          5.2. Learning Resources
        </h3>

        {/* Official DIVI Resources */}
        <h4 className="text-[#1c2a38] text-[18px] pb-[10px] font-[700] leading-[23px] mt-[1rem]">
          Official DIVI Resources:
        </h4>

        <ul className="pl-[1.5rem] pb-[23px] list-disc space-y-[0.75rem]">
          <li className="leading-[26px] pl-[0.5rem] text-[14px] font-[500] text-[#333d47]">
            <a
              href="https://www.elegantthemes.com/documentation/divi/"
              className="text-[#0066B8] underline hover:text-[#005AA0] transition-colors duration-200"
            >
              Divi Documentation by Elegant Themes
            </a>
          </li>
          <li className="leading-[26px] pl-[0.5rem] text-[14px] font-[500] text-[#333d47]">
            <a
              href="https://www.elegantthemes.com/blog/category/divi-resources"
              className="text-[#0066B8] underline hover:text-[#005AA0] transition-colors duration-200"
            >
              Elegant Themes Blog & Tutorials
            </a>
          </li>
        </ul>

        {/* External DIVI Resources */}
        <h4 className="text-[#1c2a38] text-[18px] pb-[10px] font-[700] leading-[23px] mt-[1rem]">
          External DIVI Resources:
        </h4>

        <ul className="pl-[1.5rem] pb-[23px] list-disc space-y-[0.75rem]">
          <li className="pl-[0.5rem] text-[14px] text-[#0066B8] leading-[26px] underline">
            <a
              href="https://www.elegantthemes.com/documentation/divi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Divi Theme Official Documentation (Elegant Themes)
            </a>
          </li>
          <li className="pl-[0.5rem] text-[14px] leading-[26px] text-[#333d47]">
            YouTube: Divi Theme Tutorials —{' '}
            <a
              href="https://www.youtube.com/results?search_query=Divi+Theme+Tutorial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0066B8] underline"
            >
              (Search for “Divi Theme Tutorial” on YouTube)
            </a>
          </li>
          <li className="pl-[0.5rem] text-[14px] text-[#0066B8] leading-[26px] underline">
            <a
              href="https://www.wpbeginner.com/solutions/divi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              WPBeginner’s Guide to Divi
            </a>
          </li>
          <li className="pl-[0.5rem] text-[14px] text-[#0066B8] leading-[26px] underline">
            <a
              href="https://www.facebook.com/groups/DiviThemeUsers/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Community Forums & Facebook Groups
            </a>
          </li>
          <li className="pl-[0.5rem] text-[14px]  leading-[26px]">
            Elegant Themes Live Chat Support: Access via your Elegant Themes account.
          </li>
        </ul>
      </section>
    </>
  )
}

export default Section5Divi
