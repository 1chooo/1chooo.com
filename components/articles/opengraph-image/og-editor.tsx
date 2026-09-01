"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

const OG_W = 1200
const OG_H = 630

type Preset = {
  id: string
  label: string
  bg: string
  titleColor: string
  descColor: string
  metaColor: string
  avatarBg: string
  avatarFg: string
}

const PRESETS: Preset[] = [
  {
    id: "light",
    label: "Light",
    bg: "#fafaf8",
    titleColor: "#1a1614",
    descColor: "#6b6260",
    metaColor: "#9a9890",
    avatarBg: "#ede8df",
    avatarFg: "#3a3028",
  },
  {
    id: "dark",
    label: "Dark",
    bg: "#0f0f13",
    titleColor: "#f5f0e8",
    descColor: "#9a9080",
    metaColor: "#5a5550",
    avatarBg: "#2a333f",
    avatarFg: "#8ab4d8",
  },
  {
    id: "ocean",
    label: "Ocean",
    bg: "#0d1b2a",
    titleColor: "#e8f4ff",
    descColor: "#7ab0d8",
    metaColor: "#4a7090",
    avatarBg: "#1a3050",
    avatarFg: "#9dc8f0",
  },
  {
    id: "forest",
    label: "Forest",
    bg: "#0e1a10",
    titleColor: "#e8f5e9",
    descColor: "#80a882",
    metaColor: "#456747",
    avatarBg: "#1a3020",
    avatarFg: "#90d895",
  },
  {
    id: "warm",
    label: "Warm",
    bg: "#1c1209",
    titleColor: "#f5e8d0",
    descColor: "#a08060",
    metaColor: "#705040",
    avatarBg: "#2a1c0f",
    avatarFg: "#e8a870",
  },
]

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number
): { lines: string[]; totalHeight: number } {
  const words = text.split(" ")
  const lines: string[] = []
  let current = ""

  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
      if (lines.length >= maxLines) break
    } else {
      current = test
    }
  }
  if (current && lines.length < maxLines) lines.push(current)
  return { lines, totalHeight: lines.length * lineHeight }
}

function drawOG(
  canvas: HTMLCanvasElement,
  opts: {
    title: string
    description: string
    siteName: string
    avatarLetter: string
    preset: Preset
    scale?: number
  }
) {
  const { title, description, siteName, avatarLetter, preset, scale = 1 } = opts
  const W = OG_W * scale
  const H = OG_H * scale
  canvas.width = W
  canvas.height = H

  const ctx = canvas.getContext("2d")!

  // Background
  ctx.fillStyle = preset.bg
  ctx.fillRect(0, 0, W, H)

  // Subtle noise-grid texture
  ctx.fillStyle = shadeHex(preset.bg, 12)
  for (let x = 0; x < W; x += 40 * scale) {
    for (let y = 0; y < H; y += 40 * scale) {
      ctx.fillRect(x, y, 1.5 * scale, 1.5 * scale)
    }
  }

  // Accent line left edge
  ctx.fillStyle = preset.avatarFg
  ctx.globalAlpha = 0.5
  ctx.fillRect(0, 0, 4 * scale, H)
  ctx.globalAlpha = 1

  // ── Avatar circle ──────────────────────────────────────────────
  const avatarX = 60 * scale
  const avatarY = 60 * scale
  const avatarR = 40 * scale

  ctx.fillStyle = preset.avatarBg
  ctx.beginPath()
  ctx.arc(avatarX + avatarR, avatarY + avatarR, avatarR, 0, Math.PI * 2)
  ctx.fill()

  const letter = (avatarLetter || "A").slice(0, 1).toUpperCase()
  ctx.fillStyle = preset.avatarFg
  ctx.font = `bold ${Math.round(36 * scale)}px serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(letter, avatarX + avatarR, avatarY + avatarR)
  ctx.textAlign = "left"
  ctx.textBaseline = "alphabetic"

  // ── Site name ──────────────────────────────────────────────────
  ctx.fillStyle = preset.metaColor
  ctx.font = `${Math.round(28 * scale)}px serif`
  ctx.fillText(siteName || "my.site", avatarX + avatarR * 2 + 20 * scale, avatarY + avatarR + 10 * scale)

  // ── Title ──────────────────────────────────────────────────────
  const titleFontSize = scale * 68
  ctx.font = `bold ${Math.round(titleFontSize)}px serif`
  ctx.fillStyle = preset.titleColor
  const { lines: titleLines } = wrapText(
    ctx,
    title || "Your post title here",
    60 * scale,
    OG_W * scale - 120 * scale,
    titleFontSize * 1.25,
    2
  )
  let ty = 265 * scale
  for (const line of titleLines) {
    ctx.fillText(line, 60 * scale, ty)
    ty += titleFontSize * 1.25
  }

  // ── Description ───────────────────────────────────────────────
  const descFontSize = scale * 30
  ctx.font = `${Math.round(descFontSize)}px serif`
  ctx.fillStyle = preset.descColor
  const { lines: descLines } = wrapText(
    ctx,
    description || "A short description of your post.",
    60 * scale,
    OG_W * scale - 120 * scale,
    descFontSize * 1.5,
    2
  )
  let dy = 430 * scale
  for (const line of descLines) {
    ctx.fillText(line, 60 * scale, dy)
    dy += descFontSize * 1.5
  }

  // ── Bottom rule + URL ──────────────────────────────────────────
  ctx.strokeStyle = preset.metaColor
  ctx.globalAlpha = 0.3
  ctx.lineWidth = scale
  ctx.beginPath()
  ctx.moveTo(60 * scale, 555 * scale)
  ctx.lineTo((OG_W - 60) * scale, 555 * scale)
  ctx.stroke()
  ctx.globalAlpha = 1

  ctx.fillStyle = preset.metaColor
  ctx.font = `${Math.round(24 * scale)}px monospace`
  ctx.fillText((siteName || "my.site").toLowerCase(), 60 * scale, 590 * scale)
}

/** Lighten/darken a hex colour by `amount` (positive = lighter) */
function shadeHex(hex: string, amount: number): string {
  const n = parseInt(hex.replace("#", ""), 16)
  const r = Math.min(255, Math.max(0, (n >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (n & 0xff) + amount))
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`
}

