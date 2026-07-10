import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import OrangeFaqItem from '@/components/ui/OrangeFaqItem'
import { assetPath } from '@/lib/assetPath'

/**
 * Homepage "Our Programs" showcase. Speaks to both audiences the homepage
 * serves: charities looking for services, and donors who fund them. Each of the
 * three FFC programs is a self-contained card — icon, one-line value prop, the
 * value accordions (leading with the charity/donor benefit, then the reciprocal
 * "For us" so the transparency is intact), and a single clear CTA to its page.
 */

interface ValueItem {
  title: string
  /** The benefit to the charity/donor — always shown first. */
  forYou: string
  /** How Free For Charity benefits — the reciprocal, transparent half. */
  forUs?: string
}

interface Project {
  icon: string
  name: string
  valueProp: string
  href: string
  ctaLabel: string
  items: ValueItem[]
}

const projects: Project[] = [
  {
    icon: '/Svgs/FFC-Domains.svg',
    name: 'FFC Domains',
    valueProp:
      'Free .org domain names, Microsoft 365 email, and Teams for verified 501(c)(3) charities — registered and managed for you.',
    href: '/domains/',
    ctaLabel: 'Explore FFC Domains',
    items: [
      {
        title: '.org Domain Registration',
        forYou:
          "A .org name boosts your charity's credibility, trustworthiness, and online presence — making it easier to attract donors and supporters.",
        forUs:
          'Managing every charity domain in one place lets us keep them secure and automatically renewed.',
      },
      {
        title: 'Cloudflare DNS',
        forYou: 'Faster website load times and enhanced security.',
        forUs: 'Centralized management and automation tools.',
      },
      {
        title: 'Charity Email Address',
        forYou:
          'A professional address (e.g. yourname@yourcharity.org) builds trust with donors, volunteers, and stakeholders.',
        forUs:
          'Professional email keeps our platform secure and gives volunteers a reliable way to support you.',
      },
      {
        title: 'Microsoft 365',
        forYou: 'Professional email and collaboration tools.',
        forUs: 'Streamlined communication and support processes.',
      },
    ],
  },
  {
    icon: '/Svgs/FFC-Hosting.svg',
    name: 'FFC Hosting',
    valueProp:
      'Free, fast, secure websites on GitHub Pages — built for your charity by AI development agents (Claude and GitHub Copilot).',
    href: '/free-charity-web-hosting/',
    ctaLabel: 'Explore FFC Hosting',
    items: [
      {
        title: 'GitHub Pages Hosting',
        forYou:
          'Free, reliable static-site hosting with automatic HTTPS and custom-domain support.',
        forUs: 'Simplified deployment and maintenance with version-controlled websites.',
      },
      {
        title: 'GitHub Copilot AI Development',
        forYou:
          'Professional, modern websites built with AI-assisted development for faster delivery.',
        forUs: 'Efficient website creation and consistent code quality across every charity.',
      },
      {
        title: 'Static Site Architecture',
        forYou: 'Fast-loading, secure websites with no server maintenance required.',
        forUs: 'Zero hosting costs and fewer security vulnerabilities for partner organizations.',
      },
      {
        title: 'Modern Web Technologies',
        forYou: 'Beautiful, responsive websites built with React, Next.js, and Tailwind CSS.',
        forUs: 'A standardized stack that makes support and volunteer training efficient.',
      },
    ],
  },
  {
    icon: '/Svgs/FFC-Consulting.svg',
    name: 'FFC Consulting',
    valueProp:
      'Introductions to the trusted partners and services that help your charity do more with less.',
    href: '/consulting/',
    ctaLabel: 'Explore FFC Consulting',
    items: [
      {
        title: 'Northwest Registered Agent',
        forYou:
          'Stay compliant with state requirements — registered-agent service, nonprofit incorporation, and your initial IRS charity application.',
        forUs:
          'We help charities meet legal requirements and train volunteers on formation and IRS filings.',
      },
      {
        title: 'Idealist.org / VolunteerMatch.org',
        forYou: 'Access to a large pool of potential volunteers.',
        forUs: 'Validation of your active community engagement.',
      },
      {
        title: 'TechSoup.org',
        forYou: 'Access to discounted software and technology resources.',
        forUs: 'Additional validation of your nonprofit status.',
      },
      {
        title: 'PayPal / Zeffy',
        forYou: 'Easy, secure online donation processing.',
        forUs: 'A standardized financial-transaction system across all partners.',
      },
    ],
  },
]

