import React from 'react'
import Link from 'next/link'
import { TRACKS, type Track } from '@/data/application-fields'

const MissionStatement: React.FC<{ track: Track }> = ({ track }) => (
  <>
    <p>
      The {TRACKS[track].name} application asks for your mission, a tagline, two descriptions and at
      least one program. We build your website from these words right after approval, so a little
      care here goes a long way.
    </p>

    <h2>Your mission statement</h2>
    <p>
      A strong mission statement says <strong>who you help</strong>, <strong>what you do</strong>,
      and <strong>the change you create</strong>, in one or two plain sentences a stranger
      understands straight away. Name the people (or animals, or place) you serve and the outcome
      you work toward. Leave out jargon, buzzwords and long lists of activities.
    </p>
    <ul>
      <li>
        <strong>Clear:</strong> “We provide emergency shelter and meals to families experiencing
        homelessness in Pima County.”
      </li>
      <li>
        <strong>Hard to follow:</strong> “We leverage synergies to empower stakeholders toward
        holistic community wellness.”
      </li>
    </ul>
    <p>
      A quick test: read it to someone who has never heard of your organization. If they can tell
      you who you help and how, it works.
    </p>

    <h2>Tagline</h2>
    <p>
      A short slogan, usually under ten words, that sits at the top of your homepage. It can be
      warmer and punchier than your mission. For the shelter above, something like “Every family
      deserves a safe night’s sleep.”
    </p>

    <h2>Site description and short description</h2>
    <p>
      The <strong>site description</strong> is one or two sentences that introduce your organization
      on your homepage. The <strong>short description</strong> must be under 200 characters: search
      engines and social media share cards show it when someone links to your site.
    </p>
    <p>
      To count characters, use <strong>Review › Word Count</strong> in Word or{' '}
      <strong>Tools › Word count</strong> in Google Docs. Both show characters including spaces.
    </p>
    <p>An example for the made-up shelter above:</p>
    <ul>
      <li>
        <strong>Description:</strong> “Since 2015 we have given families experiencing homelessness
        in Pima County a safe place to stay together, hot meals, and help finding a permanent home.”
      </li>
      <li>
        <strong>Short description:</strong> “Emergency shelter, meals and housing help for families
        in Pima County.”
      </li>
    </ul>

    <h2>Programs</h2>
    <p>
      Program 1 is required; programs 2 and 3 are optional, and many charities start with one. Each
      program needs a short title and one or two sentences: what you do, for whom, and, if you know
      it, how much.
    </p>
    <p>
      Example: <strong>Family Shelter</strong>: “Twelve private rooms where families can stay
      together for up to 90 days while we help them find housing.”
    </p>
    <p>
      Not sure what counts as a program? It is any ongoing activity a donor could support: a food
      pantry, a tutoring club, an annual event, a scholarship fund.
    </p>

    <h2>Write it in your own words</h2>
    <p>
      Use the examples for shape only. Draft each answer in your Word document or Google Doc first,
      read it out loud, and cut anything a donor would skip. Your website maintainer can change any
      of this wording after your site is built (see{' '}
      <Link href="/website-templates/">website templates and the FFC footer</Link>).
    </p>
  </>
)

export default MissionStatement
