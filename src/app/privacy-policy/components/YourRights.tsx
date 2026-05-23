export function YourRights() {
  return (
    <>
      {/* Section 7 */}
      <ol className="list-decimal list-inside pb-[1em]" start={7}>
        <li>
          <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
            <strong>Your Rights Over Your Data</strong>
          </h2>
        </li>
      </ol>
      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        You have the following data protection rights:
      </p>
      <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Access and Portability:</strong> Request a copy of the personal data we hold about
          you.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Correction:</strong> Request that we correct any personal information if it is
          inaccurate or incomplete.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Erasure:</strong> Request that we erase your personal data, under certain
          conditions.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Restrict Processing:</strong> Object to our processing of your personal data,
          under certain conditions.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Withdraw Consent:</strong> Withdraw your consent at any time where we relied on
          your consent to process your personal information.
        </li>
      </ul>
      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        To exercise these rights, please contact us at 520-222-8104.
      </p>
    </>
  )
}
