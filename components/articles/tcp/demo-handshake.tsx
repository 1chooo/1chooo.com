"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

type Phase = ConnectPhase | ClosePhase
type Mode = "connect" | "close"

type ConnectPhase = "idle" | "syn" | "syn-ack" | "ack" | "established"
type ClosePhase = "established" | "fin" | "fin-ack" | "ack2" | "closed"

const CONNECT_PHASES: ConnectPhase[] = ["idle", "syn", "syn-ack", "ack", "established"]
const CLOSE_PHASES: ClosePhase[] = ["established", "fin", "fin-ack", "ack2", "closed"]

interface PhaseDesc { label: string; arrow?: string; dir?: "right" | "left"; flags: string; detail: string }

const CONNECT_DESCRIPTIONS: Record<ConnectPhase, PhaseDesc> = {
  idle: {
    label: "Both sides ready",
    flags: "—",
    detail: "Client and server are both in LISTEN / CLOSED state, waiting to initiate or accept a connection.",
  },
  syn: {
    label: "Client → SYN",
    arrow: "SYN  seq=x",
    dir: "right",
    flags: "SYN",
    detail: "Client picks a random Initial Sequence Number (ISN) x and sends a SYN segment to open the connection. Client moves to SYN_SENT.",
  },
  "syn-ack": {
    label: "Server → SYN-ACK",
    arrow: "SYN-ACK  seq=y  ack=x+1",
    dir: "left",
    flags: "SYN + ACK",
    detail: "Server picks its own ISN y, acknowledges x+1 (the next byte it expects from the client). Server moves to SYN_RECEIVED.",
  },
  ack: {
    label: "Client → ACK",
    arrow: "ACK  ack=y+1",
    dir: "right",
    flags: "ACK",
    detail: "Client acknowledges y+1. Connection is now fully established on both sides. Client moves to ESTABLISHED.",
  },
  established: {
    label: "Connection established",
    flags: "—",
    detail: "Both endpoints are in ESTABLISHED state. Data can flow bidirectionally. This is the normal operating state for any TCP stream.",
  },
}

const CLOSE_DESCRIPTIONS: Record<ClosePhase, PhaseDesc> = {
  established: {
    label: "Connection established",
    flags: "—",
    detail: "Both sides are in ESTABLISHED state, actively exchanging data. Client initiates the close.",
  },
  fin: {
    label: "Client → FIN",
    arrow: "FIN  seq=u",
    dir: "right",
    flags: "FIN",
    detail: "Client has no more data to send. It sends a FIN to signal half-close. Client moves to FIN_WAIT_1. Server can still send data (half-duplex close).",
  },
  "fin-ack": {
    label: "Server → ACK + FIN",
    arrow: "ACK=u+1,  FIN  seq=v",
    dir: "left",
    flags: "ACK + FIN",
    detail: "Server acknowledges the client's FIN. If it has no more data either, it sends its own FIN in the same segment. Server moves to LAST_ACK.",
  },
  ack2: {
    label: "Client → ACK",
    arrow: "ACK=v+1",
    dir: "right",
    flags: "ACK",
    detail: "Client acknowledges server's FIN and enters TIME_WAIT for 2×MSL (Max Segment Lifetime) before finally moving to CLOSED. This guards against delayed duplicate segments.",
  },
  closed: {
    label: "Connection closed",
    flags: "—",
    detail: "Both sides have exchanged FINs and ACKs. The connection is torn down. All resources are released after TIME_WAIT expires.",
  },
}

