"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type FlyBehavior = "FlyWithWings" | "FlyNoWay" | "FlyRocketPowered"
type QuackBehavior = "Quack" | "Squeak" | "MuteQuack"

const FLY_OPTIONS: FlyBehavior[] = ["FlyWithWings", "FlyNoWay", "FlyRocketPowered"]
const QUACK_OPTIONS: QuackBehavior[] = ["Quack", "Squeak", "MuteQuack"]

const FLY_DESC: Record<FlyBehavior, { output: string; note: string }> = {
  FlyWithWings: { output: "I'm flying!", note: "Uses wings — default for most ducks." },
  FlyNoWay: { output: "(can't fly)", note: "No-op — for rubber ducks, decoys, etc." },
  FlyRocketPowered: { output: "BLAST OFF!", note: "Injected at runtime — swappable without changing Duck." },
}

const QUACK_DESC: Record<QuackBehavior, { output: string; note: string }> = {
  Quack: { output: "Quack!", note: "Real duck quack." },
  Squeak: { output: "Squeak!", note: "Rubber duck — same interface, different behavior." },
  MuteQuack: { output: "(silence)", note: "No-op — decoy or wooden duck." },
}

export function DemoStrategyPattern() {
  const [fly, setFly] = useState<FlyBehavior>("FlyWithWings")
  const [quack, setQuack] = useState<QuackBehavior>("Quack")

  const fd = FLY_DESC[fly]
  const qd = QUACK_DESC[quack]

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left — Duck object diagram */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6" style={{ minHeight: 200 }}>
              <div className="flex flex-col items-center gap-3 w-full max-w-xs">

                {/* Duck class box */}
                <div className="w-full border border-[#5a9fd4] bg-[#dce8f5]">
                  <div className="px-3 py-1 font-mono text-xs font-semibold text-[#1a5a8b] border-b border-[#5a9fd4]">
                    Duck
                  </div>
                  <div className="px-3 py-2 flex flex-col gap-2">

                    {/* flyBehavior slot */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-rurikon-400 w-24 shrink-0">flyBehavior:</span>
                      <div className="flex-1 border border-[#7aab4e] bg-[#dce8dc] px-2 py-0.5 font-mono text-[10px] text-[#3a6b1a] text-center transition-all duration-300">
                        {fly}
                      </div>
                    </div>

                    {/* quackBehavior slot */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-rurikon-400 w-24 shrink-0">quackBehavior:</span>
                      <div className="flex-1 border border-[#d4a96a] bg-[#f5e8dc] px-2 py-0.5 font-mono text-[10px] text-[#8b6914] text-center transition-all duration-300">
                        {quack}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Output */}
                <div className="w-full font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                  <span className="text-rurikon-400">duck.performFly()  → </span>
                  <span className="text-[#3a6b1a] font-semibold">{fd.output}</span>
                  <br />
                  <span className="text-rurikon-400">duck.performQuack() → </span>
                  <span className="text-[#8b6914] font-semibold">{qd.output}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">strategy pattern — duck simulator</span>
            </div>
          </div>

          {/* Right — controls */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">

              {/* Fly behavior */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-rurikon-500">FlyBehavior</span>
                <div className="flex flex-wrap gap-1">
                  {FLY_OPTIONS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFly(f)}
                      className={cn(
                        "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                        fly === f
                          ? "bg-rurikon-800 text-white border-rurikon-600"
                          : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-rurikon-400 italic">{fd.note}</div>
              </div>

              {/* Quack behavior */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-rurikon-500">QuackBehavior</span>
                <div className="flex flex-wrap gap-1">
                  {QUACK_OPTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuack(q)}
                      className={cn(
                        "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                        quack === q
                          ? "bg-rurikon-800 text-white border-rurikon-600"
                          : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                      )}
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-rurikon-400 italic">{qd.note}</div>
              </div>

              {/* Principle callout */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">Design Principle</span>
                <span className="text-xs text-rurikon-500">Favor composition over inheritance.</span>
                <span className="text-xs text-rurikon-400 italic">
                  Duck HAS-A FlyBehavior — the algorithm can be swapped at runtime without touching the Duck class.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
