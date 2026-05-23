import React from 'react'

interface StageProps {
  step: number
  title: string
  description: string
  children?: React.ReactNode
  first?: boolean
}

const Stage: React.FC<StageProps> = ({ step, title, description, children, first }) => {
  return (
    <div
      className={`flex flex-col gap-5 sm:flex-row sm:gap-[0px] flex-start ${first ? '' : 'mt-[32px]'}`}
    >
      <div className="bg-[#1f2937] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl flex-shrink-0 mr-4">
        {step}
      </div>

      <div className="w-full">
        <h3 className="text-[20px] leading-[20px] font-[600] mb-[8px] pb-[10px]text-[#1f2937]">
          {title}
        </h3>
        <p className="mt-[18px] text-[#374151] text-[14px] leading-[24px] font-[500]">
          {description}
        </p>
        {children}
      </div>
    </div>
  )
}

export default Stage
