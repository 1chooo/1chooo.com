"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

// Fixed example: [7,3,5,1,8,2,6,4] → bottom-up merge sort phases

const PALETTE = [
  { bg: "bg-[#dce8f5]", border: "border-[#5a9fd4]", text: "text-[#1a5a8b]" },
  { bg: "bg-[#f5e8dc]", border: "border-[#d4a96a]", text: "text-[#8b6914]" },
  { bg: "bg-[#ecdcf5]", border: "border-[#9b72d4]", text: "text-[#5a1a8b]" },
  { bg: "bg-[#f5dce8]", border: "border-[#d45a9f]", text: "text-[#8b1a5a]" },
  { bg: "bg-[#dcf5f0]", border: "border-[#4ed4b8]", text: "text-[#1a8b72]" },
  { bg: "bg-[#dce8dc]", border: "border-[#7aab4e]", text: "text-[#3a6b1a]" },
]

interface Phase {
  label: string
  desc: string
  detail: string
  array: number[]
  // each sub-array is a group of contiguous indices sharing one color
  groups: number[][]
}

// Hardcoded phases for [7,3,5,1,8,2,6,4]
const PHASES: Phase[] = [
  {
    label: "split to singletons",
    desc: "8 singletons — trivially sorted",
    detail: "A single element is always sorted. This is the base case; recursion stops here at depth ⌈log₂ 8⌉ = 3.",
    array: [7, 3, 5, 1, 8, 2, 6, 4],
    groups: [[0], [1], [2], [3], [4], [5], [6], [7]],
  },
  {
    label: "merge pairs (size 2)",
    desc: "4 sorted pairs",
    detail: "Compare and merge each adjacent pair. Each merge of two size-1 arrays costs O(2). Total O(n) work at this level.",
    array: [3, 7, 1, 5, 2, 8, 4, 6],
    groups: [[0, 1], [2, 3], [4, 5], [6, 7]],
  },
  {
    label: "merge fours (size 4)",
    desc: "2 sorted halves",
    detail: "Merge each pair of sorted pairs. Each merge of two size-2 arrays costs O(4). Total O(n) work at this level.",
    array: [1, 3, 5, 7, 2, 4, 6, 8],
    groups: [[0, 1, 2, 3], [4, 5, 6, 7]],
  },
  {
    label: "merge halves (size 8)",
    desc: "1 fully sorted array",
    detail: "Final merge of the two sorted halves costs O(8). Total across all 3 levels: O(n log n) = O(24) comparisons.",
    array: [1, 2, 3, 4, 5, 6, 7, 8],
    groups: [[0, 1, 2, 3, 4, 5, 6, 7]],
  },
]

export function DemoMergeSort() {
  const [activePhase, setActivePhase] = useState(0)
  const phase = PHASES[activePhase]

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          {/* Left — all phases stacked */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div
              className="flex-1 flex flex-col justify-center gap-5 p-4 sm:p-6"
              style={{ minHeight: 250 }}
            >
              {PHASES.map((p, pi) => {
                const isActive = pi === activePhase
                const isFuture = pi > activePhase
                return (
                  <button
                    key={pi}
                    onClick={() => setActivePhase(pi)}
                    className="flex items-center gap-3 text-left group"
                  >
                    {/* Phase label */}
                    <span
                      className={cn(
                        "font-mono text-[9px] w-24 shrink-0 text-right transition-colors",
                        isActive
                          ? "text-rurikon-600"
                          : isFuture
                          ? "text-rurikon-200"
                          : "text-rurikon-300"
                      )}
                    >
                      {pi === 0 ? "split" : `pass ${pi}`}
                    </span>

                    {/* Groups of elements */}
                    <div className="flex items-center gap-1">
                      {p.groups.map((group, gi) => {
                        const col = PALETTE[gi % PALETTE.length]
                        return (
                          <div key={gi} className="flex">
                            {group.map((idx, i) => (
                              <div
                                key={idx}
                                className={cn(
                                  "w-8 h-8 flex items-center justify-center font-mono text-xs font-medium border transition-all duration-300",
                                  isActive
                                    ? cn(col.bg, col.border, col.text)
                                    : isFuture
                                    ? "bg-rurikon-50/30 border-rurikon-border/20 text-rurikon-200"
                                    : "bg-rurikon-50/60 border-rurikon-border/40 text-rurikon-300",
                                  i > 0 ? "-ml-[1px]" : ""
                                )}
                              >
                                {p.array[idx]}
                              </div>
                            ))}
                          </div>
                        )
                      })}
                    </div>

                    {/* Sorted indicator */}
                    {p.groups.length === 1 && (
                      <span
                        className={cn(
                          "font-mono text-[9px] transition-colors",
                          isActive ? "text-[#3a6b1a]" : "text-rurikon-200"
                        )}
                      >
                        sorted ✓
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                divide &amp; conquer — bottom-up
              </span>
              <button
                onClick={() => setActivePhase((p) => Math.max(0, p - 1))}
                disabled={activePhase === 0}
                className={cn(
                  "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                  activePhase > 0
                    ? "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    : "border-rurikon-border text-rurikon-300 cursor-not-allowed"
                )}
              >
                ←
              </button>
              <button
                onClick={() => setActivePhase((p) => Math.min(PHASES.length - 1, p + 1))}
                disabled={activePhase === PHASES.length - 1}
                className={cn(
                  "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                  activePhase < PHASES.length - 1
                    ? "bg-rurikon-800 text-white border-rurikon-600"
                    : "border-rurikon-border text-rurikon-300 cursor-not-allowed"
                )}
              >
                →
              </button>
            </div>
          </div>

          {/* Right — phase selector + info */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                {PHASES.map((p, pi) => (
                  <button
                    key={pi}
                    onClick={() => setActivePhase(pi)}
                    className={cn(
                      "font-mono text-[11px] rounded px-2 py-1 border transition-colors text-left",
                      activePhase === pi
                        ? "bg-rurikon-800 text-white border-rurikon-600"
                        : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    )}
                  >
                    {pi === 0 ? "split" : `merge ×${p.groups.length}`}
                    <span
                      className={cn(
                        "ml-2 text-[10px]",
                        activePhase === pi ? "text-white/60" : "text-rurikon-300"
                      )}
                    >
                      {p.groups.length === 1
                        ? "n elements"
                        : `${p.array.length / p.groups.length} per group`}
                    </span>
                  </button>
                ))}
              </div>

              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-400">{"// log₂(8) = 3 levels"}</span>
                <br />
                <span className="text-[#5a9fd4]">level</span>
                {"  → "}
                <span className="text-[#9b72d4]">{activePhase}</span>
                <br />
                <span className="text-[#5a9fd4]">groups</span>
                {" → "}
                <span className="text-[#9b72d4]">{phase.groups.length}</span>
                <br />
                <span className="text-[#5a9fd4]">size</span>
                {"   → "}
                <span className="text-[#9b72d4]">
                  {phase.array.length / phase.groups.length}
                </span>
                <br />
                <span className="text-[#5a9fd4]">work</span>
                {"   → "}
                <span className="text-[#d4a96a]">O(n) this level</span>
              </div>

              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">{phase.desc}</span>
                <span className="text-xs text-rurikon-400 italic">{phase.detail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
