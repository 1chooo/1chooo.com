'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

// ─── Pixel helpers ────────────────────────────────────────────────────────────

function clamp(v: number) {
  return Math.max(0, Math.min(255, Math.round(v)))
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  switch (max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break
    case g: h = (b - r) / d + 2; break
    case b: h = (r - g) / d + 4; break
  }
  return [h / 6, s, l]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) { const v = clamp(l * 255); return [v, v, v] }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return [
    clamp(hue2rgb(p, q, h + 1 / 3) * 255),
    clamp(hue2rgb(p, q, h) * 255),
    clamp(hue2rgb(p, q, h - 1 / 3) * 255),
  ]
}

// ─── Filter definitions ───────────────────────────────────────────────────────

type FilterDef = {
  id: string
  label: string
  apply: (d: Uint8ClampedArray) => void
}

const FILTERS: FilterDef[] = [
  {
    id: 'original',
    label: 'Original',
    apply: () => {},
  },
  {
    id: 'soft-light',
    label: 'Soft Light',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        let r = clamp(d[i] * 1.08 + 10)
        let g = clamp(d[i + 1] * 1.03 + 5)
        let b = clamp(d[i + 2] * 0.92)
        r = clamp((r - 128) * 0.88 + 132)
        g = clamp((g - 128) * 0.88 + 130)
        b = clamp((b - 128) * 0.88 + 126)
        d[i] = r; d[i + 1] = g; d[i + 2] = b
      }
    },
  },
  {
    id: 'warm',
    label: 'Warm',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        d[i]     = clamp(d[i]     * 1.14)
        d[i + 1] = clamp(d[i + 1] * 1.04 + 5)
        d[i + 2] = clamp(d[i + 2] * 0.78)
      }
    },
  },
  {
    id: 'cool',
    label: 'Cool',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        d[i]     = clamp(d[i]     * 0.85)
        d[i + 1] = clamp(d[i + 1] * 0.96)
        d[i + 2] = clamp(d[i + 2] * 1.22)
      }
    },
  },
  {
    id: 'fade',
    label: 'Fade',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        d[i]     = clamp((d[i]     - 128) * 0.72 + 150)
        d[i + 1] = clamp((d[i + 1] - 128) * 0.72 + 148)
        d[i + 2] = clamp((d[i + 2] - 128) * 0.72 + 152)
      }
    },
  },
  {
    id: 'noir',
    label: 'Noir',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]
        const v = clamp((gray - 128) * 1.45 + 128)
        d[i] = v; d[i + 1] = v; d[i + 2] = v
      }
    },
  },
  {
    id: 'vivid',
    label: 'Vivid',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        let [h, s, l] = rgbToHsl(d[i], d[i + 1], d[i + 2])
        s = Math.min(1, s * 1.7)
        l = Math.max(0, Math.min(1, (l - 0.5) * 1.1 + 0.5))
        const [r, g, b] = hslToRgb(h, s, l)
        d[i] = r; d[i + 1] = g; d[i + 2] = b
      }
    },
  },
  {
    id: 'golden',
    label: 'Golden',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        let r = clamp(d[i]     * 1.18 + 18)
        let g = clamp(d[i + 1] * 1.06 + 8)
        let b = clamp(d[i + 2] * 0.68 - 8)
        r = clamp((r - 128) * 1.08 + 128)
        g = clamp((g - 128) * 1.04 + 128)
        b = clamp((b - 128) * 0.96 + 128)
        d[i] = r; d[i + 1] = g; d[i + 2] = b
      }
    },
  },
  {
    id: 'matte',
    label: 'Matte',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        d[i]     = clamp((d[i]     - 128) * 0.68 + 150)
        d[i + 1] = clamp((d[i + 1] - 128) * 0.70 + 144)
        d[i + 2] = clamp((d[i + 2] - 128) * 0.65 + 156)
      }
    },
  },
  {
    id: 'velvet',
    label: 'Velvet',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        const r = clamp(d[i]     * 1.1)
        const g = clamp(d[i + 1] * 0.88)
        const b = clamp(d[i + 2] * 0.82)
        d[i]     = clamp((r - 128) * 1.28 + 118)
        d[i + 1] = clamp((g - 128) * 1.18 + 116)
        d[i + 2] = clamp((b - 128) * 1.1  + 114)
      }
    },
  },
  {
    id: 'mist',
    label: 'Mist',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        d[i]     = clamp((d[i]     - 128) * 0.8 + 136)
        d[i + 1] = clamp((d[i + 1] - 128) * 0.82 + 142)
        d[i + 2] = clamp((d[i + 2] - 128) * 0.88 + 162)
      }
    },
  },
]

// ─── Apply filter to canvas ───────────────────────────────────────────────────

