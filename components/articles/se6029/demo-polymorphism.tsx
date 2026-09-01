"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Animal = "Dog" | "Cat" | "Rat"

const ANIMALS: Animal[] = ["Dog", "Cat", "Rat"]

const ANIMAL_STYLES: Record<Animal, { border: string; bg: string; text: string; speak: string }> = {
  Dog: {
    border: "border-[#5a9fd4]",
    bg: "bg-[#dce8f5]",
    text: "text-[#1a5a8b]",
    speak: '"Woof!"',
  },
  Cat: {
    border: "border-[#7aab4e]",
    bg: "bg-[#dce8dc]",
    text: "text-[#3a6b1a]",
    speak: '"Meow!"',
  },
  Rat: {
    border: "border-[#d4a96a]",
    bg: "bg-[#f5e8dc]",
    text: "text-[#8b6914]",
    speak: '"Squeak!"',
  },
}

function VTableBox({ animal, active }: { animal: Animal; active: boolean }) {
  const s = ANIMAL_STYLES[animal]
  return (
    <div className={cn("border rounded transition-all duration-300", s.border, active ? s.bg : "bg-white opacity-50")}>
      <div className={cn("px-2 py-0.5 font-mono text-[11px] font-semibold border-b", s.border, active ? s.text : "text-rurikon-400")}>
        {animal}
      </div>
      <div className="px-2 py-1 flex flex-col gap-0.5">
        <div className="font-mono text-[10px] text-rurikon-400">vtable:</div>
        <div className={cn("font-mono text-[10px]", active ? s.text : "text-rurikon-300")}>
          [0] → {animal}::speak
        </div>
        <div className="font-mono text-[10px] text-rurikon-300">[1] → {animal}::eat</div>
      </div>
    </div>
  )
}

export function DemoPolymorphism() {
  const [selected, setSelected] = useState<Animal>("Dog")
  const s = ANIMAL_STYLES[selected]

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left — vtable visualiser */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4 sm:p-6" style={{ minHeight: 200 }}>

              {/* Pointer */}
              <div className="flex items-center gap-2">
                <div className="border border-[#9b72d4] bg-[#ecdcf5] px-3 py-1.5 font-mono text-xs text-[#5a1a8b] rounded">
                  Pet* p
                </div>
                <div className="flex items-center gap-1 text-rurikon-400">
                  <div className="w-8 h-px bg-rurikon-300" />
                  <span className="text-xs">→</span>
                </div>
                <div className={cn("border px-3 py-1.5 font-mono text-xs font-semibold rounded transition-all duration-300", s.border, s.bg, s.text)}>
                  {selected} object
                </div>
              </div>

              {/* Objects with vtables */}
              <div className="flex flex-wrap gap-3 justify-center">
                {ANIMALS.map((a) => (
                  <VTableBox key={a} animal={a} active={a === selected} />
                ))}
              </div>

              {/* Call resolution */}
              <div className="w-full max-w-xs font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-400">// call site</span>
                <br />
                <span className="text-[#5a9fd4]">p</span>
                <span className="text-rurikon-500">-&gt;speak()</span>
                <br />
                <span className="text-rurikon-300">// compiled to</span>
                <br />
                <span className="text-[#9b72d4]">(p-&gt;vptr[0])()</span>
                <br />
                <span className="text-rurikon-300">// resolves to</span>
                <br />
                <span className={cn("font-semibold", s.text)}>
                  {selected}::speak → {ANIMAL_STYLES[selected].speak}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">virtual dispatch</span>
            </div>
          </div>

          {/* Right — controls */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <span className="font-mono text-xs text-rurikon-500">Pet* p points to…</span>
              <div className="flex flex-wrap gap-1.5">
                {ANIMALS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setSelected(a)}
                    className={cn(
                      "text-xs rounded px-2.5 py-1.5 border transition-colors",
                      selected === a
                        ? "bg-rurikon-800 text-white border-rurikon-600"
                        : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    )}
                  >
                    new {a}()
                  </button>
                ))}
              </div>

              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">runtime dispatch</span>
                <span className="text-xs text-rurikon-500">
                  The call site <code className="font-mono">p-&gt;speak()</code> never changes.
                </span>
                <span className="text-xs text-rurikon-400 italic">
                  At runtime the CPU follows <code className="font-mono">vptr → vtable → {selected}::speak</code> and calls the right implementation.
                </span>
              </div>

              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">object slicing warning</span>
                <span className="text-xs text-rurikon-400 italic">
                  Passing a subclass <strong>by value</strong> into a base-class parameter slices off the derived part — polymorphism only works through pointers or references.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
