// GitHub star history chart – server component (fetches at render / revalidates hourly)
// Usage: <GitHubStarHistory repo="owner/repo" />

const SVG_W = 600
const SVG_H = 210
const M = { top: 16, right: 20, bottom: 66, left: 48 }
const PLOT_W = SVG_W - M.left - M.right
const PLOT_H = SVG_H - M.top - M.bottom

// ── Data fetching ───────────────────────────────────────────────────────────

interface StarPoint { date: Date; stars: number }

async function fetchStarHistory(repo: string): Promise<StarPoint[]> {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3.star+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }

    const starredAt: Date[] = []
    let page = 1

    while (true) {
      const res = await fetch(
        `https://api.github.com/repos/${repo}/stargazers?per_page=100&page=${page}`,
        { headers, next: { revalidate: 3600 } },
      )
      if (!res.ok) break
      const data: { starred_at: string }[] = await res.json()
      if (!Array.isArray(data) || data.length === 0) break
      for (const item of data) starredAt.push(new Date(item.starred_at))
      if (data.length < 100) break
      page++
    }

    if (starredAt.length === 0) return []

    starredAt.sort((a, b) => a.getTime() - b.getTime())

    // Downsample: keep at most ~200 evenly-spaced points so the SVG path stays small
    const MAX_PTS = 200
    const step = Math.max(1, Math.floor(starredAt.length / MAX_PTS))
    const pts: StarPoint[] = []
    for (let i = 0; i < starredAt.length; i += step) {
      pts.push({ date: starredAt[i], stars: i + 1 })
    }
    // Always include the last point (actual total)
    const last = starredAt[starredAt.length - 1]
    if (pts[pts.length - 1]?.date.getTime() !== last.getTime()) {
      pts.push({ date: last, stars: starredAt.length })
    }

    return pts
  } catch {
    return []
  }
}

// ── SVG helpers ─────────────────────────────────────────────────────────────

function niceStarTicks(max: number): number[] {
  const magnitudes = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]
  const interval = magnitudes.find(m => max / m <= 5) ?? 1000
  const ticks: number[] = []
  for (let v = 0; v <= max; v += interval) ticks.push(v)
  if (ticks[ticks.length - 1] < max) ticks.push(ticks[ticks.length - 1] + interval)
  return ticks.filter(v => v <= ticks[ticks.length - 1])
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
  return String(n)
}

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

interface CalendarTick {
  x: number
  label: string
  isYear: boolean
}

// Produces quarter-month ticks (Apr, Jul, Oct) + year ticks (Jan → show year number).
// Skips ticks that are too close together (< MIN_PX pixels apart).
function buildCalendarTicks(
  minTime: number,
  maxTime: number,
  toX: (d: Date) => number,
  minPx = 42,
): CalendarTick[] {
  const raw: CalendarTick[] = []
  const startYear = new Date(minTime).getUTCFullYear()
  const endYear   = new Date(maxTime).getUTCFullYear()

  for (let year = startYear; year <= endYear; year++) {
    for (const month of [0, 3, 6, 9]) {
      const t = Date.UTC(year, month, 1)
      const d = new Date(t)
      if (t < minTime || t > maxTime) continue
      raw.push({
        x: toX(d),
        label: month === 0 ? String(year) : MONTH_NAMES[month],
        isYear: month === 0,
      })
    }
  }

  // Remove ticks whose labels overlap
  const out: CalendarTick[] = []
  let lastX = -Infinity
  for (const tick of raw) {
    if (tick.x - lastX >= minPx) {
      out.push(tick)
      lastX = tick.x
    }
  }
  return out
}

// ── Component ────────────────────────────────────────────────────────────────

interface Props {
  repo: string
  /** Accent colour for the line and area fill. Defaults to indigo-500. */
  color?: string
}

