export function SecurityMeasures() {
  return (
    <>
      {/* Section 8 */}
      <ol className="list-decimal list-inside pb-[1em]" start={8}>
        <li>
          <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
            <strong>Security Measures</strong>
          </h2>
        </li>
      </ol>
      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        We implement a variety of security measures to maintain the safety of your personal
        information:
      </p>
      <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Secure Socket Layer (SSL) Technology:</strong> To encrypt sensitive information
          transmitted online.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Access Controls:</strong> Limited access to your personal data to those employees,
          agents, contractors, and other third parties who have a business need to know.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Regular Security Audits:</strong> To identify and address potential
          vulnerabilities.
        </li>
      </ul>
      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] italic">
        However, please note that no method of transmission over the Internet or method of
        electronic storage is 100% secure.
      </p>
    </>
  )
}
