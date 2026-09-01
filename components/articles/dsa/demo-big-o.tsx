"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const COMPLEXITIES = [
  {
    id: "o1",
    label: "O(1)",
    name: "Constant",
    example: "Array index access, hash lookup",
    detail: "Execution time does not grow with input",
    fn: (_n: number) => 1,
    bg: "bg-[#dce8dc]",
    border: "border-[#7aab4e]",
  },
  {
    id: "ologn",
    label: "O(log n)",
    name: "Logarithmic",
    example: "Binary search, BST operations",
    detail: "Halves the problem space each step",
    fn: (n: number) => Math.log2(n + 1),
    bg: "bg-[#dce8f5]",
    border: "border-[#5a9fd4]",
  },
  {
    id: "on",
    label: "O(n)",
    name: "Linear",
    example: "Array traversal, linear search",
    detail: "Grows proportionally with input size",
    fn: (n: number) => n,
    bg: "bg-[#f5e8dc]",
    border: "border-[#d4a96a]",
  },
  {
    id: "onlogn",
    label: "O(n log n)",
    name: "Linearithmic",
    example: "Merge sort, heap sort",
    detail: "Optimal lower bound for comparison sorts",
    fn: (n: number) => n * Math.log2(n + 1),
    bg: "bg-[#ecdcf5]",
    border: "border-[#9b72d4]",
  },
  {
    id: "on2",
    label: "O(n²)",
    name: "Quadratic",
    example: "Bubble sort, nested loops",
    detail: "Nested iteration — scales very poorly",
    fn: (n: number) => n * n,
    bg: "bg-[#f5dce8]",
    border: "border-[#d45a9f]",
  },
]

const N_VALUES = [1, 2, 4, 8, 16]
const MAX_BAR_H = 140

export function DemoBigO() {
  const [selId, setSelId] = useState("on")
  const sel = COMPLEXITIES.find((c) => c.id === selId)!
  const raws = N_VALUES.map((n) => sel.fn(n))
  const maxRaw = Math.max(...raws)

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          {/* Left — bar chart */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div
              className="flex-1 flex items-end justify-center gap-4 px-6 pb-4 pt-8"
              style={{ minHeight: 220 }}
            >
              {N_VALUES.map((n, i) => {
                const raw = raws[i]
                const h = maxRaw > 0 ? (raw / maxRaw) * MAX_BAR_H : 4
                const label = raw < 10 ? raw.toFixed(1) : Math.round(raw).toString()
                return (
                  <div key={n} className="flex flex-col items-center gap-1">
                    <span className="font-mono text-[9px] text-rurikon-400 mb-0.5">{label}</span>
                    <div
                      className={cn("w-9 border transition-all duration-500", sel.bg, sel.border)}
                      style={{ height: Math.max(h, 4) }}
                    />
                    <span className="font-mono text-[10px] text-rurikon-400">n={n}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                operations as n grows
              </span>
            </div>
          </div>

          {/* Right — selector + info */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                {COMPLEXITIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelId(c.id)}
                    className={cn(
                      "font-mono text-[11px] rounded px-2 py-1 border transition-colors text-left",
                      selId === c.id
                        ? "bg-rurikon-800 text-white border-rurikon-600"
                        : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    )}
                  >
                    {c.label} — {c.name}
                  </button>
                ))}
              </div>
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">
                  {sel.label} — {sel.name}
                </span>
                <span className="text-xs text-rurikon-500">{sel.example}</span>
                <span className="text-xs text-rurikon-400 italic">{sel.detail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
