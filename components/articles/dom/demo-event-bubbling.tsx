"use client"

import { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

type Phase = "bubble" | "capture"

const LAYERS = [
  {
    id: "outer",
    label: "outer div",
    bg: "bg-[#f5e8dc]",
    border: "border-[#d4a96a]",
    text: "text-[#8b6914]",
  },
  {
    id: "middle",
    label: "middle div",
    bg: "bg-[#dce8f5]",
    border: "border-[#5a9fd4]",
    text: "text-[#1a5a8b]",
  },
  {
    id: "inner",
    label: "button",
    bg: "bg-[#dce8dc]",
    border: "border-[#7aab4e]",
    text: "text-[#3a6b1a]",
  },
] as const

type LayerId = (typeof LAYERS)[number]["id"]

type LogEntry = { layerId: LayerId; stopped: boolean }

export function DemoEventBubbling() {
  const [phase, setPhase] = useState<Phase>("bubble")
  const [stopProp, setStopProp] = useState(false)
  const [log, setLog] = useState<LogEntry[]>([])
  const [activeId, setActiveId] = useState<LayerId | null>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const triggerEvent = useCallback(
    (clickedId: LayerId) => {
      clearTimers()
      const clickedIdx = LAYERS.findIndex((l) => l.id === clickedId)

      // Build propagation chain based on phase
      const chain = phase === "bubble"
        ? [...LAYERS].slice(0, clickedIdx + 1).reverse() // innermost first
        : [...LAYERS].slice(0, clickedIdx + 1)           // outermost first

      // Build log entries; stopPropagation halts after the first handler
      const entries: LogEntry[] = chain.map((l, i) => ({
        layerId: l.id,
        stopped: stopProp && i === 0,
      }))
      const stopIdx = entries.findIndex((e) => e.stopped)
      const fired = stopIdx >= 0 ? entries.slice(0, stopIdx + 1) : entries

      setLog(fired)
      setActiveId(null)

      // Animate each step
      fired.forEach((entry, i) => {
        const t = setTimeout(() => {
          setActiveId(entry.layerId)
          if (i === fired.length - 1) {
            const t2 = setTimeout(() => setActiveId(null), 500)
            timersRef.current.push(t2)
          }
        }, i * 420)
        timersRef.current.push(t)
      })
    },
    [phase, stopProp]
  )

  const layerClass = (id: LayerId) => {
    const l = LAYERS.find((x) => x.id === id)!
    return activeId === id
      ? "border-rurikon-600 bg-rurikon-800 text-white"
      : cn(l.bg, l.border, l.text)
  }

  const labelClass = (id: LayerId) =>
    activeId === id ? "text-white/70" : LAYERS.find((x) => x.id === id)!.text

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          {/* Left: nested boxes */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div
              className="flex-1 flex items-center justify-center p-6 sm:p-8"
              style={{ minHeight: 230 }}
            >
              {/* Outer */}
              <div
                className={cn(
                  "relative cursor-pointer w-full max-w-xs border-2 transition-all duration-200 flex items-center justify-center",
                  layerClass("outer")
                )}
                style={{ minHeight: 194, padding: "28px" }}
                onClick={(e) => {
                  e.stopPropagation()
                  triggerEvent("outer")
                }}
              >
                <span
                  className={cn(
                    "absolute top-2 left-3 text-[10px] font-mono select-none",
                    labelClass("outer")
                  )}
                >
                  outer div
                </span>

                {/* Middle */}
                <div
                  className={cn(
                    "relative cursor-pointer w-full border-2 transition-all duration-200 flex items-center justify-center",
                    layerClass("middle")
                  )}
                  style={{ minHeight: 130, padding: "24px" }}
                  onClick={(e) => {
                    e.stopPropagation()
                    triggerEvent("middle")
                  }}
                >
                  <span
                    className={cn(
                      "absolute top-1.5 left-2.5 text-[10px] font-mono select-none",
                      labelClass("middle")
                    )}
                  >
                    middle div
                  </span>

                  {/* Inner */}
                  <button
                    className={cn(
                      "border-2 px-5 py-2 text-xs font-mono font-medium transition-all duration-200",
                      layerClass("inner")
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      triggerEvent("inner")
                    }}
                  >
                    click me
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                event propagation
              </span>
              {(["bubble", "capture"] as Phase[]).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPhase(p)
                    setLog([])
                    clearTimers()
                    setActiveId(null)
                  }}
                  className={cn(
                    "text-xs rounded px-2.5 py-1.5 border transition-colors",
                    phase === p
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  {p}ing
                </button>
              ))}
              <button
                onClick={() => {
                  setStopProp((s) => !s)
                  setLog([])
                  clearTimers()
                  setActiveId(null)
                }}
                className={cn(
                  "text-xs rounded px-2.5 py-1.5 border transition-colors",
                  stopProp
                    ? "bg-rurikon-800 text-white border-rurikon-600"
                    : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                )}
              >
                stopPropagation
              </button>
            </div>
          </div>

          {/* Right: log + code */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* Event log */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-2 flex flex-col gap-1.5 min-h-22.5">
                <span className="font-mono text-xs text-rurikon-500">event log</span>
                {log.length === 0 ? (
                  <span className="text-xs text-rurikon-300 italic">
                    click any element above
                  </span>
                ) : (
                  log.map((entry, i) => {
                    const l = LAYERS.find((x) => x.id === entry.layerId)!
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <span
                          className={cn(
                            "font-mono text-[11px] px-1.5 py-0.5 border",
                            l.bg,
                            l.border,
                            l.text
                          )}
                        >
                          {l.label}
                        </span>
                        <span className="text-xs text-rurikon-400">
                          handler fired
                        </span>
                        {entry.stopped && (
                          <span className="font-mono text-[10px] text-[#d45a9f] border border-[#d45a9f]/40 px-1">
                            stopped
                          </span>
                        )}
                      </div>
                    )
                  })
                )}
              </div>

              {/* Description block */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">
                  {phase === "bubble" ? "bubbling" : "capturing"}
                </span>
                <span className="text-xs text-rurikon-500">
                  {phase === "bubble"
                    ? "Events bubble up from target → ancestors"
                    : "Events capture down from document → target"}
                </span>
              </div>

              {/* Code block */}
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-400">
                  // {phase === "bubble" ? "bubbling" : "capturing"} listener
                </span>
                <br />
                <span className="text-[#5a9fd4]">element</span>
                .addEventListener(
                <br />
                {"  "}
                <span className="text-[#9b72d4]">&apos;click&apos;</span>,
                handler,
                <br />
                {"  "}
                {"{ capture: "}
                <span className="text-[#9b72d4]">
                  {phase === "capture" ? "true" : "false"}
                </span>
                {" }"}
                <br />)
                {stopProp && (
                  <>
                    <br />
                    <br />
                    <span className="text-rurikon-400">// inside handler:</span>
                    <br />
                    <span className="text-[#5a9fd4]">event</span>.
                    <span className="text-[#d4a96a]">stopPropagation</span>()
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
