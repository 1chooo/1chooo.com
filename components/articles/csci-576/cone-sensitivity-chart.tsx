// Approximate cone sensitivity curves (CIE 2006 physiological observer)
// S cone (β): short wavelength / blue  — peak ≈ 441 nm
// M cone (γ): medium wavelength / green — peak ≈ 543 nm
// L cone (ρ): long wavelength / red     — peak ≈ 567 nm

const WL_MIN = 390
const WL_MAX = 705

const CONES = [
  { name: 'β', color: '#3b82f6', peak: 441, sigma: 28 },
  { name: 'γ', color: '#22c55e', peak: 543, sigma: 38 },
  { name: 'ρ', color: '#ef4444', peak: 567, sigma: 52 },
] as const

function gaussian(x: number, peak: number, sigma: number) {
  return Math.exp(-0.5 * ((x - peak) / sigma) ** 2)
}

const SVG_W = 600
const SVG_H = 210
const M = { top: 12, right: 14, bottom: 46, left: 14 }
const PLOT_W = SVG_W - M.left - M.right
const PLOT_H = SVG_H - M.top - M.bottom

function toX(wl: number) {
  return M.left + ((wl - WL_MIN) / (WL_MAX - WL_MIN)) * PLOT_W
}
function toY(v: number) {
  return M.top + (1 - v) * PLOT_H
}

function makePath(peak: number, sigma: number) {
  const pts: string[] = []
  for (let wl = WL_MIN; wl <= WL_MAX; wl += 1) {
    pts.push(`${toX(wl).toFixed(2)},${toY(gaussian(wl, peak, sigma)).toFixed(2)}`)
  }
  return `M${pts.join('L')}`
}

const TICKS = [400, 500, 600, 700]

export function ConeSensitivityChart() {
  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] py-8 px-4 sm:py-10 sm:px-10 font-serif">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full"
        aria-label="Cone sensitivity curves (S, M, L)"
        role="img"
      >
        {/* Vertical grid lines */}
        {TICKS.map((wl) => (
          <line
            key={wl}
            x1={toX(wl)}
            y1={M.top}
            x2={toX(wl)}
            y2={M.top + PLOT_H}
            stroke="#e5e0d8"
            strokeWidth={1}
          />
        ))}

        {/* Baseline */}
        <line
          x1={M.left}
          y1={M.top + PLOT_H}
          x2={M.left + PLOT_W}
          y2={M.top + PLOT_H}
          stroke="#d1ccc4"
          strokeWidth={1}
        />

        {/* Cone curves */}
        {CONES.map(({ name, color, peak, sigma }) => {
          const labelX = toX(peak) + 6
          const labelY = toY(0.98) - 4
          return (
            <g key={name}>
              <path
                d={makePath(peak, sigma)}
                fill="none"
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x={labelX}
                y={labelY}
                fill={color}
                fontSize={15}
                fontFamily="Georgia, serif"
                fontStyle="italic"
                fontWeight="600"
              >
                {name}
              </text>
            </g>
          )
        })}

        {/* X-axis tick labels */}
        {TICKS.map((wl) => (
          <text
            key={wl}
            x={toX(wl)}
            y={SVG_H - 28}
            textAnchor="middle"
            fontSize={12}
            fill="#555"
            fontFamily="Georgia, serif"
          >
            {wl}
          </text>
        ))}

        {/* X-axis label */}
        <text
          x={M.left + PLOT_W / 2}
          y={SVG_H - 8}
          textAnchor="middle"
          fontSize={12}
          fill="#333"
          fontFamily="Georgia, serif"
          fontWeight="bold"
        >
          Wavelength (nm)
        </text>
      </svg>
    </div>
  )
}
