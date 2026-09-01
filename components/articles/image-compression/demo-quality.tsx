"use client"

import { useState, useRef, useEffect } from "react"

const W = 200
const H = 140

function drawPattern(ctx: CanvasRenderingContext2D) {
  // Smooth sky gradient — compresses well
  const grad = ctx.createLinearGradient(0, 0, W, H)
  grad.addColorStop(0, "#93c5fd")
  grad.addColorStop(0.5, "#fde68a")
  grad.addColorStop(1, "#fca5a5")
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // Fine checkerboard — compresses very poorly (lots of high-frequency detail)
  for (let xi = 0; xi < 6; xi++) {
    for (let yi = 0; yi < 6; yi++) {
      ctx.fillStyle = (xi + yi) % 2 === 0 ? "#000" : "#fff"
      ctx.fillRect(10 + xi * 8, (H - 56) + yi * 8, 8, 8)
    }
  }

  // Solid colour patches
  const patches: [string, number][] = [
    ["#ef4444", 80],
    ["#22c55e", 110],
    ["#3b82f6", 140],
    ["#f59e0b", 170],
  ]
  patches.forEach(([c, x]) => {
    ctx.fillStyle = c
    ctx.fillRect(x, H - 55, 22, 22)
    ctx.strokeStyle = "rgba(0,0,0,0.2)"
    ctx.lineWidth = 1
    ctx.strokeRect(x, H - 55, 22, 22)
  })

  // Text-like shapes (sharp edges)
  ctx.fillStyle = "#1e293b"
  ctx.fillRect(80, 10, 2, 50)
  ctx.fillRect(80, 10, 50, 2)
  ctx.fillRect(80, 35, 35, 2)
  ctx.fillRect(80, 60, 50, 2)

  ctx.fillStyle = "#334155"
  ctx.fillRect(140, 15, 40, 8)
  ctx.fillRect(140, 28, 30, 8)
  ctx.fillRect(140, 41, 35, 8)
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  return `${(bytes / 1024).toFixed(1)} KB`
}

function savings(orig: number, comp: number) {
  if (orig === 0) return 0
  return Math.round((1 - comp / orig) * 100)
}

export function DemoQuality() {
  const [quality, setQuality] = useState(75)
  const srcRef = useRef<HTMLCanvasElement>(null)
  const [srcUrl, setSrcUrl] = useState("")
  const [srcSize, setSrcSize] = useState(0)
  const [jpegUrl, setJpegUrl] = useState("")
  const [jpegSize, setJpegSize] = useState(0)

  // Draw the test pattern once on mount
  useEffect(() => {
    const canvas = srcRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    drawPattern(ctx)
    const url = canvas.toDataURL("image/png")
    setSrcUrl(url)
    setSrcSize(Math.round((url.split(",")[1].length * 3) / 4))
  }, [])

  // Re-encode to JPEG at new quality whenever quality or source changes
  useEffect(() => {
    const canvas = srcRef.current
    if (!canvas || !srcUrl) return
    const url = canvas.toDataURL("image/jpeg", quality / 100)
    setJpegUrl(url)
    setJpegSize(Math.round((url.split(",")[1].length * 3) / 4))
  }, [quality, srcUrl])

  const saved = savings(srcSize, jpegSize)

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      {/* Hidden source canvas */}
      <canvas ref={srcRef} width={W} height={H} className="hidden" />

      <div className="p-4 sm:p-6 flex flex-col gap-5">
        {/* Side-by-side images */}
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-rurikon-300 uppercase tracking-widest">
              original (png)
            </span>
            {srcUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={srcUrl}
                width={W}
                height={H}
                alt="original"
                className="border border-rurikon-border/40"
                style={{ imageRendering: "pixelated" }}
              />
            )}
            <span className="font-mono text-[10px] text-rurikon-400">{formatSize(srcSize)}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-rurikon-300 uppercase tracking-widest">
              jpeg · q = {quality}
            </span>
            {jpegUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={jpegUrl}
                width={W}
                height={H}
                alt={`jpeg quality ${quality}`}
                className="border border-rurikon-border/40"
                style={{ imageRendering: "pixelated" }}
              />
            )}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-rurikon-400">{formatSize(jpegSize)}</span>
              {saved > 0 && (
                <span className="font-mono text-[10px] text-emerald-600">−{saved}%</span>
              )}
            </div>
          </div>
        </div>

        {/* Quality slider */}
        <div className="flex flex-col gap-2 max-w-xs">
          <div className="flex justify-between text-xs text-rurikon-400">
            <span>quality</span>
            <span className="font-mono">{quality}</span>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full h-[3px] cursor-pointer accent-rurikon-400"
          />
          <div className="flex justify-between text-[10px] text-rurikon-300">
            <span>heavy artefacts</span>
            <span>near-lossless</span>
          </div>
        </div>

        {/* Annotation */}
        <p className="text-xs text-rurikon-400 italic leading-relaxed max-w-sm">
          Drag the slider low — notice the blocky artefacts on sharp edges and the checkerboard.
          The smooth gradient survives much better. This asymmetry is the heart of JPEG.
        </p>
      </div>

      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">live jpeg quality</span>
        <span className="text-[10px] text-rurikon-300">
          {saved > 0 ? `saving ${saved}% vs png` : "adjust quality"}
        </span>
      </div>
    </div>
  )
}
