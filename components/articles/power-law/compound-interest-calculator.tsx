"use client"

import { useState, useEffect } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

interface CalculationResult {
  year: number
  contributed: number
  total: number
  interest: number
}

interface FieldProps {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  prefix?: string
  suffix?: string
  error?: string
}

function Field({ label, id, value, onChange, placeholder, prefix, suffix, error }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs text-rurikon-400 font-serif">
        {label}
      </label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-2.5 text-xs text-rurikon-300 pointer-events-none select-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full border text-xs font-serif bg-white text-rurikon-600 px-2.5 py-1.5 outline-none transition-colors",
            "placeholder:text-rurikon-200",
            prefix && "pl-5",
            suffix && "pr-8",
            error
              ? "border-red-300 focus:border-red-400"
              : "border-rurikon-border focus:border-rurikon-400"
          )}
        />
        {suffix && (
          <span className="absolute right-2.5 text-xs text-rurikon-300 pointer-events-none select-none">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="text-[10px] text-red-400 font-serif italic">{error}</p>}
    </div>
  )
}

function calcCompoundInterest(
  initial: number,
  monthly: number,
  yearCount: number,
  annualRate: number
): CalculationResult[] {
  const results: CalculationResult[] = []
  let totalContributed = initial

  for (let year = 0; year <= yearCount; year++) {
    if (year === 0) {
      results.push({ year, contributed: initial, total: initial, interest: 0 })
      continue
    }
    const prev = results[year - 1].total
    const yearlyContrib = monthly * 12
    totalContributed += yearlyContrib
    const total = (prev + yearlyContrib) * (1 + annualRate / 100)
    results.push({
      year,
      contributed: totalContributed,
      total,
      interest: total - totalContributed,
    })
  }
  return results
}

function fmt(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function CompoundInterestCalculator() {
  const [initial, setInitial] = useState("10000")
  const [monthly, setMonthly] = useState("500")
  const [years, setYears] = useState("30")
  const [rate, setRate] = useState("7")
  const [results, setResults] = useState<CalculationResult[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const errs: Record<string, string> = {}
    const iv = Number(initial)
    const mv = Number(monthly)
    const yv = Number(years)
    const rv = Number(rate)

    if (initial === "" || isNaN(iv) || iv < 0) errs.initial = "Must be ≥ 0"
    if (monthly === "" || isNaN(mv) || mv < 0) errs.monthly = "Must be ≥ 0"
    if (years === "" || isNaN(yv) || !Number.isInteger(yv) || yv <= 0 || yv > 100)
      errs.years = "Must be a whole number between 1 and 100"
    if (rate === "" || isNaN(rv) || rv < 0 || rv > 100) errs.rate = "Must be between 0 and 100"

    setErrors(errs)

    if (Object.keys(errs).length === 0) {
      setResults(calcCompoundInterest(iv, mv, yv, rv))
    } else {
      setResults([])
    }
  }, [initial, monthly, years, rate])

  const last = results[results.length - 1]
  const hasResult = last && last.total > 0

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      {/* Inputs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 border-b border-rurikon-border">
        <Field
          label="Initial investment"
          id="ci-initial"
          value={initial}
          onChange={setInitial}
          placeholder="10000"
          prefix="$"
          error={errors.initial}
        />
        <Field
          label="Monthly contribution"
          id="ci-monthly"
          value={monthly}
          onChange={setMonthly}
          placeholder="500"
          prefix="$"
          error={errors.monthly}
        />
        <Field
          label="Years to grow"
          id="ci-years"
          value={years}
          onChange={setYears}
          placeholder="30"
          error={errors.years}
        />
        <Field
          label="Annual return rate"
          id="ci-rate"
          value={rate}
          onChange={setRate}
          placeholder="7"
          suffix="%"
          error={errors.rate}
        />
      </div>

      {/* Chart */}
      <div className="p-4">
        {hasResult ? (
          <>
            <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-rurikon-500">
              <span>
                Total value:{" "}
                <span className="font-semibold text-rurikon-700">${fmt(last.total)}</span>
              </span>
              <span>
                Contributed:{" "}
                <span className="text-rurikon-400">${fmt(last.contributed)}</span>
              </span>
              <span>
                Interest earned:{" "}
                <span className="text-rurikon-400">${fmt(last.interest)}</span>
              </span>
            </div>
            <ChartContainer
              config={{
                contributed: {
                  label: "Contributed",
                  color: "hsl(220 30% 60%)",
                },
                interest: {
                  label: "Interest earned",
                  color: "hsl(220 55% 38%)",
                },
              }}
              className="h-70 w-full"
            >
              <AreaChart
                data={results}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                stackOffset="none"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                <XAxis
                  dataKey="year"
                  tickFormatter={(v) => `Yr ${v}`}
                  tick={{ fontSize: 10, fontFamily: "serif" }}
                  stroke="#c4c4c4"
                />
                <YAxis
                  tickFormatter={(v) =>
                    `$${v >= 1_000_000 ? (v / 1_000_000).toFixed(1) + "M" : v >= 1_000 ? (v / 1_000).toFixed(0) + "k" : v}`
                  }
                  tick={{ fontSize: 10, fontFamily: "serif" }}
                  stroke="#c4c4c4"
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [`$${fmt(Number(value))}`, undefined]}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="contributed"
                  stackId="1"
                  stroke="var(--color-contributed)"
                  fill="var(--color-contributed)"
                  fillOpacity={0.15}
                  strokeWidth={1.5}
                />
                <Area
                  type="monotone"
                  dataKey="interest"
                  stackId="1"
                  stroke="var(--color-interest)"
                  fill="var(--color-interest)"
                  fillOpacity={0.25}
                  strokeWidth={1.5}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </>
        ) : (
          <div className="flex h-50 items-center justify-center text-xs text-rurikon-300 italic">
            {Object.keys(errors).length > 0
              ? "Fix the inputs above to see the chart."
              : "Enter your numbers to see how they grow."}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
          compound interest calculator
        </span>
        <button
          onClick={() => {
            setInitial("10000")
            setMonthly("500")
            setYears("30")
            setRate("7")
          }}
          className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
