"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type Algo = "bubble" | "selection" | "insertion" | "merge" | "quick"

interface SortStep {
  array: number[]
  comparing: number[]
  swapping: number[]
  sorted: number[]
  description: string
}

// ── Step generators ──────────────────────────────────────────────

function bubbleSteps(initial: number[]): SortStep[] {
  const a = [...initial]
  const steps: SortStep[] = []
  const n = a.length
  const sortedSet = new Set<number>()

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sortedSet],
        description: `Compare a[${j}]=${a[j]} and a[${j + 1}]=${a[j + 1]}`,
      })
      if (a[j] > a[j + 1]) {
        const l = a[j], r = a[j + 1]
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        steps.push({
          array: [...a],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sortedSet],
          description: `Swap: ${l} > ${r} — bubble ${l} right`,
        })
      }
    }
    sortedSet.add(n - 1 - i)
  }
  sortedSet.add(0)
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sortedSet], description: "Array is sorted!" })
  return steps
}

function selectionSteps(initial: number[]): SortStep[] {
  const a = [...initial]
  const steps: SortStep[] = []
  const n = a.length
  const sortedSet = new Set<number>()

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...a],
        comparing: [j, minIdx],
        swapping: [],
        sorted: [...sortedSet],
        description: `Find min: a[${j}]=${a[j]} vs current min a[${minIdx}]=${a[minIdx]}`,
      })
      if (a[j] < a[minIdx]) minIdx = j
    }
    if (minIdx !== i) {
      const l = a[i], m = a[minIdx]
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sortedSet],
        description: `Place min ${m} at index ${i} (swapped with ${l})`,
      })
    } else {
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [...sortedSet],
        description: `a[${i}]=${a[i]} is already the minimum, no swap needed`,
      })
    }
    sortedSet.add(i)
  }
  sortedSet.add(n - 1)
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sortedSet], description: "Array is sorted!" })
  return steps
}

function insertionSteps(initial: number[]): SortStep[] {
  const a = [...initial]
  const steps: SortStep[] = []
  const n = a.length
  const sortedSet = new Set<number>([0])

  for (let i = 1; i < n; i++) {
    steps.push({
      array: [...a],
      comparing: [i],
      swapping: [],
      sorted: [...sortedSet],
      description: `Insert a[${i}]=${a[i]} into the sorted prefix`,
    })
    let j = i
    while (j > 0 && a[j - 1] > a[j]) {
      const l = a[j - 1], r = a[j]
      ;[a[j - 1], a[j]] = [a[j], a[j - 1]]
      j--
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [j, j + 1],
        sorted: [...sortedSet],
        description: `Shift: ${l} > ${r}, move ${l} one position right`,
      })
    }
    sortedSet.add(i)
  }
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sortedSet], description: "Array is sorted!" })
  return steps
}

function mergeSteps(initial: number[]): SortStep[] {
  const a = [...initial]
  const steps: SortStep[] = []
  const sortedSet = new Set<number>()

  function merge(lo: number, mid: number, hi: number) {
    const left = a.slice(lo, mid + 1)
    const right = a.slice(mid + 1, hi + 1)

    let i = 0, j = 0, k = lo
    while (i < left.length && j < right.length) {
      steps.push({
        array: [...a],
        comparing: [lo + i, mid + 1 + j],
        swapping: [],
        sorted: [...sortedSet],
        description: `Compare ${left[i]} (left) vs ${right[j]} (right)`,
      })
      if (left[i] <= right[j]) {
        a[k] = left[i++]
      } else {
        a[k] = right[j++]
      }
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [k],
        sorted: [...sortedSet],
        description: `Place ${a[k]} at index ${k}`,
      })
      k++
    }
    while (i < left.length) {
      a[k] = left[i++]
      steps.push({ array: [...a], comparing: [], swapping: [k], sorted: [...sortedSet], description: `Carry ${a[k]} → index ${k}` })
      k++
    }
    while (j < right.length) {
      a[k] = right[j++]
      steps.push({ array: [...a], comparing: [], swapping: [k], sorted: [...sortedSet], description: `Carry ${a[k]} → index ${k}` })
      k++
    }
    for (let x = lo; x <= hi; x++) sortedSet.add(x)
  }

  function ms(lo: number, hi: number) {
    if (lo >= hi) return
    const mid = Math.floor((lo + hi) / 2)
    ms(lo, mid)
    ms(mid + 1, hi)
    steps.push({
      array: [...a],
      comparing: Array.from({ length: hi - lo + 1 }, (_, x) => lo + x),
      swapping: [],
      sorted: [...sortedSet],
      description: `Merge [${lo}..${mid}] and [${mid + 1}..${hi}]`,
    })
    merge(lo, mid, hi)
  }

  ms(0, a.length - 1)
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sortedSet], description: "Array is sorted!" })
  return steps
}

