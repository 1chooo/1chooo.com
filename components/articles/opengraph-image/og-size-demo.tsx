"use client"

import { useEffect, useRef, useState } from "react"

// Canonical OG dimensions
const OG_W = 1200
const OG_H = 630

type Zone = {
  id: string
  label: string
  x: number   // fraction of OG_W
  y: number
  w: number
  h: number
  color: string
  desc: string
}

const ZONES: Zone[] = [
  {
    id: "bg",
    label: "background",
    x: 0, y: 0, w: 1, h: 1,
    color: "rgba(44,62,80,0.18)",
    desc: "The full 1200 × 630 canvas. Every pixel counts — crawlers crop to exactly this ratio.",
  },
  {
    id: "logo",
    label: "logo / avatar",
    x: 60 / OG_W, y: 60 / OG_H, w: 80 / OG_W, h: 80 / OG_H,
    color: "rgba(93,156,236,0.55)",
    desc: "A small avatar or site logo anchored to the top-left. Keep it square — 80 × 80 px is comfortable.",
  },
  {
    id: "site",
    label: "site name",
    x: 160 / OG_W, y: 72 / OG_H, w: 300 / OG_W, h: 40 / OG_H,
    color: "rgba(93,156,236,0.35)",
    desc: "Your site name or domain placed next to the logo. Use a muted tone — this is supporting text.",
  },
  {
    id: "title",
    label: "title",
    x: 60 / OG_W, y: 220 / OG_H, w: 820 / OG_W, h: 160 / OG_H,
    color: "rgba(231,76,60,0.35)",
    desc: "The post title — the most important text. Aim for ≤ 60 characters and a large font (56–72 px). This is what users read before clicking.",
  },
  {
    id: "desc",
    label: "description",
    x: 60 / OG_W, y: 410 / OG_H, w: 820 / OG_W, h: 72 / OG_H,
    color: "rgba(46,204,113,0.35)",
    desc: "A one-line description (≤ 100 chars). Smaller type, muted colour — it reinforces the title without competing.",
  },
  {
    id: "url",
    label: "url / date",
    x: 60 / OG_W, y: 530 / OG_H, w: 300 / OG_W, h: 32 / OG_H,
    color: "rgba(155,89,182,0.35)",
    desc: "Bottom metadata — the canonical URL, author name, or publish date. Use the smallest readable type size (~28 px).",
  },
]

function drawZones(
  ctx: CanvasRenderingContext2D,
  dw: number,
  dh: number,
  activeId: string | null
) {
  const sx = dw / OG_W
  const sy = dh / OG_H

  // Background fill
  ctx.fillStyle = "#fafaf8"
  ctx.fillRect(0, 0, dw, dh)

  // Subtle dot grid
  ctx.fillStyle = "#dedad4"
  for (let x = 20; x < dw; x += 20) {
    for (let y = 20; y < dh; y += 20) {
      ctx.fillRect(x, y, 1.5, 1.5)
    }
  }

  // Zones
  for (const z of ZONES) {
    if (z.id === "bg") continue
    const zx = z.x * dw
    const zy = z.y * dh
    const zw = z.w * dw
    const zh = z.h * dh
    const isActive = z.id === activeId

    ctx.fillStyle = isActive
      ? z.color.replace("0.35", "0.7").replace("0.55", "0.85").replace("0.18", "0.4")
      : z.color
    ctx.fillRect(zx, zy, zw, zh)

    // Border
    ctx.strokeStyle = isActive ? "rgba(26,22,20,0.7)" : "rgba(26,22,20,0.2)"
    ctx.lineWidth = isActive ? 1.5 : 0.75
    ctx.strokeRect(zx, zy, zw, zh)

    // Label
    const labelSize = Math.max(8, Math.round(11 * Math.min(sx, sy)))
    ctx.fillStyle = isActive ? "rgba(26,22,20,0.9)" : "rgba(26,22,20,0.45)"
    ctx.font = `${labelSize}px serif`
    ctx.fillText(z.label, zx + 5 * sx, zy + labelSize + 3 * sy)
  }

  // Dimension labels
  const dimColor = "rgba(26,22,20,0.3)"
  const dimSize = Math.max(7, Math.round(9 * Math.min(sx, sy)))
  ctx.fillStyle = dimColor
  ctx.font = `${dimSize}px monospace`
  ctx.fillText("1200 px", dw * 0.02, dh - 4)
  ctx.save()
  ctx.translate(4, dh * 0.5)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText("630 px", 0, 0)
  ctx.restore()
}

export function OGSizeDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeZone, setActiveZone] = useState<Zone | null>(null)
  const [dims, setDims] = useState({ dw: 600, dh: 315 })

  const hitZone = (cx: number, cy: number, dw: number, dh: number): Zone | null => {
    // Iterate in reverse so top-most zones win
    for (let i = ZONES.length - 1; i >= 0; i--) {
      const z = ZONES[i]
      if (z.id === "bg") continue
      const zx = z.x * dw
      const zy = z.y * dh
      const zw = z.w * dw
      const zh = z.h * dh
      if (cx >= zx && cx <= zx + zw && cy >= zy && cy <= zy + zh) return z
    }
    return null
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const container = canvas.parentElement
    if (!container) return

    const resize = () => {
      const maxW = Math.min(container.clientWidth, 700)
      const dw = maxW
      const dh = Math.round(dw * (OG_H / OG_W))
      setDims({ dw, dh })
      canvas.width = dw
      canvas.height = dh
      const ctx = canvas.getContext("2d")
      if (ctx) drawZones(ctx, dw, dh, activeZone?.id ?? null)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (ctx) drawZones(ctx, dims.dw, dims.dh, activeZone?.id ?? null)
  }, [activeZone, dims])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (dims.dw / rect.width)
    const y = (e.clientY - rect.top) * (dims.dh / rect.height)
    setActiveZone(hitZone(x, y, dims.dw, dims.dh))
  }

  const handleMouseLeave = () => setActiveZone(null)

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      <div className="px-4 py-2 border-b border-rurikon-border flex items-center justify-between">
        <span className="font-serif text-xs text-rurikon-400 italic">og anatomy — 1200 × 630</span>
        {activeZone && (
          <span className="font-mono text-xs text-rurikon-500">{activeZone.label}</span>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <canvas
          ref={canvasRef}
          className="block w-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      <div className="min-h-14 px-4 py-3 border-t border-rurikon-border flex items-start gap-2">
        {activeZone ? (
          <>
            <span className="font-serif text-xs text-rurikon-500 font-medium shrink-0 italic">
              {activeZone.label}:
            </span>
            <span className="font-serif text-xs text-rurikon-400 leading-relaxed">
              {activeZone.desc}
            </span>
          </>
        ) : (
          <span className="font-serif text-xs text-rurikon-300 italic">
            hover over a zone to learn about it
          </span>
        )}
      </div>
    </div>
  )
}
