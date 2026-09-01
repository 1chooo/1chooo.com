"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"

const PEG_R = 10
const BALL_R = 8
const SVG_W = 200
const SVG_H = 160
const PEG_X = SVG_W / 2
const PEG_Y = 40
const LEFT_X = SVG_W / 2 - 56
const RIGHT_X = SVG_W / 2 + 56
const LAND_Y = SVG_H - 20

interface AnimBall {
  id: number
  dir: "left" | "right"
  phase: "drop" | "bounce" | "done"
  t: number
}

export function DemoCoinFlip() {
  const [bias, setBias] = useState(0.5)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [ball, setBall] = useState<AnimBall | null>(null)
  const [lastDir, setLastDir] = useState<"left" | "right" | null>(null)
  const nextId = useRef(0)
  const rafRef = useRef<number | null>(null)

  const animateBall = useCallback((dir: "left" | "right") => {
    const id = nextId.current++
    let startTime: number | null = null

    const tick = (time: number) => {
      if (!startTime) startTime = time
      const elapsed = (time - startTime) / 1000
      const TOTAL = 0.7

      if (elapsed >= TOTAL) {
        setBall({ id, dir, phase: "done", t: 1 })
        if (dir === "left") setLeft((n) => n + 1)
        else setRight((n) => n + 1)
        rafRef.current = null
        return
      }

      const t = elapsed / TOTAL
      setBall({ id, dir, phase: t < 0.5 ? "drop" : "bounce", t })
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const flip = useCallback(() => {
    if (rafRef.current !== null) return
    const dir = Math.random() < bias ? "right" : "left"
    setLastDir(dir)
    animateBall(dir)
  }, [bias, animateBall])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Ball position
  let ballX = PEG_X
  let ballY = PEG_Y - PEG_R - BALL_R - 60
  let ballOpacity = 0

  if (ball && ball.phase !== "done") {
    ballOpacity = 1
    const t = ball.t
    if (t < 0.5) {
      // Drop from top to peg level
      const dt = t / 0.5
      ballY = (PEG_Y - PEG_R - BALL_R - 60) + (60) * dt
      ballX = PEG_X
    } else {
      // Bounce from peg to landing zone
      const dt = (t - 0.5) / 0.5
      const targetX = ball.dir === "left" ? LEFT_X : RIGHT_X
      ballX = PEG_X + (targetX - PEG_X) * dt
      // arc: parabola down
      ballY = (PEG_Y - BALL_R) + (LAND_Y - (PEG_Y - BALL_R)) * dt * dt
    }
  }

  const total = left + right
  const pLeft = total > 0 ? left / total : 0
  const pRight = total > 0 ? right / total : 0

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          {/* Left — SVG peg visualisation */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div
              className="flex-1 flex items-center justify-center p-4"
              style={{ minHeight: 200 }}
            >
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                width={SVG_W}
                height={SVG_H}
                className="overflow-visible"
              >
                {/* Drop channel lines */}
                <line x1={PEG_X} y1={0} x2={PEG_X} y2={PEG_Y - PEG_R - 2}
                  stroke="#d0d8e8" strokeWidth={1} strokeDasharray="3 3" />

                {/* Left/Right labels */}
                <text x={LEFT_X} y={LAND_Y + 16} textAnchor="middle"
                  fontSize={9} fill="#8ba4c8" fontFamily="serif">L</text>
                <text x={RIGHT_X} y={LAND_Y + 16} textAnchor="middle"
                  fontSize={9} fill="#8ba4c8" fontFamily="serif">R</text>

                {/* Landing zone markers */}
                <line x1={LEFT_X - 14} y1={LAND_Y} x2={LEFT_X + 14} y2={LAND_Y}
                  stroke="#d0d8e8" strokeWidth={1.5} />
                <line x1={RIGHT_X - 14} y1={LAND_Y} x2={RIGHT_X + 14} y2={LAND_Y}
                  stroke="#d0d8e8" strokeWidth={1.5} />

                {/* Direction indicators */}
                <line x1={PEG_X} y1={PEG_Y} x2={LEFT_X} y2={LAND_Y - 2}
                  stroke="#e8eef5" strokeWidth={1} />
                <line x1={PEG_X} y1={PEG_Y} x2={RIGHT_X} y2={LAND_Y - 2}
                  stroke="#e8eef5" strokeWidth={1} />

                {/* Peg */}
                <circle cx={PEG_X} cy={PEG_Y} r={PEG_R}
                  fill="#dce8f5" stroke="#5a9fd4" strokeWidth={1.5} />

                {/* Ball */}
                {ball && ball.phase !== "done" && (
                  <circle
                    cx={ballX} cy={ballY} r={BALL_R}
                    fill="#4a6fa5" opacity={ballOpacity}
                  />
                )}

                {/* Landed ball highlight */}
                {lastDir && (
                  <circle
                    cx={lastDir === "left" ? LEFT_X : RIGHT_X}
                    cy={LAND_Y - BALL_R}
                    r={BALL_R}
                    fill={lastDir === "left" ? "#d4a96a" : "#5a9fd4"}
                    opacity={0.7}
                  />
                )}
              </svg>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                one peg · p = {bias.toFixed(2)} right
              </span>
              <button
                onClick={flip}
                disabled={ball !== null && ball.phase !== "done"}
                className={cn(
                  "text-xs rounded px-2.5 py-1.5 border transition-colors",
                  "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600",
                  "disabled:opacity-40 disabled:cursor-not-allowed"
                )}
              >
                flip
              </button>
              <button
                onClick={() => { setLeft(0); setRight(0); setLastDir(null); setBall(null) }}
                className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
              >
                reset
              </button>
            </div>
          </div>

          {/* Right — bias slider + tally */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* Bias slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-rurikon-500">right bias (p)</span>
                  <span className="font-mono text-xs text-rurikon-700">{bias.toFixed(2)}</span>
                </div>
                <input
                  type="range" min={0} max={1} step={0.01} value={bias}
                  onChange={(e) => setBias(Number(e.target.value))}
                  className="w-full accent-rurikon-500 h-1"
                />
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] text-rurikon-300">0 (always left)</span>
                  <span className="font-mono text-[10px] text-rurikon-300">1 (always right)</span>
                </div>
              </div>

              {/* Tally */}
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <div className="flex justify-between">
                  <span className="text-[#8b6914]">left</span>
                  <span>{left} <span className="text-rurikon-300">({total > 0 ? (pLeft * 100).toFixed(1) : "—"}%)</span></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1a5a8b]">right</span>
                  <span>{right} <span className="text-rurikon-300">({total > 0 ? (pRight * 100).toFixed(1) : "—"}%)</span></span>
                </div>
                <div className="flex justify-between border-t border-rurikon-border/30 mt-1 pt-1">
                  <span className="text-rurikon-400">total</span>
                  <span>{total}</span>
                </div>
              </div>

              {/* Description */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">Bernoulli trial</span>
                <span className="text-xs text-rurikon-500">One ball, one peg: it goes right with probability p, left with 1−p.</span>
                <span className="text-xs text-rurikon-400 italic">Adjust bias to see how the long-run ratio tracks p.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
