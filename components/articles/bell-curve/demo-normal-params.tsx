"use client"

import { useState, useMemo } from "react"

const W = 300
const H = 160
const PAD = { top: 16, right: 12, bottom: 28, left: 12 }
const chartW = W - PAD.left - PAD.right
const chartH = H - PAD.top - PAD.bottom

function normalPDF(x: number, mu: number, sigma: number): number {
  return Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI))
}

function NormalCurve({
  mu,
  sigma,
}: {
  mu: number
  sigma: number
}) {
  const xMin = mu - 4 * sigma
  const xMax = mu + 4 * sigma
  const steps = 120
  const peakY = normalPDF(mu, mu, sigma)

  const toSvgX = (x: number) => PAD.left + ((x - xMin) / (xMax - xMin)) * chartW
  const toSvgY = (y: number) => PAD.top + chartH - (y / peakY) * chartH

  const pts = useMemo(() => {
    return Array.from({ length: steps + 1 }, (_, i) => {
      const x = xMin + (i / steps) * (xMax - xMin)
      const y = normalPDF(x, mu, sigma)
      return `${i === 0 ? "M" : "L"}${toSvgX(x).toFixed(1)},${toSvgY(y).toFixed(1)}`
    }).join(" ")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mu, sigma, xMin, xMax, peakY])

  // Shaded regions
  const shade = (from: number, to: number, color: string, opacity: number) => {
    const xs = Array.from({ length: 40 }, (_, i) => from + (i / 39) * (to - from))
    const top = xs.map((x) => {
      const y = normalPDF(x, mu, sigma)
      return `${toSvgX(x).toFixed(1)},${toSvgY(y).toFixed(1)}`
    })
    const baseline = `${toSvgX(to).toFixed(1)},${toSvgY(0).toFixed(1)} ${toSvgX(from).toFixed(1)},${toSvgY(0).toFixed(1)}`
    return (
      <polygon
        points={[...top, baseline].join(" ")}
        fill={color}
        opacity={opacity}
      />
    )
  }

  const muX = toSvgX(mu)
  const baseY = toSvgY(0)

  // Axis ticks at μ±σ, μ±2σ
  const ticks = [
    { x: mu - 2 * sigma, label: "μ−2σ" },
    { x: mu - sigma, label: "μ−σ" },
    { x: mu, label: "μ" },
    { x: mu + sigma, label: "μ+σ" },
    { x: mu + 2 * sigma, label: "μ+2σ" },
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="overflow-visible">
      {/* ±2σ shading */}
      {shade(mu - 2 * sigma, mu - sigma, "#dce8f5", 0.7)}
      {shade(mu + sigma, mu + 2 * sigma, "#dce8f5", 0.7)}
      {/* ±1σ shading */}
      {shade(mu - sigma, mu, "#5a9fd4", 0.2)}
      {shade(mu, mu + sigma, "#5a9fd4", 0.2)}

      {/* Curve */}
      <path d={pts} fill="none" stroke="#5a9fd4" strokeWidth={2} />

      {/* x-axis */}
      <line
        x1={PAD.left} y1={baseY}
        x2={PAD.left + chartW} y2={baseY}
        stroke="#d0d8e8" strokeWidth={1}
      />

      {/* μ line */}
      <line
        x1={muX} y1={PAD.top}
        x2={muX} y2={baseY}
        stroke="#d45a9f" strokeWidth={1} strokeDasharray="3 2"
      />

      {/* ±1σ verticals */}
      <line x1={toSvgX(mu - sigma)} y1={PAD.top + chartH * 0.08} x2={toSvgX(mu - sigma)} y2={baseY}
        stroke="#5a9fd4" strokeWidth={0.8} strokeDasharray="2 2" />
      <line x1={toSvgX(mu + sigma)} y1={PAD.top + chartH * 0.08} x2={toSvgX(mu + sigma)} y2={baseY}
        stroke="#5a9fd4" strokeWidth={0.8} strokeDasharray="2 2" />

      {/* Tick labels */}
      {ticks.map(({ x, label }) => {
        const sx = toSvgX(x)
        if (sx < PAD.left || sx > PAD.left + chartW) return null
        return (
          <g key={label}>
            <line x1={sx} y1={baseY} x2={sx} y2={baseY + 3} stroke="#b0bad0" strokeWidth={1} />
            <text x={sx} y={baseY + 10} textAnchor="middle" fontSize={7} fill="#b0bad0">
              {label}
            </text>
          </g>
        )
      })}

      {/* 68/95 labels */}
      <text x={muX} y={PAD.top + 8} textAnchor="middle" fontSize={7} fill="#d45a9f" fontStyle="italic">68%</text>
      <text x={toSvgX(mu - 1.5 * sigma)} y={PAD.top + 8} textAnchor="middle" fontSize={7} fill="#8ba4c8" fontStyle="italic">13.6%</text>
      <text x={toSvgX(mu + 1.5 * sigma)} y={PAD.top + 8} textAnchor="middle" fontSize={7} fill="#8ba4c8" fontStyle="italic">13.6%</text>
    </svg>
  )
}

