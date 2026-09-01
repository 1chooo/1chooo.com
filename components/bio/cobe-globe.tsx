"use client"

import createGlobe, { type Marker } from "cobe"
import { useCallback, useEffect, useRef } from "react"
import { LOCATION_POINTS } from "@/lib/locations"
import type { LocationId, LocationPoint } from "@/lib/locations"
import { cn } from "@/lib/utils"

type Props = {
  locations?: LocationPoint[]
  showList?: boolean
}

const LOCATION_ACCENTS = [
  "border-l-[#5a9fd4] bg-[#dce8f5]/30",
  "border-l-[#7aab4e] bg-[#dce8dc]/30",
  "border-l-[#d4a96a] bg-[#f5e8dc]/30",
] as const

const GLOBE_LABELS: Record<LocationId, string> = {
  taipei: "Taipei",
  sf: "SF",
  la: "LA",
}

const AUTO_ROTATE_SPEED = 0.004
const DRAG_SENSITIVITY = 0.005
const FOCUS_EASING = 0.08
const THETA_MIN = -Math.PI / 3
const THETA_MAX = Math.PI / 3

function locationToAngles(lat: number, lng: number): [number, number] {
  return [Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
}

function shortestPhiDelta(from: number, to: number) {
  let delta = to - from
  while (delta > Math.PI) delta -= 2 * Math.PI
  while (delta < -Math.PI) delta += 2 * Math.PI
  return delta
}

export function CobeGlobe({ locations = LOCATION_POINTS, showList = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const focusLocationRef = useRef<(id: LocationId) => void>(() => {})

  const handlePlaceClick = useCallback((id: LocationId) => {
    focusLocationRef.current(id)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    let width = 0
    let phi = 0
    let theta = 0.25
    let targetPhi: number | null = null
    let targetTheta: number | null = null
    let autoRotate = true
    let pointerDown = false
    let lastPointerX = 0
    let lastPointerY = 0

    const onResize = () => {
      width = wrapper.offsetWidth
    }

    onResize()
    window.addEventListener("resize", onResize)

    const markers: Marker[] = locations.map((point) => ({
      id: point.id,
      location: point.location,
      size: point.current ? 0.06 : 0.04,
      color: point.current ? [0.12, 0.12, 0.12] : undefined,
    }))

    const arcs =
      locations.length >= 3
        ? [
            { from: locations[0].location, to: locations[1].location },
            { from: locations[1].location, to: locations[2].location },
          ]
        : []

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.97, 0.96, 0.93],
      markerColor: [0.45, 0.45, 0.45],
      glowColor: [0.97, 0.96, 0.93],
      markers,
      arcs,
      arcColor: [0.12, 0.12, 0.12],
      arcWidth: 0.35,
      arcHeight: 0.25,
    })

    const focusOn = (id: LocationId) => {
      const point = locations.find((location) => location.id === id)
      if (!point) return

      const [nextPhi, nextTheta] = locationToAngles(point.location[0], point.location[1])
      targetPhi = nextPhi
      targetTheta = nextTheta
      autoRotate = false
    }

    focusLocationRef.current = focusOn

    const onPointerDown = (event: PointerEvent) => {
      pointerDown = true
      targetPhi = null
      targetTheta = null
      autoRotate = false
      lastPointerX = event.clientX
      lastPointerY = event.clientY
      canvas.setPointerCapture(event.pointerId)
      canvas.style.cursor = "grabbing"
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!pointerDown) return

      const deltaX = event.clientX - lastPointerX
      const deltaY = event.clientY - lastPointerY
      phi += deltaX * DRAG_SENSITIVITY
      theta = Math.max(THETA_MIN, Math.min(THETA_MAX, theta + deltaY * DRAG_SENSITIVITY))
      lastPointerX = event.clientX
      lastPointerY = event.clientY
    }

    const onPointerUp = (event: PointerEvent) => {
      if (!pointerDown) return

      pointerDown = false
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }
      canvas.style.cursor = "grab"
      autoRotate = true
    }

    canvas.style.cursor = "grab"
    canvas.style.touchAction = "none"
    canvas.addEventListener("pointerdown", onPointerDown)
    canvas.addEventListener("pointermove", onPointerMove)
    canvas.addEventListener("pointerup", onPointerUp)
    canvas.addEventListener("pointercancel", onPointerUp)

    let frame = 0
    const animate = () => {
      if (targetPhi !== null && targetTheta !== null) {
        const deltaPhi = shortestPhiDelta(phi, targetPhi)
        const deltaTheta = targetTheta - theta
        phi += deltaPhi * FOCUS_EASING
        theta += deltaTheta * FOCUS_EASING

        if (Math.abs(deltaPhi) < 0.001 && Math.abs(deltaTheta) < 0.001) {
          phi = targetPhi
          theta = targetTheta
          targetPhi = null
          targetTheta = null
          autoRotate = true
        }
      } else if (autoRotate && !pointerDown) {
        phi += AUTO_ROTATE_SPEED
      }

      globe.update({ phi, theta, width: width * 2, height: width * 2 })
      frame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      globe.destroy()
      window.removeEventListener("resize", onResize)
      canvas.removeEventListener("pointerdown", onPointerDown)
      canvas.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("pointerup", onPointerUp)
      canvas.removeEventListener("pointercancel", onPointerUp)
    }
  }, [locations])

  return (
    <div className={cn("my-8", showList ? "article-demo-shell" : "w-full")}>
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className={cn("flex flex-col", showList && "text:flex-row")}>
          {/* Globe + footer */}
          <div
            className={cn(
              "flex flex-col",
              showList && "flex-1 min-w-0 text:border-r border-rurikon-border"
            )}
          >
            <div
              className="flex-1 flex items-center justify-center p-4 sm:p-6"
              style={{ minHeight: 200 }}
            >
              <div ref={wrapperRef} className="relative aspect-square w-full max-w-xs">
                <canvas
                  ref={canvasRef}
                  className="h-full w-full"
                  style={{ contain: "layout paint size" }}
                  aria-label="Interactive globe showing places I've lived"
                />
                {locations.map((point) => (
                  <button
                    key={point.id}
                    type="button"
                    onClick={() => handlePlaceClick(point.id)}
                    className="absolute cursor-pointer rounded bg-rurikon-800 px-2 py-0.5 font-mono text-[11px] font-medium whitespace-nowrap text-white transition-[opacity,background-color] hover:bg-rurikon-700"
                    style={
                      {
                        positionAnchor: `--cobe-${point.id}`,
                        bottom: "anchor(top)",
                        left: "anchor(center)",
                        translate: "-50% -8px",
                        opacity: `var(--cobe-visible-${point.id}, 0)`,
                      } as React.CSSProperties
                    }
                  >
                    {GLOBE_LABELS[point.id]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 mr-auto shrink-0 italic">
                places
              </span>
              <span className="font-mono text-[11px] text-rurikon-500 whitespace-nowrap">
                {locations.map((point, index) => (
                  <span key={point.id}>
                    {index > 0 ? " · " : null}
                    <button
                      type="button"
                      onClick={() => handlePlaceClick(point.id)}
                      className="cursor-pointer transition-colors hover:text-rurikon-800"
                    >
                      {GLOBE_LABELS[point.id]}
                    </button>
                  </span>
                ))}
              </span>
            </div>
          </div>

          {/* Right — location cards */}
          {showList ? (
            <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
              <div className="p-3 flex flex-col gap-3">
                {locations.map((point, index) => (
                  <div
                    key={point.id}
                    className={cn(
                      "border border-rurikon-border/40 border-l-2 px-3 py-3 flex flex-col gap-1",
                      LOCATION_ACCENTS[index % LOCATION_ACCENTS.length],
                      point.current && "ring-1 ring-rurikon-600/30"
                    )}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono text-xs text-rurikon-700 font-medium">
                        {point.label}
                      </span>
                      {point.current ? (
                        <span className="text-xs text-rurikon-400 italic">now</span>
                      ) : null}
                    </div>
                    <span className="text-xs text-rurikon-500">{point.notes}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
