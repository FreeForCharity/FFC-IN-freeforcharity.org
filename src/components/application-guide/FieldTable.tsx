import React from 'react'
import {
  REQUIREMENT_LABELS,
  TRACKS,
  fieldRequirement,
  type ApplicationField,
  type FieldRequirement,
  type Track,
} from '@/data/application-fields'

const BADGE_CLASSES: Record<FieldRequirement, string> = {
  R: 'bg-[#fff1e6] text-[#9a3412] border border-[#f4b183] font-[700]',
  O: 'bg-[#f3f4f6] text-[#374151] border border-[#e5e7eb]',
  '-': 'text-[#6b7280] italic',
}

export function RequirementBadge({ value }: { value: FieldRequirement }) {
  return (
    <span
      className={`inline-block rounded-[6px] px-[8px] py-[2px] text-[13px] ${BADGE_CLASSES[value]}`}
    >
      {REQUIREMENT_LABELS[value]}
    </span>
  )
}

interface FieldTableProps {
  track: Track
  fields: ApplicationField[]
  caption: string
}

/** The fields one form asks in a section, with that form's requirement. */
const FieldTable: React.FC<FieldTableProps> = ({ track, fields, caption }) => (
  <div className="overflow-x-auto">
    <table className="w-full border border-[#e5e7eb] text-[15px]">
      <caption className="sr-only">{caption}</caption>
      <thead className="bg-[#f9fafb]">
        <tr>
          <th
            scope="col"
            className="w-[60%] border-b px-[12px] py-[8px] text-left font-[700] text-[#111]"
          >
            Field
          </th>
          <th
            scope="col"
            className="whitespace-nowrap border-b px-[12px] py-[8px] text-left font-[700] text-[#111]"
          >
            On the {TRACKS[track].name} application
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#f3f4f6]">
        {fields.map((field) => (
          <tr key={field.slug}>
            <th scope="row" className="px-[12px] py-[8px] text-left font-[400] text-[#333]">
              {field.label}
            </th>
            <td className="px-[12px] py-[8px]">
              <RequirementBadge value={fieldRequirement(field, track)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default FieldTable