function quickSteps(initial: number[]): SortStep[] {
  const a = [...initial]
  const steps: SortStep[] = []
  const sortedSet = new Set<number>()

  function partition(lo: number, hi: number): number {
    const pivot = a[hi]
    steps.push({
      array: [...a],
      comparing: [hi],
      swapping: [],
      sorted: [...sortedSet],
      description: `Pivot = a[${hi}] = ${pivot}`,
    })
    let i = lo - 1
    for (let j = lo; j < hi; j++) {
      steps.push({
        array: [...a],
        comparing: [j, hi],
        swapping: [],
        sorted: [...sortedSet],
        description: `a[${j}]=${a[j]} ≤ pivot ${pivot}? ${a[j] <= pivot ? "yes — swap in" : "no — skip"}`,
      })
      if (a[j] <= pivot) {
        i++
        if (i !== j) {
          const oi = a[i], oj = a[j]
          ;[a[i], a[j]] = [a[j], a[i]]
          steps.push({
            array: [...a],
            comparing: [],
            swapping: [i, j],
            sorted: [...sortedSet],
            description: `Swap ${oi} and ${oj}`,
          })
        }
      }
    }
    const pFinal = i + 1
    if (pFinal !== hi) {
      const op = a[hi], opf = a[pFinal]
      ;[a[pFinal], a[hi]] = [a[hi], a[pFinal]]
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [pFinal, hi],
        sorted: [...sortedSet],
        description: `Place pivot ${op} at final index ${pFinal} (moved ${opf})`,
      })
    }
    sortedSet.add(pFinal)
    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      sorted: [...sortedSet],
      description: `Pivot ${pivot} is in its final position at index ${pFinal}`,
    })
    return pFinal
  }

  function qs(lo: number, hi: number) {
    if (lo > hi) return
    if (lo === hi) {
      sortedSet.add(lo)
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [...sortedSet],
        description: `Single element a[${lo}]=${a[lo]} is trivially sorted`,
      })
      return
    }
    const p = partition(lo, hi)
    qs(lo, p - 1)
    qs(p + 1, hi)
  }

  qs(0, a.length - 1)
  for (let i = 0; i < a.length; i++) sortedSet.add(i)
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sortedSet], description: "Array is sorted!" })
  return steps
}

function generateSteps(algo: Algo, arr: number[]): SortStep[] {
  switch (algo) {
    case "bubble":    return bubbleSteps(arr)
    case "selection": return selectionSteps(arr)
    case "insertion": return insertionSteps(arr)
    case "merge":     return mergeSteps(arr)
    case "quick":     return quickSteps(arr)
  }
}

// ── Algorithm metadata ───────────────────────────────────────────

const ALGO_INFO: Record<
  Algo,
  { name: string; best: string; avg: string; worst: string; space: string; stable: boolean; desc: string }
> = {
  bubble: {
    name: "Bubble Sort",
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: true,
    desc: "Compare adjacent pairs and swap if out of order. The largest element bubbles to the end each pass.",
  },
  selection: {
    name: "Selection Sort",
    best: "O(n²)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: false,
    desc: "Find the minimum in the unsorted portion and place it at the boundary. Always O(n²) regardless of input.",
  },
  insertion: {
    name: "Insertion Sort",
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: true,
    desc: "Build a sorted prefix by inserting each element into the correct position via left-shifting.",
  },
  merge: {
    name: "Merge Sort",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    stable: true,
    desc: "Divide and conquer: recursively split in half, sort each half, then merge.",
  },
  quick: {
    name: "Quick Sort",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    stable: false,
    desc: "Pick a pivot, partition elements around it, recursively sort the two partitions.",
  },
}

const MAX_BAR_H = 156
const INITIAL_ARRAY = [7, 3, 5, 1, 8, 2, 6, 4]

// ── Component ────────────────────────────────────────────────────

