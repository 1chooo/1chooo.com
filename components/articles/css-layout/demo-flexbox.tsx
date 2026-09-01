"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type FlexDir = "row" | "row-reverse" | "column" | "column-reverse"
type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse"

const ITEMS = [
  { id: 1, label: "A", w: 60, h: 40 },
  { id: 2, label: "B", w: 80, h: 60 },
  { id: 3, label: "C", w: 50, h: 50 },
  { id: 4, label: "D", w: 70, h: 35 },
]

const ITEM_COLORS = [
  "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
  "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]",
  "bg-[#f5e8dc] border-[#d4a96a] text-[#8b6914]",
  "bg-[#ecdcf5] border-[#9b72d4] text-[#5a1a8b]",
]

export function DemoFlexbox() {
  const [flexDir, setFlexDir] = useState<FlexDir>("row")
  const [justify, setJustify] = useState<JustifyContent>("flex-start")
  const [alignItems, setAlignItems] = useState<AlignItems>("flex-start")
  const [flexWrap, setFlexWrap] = useState<FlexWrap>("nowrap")

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: flexDir,
    justifyContent: justify,
    alignItems: alignItems,
    flexWrap: flexWrap,
    gap: 8,
    minHeight: 160,
    padding: 12,
  }

  const controls: {
    label: string
    options: string[]
    value: string
    set: (v: string) => void
  }[] = [
    {
      label: "flex-direction",
      options: ["row", "row-reverse", "column", "column-reverse"],
      value: flexDir,
      set: (v) => setFlexDir(v as FlexDir),
    },
    {
      label: "justify-content",
      options: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
      value: justify,
      set: (v) => setJustify(v as JustifyContent),
    },
    {
      label: "align-items",
      options: ["flex-start", "flex-end", "center", "stretch", "baseline"],
      value: alignItems,
      set: (v) => setAlignItems(v as AlignItems),
    },
    {
      label: "flex-wrap",
      options: ["nowrap", "wrap", "wrap-reverse"],
      value: flexWrap,
      set: (v) => setFlexWrap(v as FlexWrap),
    },
  ]

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        {/* Main content */}
        <div className="flex flex-col text:flex-row">
          {/* Left column: Flexbox preview + Footer */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            {/* Container preview */}
            <div className="flex-1 flex p-4 sm:p-6" style={{ minHeight: 200 }}>
              <div
                className="w-full border-2 border-dashed border-rurikon-border/60 bg-rurikon-50/30 overflow-x-auto"
                style={containerStyle}
              >
                {ITEMS.map((item, i) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center justify-center border text-sm font-medium rounded shrink-0 transition-all duration-300",
                      ITEM_COLORS[i]
                    )}
                    style={{
                      width: item.w,
                      height: alignItems === "stretch" ? undefined : item.h,
                      minHeight: alignItems === "stretch" ? item.h : undefined,
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">flexbox playground</span>
              <button
                onClick={() => {
                  setFlexDir("row")
                  setJustify("flex-start")
                  setAlignItems("flex-start")
                  setFlexWrap("nowrap")
                }}
                className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
              >
                reset
              </button>
            </div>
          </div>

          {/* Right column: controls + CSS output */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* Controls */}
              <div className="flex flex-col gap-3">
                {controls.map((ctrl) => (
                  <div key={ctrl.label} className="flex flex-col gap-1.5">
                    <span className="font-mono text-xs text-rurikon-500">{ctrl.label}</span>
                    <div className="flex flex-wrap gap-1">
                      {ctrl.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => ctrl.set(opt)}
                          className={cn(
                            "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                            ctrl.value === opt
                              ? "bg-rurikon-800 text-white border-rurikon-600"
                              : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CSS output */}
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-400">.container {"{"}</span>
                <br />
                {"  "}<span className="text-[#5a9fd4]">display</span>: flex;
                <br />
                {"  "}<span className="text-[#5a9fd4]">flex-direction</span>: <span className="text-[#9b72d4]">{flexDir}</span>;
                <br />
                {"  "}<span className="text-[#5a9fd4]">justify-content</span>: <span className="text-[#9b72d4]">{justify}</span>;
                <br />
                {"  "}<span className="text-[#5a9fd4]">align-items</span>: <span className="text-[#9b72d4]">{alignItems}</span>;
                <br />
                {"  "}<span className="text-[#5a9fd4]">flex-wrap</span>: <span className="text-[#9b72d4]">{flexWrap}</span>;
                <br />
                <span className="text-rurikon-400">{"}"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
