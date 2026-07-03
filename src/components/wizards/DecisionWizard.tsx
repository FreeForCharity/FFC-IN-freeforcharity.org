'use client'

import React, { useState } from 'react'
import Link from 'next/link'

/**
 * Shared client-side decision wizard (issues #367, #397): a small
 * question-by-question flow that ends in a recommendation. Static-export
 * friendly — pure client state, no network, fully keyboard operable
 * (radio groups + buttons).
 */

export interface WizardOutcome {
  id: string
  title: string
  body: string
  links: { label: string; href: string }[]
}

export interface WizardOption {
  label: string
  /** id of the next question, or `outcome:<id>` to finish */
  next: string
}

export interface WizardQuestion {
  id: string
  prompt: string
  options: WizardOption[]
}

export interface WizardConfig {
  firstQuestion: string
  questions: WizardQuestion[]
  outcomes: WizardOutcome[]
}

export default function DecisionWizard({ config }: { config: WizardConfig }) {
  const [currentId, setCurrentId] = useState(config.firstQuestion)
  const [outcomeId, setOutcomeId] = useState<string | null>(null)
  const [trail, setTrail] = useState<string[]>([])

  const question = config.questions.find((q) => q.id === currentId)
  const outcome = outcomeId ? config.outcomes.find((o) => o.id === outcomeId) : null

  function choose(option: WizardOption) {
    if (option.next.startsWith('outcome:')) {
      setOutcomeId(option.next.slice('outcome:'.length))
    } else {
      setTrail([...trail, currentId])
      setCurrentId(option.next)
    }
  }

  function restart() {
    setCurrentId(config.firstQuestion)
    setOutcomeId(null)
    setTrail([])
  }

  function back() {
    const prev = trail[trail.length - 1]
    if (outcomeId) {
      setOutcomeId(null)
      return
    }
    if (prev) {
      setTrail(trail.slice(0, -1))
      setCurrentId(prev)
    }
  }

  if (outcome) {
    return (
      <div className="border border-gray-200 rounded-lg p-6" aria-live="polite">
        <h2 className="font-[var(--font-faustina)] text-[28px] leading-[36px] mb-3">
          {outcome.title}
        </h2>
        <p className="font-[var(--font-lato)] text-[17px] leading-[27px] text-[#555] mb-4">
          {outcome.body}
        </p>
        <ul className="space-y-2 mb-6">
          {outcome.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-[var(--font-lato)] text-[17px] font-[600] text-[#0567B1] underline"
              >
                {link.label} →
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={restart}
          className="font-[var(--font-lato)] text-[15px] text-[#555] underline cursor-pointer"
        >
          Start over
        </button>
      </div>
    )
  }

  if (!question) return null

  return (
    <div className="border border-gray-200 rounded-lg p-6" aria-live="polite">
      <p className="font-[var(--font-lato)] text-[14px] text-[#767672] mb-2">
        Question {trail.length + 1}
      </p>
      <h2 className="font-[var(--font-faustina)] text-[26px] leading-[34px] mb-4">
        {question.prompt}
      </h2>
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => choose(option)}
            className="block w-full text-left border border-gray-300 rounded-lg px-4 py-3
              font-[var(--font-lato)] text-[17px] text-[#333] cursor-pointer
              hover:border-[#0567B1] hover:bg-[#f4f9fd] transition-colors"
          >
            {option.label}
          </button>
        ))}
      </div>
      {trail.length > 0 ? (
        <button
          type="button"
          onClick={back}
          className="mt-4 font-[var(--font-lato)] text-[15px] text-[#555] underline cursor-pointer"
        >
          ← Back
        </button>
      ) : null}
    </div>
  )
}
