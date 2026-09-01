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
    id: "insertHead",
    label: "insertHead()",
    time: "O(1)",
    desc: "Create a node and point it to the current head. Set head = new node. No traversal.",
  },
  {
    id: "insertTail",
    label: "insertTail()",
    time: "O(n)",
    desc: "Traverse to the last node, then attach. O(1) if you maintain a dedicated tail pointer.",
  },
  {
    id: "removeHead",
    label: "removeHead()",
    time: "O(1)",
    desc: "Move head = head.next and release the old head. Immediate — no traversal needed.",
  },
  {
    id: "removeTail",
    label: "removeTail()",
    time: "O(n)",
    desc: "Traverse to second-to-last, then null its next pointer. O(1) only with a doubly linked list.",
  },
] as const

type OpId = (typeof OPS)[number]["id"]

interface LLNode {
  id: number
  value: string
  paletteIdx: number
}

const INITIAL_NODES: LLNode[] = ["A", "B", "C"].map((v, i) => ({
  id: i,
  value: v,
  paletteIdx: i % PALETTE.length,
}))

export function DemoLinkedList() {
  const [nodes, setNodes] = useState<LLNode[]>(INITIAL_NODES)
  const [selectedOp, setSelectedOp] = useState<OpId>("insertHead")
  const [litId, setLitId] = useState<number | null>(null)
  const nextId = useRef(INITIAL_NODES.length)
  const nextLetter = useRef(INITIAL_NODES.length)

  const op = OPS.find((o) => o.id === selectedOp)!

  function flash(id: number, then?: () => void) {
    setLitId(id)
    setTimeout(() => {
      setLitId(null)
      then?.()
    }, 500)
  }

  function doOp() {
    if (selectedOp === "insertHead") {
      if (nodes.length >= 7) return
      const node: LLNode = {
        id: nextId.current++,
        value: LETTERS[nextLetter.current % 26],
        paletteIdx: nextLetter.current % PALETTE.length,
      }
      nextLetter.current++
      setNodes((prev) => [node, ...prev])
      setTimeout(() => flash(node.id), 0)
    } else if (selectedOp === "insertTail") {
      if (nodes.length >= 7) return
      const node: LLNode = {
        id: nextId.current++,
        value: LETTERS[nextLetter.current % 26],
        paletteIdx: nextLetter.current % PALETTE.length,
      }
      nextLetter.current++
      setNodes((prev) => [...prev, node])
      setTimeout(() => flash(node.id), 0)
    } else if (selectedOp === "removeHead") {
      if (nodes.length === 0) return
      flash(nodes[0].id, () => setNodes((prev) => prev.slice(1)))
    } else if (selectedOp === "removeTail") {
      if (nodes.length === 0) return
      flash(nodes[nodes.length - 1].id, () => setNodes((prev) => prev.slice(0, -1)))
    }
  }

  const canRun =
    ((selectedOp === "insertHead" || selectedOp === "insertTail") && nodes.length < 7) ||
    ((selectedOp === "removeHead" || selectedOp === "removeTail") && nodes.length > 0)

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          {/* Left — linked list */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div
              className="flex-1 flex flex-col items-start justify-center p-4 sm:p-6 gap-2 overflow-x-auto"
              style={{ minHeight: 220 }}
            >
              {nodes.length > 0 && (
                <div className="flex flex-col gap-0">
                  <span className="font-mono text-[9px] text-rurikon-400">head</span>
                  <span className="font-mono text-[10px] text-rurikon-300">↓</span>
                </div>
              )}
              {nodes.length === 0 ? (
                <span className="text-xs text-rurikon-300 italic mx-auto">
                  list is empty — head = null
                </span>
              ) : (
                <div className="flex items-center flex-wrap gap-y-2">
                  {nodes.map((node, idx) => {
                    const isTail = idx === nodes.length - 1
                    const p = PALETTE[node.paletteIdx]
                    const isLit = litId === node.id
                    return (
                      <div key={node.id} className="flex items-center">
                        {/* Node: [val | ptr] */}
                        <div
                          className={cn(
                            "flex border transition-all duration-200",
                            isLit ? "border-rurikon-600" : p.border
                          )}
                        >
                          <div
                            className={cn(
                              "w-9 h-9 flex items-center justify-center font-mono text-sm font-medium transition-all duration-200",
                              isLit ? "bg-rurikon-800 text-white" : cn(p.bg, p.text)
                            )}
                          >
                            {node.value}
                          </div>
                          <div
                            className={cn(
                              "w-7 h-9 flex items-center justify-center border-l font-mono text-[10px] transition-all duration-200",
                              isLit
                                ? "border-rurikon-500 bg-rurikon-700 text-white/60"
                                : "border-rurikon-border/40 bg-rurikon-50/40 text-rurikon-300"
                            )}
                          >
                            {isTail ? "∅" : "→"}
                          </div>
                        </div>
                        {!isTail && (
                          <span className="text-rurikon-300 text-xs px-0.5">→</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
              {nodes.length > 0 && (
                <div className="flex justify-between w-full font-mono text-[9px] text-rurikon-300 mt-1">
                  <span>head: {nodes[0]?.value}</span>
                  <span>tail: {nodes[nodes.length - 1]?.value} → null</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                singly linked list
              </span>
              <button
                onClick={doOp}
                disabled={!canRun}
                className={cn(
                  "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                  canRun
                    ? "bg-rurikon-800 text-white border-rurikon-600"
                    : "border-rurikon-border text-rurikon-300 cursor-not-allowed"
                )}
              >
                run {op.label}
              </button>
              <button
                onClick={() => {
                  setNodes(INITIAL_NODES.map((n) => ({ ...n })))
                  nextLetter.current = INITIAL_NODES.length
                  nextId.current = INITIAL_NODES.length
                  setLitId(null)
                }}
                className="font-mono text-[11px] rounded px-2 py-1 border border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600 transition-colors"
              >
                reset
              </button>
            </div>
          </div>

          {/* Right — operations */}
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
