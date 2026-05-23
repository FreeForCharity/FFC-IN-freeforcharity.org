import React from 'react'

const Section9AzureAiLanguage = () => {
  return (
    <>
      {/* 9. Azure AI Language */}
      <section id="section9" className="mb-6">
        <ol className="list-decimal list-inside" start={9}>
          <li className="text-[30px] md:text-[36px]  font-[700] text-[#005AA0] mt-16 mb-6 pb-3 border-b border-[#e1e5eb]">
            Azure AI Language (Custom Question Answering)
          </li>
        </ol>

        <p className="text-[14px] font-[500] leading-[25px] text-[#333d47]">
          Custom Question Answering, a feature of Azure AI Language, is the new version of QnA Maker
          and is used to build a knowledge base for conversational AI.
        </p>

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-10 mb-4">
          9.1. Setup Process
        </h3>

        <ul className="pl-[1.5rem] p-[0_0_23px_1em] list-disc">
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            Navigate to the{' '}
            <a href="https://language.cognitive.azure.com/" className="text-[#0066B8] underline">
              Azure Language Studio.
            </a>
          </li>
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            Create a new Language resource and ensure the Custom question answering feature is
            enabled.
          </li>
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            Create a new project, linking it to existing content sources like FAQs or product
            manuals to build the knowledge base.
          </li>
          <li className="pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            Train, test, and deploy the project to get a queryable endpoint for your application or
            bot.
          </li>
        </ul>

        <h3 className="text-[24px] leading-[31px] font-[700] text-[#0066B8] mt-[3rem] mb-6">
          9.2. Learning Resources
        </h3>

        <ul className="pl-[1.5rem] p-[0_0_23px_1em] list-disc">
          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <a
              href="https://learn.microsoft.com/en-us/azure/ai-services/language-service/question-answering/overview"
              className="text-[#0066B8] underline"
            >
              Custom Question Answering Documentation
            </a>
          </li>

          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <a
              href="https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview"
              className="text-[#0066B8] underline"
            >
              Azure AI Language Documentation
            </a>
          </li>

          <li className="leading-[26px] pl-[0.5rem] mb-[0.75rem] text-[14px] font-[500] text-[#333d47]">
            <a
              href="https://learn.microsoft.com/en-us/azure/ai-services/language-service/question-answering/overview"
              className="text-[#0066B8] underline"
            >
              Microsoft Learn: Create a Question Answering Solution
            </a>
          </li>
        </ul>
      </section>
    </>
  )
}

export default Section9AzureAiLanguage