const ValueItemBody = ({ item }: { item: ValueItem }) => (
  <div className="space-y-3">
    <p>
      <span className="font-[700] text-[#2A6682]">For you:</span> {item.forYou}
    </p>
    {item.forUs ? (
      <p className="text-[#555]">
        <span className="font-[700] text-[#b35000]">For us:</span> {item.forUs}
      </p>
    ) : null}
  </div>
)

const ProjectShowcase = ({ project }: { project: Project }) => (
  <div className="bg-white rounded-[16px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.12)] border border-[#eef2f6] p-[28px] lg:p-[40px]">
    {/* Header: icon + name + value prop + primary CTA */}
    <div className="flex flex-col lg:flex-row lg:items-center gap-[24px] lg:gap-[32px] mb-[32px]">
      <div className="flex items-center gap-[20px] flex-1">
        <div className="flex-shrink-0 w-[88px] h-[88px] flex items-center justify-center p-2 bg-[#2A6682] rounded-full">
          <div className="relative w-[50px] h-[50px]">
            <Image src={assetPath(project.icon)} alt={`${project.name} icon`} fill />
          </div>
        </div>
        <div>
          <h3 className="text-[30px] lg:text-[36px] font-[400] leading-tight" data-font="lato-font">
            {project.name}
          </h3>
          <p
            className="mt-[6px] text-[19px] lg:text-[21px] font-[400] text-[#333]"
            data-font="lato-font"
          >
            {project.valueProp}
          </p>
        </div>
      </div>
      <Link
        href={project.href}
        className="inline-flex items-center justify-center gap-[8px] rounded-[12px] bg-[#2A6682] px-[24px] py-[14px] text-[18px] font-[500] text-white transition-colors hover:bg-[#1f4f63] whitespace-nowrap self-start lg:self-auto"
        data-font="lato-font"
      >
        <span>{project.ctaLabel}</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>

    {/* Value accordions */}
    <div>
      {project.items.map((item) => (
        <OrangeFaqItem key={item.title} title={item.title}>
          <ValueItemBody item={item} />
        </OrangeFaqItem>
      ))}
    </div>
  </div>
)

const index = () => {
  return (
    <div id="programs" className="py-[52px]">
      <div className="w-[90%] lg:px-[20px] mx-auto max-w-[1200px]">
        <h2
          className="font-[400] text-[40px] lg:text-[48px] tracking-[0] text-center mx-auto mb-[16px]"
          data-font="faustina-font"
        >
          Our Programs
        </h2>
        <p
          className="text-[20px] lg:text-[22px] font-[400] text-center text-[#444] max-w-[860px] mx-auto mb-[50px]"
          data-font="lato-font"
        >
          Three programs give nonprofits the tools most charities pay dearly for — and give donors a
          direct, transparent way to power real impact. Here&apos;s what each delivers, and how it
          works for everyone involved.
        </p>

        <div className="space-y-[32px]">
          {projects.map((project) => (
            <ProjectShowcase key={project.name} project={project} />
          ))}
        </div>

        {/* Two-audience CTA: charities apply, donors fund */}
        <div className="mt-[60px] text-center">
          <h3 className="text-[30px] lg:text-[36px] font-[400] pb-[10px]" data-font="lato-font">
            Ready to get involved?
          </h3>
          <p
            className="text-[19px] font-[400] text-[#444] max-w-[680px] mx-auto mb-[30px]"
            data-font="lato-font"
          >
            Run a nonprofit, or want to help power these programs? Pick your path.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-[20px]">
            <Link
              href="/eligibility-check/"
              className="inline-flex items-center justify-center rounded-[16px] bg-[#2A6682] px-[32px] py-[18px] text-[22px] font-[400] text-white transition-colors hover:bg-[#1f4f63]"
              data-font="lato-font"
            >
              Check your charity&apos;s eligibility
            </Link>
            <Link
              href="/donate/"
              className="inline-flex items-center justify-center rounded-[16px] border-[3px] border-[#b35000] px-[32px] py-[16px] text-[22px] font-[400] text-[#b35000] transition-colors hover:bg-[#b35000] hover:text-white"
              data-font="lato-font"
            >
              Donate to fund these programs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
