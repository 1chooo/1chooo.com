"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface SccLanguageRow {
  language: string
  files: number
  lines: number
  blanks: number
  comments: number
  code: number
  complexity: number
}

interface SccSummary {
  totalFiles: number
  totalLines: number
  totalBlanks: number
  totalComments: number
  totalCode: number
  totalComplexity: number
  estimatedCost: number
  scheduleMonths: number
  peopleRequired: number
  processedBytes: number
}

interface SccReportProps {
  languages?: SccLanguageRow[]
  summary?: SccSummary
  label?: string
}

type SortKey = keyof Omit<SccLanguageRow, "language">
const SORT_KEYS: { key: SortKey; label: string }[] = [
  { key: "files", label: "Files" },
  { key: "lines", label: "Lines" },
  { key: "blanks", label: "Blanks" },
  { key: "comments", label: "Comments" },
  { key: "code", label: "Code" },
  { key: "complexity", label: "Complexity" },
]

function formatCost(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

function formatBytes(b: number): string {
  if (b >= 1_000_000) return `${(b / 1_000_000).toFixed(2)} MB`
  if (b >= 1_000) return `${(b / 1_000).toFixed(0)} KB`
  return `${b} B`
}

function MiniBar({ value, max, className }: { value: number; max: number; className: string }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100)
  return (
    <div className="w-full h-1 bg-rurikon-100 rounded-sm overflow-hidden mt-0.5">
      <div className={cn("h-full rounded-sm", className)} style={{ width: `${pct}%` }} />
    </div>
  )
}

// Language color palette index
const LANG_COLORS = [
  "bg-[#5a9fd4]",
  "bg-[#7aab4e]",
  "bg-[#d4a96a]",
  "bg-[#9b72d4]",
  "bg-[#d45a9f]",
  "bg-[#4ed4b8]",
]

const DEFAULT_LANGUAGES: SccLanguageRow[] = [
  { language: "TypeScript", files: 237, lines: 32068, blanks: 2913, comments: 801, code: 28354, complexity: 4579 },
  { language: "MDX", files: 31, lines: 3367, blanks: 890, comments: 0, code: 2477, complexity: 0 },
  { language: "JSON", files: 4, lines: 174, blanks: 0, comments: 0, code: 174, complexity: 0 },
  { language: "JavaScript", files: 3, lines: 132, blanks: 16, comments: 11, code: 105, complexity: 10 },
  { language: "CSS", files: 2, lines: 643, blanks: 79, comments: 26, code: 538, complexity: 0 },
  { language: "Markdown", files: 2, lines: 149, blanks: 32, comments: 0, code: 117, complexity: 0 },
  { language: "Plain Text", files: 1, lines: 1, blanks: 0, comments: 0, code: 1, complexity: 0 },
  { language: "SQL", files: 1, lines: 414, blanks: 92, comments: 98, code: 224, complexity: 0 },
]

const DEFAULT_SUMMARY: SccSummary = {
  totalFiles: 281,
  totalLines: 36948,
  totalBlanks: 4022,
  totalComments: 936,
  totalCode: 31990,
  totalComplexity: 4589,
  estimatedCost: 1027685,
  scheduleMonths: 13.90,
  peopleRequired: 6.57,
  processedBytes: 1375061,
}

