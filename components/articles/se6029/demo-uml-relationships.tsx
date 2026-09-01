"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type RelKind = "dependency" | "association" | "inheritance" | "composition" | "aggregation" | "implementation"

const RELS: { id: RelKind; label: string }[] = [
  { id: "dependency", label: "Dependency" },
  { id: "association", label: "Association" },
  { id: "inheritance", label: "Inheritance" },
  { id: "composition", label: "Composition" },
  { id: "aggregation", label: "Aggregation" },
  { id: "implementation", label: "Implementation" },
]

type RelInfo = {
  phrase: string
  symbol: string
  code: string
  short: string
  detail: string
  lineStyle: "solid" | "dashed"
  endShape: "arrow" | "hollow-triangle" | "filled-diamond" | "hollow-diamond" | "dashed-triangle"
  fromLabel?: string
  toLabel?: string
}

const REL_INFO: Record<RelKind, RelInfo> = {
  dependency: {
    phrase: "uses a",
    symbol: "- - →",
    code: "void foo(Y y) { y.bar(); }",
    short: "Short-term — X calls a method on Y",
    detail: "Y is passed as a parameter or used as a local variable. The relationship ends when the method returns.",
    lineStyle: "dashed",
    endShape: "arrow",
    fromLabel: "X",
    toLabel: "Y",
  },
  association: {
    phrase: "knows a",
    symbol: "——→",
    code: "class X { Y* y_ptr; };",
    short: "Long-term — X holds a pointer/reference to Y",
    detail: "X keeps a reference to Y as a member field. Y may outlive X, and may be shared with others.",
    lineStyle: "solid",
    endShape: "arrow",
    fromLabel: "X",
    toLabel: "Y",
  },
  inheritance: {
    phrase: "is a",
    symbol: "——▷",
    code: "class X : public Y {};",
    short: "X is a specialisation of Y",
    detail: "Use only when the Is-A relationship is truly meaningful. The subclass inherits all public/protected members and can override virtual methods.",
    lineStyle: "solid",
    endShape: "hollow-triangle",
    fromLabel: "X (derived)",
    toLabel: "Y (base)",
  },
  composition: {
    phrase: "has a (strong)",
    symbol: "◆——",
    code: "class X { Y y; }; // or new Y in ctor",
    short: "Y lives and dies with X",
    detail: "X owns Y exclusively. Y is created in X's constructor and destroyed in X's destructor. Y cannot exist without X.",
    lineStyle: "solid",
    endShape: "filled-diamond",
    fromLabel: "X (owner)",
    toLabel: "Y (part)",
  },
  aggregation: {
    phrase: "has a (weak)",
    symbol: "◇——",
    code: "class X { Y* y_ptr; }; // externally owned",
    short: "Y can be shared by multiple X objects",
    detail: "X holds a pointer to Y, but Y is managed externally. Y can outlive X. Prefer Association over Aggregation (Larman OOAD).",
    lineStyle: "solid",
    endShape: "hollow-diamond",
    fromLabel: "X",
    toLabel: "Y (shared)",
  },
  implementation: {
    phrase: "can do",
    symbol: "- - ▷",
    code: "class X : public IY {}; // all pure virtual",
    short: "X implements interface Y",
    detail: "In C++, an interface is a class with only pure virtual methods. In Java, it's an interface. X promises to provide every operation declared by Y.",
    lineStyle: "dashed",
    endShape: "dashed-triangle",
    fromLabel: "X (concrete)",
    toLabel: "«interface» Y",
  },
}

function RelationshipDiagram({ kind }: { kind: RelKind }) {
  const info = REL_INFO[kind]

  const isDashed = info.lineStyle === "dashed"

  function Arrowhead() {
    if (info.endShape === "arrow") {
      return <span className="text-rurikon-500 text-sm">›</span>
    }
    if (info.endShape === "hollow-triangle" || info.endShape === "dashed-triangle") {
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" className="inline">
          <polygon points="1,7 13,1 13,13" fill="white" stroke="#8a9ab5" strokeWidth="1.5" />
        </svg>
      )
    }
    if (info.endShape === "filled-diamond") {
      return (
        <svg width="16" height="12" viewBox="0 0 16 12" className="inline">
          <polygon points="0,6 8,0 16,6 8,12" fill="#8a9ab5" />
        </svg>
      )
    }
    if (info.endShape === "hollow-diamond") {
      return (
        <svg width="16" height="12" viewBox="0 0 16 12" className="inline">
          <polygon points="0,6 8,0 16,6 8,12" fill="white" stroke="#8a9ab5" strokeWidth="1.5" />
        </svg>
      )
    }
    return null
  }

  const isDiamond = info.endShape === "filled-diamond" || info.endShape === "hollow-diamond"

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full">
      <div className="flex items-center gap-3">
        {/* From box */}
        <div className="border border-[#5a9fd4] bg-[#dce8f5] text-[#1a5a8b] font-mono text-xs px-3 py-2 min-w-[80px] text-center">
          {info.fromLabel ?? "X"}
        </div>

        {/* Connector */}
        <div className="flex items-center gap-0.5">
          {isDiamond && <Arrowhead />}
          <div
            className="h-px w-16 bg-rurikon-300"
            style={isDashed ? { backgroundImage: "repeating-linear-gradient(90deg, #8a9ab5 0, #8a9ab5 4px, transparent 4px, transparent 8px)", backgroundColor: "transparent" } : {}}
          />
          {!isDiamond && <Arrowhead />}
        </div>

        {/* To box */}
        <div className="border border-[#9b72d4] bg-[#ecdcf5] text-[#5a1a8b] font-mono text-xs px-3 py-2 min-w-[80px] text-center">
          {info.toLabel ?? "Y"}
        </div>
      </div>
      <div className="font-mono text-[11px] text-rurikon-400 italic">{info.phrase} · {info.symbol}</div>
    </div>
  )
}

export function DemoUMLRelationships() {
  const [active, setActive] = useState<RelKind>("inheritance")
  const info = REL_INFO[active]

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left — diagram */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6" style={{ minHeight: 200 }}>
              <RelationshipDiagram kind={active} />
            </div>

            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">UML relationship</span>
              <span className="font-mono text-xs text-rurikon-300">{active}</span>
            </div>
          </div>

          {/* Right — controls */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              <div className="flex flex-wrap gap-1.5">
                {RELS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setActive(r.id)}
                    className={cn(
                      "text-xs rounded px-2.5 py-1.5 border transition-colors",
                      active === r.id
                        ? "bg-rurikon-800 text-white border-rurikon-600"
                        : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6 break-all">
                <span className="text-[#5a9fd4]">// {info.phrase}</span>
                <br />
                {info.code}
              </div>

              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">{info.symbol}</span>
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