export async function GitHubStarHistory({ repo, color = '#697381' }: Props) {
  const pts = await fetchStarHistory(repo)

  if (pts.length < 2) {
    return (
      <div className="my-8 border border-rurikon-border bg-[#fefefe] py-8 px-6 sm:py-10 sm:px-10 font-serif">
        <p className="text-center text-sm text-[#888]">Star history unavailable.</p>
      </div>
    )
  }

  const maxStars = pts[pts.length - 1].stars
  const minTime = pts[0].date.getTime()
  const maxTime = pts[pts.length - 1].date.getTime()

  function toX(d: Date) {
    return M.left + ((d.getTime() - minTime) / (maxTime - minTime)) * PLOT_W
  }
  function toY(stars: number, top: number) {
    return M.top + (1 - stars / top) * PLOT_H
  }

  const yTicks = niceStarTicks(maxStars)
  const yMax = yTicks[yTicks.length - 1]
  const xTicks = buildCalendarTicks(minTime, maxTime, toX)

  // Build area path: line going right, then close back along the baseline
  const linePts = pts.map(p => `${toX(p.date).toFixed(1)},${toY(p.stars, yMax).toFixed(1)}`).join('L')
  const firstX = toX(pts[0].date).toFixed(1)
  const lastX = toX(pts[pts.length - 1].date).toFixed(1)
  const baseY = (M.top + PLOT_H).toFixed(1)
  const areaPath = `M${firstX},${baseY}L${linePts}L${lastX},${baseY}Z`
  const linePath = `M${linePts}`

  const gradId = `sg-${repo.replace(/\W/g, '-')}`

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] py-8 px-4 sm:py-10 sm:px-10 font-serif">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full"
        aria-label={`Star history for ${repo}`}
        role="img"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {yTicks.map(v => (
          <line
            key={v}
            x1={M.left}
            y1={toY(v, yMax)}
            x2={M.left + PLOT_W}
            y2={toY(v, yMax)}
            stroke="#e5e0d8"
            strokeWidth={1}
          />
        ))}

        {/* Y-axis tick labels */}
        {yTicks.map(v => (
          <text
            key={v}
            x={M.left - 6}
            y={toY(v, yMax) + 4}
            textAnchor="end"
            fontSize={11}
            fill="#888"
            fontFamily="Georgia, serif"
          >
            {formatCount(v)}
          </text>
        ))}

        {/* Filled area */}
        <path d={areaPath} fill={`url(#${gradId})`} />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* End dot */}
        <circle
          cx={toX(pts[pts.length - 1].date)}
          cy={toY(pts[pts.length - 1].stars, yMax)}
          r={3.5}
          fill={color}
        />

        {/* Baseline */}
        <line
          x1={M.left}
          y1={M.top + PLOT_H}
          x2={M.left + PLOT_W}
          y2={M.top + PLOT_H}
          stroke="#d1ccc4"
          strokeWidth={1}
        />

        {/* X-axis tick marks + two-row labels */}
        {xTicks.map((tick, i) => (
          <g key={i}>
            <line
              x1={tick.x}
              y1={M.top + PLOT_H}
              x2={tick.x}
              y2={M.top + PLOT_H + (tick.isYear ? 6 : 4)}
              stroke={tick.isYear ? '#b0aaa0' : '#d1ccc4'}
              strokeWidth={1}
            />
            {tick.isYear ? (
              /* Year label – lower row, bold */
              <text
                x={tick.x}
                y={M.top + PLOT_H + 28}
                textAnchor="middle"
                fontSize={11}
                fontWeight="600"
                fill="#4a515b"
                fontFamily="Georgia, serif"
              >
                {tick.label}
              </text>
            ) : (
              /* Month label – upper row */
              <text
                x={tick.x}
                y={M.top + PLOT_H + 15}
                textAnchor="middle"
                fontSize={11}
                fill="#666"
                fontFamily="Georgia, serif"
              >
                {tick.label}
              </text>
            )}
          </g>
        ))}

        {/* Repo title + star count – lower centre */}
        <text
          x={M.left + PLOT_W / 2}
          y={SVG_H - 10}
          textAnchor="middle"
          fontSize={12}
          fontFamily="Georgia, serif"
        >
          <tspan fontWeight="600" fill="#4a515b">{repo}</tspan>
          <tspan fill="#888" fontSize={11}>{' '}(★ {maxStars.toLocaleString()} stars)</tspan>
        </text>
      </svg>
    </div>
  )
}
