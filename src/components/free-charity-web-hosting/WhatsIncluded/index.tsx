import React from 'react'
import { Globe, Code2, Mail, ShieldCheck, Wrench, HeartHandshake } from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <Code2 className="w-9 h-9" aria-hidden="true" />,
    title: 'Professionally built website',
    description:
      'A fast, secure website built for your charity on GitHub Pages using AI development agents — no page builders, no monthly bills.',
  },
  {
    icon: <Globe className="w-9 h-9" aria-hidden="true" />,
    title: 'Free .org domain name',
    description:
      'We register (and pay for) your .org domain through Cloudflare at wholesale cost, or take over managing one you already own.',
  },
  {
    icon: <Mail className="w-9 h-9" aria-hidden="true" />,
    title: 'Microsoft 365 email',
    description:
      'Professional name@yourcharity.org mailboxes set up through Microsoft for Nonprofits, so your team looks the part.',
  },
  {
    icon: <ShieldCheck className="w-9 h-9" aria-hidden="true" />,
    title: 'Security built in',
    description:
      'Every site ships with SSL, a global CDN, and DNS managed in Cloudflare — fast and protected out of the box.',
  },
  {
    icon: <Wrench className="w-9 h-9" aria-hidden="true" />,
    title: 'Hosting & maintenance',
    description:
      'We keep your site online and maintained over time. Existing WordPress sites stay supported as a labeled legacy option.',
  },
  {
    icon: <HeartHandshake className="w-9 h-9" aria-hidden="true" />,
    title: '$0, because we are a charity too',
    description:
      'Funded by donors and volunteers, not by you. There is no catch and no hidden fee — this is our mission.',
  },
]

const WhatsIncluded = () => {
  return (
    <section id="whats-included" className="py-[60px] scroll-mt-[120px]">
      <div className="w-[90%] lg:w-[80%] max-w-[1200px] mx-auto">
        <div className="text-center max-w-[720px] mx-auto mb-[48px]">
          <h2
            className="mb-[14px] text-[31px] font-[700] leading-[38px] text-[#0567B1]"
            data-font="cantata-font"
          >
            Everything your nonprofit gets
          </h2>
          <p className="text-[18px] font-[500] leading-[29px] text-[#333]" data-font="raleway-font">
            One free package covers the online essentials most charities pay hundreds of dollars a
            year for. Here is exactly what Free For Charity delivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[28px]">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-[10px] p-[28px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.12)] border border-[#eef2f6] transition-transform duration-200 hover:-translate-y-[4px]"
            >
              <div className="mb-[18px] inline-flex items-center justify-center w-[56px] h-[56px] rounded-[12px] bg-[#0567B1]/10 text-[#0567B1]">
                {feature.icon}
              </div>
              <h3
                className="mb-[10px] text-[20px] font-[700] leading-[26px] text-[#1a2e35]"
                data-font="cantata-font"
              >
                {feature.title}
              </h3>
              <p
                className="text-[16px] font-[500] leading-[26px] text-[#555]"
                data-font="raleway-font"
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatsIncluded
