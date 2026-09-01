"use client"

import { useMemo, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { copyTextToClipboard } from "@/lib/copy-to-clipboard"

export type ImagePromptMeta = {
  label: string
  value: string
  detail?: string
}

interface ImagePromptProps {
  title?: string
  label?: string
  prompt?: string
  children?: ReactNode
  meta?: readonly ImagePromptMeta[]
  summary?: string
  detail?: string
}

function nodeToText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (node == null || typeof node === "boolean") return ""
  if (Array.isArray(node)) return node.map(nodeToText).join("")
  if (typeof node === "object" && "props" in node) {
    const element = node as { props?: { children?: ReactNode } }
    return nodeToText(element.props?.children)
  }
  return ""
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
      <path d="M10.5 5.5V3.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
    </svg>
  )
}

export function ImagePrompt({
  title = "prompt",
  label = "image generation prompt",
  prompt,
  children,
  meta,
  summary,
  detail,
}: ImagePromptProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(true)

  const text = useMemo(
    () => (prompt ?? nodeToText(children)).trim(),
    [prompt, children]
  )

  const wordCount = useMemo(() => {
    const words = text.split(/\s+/).filter(Boolean)
    return words.length
  }, [text])

  async function copy() {
    const ok = await copyTextToClipboard(text)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const hasMeta = Boolean(meta && meta.length > 0)

  return (
    <div className={cn("my-8", hasMeta && "article-demo-shell")}>
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className={cn("flex flex-col", hasMeta && "text:flex-row")}>
          <div
            className={cn(
              "flex-1 min-w-0 flex flex-col",
              hasMeta && "text:border-r border-rurikon-border"
            )}
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-rurikon-border">
              <span className="font-mono text-[11px] text-rurikon-500 font-medium truncate min-w-0">
                {title}
              </span>
              <span className="font-mono text-[10px] text-rurikon-300 tabular-nums ml-auto shrink-0">
                {wordCount.toLocaleString()} words
              </span>
              <button
                type="button"
                onClick={() => void copy()}
                aria-label={copied ? "Copied prompt" : "Copy prompt"}
                className={cn(
                  "font-mono text-[11px] rounded px-2 py-1 border transition-colors inline-flex items-center gap-1.5 shrink-0",
                  copied
                    ? "bg-rurikon-800 text-white border-rurikon-600"
                    : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                )}
              >
                {copied ? (
                  <CheckIcon className="w-3 h-3" />
                ) : (
                  <CopyIcon className="w-3 h-3" />
                )}
                {copied ? "copied" : "copy"}
              </button>
            </div>

            <div className="relative">
              <pre
                className={cn(
                  "font-mono text-[11px] leading-5 text-rurikon-600 whitespace-pre-wrap wrap-break-word p-4 sm:p-6",
                  expanded ? "max-h-112 overflow-y-auto" : "max-h-52 overflow-hidden"
                )}
              >
                {text}
              </pre>
              {!expanded && (
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-[#fefefe] to-transparent"
                  aria-hidden
                />
              )}
            </div>

            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border flex-wrap">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
                {label}
              </span>
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                className={cn(
                  "font-mono text-[11px] rounded px-2 py-1 border transition-colors",
                  expanded
                    ? "bg-rurikon-800 text-white border-rurikon-600"
                    : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                )}
              >
                {expanded ? "collapse" : "expand"}
              </button>
            </div>
            <span className="sr-only" aria-live="polite">
              {copied ? "Prompt copied to clipboard" : ""}
            </span>
          </div>

          {hasMeta && (
            <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
              <div className="p-3 flex flex-col gap-3">
                <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                  {meta!.map((item) => (
                    <div key={item.label} className="mb-1 last:mb-0">
                      <span className="text-[#5a9fd4]">{item.label}</span>
                      {": "}
                      <span className="text-[#9b72d4]">{item.value}</span>
                      {item.detail && (
                        <>
                          <br />
                          <span className="text-rurikon-300">{`  // ${item.detail}`}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {(summary || detail) && (
                  <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                    <span className="font-mono text-xs text-rurikon-700 font-medium">
                      how to use
                    </span>
                    {summary && (
                      <span className="text-xs text-rurikon-500">{summary}</span>
                    )}
                    {detail && (
                      <span className="text-xs text-rurikon-400 italic">{detail}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
