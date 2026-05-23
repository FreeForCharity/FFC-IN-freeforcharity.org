export function AdditionalInformation() {
  return (
    <>
      {/* Section 14 */}
      <ol className="list-decimal list-inside pb-[1em]" start={14}>
        <li>
          <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
            <strong>Additional Information</strong>
          </h2>
        </li>
      </ol>

      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        <strong>14.1. Data Protection Officer</strong>
      </p>
      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        We have appointed a Data Protection Officer (DPO) responsible for overseeing questions in
        relation to this Privacy Policy:
      </p>
      <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Contact DPO:</strong> Clarke Moyer{' '}
          <a href="mailto:clarkemoyer@freeforcharity.org" className="text-[#0056B3] underline">
            clarkemoyer@freeforcharity.org
          </a>{' '}
          520-222-8104
        </li>
      </ul>

      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[700] mt-[1.5em]">
        Your trust matters to us, and we are committed to protecting your personal information and
        using it responsibly.
      </p>
    </>
  )
}
