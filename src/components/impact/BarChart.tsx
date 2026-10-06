import React from 'react'

/**
 * Server-rendered single-series bar chart (no client JS): thin bars with
 * rounded data-ends, 2px gaps, recessive gridlines, selective direct labels
 * (first / max / last), native SVG <title> tooltips, and a data-table
 * fallback for screen readers and no-SVG contexts.
 *
 * Palette note: series hues are validated against the light surface with the
 * dataviz six-checks validator (#0567B1 and #F26721 both pass).
 */

export interface BarDatum {
  label: string
  value: number
}

interface BarChartProps {
  title: string
  unit: string
  data: BarDatum[]
  color?: string
  source?: string
}

const CHART_W = 720
const CHART_H = 260
const PAD_LEFT = 44
const PAD_BOTTOM = 34
const PAD_TOP = 18

function niceMax(maxValue: number): number {
  if (maxValue <= 0) return 1
  const magnitude = 10 ** Math.floor(Math.log10(maxValue))
  for (const m of [1, 2, 2.5, 5, 10]) {
    if (maxValue <= m * magnitude) return m * magnitude
  }
  return 10 * magnitude
}

export default function BarChart({ title, unit, data, color = '#0567B1', source }: BarChartProps) {
  const yMax = niceMax(data.reduce((max, d) => (d.value > max ? d.value : max), -Infinity))
  const innerW = CHART_W - PAD_LEFT - 8
  const innerH = CHART_H - PAD_TOP - PAD_BOTTOM
  const slot = innerW / data.length
  const barW = Math.min(40, Math.max(8, slot - 2))
  const maxIdx = data.reduce((best, d, i) => (d.value > data[best].value ? i : best), 0)
  const gridSteps = [0.25, 0.5, 0.75, 1]

  const labelled = (i: number) => i === 0 || i === data.length - 1 || i === maxIdx

  return (
    <figure className="my-8">
      <figcaption
        className="font-[var(--font-lato)] text-[18px] font-[600] text-[#333] mb-2"
        data-font="lato-font"
      >
        {title}
      </figcaption>
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        role="img"
        aria-label={`${title} — bar chart; data table follows`}
        className="w-full h-auto max-w-[720px]"
      >
        {gridSteps.map((step) => {
          const y = PAD_TOP + innerH * (1 - step)
          return (
            <g key={step}>
              <line x1={PAD_LEFT} x2={CHART_W - 8} y1={y} y2={y} stroke="#eee" strokeWidth={1} />
              <text x={PAD_LEFT - 6} y={y + 4} textAnchor="end" fontSize={12} fill="#767672">
                {Math.round(yMax * step)}
              </text>
            </g>
          )
        })}
        {/* baseline */}
        <line
          x1={PAD_LEFT}
          x2={CHART_W - 8}
          y1={PAD_TOP + innerH}
          y2={PAD_TOP + innerH}
          stroke="#ccc"
          strokeWidth={1}
        />
        {data.map((d, i) => {
          const h = Math.max(2, (d.value / yMax) * innerH)
          const x = PAD_LEFT + slot * i + (slot - barW) / 2
          const y = PAD_TOP + innerH - h
          return (
            <g key={d.label}>
              <path
                d={`M ${x} ${PAD_TOP + innerH} V ${y + 4} Q ${x} ${y} ${x + 4} ${y} H ${x + barW - 4} Q ${x + barW} ${y} ${x + barW} ${y + 4} V ${PAD_TOP + innerH} Z`}
                fill={color}
              >
                <title>{`${d.label}: ${d.value} ${unit}`}</title>
              </path>
              {labelled(i) ? (
                <text
                  x={x + barW / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={600}
                  fill="#333"
                >
                  {d.value}
                </text>
              ) : null}
              <text
                x={x + barW / 2}
                y={PAD_TOP + innerH + 18}
                textAnchor="middle"
                fontSize={12}
                fill="#767672"
              >
                {d.label}
              </text>
            </g>
          )
        })}
      </svg>
      <details className="mt-2">
        <summary
          className="cursor-pointer font-[var(--font-lato)] text-[14px] text-[#0567B1]"
          data-font="lato-font"
        >
          View data table
        </summary>
        <table className="mt-2 border-collapse font-[var(--font-lato)] text-[15px]">
          <thead>
            <tr>
              <th className="border border-gray-300 px-3 py-1 text-left">Year</th>
              <th className="border border-gray-300 px-3 py-1 text-left">{unit}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.label}>
                <td className="border border-gray-300 px-3 py-1">{d.label}</td>
                <td className="border border-gray-300 px-3 py-1 text-right">{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      {source ? (
        <p className="mt-2 font-[var(--font-lato)] text-[13px] text-[#767672]">{source}</p>
      ) : null}
    </figure>
  )
}
