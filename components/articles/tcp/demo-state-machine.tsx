"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type TcpState =
  | "CLOSED"
  | "LISTEN"
  | "SYN_SENT"
  | "SYN_RECEIVED"
  | "ESTABLISHED"
  | "FIN_WAIT_1"
  | "FIN_WAIT_2"
  | "CLOSE_WAIT"
  | "CLOSING"
  | "LAST_ACK"
  | "TIME_WAIT"

type Role = "client" | "server"

interface StateInfo {
  label: TcpState
  short: string
  detail: string
  color: string
}

const STATE_INFO: Record<TcpState, StateInfo> = {
  CLOSED: {
    label: "CLOSED",
    short: "No connection exists.",
    detail: "The initial and final state. No socket resources are in use. A passive open (server) transitions to LISTEN; an active open (client) sends SYN and moves to SYN_SENT.",
    color: "bg-rurikon-50 border-rurikon-border text-rurikon-400",
  },
  LISTEN: {
    label: "LISTEN",
    short: "Server awaiting incoming SYN.",
    detail: "After a server calls bind() + listen(), it waits here. On receiving a SYN it sends SYN-ACK and moves to SYN_RECEIVED.",
    color: "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
  },
  SYN_SENT: {
    label: "SYN_SENT",
    short: "Client sent SYN, waiting for SYN-ACK.",
    detail: "Client has initiated a connection. It waits for the server's SYN-ACK. On timeout it may retransmit or report an error.",
    color: "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
  },
  SYN_RECEIVED: {
    label: "SYN_RECEIVED",
    short: "Server received SYN, sent SYN-ACK.",
    detail: "The three-way handshake is in progress. On receiving the client's ACK the connection moves to ESTABLISHED.",
    color: "bg-[#f5e8dc] border-[#d4a96a] text-[#8b6914]",
  },
  ESTABLISHED: {
    label: "ESTABLISHED",
    short: "Connection open — data can flow.",
    detail: "The normal operating state. Both sides can send and receive data. Closing the connection requires a FIN from one side.",
    color: "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]",
  },
  FIN_WAIT_1: {
    label: "FIN_WAIT_1",
    short: "Active closer sent FIN, waiting for reply.",
    detail: "The application called close(). A FIN was sent. Waiting for an ACK of that FIN (→ FIN_WAIT_2) or a simultaneous FIN from the peer (→ CLOSING).",
    color: "bg-[#f5e8dc] border-[#d4a96a] text-[#8b6914]",
  },
  FIN_WAIT_2: {
    label: "FIN_WAIT_2",
    short: "FIN was ACKed; waiting for peer's FIN.",
    detail: "The remote side acknowledged our FIN but hasn't closed its end yet (half-close). Waiting for the peer's FIN.",
    color: "bg-[#f5e8dc] border-[#d4a96a] text-[#8b6914]",
  },
  CLOSE_WAIT: {
    label: "CLOSE_WAIT",
    short: "Received FIN; app hasn't closed yet.",
    detail: "The passive closer received the peer's FIN. The application is notified (read returns 0). Once the app calls close(), it sends FIN and moves to LAST_ACK.",
    color: "bg-[#ecdcf5] border-[#9b72d4] text-[#5a1a8b]",
  },
  CLOSING: {
    label: "CLOSING",
    short: "Both sides closed simultaneously.",
    detail: "Rare state: both endpoints sent a FIN at nearly the same time. Each side waits for the other's ACK of its own FIN.",
    color: "bg-[#f5dce8] border-[#d45a9f] text-[#8b1a5a]",
  },
  LAST_ACK: {
    label: "LAST_ACK",
    short: "Passive closer's FIN sent; waiting for final ACK.",
    detail: "The passive closer sent its FIN and is waiting for the active closer to acknowledge it. After the ACK arrives, moves to CLOSED.",
    color: "bg-[#ecdcf5] border-[#9b72d4] text-[#5a1a8b]",
  },
  TIME_WAIT: {
    label: "TIME_WAIT",
    short: "Wait 2×MSL before releasing the port.",
    detail: "After the active closer sends the final ACK, it waits for 2×MSL (typically 60–120 s) to ensure the ACK arrived and to absorb any delayed duplicate segments. Only then does it move to CLOSED.",
    color: "bg-[#dcf5f0] border-[#4ed4b8] text-[#1a8b72]",
  },
}

// State machine transitions: [from, event, to, label]
type Transition = [TcpState, string, TcpState]