export function SccReport({
  languages = DEFAULT_LANGUAGES,
  summary = DEFAULT_SUMMARY,
  label = "scc · sloc cloc and code",
}: SccReportProps) {
  const [sortKey, setSortKey] = useState<SortKey>("code")
  const [sortAsc, setSortAsc] = useState(false)

  const safeLanguages = Array.isArray(languages) ? languages : []
  const sorted = [...safeLanguages].sort((a, b) => {
    const diff = a[sortKey] - b[sortKey]
    return sortAsc ? diff : -diff
  })

  const maxLines = safeLanguages.length > 0 ? Math.max(...safeLanguages.map((l) => l.lines)) : 0
  const maxCode = safeLanguages.length > 0 ? Math.max(...safeLanguages.map((l) => l.code)) : 0

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((v) => !v)
    else { setSortKey(key); setSortAsc(false) }
  }

  // Compute weighted color per language based on original order
  const langColorMap = Object.fromEntries(
    safeLanguages.map((l, i) => [l.language, LANG_COLORS[i % LANG_COLORS.length]])
  )

  // Code proportion for the stacked bar
  const totalCode = summary.totalCode

  return (
    <div className="my-8 w-full">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">

        {/* Stacked language bar */}
        <div className="flex h-2">
          {safeLanguages.map((l) => (
            <div
              key={l.language}
              className={cn("h-full transition-all duration-500", langColorMap[l.language])}
              style={{ width: `${(l.code / totalCode) * 100}%` }}
              title={`${l.language}: ${l.code.toLocaleString()} lines`}
            />
          ))}
        </div>

        {/* Language legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 px-3 pt-2.5 pb-2">
          {safeLanguages.map((l) => (
            <div key={l.language} className="flex items-center gap-1.5">
              <div className={cn("w-2.5 h-2.5 rounded-sm", langColorMap[l.language])} />
              <span className="font-mono text-[11px] text-rurikon-500">{l.language}</span>
              <span className="font-mono text-[11px] text-rurikon-300">
                {totalCode > 0 ? `${Math.round((l.code / totalCode) * 100)}%` : ""}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-rurikon-border" />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            {/* Header */}
            <thead>
              <tr className="border-b border-rurikon-border">
                <th className="text-left px-3 py-2 font-mono text-[11px] text-rurikon-400 font-normal">
                  Language
                </th>
                {SORT_KEYS.map(({ key, label: colLabel }) => (
                  <th key={key} className="text-right px-3 py-2">
                    <button
                      onClick={() => handleSort(key)}
                      className={cn(
                        "font-mono text-[11px] font-normal transition-colors",
                        sortKey === key
                          ? "text-rurikon-700 font-semibold"
                          : "text-rurikon-400 hover:text-rurikon-600"
                      )}
                    >
                      {colLabel}
                      {sortKey === key && (
                        <span className="ml-0.5 opacity-60">{sortAsc ? "↑" : "↓"}</span>
                      )}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {sorted.map((row) => (
                <tr
                  key={row.language}
                  className="border-b border-rurikon-border/30 last:border-0 hover:bg-rurikon-50/40 transition-colors"
                >
                  {/* Language name with color dot */}
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <div className={cn("w-2 h-2 rounded-full shrink-0", langColorMap[row.language])} />
                      <span className="font-mono text-[11px] text-rurikon-700">{row.language}</span>
                    </div>
                    <MiniBar value={row.code} max={maxCode} className={langColorMap[row.language]} />
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-[11px] text-rurikon-500 tabular-nums">{row.files.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right font-mono text-[11px] text-rurikon-500 tabular-nums">{row.lines.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right font-mono text-[11px] text-rurikon-400 tabular-nums">{row.blanks.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right font-mono text-[11px] text-rurikon-400 tabular-nums">{row.comments.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right font-mono text-[11px] text-rurikon-700 font-medium tabular-nums">{row.code.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right font-mono text-[11px] text-rurikon-400 tabular-nums">{row.complexity.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>

            {/* Total row */}
            <tfoot>
              <tr className="border-t border-rurikon-border bg-[#fdfcfa]">
                <td className="px-3 py-2 font-mono text-[11px] text-rurikon-600 font-semibold">Total</td>
                <td className="px-3 py-2 text-right font-mono text-[11px] text-rurikon-600 font-semibold tabular-nums">{summary.totalFiles.toLocaleString()}</td>
                <td className="px-3 py-2 text-right font-mono text-[11px] text-rurikon-600 font-semibold tabular-nums">{summary.totalLines.toLocaleString()}</td>
                <td className="px-3 py-2 text-right font-mono text-[11px] text-rurikon-600 tabular-nums">{summary.totalBlanks.toLocaleString()}</td>
                <td className="px-3 py-2 text-right font-mono text-[11px] text-rurikon-600 tabular-nums">{summary.totalComments.toLocaleString()}</td>
                <td className="px-3 py-2 text-right font-mono text-[11px] text-rurikon-600 font-semibold tabular-nums">{summary.totalCode.toLocaleString()}</td>
                <td className="px-3 py-2 text-right font-mono text-[11px] text-rurikon-600 tabular-nums">{summary.totalComplexity.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* COCOMO estimates */}
        <div className="border-t border-rurikon-border bg-[#fdfcfa] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-rurikon-border/40">
          <div className="flex flex-col gap-1 px-4 py-3">
            <span className="font-mono text-xs font-semibold text-rurikon-700">{formatCost(summary.estimatedCost)}</span>
            <span className="font-serif text-[10px] text-rurikon-400 italic">estimated cost (COCOMO)</span>
          </div>
          <div className="flex flex-col gap-1 px-4 py-3">
            <span className="font-mono text-xs font-semibold text-rurikon-700">{summary.scheduleMonths.toFixed(2)} months</span>
            <span className="font-serif text-[10px] text-rurikon-400 italic">estimated schedule</span>
          </div>
          <div className="flex flex-col gap-1 px-4 py-3">
            <span className="font-mono text-xs font-semibold text-rurikon-700">{summary.peopleRequired.toFixed(2)} people</span>
            <span className="font-serif text-[10px] text-rurikon-400 italic">estimated team size</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
          <span className="font-serif text-xs text-rurikon-400 mr-auto italic">{label}</span>
          <span className="font-mono text-[10px] text-rurikon-300">{formatBytes(summary.processedBytes)}</span>
        </div>

      </div>
    </div>
  )
}
