"use client"

import { useState, useCallback, useEffect, useRef, useMemo } from "react"
import { cn } from "@/lib/utils"
import { GaltonBoard } from "@/components/articles/bell-curve/galton-board"
import type { GaltonBoardHandle } from '@/types/articles/bell-curve'

const DEFAULT_ROWS = 10
const DEFAULT_BIAS = 0.5
const DEFAULT_SPEED = 1
const DEFAULT_AUTO_RATE = 12

// Binomial coefficient (n choose k)
function nCr(n: number, k: number): number {
  if (k < 0 || k > n) return 0
  if (k === 0 || k === n) return 1
  let result = 1
  for (let i = 0; i < Math.min(k, n - k); i++) {
    result = result * (n - i) / (i + 1)
  }
  return result
}

function binomialPMF(n: number, p: number, k: number): number {
  return nCr(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
}

// SVG histogram + theoretical overlay
function BinomialChart({
  bins,
  rows,
  bias,
  total,
}: {
  bins: number[]
  rows: number
  bias: number
  total: number
}) {
  const W = 260
  const H = 140
  const PAD = { top: 8, right: 8, bottom: 20, left: 28 }
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  const n = rows
  const numBins = n + 1

  // Theoretical expected counts
  const theory = Array.from({ length: numBins }, (_, k) => binomialPMF(n, bias, k) * Math.max(total, 1))

  const maxCount = Math.max(...bins, ...theory, 1)
  const binW = chartW / numBins

  const toY = (v: number) => PAD.top + chartH - (v / maxCount) * chartH

  // Normal overlay SVG path
  const normalPath = useMemo(() => {
    if (total < 5) return ""
    const mu = n * bias
    const sigma = Math.sqrt(n * bias * (1 - bias))
    if (sigma < 0.01) return ""
    const pts: string[] = []
    const steps = 80
    for (let i = 0; i <= steps; i++) {
      const frac = i / steps
      const xVal = -0.5 + frac * (numBins)
      const z = (xVal - mu) / sigma
      const pdf = Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI))
      const expected = pdf * total
      const svgX = PAD.left + (xVal + 0.5) * binW
      const svgY = toY(expected)
      pts.push(`${i === 0 ? "M" : "L"}${svgX.toFixed(1)},${svgY.toFixed(1)}`)
    }
    return pts.join(" ")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, bias, total, numBins, binW, chartH, maxCount])

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="overflow-visible">
      {/* Gridline at max */}
      <line
        x1={PAD.left} y1={PAD.top}
        x2={PAD.left + chartW} y2={PAD.top}
        stroke="#e8eef5" strokeWidth={1}
      />
      <text x={PAD.left - 3} y={PAD.top + 3} textAnchor="end" fontSize={7} fill="#b0bad0">
        {Math.round(maxCount)}
      </text>

      {/* Bars (observed) */}
      {bins.map((count, i) => {
        const x = PAD.left + i * binW
        const y = toY(count)
        const h = (PAD.top + chartH) - y
        return (
          <rect
            key={i}
            x={x + 1} y={y}
            width={Math.max(0, binW - 2)} height={Math.max(0, h)}
            fill="#dce8f5" stroke="#5a9fd4" strokeWidth={0.5}
          />
        )
      })}

      {/* Theoretical binomial bars (hollow) */}
      {theory.map((expected, i) => {
        const x = PAD.left + i * binW
        const y = toY(expected)
        const h = (PAD.top + chartH) - y
        return (
          <rect
            key={i}
            x={x + 1} y={y}
            width={Math.max(0, binW - 2)} height={Math.max(0, h)}
            fill="none" stroke="#d4a96a" strokeWidth={0.8} strokeDasharray="3 2"
          />
        )
      })}

      {/* Normal curve overlay */}
      {normalPath && (
        <path d={normalPath} fill="none" stroke="#d45a9f" strokeWidth={1.2} strokeDasharray="4 2" opacity={0.7} />
      )}

      {/* x-axis */}
      <line
        x1={PAD.left} y1={PAD.top + chartH}
        x2={PAD.left + chartW} y2={PAD.top + chartH}
        stroke="#d0d8e8" strokeWidth={1}
      />

      {/* Bin labels (every other) */}
      {bins.map((_, i) => {
        if (numBins > 12 && i % 2 !== 0) return null
        const x = PAD.left + (i + 0.5) * binW
        return (
          <text key={i} x={x} y={H - 4} textAnchor="middle" fontSize={7} fill="#b0bad0">
            {i}
          </text>
        )
      })}

      {/* Legend */}
      <rect x={PAD.left + chartW - 70} y={PAD.top} width={8} height={6} fill="#dce8f5" stroke="#5a9fd4" strokeWidth={0.5} />
      <text x={PAD.left + chartW - 59} y={PAD.top + 6} fontSize={7} fill="#5a9fd4">observed</text>
      <rect x={PAD.left + chartW - 70} y={PAD.top + 10} width={8} height={6} fill="none" stroke="#d4a96a" strokeWidth={0.8} strokeDasharray="2 1" />
      <text x={PAD.left + chartW - 59} y={PAD.top + 16} fontSize={7} fill="#d4a96a">binomial</text>
      <line x1={PAD.left + chartW - 70} y1={PAD.top + 23} x2={PAD.left + chartW - 62} y2={PAD.top + 23} stroke="#d45a9f" strokeWidth={1.2} strokeDasharray="3 1" />
      <text x={PAD.left + chartW - 59} y={PAD.top + 26} fontSize={7} fill="#d45a9f">normal</text>
    </svg>
  )
}

