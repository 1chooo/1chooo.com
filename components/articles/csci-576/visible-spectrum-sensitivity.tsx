// Visible spectrum with a two-peaked sensitivity envelope matching the reference image.
// Peak 1 ≈ 450 nm (blue), Peak 2 ≈ 590 nm (yellow-orange), on a black background.

const WL_MIN = 380
const WL_MAX = 720

const SVG_W = 700
const SVG_H = 260
const M = { top: 40, right: 30, bottom: 56, left: 70 }
const PLOT_W = SVG_W - M.left - M.right
const PLOT_H = SVG_H - M.top - M.bottom

function toX(wl: number) {
  return M.left + ((wl - WL_MIN) / (WL_MAX - WL_MIN)) * PLOT_W
}
function toY(v: number) {
  return M.top + PLOT_H - v * PLOT_H
}

// Two-peaked sensitivity: blue peak ~450 nm, yellow-orange peak ~590 nm
function vLambda(wl: number) {
  const peak1 = Math.exp(-0.5 * ((wl - 450) / 40) ** 2) * 0.95
  const peak2 = Math.exp(-0.5 * ((wl - 590) / 55) ** 2) * 1.0
  return Math.min(1, peak1 + peak2)
}

function makeFilledPath() {
  const top: string[] = []
  for (let wl = WL_MIN; wl <= WL_MAX; wl += 1) {
    top.push(`${toX(wl).toFixed(2)},${toY(vLambda(wl)).toFixed(2)}`)
  }
  const x0 = toX(WL_MIN).toFixed(2)
  const x1 = toX(WL_MAX).toFixed(2)
  const yBase = (M.top + PLOT_H).toFixed(2)
  return `M${x0},${yBase} L${top.join(' L')} L${x1},${yBase} Z`
}

// Vivid spectrum colour stops matching the reference photo
const SPECTRUM_STOPS = [
  { wl: 390, color: '#CC00CC' },
  { wl: 410, color: '#8800DD' },
  { wl: 430, color: '#4400FF' },
  { wl: 455, color: '#0033FF' },
  { wl: 475, color: '#0099FF' },
  { wl: 495, color: '#00DDBB' },
  { wl: 520, color: '#00FF55' },
  { wl: 545, color: '#99FF00' },
  { wl: 565, color: '#DDFF00' },
  { wl: 580, color: '#FFEE00' },
  { wl: 595, color: '#FFAA00' },
  { wl: 615, color: '#FF4400' },
  { wl: 645, color: '#DD0000' },
  { wl: 705, color: '#770000' },
]

// Labeled x-axis ticks
const LABELED_TICKS = [400, 500, 600, 700]
// All tick marks (including minor ones every ~25 nm)
const ALL_TICKS = [380, 405, 430, 455, 480, 505, 530, 555, 580, 605, 630, 655, 680, 705]

export function VisibleSpectrumSensitivity() {
  const yBase = M.top + PLOT_H
  const arrowX = 40
  const arrowMidY = M.top + PLOT_H / 2

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] py-8 px-4 sm:py-10 sm:px-10 font-serif">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full"
        aria-label="Visible spectrum with two-peaked sensitivity envelope"
        role="img"
      >
        <defs>
          {/* Spectrum gradient along X */}
          <linearGradient id="spectrumGradientSens" x1="0" y1="0" x2="1" y2="0">
            {SPECTRUM_STOPS.map(({ wl, color }) => (
              <stop
                key={wl}
                offset={`${(((wl - WL_MIN) / (WL_MAX - WL_MIN)) * 100).toFixed(2)}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>

          {/* Radial glow mask so edges fade to black */}
          <radialGradient id="glowMask" cx="50%" cy="100%" r="75%" fx="50%" fy="100%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Filled spectrum shape */}
        <path
          d={makeFilledPath()}
          fill="url(#spectrumGradientSens)"
          opacity={0.95}
        />

        {/* Baseline / X-axis */}
        <line
          x1={M.left}
          y1={yBase}
          x2={M.left + PLOT_W}
          y2={yBase}
          stroke="white"
          strokeWidth={1.5}
        />

        {/* Minor tick marks */}
        {ALL_TICKS.map((wl) => (
          <line
            key={wl}
            x1={toX(wl)}
            y1={yBase}
            x2={toX(wl)}
            y2={yBase + 6}
            stroke="white"
            strokeWidth={1}
          />
        ))}

        {/* "Higher Frequency" — top left, bold white */}
        <text
          x={M.left + 90}
          y={M.top - 12}
          fontSize={11}
          fill="#555"
          fontFamily="Georgia, serif"
          textAnchor="end"
        >
          Higher Frequency
        </text>

        {/* "Lower Frequency" — top right, bold white */}
        <text
          x={M.left + PLOT_W}
          y={M.top - 10}
          fontSize={11}
          fill="#555"
          fontFamily="Georgia, serif"
          textAnchor="end"
        >
          Lower Frequency
        </text>

        {/* "Sensitivity" y-axis label + upward arrow */}
        {/* Arrow line */}
        <line
          x1={arrowX}
          y1={M.top + 4}
          x2={arrowX}
          y2={yBase}
          stroke="#555"
          strokeWidth={1.5}
        />
        {/* Arrow head */}
        <polygon
          points={`${arrowX},${M.top} ${arrowX - 4},${M.top + 9} ${arrowX + 4},${M.top + 9}`}
          fill="#555"
        />
        {/* Rotated "Sensitivity" label — pivot at the label's own center */}
        <text
          x={arrowX + 10}
          y={arrowMidY - 15}
          fontSize={12}
          fill="#555"
          fontWeight="bold"
          transform={`rotate(-90, ${arrowX}, ${arrowMidY})`}
          textAnchor="middle"
          dominantBaseline="auto"
          dx={-14}
        >
          Sensitivity
        </text>

        {/* "Ultra Violet" — centered vertically in the plot, near left edge */}
        <text
          x={M.left + 14}
          y={M.top + PLOT_H / 2}
          fontSize={11}
          fill="#555"

          transform={`rotate(-90, ${M.left + 14}, ${M.top + PLOT_H / 2})`}
          textAnchor="middle"
        >
          Ultra Violet
        </text>

        {/* "Infrared" — centered vertically in the plot, near right edge */}
        <text
          x={M.left + PLOT_W - 14}
          y={M.top + PLOT_H / 2}
          fontSize={11}
          fill="#555"

          transform={`rotate(-90, ${M.left + PLOT_W - 14}, ${M.top + PLOT_H / 2})`}
          textAnchor="middle"
        >
          Infrared
        </text>

        {/* X-axis labeled ticks + numbers */}
        {LABELED_TICKS.map((wl) => (
          <text
            key={wl}
            x={toX(wl)}
            y={yBase + 22}
            textAnchor="middle"
            fontSize={13}
            fill="#555"
          >
            {wl}
          </text>
        ))}

        {/* X-axis label */}
        <text
          x={M.left + PLOT_W / 2}
          y={SVG_H - 4}
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
