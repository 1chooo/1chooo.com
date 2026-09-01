"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const LAYERS = [
  { key: "margin", label: "margin", color: "bg-[#f5e6cc]", border: "border-[#d4a96a]", text: "text-[#8b6914]" },
  { key: "border", label: "border", color: "bg-[#c5d8a4]", border: "border-[#7aab4e]", text: "text-[#3a6b1a]" },
  { key: "padding", label: "padding", color: "bg-[#a8c8e8]", border: "border-[#5a9fd4]", text: "text-[#1a5a8b]" },
  { key: "content", label: "content", color: "bg-[#d4b8e8]", border: "border-[#9b72d4]", text: "text-[#5a1a8b]" },
]

const PRESETS = [
  { label: "Default", margin: 16, border: 2, padding: 16, w: 120, h: 60 },
  { label: "No padding", margin: 16, border: 2, padding: 0, w: 120, h: 60 },
  { label: "Large margin", margin: 40, border: 2, padding: 16, w: 120, h: 60 },
  { label: "Fat border", margin: 16, border: 16, padding: 16, w: 120, h: 60 },
]

export function DemoBoxModel() {
  const [presetIdx, setPresetIdx] = useState(0)
  const [showSizes, setShowSizes] = useState(true)
  const p = PRESETS[presetIdx]

  const contentW = p.w
  const contentH = p.h
  const paddingW = contentW + p.padding * 2
  const paddingH = contentH + p.padding * 2
  const borderW = paddingW + p.border * 2
  const borderH = paddingH + p.border * 2
  const marginW = borderW + p.margin * 2
  const marginH = borderH + p.margin * 2

  const scale = Math.min(1, 260 / marginW, 180 / marginH)

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        {/* Main content */}
        <div className="flex flex-col text:flex-row">
          {/* Left column: Box visualization + Footer */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            {/* Box visualization */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6" style={{ minHeight: 200 }}>
              <div
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "center center",
                  position: "relative",
                  width: marginW,
                  height: marginH,
                }}
              >
                {/* margin layer */}
                <div
                  className="absolute inset-0 bg-[#f5e6cc] border border-dashed border-[#d4a96a] flex items-start justify-start"
                  style={{ width: marginW, height: marginH }}
                >
                  {showSizes && (
                    <span className="text-[10px] text-[#8b6914] px-1 leading-tight">margin</span>
                  )}
                  {/* border layer */}
                  <div
                    className="absolute bg-[#c5d8a4]"
                    style={{
                      top: p.margin, left: p.margin,
                      width: borderW, height: borderH,
                    }}
                  >
                    {showSizes && (
                      <span className="absolute top-0.5 left-1 text-[10px] text-[#3a6b1a] leading-tight">border</span>
                    )}
                    {/* padding layer */}
                    <div
                      className="absolute bg-[#a8c8e8]"
                      style={{
                        top: p.border, left: p.border,
                        width: paddingW, height: paddingH,
                      }}
                    >
                      {showSizes && (
                        <span className="absolute top-0.5 left-1 text-[10px] text-[#1a5a8b] leading-tight">padding</span>
                      )}
                      {/* content layer */}
                      <div
                        className="absolute bg-[#d4b8e8] flex items-center justify-center"
                        style={{
                          top: p.padding, left: p.padding,
                          width: contentW, height: contentH,
                        }}
                      >
                        <span className="text-[11px] text-[#5a1a8b]">content</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-2 px-3 py-2 border-t border-rurikon-border flex-wrap">
              {/* <span className="font-serif text-xs text-rurikon-400 mr-auto italic">box model</span> */}
              {PRESETS.map((pr, i) => (
                <button
                  key={pr.label}
                  onClick={() => setPresetIdx(i)}
                  className={cn(
                    "text-xs rounded px-2.5 py-1.5 border transition-colors",
                    presetIdx === i
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  {pr.label}
                </button>
              ))}
              <button
                onClick={() => setShowSizes((s) => !s)}
                className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
              >
                {showSizes ? "hide labels" : "show labels"}
              </button>
            </div>
          </div>

          {/* Measurements + legend */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className="w-full font-mono text-xs border border-rurikon-border/40 overflow-hidden">
                {[
                  { label: "content", value: `${contentW} × ${contentH}px`, color: "bg-[#d4b8e8]/20" },
                  { label: `+ padding × 2  (${p.padding}px)`, value: `${paddingW} × ${paddingH}px`, color: "bg-[#a8c8e8]/20" },
                  { label: `+ border × 2  (${p.border}px)`, value: `${borderW} × ${borderH}px`, color: "bg-[#c5d8a4]/20" },
                  { label: `+ margin × 2  (${p.margin}px)`, value: `${marginW} × ${marginH}px`, color: "bg-[#f5e6cc]/20" },
                ].map((row) => (
                  <div key={row.label} className={cn("flex justify-between px-2.5 py-1 border-b border-rurikon-border/20 last:border-0", row.color)}>
                    <span className="text-rurikon-500">{row.label}</span>
                    <span className="text-rurikon-700 font-medium">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-2 justify-center lg:grid lg:grid-cols-2">
                {LAYERS.map((l) => (
                  <div key={l.key} className={cn("flex items-center gap-1.5 px-2 py-0.5 border text-xs", l.color, l.border, l.text)}>
                    <div className={cn("w-2.5 h-2.5 rounded-sm border", l.border)} />
                    {l.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
