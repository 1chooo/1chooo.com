"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type NodeType = "server" | "client"

type TreeNode = {
  id: string
  label: string
  file?: string
  type: NodeType
  isClientBoundary?: boolean
  children?: TreeNode[]
}

type Scenario = "optimal" | "heavy" | "children"

const SCENARIOS: Record<
  Scenario,
  { label: string; tree: TreeNode; summary: string; detail: string }
> = {
  optimal: {
    label: "leaf-level client",
    summary: "Push 'use client' as far down as possible.",
    detail:
      "Default in Next.js App Router. Server Components form the skeleton and only the leaves that need interactivity become Client Components.",
    tree: {
      id: "layout", label: "layout.tsx", file: "app/layout.tsx", type: "server",
      children: [
        {
          id: "header", label: "Header", file: "components/Header.tsx", type: "server",
          children: [
            { id: "logo", label: "Logo", file: "components/Logo.tsx", type: "server" },
            {
              id: "nav", label: "NavMenu", file: "components/NavMenu.tsx",
              type: "client", isClientBoundary: true,
            },
          ],
        },
        {
          id: "page", label: "page.tsx", file: "app/page.tsx", type: "server",
          children: [
            {
              id: "list", label: "ProductList", file: "components/ProductList.tsx", type: "server",
              children: [
                { id: "card", label: "ProductCard", file: "components/ProductCard.tsx", type: "server" },
                {
                  id: "btn", label: "AddToCart", file: "components/AddToCart.tsx",
                  type: "client", isClientBoundary: true,
                },
              ],
            },
          ],
        },
        { id: "footer", label: "Footer", file: "components/Footer.tsx", type: "server" },
      ],
    },
  },
  heavy: {
    label: "too much client",
    summary: "Anti-pattern: 'use client' placed too high in the tree.",
    detail:
      "Moving the boundary to a parent pulls all its imported children into the browser bundle, losing data-fetching and bundle-size benefits.",
    tree: {
      id: "layout", label: "layout.tsx", file: "app/layout.tsx", type: "server",
      children: [
        {
          id: "page", label: "page.tsx", file: "app/page.tsx",
          type: "client", isClientBoundary: true,
          children: [
            { id: "header", label: "Header", file: "components/Header.tsx", type: "client" },
            {
              id: "list", label: "ProductList", file: "components/ProductList.tsx", type: "client",
              children: [
                { id: "card", label: "ProductCard", file: "components/ProductCard.tsx", type: "client" },
                { id: "btn", label: "AddToCart", file: "components/AddToCart.tsx", type: "client" },
              ],
            },
            { id: "footer", label: "Footer", file: "components/Footer.tsx", type: "client" },
          ],
        },
      ],
    },
  },
  children: {
    label: "SC as CC children",
    summary: "Pass Server Components as props/children to Client Components.",
    detail:
      "A Client Component can receive Server Component output as children. The SC still runs on the server; only the CC shell is hydrated client-side.",
    tree: {
      id: "page", label: "page.tsx", file: "app/page.tsx", type: "server",
      children: [
        {
          id: "modal", label: "Modal (CC)", file: "components/Modal.tsx",
          type: "client", isClientBoundary: true,
          children: [
            {
              id: "content", label: "ArticleContent (SC)",
              file: "components/ArticleContent.tsx", type: "server",
              children: [
                { id: "heading", label: "ArticleHeading", type: "server" },
                { id: "body", label: "ArticleBody", type: "server" },
              ],
            },
          ],
        },
      ],
    },
  },
}

const SCENARIO_KEYS: Scenario[] = ["optimal", "heavy", "children"]

function NodeView({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const isClient = node.type === "client"
  return (
    <div>
      <div
        className="flex items-center gap-1.5 py-0.75"
        style={{ paddingLeft: depth * 18 }}
      >
        {depth > 0 && (
          <span className="font-mono text-[10px] text-rurikon-200 select-none shrink-0">└─</span>
        )}
        <div
          className={cn(
            "flex items-center gap-1.5 px-2 py-0.75 rounded border text-[11px] font-mono transition-colors select-none",
            isClient
              ? "bg-[#dce8f5] border-[#5a9fd4] text-[#1a5a8b]"
              : "bg-[#f5f5f0] border-rurikon-border text-rurikon-500"
          )}
        >
          {node.label}
          {node.isClientBoundary && (
            <span className="font-mono text-[9px] bg-[#5a9fd4] text-white px-1 py-px rounded leading-none">
              "use&nbsp;client"
            </span>
          )}
        </div>
        {node.file && (
          <span className="font-mono text-[10px] text-rurikon-200 hidden sm:inline">{node.file}</span>
        )}
      </div>
      {node.children?.map((child) => (
        <NodeView key={child.id} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}

function countNodes(node: TreeNode, type: NodeType): number {
  const count = node.type === type ? 1 : 0
  return count + (node.children?.reduce((acc, c) => acc + countNodes(c, type), 0) ?? 0)
}

export function DemoComponentTree() {
  const [scenario, setScenario] = useState<Scenario>("optimal")
  const s = SCENARIOS[scenario]

  const scCount = countNodes(s.tree, "server")
  const ccCount = countNodes(s.tree, "client")

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left — tree + footer */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 p-4 sm:p-6" style={{ minHeight: 200 }}>
              <NodeView node={s.tree} depth={0} />
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">component tree</span>
              {SCENARIO_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => setScenario(key)}
                  className={cn(
                    "text-xs rounded px-2.5 py-1.5 border transition-colors",
                    scenario === key
                      ? "bg-rurikon-800 text-white border-rurikon-600"
                      : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                  )}
                >
                  {SCENARIOS[key].label}
                </button>
              ))}
            </div>
          </div>

          {/* Right — info panel */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* Description */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1.5">
                <span className="font-mono text-xs text-rurikon-700 font-medium">{s.label}</span>
                <span className="text-xs text-rurikon-500">{s.summary}</span>
                <span className="text-xs text-rurikon-400 italic">{s.detail}</span>
              </div>

              {/* Stats */}
              <div className="flex gap-2">
                <div className="flex-1 border border-rurikon-border/40 bg-[#f5f5f0] px-3 py-2 flex flex-col gap-0.5 rounded">
                  <span className="font-mono text-[10px] text-rurikon-400">server components</span>
                  <span className="font-mono text-lg text-rurikon-600 font-medium">{scCount}</span>
                </div>
                <div className="flex-1 border border-[#5a9fd4]/40 bg-[#dce8f5]/40 px-3 py-2 flex flex-col gap-0.5 rounded">
                  <span className="font-mono text-[10px] text-[#1a5a8b]/70">client components</span>
                  <span className="font-mono text-lg text-[#1a5a8b] font-medium">{ccCount}</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] text-rurikon-400">legend</span>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-[#f5f5f0] border border-rurikon-border" />
                    <span className="text-[11px] text-rurikon-400">Server Component</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-[#dce8f5] border border-[#5a9fd4]" />
                    <span className="text-[11px] text-[#1a5a8b]/70">Client Component</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
