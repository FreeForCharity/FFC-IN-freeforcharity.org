'use client'

/**
 * Journey diagram: the five gated onboarding stages as inline, responsive
 * SVG. The funding gate — money is only spent after the website is validated
 * live on GitHub Pages — sits between stages 2 and 3 and is highlighted in
 * FFC orange. Rendered on /why-website-first/ and
 * /charity-onboarding-journey/.
 *
 * Two variants are rendered and toggled with Tailwind's responsive classes
 * on wrapper divs (media queries cannot toggle Tailwind classes INSIDE an
 * svg, but they work fine on the wrappers):
 *   - horizontal (>= sm): the five boxes in a row, gate between 2 and 3;
 *   - vertical (< sm): the boxes stacked, so text renders at a legible size
 *     on phones instead of scaling a 1002-unit-wide viewBox down to ~375px.
 *
 * Color contrast (WCAG AA, computed with the standard relative-luminance
 * formula): the brand orange #F58C23 is only 2.43:1 on white, which fails
 * both AA text (4.5:1) and non-text (3:1) minimums — so every orange element
 * in the diagram uses the deeper ORANGE below instead:
 *   - #A85400 on #ffffff = 5.34:1 (gate label, box strokes, gate line)
 *   - #ffffff on #A85400 = 5.34:1 (numerals in the stage circles)
 *   - #ffffff on #0567B1 = 5.86:1 (text in the pre-gate blue boxes)
 *   - #1a2e35 on #ffffff = 14.13:1 (body text)
 *
 * Accessibility: each variant is role="img" with <title>/<desc> wired via
 * aria-labelledby / aria-describedby; ids come from React useId so multiple
 * instances (or the two variants) never collide. Every visual detail is
 * decorative relative to that summary, and the full journey is described in
 * the surrounding page text.
 */

import { useId } from 'react'

const BLUE = '#0567B1'
// Deep accessible orange — see the contrast table in the header comment.
const ORANGE = '#A85400'
const INK = '#1a2e35'

const TITLE = 'The five-stage Free For Charity onboarding journey'
const DESC =
  'Flow diagram of five stages: 1 Apply (validation and approval), 2 Website (built and ' +
  'validated on GitHub Pages), 3 Domain (free .org bought and pointed at your site), 4 Email ' +
  '(Microsoft 365 or Google Workspace), 5 Ongoing (renewals, DNS and support). An orange ' +
  'funding gate sits between the Website and Domain stages: no money is spent until your ' +
  'website is validated live.'

interface DiagramStage {
  number: string
  title: string
  detail: [string, string]
}

const diagramStages: DiagramStage[] = [
  { number: '1', title: 'Apply', detail: ['Validation &', 'approval'] },
  { number: '2', title: 'Website', detail: ['Built & validated on', 'GitHub Pages'] },
  { number: '3', title: 'Domain', detail: ['Free .org bought &', 'pointed at your site'] },
  { number: '4', title: 'Email', detail: ['Microsoft 365 or', 'Google Workspace'] },
  { number: '5', title: 'Ongoing', detail: ['Renewals, DNS &', 'support forever'] },
]

/** One stage box, shared by both variants. */
const StageBox = ({
  stage,
  x,
  y,
  width,
  height,
  isBeforeGate,
}: {
  stage: DiagramStage
  x: number
  y: number
  width: number
  height: number
  isBeforeGate: boolean
}) => (
  <g aria-hidden="true">
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx="10"
      fill={isBeforeGate ? BLUE : '#ffffff'}
      stroke={isBeforeGate ? BLUE : ORANGE}
      strokeWidth={isBeforeGate ? 0 : 3}
    />
    <circle cx={x + 24} cy={y + 26} r="13" fill={isBeforeGate ? '#ffffff' : ORANGE} />
    <text
      x={x + 24}
      y={y + 31}
      textAnchor="middle"
      fontSize="15"
      fontWeight="700"
      fill={isBeforeGate ? BLUE : '#ffffff'}
    >
      {stage.number}
    </text>
    <text
      x={x + 46}
      y={y + 31}
      fontSize="18"
      fontWeight="700"
      fill={isBeforeGate ? '#ffffff' : INK}
    >
      {stage.title}
    </text>
    <text x={x + 14} y={y + 58} fontSize="14" fill={isBeforeGate ? '#ffffff' : INK}>
      {stage.detail[0]}
    </text>
    <text x={x + 14} y={y + 76} fontSize="14" fill={isBeforeGate ? '#ffffff' : INK}>
      {stage.detail[1]}
    </text>
  </g>
)