export function DemoNormalParams() {
  const [mu, setMu] = useState(0)
  const [sigma, setSigma] = useState(1)

  const mu2 = mu - 2 * sigma
  const mu1 = mu - sigma
  const mu1p = mu + sigma
  const mu2p = mu + 2 * sigma

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          {/* Left — SVG curve */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div
              className="flex-1 flex items-center justify-center p-4"
              style={{ minHeight: 200 }}
            >
              <NormalCurve mu={mu} sigma={sigma} />
            </div>
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 italic">
                N({mu.toFixed(1)}, {sigma.toFixed(1)}²)
              </span>
            </div>
          </div>

          {/* Right — sliders + 68/95/99.7 info */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* μ slider */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-rurikon-500">mean (μ)</span>
                  <span className="font-mono text-xs text-rurikon-700">{mu.toFixed(1)}</span>
                </div>
                <input
                  type="range" min={-3} max={3} step={0.1} value={mu}
                  onChange={(e) => setMu(Number(e.target.value))}
                  className="w-full accent-rurikon-500 h-1"
                />
                <span className="text-[10px] text-rurikon-300 italic">Shifts the curve left or right — the centre of mass.</span>
              </div>

              {/* σ slider */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-rurikon-500">std dev (σ)</span>
                  <span className="font-mono text-xs text-rurikon-700">{sigma.toFixed(1)}</span>
                </div>
                <input
                  type="range" min={0.3} max={3} step={0.1} value={sigma}
                  onChange={(e) => setSigma(Number(e.target.value))}
                  className="w-full accent-rurikon-500 h-1"
                />
                <span className="text-[10px] text-rurikon-300 italic">Wider σ → flatter, more spread. Narrower → taller, concentrated.</span>
              </div>

              {/* 68/95/99.7 rule */}
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <div className="flex justify-between">
                  <span className="text-[#5a9fd4]">μ ± 1σ</span>
                  <span className="text-rurikon-400">{mu1.toFixed(1)} to {mu1p.toFixed(1)}</span>
                  <span>68%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8ba4c8]">μ ± 2σ</span>
                  <span className="text-rurikon-400">{mu2.toFixed(1)} to {mu2p.toFixed(1)}</span>
                  <span>95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rurikon-400">μ ± 3σ</span>
                  <span className="text-rurikon-300">—</span>
                  <span>99.7%</span>
                </div>
              </div>

              {/* Description */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">The empirical rule</span>
                <span className="text-xs text-rurikon-500">68% of data within 1σ, 95% within 2σ, 99.7% within 3σ.</span>
                <span className="text-xs text-rurikon-400 italic">Changing μ slides the curve; changing σ reshapes it.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
