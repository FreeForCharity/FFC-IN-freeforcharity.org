'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { hubAddProduct, DOMAIN_PID } from '@/lib/config'
import { assetPath } from '@/lib/assetPath'
import { toLabel, nameNotes } from '@/lib/domain-name'

type Status = 'available' | 'registered' | 'unknown'

type CheckResult = {
  name: string
  org: Status
  com: Status
  net: Status
  orgAvailable: boolean
  nearPeer: boolean
  warnings: string[]
}

const CheckYourOrg = () => {
  const [q, setQ] = useState('')
  const [result, setResult] = useState<CheckResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const label = toLabel(q)
  const notes = label ? nameNotes(label) : []

  async function check(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setResult(null)
    if (!label) {
      setError('Enter a name using letters, numbers, and hyphens (no spaces).')
      return
    }
    setLoading(true)
    try {
      const r = await fetch(`${assetPath('/api/domain-check.php')}?q=${encodeURIComponent(label)}`)
      if (r.status === 400) {
        const j = (await r.json().catch(() => ({}))) as { message?: string }
        setError(j.message || 'Please check the name and try again.')
        return
      }
      if (!r.ok) throw new Error('lookup failed')
      // Guard: in dev / static previews the .php isn't executed (served as a file),
      // so the 200 body isn't JSON — fall through to the friendly error below.
      if (!(r.headers.get('content-type') || '').includes('application/json')) {
        throw new Error('non-json response')
      }
      setResult((await r.json()) as CheckResult)
    } catch {
      setError(
        'We couldn’t check availability right now. Try again in a moment, or send us your shortlist via a support ticket and we’ll check for you.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="check-your-domain" className="py-[50px] bg-white scroll-mt-[100px]">
      <div className="w-[80%] max-w-4xl mx-auto">
        <h2
          className="text-center text-[30px] md:text-[35px] text-[#0567B1] font-[700] leading-[46px] mb-3"
          data-font="cantata-font"
        >
          CHECK YOUR .ORG — AND PICK A NAME THAT WORKS
        </h2>
        <p
          className="text-center text-[18px] leading-[28px] text-[#555] mb-8"
          style={{ fontFamily: 'Raleway, sans-serif' }}
        >
          See if your charity’s <strong>.org</strong> is available, and we’ll flag near-matches (a{' '}
          <em>.com</em> or <em>.net</em> someone else owns) that could confuse donors or hurt your
          SEO. Check names as early as you like — we register your .org for you, free, once your
          website is live and validated on its GitHub Pages address.
        </p>

        <form
          onSubmit={check}
          className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-2xl mx-auto"
        >
          <div className="flex flex-1 items-center rounded border-2 border-[#2A6F9E] overflow-hidden bg-white">
            <input
              type="text"
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                setResult(null) // don't keep a stale verdict once the name changes
                setError('')
              }}
              placeholder="yourcharityname"
              aria-label="Domain name to check"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              disabled={loading}
              className="flex-1 px-4 py-3 text-[18px] outline-none disabled:bg-[#f7f7f7]"
            />
            <span className="px-3 py-3 text-[18px] font-medium text-[#2A6F9E] bg-[#f2f2f2]">
              .org
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-[#0567B1] px-6 py-3 text-[18px] font-medium text-white transition-colors hover:bg-[#045492] disabled:opacity-60"
          >
            {loading ? 'Checking…' : 'Check availability'}
          </button>
        </form>

        {notes.length > 0 && !result && (
          <ul className="mt-4 max-w-2xl mx-auto text-[15px] text-[#8A6400] list-disc pl-6">
            {notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}

        {error && (
          <p className="mt-5 max-w-2xl mx-auto text-center text-[16px] text-[#b23b3b]">{error}</p>
        )}

        {result && (
          <div className="mt-6 max-w-2xl mx-auto rounded border border-[#e0e6ea] p-6 bg-[#f8fafb]">
            {result.orgAvailable ? (
              <>
                <p className="text-[20px] font-[700] text-[#1a7a3c]">
                  ✓ {result.name}.org is available!
                </p>
                {result.nearPeer ? (
                  <div className="mt-3">
                    <p className="text-[15px] text-[#8A6400] font-medium">
                      Heads up before you choose it:
                    </p>
                    <ul className="mt-1 text-[15px] text-[#8A6400] list-disc pl-6">
                      {result.warnings.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  </div>
                ) : result.com === 'available' && result.net === 'available' ? (
                  <p className="mt-2 text-[15px] text-[#1a7a3c]">
                    No conflicting .com or .net — this is a clean, distinctive name.
                  </p>
                ) : (
                  <p className="mt-2 text-[15px] text-[#555]">
                    The .org is available. We couldn’t fully confirm the matching .com/.net just now
                    — we’ll double-check when we register it for you.
                  </p>
                )}
                {notes.length > 0 && (
                  <ul className="mt-3 text-[15px] text-[#8A6400] list-disc pl-6">
                    {notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                )}
                <a
                  href={hubAddProduct(DOMAIN_PID.register)}
                  className="mt-5 inline-block rounded bg-[#0567B1] px-6 py-2.5 text-[18px] font-medium text-white transition-colors hover:bg-[#045492]"
                >
                  Get {result.name}.org free &raquo;
                </a>
                <p className="mt-3 text-[14px] text-[#555]">
                  Heads up: the order form asks for the live GitHub Pages address of your validated
                  website — we purchase domains only after your site is proven. No site yet? Note
                  the name and start with{' '}
                  <Link href="/help-for-charities/" className="text-[#0567B1] underline">
                    onboarding
                  </Link>
                  .
                </p>
              </>
            ) : result.org === 'registered' ? (
              <>
                <p className="text-[20px] font-[700] text-[#b23b3b]">
                  {result.name}.org is already registered.
                </p>
                <p className="mt-2 text-[15px] text-[#555]">
                  Try another name above. If <strong>you</strong> already own {result.name}.org, we
                  can transfer it into Free For Charity and manage it for you.
                </p>
                <a
                  href={hubAddProduct(DOMAIN_PID.transfer)}
                  className="mt-4 inline-block rounded border-2 border-[#0567B1] px-6 py-2 text-[18px] font-medium text-[#0567B1] transition-colors hover:bg-[#0567B1] hover:text-white"
                >
                  It’s mine — transfer it to FFC &raquo;
                </a>
                <p className="mt-3 text-[14px] text-[#555]">
                  Transfers are processed once your FFC website is live and validated on its GitHub
                  Pages address — the order form asks for that URL.
                </p>
              </>
            ) : (
              <p className="text-[16px] text-[#555]">
                We couldn’t confirm {result.name}.org right now. Make a shortlist of three names and{' '}
                <Link href="/contact-us/" className="text-[#0567B1] underline">
                  send it to us
                </Link>{' '}
                — we’ll check and register the best available one.
              </p>
            )}
          </div>
        )}

        {/* ---- Merged from the former “Choosing your .org domain” guide ---- */}
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-[22px] font-[700] text-[#0567B1] mb-2">
              Rules for a name that works
            </h3>
            <ul
              className="text-[16px] leading-[26px] text-[#333] list-disc pl-5 space-y-1"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              <li>
                <strong>Shorter beats clever.</strong> People type it on phones and read it on
                flyers — aim for 2–3 words.
              </li>
              <li>
                <strong>Say it aloud.</strong> If you have to spell it or explain a pun, keep
                looking.
              </li>
              <li>
                <strong>Skip hyphens and numbers</strong> unless your legal name demands one.
              </li>
              <li>
                <strong>Match your everyday name,</strong> not your full legal name — if everyone
                says “Hope Pantry,” <em>hopepantry.org</em> beats{' '}
                <em>hopecommunityfoodpantryinc.org</em>.
              </li>
              <li>
                <strong>Check the words at the seams</strong> when words run together.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[22px] font-[700] text-[#0567B1] mb-2">
              Why .org, and who owns it
            </h3>
            <p
              className="text-[16px] leading-[26px] text-[#333] mb-3"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              <strong>.org</strong> has meant “nonprofit” to the public since 1985 — donors trust it
              and search engines expect it for charities, and it’s almost always more available than
              .com.
            </p>
            <p
              className="text-[16px] leading-[26px] text-[#333]"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              Free For Charity <strong>pays for and renews</strong> your .org (about $16.50/year —
              our cost, never yours) and holds the registration and DNS so renewals never lapse and
              security stays configured. Your organization’s right to the name is documented, and{' '}
              <strong>transfer-out is always available</strong> on request — you’re never locked in.
              And “wrong” is recoverable: you can add a better domain later and redirect the old
              one.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckYourOrg
