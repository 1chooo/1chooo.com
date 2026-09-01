"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

// Simulated page sections with estimated pixel heights (in mini-units)
const SECTIONS = [
  { id: "nav",     label: "Navbar",       height: 28,  color: "#e2e8f0", textColor: "#94a3b8" },
  { id: "hero",    label: "Hero",         height: 90,  color: "#dde3f0", textColor: "#6070a0" },
  { id: "logos",   label: "Social Proof", height: 38,  color: "#eef1f8", textColor: "#94a3b8" },
  { id: "feat",    label: "Features",     height: 80,  color: "#f4f6fb", textColor: "#94a3b8" },
  { id: "quote",   label: "Testimonials", height: 60,  color: "#eef1f8", textColor: "#94a3b8" },
  { id: "cta-bot", label: "Footer CTA",   height: 50,  color: "#dde3f0", textColor: "#6070a0" },
]

const TOTAL_HEIGHT = SECTIONS.reduce((s, x) => s + x.height, 0)

// Common device viewport heights (in proportion to the total page)
const VIEWPORTS = [
  { label: "mobile  360px", ratio: 0.35 },
  { label: "laptop  768px", ratio: 0.55 },
  { label: "desktop 1080px", ratio: 0.72 },
]

export function DemoFold() {
  const [viewportRatio, setViewportRatio] = useState(0.55)
  const foldY = Math.round(viewportRatio * TOTAL_HEIGHT)

  let cumulative = 0
  const sectionRects = SECTIONS.map((s) => {
    const top = cumulative
    cumulative += s.height
    return { ...s, top, bottom: cumulative }
  })

  const aboveFold = sectionRects.filter((s) => s.top < foldY)
  const belowFold = sectionRects.filter((s) => s.bottom > foldY)

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6">

        {/* Mini browser */}
        <div className="shrink-0 flex flex-col" style={{ width: 156 }}>
          <div className="flex items-center gap-1 px-2 py-1.5 bg-rurikon-50 border border-rurikon-border rounded-t text-[9px] text-rurikon-300">
            <div className="w-1.5 h-1.5 rounded-full bg-rurikon-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-rurikon-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-rurikon-200" />
            <div className="flex-1 mx-1.5 h-2 bg-rurikon-100 border border-rurikon-border/50 rounded-sm" />
          </div>

          {/* Page content + fold line */}
          <div
            className="border border-t-0 border-rurikon-border relative overflow-hidden rounded-b"
            style={{ height: TOTAL_HEIGHT }}
          >
            {/* Sections */}
            {sectionRects.map((s) => (
              <div
                key={s.id}
                className="absolute left-0 right-0 flex items-center justify-center"
                style={{
                  top: s.top,
                  height: s.height,
                  backgroundColor: s.color,
                  opacity: s.bottom <= foldY ? 1 : 0.45,
                }}
              >
                <span
                  className="text-[9px] tracking-wide uppercase"
                  style={{ color: s.textColor }}
                >
                  {s.label}
                </span>
              </div>
            ))}

            {/* Fold line */}
            <div
              className="absolute left-0 right-0 z-10 pointer-events-none"
              style={{ top: foldY }}
            >
              <div className="w-full h-px bg-rurikon-500/70" />
              <div
                className="absolute right-0 text-[8px] text-rurikon-500 bg-[#fefefe]/90 px-1 leading-none"
                style={{ top: 1 }}
              >
                fold
              </div>
            </div>
          </div>
        </div>

        {/* Controls + info */}
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          {/* Viewport selector */}
          <div>
            <span className="text-[10px] text-rurikon-300 uppercase tracking-widest block mb-2">
              viewport
            </span>
            <div className="flex flex-wrap gap-1.5">
              {VIEWPORTS.map((v) => (
                <button
                  key={v.label}
                  onClick={() => setViewportRatio(v.ratio)}
                  className={cn(
                    "text-xs rounded px-2.5 py-1.5 border transition-colors",
                    viewportRatio === v.ratio
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fold position slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs text-rurikon-400">
              <span>fold position</span>
              <span className="font-mono">{Math.round(viewportRatio * 100)}%</span>
            </div>
            <input
              type="range"
              min={20}
              max={85}
              step={1}
              value={Math.round(viewportRatio * 100)}
              onChange={(e) => setViewportRatio(Number(e.target.value) / 100)}
              className="w-full h-[3px] cursor-pointer accent-rurikon-400"
            />
            <div className="flex justify-between text-[10px] text-rurikon-300">
              <span>small screen</span>
              <span>tall screen</span>
            </div>
          </div>

          {/* Above / below breakdown */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[10px] text-rurikon-300 uppercase tracking-widest block mb-1">
                above fold
              </span>
              <ul className="flex flex-col gap-0.5">
                {aboveFold.map((s) => (
                  <li key={s.id} className="text-xs text-rurikon-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-rurikon-400" />
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[10px] text-rurikon-300 uppercase tracking-widest block mb-1">
                below fold
              </span>
              <ul className="flex flex-col gap-0.5">
                {belowFold.map((s) => (
                  <li key={s.id} className="text-xs text-rurikon-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-rurikon-200" />
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-xs text-rurikon-400 italic leading-relaxed">
            {viewportRatio < 0.4
              ? "On small screens the fold sits above the social proof logos — the hero must work entirely alone."
              : viewportRatio < 0.65
              ? "On a typical laptop, one or two sections breathe below the fold. Social proof is often just out of view."
              : "Tall desktop viewports reveal more context, but most users still only see the top third immediately."}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">above the fold</span>
        <span className="text-[10px] text-rurikon-300">
          {aboveFold.length} of {SECTIONS.length} sections visible immediately
        </span>
      </div>
    </div>
  )
}
