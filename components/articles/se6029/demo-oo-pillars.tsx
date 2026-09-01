"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Pillar = "classes" | "encapsulation" | "inheritance" | "polymorphism"

const PILLARS: { id: Pillar; label: string }[] = [
  { id: "classes", label: "Classes & Objects" },
  { id: "encapsulation", label: "Encapsulation" },
  { id: "inheritance", label: "Inheritance" },
  { id: "polymorphism", label: "Polymorphism" },
]

const PILLAR_INFO: Record<Pillar, { title: string; short: string; detail: string }> = {
  classes: {
    title: "Classes & Objects",
    short: "A class is a type; an object is an instance of that type.",
    detail:
      "A class defines the structure (fields) and behavior (methods) shared by all instances. Each object is its own block of memory, but all objects of the same class share the same code.",
  },
  encapsulation: {
    title: "Encapsulation",
    short: "Hide internal state; expose only a controlled interface.",
    detail:
      "Access modifiers (public / protected / private) let a class decide what the outside world can see. Private fields protect invariants — callers must use the provided methods, never manipulate memory directly.",
  },
  inheritance: {
    title: "Inheritance",
    short: "A derived class reuses and extends the base class.",
    detail:
      "The base class is constructed first and destroyed last. The subclass inherits public/protected members and can override behavior. Use Is-A inheritance carefully — prefer composition when the relationship is tenuous.",
  },
  polymorphism: {
    title: "Polymorphism",
    short: "A base-class pointer behaves differently based on the actual object.",
    detail:
      "Virtual functions enable runtime dispatch via the vtable. Marking a method virtual in the base class means every subclass override will be called correctly through a base pointer, without changing the call site.",
  },
}

const HIGHLIGHT: Record<Pillar, Set<string>> = {
  classes: new Set(["class-box", "field-id", "field-name", "field-salary", "method-speak", "method-eat"]),
  encapsulation: new Set(["badge-private", "badge-protected", "badge-public", "field-id", "field-name", "field-salary", "method-speak", "method-eat"]),
  inheritance: new Set(["class-box", "sub-box", "arrow-inherit"]),
  polymorphism: new Set(["badge-virtual", "method-speak", "ptr-label"]),
}

function Badge({ label, variant }: { label: string; variant: "private" | "protected" | "public" | "virtual" }) {
  const cls = {
    private: "bg-[#f5dce8] border-[#d45a9f] text-[#8b1a5a]",
    protected: "bg-[#f5e8dc] border-[#d4a96a] text-[#8b6914]",
    public: "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]",
    virtual: "bg-[#ecdcf5] border-[#9b72d4] text-[#5a1a8b]",
  }[variant]

  return (
    <span className={cn("font-mono text-[10px] px-1 py-0.5 border rounded", cls)}>
      {label}
    </span>
  )
}

export function DemoOOPillars() {
  const [active, setActive] = useState<Pillar>("classes")
  const hl = HIGHLIGHT[active]

  function ring(key: string) {
    return hl.has(key) ? "ring-2 ring-rurikon-400 ring-offset-1 transition-all duration-300" : "transition-all duration-300"
  }

  const info = PILLAR_INFO[active]

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left — class diagram */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 flex items-start justify-center gap-6 p-4 sm:p-6 flex-wrap" style={{ minHeight: 200 }}>

              {/* Base class */}
              <div className="flex flex-col gap-0.5">
                <div className={cn("border border-rurikon-border bg-[#dce8f5] px-3 py-1 font-mono text-xs text-[#1a5a8b] font-semibold", ring("class-box"))}>
                  Pet
                </div>
                <div className={cn("border border-t-0 border-rurikon-border bg-white px-3 py-1.5 flex flex-col gap-1", ring("class-box"))}>
                  <div className="flex items-center gap-1.5">
                    <span id="badge-private" className={cn(ring("badge-private"))}><Badge label="−" variant="private" /></span>
                    <span id="field-id" className={cn("font-mono text-xs text-rurikon-600", ring("field-id"))}>id: int</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(ring("badge-protected"))}><Badge label="#" variant="protected" /></span>
                    <span className={cn("font-mono text-xs text-rurikon-600", ring("field-name"))}>name: string</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(ring("badge-protected"))}><Badge label="#" variant="protected" /></span>
                    <span className={cn("font-mono text-xs text-rurikon-600", ring("field-salary"))}>weight: float</span>
                  </div>
                </div>
                <div className={cn("border border-t-0 border-rurikon-border bg-white px-3 py-1.5 flex flex-col gap-1", ring("class-box"))}>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(ring("badge-public"))}><Badge label="+" variant="public" /></span>
                    <span className={cn("font-mono text-xs text-rurikon-600", ring("method-eat"))}>eat(): void</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(ring("badge-public"))}><Badge label="+" variant="public" /></span>
                    <span className={cn(ring("badge-virtual"))}><Badge label="virtual" variant="virtual" /></span>
                    <span className={cn("font-mono text-xs text-rurikon-600", ring("method-speak"))}>speak(): void</span>
                  </div>
                </div>
              </div>

              {/* Arrow + subclass column */}
              <div className="flex flex-col items-center gap-1 pt-4">
                <div className={cn("text-xs text-rurikon-400 font-mono", ring("arrow-inherit"))}>◁</div>
                <div className={cn("w-px flex-1 bg-rurikon-border min-h-[48px]", ring("arrow-inherit"))} />
              </div>

              <div className="flex flex-col gap-2">
                {/* Dog */}
                <div className={cn("border border-[#7aab4e] bg-[#dce8dc] px-3 py-1 font-mono text-xs text-[#3a6b1a] font-semibold", ring("sub-box"))}>
                  Dog
                </div>
                {/* Cat */}
                <div className={cn("border border-[#d4a96a] bg-[#f5e8dc] px-3 py-1 font-mono text-xs text-[#8b6914] font-semibold", ring("sub-box"))}>
                  Cat
                </div>
              </div>

              {/* Pointer label */}
              <div className="flex flex-col items-start justify-center pt-6">
                <span className={cn("font-mono text-xs text-rurikon-400 italic", ring("ptr-label"))}>Pet* p</span>
                <span className={cn("font-mono text-xs text-[#9b72d4]", ring("ptr-label"))}>→ Dog | Cat</span>
              </div>
            </div>

            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">class diagram</span>
              <span className="font-mono text-xs text-rurikon-300">Pet hierarchy</span>
            </div>
          </div>

          {/* Right — controls */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className="flex flex-wrap gap-1.5">
                {PILLARS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActive(p.id)}
                    className={cn(
                      "text-xs rounded px-2.5 py-1.5 border transition-colors",
                      active === p.id
                        ? "bg-rurikon-800 text-white border-rurikon-600"
                        : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">{info.title}</span>
                <span className="text-xs text-rurikon-500">{info.short}</span>
                <span className="text-xs text-rurikon-400 italic">{info.detail}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
