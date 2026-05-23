export function DataRetention() {
  return (
    <>
      {/* Section 6 */}
      <ol className="list-decimal list-inside pb-[1em]" start={6}>
        <li>
          <h2 className="text-[26px] leading-[26px] font-[700] text-[#333] mb-[10px]">
            <strong>Data Retention</strong>
          </h2>
        </li>
      </ol>

      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500]">
        <strong>6.1. Comments</strong>
      </p>
      <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>Retention Period:</strong> Comments and their metadata are retained indefinitely.
          This allows us to recognize and approve any follow-up comments automatically.
        </li>
      </ul>

      <p className="text-[14px] text-[#666] pb-[10px] leading-[24px] font-[500] mt-[1em]">
        <strong>6.2. Registered Users</strong>
      </p>
      <ul className="list-inside list-disc space-y-[4px] pb-[1em]">
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>User Profiles:</strong> For users that register on our website, we store the
          personal information provided in their user profile.
        </li>
        <li className="text-[14px] text-[#666] leading-[24px] font-[500]">
          <strong>User Rights:</strong> All users can see, edit, or delete their personal
          information at any time (except for changing their username). Website administrators can
          also view and edit this information.
        </li>
      </ul>
    </>
  )
}
