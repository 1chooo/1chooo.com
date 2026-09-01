"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Env = "server" | "client"

type Capability = {
  label: string
  server: boolean
  client: boolean
  description: string
  detail: string
}

const CAPABILITIES: Capability[] = [
  {
    label: "async / await",
    server: true,
    client: false,
    description: "Server Components can be async functions.",
    detail: "You can await database queries, fetch calls, or any promise directly in the component body — no useEffect or SWR needed.",
  },
  {
    label: "fetch data (DB / FS)",
    server: true,
    client: false,
    description: "Direct access to Node.js APIs, databases, and the file system.",
    detail: "Because the component only ever runs on the server, credentials and data sources never reach the browser.",
  },
  {
    label: "useState / useReducer",
    server: false,
    client: true,
    description: "Stateful hooks are a client-only feature.",
    detail: "State lives in the browser. Calling useState in a Server Component throws a build-time error.",
  },
  {
    label: "useEffect / useLayoutEffect",
    server: false,
    client: true,
    description: "Side-effect hooks run after the browser renders.",
    detail: "Effects never run server-side. Any component that needs to sync with an external system after mount must be a Client Component.",
  },
  {
    label: "browser APIs (window, document)",
    server: false,
    client: true,
    description: "The browser object model only exists in the client environment.",
    detail: "Accessing window or document in a Server Component will throw because those globals do not exist in Node.js.",
  },
  {
    label: "event handlers (onClick …)",
    server: false,
    client: true,
    description: "Event listeners require a live DOM in the browser.",
    detail: "onClick, onChange, and all other DOM events are wired up during hydration and only function in the client.",
  },
  {
    label: "import server-only secrets",
    server: true,
    client: false,
    description: "Environment variables without NEXT_PUBLIC_ are server-only.",
    detail: "process.env.DB_PASSWORD is available on the server but stripped from the client bundle, keeping secrets safe.",
  },
  {
    label: "render JSX / return HTML",
    server: true,
    client: true,
    description: "Both types return JSX and produce HTML.",
    detail: "The difference is where and when: Server Components stream HTML from the server; Client Components hydrate that HTML in the browser.",
  },
  {
    label: "React context (useContext)",
    server: false,
    client: true,
    description: "Context providers and consumers run client-side.",
    detail: "Context crosses the client component tree. Wrap providers at the top of a client subtree and consume them in any Client Component descendant.",
  },
  {
    label: "zero JavaScript sent to browser",
    server: true,
    client: false,
    description: "Server Component code is never included in the JS bundle.",
    detail: "Only the rendered HTML output travels to the client. Libraries used exclusively in Server Components do not add to bundle size.",
  },
]

const SERVER_COLOR = "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]"
const CLIENT_COLOR = "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]"
const BOTH_COLOR = "bg-[#ecdcf5] border-[#9b72d4] text-[#5a1a8b]"
const NEITHER_COLOR = "bg-[#f5f5f0] border-rurikon-border/60 text-rurikon-300 line-through"

export function DemoRenderingEnv() {
  const [env, setEnv] = useState<Env>("server")
  const [selected, setSelected] = useState<Capability>(CAPABILITIES[0])

  const isAvailable = (cap: Capability) =>
    env === "server" ? cap.server : cap.client

  const chipColor = (cap: Capability) => {
    if (cap.server && cap.client) return BOTH_COLOR
    if (cap.server) return SERVER_COLOR
    if (cap.client) return CLIENT_COLOR
    return NEITHER_COLOR
  }

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left — capability list + footer */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            {/* Environment toggle */}
            <div className="flex gap-2 p-4 border-b border-rurikon-border">
              {(["server", "client"] as Env[]).map((e) => (
                <button
                  key={e}
                  onClick={() => setEnv(e)}
                  className={cn(
                    "text-xs rounded px-3 py-1.5 border transition-colors font-mono",
                    env === e
                      ? e === "server"
                        ? "bg-[#3a6b1a] text-white border-[#3a6b1a]"
                        : "bg-[#1a5a8b] text-white border-[#1a5a8b]"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  {e === "server" ? "⬛ server" : "⬜ client"}
                </button>
              ))}
              <span className="ml-auto font-serif text-[11px] text-rurikon-300 italic self-center">
                {env === "server" ? "Node.js environment" : "Browser environment"}
              </span>
            </div>

            {/* Capability chips */}
            <div className="flex-1 p-4 flex flex-wrap gap-2 content-start" style={{ minHeight: 200 }}>
              {CAPABILITIES.map((cap) => {
                const available = isAvailable(cap)
                const isSelected = selected.label === cap.label
                return (
                  <button
                    key={cap.label}
                    onClick={() => setSelected(cap)}
                    className={cn(
                      "font-mono text-[11px] rounded px-2.5 py-1.5 border transition-colors",
                      isSelected
                        ? available
                          ? chipColor(cap) + " ring-1 ring-offset-1 ring-rurikon-400"
                          : "bg-rurikon-100 border-rurikon-border text-rurikon-300 ring-1 ring-offset-1 ring-rurikon-400"
                        : available
                          ? chipColor(cap)
                          : "bg-[#f5f5f0] border-rurikon-border/40 text-rurikon-300 opacity-40"
                    )}
                  >
                    {available ? "✓ " : "✗ "}{cap.label}
                  </button>
                )
              })}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">rendering environment</span>
            </div>
          </div>

          {/* Right — detail panel */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* Capability info */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-rurikon-700 font-medium">{selected.label}</span>
                  <span className={cn(
                    "font-mono text-[10px] px-1.5 py-0.5 rounded border",
                    selected.server && selected.client ? BOTH_COLOR
                      : selected.server ? SERVER_COLOR
                        : CLIENT_COLOR
                  )}>
                    {selected.server && selected.client ? "both" : selected.server ? "server" : "client"}
                  </span>
                </div>
                <span className="text-xs text-rurikon-500">{selected.description}</span>
                <span className="text-xs text-rurikon-400 italic">{selected.detail}</span>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] text-rurikon-400">legend</span>
                <div className="flex flex-col gap-1">
                  {[
                    { color: SERVER_COLOR, label: "server only" },
                    { color: CLIENT_COLOR, label: "client only" },
                    { color: BOTH_COLOR, label: "both environments" },
                    { color: NEITHER_COLOR, label: "not available" },
                  ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className={cn("font-mono text-[10px] px-2 py-0.5 rounded border", color)}>
                        {label === "not available" ? "✗" : "✓"}
                      </span>
                      <span className="text-[11px] text-rurikon-400">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
