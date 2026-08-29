import React from 'react'
import Link from 'next/link'
import { FileText, PanelBottom, ExternalLink } from 'lucide-react'
import { templateOptions, type TemplateOption } from '@/data/templates'

// Template facts (names, descriptions, repos) come from the shared data
// module so this chooser and /website-templates/ cannot drift apart; only
// the icons are chosen here.
const templateIcons: Record<TemplateOption['id'], React.ReactNode> = {
  'single-page': <FileText className="w-9 h-9" aria-hidden="true" />,
  'footer-only': <PanelBottom className="w-9 h-9" aria-hidden="true" />,
}

const templates = templateOptions.map((template) => ({
  ...template,
  icon: templateIcons[template.id],
}))

const ChooseYourTemplate = () => {
  return (
    <section id="choose-your-template" className="py-[60px] scroll-mt-[120px]">
      <div className="w-[90%] lg:w-[80%] max-w-[1200px] mx-auto">
        <div className="text-center max-w-[720px] mx-auto mb-[48px]">
          <h2
            className="mb-[14px] text-[31px] font-[700] leading-[38px] text-[#0567B1]"
            data-font="cantata-font"
          >
            Choose your starting point
          </h2>
          <p className="text-[18px] font-[500] leading-[29px] text-[#333]" data-font="raleway-font">
            Every FFC website starts from one of two open-source templates. Pick the one that
            matches where your charity is today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px] mb-[28px]">
          {templates.map((template) => (
            <div
              key={template.title}
              className="flex flex-col bg-white rounded-[10px] p-[28px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.12)] border border-[#eef2f6]"
            >
              <div className="mb-[18px] inline-flex items-center justify-center w-[56px] h-[56px] rounded-[12px] bg-[#0567B1]/10 text-[#0567B1]">
                {template.icon}
              </div>
              <p
                className="mb-[6px] text-[15px] font-[700] uppercase tracking-[0.08em] text-[#0567B1]"
                data-font="raleway-font"
              >
                {template.eyebrow}
              </p>
              <h3
                className="mb-[10px] text-[22px] font-[700] leading-[28px] text-[#1a2e35]"
                data-font="cantata-font"
              >
                {template.title}
              </h3>
              <p
                className="mb-[14px] text-[16px] font-[500] leading-[26px] text-[#555]"
                data-font="raleway-font"
              >
                {template.description}
              </p>
              <ul className="mb-[18px] space-y-[8px]">
                {template.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-[10px] text-[16px] font-[500] leading-[25px] text-[#555]"
                    data-font="raleway-font"
                  >
                    <span
                      className="mt-[9px] w-[7px] h-[7px] shrink-0 rounded-full bg-[#0567B1]"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <p
                className="mb-[20px] text-[15px] font-[500] leading-[24px] text-[#555] italic"
                data-font="raleway-font"
              >
                Both paths end the same way — your site validated live on its free GitHub Pages
                address, which unlocks your free .org domain.
              </p>
              <div className="mt-auto flex flex-col gap-[12px]">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center rounded-[10px] bg-[#0567B1] px-[28px] py-[13px] text-[16px] font-[700] text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-[#045a9b]"
                  data-font="raleway-font"
                >
                  Apply to get started
                </a>
                <a
                  href={template.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-[8px] text-[15px] font-[700] text-[#0567B1] hover:underline"
                  data-font="raleway-font"
                >
                  {template.repoLabel}
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center text-[16px] font-[500] leading-[26px] text-[#555]"
          data-font="raleway-font"
        >
          Not sure which to pick? Choose the Single Page Site Template — it&rsquo;s the fastest path
          to a validated site. For the full story of what each template ships and why every footer
          item exists, read{' '}
          <Link href="/website-templates/" className="font-[700] text-[#0567B1] hover:underline">
            website templates &amp; the FFC footer, explained
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

export default ChooseYourTemplate
