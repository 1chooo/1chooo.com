"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'

type Mode = 'before' | 'after'

interface Phase {
  label: string
  ms: number
  bg: string
  border: string
  text: string
}

interface TimelineRow {
  event: string
  route?: string
  phases: Phase[]
}

const WASM = (ms: number): Phase => ({
  label: 'WASM Init',
  ms,
  bg: '#f5e8dc',
  border: '#d4a96a',
  text: '#8b6914',
})

const GRAMMAR = (ms: number): Phase => ({
  label: 'Grammar Load',
  ms,
  bg: '#f5dce8',
  border: '#d45a9f',
  text: '#8b1a5a',
})

const HIGHLIGHT = (ms: number): Phase => ({
  label: 'Highlight',
  ms,
  bg: '#dce8dc',
  border: '#7aab4e',
  text: '#3a6b1a',
})

// All times from actual runtime logs.
const BEFORE: TimelineRow[] = [
  { event: 'Server Start', phases: [] },
  { event: 'Request 1', route: '/notes/dom', phases: [WASM(340), GRAMMAR(30), HIGHLIGHT(15)] },
  { event: 'Request 2', route: '/notes/css-layout', phases: [GRAMMAR(130), HIGHLIGHT(12)] },
  { event: 'Request 3', route: '/thoughts/ai-agent', phases: [HIGHLIGHT(7)] },
]

const AFTER: TimelineRow[] = [
  { event: 'Server Start', phases: [WASM(340), GRAMMAR(30)] },
  { event: 'Request 1', route: '/notes/dom', phases: [HIGHLIGHT(1)] },
  { event: 'Request 2', route: '/notes/css-layout', phases: [HIGHLIGHT(1)] },
  { event: 'Request 3', route: '/thoughts/ai-agent', phases: [HIGHLIGHT(1)] },
]

// Display scale: 420ms = 100% width
const SCALE_MS = 420

function Bar({ phases, empty }: { phases: Phase[]; empty?: boolean }) {
  const total = phases.reduce((s, p) => s + p.ms, 0)

  return (
    <div className="relative flex h-8 flex-1 overflow-hidden border border-rurikon-border/40 bg-rurikon-50/60">
      {empty || phases.length === 0 ? (
        <span className="absolute inset-0 flex items-center px-2 font-mono text-[10px] italic text-rurikon-300">
          idle
        </span>
      ) : (
        phases.map((p, i) => {
          const widthPct = Math.max((p.ms / SCALE_MS) * 100, p.ms < 5 ? 1.2 : 0)
          return (
            <div
              key={i}
              className="flex h-full items-center justify-center overflow-hidden border-r border-rurikon-border/20 last:border-r-0 transition-all duration-500"
              style={{ width: `${widthPct}%`, backgroundColor: p.bg }}
              title={`${p.label}: ${p.ms}ms`}
            >
              {p.ms >= 25 && (
                <span
                  className="whitespace-nowrap px-1.5 font-mono text-[10px]"
                  style={{ color: p.text }}
                >
                  {p.ms}ms
                </span>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}

export function DemoShikiTimeline() {
  const [mode, setMode] = useState<Mode>('before')
  const rows = mode === 'before' ? BEFORE : AFTER

  const firstRequestMs = (rows.find(r => r.event === 'Request 1')?.phases ?? [])
    .reduce((s, p) => s + p.ms, 0)

  return (
    <div className="my-8 article-demo-shell [--demo-aside:calc(var(--spacing)*72)]">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left — timeline */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 p-4 sm:p-6">
              {/* Time axis */}
              <div className="mb-3 flex gap-2">
                <div className="w-28 flex-none" />
                <div className="flex flex-1 justify-between">
                  {[0, 100, 200, 300, 400].map(t => (
                    <span key={t} className="font-mono text-[10px] text-rurikon-300">{t}ms</span>
                  ))}
                </div>
                <div className="w-14 flex-none" />
              </div>

              {/* Rows */}
              <div className="flex flex-col gap-3">
                {rows.map((row, i) => {
                  const total = row.phases.reduce((s, p) => s + p.ms, 0)
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-28 flex-none text-right">
                        <div className="font-mono text-[11px] font-medium text-rurikon-700">{row.event}</div>
                        {row.route && (
                          <div className="font-mono text-[10px] text-rurikon-400 truncate">{row.route}</div>
                        )}
                      </div>
                      <Bar phases={row.phases} />
                      <div className="w-14 flex-none text-right font-mono text-[11px] text-rurikon-500">
                        {total > 0 ? `${total}ms` : '—'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center gap-3 border-t border-rurikon-border px-4 py-2">
              <span className="mr-auto font-serif text-xs italic text-rurikon-400">
                measured from runtime logs — dev mode, single process
              </span>
              {/* Legend */}
              {[
                { bg: '#f5e8dc', border: '#d4a96a', label: 'WASM Init' },
                { bg: '#f5dce8', border: '#d45a9f', label: 'Grammar Load' },
                { bg: '#dce8dc', border: '#7aab4e', label: 'Highlight' },
              ].map(l => (
                <span key={l.label} className="flex items-center gap-1">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-sm border"
                    style={{ backgroundColor: l.bg, borderColor: l.border }}
                  />
                  <span className="font-mono text-[10px] text-rurikon-400">{l.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right — controls */}
          <div className="w-full text:w-72 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-4 flex flex-col gap-3">

              {/* Toggle */}
              <div className="flex gap-2">
                {(['before', 'after'] as Mode[]).map(m => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={cn(
                      'flex-1 rounded border px-3 py-1.5 text-xs transition-colors capitalize',
                      mode === m
                        ? 'bg-rurikon-800 text-white border-rurikon-600'
                        : 'border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600'
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs font-medium text-rurikon-700">
                  {mode === 'before' ? 'Without instrumentation' : 'With instrumentation.ts'}
                </span>
                <span className="text-xs text-rurikon-500">
                  First request latency:{' '}
                  <strong className={firstRequestMs > 100 ? 'text-[#8b6914]' : 'text-[#3a6b1a]'}>
                    {firstRequestMs}ms
                  </strong>
                </span>
                <span className="text-xs text-rurikon-400 italic">
                  {mode === 'before'
                    ? 'WASM & grammars load on first HTTP request'
                    : 'WASM & grammars loaded before first HTTP request'}
                </span>
              </div>

              {/* Per-mode description */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs font-medium text-rurikon-700">What happens</span>
                {mode === 'before' ? (
                  <>
                    <span className="text-xs text-rurikon-500">
                      <code className="font-mono">codeToHtml()</code> lazily initialises Shiki — WASM compile + grammar parse blocks every first-visit request.
                    </span>
                    <span className="text-xs text-rurikon-400 italic">
                      New languages add ~130ms on subsequent pages.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-rurikon-500">
                      <code className="font-mono">instrumentation.ts</code> awaits the shared singleton before the server accepts connections.
                    </span>
                    <span className="text-xs text-rurikon-400 italic">
                      All requests use <code className="font-mono">getHighlighter()</code> synchronously — zero await on hot path.
                    </span>
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
