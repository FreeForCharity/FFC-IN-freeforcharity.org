'use client'

import React from 'react'
import EducationalSitesCard from '@/components/ui/EducationalSitesCard'
import Reveal from '@/components/ui/Reveal'
import { assetPath } from '@/lib/assetPath'

const index = () => {
  const firstGrid = [
    {
      imageSrc: assetPath('/Images/upwork.webp'),
      title: 'ittybiz.com Great site for ultra small business info',
      link: 'http://ittybiz.com/about/',
    },
    {
      imageSrc: assetPath('/Images/upwork.webp'),
      title: 'Earnable (formerly Earn1K) Program for earning your first $1000 on the side by Ramit',
      link: 'https://www.iwillteachyoutoberich.com/get-earnable/',
    },
    {
      imageSrc: assetPath('/Images/upwork.webp'),
      title: 'appsumo.com Discounted deals on software and online courses',
      link: 'https://appsumo.com/courses-learning/',
    },
  ]

  const secondGrid = [
    {
      imageSrc: assetPath('/Images/upwork.webp'),
      title: '100startup.com First book on starting a business',
      link: 'https://100startup.com/',
    },
    {
      imageSrc: assetPath('/Images/upwork.webp'),
      title: 'theleanstartup.com The next step up book on starting a business',
      link: 'http://theleanstartup.com/',
    },
  ]

  return (
    <div
      className="bg-cover bg-center pt-[67px] pb-[67px]"
      style={{
        backgroundImage: `linear-gradient(180deg,rgba(232,141,51,0.5) 0%,rgba(44,96,118,0.89) 100%),url('${assetPath('/Images/pexels-serpstat-572056.webp')}')`,
      }}
    >
      <div className="py-[27px] w-[80%] mx-auto">
        <h1 className="text-center pb-[10px] tracking-[1px] mb-[11px] text-[30px] md:text-[40px] text-[#333] font-[700] leading-[44px]">
          Educational Sites for Starting a Business
        </h1>
        <div className="w-[18%] mx-auto h-[5px] bg-[#b35000]"></div>
      </div>

      {/* First Grid */}
      <div className="py-[27px] w-[90%] lg:w-[80%] mx-auto max-w-[1080px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] lg:gap-[60px] items-start">
        {firstGrid.map((card, idx) => (
          <Reveal key={idx}>
            <EducationalSitesCard {...card} />
          </Reveal>
        ))}
      </div>

      {/* Second Grid */}
      <div className="py-[27px] w-[90%] md:w-[70%] lg:w-[50%] mx-auto max-w-[1080px] grid grid-cols-1 sm:grid-cols-2 gap-[20px] lg:gap-[60px] items-start">
        {secondGrid.map((card, idx) => (
          <Reveal key={idx}>
            <EducationalSitesCard {...card} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default index
