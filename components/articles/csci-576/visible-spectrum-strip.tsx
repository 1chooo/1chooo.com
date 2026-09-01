// Visible spectrum — flat colour strip from UV (~380 nm) to IR (~700 nm).
// Implements the same container style as RGBSliders.

const WL_MIN = 390
const WL_MAX = 705

const SVG_W = 600
const SVG_H = 130
const M = { top: 32, right: 14, bottom: 46, left: 14 }
const PLOT_W = SVG_W - M.left - M.right
const STRIP_H = 40 // height of the colour band

function toX(wl: number) {
  return M.left + ((wl - WL_MIN) / (WL_MAX - WL_MIN)) * PLOT_W
}

// Spectrum colour stops (wavelength → approximate sRGB visible colour)
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

const TICKS = [400, 500, 600, 700]
const STRIP_Y = M.top

export function VisibleSpectrumStrip() {
  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] py-8 px-4 sm:py-10 sm:px-10 font-serif">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full"
        aria-label="Visible spectrum colour strip from UV to IR"
        role="img"
      >
        <defs>
          <linearGradient id="spectrumGradientStrip" x1="0" y1="0" x2="1" y2="0">
            {SPECTRUM_STOPS.map(({ wl, color }) => (
              <stop
                key={wl}
                offset={`${(((wl - WL_MIN) / (WL_MAX - WL_MIN)) * 100).toFixed(2)}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
        </defs>

        {/* "Higher Frequency" / "Lower Frequency" labels */}
        <text x={M.left} y={M.top - 10} fontSize={11} fill="#555" fontFamily="Georgia, serif">
          Higher Frequency
        </text>
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

        {/* Colour strip */}
        <rect
          x={M.left}
          y={STRIP_Y}
          width={PLOT_W}
          height={STRIP_H}
          fill="url(#spectrumGradientStrip)"
        />

        {/* UV / IR edge labels */}
        <text x={M.left + 4} y={STRIP_Y + STRIP_H / 2 + 4} fontSize={11} fill="#fff" fontFamily="Georgia, serif" fontWeight="bold">
          UV
        </text>
        <text
          x={M.left + PLOT_W - 4}
          y={STRIP_Y + STRIP_H / 2 + 4}
          fontSize={11}
          fill="#fff"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          textAnchor="end"
        >
          IR
        </text>

        {/* Baseline */}
        <line
          x1={M.left}
          y1={STRIP_Y + STRIP_H + 14}
          x2={M.left + PLOT_W}
          y2={STRIP_Y + STRIP_H + 14}
          stroke="#d1ccc4"
          strokeWidth={1}
        />

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