/* ----------------------- horizontal (>= sm) ------------------------ */

const H_BOX_WIDTH = 168
const H_BOX_HEIGHT = 96
const H_BOX_Y = 92
const H_GAP = 30
const H_LEFT = 6
const hStageX = (index: number) => H_LEFT + index * (H_BOX_WIDTH + H_GAP)

// The funding gate sits in the connector between stage 2 (website) and
// stage 3 (domain): the site must be proven before money is spent.
const H_GATE_X = hStageX(1) + H_BOX_WIDTH + H_GAP / 2

const HorizontalDiagram = ({ uid }: { uid: string }) => {
  const titleId = `${uid}-h-title`
  const descId = `${uid}-h-desc`
  const markerId = `${uid}-h-arrow`
  return (
    <svg
      viewBox="0 0 1002 232"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="w-full max-w-full h-auto"
      style={{ fontFamily: 'var(--font-lato), Lato, sans-serif' }}
    >
      <title id={titleId}>{TITLE}</title>
      <desc id={descId}>{DESC}</desc>

      {/* Connector arrows between consecutive stages */}
      <defs>
        <marker id={markerId} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={BLUE} />
        </marker>
      </defs>
      {diagramStages.slice(0, -1).map((stage, index) => (
        <line
          key={`connector-${stage.number}`}
          x1={hStageX(index) + H_BOX_WIDTH}
          y1={H_BOX_Y + H_BOX_HEIGHT / 2}
          x2={hStageX(index + 1) - 2}
          y2={H_BOX_Y + H_BOX_HEIGHT / 2}
          stroke={BLUE}
          strokeWidth="2.5"
          markerEnd={`url(#${markerId})`}
          aria-hidden="true"
        />
      ))}

      {/* Funding gate highlight between Website and Domain */}
      <g aria-hidden="true">
        <line
          x1={H_GATE_X}
          y1="58"
          x2={H_GATE_X}
          y2={H_BOX_Y + H_BOX_HEIGHT + 14}
          stroke={ORANGE}
          strokeWidth="4"
          strokeDasharray="7 5"
          strokeLinecap="round"
        />
        <text
          x={H_GATE_X}
          y="26"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={ORANGE}
          letterSpacing="0.06em"
        >
          FUNDING GATE
        </text>
        <text x={H_GATE_X} y="48" textAnchor="middle" fontSize="14" fill={INK}>
          Money is spent only after your site is proven
        </text>
        <text
          x={H_GATE_X}
          y={H_BOX_Y + H_BOX_HEIGHT + 34}
          textAnchor="middle"
          fontSize="14"
          fill={INK}
        >
          Validated live site unlocks the domain purchase
        </text>
      </g>

      {/* Stage boxes */}
      {diagramStages.map((stage, index) => (
        <StageBox
          key={stage.number}
          stage={stage}
          x={hStageX(index)}
          y={H_BOX_Y}
          width={H_BOX_WIDTH}
          height={H_BOX_HEIGHT}
          isBeforeGate={index <= 1}
        />
      ))}
    </svg>
  )
}

/* ------------------------ vertical (< sm) -------------------------- */

const V_WIDTH = 360
const V_BOX_WIDTH = 348
const V_BOX_HEIGHT = 88
const V_LEFT = 6
const V_GAP = 40 // between consecutive boxes (connector arrow)
const V_GATE_GAP = 132 // between stages 2 and 3 (the funding gate)
const V_CENTER = V_WIDTH / 2

