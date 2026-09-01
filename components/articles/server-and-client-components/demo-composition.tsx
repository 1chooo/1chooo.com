"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Pattern = "sc-renders-sc" | "sc-renders-cc" | "cc-imports-sc" | "cc-receives-children"

const SERVER_NODE = "bg-[#f5f5f0] border-rurikon-border text-rurikon-500"
const CLIENT_NODE = "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]"
const ERROR_NODE = "bg-[#f5dce8] border-[#d45a9f] text-[#8b1a5a]"

type PatternConfig = {
  label: string
  valid: boolean
  summary: string
  detail: string
  diagram: React.ReactNode
  code: { selector: string; lines: { prop: string; value: string; comment?: string }[] }[]
}

function Node({
  label,
  kind,
  badge,
  note,
}: {
  label: string
  kind: "server" | "client" | "error"
  badge?: string
  note?: string
}) {
  const color =
    kind === "server" ? SERVER_NODE : kind === "client" ? CLIENT_NODE : ERROR_NODE
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-mono",
          color
        )}
      >
        {label}
        {badge && (
          <span
            className={cn(
              "text-[9px] px-1 py-px rounded leading-none",
              kind === "client"
                ? "bg-[#5a9fd4] text-white"
                : kind === "error"
                  ? "bg-[#d45a9f] text-white"
                  : "bg-rurikon-400 text-white"
            )}
          >
            {badge}
          </span>
        )}
      </div>
      {note && (
        <span className="text-[9px] text-rurikon-300 font-mono italic">{note}</span>
      )}
    </div>
  )
}

function Arrow({ warn }: { warn?: boolean }) {
  return (
    <div className={cn("flex flex-col items-center", warn ? "text-[#d45a9f]" : "text-rurikon-300")}>
      <div className="w-px h-5 bg-current" />
      <span className="text-[10px] leading-none">{warn ? "⚠" : "↓"}</span>
    </div>
  )
}

const PATTERNS: Record<Pattern, PatternConfig> = {
  "sc-renders-sc": {
    label: "SC → SC",
    valid: true,
    summary: "A Server Component imports and renders another Server Component.",
    detail:
      "Both run on the server. Data, secrets, and async logic flow freely. This is the default and preferred pattern for server-heavy UI.",
    diagram: (
      <div className="flex flex-col items-center gap-1 py-2">
        <Node label="ParentPage" kind="server" note="Server Component" />
        <Arrow />
        <Node label="ArticleList" kind="server" note="Server Component" />
        <Arrow />
        <Node label="ArticleCard" kind="server" note="Server Component" />
      </div>
    ),
    code: [
      {
        selector: "// ParentPage.tsx",
        lines: [
          { prop: "import", value: "ArticleList", comment: "// SC → imports SC ✓" },
        ],
      },
      {
        selector: "// both run on the server",
        lines: [
          { prop: "async", value: "function Page()" },
          { prop: "  data", value: "await db.getArticles()" },
          { prop: "  return", value: "<ArticleList data={data} />" },
        ],
      },
    ],
  },
  "sc-renders-cc": {
    label: "SC → CC",
    valid: true,
    summary: "A Server Component renders a Client Component as a leaf.",
    detail:
      "The SC fetches data and passes it as props to the CC. The CC handles interactivity. The 'use client' boundary is respected: SC runs server-side, CC is hydrated in the browser.",
    diagram: (
      <div className="flex flex-col items-center gap-1 py-2">
        <Node label="ProductPage" kind="server" note="Server Component" />
        <Arrow />
        <Node label="ProductInfo" kind="server" note="Server Component" />
        <Arrow />
        <Node label="AddToCart" kind="client" badge={'"use client"'} note="Client Component" />
      </div>
    ),
    code: [
      {
        selector: "// AddToCart.tsx",
        lines: [
          { prop: '"use client"', value: "", comment: "// marks boundary" },
          { prop: "onClick", value: "() => cart.add(id)" },
        ],
      },
      {
        selector: "// ProductInfo.tsx (SC)",
        lines: [
          { prop: "import", value: "AddToCart", comment: "// SC imports CC ✓" },
          { prop: "return", value: "<AddToCart productId={id} />" },
        ],
      },
    ],
  },
  "cc-imports-sc": {
    label: "CC imports SC",
    valid: false,
    summary: "A Client Component tries to import a Server Component directly.",
    detail:
      "This does not work as expected. Because the importing file has 'use client', the SC gets pulled into the client bundle and loses its server-only capabilities. Next.js will either error or silently convert it to a Client Component.",
    diagram: (
      <div className="flex flex-col items-center gap-1 py-2">
        <Node label="ClientShell" kind="client" badge={'"use client"'} note="Client Component" />
        <Arrow warn />
        <Node label="HeavyServerComp" kind="error" badge="error" note="Loses server benefits" />
        <div className="mt-2 px-3 py-1.5 border border-[#d45a9f]/40 bg-[#f5dce8]/30 rounded">
          <span className="text-[10px] font-mono text-[#8b1a5a]">
            ✗ Server Component cannot be imported inside a Client Component
          </span>
        </div>
      </div>
    ),
    code: [
      {
        selector: "// ClientShell.tsx",
        lines: [
          { prop: '"use client"', value: "" },
          { prop: "import", value: "HeavyServerComp", comment: "// ✗ — pulls SC into client" },
        ],
      },
      {
        selector: "// Fix: pass as children instead",
        lines: [
          { prop: "// see", value: '"SC as children"', comment: "// pattern →" },
        ],
      },
    ],
  },
  "cc-receives-children": {
    label: "SC as CC children",
    valid: true,
    summary: "Pass a Server Component as children (or a prop) to a Client Component.",
    detail:
      "The Server Component is rendered by the parent Server Component and passed as an already-rendered React node. The Client Component receives it as children without needing to import the SC directly. Both stay in their correct environments.",
    diagram: (
      <div className="flex flex-col items-center gap-1 py-2">
        <Node label="page.tsx" kind="server" note="Server Component (orchestrates)" />
        <Arrow />
        <Node label="Modal" kind="client" badge={'"use client"'} note="Client Component" />
        <div className="flex flex-col items-center gap-0.5 mt-0.5 ml-6 border-l-2 border-dashed border-rurikon-border/40 pl-3">
          <span className="text-[9px] font-mono text-rurikon-300 self-start">children prop</span>
          <Node label="ArticleContent" kind="server" note="Server Component ✓" />
        </div>
      </div>
    ),
    code: [
      {
        selector: "// page.tsx (SC)",
        lines: [
          { prop: "return", value: "<Modal>" },
          { prop: "  <ArticleContent", value: "slug={slug} />" },
          { prop: "</Modal>", value: "" },
        ],
      },
      {
        selector: "// Modal.tsx (CC)",
        lines: [
          { prop: '"use client"', value: "" },
          { prop: "children", value: "React.ReactNode", comment: "// receives SC output" },
          { prop: "return", value: "<dialog>{children}</dialog>" },
        ],
      },
    ],
  },
}

