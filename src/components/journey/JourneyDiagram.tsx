/**
 * Journey diagram (overnight block 7): the five gated onboarding stages as an
 * inline, responsive SVG. The funding gate — money is only spent after the
 * website is validated live on GitHub Pages — sits between stages 2 and 3 and
 * is highlighted in FFC orange. Rendered on /why-website-first/ and
 * /charity-onboarding-journey/.
 *
 * Accessibility: role="img" with <title>/<desc> wired via aria-labelledby /
 * aria-describedby; every visual detail is decorative relative to that
 * summary, and the full journey is described in the surrounding page text.
 */

const BLUE = '#0567B1'
const ORANGE = '#F58C23'
const INK = '#1a2e35'

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

const BOX_WIDTH = 168
const BOX_HEIGHT = 96
const BOX_Y = 92
const GAP = 30
const LEFT = 6
const stageX = (index: number) => LEFT + index * (BOX_WIDTH + GAP)

// The funding gate sits in the connector between stage 2 (website) and
// stage 3 (domain): the site must be proven before money is spent.
const GATE_X = stageX(1) + BOX_WIDTH + GAP / 2

const JourneyDiagram = () => {
  return (
    <svg
      viewBox="0 0 1002 232"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="journey-diagram-title"
      aria-describedby="journey-diagram-desc"
      className="w-full max-w-full h-auto"
      style={{ fontFamily: 'var(--font-lato), Lato, sans-serif' }}
    >
      <title id="journey-diagram-title">The five-stage Free For Charity onboarding journey</title>
      <desc id="journey-diagram-desc">
        Flow diagram of five stages: 1 Apply (validation and approval), 2 Website (built and
        validated on GitHub Pages), 3 Domain (free .org bought and pointed at your site), 4 Email
        (Microsoft 365 or Google Workspace), 5 Ongoing (renewals, DNS and support). An orange
        funding gate sits between the Website and Domain stages: no money is spent until your
        website is validated live.
      </desc>

      {/* Connector arrows between consecutive stages */}
      <defs>
        <marker
          id="journey-arrowhead"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill={BLUE} />
        </marker>
      </defs>
      {diagramStages.slice(0, -1).map((stage, index) => (
        <line
          key={`connector-${stage.number}`}
          x1={stageX(index) + BOX_WIDTH}
          y1={BOX_Y + BOX_HEIGHT / 2}
          x2={stageX(index + 1) - 2}
          y2={BOX_Y + BOX_HEIGHT / 2}
          stroke={BLUE}
          strokeWidth="2.5"
          markerEnd="url(#journey-arrowhead)"
          aria-hidden="true"
        />
      ))}

      {/* Funding gate highlight between Website and Domain */}
      <g aria-hidden="true">
        <line
          x1={GATE_X}
          y1="58"
          x2={GATE_X}
          y2={BOX_Y + BOX_HEIGHT + 14}
          stroke={ORANGE}
          strokeWidth="4"
          strokeDasharray="7 5"
          strokeLinecap="round"
        />
        <text
          x={GATE_X}
          y="26"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={ORANGE}
          letterSpacing="0.06em"
        >
          FUNDING GATE
        </text>
        <text x={GATE_X} y="48" textAnchor="middle" fontSize="13.5" fill={INK}>
          Money is spent only after your site is proven
        </text>
        <text x={GATE_X} y={BOX_Y + BOX_HEIGHT + 34} textAnchor="middle" fontSize="13.5" fill={INK}>
          Validated live site unlocks the domain purchase
        </text>
      </g>

      {/* Stage boxes */}
      {diagramStages.map((stage, index) => {
        const x = stageX(index)
        const isBeforeGate = index <= 1
        return (
          <g key={stage.number} aria-hidden="true">
            <rect
              x={x}
              y={BOX_Y}
              width={BOX_WIDTH}
              height={BOX_HEIGHT}
              rx="10"
              fill={isBeforeGate ? BLUE : '#ffffff'}
              stroke={isBeforeGate ? BLUE : ORANGE}
              strokeWidth={isBeforeGate ? 0 : 3}
            />
            <circle cx={x + 24} cy={BOX_Y + 26} r="13" fill={isBeforeGate ? '#ffffff' : ORANGE} />
            <text
              x={x + 24}
              y={BOX_Y + 31}
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={isBeforeGate ? BLUE : '#ffffff'}
            >
              {stage.number}
            </text>
            <text
              x={x + 46}
              y={BOX_Y + 31}
              fontSize="18"
              fontWeight="700"
              fill={isBeforeGate ? '#ffffff' : INK}
            >
              {stage.title}
            </text>
            <text x={x + 14} y={BOX_Y + 58} fontSize="13.5" fill={isBeforeGate ? '#ffffff' : INK}>
              {stage.detail[0]}
            </text>
            <text x={x + 14} y={BOX_Y + 76} fontSize="13.5" fill={isBeforeGate ? '#ffffff' : INK}>
              {stage.detail[1]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default JourneyDiagram
