"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const ITEM_COLORS = [
  "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]",
  "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]",
  "bg-[#f5e8dc] border-[#d4a96a] text-[#8b6914]",
  "bg-[#ecdcf5] border-[#9b72d4] text-[#5a1a8b]",
  "bg-[#f5dce8] border-[#d45a9f] text-[#8b1a5a]",
  "bg-[#dcf5f0] border-[#4ed4b8] text-[#1a8b72]",
]

type SpanItem = { id: number; label: string; colSpan: number; rowSpan: number }

const DEFAULT_ITEMS: SpanItem[] = [
  { id: 1, label: "A", colSpan: 1, rowSpan: 1 },
  { id: 2, label: "B", colSpan: 1, rowSpan: 1 },
  { id: 3, label: "C", colSpan: 1, rowSpan: 1 },
  { id: 4, label: "D", colSpan: 1, rowSpan: 1 },
  { id: 5, label: "E", colSpan: 1, rowSpan: 1 },
  { id: 6, label: "F", colSpan: 1, rowSpan: 1 },
]

const PRESETS: { label: string; cols: number; rows: number; gap: number; items: SpanItem[] }[] = [
  {
    label: "3-col equal",
    cols: 3, rows: 2, gap: 8,
    items: DEFAULT_ITEMS,
  },
  {
    label: "Holy grail",
    cols: 3, rows: 3, gap: 8,
    items: [
      { id: 1, label: "header", colSpan: 3, rowSpan: 1 },
      { id: 2, label: "nav", colSpan: 1, rowSpan: 1 },
      { id: 3, label: "main", colSpan: 1, rowSpan: 1 },
      { id: 4, label: "aside", colSpan: 1, rowSpan: 1 },
      { id: 5, label: "footer", colSpan: 3, rowSpan: 1 },
    ],
  },
  {
    label: "Masonry-ish",
    cols: 4, rows: 3, gap: 6,
    items: [
      { id: 1, label: "A", colSpan: 2, rowSpan: 2 },
      { id: 2, label: "B", colSpan: 1, rowSpan: 1 },
      { id: 3, label: "C", colSpan: 1, rowSpan: 1 },
      { id: 4, label: "D", colSpan: 1, rowSpan: 2 },
      { id: 5, label: "E", colSpan: 1, rowSpan: 1 },
      { id: 6, label: "F", colSpan: 2, rowSpan: 1 },
    ],
  },
]

export function DemoCSSGrid() {
  const [presetIdx, setPresetIdx] = useState(0)
  const preset = PRESETS[presetIdx]

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${preset.cols}, 1fr)`,
    gridTemplateRows: `repeat(${preset.rows}, minmax(40px, auto))`,
    gap: preset.gap,
    padding: 12,
  }

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        {/* Main content */}
        <div className="flex flex-col text:flex-row">
          {/* Left column: Grid preview + Footer */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            {/* Grid preview */}
            <div className="flex-1 flex p-4 sm:p-6 overflow-x-auto" style={{ minHeight: 200 }}>
              <div
                className="w-full border-2 border-dashed border-rurikon-border/60 bg-rurikon-50/30 bg-[radial-gradient(circle,#c8d4e0_1px,transparent_1px)] bg-size-[20px_20px]"
                style={{ ...gridStyle, height: "100%" }}
              >
                {preset.items.map((item, i) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center justify-center border text-xs font-medium rounded transition-all duration-300",
                      ITEM_COLORS[i % ITEM_COLORS.length]
                    )}
                    style={{
                      gridColumn: `span ${item.colSpan}`,
                      gridRow: `span ${item.rowSpan}`,
                      minHeight: 40,
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">css grid playground</span>
              {PRESETS.map((pr, i) => (
                <button
                  key={pr.label}
                  onClick={() => setPresetIdx(i)}
                  className={cn(
                    "text-xs rounded px-2.5 py-1.5 border transition-colors",
                    presetIdx === i
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  {pr.label}
                </button>
              ))}
            </div>
          </div>

          {/* CSS output */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3">
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-400">.grid {"{"}</span>
                <br />
                {"  "}<span className="text-[#5a9fd4]">display</span>: grid;
                <br />
                {"  "}<span className="text-[#5a9fd4]">grid-template-columns</span>: <span className="text-[#9b72d4]">repeat({preset.cols}, 1fr)</span>;
                <br />
                {"  "}<span className="text-[#5a9fd4]">grid-template-rows</span>: <span className="text-[#9b72d4]">repeat({preset.rows}, minmax(40px, auto))</span>;
                <br />
                {"  "}<span className="text-[#5a9fd4]">gap</span>: <span className="text-[#9b72d4]">{preset.gap}px</span>;
                <br />
                <span className="text-rurikon-400">{"}"}</span>
                {preset.items.some((it) => it.colSpan > 1 || it.rowSpan > 1) && (
                  <>
                    {preset.items
                      .filter((it) => it.colSpan > 1 || it.rowSpan > 1)
                      .map((it) => (
                        <span key={it.id}>
                          <br />
                          <br />
                          <span className="text-rurikon-400">.item-{it.label.toLowerCase()} {"{"}</span>
                          <br />
                          {it.colSpan > 1 && (
                            <>
                              {"  "}<span className="text-[#5a9fd4]">grid-column</span>: <span className="text-[#9b72d4]">span {it.colSpan}</span>;
                              <br />
                            </>
                          )}
                          {it.rowSpan > 1 && (
                            <>
                              {"  "}<span className="text-[#5a9fd4]">grid-row</span>: <span className="text-[#9b72d4]">span {it.rowSpan}</span>;
                              <br />
                            </>
                          )}
                          <span className="text-rurikon-400">{"}"}</span>
                        </span>
                      ))}
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
