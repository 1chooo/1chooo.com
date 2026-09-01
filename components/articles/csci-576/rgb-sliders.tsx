'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

const CHANNELS = [
  { key: 'r', label: 'Red', hex: 0, accent: 'text-red-500' },
  { key: 'g', label: 'Green', hex: 1, accent: 'text-green-600' },
  { key: 'b', label: 'Blue', hex: 2, accent: 'text-blue-500' },
] as const

type Channel = 'r' | 'g' | 'b'

interface RGB { r: number; g: number; b: number }

function toHex(n: number) {
  return n.toString(16).padStart(2, '0').toUpperCase()
}

function hexColor({ r, g, b }: RGB) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function RGBSliders() {
  const [rgb, setRgb] = useState<RGB>({ r: 99, g: 102, b: 241 })

  const hex = hexColor(rgb)

  function set(channel: Channel, val: number) {
    setRgb(prev => ({ ...prev, [channel]: val }))
  }

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] flex flex-col items-stretch gap-6 py-8 px-6 sm:flex-row sm:items-center sm:gap-10 sm:py-10 sm:px-10 font-serif">

      {/* ── Colour swatch — small square, left ── */}
      <div className="shrink-0 flex justify-center sm:justify-start">
        <div
          className="w-28 h-28 sm:w-36 sm:h-36"
          style={{ backgroundColor: hex }}
        />
      </div>

      {/* ── Controls — sliders + values, right ── */}
      <div className="flex-auto min-w-0 space-y-4">

        {/* Channel sliders */}
        {CHANNELS.map(({ key, label, accent }) => (
          <div key={key} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <span className={cn('font-serif text-[12px] font-bold', accent)}>
                {label}
              </span>
              <span className="font-mono text-[11px] text-[#888] tabular-nums">
                {rgb[key]}
              </span>
            </div>
            <Slider
              min={0}
              max={255}
              step={1}
              value={[rgb[key]]}
              onValueChange={([v]) => set(key, v)}
            />
          </div>
        ))}

        {/* Colour values */}
        <div className="flex flex-col gap-0.5 items-center">
          <p className="font-mono text-[11px] text-[#555]">
            <span className="font-bold text-[#1a1a1a]">RGB&nbsp;</span>
            ({rgb.r}, {rgb.g}, {rgb.b})
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Helper ──────────────────────────────────────────────────────────────────
function rgbToHsl({ r, g, b }: RGB): string {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  if (max === min) return `0°, 0%, ${Math.round(l * 100)}%`
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  switch (max) {
    case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break
    case gn: h = ((bn - rn) / d + 2) / 6; break
    case bn: h = ((rn - gn) / d + 4) / 6; break
  }
  return `${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`
}
