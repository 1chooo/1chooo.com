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

type Mode = "stack" | "queue"

interface Item {
  id: number
  value: string
  paletteIdx: number
}

const INITIAL_ITEMS: Item[] = ["A", "B", "C"].map((v, i) => ({
  id: i,
  value: v,
  paletteIdx: i % PALETTE.length,
}))

export function DemoStackQueue() {
  const [mode, setMode] = useState<Mode>("stack")
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS)
  const [litIdx, setLitIdx] = useState<number | null>(null)
  const nextId = useRef(INITIAL_ITEMS.length)
  const nextLetter = useRef(INITIAL_ITEMS.length)

  function flash(idx: number, then?: () => void) {
    setLitIdx(idx)
    setTimeout(() => {
      setLitIdx(null)
      then?.()
    }, 450)
  }

  function add() {
    if (items.length >= 6) return
    const item: Item = {
      id: nextId.current++,
      value: LETTERS[nextLetter.current % 26],
      paletteIdx: nextLetter.current % PALETTE.length,
    }
    nextLetter.current++
    const newIdx = items.length
    setItems((prev) => [...prev, item])
    setTimeout(() => flash(newIdx), 0)
  }

  function remove() {
    if (items.length === 0) return
    if (mode === "stack") {
      flash(items.length - 1, () => setItems((prev) => prev.slice(0, -1)))
    } else {
      flash(0, () => setItems((prev) => prev.slice(1)))
    }
  }

  function resetTo(m: Mode) {
    setMode(m)
    setItems(INITIAL_ITEMS.map((i) => ({ ...i })))
    nextLetter.current = INITIAL_ITEMS.length
    nextId.current = INITIAL_ITEMS.length
    setLitIdx(null)
  }

  const addLabel = mode === "stack" ? "push()" : "enqueue()"
  const removeLabel = mode === "stack" ? "pop()" : "dequeue()"
  const displayItems = mode === "stack" ? [...items].reverse() : items

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          {/* Left — visualization */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div
              className="flex-1 flex items-center justify-center p-4 sm:p-6"
              style={{ minHeight: 240 }}
            >
              {mode === "stack" ? (
                <div className="flex flex-col items-center gap-1 w-full max-w-44">
                  {items.length === 0 ? (
                    <span className="text-xs text-rurikon-300 italic">stack is empty</span>
                  ) : (
                    displayItems.map((item, dispIdx) => {
                      const isTop = dispIdx === 0
                      const origIdx = items.length - 1 - dispIdx
                      const p = PALETTE[item.paletteIdx]
                      const isLit = litIdx === origIdx
                      return (
                        <div key={item.id} className="flex items-center gap-2 w-full">
                          <span className="font-mono text-[9px] text-rurikon-300 w-10 text-right shrink-0">
                            {isTop ? "top →" : ""}
                          </span>
                          <div
                            className={cn(
                              "flex-1 h-9 flex items-center justify-center border font-mono text-sm font-medium transition-all duration-200",
                              isLit
                                ? "bg-rurikon-800 text-white border-rurikon-600"
                                : cn(p.bg, p.border, p.text)
                            )}
                          >
                            {item.value}
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  {items.length === 0 ? (
                    <span className="text-xs text-rurikon-300 italic">queue is empty</span>
                  ) : (
                    <>
                      <div className="flex items-center gap-1">
                        {displayItems.map((item, dispIdx) => {
                          const isFront = dispIdx === 0
                          const isRear = dispIdx === items.length - 1
                          const p = PALETTE[item.paletteIdx]
                          const isLit = litIdx === dispIdx
                          return (
                            <div key={item.id} className="flex flex-col items-center gap-0.5">
                              <div
                                className={cn(
                                  "w-10 h-10 flex items-center justify-center border font-mono text-sm font-medium transition-all duration-200",
                                  isLit
                                    ? "bg-rurikon-800 text-white border-rurikon-600"
                                    : cn(p.bg, p.border, p.text)
                                )}
                              >
                                {item.value}
                              </div>
                              <span className="font-mono text-[9px] text-rurikon-300">
                                {isFront ? "front" : isRear ? "rear" : ""}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                      <div className="flex items-center gap-12 font-mono text-[9px] text-rurikon-300">
                        <span>← dequeue</span>
                        <span>enqueue →</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                {mode === "stack" ? "LIFO — last in, first out" : "FIFO — first in, first out"}
              </span>
              <button
                onClick={add}
                disabled={items.length >= 6}
                className={cn(
                  "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                  items.length < 6
                    ? "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    : "border-rurikon-border text-rurikon-300 cursor-not-allowed"
                )}
              >
                {addLabel}
              </button>
              <button
                onClick={remove}
                disabled={items.length === 0}
                className={cn(
                  "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                  items.length > 0
                    ? "bg-rurikon-800 text-white border-rurikon-600"
                    : "border-rurikon-border text-rurikon-300 cursor-not-allowed"
                )}
              >
                {removeLabel}
              </button>
            </div>
          </div>

          {/* Right — mode + info */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className="flex gap-1.5">
                {(["stack", "queue"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => resetTo(m)}
                    className={cn(
                      "flex-1 text-xs rounded px-2.5 py-1.5 border transition-colors",
                      mode === m
                        ? "bg-rurikon-800 text-white border-rurikon-600"
                        : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                {mode === "stack" ? (
                  <>
                    <span className="text-[#5a9fd4]">push</span>
                    {"(x) → "}
                    <span className="text-[#9b72d4]">O(1)</span>
                    <br />
                    <span className="text-[#5a9fd4]">pop</span>
                    {"() → "}
                    <span className="text-[#9b72d4]">O(1)</span>
                    <br />
                    <span className="text-[#5a9fd4]">peek</span>
                    {"() → "}
                    <span className="text-[#9b72d4]">O(1)</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#5a9fd4]">enqueue</span>
                    {"(x) → "}
                    <span className="text-[#9b72d4]">O(1)</span>
                    <br />
                    <span className="text-[#5a9fd4]">dequeue</span>
                    {"() → "}
                    <span className="text-[#9b72d4]">O(1)*</span>
                    <br />
                    <span className="text-[#5a9fd4]">peek</span>
                    {"() → "}
                    <span className="text-[#9b72d4]">O(1)</span>
                  </>
                )}
              </div>
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">
                  {mode === "stack" ? "stack" : "queue"}
                </span>
                <span className="text-xs text-rurikon-500">
                  {mode === "stack"
                    ? "LIFO — last item added is first out"
                    : "FIFO — first item added is first out"}
                </span>
                <span className="text-xs text-rurikon-400 italic">
                  {mode === "stack"
                    ? "Uses: undo history, call stack, DFS"
                    : "Uses: BFS, task scheduling, event queues"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