const vStageY = (index: number) => {
  let y = 6
  for (let i = 0; i < index; i++) {
    y += V_BOX_HEIGHT + (i === 1 ? V_GATE_GAP : V_GAP)
  }
  return y
}
const V_HEIGHT = vStageY(diagramStages.length - 1) + V_BOX_HEIGHT + 6
// Gate zone spans the gap between box 2's bottom and box 3's top.
const V_GATE_TOP = vStageY(1) + V_BOX_HEIGHT

const VerticalDiagram = ({ uid }: { uid: string }) => {
  const titleId = `${uid}-v-title`
  const descId = `${uid}-v-desc`
  const markerId = `${uid}-v-arrow`
  return (
    <svg
      viewBox={`0 0 ${V_WIDTH} ${V_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="w-full max-w-full h-auto"
      style={{ fontFamily: 'var(--font-lato), Lato, sans-serif' }}
    >
      <title id={titleId}>{TITLE}</title>
      <desc id={descId}>{DESC}</desc>

      <defs>
        <marker id={markerId} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={BLUE} />
        </marker>
      </defs>

      {/* Connector arrows between consecutive stages (the 2→3 connector is
          split around the funding-gate text so nothing overlaps) */}
      {diagramStages.slice(0, -1).map((stage, index) =>
        index === 1 ? (
          <g key={`connector-${stage.number}`} aria-hidden="true">
            <line
              x1={V_CENTER}
              y1={V_GATE_TOP}
              x2={V_CENTER}
              y2={V_GATE_TOP + 12}
              stroke={BLUE}
              strokeWidth="2.5"
            />
            <line
              x1={V_CENTER}
              y1={V_GATE_TOP + V_GATE_GAP - 20}
              x2={V_CENTER}
              y2={V_GATE_TOP + V_GATE_GAP - 4}
              stroke={BLUE}
              strokeWidth="2.5"
              markerEnd={`url(#${markerId})`}
            />
          </g>
        ) : (
          <line
            key={`connector-${stage.number}`}
            x1={V_CENTER}
            y1={vStageY(index) + V_BOX_HEIGHT}
            x2={V_CENTER}
            y2={vStageY(index + 1) - 4}
            stroke={BLUE}
            strokeWidth="2.5"
            markerEnd={`url(#${markerId})`}
            aria-hidden="true"
          />
        )
      )}

      {/* Funding gate between Website and Domain */}
      <g aria-hidden="true">
        <text
          x={V_CENTER}
          y={V_GATE_TOP + 34}
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={ORANGE}
          letterSpacing="0.06em"
        >
          FUNDING GATE
        </text>
        <text x={V_CENTER} y={V_GATE_TOP + 56} textAnchor="middle" fontSize="13" fill={INK}>
          Money is spent only after your site is proven
        </text>
        <line
          x1="16"
          y1={V_GATE_TOP + 72}
          x2={V_WIDTH - 16}
          y2={V_GATE_TOP + 72}
          stroke={ORANGE}
          strokeWidth="4"
          strokeDasharray="7 5"
          strokeLinecap="round"
        />
        <text x={V_CENTER} y={V_GATE_TOP + 98} textAnchor="middle" fontSize="13" fill={INK}>
          Validated live site unlocks the domain purchase
        </text>
      </g>

      {/* Stage boxes */}
      {diagramStages.map((stage, index) => (
        <StageBox
          key={stage.number}
          stage={stage}
          x={V_LEFT}
          y={vStageY(index)}
          width={V_BOX_WIDTH}
          height={V_BOX_HEIGHT}
          isBeforeGate={index <= 1}
        />
      ))}
    </svg>
  )
}

const JourneyDiagram = () => {
  // useId output contains characters (":" / "«»") that are invalid inside
  // url(#...) marker references — strip to a safe alphanumeric token.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  return (
    <>
      <div className="hidden sm:block" data-journey-variant="horizontal">
        <HorizontalDiagram uid={uid} />
      </div>
      <div className="sm:hidden" data-journey-variant="vertical">
        <VerticalDiagram uid={uid} />
      </div>
    </>
  )
}

export default JourneyDiagram