const CLIENT_TRANSITIONS: Transition[] = [
  ["CLOSED", "active open / send SYN", "SYN_SENT"],
  ["SYN_SENT", "recv SYN-ACK / send ACK", "ESTABLISHED"],
  ["ESTABLISHED", "close / send FIN", "FIN_WAIT_1"],
  ["FIN_WAIT_1", "recv ACK", "FIN_WAIT_2"],
  ["FIN_WAIT_1", "recv FIN / send ACK", "CLOSING"],
  ["FIN_WAIT_2", "recv FIN / send ACK", "TIME_WAIT"],
  ["CLOSING", "recv ACK", "TIME_WAIT"],
  ["TIME_WAIT", "2×MSL timeout", "CLOSED"],
]

const SERVER_TRANSITIONS: Transition[] = [
  ["CLOSED", "passive open", "LISTEN"],
  ["LISTEN", "recv SYN / send SYN-ACK", "SYN_RECEIVED"],
  ["SYN_RECEIVED", "recv ACK", "ESTABLISHED"],
  ["ESTABLISHED", "recv FIN / send ACK", "CLOSE_WAIT"],
  ["CLOSE_WAIT", "close / send FIN", "LAST_ACK"],
  ["LAST_ACK", "recv ACK", "CLOSED"],
]

type TransitionSet = "client" | "server"

export function DemoStateMachine() {
  const [view, setView] = useState<TransitionSet>("client")
  const [active, setActive] = useState<TcpState>("CLOSED")

  const transitions = view === "client" ? CLIENT_TRANSITIONS : SERVER_TRANSITIONS
  const info = STATE_INFO[active]

  // Reachable next states from active
  const nextStates = transitions.filter((t) => t[0] === active).map((t) => t[2])
  // Which transitions arrive at active
  const incoming = transitions.filter((t) => t[2] === active)

  function switchView(v: TransitionSet) {
    setView(v)
    setActive("CLOSED")
  }

  const allStates = Array.from(new Set(transitions.flatMap((t) => [t[0], t[2]]))) as TcpState[]

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left: state nodes */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 p-4 sm:p-5 flex flex-wrap gap-2 content-start" style={{ minHeight: 220 }}>
              {allStates.map((state) => {
                const si = STATE_INFO[state]
                const isActive = state === active
                const isNext = nextStates.includes(state)
                const isIncoming = incoming.some((t) => t[0] === state)
                return (
                  <button
                    key={state}
                    onClick={() => setActive(state)}
                    className={cn(
                      "font-mono text-[11px] rounded px-2.5 py-1.5 border transition-colors",
                      isActive
                        ? si.color + " border-2 font-semibold"
                        : isNext
                        ? "border-[#5a9fd4] text-[#1a5a8b] bg-[#dce8f5]/50"
                        : isIncoming
                        ? "border-rurikon-300 text-rurikon-500"
                        : "border-rurikon-border/40 text-rurikon-300 bg-rurikon-50/20"
                    )}
                  >
                    {state}
                  </button>
                )
              })}

              {/* Transitions from active */}
              {transitions.filter((t) => t[0] === active).length > 0 && (
                <div className="w-full mt-2 flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-rurikon-300 uppercase tracking-wide">transitions from {active}</span>
                  {transitions.filter((t) => t[0] === active).map(([, evt, to], i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-rurikon-400">{evt}</span>
                      <span className="text-rurikon-300">→</span>
                      <button
                        onClick={() => setActive(to)}
                        className={cn("font-mono text-[10px] px-1.5 py-0.5 rounded border", STATE_INFO[to].color)}
                      >
                        {to}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">TCP state machine</span>
              <span className="font-mono text-[10px] text-rurikon-300">click a state to explore</span>
            </div>
          </div>

          {/* Right: description */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* Role toggle */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => switchView("client")}
                  className={cn(
                    "text-xs rounded px-2.5 py-1.5 border transition-colors flex-1",
                    view === "client"
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  active opener (client)
                </button>
                <button
                  onClick={() => switchView("server")}
                  className={cn(
                    "text-xs rounded px-2.5 py-1.5 border transition-colors flex-1",
                    view === "server"
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  passive opener (server)
                </button>
              </div>

              {/* State description */}
              <div className={cn("border px-3 py-3 flex flex-col gap-1 rounded-sm", info.color)}>
                <span className="font-mono text-xs font-medium">{active}</span>
                <span className="text-xs opacity-80">{info.short}</span>
                <span className="text-xs opacity-60 italic">{info.detail}</span>
              </div>

              {/* Pseudo code */}
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-400">state {"{"}</span>
                <br />
                {"  "}<span className="text-[#5a9fd4]">current</span>: <span className="text-[#9b72d4]">{active}</span>;
                <br />
                {"  "}<span className="text-[#5a9fd4]">role</span>: <span className="text-[#9b72d4]">{view}</span>;
                {nextStates.length > 0 && (
                  <>
                    <br />
                    {"  "}<span className="text-[#5a9fd4]">next</span>: <span className="text-[#9b72d4]">[{nextStates.join(", ")}]</span>;
                  </>
                )}
                <br />
                <span className="text-rurikon-400">{"}"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
