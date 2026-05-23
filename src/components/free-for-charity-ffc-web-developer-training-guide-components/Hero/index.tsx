import Section1FfcHubByWhmcs from './sections/Section1FfcHubByWhmcs'
import Section2Cloudflare from './sections/Section2Cloudflare'
import Section3Microsoft365 from './sections/Section3Microsoft365'
import Section4Interserver from './sections/Section4Interserver'
import Section5Divi from './sections/Section5Divi'
import Section6Wpmudev from './sections/Section6Wpmudev'
import Section7MicrosoftClarity from './sections/Section7MicrosoftClarity'
import Section8TawkTo from './sections/Section8TawkTo'
import Section9AzureAiLanguage from './sections/Section9AzureAiLanguage'
import Section10FinalNotes from './sections/Section10FinalNotes'
import React from 'react'

const Index = () => {
  const sections = [
    {
      id: 'section1',
      label: 'FFC Hub by WHMCS (Domain Orders, Client Data, Support Tickets)',
    },
    { id: 'section2', label: 'Cloudflare (DNS Management & Email Connection)' },
    { id: 'section3', label: 'Microsoft 365 (Email Hosting)' },
    { id: 'section4', label: 'InterServer Web Hosting (with DirectAdmin)' },
    { id: 'section5', label: 'DIVI (WordPress Theme)' },
    { id: 'section6', label: 'WPMUdev (WordPress Plugins)' },
    { id: 'section7', label: 'Microsoft Clarity (Analytics)' },
    { id: 'section8', label: 'Tawk.to Live Chat (Support)' },
    { id: 'section9', label: 'Azure AI Language (Custom Question Answering)' },
    { id: 'section10', label: 'Final Notes' },
  ]

  return (
    <div className="px-2 md:px-5 w-full pt-[160px] pb-[80px]">
      <div className="w-full max-w-[1000px] mx-auto rounded-[12px] shadow-[0_8px_32px_rgba(0,30,80,0.08)] pt-[58px] p-[1.5rem] md:p-[3rem] border border-[#e1e5eb] bg-[#ffffff]">
        <h1 className="text-[30px] md:text-[44px] text-center border-b-2 border-[#e1e5eb] pb-6 mb-8 text-[#005A9C] font-[700] leading-[40px] md:leading-[57px]">
          Free For Charity (FFC) Web Developer Training Guide
        </h1>

        <p className="pb-[1em] text-[14px] font-[500] leading-[25px] text-[#333d47]">
          This guide is designed to help you support a new charity by setting up and managing the
          suite of online tools that FFC uses. Follow the detailed instructions and use the provided
          resource links to become proficient with each platform.
        </p>

        <div className="bg-[#fdfdff] p-6 px-3 md:px-8 rounded-lg border border-[#e1e5eb] border-l-[5px] border-l-[#0066B8] mb-12">
          <h2 className="mt-0 border-b-0 text-[24px] font-[700] text-[#005AA0] mb-[1.5rem]">
            Table of Contents
          </h2>

          <ol className="list-decimal list-inside pl-0">
            {sections.map((item) => (
              <li
                key={item.id}
                className="w-full py-3 px-4 rounded-md font-semibold text-[12px] md:text-[14px] text-[#0066B8] transition-colors duration-200 hover:bg-[#eef6ff] hover:text-[#005AA0]"
              >
                <a href={`#${item.id}`} className="py-3 px-4">
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <Section1FfcHubByWhmcs />
        <Section2Cloudflare />
        <Section3Microsoft365 />
        <Section4Interserver />
        <Section5Divi />
        <Section6Wpmudev />
        <Section7MicrosoftClarity />
        <Section8TawkTo />
        <Section9AzureAiLanguage />
        <Section10FinalNotes />
      </div>
    </div>
  )
}

export default Index
