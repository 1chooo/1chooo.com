"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

type Step =
  | "idle"
  | "request"
  | "processing"
  | "response"
  | "done"

const STEPS: Step[] = ["idle", "request", "processing", "response", "done"]

interface StepDesc {
  label: string
  arrow?: string
  dir?: "right" | "left"
  statusClient: string
  statusServer: string
  detail: string
}

const STEP_DESCRIPTIONS: Record<Step, StepDesc> = {
  idle: {
    label: "Client ready",
    statusClient: "idle",
    statusServer: "listening",
    detail:
      "The client has a valid connection (TCP + TLS already established). The server is listening on port 443, ready to accept HTTP/1.1 or HTTP/2 requests.",
  },
  request: {
    label: "Client → HTTP Request",
    arrow: "GET /users/42  HTTP/1.1",
    dir: "right",
    statusClient: "waiting",
    statusServer: "listening",
    detail:
      "The client sends an HTTP request: method, target path, version on the first line; headers (Host, Accept, Authorization, …) on subsequent lines; an optional body for POST/PUT/PATCH.",
  },
  processing: {
    label: "Server processes",
    statusClient: "waiting",
    statusServer: "processing",
    detail:
      "The server parses the request, authenticates the caller (e.g. validates the JWT), authorises access, queries the database or calls downstream services, then serialises the result.",
  },
  response: {
    label: "Server → HTTP Response",
    arrow: "200 OK  application/json",
    dir: "left",
    statusClient: "receiving",
    statusServer: "done",
    detail:
      "The server sends a status line (HTTP/1.1 200 OK), response headers (Content-Type, Cache-Control, …), a blank line, and the body (JSON). The client reads and parses the body.",
  },
  done: {
    label: "Exchange complete",
    statusClient: "done",
    statusServer: "listening",
    detail:
      "The client has the resource representation. With Keep-Alive the TCP connection stays open for the next request. Without it, or on HTTP/1.0, the connection is closed after the response.",
  },
}

export function DemoRequestCycle() {
  const [step, setStep] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [arrowProgress, setArrowProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  const currentStep = STEPS[step]
  const desc = STEP_DESCRIPTIONS[currentStep]
  const canNext = step < STEPS.length - 1
  const canPrev = step > 0

  function triggerArrow(cb: () => void) {
    setAnimating(true)
    setArrowProgress(0)
    let start: number | null = null
    const duration = 500
    function tick(ts: number) {
      if (!start) start = ts
      const pct = Math.min((ts - start) / duration, 1)
      setArrowProgress(pct)
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setAnimating(false)
        cb()
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  function next() {
    if (!canNext || animating) return
    const nextStep = STEPS[step + 1]
    const nd = STEP_DESCRIPTIONS[nextStep]
    if (nd.arrow) {
      triggerArrow(() => setStep((s) => s + 1))
    } else {
      setStep((s) => s + 1)
    }
  }

  function prev() {
    if (!canPrev || animating) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setStep((s) => s - 1)
    setArrowProgress(0)
    setAnimating(false)
  }

  function reset() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setStep(0)
    setArrowProgress(0)
    setAnimating(false)
  }

  const nextDesc = canNext ? STEP_DESCRIPTIONS[STEPS[step + 1]] : null
  const showArrow = animating && nextDesc?.arrow
  const showArrowStatic = !animating && step > 0 && desc.arrow
  const arrowDir = (animating ? nextDesc?.dir : desc.dir) ?? "right"
  const arrowLabel = animating ? nextDesc?.arrow : desc.arrow

  const clientColor = (s: string) => {
    if (s === "waiting" || s === "receiving") return "text-[#8b6914] bg-[#f5e8dc] border-[#d4a96a]"
    if (s === "done") return "text-[#3a6b1a] bg-[#dce8dc] border-[#7aab4e]"
    return "text-rurikon-400 bg-rurikon-50 border-rurikon-border"
  }
  const serverColor = (s: string) => {
    if (s === "processing") return "text-[#5a1a8b] bg-[#ecdcf5] border-[#9b72d4]"
    if (s === "done") return "text-[#3a6b1a] bg-[#dce8dc] border-[#7aab4e]"
    return "text-rurikon-400 bg-rurikon-50 border-rurikon-border"
  }

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left: visualisation */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6" style={{ minHeight: 220 }}>

              {/* Actors */}
              <div className="w-full flex items-start justify-between gap-4 max-w-sm mx-auto">
                {/* Client */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-16 h-10 border-2 border-[#5a9fd4] bg-[#dce8f5] flex items-center justify-center rounded-sm">
                    <span className="text-[11px] font-mono text-[#1a5a8b] font-medium">Client</span>
                  </div>
                  <span className={cn("font-mono text-[10px] px-1.5 py-0.5 border rounded transition-all", clientColor(desc.statusClient))}>
                    {desc.statusClient}
                  </span>
                </div>

                {/* Arrow area */}
                <div className="flex-1 flex flex-col items-center justify-center gap-1 pt-2">
                  <div className="relative w-full h-8 flex items-center">
                    <div className="absolute inset-y-1/2 left-0 right-0 border-t border-dashed border-rurikon-border/40" />

                    {(showArrow || showArrowStatic) && (
                      <>
                        {arrowDir === "right" ? (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-[#5a9fd4] rounded transition-none"
                            style={{ left: 0, width: `${(animating ? arrowProgress : 1) * 100}%` }}
                          />
                        ) : (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-[#9b72d4] rounded transition-none"
                            style={{ right: 0, width: `${(animating ? arrowProgress : 1) * 100}%` }}
                          />
                        )}
                        {arrowDir === "right" ? (
                          <div
                            className="absolute top-1/2 transition-none"
                            style={{ left: `${(animating ? arrowProgress : 1) * 100}%`, transform: "translate(-50%, -50%)" }}
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 2 L6 5 L0 8 Z" fill="#5a9fd4" /></svg>
                          </div>
                        ) : (
                          <div
                            className="absolute top-1/2 transition-none"
                            style={{ right: `${(animating ? arrowProgress : 1) * 100}%`, transform: "translate(50%, -50%)" }}
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M10 2 L4 5 L10 8 Z" fill="#9b72d4" /></svg>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {arrowLabel && (
                    <span className="font-mono text-[10px] text-rurikon-500 text-center px-1">{arrowLabel}</span>
                  )}
                </div>

                {/* Server */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-16 h-10 border-2 border-[#9b72d4] bg-[#ecdcf5] flex items-center justify-center rounded-sm">
                    <span className="text-[11px] font-mono text-[#5a1a8b] font-medium">Server</span>
                  </div>
                  <span className={cn("font-mono text-[10px] px-1.5 py-0.5 border rounded transition-all", serverColor(desc.statusServer))}>
                    {desc.statusServer}
                  </span>
                </div>
              </div>

              {/* Step dots */}
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      i === step ? "bg-rurikon-600" : i < step ? "bg-rurikon-300" : "bg-rurikon-100"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">REST request–response cycle</span>
              <button
                onClick={prev}
                disabled={!canPrev || animating}
                className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← prev
              </button>
              <button
                onClick={next}
                disabled={!canNext || animating}
                className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                next →
              </button>
              <button
                onClick={reset}
                className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
              >
                reset
              </button>
            </div>
          </div>

          {/* Right: step detail */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">{desc.label}</span>
                <span className="text-xs text-rurikon-400 italic">{desc.detail}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
