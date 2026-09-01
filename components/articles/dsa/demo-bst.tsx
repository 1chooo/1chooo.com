"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"

interface BSTNode {
  val: number
  left: BSTNode | null
  right: BSTNode | null
}

function bstInsert(root: BSTNode | null, val: number): BSTNode {
  if (!root) return { val, left: null, right: null }
  if (val < root.val) return { ...root, left: bstInsert(root.left, val) }
  if (val > root.val) return { ...root, right: bstInsert(root.right, val) }
  return root
}

function bstSearchPath(root: BSTNode | null, val: number): number[] {
  const path: number[] = []
  let cur = root
  while (cur) {
    path.push(cur.val)
    if (val === cur.val) break
    cur = val < cur.val ? cur.left : cur.right
  }
  return path
}

interface LayoutItem {
  val: number
  gridX: number
  gridY: number
}

interface LayoutEdge {
  fromVal: number
  toVal: number
}

function computeLayout(root: BSTNode | null): { items: LayoutItem[]; edges: LayoutEdge[] } {
  const items: LayoutItem[] = []
  const edges: LayoutEdge[] = []
  const counter = { n: 0 }

  function traverse(node: BSTNode | null, depth: number, parentVal: number | null): void {
    if (!node) return
    traverse(node.left, depth + 1, node.val)
    items.push({ val: node.val, gridX: counter.n++, gridY: depth })
    if (parentVal !== null) edges.push({ fromVal: parentVal, toVal: node.val })
    traverse(node.right, depth + 1, node.val)
  }

  traverse(root, 0, null)
  return { items, edges }
}

function buildDefaultTree(): BSTNode | null {
  let root: BSTNode | null = null
  for (const v of [8, 4, 12, 2, 6, 10, 14]) {
    root = bstInsert(root, v)
  }
  return root
}

const NODE_W = 44
const LEVEL_H = 52
const PAD = 20
const R = 15

