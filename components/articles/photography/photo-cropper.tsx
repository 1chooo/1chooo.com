'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

type AspectRatio = {
  label: string
  value: number | null
  category: 'standard' | 'cinematic' | 'freeform'
}

const ASPECT_RATIOS: AspectRatio[] = [
  { label: '2:3', value: 2 / 3, category: 'standard' },
  { label: '3:5', value: 3 / 5, category: 'standard' },
  { label: '3:4', value: 3 / 4, category: 'standard' },
  { label: '5:7', value: 5 / 7, category: 'standard' },
  { label: '4:5', value: 4 / 5, category: 'standard' },
  { label: '9:16', value: 9 / 16, category: 'standard' },
  { label: '1:1', value: 1, category: 'standard' },
  { label: '2.39:1', value: 2.39, category: 'cinematic' },
  { label: '1.85:1', value: 1.85, category: 'cinematic' },
  { label: 'Freeform', value: null, category: 'freeform' },
]

type Orientation = 'portrait' | 'landscape'

type CropBox = {
  x: number
  y: number
  w: number
  h: number
}

type DragState = {
  type: 'move' | 'resize'
  handle?: string
  startX: number
  startY: number
  startCrop: CropBox
}

export function PhotoCropper() {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>(ASPECT_RATIOS[0])
  const [orientation, setOrientation] = useState<Orientation>('portrait')
  const [crop, setCrop] = useState<CropBox>({ x: 0, y: 0, w: 100, h: 100 })
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const [drag, setDrag] = useState<DragState | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const displayCanvasRef = useRef<HTMLCanvasElement>(null)

  const DISPLAY_MAX = 560

  const getDisplaySize = useCallback(() => {
    if (!image) return { dw: 0, dh: 0, scale: 1 }
    const scale = Math.min(DISPLAY_MAX / image.naturalWidth, DISPLAY_MAX / image.naturalHeight, 1)
    return {
      dw: Math.round(image.naturalWidth * scale),
      dh: Math.round(image.naturalHeight * scale),
      scale,
    }
  }, [image])

  const getEffectiveRatio = useCallback(() => {
    if (!selectedRatio.value) return null
    return orientation === 'landscape' ? selectedRatio.value : 1 / selectedRatio.value
  }, [selectedRatio, orientation])

  const constrainCrop = useCallback(
    (box: CropBox, dw: number, dh: number, ratio: number | null): CropBox => {
      let { x, y, w, h } = box
      if (ratio !== null) {
        h = w / ratio
        if (h > dh) { h = dh; w = h * ratio }
      }
      w = Math.max(20, Math.min(w, dw))
      h = Math.max(20, Math.min(h, dh))
      x = Math.max(0, Math.min(x, dw - w))
      y = Math.max(0, Math.min(y, dh - h))
      return { x, y, w, h }
    },
    []
  )

  const centerCrop = useCallback(
    (dw: number, dh: number, ratio: number | null): CropBox => {
      let w = dw * 0.85
      let h = ratio !== null ? w / ratio : dh * 0.85
      if (h > dh * 0.85) { h = dh * 0.85; w = ratio !== null ? h * ratio : dw * 0.85 }
      const x = (dw - w) / 2
      const y = (dh - h) / 2
      return { x, y, w, h }
    },
    []
  )

  useEffect(() => {
    if (!image) return
    const { dw, dh } = getDisplaySize()
    const ratio = getEffectiveRatio()
    setCrop(centerCrop(dw, dh, ratio))
    setPreviewSrc(null)
  }, [selectedRatio, orientation, image, getDisplaySize, getEffectiveRatio, centerCrop])

  const drawDisplay = useCallback(() => {
    const canvas = displayCanvasRef.current
    if (!canvas || !image) return
    const { dw, dh } = getDisplaySize()
    canvas.width = dw
    canvas.height = dh
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(image, 0, 0, dw, dh)

    // Overlay
    ctx.fillStyle = 'rgba(0,0,0,0.45)'
    ctx.fillRect(0, 0, dw, dh)

    // Clear crop region
    ctx.clearRect(crop.x, crop.y, crop.w, crop.h)
    ctx.drawImage(image, 0, 0, dw, dh)
    ctx.clearRect(crop.x, crop.y, crop.w, crop.h)
    ctx.drawImage(image, 0, 0, dw, dh)

    // Re-draw overlay except crop
    ctx.fillStyle = 'rgba(0,0,0,0.45)'
    ctx.beginPath()
    ctx.rect(0, 0, dw, dh)
    ctx.rect(crop.x, crop.y, crop.w, crop.h)
    ctx.fill('evenodd')

    // Crop border
    ctx.strokeStyle = 'rgba(255,255,255,0.9)'
    ctx.lineWidth = 1.5
    ctx.strokeRect(crop.x, crop.y, crop.w, crop.h)

    // Rule-of-thirds grid
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'
    ctx.lineWidth = 0.8
    for (let i = 1; i < 3; i++) {
      ctx.beginPath()
      ctx.moveTo(crop.x + (crop.w * i) / 3, crop.y)
      ctx.lineTo(crop.x + (crop.w * i) / 3, crop.y + crop.h)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(crop.x, crop.y + (crop.h * i) / 3)
      ctx.lineTo(crop.x + crop.w, crop.y + (crop.h * i) / 3)
      ctx.stroke()
    }

    // Corner handles
    const hs = 8
    ctx.fillStyle = '#fff'
    const corners = [
      [crop.x, crop.y],
      [crop.x + crop.w - hs, crop.y],
      [crop.x, crop.y + crop.h - hs],
      [crop.x + crop.w - hs, crop.y + crop.h - hs],
    ]
    corners.forEach(([cx, cy]) => ctx.fillRect(cx, cy, hs, hs))

    // Edge handles
    ctx.fillRect(crop.x + crop.w / 2 - hs / 2, crop.y, hs, hs / 2 + 2)
    ctx.fillRect(crop.x + crop.w / 2 - hs / 2, crop.y + crop.h - hs / 2 - 2, hs, hs / 2 + 2)
    ctx.fillRect(crop.x, crop.y + crop.h / 2 - hs / 2, hs / 2 + 2, hs)
    ctx.fillRect(crop.x + crop.w - hs / 2 - 2, crop.y + crop.h / 2 - hs / 2, hs / 2 + 2, hs)
  }, [image, crop, getDisplaySize])

  useEffect(() => {
    drawDisplay()
  }, [drawDisplay])

  // Re-draw when returning from preview (canvas remounts but deps haven't changed)
  useEffect(() => {
    if (!previewSrc) {
      drawDisplay()
    }
  }, [previewSrc, drawDisplay])

  const getHandle = (x: number, y: number): string | null => {
    const T = 12
    const { x: cx, y: cy, w: cw, h: ch } = crop
    if (Math.abs(x - cx) < T && Math.abs(y - cy) < T) return 'nw'
    if (Math.abs(x - (cx + cw)) < T && Math.abs(y - cy) < T) return 'ne'
    if (Math.abs(x - cx) < T && Math.abs(y - (cy + ch)) < T) return 'sw'
    if (Math.abs(x - (cx + cw)) < T && Math.abs(y - (cy + ch)) < T) return 'se'
    if (Math.abs(x - (cx + cw / 2)) < T && Math.abs(y - cy) < T) return 'n'
    if (Math.abs(x - (cx + cw / 2)) < T && Math.abs(y - (cy + ch)) < T) return 's'
    if (Math.abs(x - cx) < T && Math.abs(y - (cy + ch / 2)) < T) return 'w'
    if (Math.abs(x - (cx + cw)) < T && Math.abs(y - (cy + ch / 2)) < T) return 'e'
    if (x > cx && x < cx + cw && y > cy && y < cy + ch) return 'move'
    return null
  }

  const cursorForHandle = (handle: string | null) => {
    if (!handle) return 'default'
    const map: Record<string, string> = {
      nw: 'nw-resize', ne: 'ne-resize', sw: 'sw-resize', se: 'se-resize',
      n: 'n-resize', s: 's-resize', w: 'w-resize', e: 'e-resize',
      move: 'move',
    }
    return map[handle] ?? 'default'
  }

  const getCanvasPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = displayCanvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const { dw, dh } = getDisplaySize()
    const scaleX = dw / rect.width
    const scaleY = dh / rect.height
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }

  const onMouseDown = (e: React.MouseEvent) => {
    if (!image) return
    const { x, y } = getCanvasPos(e)
    const handle = getHandle(x, y)
    if (!handle) return
    e.preventDefault()
    setDrag({
      type: handle === 'move' ? 'move' : 'resize',
      handle,
      startX: x,
      startY: y,
      startCrop: { ...crop },
    })
  }

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!image) return
      const canvas = displayCanvasRef.current!
      const { x, y } = getCanvasPos(e)
      if (!drag) {
        const handle = getHandle(x, y)
        canvas.style.cursor = cursorForHandle(handle)
        return
      }
      e.preventDefault()
      const dx = x - drag.startX
      const dy = y - drag.startY
      const { dw, dh } = getDisplaySize()
      const ratio = selectedRatio.value !== null ? getEffectiveRatio() : null
      let { x: cx, y: cy, w: cw, h: ch } = drag.startCrop

      if (drag.type === 'move') {
        cx = cx + dx
        cy = cy + dy
      } else {
        const h = drag.handle!
        if (h.includes('e')) cw = cw + dx
        if (h.includes('s')) ch = ch + dy
        if (h.includes('w')) { cx = cx + dx; cw = cw - dx }
        if (h.includes('n')) { cy = cy + dy; ch = ch - dy }
        if (ratio !== null) {
          if (h === 'n' || h === 's') cw = ch * ratio
          else if (h === 'e' || h === 'w') ch = cw / ratio
          else {
            const avg = (Math.abs(cw - drag.startCrop.w) + Math.abs(ch - drag.startCrop.h)) / 2
            if (h === 'nw' || h === 'se') { cw = drag.startCrop.w + (h === 'se' ? avg : -avg) * Math.sign(dx || dy); ch = cw / ratio }
            else { cw = drag.startCrop.w + (h === 'ne' ? avg : -avg) * Math.sign(dx || -dy); ch = cw / ratio }
          }
        }
      }
      setCrop(constrainCrop({ x: cx, y: cy, w: cw, h: ch }, dw, dh, ratio))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drag, image, getDisplaySize, getEffectiveRatio, constrainCrop, selectedRatio]
  )

  const onMouseUp = () => setDrag(null)

  const onTouchStart = (e: React.TouchEvent) => {
    if (!image) return
    const { x, y } = getCanvasPos(e)
    const handle = getHandle(x, y)
    if (!handle) return
    e.preventDefault()
    setDrag({
      type: handle === 'move' ? 'move' : 'resize',
      handle,
      startX: x,
      startY: y,
      startCrop: { ...crop },
    })
  }

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!image || !drag) return
      e.preventDefault()
      const { x, y } = getCanvasPos(e)
      const dx = x - drag.startX
      const dy = y - drag.startY
      const { dw, dh } = getDisplaySize()
      const ratio = selectedRatio.value !== null ? getEffectiveRatio() : null
      let { x: cx, y: cy, w: cw, h: ch } = drag.startCrop

      if (drag.type === 'move') {
        cx = cx + dx
        cy = cy + dy
      } else {
        const h = drag.handle!
        if (h.includes('e')) cw = cw + dx
        if (h.includes('s')) ch = ch + dy
        if (h.includes('w')) { cx = cx + dx; cw = cw - dx }
        if (h.includes('n')) { cy = cy + dy; ch = ch - dy }
        if (ratio !== null) {
          if (h === 'n' || h === 's') cw = ch * ratio
          else if (h === 'e' || h === 'w') ch = cw / ratio
          else {
            const avg = (Math.abs(cw - drag.startCrop.w) + Math.abs(ch - drag.startCrop.h)) / 2
            if (h === 'nw' || h === 'se') { cw = drag.startCrop.w + (h === 'se' ? avg : -avg) * Math.sign(dx || dy); ch = cw / ratio }
            else { cw = drag.startCrop.w + (h === 'ne' ? avg : -avg) * Math.sign(dx || -dy); ch = cw / ratio }
          }
        }
      }
      setCrop(constrainCrop({ x: cx, y: cy, w: cw, h: ch }, dw, dh, ratio))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drag, image, getDisplaySize, getEffectiveRatio, constrainCrop, selectedRatio]
  )

  const onTouchEnd = () => setDrag(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const src = ev.target?.result as string
      setImageSrc(src)
      const img = new Image()
      img.onload = () => {
        setImage(img)
        setPreviewSrc(null)
        const { dw, dh } = (() => {
          const scale = Math.min(DISPLAY_MAX / img.naturalWidth, DISPLAY_MAX / img.naturalHeight, 1)
          return { dw: Math.round(img.naturalWidth * scale), dh: Math.round(img.naturalHeight * scale) }
        })()
        const ratio = selectedRatio.value !== null
          ? (orientation === 'landscape' ? selectedRatio.value : 1 / selectedRatio.value)
          : null
        setCrop(centerCrop(dw, dh, ratio))
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  }

  const getCroppedCanvas = (): HTMLCanvasElement | null => {
    if (!image || !canvasRef.current) return null
    const { scale } = getDisplaySize()
    const canvas = canvasRef.current
    canvas.width = Math.round(crop.w / scale)
    canvas.height = Math.round(crop.h / scale)
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(
      image,
      crop.x / scale, crop.y / scale, crop.w / scale, crop.h / scale,
      0, 0, canvas.width, canvas.height
    )
    return canvas
  }

  const handleSave = () => {
    const c = getCroppedCanvas()
    if (!c) return
    setPreviewSrc(c.toDataURL('image/png'))
  }

  const handleDownload = () => {
    const c = getCroppedCanvas()
    if (!c) return
    const a = document.createElement('a')
    a.href = c.toDataURL('image/png')
    a.download = 'cropped.png'
    a.click()
  }

  const handleReset = () => {
    setPreviewSrc(null)
  }

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] py-8 px-4 sm:py-10 sm:px-10 font-serif">
      <canvas ref={canvasRef} className="hidden" />

      {/* Upload area */}
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
        <div className="flex flex-col gap-6">
          {/* Controls */}
          <div className="flex flex-col gap-4">
            {/* Orientation */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#666] tracking-widest uppercase w-20 shrink-0">Orient</span>
              <div className="flex gap-1">
                {(['portrait', 'landscape'] as Orientation[]).map((o) => (
                  <button
                    key={o}
                    onClick={() => setOrientation(o)}
                    className={`px-3 py-1 text-xs border tracking-wide transition-colors capitalize ${
                      orientation === o
                        ? 'border-[#333] bg-[#333] text-white'
                        : 'border-rurikon-border text-[#555] hover:border-[#333] hover:text-[#333]'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Standard ratios */}
            <div className="flex items-start gap-2">
              <span className="text-xs text-[#666] tracking-widest uppercase w-20 shrink-0 pt-1">Standard</span>
              <div className="flex flex-wrap gap-1">
                {ASPECT_RATIOS.filter((r) => r.category === 'standard').map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setSelectedRatio(r)}
                    className={`px-3 py-1 text-xs border tracking-wide transition-colors ${
                      selectedRatio.label === r.label
                        ? 'border-[#333] bg-[#333] text-white'
                        : 'border-rurikon-border text-[#555] hover:border-[#333] hover:text-[#333]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cinematic ratios */}
            <div className="flex items-start gap-2">
              <span className="text-xs text-[#666] tracking-widest uppercase w-20 shrink-0 pt-1">Cinematic</span>
              <div className="flex flex-wrap gap-1">
                {ASPECT_RATIOS.filter((r) => r.category === 'cinematic').map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setSelectedRatio(r)}
                    className={`px-3 py-1 text-xs border tracking-wide transition-colors ${
                      selectedRatio.label === r.label
                        ? 'border-[#333] bg-[#333] text-white'
                        : 'border-rurikon-border text-[#555] hover:border-[#333] hover:text-[#333]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedRatio(ASPECT_RATIOS.find((r) => r.category === 'freeform')!)}
                  className={`px-3 py-1 text-xs border tracking-wide transition-colors ${
                    selectedRatio.category === 'freeform'
                      ? 'border-[#333] bg-[#333] text-white'
                      : 'border-rurikon-border text-[#555] hover:border-[#333] hover:text-[#333]'
                  }`}
                >
                  Freeform
                </button>
              </div>
            </div>
          </div>

          {/* Canvas / Preview */}
          {!previewSrc ? (
            <div
              ref={containerRef}
              className="relative w-full flex justify-center border border-rurikon-border bg-[#f0ece4]"
            >
              <canvas
                ref={displayCanvasRef}
                className="max-w-full cursor-crosshair select-none touch-none"
                style={{ display: 'block' }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="border border-rurikon-border bg-[#f0ece4] p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewSrc} alt="Cropped preview" className="max-w-full max-h-120 block" />
              </div>
              <p className="text-xs text-[#777] tracking-wide italic">Preview — click Edit to continue cropping</p>
            </div>
          )}

          {/* Crop info */}
          {!previewSrc && (
            <p className="text-xs text-[#777] tracking-wide text-center">
              {Math.round(crop.w)} × {Math.round(crop.h)} px
              {' · '}
              {selectedRatio.label}
              {selectedRatio.category !== 'freeform' && ` · ${orientation}`}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rurikon-border pt-5">
            <button
              onClick={() => { setImageSrc(null); setImage(null); setPreviewSrc(null) }}
              className="text-xs text-[#888] tracking-wide hover:text-[#333] underline underline-offset-2 transition-colors"
            >
              Change image
            </button>
            <div className="flex gap-2">
              {previewSrc ? (
                <>
                  <button
                    onClick={handleReset}
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
                  onClick={handleSave}
                  className="px-4 py-1.5 text-xs border border-[#333] bg-[#333] text-white tracking-wide hover:bg-[#111] transition-colors"
                >
                  Preview crop
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}