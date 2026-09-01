"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

// 8 vivid sample pixels
const PIXELS: [number, number, number][] = [
  [220, 48,  48],
  [234, 148, 32],
  [196, 196, 40],
  [44,  176, 68],
  [36,  132, 220],
  [96,  44,  200],
  [200, 96,  180],
  [72,  160, 176],
]

function rgbToYCbCr(r: number, g: number, b: number): [number, number, number] {
  const y  = Math.round( 0.299    * r + 0.587    * g + 0.114    * b)
  const cb = Math.round(128 - 0.168736 * r - 0.331264 * g + 0.5      * b)
  const cr = Math.round(128 + 0.5      * r - 0.418688 * g - 0.081312 * b)
  return [
    Math.max(0, Math.min(255, y)),
    Math.max(0, Math.min(255, cb)),
    Math.max(0, Math.min(255, cr)),
  ]
}

function yCbCrToRgb(y: number, cb: number, cr: number): [number, number, number] {
  const r = y                      + 1.402    * (cr - 128)
  const g = y - 0.344136 * (cb - 128) - 0.714136 * (cr - 128)
  const b = y + 1.772    * (cb - 128)
  return [
    Math.round(Math.max(0, Math.min(255, r))),
    Math.round(Math.max(0, Math.min(255, g))),
    Math.round(Math.max(0, Math.min(255, b))),
  ]
}

type View = "rgb" | "y" | "cb" | "cr" | "reconstruct"

const VIEWS: { id: View; label: string; desc: string }[] = [
  { id: "rgb",        label: "RGB",        desc: "Original — each pixel stores red, green, and blue independently." },
  { id: "y",          label: "Y  luma",    desc: "Brightness only. Human vision is sharpest here, so JPEG keeps this channel at full resolution." },
  { id: "cb",         label: "Cb  chroma", desc: "Blue–yellow colour difference. We see this poorly, so it can be compressed more aggressively." },
  { id: "cr",         label: "Cr  chroma", desc: "Red–cyan colour difference. Same story — coarser resolution hurts very little perceptually." },
  { id: "reconstruct",label: "Reconstruct",desc: "Rebuilt from Y + Cb + Cr. Toggle 4:2:0 to see what halving the colour resolution looks like." },
]

function cbColor(cb: number) {
  // Map Cb through a blue–orange palette for visibility
  const t = (cb - 128) / 128
  const r = Math.round(128 - t * 100)
  const g = Math.round(128 + t * 20)
  const b = Math.round(128 + t * 120)
  return `rgb(${clamp(r)},${clamp(g)},${clamp(b)})`
}

function crColor(cr: number) {
  const t = (cr - 128) / 128
  const r = Math.round(128 + t * 120)
  const g = Math.round(128 - t * 60)
  const b = Math.round(128 - t * 40)
  return `rgb(${clamp(r)},${clamp(g)},${clamp(b)})`
}

function clamp(v: number) { return Math.max(0, Math.min(255, v)) }

const CELL = "w-9 h-9 sm:w-11 sm:h-11 border border-white/10 flex-shrink-0 transition-colors duration-200"

export function DemoColorChannels() {
  const [view, setView] = useState<View>("rgb")
  const [subsampled, setSubsampled] = useState(false)

  const ycbcr = PIXELS.map(([r, g, b]) => rgbToYCbCr(r, g, b))

  // 4:2:0 subsampling: each pair shares the Cb/Cr of its left neighbor
  const getCb = (i: number) => subsampled ? ycbcr[i % 2 === 0 ? i : i - 1][1] : ycbcr[i][1]
  const getCr = (i: number) => subsampled ? ycbcr[i % 2 === 0 ? i : i - 1][2] : ycbcr[i][2]

  function swatchColor(i: number): string {
    const [r, g, b] = PIXELS[i]
    const [y] = ycbcr[i]
    switch (view) {
      case "rgb":
        return `rgb(${r},${g},${b})`
      case "y":
        return `rgb(${y},${y},${y})`
      case "cb":
        return cbColor(ycbcr[i][1])
      case "cr":
        return crColor(ycbcr[i][2])
      case "reconstruct": {
        const [rr, gg, bb] = yCbCrToRgb(y, getCb(i), getCr(i))
        return `rgb(${rr},${gg},${bb})`
      }
    }
  }

  const activeView = VIEWS.find((v) => v.id === view)!

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      <div className="p-4 sm:p-6 flex flex-col gap-5">
        {/* Two rows: original + the selected channel */}
        <div className="flex flex-col gap-3">
          <div>
            <span className="text-[10px] text-rurikon-300 uppercase tracking-widest block mb-1.5">
              original rgb
            </span>
            <div className="flex gap-0.5">
              {PIXELS.map(([r, g, b], i) => (
                <div
                  key={i}
                  className={CELL}
                  style={{ backgroundColor: `rgb(${r},${g},${b})` }}
                />
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] text-rurikon-300 uppercase tracking-widest block mb-1.5">
              {activeView.label}
              {view === "reconstruct" && subsampled && " · 4:2:0 subsampled"}
            </span>
            <div className="flex gap-0.5">
              {PIXELS.map((_, i) => (
                <div
                  key={i}
                  className={CELL}
                  style={{ backgroundColor: swatchColor(i) }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-rurikon-400 italic leading-relaxed max-w-md">
          {activeView.desc}
        </p>

        {/* Channel buttons */}
        <div className="flex flex-wrap gap-1.5">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={cn(
                "text-xs rounded px-2.5 py-1.5 border transition-colors",
                view === v.id
                  ? "bg-rurikon-800 text-white border-rurikon-600"
                  : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">YCbCr channels</span>
        {view === "reconstruct" && (
          <button
            onClick={() => setSubsampled((s) => !s)}
            className={cn(
              "text-xs rounded px-2.5 py-1.5 border transition-colors",
              subsampled
                ? "bg-rurikon-800 text-white border-rurikon-600"
                : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
            )}
          >
            4:2:0 subsample
          </button>
        )}
      </div>
    </div>
  )
}