export function DemoBST() {
  const [tree, setTree] = useState<BSTNode | null>(buildDefaultTree)
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"insert" | "search">("insert")
  const [searchPath, setSearchPath] = useState<Set<number>>(new Set())
  const [foundVal, setFoundVal] = useState<number | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const { items, edges } = useMemo(() => computeLayout(tree), [tree])

  const posMap = useMemo(() => {
    const m = new Map<number, { x: number; y: number }>()
    for (const item of items) {
      m.set(item.val, { x: item.gridX * NODE_W + PAD, y: item.gridY * LEVEL_H + PAD })
    }
    return m
  }, [items])

  const svgW = items.length > 0 ? Math.max(...items.map((i) => i.gridX)) * NODE_W + PAD * 2 : 60
  const svgH = items.length > 0 ? Math.max(...items.map((i) => i.gridY)) * LEVEL_H + PAD * 2 : 60
  const treeHeight = items.length > 0 ? Math.max(...items.map((i) => i.gridY)) : 0

  function doAction() {
    const val = parseInt(input)
    if (isNaN(val) || val < 1 || val > 99) return
    setInput("")
    setSearchPath(new Set())
    setFoundVal(null)
    setMessage(null)

    if (mode === "insert") {
      setTree((prev) => bstInsert(prev, val))
      setMessage(`inserted ${val}`)
      setTimeout(() => setMessage(null), 1500)
    } else {
      const path = bstSearchPath(tree, val)
      const found = path.length > 0 && path[path.length - 1] === val
      setSearchPath(new Set(path))
      setFoundVal(found ? val : null)
      const steps = path.length
      setMessage(
        found
          ? `found ${val} after ${steps} step${steps !== 1 ? "s" : ""}`
          : `${val} not found — searched ${steps} node${steps !== 1 ? "s" : ""}`
      )
      setTimeout(() => {
        setSearchPath(new Set())
        setFoundVal(null)
        setMessage(null)
      }, 2200)
    }
  }

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          {/* Left — tree */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div
              className="flex-1 flex items-center justify-center p-4 overflow-auto"
              style={{ minHeight: 240 }}
            >
              {tree === null ? (
                <span className="text-xs text-rurikon-300 italic">tree is empty — insert a value</span>
              ) : (
                <svg
                  width={svgW}
                  height={svgH}
                  viewBox={`0 0 ${svgW} ${svgH}`}
                  style={{ minWidth: Math.min(svgW, 300) }}
                >
                  {edges.map((edge, i) => {
                    const from = posMap.get(edge.fromVal)
                    const to = posMap.get(edge.toVal)
                    if (!from || !to) return null
                    const onPath =
                      searchPath.has(edge.fromVal) && searchPath.has(edge.toVal)
                    return (
                      <line
                        key={i}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={onPath ? "#5a9fd4" : "#d9d3c8"}
                        strokeWidth={onPath ? 2 : 1.5}
                      />
                    )
                  })}
                  {items.map((item) => {
                    const p = posMap.get(item.val)
                    if (!p) return null
                    const onPath = searchPath.has(item.val)
                    const isFound = foundVal === item.val
                    const fill = isFound ? "#1a5a8b" : onPath ? "#dce8f5" : "#fefefe"
                    const stroke = isFound ? "#1a5a8b" : onPath ? "#5a9fd4" : "#d9d3c8"
                    const textFill = isFound ? "white" : onPath ? "#1a5a8b" : "#6b6053"
                    return (
                      <g key={item.val}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={R}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={onPath || isFound ? 2 : 1.5}
                        />
                        <text
                          x={p.x}
                          y={p.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={11}
                          fontFamily="monospace"
                          fill={textFill}
                        >
                          {item.val}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              )}
            </div>
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                {message ?? "binary search tree"}
              </span>
              <button
                onClick={() => {
                  setTree(buildDefaultTree())
                  setSearchPath(new Set())
                  setFoundVal(null)
                  setMessage(null)
                  setInput("")
                }}
                className="font-mono text-[11px] rounded px-2 py-1 border border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600 transition-colors"
              >
                reset
              </button>
            </div>
          </div>

          {/* Right — controls */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className="flex gap-1.5">
                {(["insert", "search"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m)
                      setSearchPath(new Set())
                      setFoundVal(null)
                      setMessage(null)
                    }}
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
              <div className="flex gap-1.5">
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && doAction()}
                  placeholder="1–99"
                  className="flex-1 font-mono text-xs border border-rurikon-border px-2 py-1.5 bg-[#fefefe] text-rurikon-700 placeholder:text-rurikon-300 outline-none focus:border-rurikon-400"
                />
                <button
                  onClick={doAction}
                  className="font-mono text-[11px] rounded px-2.5 py-1.5 border transition-colors bg-rurikon-800 text-white border-rurikon-600 hover:bg-rurikon-700"
                >
                  {mode}
                </button>
              </div>
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                {mode === "insert" ? (
                  <>
                    <span className="text-rurikon-400">{"// avg case"}</span>
                    <br />
                    <span className="text-[#5a9fd4]">insert</span>
                    {"(n) → "}
                    <span className="text-[#9b72d4]">O(log n)</span>
                    <br />
                    <span className="text-rurikon-400">{"// worst (sorted input)"}</span>
                    <br />
                    <span className="text-[#5a9fd4]">insert</span>
                    {"(n) → "}
                    <span className="text-[#d45a9f]">O(n)</span>
                  </>
                ) : (
                  <>
                    <span className="text-rurikon-400">{"// avg case"}</span>
                    <br />
                    <span className="text-[#5a9fd4]">search</span>
                    {"(n) → "}
                    <span className="text-[#9b72d4]">O(log n)</span>
                    <br />
                    <span className="text-rurikon-400">{"// go left if val < node"}</span>
                    <br />
                    <span className="text-rurikon-400">{"// go right if val > node"}</span>
                  </>
                )}
              </div>
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">BST invariant</span>
                <span className="text-xs text-rurikon-500">
                  left &lt; node.val &lt; right at every node
                </span>
                <span className="text-xs text-rurikon-400 italic">
                  {items.length} node{items.length !== 1 ? "s" : ""} — height {treeHeight}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