export function DemoGalton() {
  const [rows, setRows] = useState(DEFAULT_ROWS)
  const [bias, setBias] = useState(DEFAULT_BIAS)
  const [speed, setSpeed] = useState(DEFAULT_SPEED)
  const [autoPlay, setAutoPlay] = useState(false)
  const [autoRate, setAutoRate] = useState(DEFAULT_AUTO_RATE)
  const [bins, setBins] = useState<number[]>(() => Array(DEFAULT_ROWS + 1).fill(0))

  const boardRef = useRef<GaltonBoardHandle>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setBins(Array(rows + 1).fill(0))
    boardRef.current?.reset()
  }, [rows])

  const handleLanded = useCallback((binIndex: number) => {
    setBins((prev) => {
      if (binIndex < 0 || binIndex >= prev.length) return prev
      const next = prev.slice()
      next[binIndex] = (next[binIndex] || 0) + 1
      return next
    })
  }, [])

  const handleReset = useCallback(() => {
    setBins(Array(rows + 1).fill(0))
    setAutoPlay(false)
    boardRef.current?.reset()
  }, [rows])

  useEffect(() => {
    if (!autoPlay) return
    const interval = Math.max(20, Math.round(1000 / autoRate))
    const id = window.setInterval(() => {
      boardRef.current?.drop(1)
    }, interval)
    return () => window.clearInterval(id)
  }, [autoPlay, autoRate])

  // Keyboard shortcuts (scoped to container focus)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      switch (e.key) {
        case "1": e.preventDefault(); boardRef.current?.drop(1); break
        case "2": e.preventDefault(); boardRef.current?.drop(10); break
        case "3": e.preventDefault(); boardRef.current?.drop(100); break
        case "4": e.preventDefault(); boardRef.current?.drop(1000); break
        case " ": e.preventDefault(); boardRef.current?.drop(1); break
        case "a": case "A": e.preventDefault(); setAutoPlay((v) => !v); break
        case "r": case "R": e.preventDefault(); handleReset(); break
      }
    }
    container.addEventListener("keydown", handler)
    return () => container.removeEventListener("keydown", handler)
  }, [handleReset])

  const total = useMemo(() => bins.reduce((a, b) => a + b, 0), [bins])

  const stats = useMemo(() => {
    if (total === 0) return { mean: null, variance: null, skew: null }
    const mean = bins.reduce((s, c, i) => s + i * c, 0) / total
    const variance = bins.reduce((s, c, i) => s + c * (i - mean) ** 2, 0) / total
    const skew = variance > 0
      ? bins.reduce((s, c, i) => s + c * ((i - mean) / Math.sqrt(variance)) ** 3, 0) / total
      : 0
    return { mean, variance, skew }
  }, [bins, total])

  const theoMean = rows * bias
  const theoVariance = rows * bias * (1 - bias)

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="my-8 article-demo-shell outline-none"
    >
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          {/* Left — canvas simulation */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1" style={{ minHeight: 280 }}>
              <GaltonBoard
                ref={boardRef}
                rows={rows}
                bias={bias}
                speed={speed}
                onBallLanded={handleLanded}
              />
            </div>
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                Galton board · {total} balls
              </span>
              {(["1", "10", "100", "1k"] as const).map((label, i) => {
                const count = [1, 10, 100, 1000][i]
                return (
                  <button
                    key={label}
                    onClick={() => boardRef.current?.drop(count)}
                    className="font-mono text-[11px] rounded px-2 py-1 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  >
                    +{label}
                  </button>
                )
              })}
              <button
                onClick={() => setAutoPlay((v) => !v)}
                className={cn(
                  "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                  autoPlay
                    ? "bg-rurikon-800 text-white border-rurikon-600"
                    : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                )}
              >
                {autoPlay ? "pause" : "auto"}
              </button>
              <button
                onClick={handleReset}
                className="font-mono text-[11px] rounded px-2 py-1 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
              >
                reset
              </button>
            </div>
          </div>

          {/* Right — controls + histogram + stats */}
          <div className="w-full text:w-85 flex flex-col bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* Chart */}
              <div className="flex justify-center">
                <BinomialChart bins={bins} rows={rows} bias={bias} total={total} />
              </div>

              {/* Sliders */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="font-mono text-[11px] text-rurikon-500">rows (n)</span>
                    <span className="font-mono text-[11px] text-rurikon-700">{rows}</span>
                  </div>
                  <input
                    type="range" min={4} max={16} step={1} value={rows}
                    onChange={(e) => setRows(Number(e.target.value))}
                    className="w-full accent-rurikon-500 h-1"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="font-mono text-[11px] text-rurikon-500">bias (p)</span>
                    <span className="font-mono text-[11px] text-rurikon-700">{bias.toFixed(2)}</span>
                  </div>
                  <input
                    type="range" min={0.01} max={0.99} step={0.01} value={bias}
                    onChange={(e) => setBias(Number(e.target.value))}
                    className="w-full accent-rurikon-500 h-1"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="font-mono text-[11px] text-rurikon-500">speed</span>
                    <span className="font-mono text-[11px] text-rurikon-700">{speed.toFixed(1)}×</span>
                  </div>
                  <input
                    type="range" min={0.5} max={5} step={0.5} value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-full accent-rurikon-500 h-1"
                  />
                </div>

                {autoPlay && (
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span className="font-mono text-[11px] text-rurikon-500">rate</span>
                      <span className="font-mono text-[11px] text-rurikon-700">{autoRate}/s</span>
                    </div>
                    <input
                      type="range" min={1} max={32} step={1} value={autoRate}
                      onChange={(e) => setAutoRate(Number(e.target.value))}
                      className="w-full accent-rurikon-500 h-1"
                    />
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6 flex flex-col gap-0.5">
                <div className="flex justify-between">
                  <span className="text-rurikon-400">mean</span>
                  <span>
                    {stats.mean !== null ? stats.mean.toFixed(2) : "—"}
                    <span className="text-rurikon-300 ml-1">(theo: {theoMean.toFixed(2)})</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rurikon-400">variance</span>
                  <span>
                    {stats.variance !== null ? stats.variance.toFixed(2) : "—"}
                    <span className="text-rurikon-300 ml-1">(theo: {theoVariance.toFixed(2)})</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rurikon-400">skewness</span>
                  <span>{stats.skew !== null ? stats.skew.toFixed(3) : "—"}</span>
                </div>
                <div className="flex justify-between border-t border-rurikon-border/30 mt-0.5 pt-1">
                  <span className="text-rurikon-400">total</span>
                  <span>{total}</span>
                </div>
              </div>

              {/* Keyboard shortcuts hint */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-2">
                <span className="font-mono text-[10px] text-rurikon-400">
                  Focus here: <strong>1</strong> +1 · <strong>2</strong> +10 · <strong>3</strong> +100 · <strong>4</strong> +1k · <strong>A</strong> auto · <strong>R</strong> reset
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