export function DemoSortVisualizer() {
  const [algo, setAlgo] = useState<Algo>("bubble")
  const [sourceArr, setSourceArr] = useState(INITIAL_ARRAY)
  const [steps, setSteps] = useState<SortStep[]>(() => generateSteps("bubble", INITIAL_ARRAY))
  const [stepIdx, setStepIdx] = useState(0)
  const [playing, setPlaying] = useState(false)

  function reset(newAlgo: Algo, arr = sourceArr) {
    setPlaying(false)
    setAlgo(newAlgo)
    setSteps(generateSteps(newAlgo, arr))
    setStepIdx(0)
  }

  function shuffle() {
    const newArr = [...sourceArr].sort(() => Math.random() - 0.5)
    setSourceArr(newArr)
    setPlaying(false)
    setSteps(generateSteps(algo, newArr))
    setStepIdx(0)
  }

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= steps.length - 1) {
          setPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 380)
    return () => clearInterval(id)
  }, [playing, steps.length])

  const step = steps[stepIdx] ?? {
    array: sourceArr,
    comparing: [],
    swapping: [],
    sorted: [],
    description: "",
  }
  const info = ALGO_INFO[algo]
  const maxVal = Math.max(...step.array)
  const isFinished = stepIdx === steps.length - 1

  function barColor(idx: number): string {
    if (step.swapping.includes(idx)) return "bg-[#f5dce8] border-[#d45a9f]"
    if (step.comparing.includes(idx)) return "bg-[#f5e8dc] border-[#d4a96a]"
    if (step.sorted.includes(idx)) return "bg-[#dce8dc] border-[#7aab4e]"
    return "bg-[#dce8f5] border-[#5a9fd4]"
  }

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          {/* Left — bar chart + controls */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div
              className="flex-1 flex items-end justify-center gap-2 px-6 pb-4 pt-6"
              style={{ minHeight: 210 }}
            >
              {step.array.map((val, idx) => {
                const h = (val / maxVal) * MAX_BAR_H
                return (
                  <div key={idx} className="flex flex-col items-center gap-0.5">
                    <span className="font-mono text-[9px] text-rurikon-400">{val}</span>
                    <div
                      className={cn("w-8 border transition-all duration-200", barColor(idx))}
                      style={{ height: h }}
                    />
                    <span className="font-mono text-[9px] text-rurikon-300">{idx}</span>
                  </div>
                )
              })}
            </div>

            {/* Step description strip */}
            <div className="px-4 py-2 border-t border-rurikon-border/40 min-h-[2rem] flex items-center">
              <span className="font-mono text-[11px] text-rurikon-500">{step.description}</span>
            </div>

            {/* Footer controls */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                step {stepIdx + 1} / {steps.length}
              </span>
              <button
                onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
                disabled={stepIdx === 0 || playing}
                className={cn(
                  "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                  stepIdx > 0 && !playing
                    ? "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    : "border-rurikon-border text-rurikon-300 cursor-not-allowed"
                )}
              >
                ←
              </button>
              <button
                onClick={() => {
                  if (isFinished) {
                    reset(algo)
                  } else {
                    setPlaying((p) => !p)
                  }
                }}
                className={cn(
                  "font-mono text-[11px] rounded px-2.5 py-1 border transition-colors",
                  isFinished
                    ? "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    : "bg-rurikon-800 text-white border-rurikon-600"
                )}
              >
                {isFinished ? "restart" : playing ? "pause" : "play"}
              </button>
              <button
                onClick={() => setStepIdx((i) => Math.min(steps.length - 1, i + 1))}
                disabled={isFinished || playing}
                className={cn(
                  "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                  !isFinished && !playing
                    ? "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    : "border-rurikon-border text-rurikon-300 cursor-not-allowed"
                )}
              >
                →
              </button>
              <button
                onClick={shuffle}
                disabled={playing}
                className={cn(
                  "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                  !playing
                    ? "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    : "border-rurikon-border text-rurikon-300 cursor-not-allowed"
                )}
              >
                shuffle
              </button>
            </div>
          </div>

          {/* Right — algo selector + info */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* Algorithm selector */}
              <div className="flex flex-col gap-1.5">
                {(Object.keys(ALGO_INFO) as Algo[]).map((a) => (
                  <button
                    key={a}
                    onClick={() => reset(a)}
                    className={cn(
                      "font-mono text-[11px] rounded px-2 py-1 border transition-colors text-left",
                      algo === a
                        ? "bg-rurikon-800 text-white border-rurikon-600"
                        : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    )}
                  >
                    {ALGO_INFO[a].name}
                    <span
                      className={cn(
                        "ml-2 text-[10px]",
                        algo === a ? "text-white/60" : "text-rurikon-300"
                      )}
                    >
                      {ALGO_INFO[a].avg}
                    </span>
                  </button>
                ))}
              </div>

              {/* Complexity */}
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-400">{"// time complexity"}</span>
                <br />
                <span className="text-[#5a9fd4]">best </span>
                {"→ "}
                <span className="text-[#7aab4e]">{info.best}</span>
                <br />
                <span className="text-[#5a9fd4]">avg  </span>
                {"→ "}
                <span className="text-[#9b72d4]">{info.avg}</span>
                <br />
                <span className="text-[#5a9fd4]">worst</span>
                {"→ "}
                <span className="text-[#d45a9f]">{info.worst}</span>
                <br />
                <span className="text-[#5a9fd4]">space</span>
                {"→ "}
                <span className="text-[#d4a96a]">{info.space}</span>
              </div>

              {/* Description */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">{info.name}</span>
                <span className="text-xs text-rurikon-500">
                  {info.stable ? "stable sort" : "not stable"}
                </span>
                <span className="text-xs text-rurikon-400 italic">{info.desc}</span>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {[
                  { label: "default", cls: "bg-[#dce8f5] border-[#5a9fd4]" },
                  { label: "comparing", cls: "bg-[#f5e8dc] border-[#d4a96a]" },
                  { label: "swapping", cls: "bg-[#f5dce8] border-[#d45a9f]" },
                  { label: "sorted", cls: "bg-[#dce8dc] border-[#7aab4e]" },
                ].map(({ label, cls }) => (
                  <div key={label} className="flex items-center gap-1">
                    <div className={cn("w-3 h-3 border", cls)} />
                    <span className="font-mono text-[9px] text-rurikon-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