const PATTERN_KEYS: Pattern[] = [
  "sc-renders-sc",
  "sc-renders-cc",
  "cc-imports-sc",
  "cc-receives-children",
]

export function DemoComposition() {
  const [pattern, setPattern] = useState<Pattern>("sc-renders-sc")
  const p = PATTERNS[pattern]

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left — diagram + footer */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            {/* Diagram */}
            <div
              className="flex-1 flex items-center justify-center p-4 sm:p-6"
              style={{ minHeight: 200 }}
            >
              {p.diagram}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                composition patterns
              </span>
              {PATTERN_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => setPattern(key)}
                  className={cn(
                    "text-xs rounded px-2.5 py-1.5 border transition-colors",
                    pattern === key
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  {PATTERNS[key].label}
                </button>
              ))}
            </div>
          </div>

          {/* Right — description + code */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* Description */}
              <div
                className={cn(
                  "border px-3 py-3 flex flex-col gap-1.5",
                  p.valid
                    ? "border-rurikon-border/40 bg-rurikon-50/30"
                    : "border-[#d45a9f]/30 bg-[#f5dce8]/20"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-rurikon-700 font-medium">{p.label}</span>
                  <span
                    className={cn(
                      "font-mono text-[10px] px-1.5 py-0.5 rounded border",
                      p.valid
                        ? "bg-[#dce8dc] border-[#7aab4e] text-[#3a6b1a]"
                        : "bg-[#f5dce8] border-[#d45a9f] text-[#8b1a5a]"
                    )}
                  >
                    {p.valid ? "✓ valid" : "✗ avoid"}
                  </span>
                </div>
                <span className="text-xs text-rurikon-500">{p.summary}</span>
                <span className="text-xs text-rurikon-400 italic">{p.detail}</span>
              </div>

              {/* Pseudo-code output */}
              {p.code.map((block, i) => (
                <div
                  key={i}
                  className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6"
                >
                  <span className="text-rurikon-300">{block.selector}</span>
                  {block.lines.map((line, j) => (
                    <div key={j}>
                      {"  "}
                      <span className="text-[#5a9fd4]">{line.prop}</span>
                      {line.value && (
                        <>
                          {" "}
                          <span className="text-[#9b72d4]">{line.value}</span>
                        </>
                      )}
                      {line.comment && (
                        <span className="text-rurikon-300"> {line.comment}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
