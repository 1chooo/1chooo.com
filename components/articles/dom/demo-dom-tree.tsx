"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface TreeNode {
  id: string
  tag: string
  nodeType: 1 | 9
  attrs?: Record<string, string>
  textContent?: string
  children?: TreeNode[]
}

const DOM: TreeNode = {
  id: "doc",
  tag: "#document",
  nodeType: 9,
  children: [
    {
      id: "html",
      tag: "html",
      nodeType: 1,
      attrs: { lang: "en" },
      children: [
        {
          id: "head",
          tag: "head",
          nodeType: 1,
          children: [
            { id: "meta", tag: "meta", nodeType: 1, attrs: { charset: "utf-8" } },
            { id: "title", tag: "title", nodeType: 1, textContent: "My Page" },
          ],
        },
        {
          id: "body",
          tag: "body",
          nodeType: 1,
          children: [
            {
              id: "header",
              tag: "header",
              nodeType: 1,
              children: [
                {
                  id: "h1",
                  tag: "h1",
                  nodeType: 1,
                  textContent: "Hello World",
                },
              ],
            },
            {
              id: "main",
              tag: "main",
              nodeType: 1,
              children: [
                {
                  id: "p1",
                  tag: "p",
                  nodeType: 1,
                  attrs: { class: "intro" },
                  textContent: "Introduction.",
                },
                {
                  id: "ul",
                  tag: "ul",
                  nodeType: 1,
                  children: [
                    { id: "li1", tag: "li", nodeType: 1, textContent: "Item one" },
                    { id: "li2", tag: "li", nodeType: 1, textContent: "Item two" },
                  ],
                },
              ],
            },
            {
              id: "footer",
              tag: "footer",
              nodeType: 1,
              textContent: "© 2024",
            },
          ],
        },
      ],
    },
  ],
}

function findNode(root: TreeNode, id: string): TreeNode | null {
  if (root.id === id) return root
  for (const c of root.children ?? []) {
    const f = findNode(c, id)
    if (f) return f
  }
  return null
}

function NodeRow({
  node,
  depth,
  selected,
  onSelect,
}: {
  node: TreeNode
  depth: number
  selected: string | null
  onSelect: (id: string) => void
}) {
  const [open, setOpen] = useState(true)
  const isSelected = selected === node.id
  const hasKids = (node.children?.length ?? 0) > 0

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 py-0.5 rounded cursor-pointer text-xs select-none transition-colors",
          isSelected ? "bg-rurikon-800 text-white" : "hover:bg-rurikon-50"
        )}
        style={{ paddingLeft: depth * 16 + 6, paddingRight: 6 }}
        onClick={() => onSelect(node.id)}
      >
        <span
          className={cn(
            "w-3 text-center font-mono text-[10px] shrink-0 leading-none",
            isSelected ? "text-white/60" : "text-rurikon-300"
          )}
          onClick={
            hasKids
              ? (e) => {
                  e.stopPropagation()
                  setOpen((o) => !o)
                }
              : undefined
          }
        >
          {hasKids ? (open ? "▾" : "▸") : ""}
        </span>
        <span
          className={cn(
            "font-mono",
            isSelected
              ? "text-white"
              : node.nodeType === 9
              ? "text-[#5a1a8b]"
              : "text-[#1a5a8b]"
          )}
        >
          {node.nodeType === 9 ? "#document" : `<${node.tag}>`}
        </span>
        {node.attrs && (
          <span
            className={cn(
              "font-mono text-[10px] truncate max-w-30",
              isSelected ? "text-white/60" : "text-rurikon-400"
            )}
          >
            {Object.entries(node.attrs)
              .map(([k, v]) => `${k}="${v}"`)
              .join(" ")}
          </span>
        )}
        {!hasKids && node.textContent && (
          <span
            className={cn(
              "font-mono text-[10px] truncate",
              isSelected ? "text-white/60" : "text-rurikon-400"
            )}
          >
            &ldquo;{node.textContent}&rdquo;
          </span>
        )}
      </div>
      {open &&
        node.children?.map((c) => (
          <NodeRow
            key={c.id}
            node={c}
            depth={depth + 1}
            selected={selected}
            onSelect={onSelect}
          />
        ))}
    </div>
  )
}

const NODE_TYPES: Record<number, string> = {
  1: "Element",
  3: "Text",
  8: "Comment",
  9: "Document",
}

export function DemoDOMTree() {
  const [sel, setSel] = useState<string | null>("p1")
  const node = sel ? findNode(DOM, sel) : null
  const childrenCount = node?.children?.length ?? 0
  const childNodesCount = childrenCount + (node?.textContent ? 1 : 0)

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          {/* Left: tree */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="flex-1 overflow-auto p-4 sm:p-5" style={{ minHeight: 220 }}>
              <NodeRow node={DOM} depth={0} selected={sel} onSelect={setSel} />
            </div>
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                dom tree explorer
              </span>
              <button
                onClick={() => setSel(null)}
                className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
              >
                deselect
              </button>
            </div>
          </div>

          {/* Right: node info panel */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {node ? (
                <>
                  <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                    <span className="font-mono text-xs text-rurikon-700 font-medium">
                      selected node
                    </span>
                    <span className="font-mono text-xs text-[#1a5a8b]">
                      {node.nodeType === 9 ? "#document" : `<${node.tag}>`}
                    </span>
                    {node.attrs && (
                      <span className="text-xs text-rurikon-400 italic">
                        {Object.entries(node.attrs)
                          .map(([k, v]) => `${k}="${v}"`)
                          .join(", ")}
                      </span>
                    )}
                  </div>

                  <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                    <span className="text-rurikon-400">// node properties</span>
                    <br />
                    <span className="text-[#5a9fd4]">nodeType</span>
                    {": "}
                    <span className="text-[#9b72d4]">{node.nodeType}</span>
                    {"  "}
                    <span className="text-rurikon-400">// {NODE_TYPES[node.nodeType]}</span>
                    <br />
                    <span className="text-[#5a9fd4]">nodeName</span>
                    {': "'}
                    <span className="text-[#9b72d4]">
                      {node.nodeType === 9
                        ? "#document"
                        : node.tag.toUpperCase()}
                    </span>
                    {'"'}
                    <br />
                    <span className="text-[#5a9fd4]">children.length</span>
                    {": "}
                    <span className="text-[#9b72d4]">{childrenCount}</span>
                    <br />
                    <span className="text-[#5a9fd4]">childNodes.length</span>
                    {": "}
                    <span className="text-[#9b72d4]">{childNodesCount}</span>
                    {node.textContent && (
                      <>
                        <br />
                        <span className="text-[#5a9fd4]">textContent</span>
                        {': "'}
                        <span className="text-[#9b72d4]">{node.textContent}</span>
                        {'"'}
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {[1, 3, 8, 9].map((t) => (
                      <span
                        key={t}
                        className={cn(
                          "font-mono text-[11px] px-2 py-0.5 border border-rurikon-border/40",
                          node.nodeType === t
                            ? "bg-rurikon-800 text-white"
                            : "text-rurikon-300"
                        )}
                      >
                        {t}={NODE_TYPES[t]}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3">
                  <span className="text-xs text-rurikon-400 italic">
                    click any node to inspect it
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