function applyFilterToCanvas(
  src: HTMLImageElement,
  canvas: HTMLCanvasElement,
  filter: FilterDef,
  w: number,
  h: number,
) {
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(src, 0, 0, w, h)
  if (filter.id === 'original') return
  const imageData = ctx.getImageData(0, 0, w, h)
  filter.apply(imageData.data)
  ctx.putImageData(imageData, 0, 0)
}

// ─── Component ───────────────────────────────────────────────────────────────

const DISPLAY_MAX = 600
const THUMB_SIZE = 56

export function PhotoFilter() {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<FilterDef>(FILTERS[0])
  const [splitX, setSplitX] = useState(0.5)
  const [isDraggingSplit, setIsDraggingSplit] = useState(false)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const [thumbs, setThumbs] = useState<Record<string, string>>({})

  const displayCanvasRef = useRef<HTMLCanvasElement>(null)
  const offscreenRef = useRef<HTMLCanvasElement>(null)
  const thumbCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const getDisplaySize = useCallback(() => {
    if (!image) return { dw: 0, dh: 0, scale: 1 }
    const scale = Math.min(DISPLAY_MAX / image.naturalWidth, DISPLAY_MAX / image.naturalHeight, 1)
    return {
      dw: Math.round(image.naturalWidth * scale),
      dh: Math.round(image.naturalHeight * scale),
      scale,
    }
  }, [image])

  // Build thumbnails when image loads
  useEffect(() => {
    if (!image || !thumbCanvasRef.current) return
    const canvas = thumbCanvasRef.current
    const result: Record<string, string> = {}
    for (const f of FILTERS) {
      applyFilterToCanvas(image, canvas, f, THUMB_SIZE, THUMB_SIZE)
      result[f.id] = canvas.toDataURL('image/jpeg', 0.85)
    }
    setThumbs(result)
  }, [image])

  const drawSplit = useCallback(() => {
    const canvas = displayCanvasRef.current
    const off = offscreenRef.current
    if (!canvas || !off || !image) return

    const { dw, dh } = getDisplaySize()
    canvas.width = dw
    canvas.height = dh
    const ctx = canvas.getContext('2d')!

    // Draw original on offscreen
    applyFilterToCanvas(image, off, FILTERS[0], dw, dh)
    ctx.drawImage(off, 0, 0)

    // Draw filtered on offscreen
    applyFilterToCanvas(image, off, selectedFilter, dw, dh)

    // Clip right half and overlay
    const splitPx = Math.round(dw * splitX)
    ctx.save()
    ctx.beginPath()
    ctx.rect(splitPx, 0, dw - splitPx, dh)
    ctx.clip()
    ctx.drawImage(off, 0, 0)
    ctx.restore()

    // Divider
    ctx.strokeStyle = 'rgba(255,255,255,0.9)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(splitPx, 0)
    ctx.lineTo(splitPx, dh)
    ctx.stroke()

    // Handle circle
    const cy = dh / 2
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(splitPx, cy, 14, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(0,0,0,0.15)'
    ctx.lineWidth = 1
    ctx.stroke()

    // Arrows inside the handle
    ctx.fillStyle = '#555'
    ctx.font = '11px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('◀▶', splitPx, cy)

    // Labels
    ctx.font = '10px Georgia, serif'
    ctx.fillStyle = 'rgba(255,255,255,0.85)'
    ctx.textAlign = 'left'
    ctx.fillText('Original', 8, 14)
    ctx.textAlign = 'right'
    ctx.fillText(selectedFilter.id === 'original' ? '' : selectedFilter.label, dw - 8, 14)
  }, [image, selectedFilter, splitX, getDisplaySize])

  useEffect(() => {
    drawSplit()
  }, [drawSplit])

  useEffect(() => {
    if (!previewSrc) drawSplit()
  }, [previewSrc, drawSplit])

  // Split drag
  const getSplitPos = (clientX: number) => {
    const canvas = displayCanvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return Math.max(0.05, Math.min(0.95, (clientX - rect.left) / rect.width))
  }

  const onCanvasMouseDown = (e: React.MouseEvent) => {
    const { dw } = getDisplaySize()
    const canvas = displayCanvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const scaleX = dw / rect.width
    const x = (e.clientX - rect.left) * scaleX
    const splitPx = dw * splitX
    if (Math.abs(x - splitPx) < 20) {
      setIsDraggingSplit(true)
    }
  }

  const onCanvasTouchStart = (e: React.TouchEvent) => {
    const { dw } = getDisplaySize()
    const canvas = displayCanvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const scaleX = dw / rect.width
    const touch = e.touches[0]
    const x = (touch.clientX - rect.left) * scaleX
    const splitPx = dw * splitX
    if (Math.abs(x - splitPx) < 30) {
      e.preventDefault()
      setIsDraggingSplit(true)
    }
  }

  useEffect(() => {
    if (!isDraggingSplit) return
    const onMove = (e: MouseEvent) => setSplitX(getSplitPos(e.clientX))
    const onUp = () => setIsDraggingSplit(false)
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); setSplitX(getSplitPos(e.touches[0].clientX)) }
    const onTouchEnd = () => setIsDraggingSplit(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDraggingSplit])

  const onCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDraggingSplit || !displayCanvasRef.current) return
    const { dw } = getDisplaySize()
    const canvas = displayCanvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = dw / rect.width
    const x = (e.clientX - rect.left) * scaleX
    const splitPx = dw * splitX
    canvas.style.cursor = Math.abs(x - splitPx) < 20 ? 'col-resize' : 'default'
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const src = ev.target?.result as string
      setImageSrc(src)
      const img = new Image()
      img.onload = () => {
        setImage(img)
        setSelectedFilter(FILTERS[0])
        setSplitX(0.5)
        setPreviewSrc(null)
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  }

  const handlePreview = () => {
    if (!image || !offscreenRef.current) return
    const { dw, dh } = getDisplaySize()
    const off = offscreenRef.current
    applyFilterToCanvas(image, off, selectedFilter, dw, dh)
    setPreviewSrc(off.toDataURL('image/png'))
  }

  const handleDownload = () => {
    if (!image || !offscreenRef.current) return
    const off = offscreenRef.current
    applyFilterToCanvas(image, off, selectedFilter, image.naturalWidth, image.naturalHeight)
    const a = document.createElement('a')
    a.href = off.toDataURL('image/png')
    a.download = `filtered-${selectedFilter.id}.png`
    a.click()
  }

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] py-8 px-4 sm:py-10 sm:px-10 font-serif">
      {/* Hidden utility canvases */}
      <canvas ref={offscreenRef} className="hidden" />
      <canvas ref={thumbCanvasRef} className="hidden" />

      {/* Upload */}
      {!imageSrc && (
        <label
          className="flex flex-col items-center justify-center gap-3 border border-dashed border-rurikon-border bg-[#fafaf8] cursor-pointer py-14 px-6 transition-colors hover:bg-[#f5f3ee]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rurikon-border">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="text-sm text-[#555] tracking-wide">Drop an image here or click to upload</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
          />
        </label>
      )}

      {imageSrc && (
        <div className="flex flex-col gap-5">

          {/* Split canvas / Preview */}
          {!previewSrc ? (
            <div
              ref={containerRef}
              className="relative w-full flex justify-center border border-rurikon-border bg-[#f0ece4]"
            >
              <canvas
                ref={displayCanvasRef}
                className="max-w-full select-none touch-none"
                style={{ display: 'block', cursor: 'default' }}
                onMouseDown={onCanvasMouseDown}
                onMouseMove={onCanvasMouseMove}
                onTouchStart={onCanvasTouchStart}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="border border-rurikon-border bg-[#f0ece4] p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewSrc} alt="Filtered preview" className="max-w-full max-h-135 block" />
              </div>
              <p className="text-xs text-[#777] tracking-wide italic">
                {selectedFilter.label} — click Edit to adjust
              </p>
            </div>
          )}

          {/* Filter strip */}
          {!previewSrc && (
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f)}
                  className={`flex flex-col items-center gap-1 shrink-0 transition-opacity ${
                    selectedFilter.id === f.id ? 'opacity-100' : 'opacity-60 hover:opacity-90'
                  }`}
                >
                  <div
                    className={`w-14 h-14 overflow-hidden border-2 transition-colors ${
                      selectedFilter.id === f.id ? 'border-[#333]' : 'border-transparent'
                    }`}
                  >
                    {thumbs[f.id] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumbs[f.id]}
                        alt={f.label}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#e8e4dc]" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] tracking-wide ${
                      selectedFilter.id === f.id ? 'text-[#333]' : 'text-[#888]'
                    }`}
                  >
                    {f.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Info */}
          {!previewSrc && (
            <p className="text-xs text-[#999] tracking-wide text-center">
              Drag the divider to compare · {selectedFilter.label} applied to right half
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rurikon-border pt-5">
            <button
              onClick={() => { setImageSrc(null); setImage(null); setPreviewSrc(null); setThumbs({}) }}
              className="text-xs text-[#888] tracking-wide hover:text-[#333] underline underline-offset-2 transition-colors"
            >
              Change image
            </button>
            <div className="flex gap-2">
              {previewSrc ? (
                <>
                  <button
                    onClick={() => setPreviewSrc(null)}
                    className="px-4 py-1.5 text-xs border border-rurikon-border text-[#555] tracking-wide hover:border-[#333] hover:text-[#333] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-1.5 text-xs border border-[#333] bg-[#333] text-white tracking-wide hover:bg-[#111] transition-colors flex items-center gap-1.5"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download
                  </button>
                </>
              ) : (
                <button
                  onClick={handlePreview}
                  className="px-4 py-1.5 text-xs border border-[#333] bg-[#333] text-white tracking-wide hover:bg-[#111] transition-colors"
                >
                  Preview
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
