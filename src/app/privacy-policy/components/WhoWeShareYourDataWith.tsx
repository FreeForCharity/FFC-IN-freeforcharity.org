export function WhoWeShareYourDataWith() {
  return (
    <>
      {/* Section 5 */}
      <ol className="list-decimal list-inside pb-[1em]" start={5}>
        <li>
          <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
            <strong>Who We Share Your Data With</strong>
          </h2>
        </li>
      </ol>
      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        We respect your privacy and do not sell, trade, or rent your personal identification
        information to others. However:
      </p>
      <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Service Providers:</strong> We may share your information with third-party service
          providers to help us operate our website or administer activities on our behalf, such as
          sending out newsletters or surveys.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Spam Detection Services:</strong> Visitor comments may be checked through
          automated spam detection services.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Legal Obligations:</strong> We may disclose your information if required to do so
          by law or in response to valid requests by public authorities.
        </li>
      </ul>
    </>
  )
}
