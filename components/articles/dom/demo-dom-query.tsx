"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ElemInfo {
  id: string
  tag: string
  classes: string[]
  attrs?: Record<string, string>
  parent: string
}

const ELEMENTS: ElemInfo[] = [
  { id: "header",   tag: "header",  classes: ["site-header"], attrs: {},           parent: "body" },
  { id: "h1",       tag: "h1",      classes: [],              attrs: {},           parent: "header" },
  { id: "nav",      tag: "nav",     classes: [],              attrs: {},           parent: "header" },
  { id: "a1",       tag: "a",       classes: [],              attrs: { href: "#" }, parent: "nav" },
  { id: "a2",       tag: "a",       classes: ["active"],      attrs: { href: "#" }, parent: "nav" },
  { id: "main",     tag: "main",    classes: [],              attrs: {},           parent: "body" },
  { id: "article1", tag: "article", classes: ["post"],        attrs: {},           parent: "main" },
  { id: "h2_1",     tag: "h2",      classes: [],              attrs: {},           parent: "article1" },
  { id: "p1",       tag: "p",       classes: ["intro"],       attrs: {},           parent: "article1" },
  { id: "p2",       tag: "p",       classes: [],              attrs: {},           parent: "article1" },
  { id: "article2", tag: "article", classes: ["post", "featured"], attrs: {},      parent: "main" },
  { id: "h2_2",     tag: "h2",      classes: [],              attrs: {},           parent: "article2" },
  { id: "p3",       tag: "p",       classes: ["intro"],       attrs: {},           parent: "article2" },
  { id: "footer",   tag: "footer",  classes: [],              attrs: {},           parent: "body" },
  { id: "pf",       tag: "p",       classes: [],              attrs: {},           parent: "footer" },
]

const SELECTORS: { label: string; query: string; matches: string[] }[] = [
  {
    label: "p",
    query: "p",
    matches: ["p1", "p2", "p3", "pf"],
  },
  {
    label: ".intro",
    query: ".intro",
    matches: ["p1", "p3"],
  },
  {
    label: ".post",
    query: ".post",
    matches: ["article1", "article2"],
  },
  {
    label: ".featured",
    query: ".featured",
    matches: ["article2"],
  },
  {
    label: "a.active",
    query: "a.active",
    matches: ["a2"],
  },
  {
    label: "h2",
    query: "h2",
    matches: ["h2_1", "h2_2"],
  },
  {
    label: "[href]",
    query: "[href]",
    matches: ["a1", "a2"],
  },
  {
    label: "article h2",
    query: "article h2",
    matches: ["h2_1", "h2_2"],
  },
]

const TAG_COLORS: Record<string, string> = {
  header:  "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
  h1:      "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
  nav:     "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
  a:       "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
  main:    "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]",
  article: "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]",
  h2:      "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]",
  p:       "bg-[#f5e8dc] border-[#d4a96a] text-[#8b6914]",
  footer:  "bg-[#ecdcf5] border-[#9b72d4] text-[#5a1a8b]",
}

function tagColor(tag: string): string {
  return TAG_COLORS[tag] ?? "bg-rurikon-50 border-rurikon-border text-rurikon-500"
}

export function DemoDOMQuery() {
  const [selIdx, setSelIdx] = useState(0)
  const sel = SELECTORS[selIdx]

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          {/* Left: element grid */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div
              className="flex-1 p-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2 content-start"
              style={{ minHeight: 220 }}
            >
              {ELEMENTS.map((el) => {
                const matched = sel.matches.includes(el.id)
                const color = tagColor(el.tag)
                return (
                  <div
                    key={el.id}
                    className={cn(
                      "flex flex-col gap-0.5 px-2 py-1.5 border text-xs transition-all duration-200",
                      matched
                        ? cn(color, "ring-2 ring-offset-1 ring-rurikon-500")
                        : "border-rurikon-border/30 text-rurikon-300 bg-rurikon-50/20 opacity-40"
                    )}
                  >
                    <span className="font-mono font-medium">
                      &lt;{el.tag}&gt;
                    </span>
                    {el.classes.length > 0 && (
                      <span className="text-[10px] truncate">
                        .{el.classes.join(".")}
                      </span>
                    )}
                    {el.attrs &&
                      Object.keys(el.attrs).length > 0 && (
                        <span className="text-[10px] truncate opacity-70">
                          {Object.entries(el.attrs)
                            .map(([k]) => `[${k}]`)
                            .join(" ")}
                        </span>
                      )}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                {sel.matches.length} match{sel.matches.length !== 1 ? "es" : ""}
              </span>
            </div>
          </div>

          {/* Right: selector controls + code */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-rurikon-500">selector</span>
                <div className="flex flex-wrap gap-1">
                  {SELECTORS.map((s, i) => (
                    <button
                      key={s.query}
                      onClick={() => setSelIdx(i)}
                      className={cn(
                        "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                        selIdx === i
                          ? "bg-rurikon-800 text-white border-rurikon-600"
                          : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-400">// select all matches</span>
                <br />
                <span className="text-[#5a9fd4]">document</span>.
                <span className="text-[#d4a96a]">querySelectorAll</span>(
                <span className="text-[#9b72d4]">&apos;{sel.query}&apos;</span>)
                <br />
                <br />
                <span className="text-rurikon-400">// select first match only</span>
                <br />
                <span className="text-[#5a9fd4]">document</span>.
                <span className="text-[#d4a96a]">querySelector</span>(
                <span className="text-[#9b72d4]">&apos;{sel.query}&apos;</span>)
                <br />
                <br />
                <span className="text-rurikon-400">
                  // → {sel.matches.length} element{sel.matches.length !== 1 ? "s" : ""} matched
                </span>
              </div>

              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-2">
                <span className="text-xs text-rurikon-500">
                  matched ({sel.matches.length})
                </span>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {sel.matches.length === 0 ? (
                    <span className="text-xs text-rurikon-300 italic">none</span>
                  ) : (
                    sel.matches.map((id) => {
                      const el = ELEMENTS.find((e) => e.id === id)!
                      return (
                        <span
                          key={id}
                          className={cn(
                            "font-mono text-[11px] px-1.5 py-0.5 border",
                            tagColor(el.tag)
                          )}
                        >
                          &lt;{el.tag}&gt;
                          {el.classes.length ? "." + el.classes[0] : ""}
                        </span>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
