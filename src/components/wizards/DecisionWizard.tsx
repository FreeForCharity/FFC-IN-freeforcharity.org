'use client'

import React, { useState } from 'react'
import Link from 'next/link'

/**
 * Shared client-side decision wizard (issues #367, #397): a small
 * question-by-question flow that ends in a recommendation. Static-export
 * friendly — pure client state, no network, fully keyboard operable
 * (each answer is a native button; back/restart are buttons too).
 */

export interface WizardAction {
  label: string
  href: string
  /** Opens in a new tab (e.g. the WHMCS hub application forms). */
  external?: boolean
}

export interface WizardOutcome {
  id: string
  title: string
  body: string
  /**
   * Prominent call-to-action buttons — the application buttons an eligible
   * outcome converges on. Rendered as filled buttons above the secondary links.
   */
  actions?: WizardAction[]
  /** Secondary, informational links rendered under the actions. */
  links?: { label: string; href: string }[]
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

interface WizardState {
  currentId: string
  outcomeId: string | null
  trail: string[]
}

export default function DecisionWizard({ config }: { config: WizardConfig }) {
  // Single state object updated functionally, so navigation history can never
  // be dropped by stale closures under rapid clicks / concurrent rendering.
  const [state, setState] = useState<WizardState>({
    currentId: config.firstQuestion,
    outcomeId: null,
    trail: [],
  })
  const { currentId, outcomeId, trail } = state

  const question = config.questions.find((q) => q.id === currentId)
  const outcome = outcomeId ? config.outcomes.find((o) => o.id === outcomeId) : null

  function choose(option: WizardOption) {
    setState((s) =>
      option.next.startsWith('outcome:')
        ? { ...s, outcomeId: option.next.slice('outcome:'.length) }
        : { currentId: option.next, outcomeId: null, trail: [...s.trail, s.currentId] }
    )
  }

  function restart() {
    setState({ currentId: config.firstQuestion, outcomeId: null, trail: [] })
  }

  function back() {
    setState((s) => {
      if (s.outcomeId) return { ...s, outcomeId: null }
      const prev = s.trail[s.trail.length - 1]
      if (!prev) return s
      return { currentId: prev, outcomeId: null, trail: s.trail.slice(0, -1) }
    })
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
        {outcome.actions?.length ? (
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
            {outcome.actions.map((action) =>
              action.external ? (
                <a
                  key={action.href}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-[#0567B1] px-6 py-3
                    font-[var(--font-lato)] text-[17px] font-[700] text-white
                    transition-colors hover:bg-[#045a9b]"
                >
                  {action.label}
                </a>
              ) : (
                <Link
                  key={action.href}
                  href={action.href}
                  className="inline-flex items-center justify-center rounded-lg bg-[#0567B1] px-6 py-3
                    font-[var(--font-lato)] text-[17px] font-[700] text-white
                    transition-colors hover:bg-[#045a9b]"
                >
                  {action.label}
                </Link>
              )
            )}
          </div>
        ) : null}
        {outcome.links?.length ? (
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
        ) : null}
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
