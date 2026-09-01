"use client"

import { useState, useMemo } from "react"
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const SAMPLE_DAYS = [
  0, 30, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 365,
]

function buildData(dailyPct: number) {
  return SAMPLE_DAYS.map((day) => ({
    day,
    compound: parseFloat((Math.pow(1 + dailyPct / 100, day)).toFixed(4)),
    linear: parseFloat((1 + (dailyPct / 100) * day).toFixed(4)),
    decline: parseFloat((Math.pow(1 - dailyPct / 100, day)).toFixed(4)),
  }))
}

const PRESETS = [
  { label: "0.5 %", value: 0.5 },
  { label: "1 %", value: 1 },
  { label: "2 %", value: 2 },
]

export function DailyGrowthViz() {
  const [dailyPct, setDailyPct] = useState(1)
  const [showDecline, setShowDecline] = useState(false)
  const data = useMemo(() => buildData(dailyPct), [dailyPct])

  const compoundFinal = Math.pow(1 + dailyPct / 100, 365)
  const linearFinal = 1 + (dailyPct / 100) * 365
  const declineFinal = Math.pow(1 - dailyPct / 100, 365)

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 px-4 pt-4 pb-3 border-b border-rurikon-border">
        <span className="text-xs text-rurikon-400 italic mr-auto">
          daily growth rate:{" "}
          <span className="not-italic font-semibold text-rurikon-600">{dailyPct}%</span>
        </span>
        <div className="flex gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.value}
              onClick={() => setDailyPct(p.value)}
              className={cn(
                "text-xs rounded px-2.5 py-1.5 border transition-colors",
                dailyPct === p.value
                  ? "bg-rurikon-800 text-white border-rurikon-600"
                  : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={dailyPct}
          onChange={(e) => setDailyPct(Number(e.target.value))}
          className="w-28 accent-rurikon-600"
        />
      </div>

      {/* Chart */}
      <div className="px-4 pt-4">
        <ChartContainer
          config={{
            compound: {
              label: "+1% compounded",
              color: "hsl(220 55% 38%)",
            },
            linear: {
              label: "Simple (linear)",
              color: "hsl(0 0% 65%)",
            },
            decline: {
              label: "-1% compounded",
              color: "hsl(0 60% 52%)",
            },
          }}
          className="h-60 w-full"
        >
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
            <XAxis
              dataKey="day"
              tickFormatter={(v) => `D${v}`}
              tick={{ fontSize: 10, fontFamily: "serif" }}
              stroke="#c4c4c4"
            />
            <YAxis
              tickFormatter={(v) => `${v}×`}
              tick={{ fontSize: 10, fontFamily: "serif" }}
              stroke="#c4c4c4"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [`${Number(value).toFixed(2)}×`, undefined]}
                />
              }
            />
            <ReferenceLine y={1} stroke="#d0d0d0" strokeDasharray="4 2" />
            <Line
              type="monotone"
              dataKey="linear"
              stroke="var(--color-linear)"
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="5 3"
            />
            <Line
              type="monotone"
              dataKey="compound"
              stroke="var(--color-compound)"
              strokeWidth={2}
              dot={false}
            />
            {showDecline && (
              <Line
                type="monotone"
                dataKey="decline"
                stroke="var(--color-decline)"
                strokeWidth={2}
                dot={false}
                strokeDasharray="4 2"
              />
            )}
          </LineChart>
        </ChartContainer>
      </div>

      {/* Stats row */}
      <div className={cn("divide-x divide-rurikon-border border-t border-rurikon-border", showDecline ? "grid grid-cols-3" : "grid grid-cols-2")}>
        <div className="px-3 py-3 text-center">
          <p className="text-[10px] text-rurikon-300 uppercase tracking-wide">
            +{dailyPct}% compounded
          </p>
          <p className="mt-0.5 text-xl font-semibold text-rurikon-700">
            {compoundFinal.toFixed(2)}×
          </p>
          <p className="text-[10px] text-rurikon-400 italic">
            (1 + {dailyPct}%)^365
          </p>
        </div>
        <div className="px-3 py-3 text-center">
          <p className="text-[10px] text-rurikon-300 uppercase tracking-wide">
            Simple (linear)
          </p>
          <p className="mt-0.5 text-xl font-semibold text-rurikon-400">
            {linearFinal.toFixed(2)}×
          </p>
          <p className="text-[10px] text-rurikon-400 italic">
            1 + {dailyPct}% × 365
          </p>
        </div>
        {showDecline && (
          <div className="px-3 py-3 text-center">
            <p className="text-[10px] text-rurikon-300 uppercase tracking-wide">
              −{dailyPct}% compounded
            </p>
            <p className="mt-0.5 text-xl font-semibold text-red-400">
              {declineFinal.toFixed(4)}×
            </p>
            <p className="text-[10px] text-rurikon-400 italic">
              (1 − {dailyPct}%)^365
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
          compounding vs linear growth over 365 days
        </span>
        <button
          onClick={() => setShowDecline((v) => !v)}
          className={cn(
            "text-xs rounded px-2.5 py-1.5 border transition-colors",
            showDecline
              ? "bg-rurikon-800 text-white border-rurikon-600"
              : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
          )}
        >
          {showDecline ? "Hide decline" : "Show decline"}
        </button>
      </div>
    </div>
  )
}
