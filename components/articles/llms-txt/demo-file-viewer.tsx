"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Tab = "llms" | "llms-full"

type LineType = "h1" | "blank" | "blockquote" | "h2" | "h2-optional" | "link" | "content" | "ellipsis"

interface Line {
  type: LineType
  text: string
}

const LLMS_LINES: Line[] = [
  { type: "h1", text: "# Lin Hugo — 1chooo.com" },
  { type: "blank", text: "" },
  { type: "blockquote", text: "> Personal notes on web engineering, design, and technology." },
  { type: "blank", text: "" },
  { type: "h2", text: "## Notes" },
  { type: "blank", text: "" },
  { type: "link", text: "- [CSS Layout](/notes/css-layout): A complete guide to CSS layout — flexbox, grid, positioning." },
  { type: "link", text: "- [Server and Client Components](/notes/server-and-client-components): RSC in Next.js App Router." },
  { type: "link", text: "- [TCP](/notes/tcp): How the Transmission Control Protocol works." },
  { type: "link", text: "- [Motion](/notes/motion): Framer Motion animations and interactions." },
  { type: "blank", text: "" },
  { type: "h2-optional", text: "## Optional" },
  { type: "blank", text: "" },
  { type: "link", text: "- [GitHub](https://github.com/1chooo): Open source projects and contributions." },
  { type: "link", text: "- [Contact](/contact): Reach me by email." },
]

const LLMS_FULL_LINES: Line[] = [
  { type: "h1", text: "# Lin Hugo — 1chooo.com" },
  { type: "blank", text: "" },
  { type: "blockquote", text: "> Personal notes on web engineering, design, and technology." },
  { type: "blank", text: "" },
  { type: "h2", text: "## Notes" },
  { type: "blank", text: "" },
  { type: "link", text: "- [CSS Layout](/notes/css-layout): A complete guide to CSS layout." },
  { type: "blank", text: "" },
  { type: "content", text: "  CSS layout is one of those topics that looks simple on the surface" },
  { type: "content", text: "  but reveals surprising depth. In normal flow, elements are divided" },
  { type: "content", text: "  into two formatting contexts: block and inline. Flexbox is a" },
  { type: "content", text: "  one-dimensional layout algorithm. Grid manages rows and columns..." },
  { type: "ellipsis", text: "  [... full article continued ...]" },
  { type: "blank", text: "" },
  { type: "link", text: "- [Server and Client Components](/notes/sc): RSC in Next.js App Router." },
  { type: "blank", text: "" },
  { type: "content", text: "  Every component is either a Server Component or a Client Component." },
  { type: "content", text: "  Get the split right and you gain free server-side rendering, zero-cost" },
  { type: "content", text: "  data fetching, and a smaller JavaScript bundle..." },
  { type: "ellipsis", text: "  [... full article continued ...]" },
  { type: "blank", text: "" },
  { type: "link", text: "- [TCP](/notes/tcp): How the Transmission Control Protocol works." },
  { type: "ellipsis", text: "  [... full article continued ...]" },
  { type: "blank", text: "" },
  { type: "h2-optional", text: "## Optional" },
  { type: "blank", text: "" },
  { type: "link", text: "- [GitHub](https://github.com/1chooo): Open source projects." },
]

function renderLine(line: Line, i: number) {
  const base = "font-mono text-[11px] sm:text-xs leading-6"
  switch (line.type) {
    case "h1":
      return <div key={i} className={cn(base, "text-rurikon-700 font-bold")}>{line.text}</div>
    case "blockquote":
      return <div key={i} className={cn(base, "text-rurikon-400 italic")}>{line.text}</div>
    case "h2":
      return <div key={i} className={cn(base, "text-[#5a9fd4] font-semibold mt-1")}>{line.text}</div>
    case "h2-optional":
      return <div key={i} className={cn(base, "text-rurikon-300 font-semibold mt-1")}>{line.text}</div>
    case "link":
      return <div key={i} className={cn(base, "text-rurikon-600")}>{line.text}</div>
    case "content":
      return <div key={i} className={cn(base, "text-rurikon-400")}>{line.text}</div>
    case "ellipsis":
      return <div key={i} className={cn(base, "text-[#9b72d4] italic")}>{line.text}</div>
    case "blank":
      return <div key={i} className="h-2" />
    default:
      return <div key={i} className={cn(base, "text-rurikon-400")}>{line.text}</div>
  }
}

const INFO: Record<Tab, { label: string; summary: string; size: string }> = {
  "llms": {
    label: "index — links & descriptions",
    summary: "One line per page. Lets the LLM decide which pages to fetch next. Fits in any context window.",
    size: "~1–5 KB typical",
  },
  "llms-full": {
    label: "full content — everything inline",
    summary: "Every page's full text is included beneath its link. No follow-up fetches needed. Can be large.",
    size: "10–500 KB depending on site",
  },
}

export function DemoFileViewer() {
  const [tab, setTab] = useState<Tab>("llms")
  const lines = tab === "llms" ? LLMS_LINES : LLMS_FULL_LINES
  const info = INFO[tab]

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left — file preview */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto" style={{ minHeight: 200, maxHeight: 340 }}>
              {lines.map((line, i) => renderLine(line, i))}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                {tab === "llms" ? "/llms.txt" : "/llms-full.txt"}
              </span>
              {(["llms", "llms-full"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "text-xs rounded px-2.5 py-1.5 border transition-colors",
                    tab === t
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  {t === "llms" ? "llms.txt" : "llms-full.txt"}
                </button>
              ))}
            </div>
          </div>

          {/* Right — info panel */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">{info.label}</span>
                <span className="text-xs text-rurikon-500">{info.summary}</span>
                <span className="text-xs text-rurikon-400 italic">{info.size}</span>
              </div>

              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-700 font-bold"># title</span>
                <br />
                <span className="text-rurikon-400 italic">{"> description"}</span>
                <br />
                <span className="text-[#5a9fd4]">## section</span>
                <br />
                <span className="text-rurikon-600">{"- [page](url): desc"}</span>
                <br />
                <span className="text-rurikon-300">## Optional</span>
                {tab === "llms-full" && (
                  <>
                    <br />
                    <br />
                    <span className="text-rurikon-400">{"  page content"}</span>
                    <br />
                    <span className="text-[#9b72d4] italic">{"  [... expanded ...]"}</span>
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
