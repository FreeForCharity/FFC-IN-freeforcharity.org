import React from 'react'
import Transparentbtn from '@/components/ui/Transparentbtn'
import { hubCart } from '@/lib/config'

const index: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center mb-10 pt-10">
      <div className="w-[90%] md:w-[80%] mx-auto text-center">
        <h1
          className="text-[22px] sm:text-[24px] md:text-[26px] font-medium text-[#333] mb-6"
          data-font="aria-font"
        >
          Ready to Get Started Now?
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-6">
          <Transparentbtn text="501(c)3 Charities Click Here To Get Started!" href={hubCart(0)} />
          <Transparentbtn
            text="Pre-501(c)3 Charities Click Here to Get Started!"
            href={hubCart(1)}
          />
        </div>
      </div>
    </div>
  )
}

export default index
