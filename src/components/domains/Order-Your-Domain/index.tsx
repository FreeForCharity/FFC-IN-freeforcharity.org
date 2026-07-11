import React from 'react'
import StepCard from '@/components/ui/StepCard'
import { hubAddProduct, DOMAIN_PID } from '@/lib/config'

const HowToOrderDomain = () => {
  const steps = [
    {
      number: 1,
      title: 'Step 1',
      description: 'Complete FFC onboarding',
      linkText: 'How to apply',
      innerbg: 'bg-[#8A6400]',
      outerbg: 'bg-[#fff]',
      linkUrl: '#apply',
    },
    {
      number: 2,
      title: 'Step 2',
      description: 'Your website goes live and is validated on its free GitHub Pages address',
      linkText: 'How your website works',
      innerbg: 'bg-[#2A6F9E]',
      outerbg: 'bg-[#2A6F9E]',
      linkUrl: '/free-charity-web-hosting/',
    },
    {
      number: 3,
      title: 'Step 3',
      description: 'We register or transfer your .org domain and point it at your validated site',
      linkText: 'See your options',
      innerbg: 'bg-[#2A6F9E]',
      outerbg: 'bg-[#2A6F9E]',
      linkUrl: '#domain-options',
    },
    {
      number: 4,
      title: 'Step 4',
      description:
        'Create a free personal Cloudflare account — we add you as a domain admin and manage DNS for you',
      linkText: 'Create a Cloudflare account',
      innerbg: 'bg-[#8A6400]',
      outerbg: 'bg-[#fff]',
      linkUrl: 'https://dash.cloudflare.com/sign-up',
    },
  ]

  return (
    <section
      id="how-it-works"
      className="py-[40px] bg-[#f2f2f2] relative overflow-hidden scroll-mt-[120px]"
    >
      {/* Top Wave */}
      <div
        className="absolute top-0 w-full h-[100px] z-[1] scale-y-[-1] bg-no-repeat bg-top"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiNGRkZGRkYiPjxwYXRoIGQ9Ik02NDAgMTM5TDAgMHYxNDBoMTI4MFYwTDY0MCAxMzl6IiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTY0MCAxMzlMMCA0MnY5OGgxMjgwVjQybC02NDAgOTd6Ii8+PC9nPjwvc3ZnPg==')",
          backgroundSize: '100% 100px',
        }}
      />

      <div className="relative z-[2]">
        <div className="pb-[3px] w-[80%] max-w-6xl mx-auto mt-[2px] pt-[30px]">
          <h2
            className="text-center mb-[16px] text-[30px] md:text-[35px] text-[#0567B1] font-[700] leading-[46px]"
            data-font="cantata-font"
          >
            HOW YOUR DOMAIN WORKS — IN FOUR STEPS
          </h2>
          <p
            className="md:w-[85%] mx-auto text-center text-[20px] font-medium leading-[30px]"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            Free For Charity holds and manages your domain in our Cloudflare account — you never
            have to run a registrar or edit DNS yourself. Domains come <b>after</b> your website: we
            only spend money on a domain once your site is live and validated on its free GitHub
            Pages address. Then you create a personal Cloudflare login so we can add you (and anyone
            else on your team) as a domain admin.
          </p>
        </div>

        <div className="w-[80%] max-w-6xl mx-auto mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {steps.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        </div>

        <div className="pt-[30px] w-[80%] max-w-6xl mx-auto">
          <p
            className="md:w-[85%] mx-auto text-center text-[20px] font-medium leading-[30px]"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            You have two supported options: have us register a brand new .org domain, or transfer a
            domain you already own into Free For Charity&apos;s Cloudflare Registrar. Both order
            forms ask for the live GitHub Pages address of your validated website — that&apos;s the
            gate that unlocks the purchase. Transferring a domain you already own? You&apos;ll also
            need your current registrar, the authorization (EPP) code, and the domain unlocked with
            WHOIS privacy turned off before you start.
          </p>
          <div
            id="domain-options"
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 scroll-mt-[120px]"
          >
            <a
              href={hubAddProduct(DOMAIN_PID.register)}
              className="rounded border-2 border-[#0567B1] px-6 py-2.5 text-[18px] font-medium text-[#0567B1] transition-colors hover:bg-[#0567B1] hover:text-white"
              data-font="raleway-font"
            >
              Register a new .org domain
            </a>
            <a
              href={hubAddProduct(DOMAIN_PID.transfer)}
              className="rounded border-2 border-[#0567B1] px-6 py-2.5 text-[18px] font-medium text-[#0567B1] transition-colors hover:bg-[#0567B1] hover:text-white"
              data-font="raleway-font"
            >
              Transfer an existing domain
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Wave (fixed perfectly) */}
      <div
        className="absolute bottom-0 left-0 w-full h-[100px] z-[1] bg-no-repeat bg-bottom"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiNGRkZGRkYiPjxwYXRoIGQ9Ik02NDAgMTM5TDAgMHYxNDBoMTI4MFYwTDY0MCAxMzl6IiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTY0MCAxMzlMMCA0MnY5OGgxMjgwVjQybC02NDAgOTd6Ii8+PC9nPjwvc3ZnPg==')",
          backgroundSize: '100% 100px',
        }}
      ></div>
    </section>
  )
}

export default HowToOrderDomain
