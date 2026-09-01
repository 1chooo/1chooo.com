"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

const PALETTE = [
  { bg: "bg-[#dce8f5]", border: "border-[#5a9fd4]", text: "text-[#1a5a8b]" },
  { bg: "bg-[#dce8dc]", border: "border-[#7aab4e]", text: "text-[#3a6b1a]" },
  { bg: "bg-[#f5e8dc]", border: "border-[#d4a96a]", text: "text-[#8b6914]" },
  { bg: "bg-[#ecdcf5]", border: "border-[#9b72d4]", text: "text-[#5a1a8b]" },
  { bg: "bg-[#f5dce8]", border: "border-[#d45a9f]", text: "text-[#8b1a5a]" },
  { bg: "bg-[#dcf5f0]", border: "border-[#4ed4b8]", text: "text-[#1a8b72]" },
]

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const OPS = [
  {
    id: "push",
    label: "push()",
    time: "O(1)*",
    desc: "Append to end. No existing elements shift. Amortized O(1) — occasional backing-array resize is amortized across all inserts.",
  },
  {
    id: "pop",
    label: "pop()",
    time: "O(1)",
    desc: "Remove last element. No shifting — just decrement the length counter.",
  },
  {
    id: "unshift",
    label: "unshift()",
    time: "O(n)",
    desc: "Prepend to start. Every existing element must shift one index to the right.",
  },
  {
    id: "shift",
    label: "shift()",
    time: "O(n)",
    desc: "Remove first element. Every remaining element must shift one index to the left.",
  },
  {
    id: "access",
    label: "arr[i]",
    time: "O(1)",
    desc: "Read by index. Base address + offset calculation — always instant regardless of array size.",
  },
] as const

type OpId = (typeof OPS)[number]["id"]

interface Cell {
  id: number
  value: string
  paletteIdx: number
}

const INITIAL_CELLS: Cell[] = ["A", "B", "C", "D"].map((v, i) => ({
  id: i,
  value: v,
  paletteIdx: i % PALETTE.length,
}))

export function DemoArray() {
  const [cells, setCells] = useState<Cell[]>(INITIAL_CELLS)
  const [selectedOp, setSelectedOp] = useState<OpId>("push")
  const [highlighted, setHighlighted] = useState<number | null>(null)
  const nextId = useRef(INITIAL_CELLS.length)
  const nextLetter = useRef(INITIAL_CELLS.length)

  const op = OPS.find((o) => o.id === selectedOp)!

  function flashIdx(idx: number, then?: () => void) {
    setHighlighted(idx)
    setTimeout(() => {
      setHighlighted(null)
      then?.()
    }, 500)
  }

  function doOp() {
    if (selectedOp === "push") {
      if (cells.length >= 8) return
      const newIdx = cells.length
      const cell: Cell = {
        id: nextId.current++,
        value: LETTERS[nextLetter.current % 26],
        paletteIdx: nextLetter.current % PALETTE.length,
      }
      nextLetter.current++
      setCells((prev) => [...prev, cell])
      setTimeout(() => flashIdx(newIdx), 0)
    } else if (selectedOp === "pop") {
      if (cells.length === 0) return
      flashIdx(cells.length - 1, () => setCells((prev) => prev.slice(0, -1)))
    } else if (selectedOp === "unshift") {
      if (cells.length >= 8) return
      const cell: Cell = {
        id: nextId.current++,
        value: LETTERS[nextLetter.current % 26],
        paletteIdx: nextLetter.current % PALETTE.length,
      }
      nextLetter.current++
      setCells((prev) => [cell, ...prev])
      setTimeout(() => flashIdx(0), 0)
    } else if (selectedOp === "shift") {
      if (cells.length === 0) return
      flashIdx(0, () => setCells((prev) => prev.slice(1)))
    } else if (selectedOp === "access") {
      if (cells.length === 0) return
      flashIdx(Math.floor(Math.random() * cells.length))
    }
  }

  const canRun =
    ((selectedOp === "push" || selectedOp === "unshift") && cells.length < 8) ||
    ((selectedOp === "pop" || selectedOp === "shift") && cells.length > 0) ||
    (selectedOp === "access" && cells.length > 0)

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          {/* Left — array visualization */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div
              className="flex-1 flex flex-col items-center justify-center gap-3 p-4 sm:p-6"
              style={{ minHeight: 200 }}
            >
              {cells.length === 0 ? (
                <span className="text-xs text-rurikon-300 italic">array is empty</span>
              ) : (
                <div className="flex items-end gap-1 flex-wrap justify-center">
                  {cells.map((cell, idx) => {
                    const p = PALETTE[cell.paletteIdx]
                    const isLit = highlighted === idx
                    return (
                      <div key={cell.id} className="flex flex-col items-center gap-0.5">
                        <div
                          className={cn(
                            "w-10 h-10 flex items-center justify-center border font-mono text-sm font-medium transition-all duration-200",
                            isLit
                              ? "bg-rurikon-800 text-white border-rurikon-600 scale-110"
                              : cn(p.bg, p.border, p.text)
                          )}
                        >
                          {cell.value}
                        </div>
                        <span className="font-mono text-[10px] text-rurikon-300">{idx}</span>
                      </div>
                    )
                  })}
                </div>
              )}
              <span className="font-mono text-[10px] text-rurikon-300">
                length: {cells.length}
              </span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                array explorer
              </span>
              <button
                onClick={doOp}
                disabled={!canRun}
                className={cn(
                  "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                  canRun
                    ? "bg-rurikon-800 text-white border-rurikon-600 hover:bg-rurikon-700"
                    : "border-rurikon-border text-rurikon-300 cursor-not-allowed"
                )}
              >
                run {op.label}
              </button>
              <button
                onClick={() => {
                  setCells(INITIAL_CELLS.map((c) => ({ ...c })))
                  nextLetter.current = INITIAL_CELLS.length
                  nextId.current = INITIAL_CELLS.length
                  setHighlighted(null)
                }}
                className="font-mono text-[11px] rounded px-2 py-1 border border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600 transition-colors"
              >
                reset
              </button>
            </div>
          </div>

          {/* Right — operation selector */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                {OPS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setSelectedOp(o.id)}
                    className={cn(
                      "font-mono text-[11px] rounded px-2 py-1 border transition-colors text-left",
                      selectedOp === o.id
                        ? "bg-rurikon-800 text-white border-rurikon-600"
                        : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    )}
                  >
                    {o.label}
                    <span
                      className={cn(
                        "ml-2 text-[10px]",
                        selectedOp === o.id ? "text-white/60" : "text-rurikon-300"
                      )}
                    >
                      {o.time}
                    </span>
                  </button>
                ))}
              </div>
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">
                  {op.label} — {op.time}
                </span>
                <span className="text-xs text-rurikon-400 italic">{op.desc}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
