import React from 'react'
import HelpForCharities from '@/components/ui/help-for-charity'

const index = () => {
  return (
    <div>
      <div className="bg-[#FCFCFC]">
        <div className="pt-20 pb-7 w-[90%] mx-auto">
          <HelpForCharities
            title="Help For Charities and Nonprofit Groups from an Unbiased Fellow Charity"
            description="Free For Charity is working every day to provide your charity, and you the charity or nonprofit director with the tools and techniques needed to thrive, FREE. Sign up today to get access to all of this for your nonprofit or charity group today even if you are still pending final 501c3 status."
          />
          <div className="h-[75px] w-full"></div>
          <HelpForCharities title="Free For Charity Products and Services" description="" />
          <HelpForCharities
            title="–Establishment and Governance Support–"
            description="At Free For Charity, we understand the importance of Non Profit Establishment and Governance Support. We are here to provide help for charities by offering expertise in effective business and technology management. Our dedicated team of volunteers works to manage all aspects of your charity’s projects, we help you find the software and tools you need to thrive."
            descriptionAlign="left"
          />
          <HelpForCharities
            title=""
            description="Looking to establish and govern your charity? We’ve got you covered. Our services include support for Charity Mission Plan “Pitch Deck” assistance, full plan development with budgeting and mission sections for IRS 1023 501c3 application, and consultation on initial board considerations. We also provide support for state and local nonprofit establishment, federal 501c3 nonprofit establishment, charity banking services, charity donation processing, and more. With Free For Charity, we connect students, professionals, and businesses with charities in need. Contact us today to get started on your charity’s mission!"
            descriptionAlign="left"
          />
          <HelpForCharities
            title="–What Happens Next–"
            description="Ready to get your website live? Once you’re accepted, you’ll order your GitHub Pages website service and we’ll build your site — it goes live and is validated on its free GitHub Pages address first. After your site is validated, you’ll order your free domain name and we’ll point it at your proven site. At checkout you’ll see a small $1 verification charge — it simply confirms that each request comes from a real charity — and a discount code that brings your total down to $0 arrives in your onboarding acceptance email (we never post the code publicly). Charity email through Microsoft 365 or Google Workspace becomes available once your 501(c)(3) status is approved."
            descriptionAlign="left"
          />
        </div>
      </div>
    </div>
  )
}

export default index
