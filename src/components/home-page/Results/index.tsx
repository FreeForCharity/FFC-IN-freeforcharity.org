import React from 'react'
import ResultCard from '@/components/ui/ResultCard'
import { resultCards, reportingYear } from '@/data/impact'

const index = () => {
  return (
    <div>
      <div className="w-[90%] mx-auto py-[52px] lg:px-[20px]">
        <h2
          className="mt-[2px] pb-[10px] text-[30px] md:text-[48px] font-[400] leading-[46px]  text-center mb-[40px]"
          data-font="faustina-font"
        >
          Results - {reportingYear}
        </h2>
        <div className="pt-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]">
          {resultCards.map((card) => (
            <ResultCard key={card.description} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default index