export function DemoHandshake() {
  const [mode, setMode] = useState<Mode>("connect")
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [arrowProgress, setArrowProgress] = useState(0)
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const phases: Phase[] = mode === "connect" ? CONNECT_PHASES : CLOSE_PHASES
  const descriptions = (mode === "connect" ? CONNECT_DESCRIPTIONS : CLOSE_DESCRIPTIONS) as Record<Phase, PhaseDesc>
  const currentPhase = phases[phaseIdx]
  const desc = descriptions[currentPhase]

  const canNext = phaseIdx < phases.length - 1
  const canPrev = phaseIdx > 0

  function triggerArrow(cb: () => void) {
    setAnimating(true)
    setArrowProgress(0)
    let start: number | null = null
    const duration = 500
    function step(ts: number) {
      if (!start) start = ts
      const pct = Math.min((ts - start) / duration, 1)
      setArrowProgress(pct)
      if (pct < 1) {
        requestAnimationFrame(step)
      } else {
        setAnimating(false)
        cb()
      }
    }
    requestAnimationFrame(step)
  }

  function next() {
    if (!canNext || animating) return
    const next = phases[phaseIdx + 1]
    const nd = descriptions[next]
    if (nd.arrow) {
      triggerArrow(() => setPhaseIdx((i) => i + 1))
    } else {
      setPhaseIdx((i) => i + 1)
    }
  }

  function prev() {
    if (!canPrev || animating) return
    setPhaseIdx((i) => i - 1)
    setArrowProgress(0)
  }

  function reset() {
    if (animRef.current) clearTimeout(animRef.current)
    setPhaseIdx(0)
    setArrowProgress(0)
    setAnimating(false)
  }

  function switchMode(m: Mode) {
    setMode(m)
    reset()
  }

  const nextDesc = canNext ? descriptions[phases[phaseIdx + 1]] : null
  const showArrow = animating && nextDesc?.arrow
  const showArrowStatic = !animating && phaseIdx > 0 && desc.arrow

  // client state labels
  const clientStates: Record<Phase, string> = {
    idle: "CLOSED",
    syn: "SYN_SENT",
    "syn-ack": "SYN_SENT",
    ack: "ESTABLISHED",
    established: "ESTABLISHED",
    fin: "FIN_WAIT_1",
    "fin-ack": "FIN_WAIT_2",
    ack2: "TIME_WAIT",
    closed: "CLOSED",
  }
  const serverStates: Record<Phase, string> = {
    idle: "LISTEN",
    syn: "LISTEN",
    "syn-ack": "SYN_RECEIVED",
    ack: "ESTABLISHED",
    established: "ESTABLISHED",
    fin: "ESTABLISHED",
    "fin-ack": "CLOSE_WAIT",
    ack2: "LAST_ACK",
    closed: "CLOSED",
  }

  const stateColor = (s: string) => {
    if (s === "ESTABLISHED") return "text-[#3a6b1a] bg-[#dce8dc] border-[#7aab4e]"
    if (s === "CLOSED") return "text-rurikon-400 bg-rurikon-50 border-rurikon-border"
    if (s.startsWith("SYN")) return "text-[#1a5a8b] bg-[#dce8f5] border-[#5a9fd4]"
    if (s.startsWith("FIN") || s === "CLOSE_WAIT" || s === "LAST_ACK" || s === "TIME_WAIT") return "text-[#8b6914] bg-[#f5e8dc] border-[#d4a96a]"
    return "text-rurikon-400 bg-rurikon-50 border-rurikon-border"
  }

  const arrowDir = (animating ? nextDesc?.dir : desc.dir) ?? "right"
  const arrowLabel = animating ? nextDesc?.arrow : desc.arrow

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left: visualization */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6" style={{ minHeight: 220 }}>

              {/* Actors row */}
              <div className="w-full flex items-start justify-between gap-4 max-w-sm mx-auto">
                {/* Client */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-16 h-10 border-2 border-[#5a9fd4] bg-[#dce8f5] flex items-center justify-center rounded-sm">
                    <span className="text-[11px] font-mono text-[#1a5a8b] font-medium">Client</span>
                  </div>
                  <span className={cn("font-mono text-[10px] px-1.5 py-0.5 border rounded transition-all", stateColor(clientStates[currentPhase]))}>
                    {clientStates[currentPhase]}
                  </span>
                </div>

                {/* Arrow / line area */}
                <div className="flex-1 flex flex-col items-center justify-center gap-1 pt-2">
                  <div className="relative w-full h-8 flex items-center">
                    {/* Static line */}
                    <div className="absolute inset-y-1/2 left-0 right-0 border-t border-dashed border-rurikon-border/40" />

                    {/* Animated arrow */}
                    {(showArrow || showArrowStatic) && (
                      <>
                        {arrowDir === "right" ? (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-[#5a9fd4] rounded transition-none"
                            style={{
                              left: 0,
                              width: `${(animating ? arrowProgress : 1) * 100}%`,
                            }}
                          />
                        ) : (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-[#9b72d4] rounded transition-none"
                            style={{
                              right: 0,
                              width: `${(animating ? arrowProgress : 1) * 100}%`,
                            }}
                          />
                        )}
                        {/* Arrowhead */}
                        {arrowDir === "right" ? (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 transition-none"
                            style={{ left: `${(animating ? arrowProgress : 1) * 100}%`, transform: "translate(-50%, -50%)" }}
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 2 L6 5 L0 8 Z" fill="#5a9fd4" /></svg>
                          </div>
                        ) : (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 transition-none"
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
                  <span className={cn("font-mono text-[10px] px-1.5 py-0.5 border rounded transition-all", stateColor(serverStates[currentPhase]))}>
                    {serverStates[currentPhase]}
                  </span>
                </div>
              </div>

              {/* Step indicator */}
              <div className="flex gap-1.5">
                {phases.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      i === phaseIdx ? "bg-rurikon-600" : i < phaseIdx ? "bg-rurikon-300" : "bg-rurikon-100"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                {mode === "connect" ? "three-way handshake" : "four-way teardown"}
              </span>
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

          {/* Right: description */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* Mode toggle */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => switchMode("connect")}
                  className={cn(
                    "text-xs rounded px-2.5 py-1.5 border transition-colors flex-1",
                    mode === "connect"
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  3-way connect
                </button>
                <button
                  onClick={() => switchMode("close")}
                  className={cn(
                    "text-xs rounded px-2.5 py-1.5 border transition-colors flex-1",
                    mode === "close"
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  4-way teardown
                </button>
              </div>

              {/* Description block */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">{desc.label}</span>
                <span className="text-xs text-rurikon-500">{desc.flags !== "—" ? `flags: ${desc.flags}` : "no segment sent"}</span>
                <span className="text-xs text-rurikon-400 italic">{desc.detail}</span>
              </div>

              {/* Flags display */}
              {desc.flags !== "—" && (
                <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                  <span className="text-rurikon-400">segment {"{"}</span>
                  <br />
                  {"  "}<span className="text-[#5a9fd4]">flags</span>: <span className="text-[#9b72d4]">{desc.flags}</span>;
                  {desc.arrow && (
                    <>
                      <br />
                      {"  "}<span className="text-[#5a9fd4]">fields</span>: <span className="text-[#9b72d4]">{desc.arrow}</span>;
                    </>
                  )}
                  <br />
                  <span className="text-rurikon-400">{"}"}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