export function OGEditor() {
  const displayRef = useRef<HTMLCanvasElement>(null)
  const exportRef = useRef<HTMLCanvasElement>(null)

  const [title, setTitle] = useState("OpenGraph Image")
  const [description, setDescription] = useState("A guide to crafting social preview cards with Next.js and canvas.")
  const [siteName, setSiteName] = useState("1chooo.com")
  const [avatarLetter, setAvatarLetter] = useState("1")
  const [preset, setPreset] = useState<Preset>(PRESETS[0])

  const render = useCallback(() => {
    const canvas = displayRef.current
    if (!canvas) return
    const container = canvas.parentElement
    if (!container) return
    const maxW = Math.min(container.clientWidth, 700)
    const scale = maxW / OG_W
    drawOG(canvas, { title, description, siteName, avatarLetter, preset, scale })
  }, [title, description, siteName, avatarLetter, preset])

  // Re-render on resize
  useEffect(() => {
    const canvas = displayRef.current
    if (!canvas) return
    const container = canvas.parentElement
    if (!container) return
    const ro = new ResizeObserver(render)
    ro.observe(container)
    render()
    return () => ro.disconnect()
  }, [render])

  const handleDownload = () => {
    const canvas = exportRef.current
    if (!canvas) return
    drawOG(canvas, { title, description, siteName, avatarLetter, preset, scale: 1 })
    const a = document.createElement("a")
    a.href = canvas.toDataURL("image/png")
    a.download = "opengraph.png"
    a.click()
  }

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 italic">og image builder</span>
        <span className="font-mono text-xs text-rurikon-400">1200 × 630</span>
      </div>

      {/* Live preview canvas */}
      <div className="p-4 sm:p-6 border-b border-rurikon-border">
        <canvas
          ref={displayRef}
          className="block w-full"
          style={{ aspectRatio: `${OG_W} / ${OG_H}` }}
        />
      </div>

      {/* Controls */}
      <div className="p-4 sm:p-6 flex flex-col gap-4 border-b border-rurikon-border">
        {/* Preset swatches */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-rurikon-400 tracking-widest uppercase">Theme</label>
          <div className="flex gap-1.5 flex-wrap">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPreset(p)}
                className={cn(
                  "px-3 py-1 text-xs border tracking-wide transition-colors",
                  preset.id === p.id
                    ? "bg-rurikon-800 text-white border-rurikon-600"
                    : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Avatar + site name row */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-1 w-20 shrink-0">
            <label className="text-xs text-rurikon-400 tracking-widest uppercase">Avatar</label>
            <input
              value={avatarLetter}
              onChange={(e) => setAvatarLetter(e.target.value.slice(0, 1))}
              maxLength={1}
              className="border border-rurikon-border text-xs px-2 py-1.5 font-mono bg-transparent text-rurikon-600 w-full text-center focus:outline-none focus:border-rurikon-400"
              placeholder="A"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-rurikon-400 tracking-widest uppercase">Site Name</label>
            <input
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="border border-rurikon-border text-xs px-2 py-1.5 font-mono bg-transparent text-rurikon-600 w-full focus:outline-none focus:border-rurikon-400"
              placeholder="my.site"
            />
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-rurikon-400 tracking-widest uppercase">
            Title
            <span className="ml-2 normal-case text-rurikon-300">{title.length} / 60</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-rurikon-border text-xs px-2 py-1.5 font-mono bg-transparent text-rurikon-600 w-full focus:outline-none focus:border-rurikon-400"
            placeholder="Your post title here"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-rurikon-400 tracking-widest uppercase">
            Description
            <span className="ml-2 normal-case text-rurikon-300">{description.length} / 100</span>
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-rurikon-border text-xs px-2 py-1.5 font-mono bg-transparent text-rurikon-600 w-full focus:outline-none focus:border-rurikon-400"
            placeholder="A short description of your post."
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1 px-3 py-2">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
          og image builder · downloads as 1200 × 630 png
        </span>
        <button
          onClick={handleDownload}
          className="text-xs rounded px-2.5 py-1.5 border transition-colors bg-rurikon-800 text-white border-rurikon-600"
        >
          Download PNG
        </button>
      </div>

      {/* Hidden full-res export canvas */}
      <canvas ref={exportRef} className="hidden" />
    </div>
  )
}
