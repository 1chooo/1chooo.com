"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type PosType = "static" | "relative" | "absolute" | "fixed" | "sticky"

const POSITION_TYPES: PosType[] = ["static", "relative", "absolute", "fixed", "sticky"]

const DESCRIPTIONS: Record<PosType, { short: string; detail: string }> = {
  static: {
    short: "Default flow — top/left/right/bottom have no effect.",
    detail: "Every element starts as static. It participates in normal document flow and ignores offset properties.",
  },
  relative: {
    short: "Offset from its normal position; original space is preserved.",
    detail: "The element shifts visually by top/left but the layout hole stays — neighbouring elements don't move.",
  },
  absolute: {
    short: "Removed from flow; positioned relative to nearest non-static ancestor.",
    detail: "The element leaves normal flow entirely. If no positioned ancestor exists, it is placed relative to the initial containing block (the viewport).",
  },
  fixed: {
    short: "Removed from flow; always relative to the viewport.",
    detail: "Stays put when the page scrolls. Common for navbars, toasts, and cookie banners.",
  },
  sticky: {
    short: "Hybrid: flows normally until it hits a scroll threshold, then sticks.",
    detail: "Acts like relative until the scroll offset crosses the threshold you set (e.g. top: 0), then it behaves like fixed within its scroll container.",
  },
}

export function DemoPosition() {
  const [active, setActive] = useState<PosType>("static")

  return (
    <div className="my-8 article-demo-shell [--demo-aside:calc(var(--spacing)*80)]">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            <div className="p-4 sm:p-6 flex flex-col gap-5 flex-1">
              {/* Switcher */}
              <div className="flex flex-wrap gap-1.5">
                {POSITION_TYPES.map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setActive(pos)}
                    className={cn(
                      "font-mono text-xs rounded px-2.5 py-1.5 border transition-colors",
                      active === pos
                        ? "bg-rurikon-800 text-white border-rurikon-600"
                        : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                    )}
                  >
                    {pos}
                  </button>
                ))}
              </div>

              {/* Visual demo */}
              <div
                className="relative border border-rurikon-border/40 bg-rurikon-50/30 overflow-hidden"
                style={{ height: 200 }}
              >
                {/* Surrounding sibling elements (show flow) */}
                <div className="absolute inset-0 flex flex-col p-3 gap-2 pointer-events-none">
                  <div className="h-8 border border-rurikon-border/30 bg-[#f5e6cc]/40 rounded flex items-center px-2">
                    <span className="text-[10px] text-rurikon-300 font-mono">sibling before</span>
                  </div>
                  {/* The target element indicator */}
                  <div className="h-8 border-2 border-dashed border-rurikon-border/40 rounded flex items-center px-2">
                    <span className="text-[10px] text-rurikon-300 font-mono italic">
                      {active === "static" || active === "relative" ? "← original space" : "← space collapsed (out of flow)"}
                    </span>
                  </div>
                  <div className="h-8 border border-rurikon-border/30 bg-[#f5e6cc]/40 rounded flex items-center px-2">
                    <span className="text-[10px] text-rurikon-300 font-mono">sibling after</span>
                  </div>
                </div>

                {/* The positioned element */}
                <div
                  className={cn(
                    "flex items-center justify-center border-2 border-[#5a9fd4] bg-[#dce8f5] text-[#1a5a8b] text-xs font-mono rounded transition-all duration-300",
                    "w-32 h-8"
                  )}
                  style={{
                    position:
                      active === "fixed" ? "absolute" : active, // use absolute to simulate fixed inside the container
                    ...(active === "static" && { top: 44, left: 12 }),
                    ...(active === "relative" && { top: 44, left: 12, transform: "translate(24px, 8px)" }),
                    ...(active === "absolute" && { top: 8, right: 12 }),
                    ...(active === "fixed" && { bottom: 8, right: 12 }),
                    ...(active === "sticky" && { top: 8, left: "50%", transform: "translateX(-50%)" }),
                  }}
                >
                  position: {active}
                </div>

                {/* fixed label badge */}
                {active === "fixed" && (
                  <div className="absolute bottom-8 right-12 -translate-y-full mb-1">
                    <span className="text-[9px] font-mono text-rurikon-400 bg-white border border-rurikon-border px-1 rounded">
                      simulated: would be viewport-relative
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 mr-auto italic">positioning schemes</span>
            </div>
          </div>

          {/* Right column: description + CSS output */}
          <div className="w-full text:w-80 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">
              {/* Description */}
              <div className="border border-rurikon-border/40 bg-rurikon-50/30 px-3 py-3 flex flex-col gap-1">
                <span className="font-mono text-xs text-rurikon-700 font-medium">position: {active}</span>
                <span className="text-xs text-rurikon-500">{DESCRIPTIONS[active].short}</span>
                <span className="text-xs text-rurikon-400 italic">{DESCRIPTIONS[active].detail}</span>
              </div>

              {/* CSS output */}
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <span className="text-rurikon-400">.element {"{"}</span>
                <br />
                {"  "}<span className="text-[#5a9fd4]">position</span>: <span className="text-[#9b72d4]">{active}</span>;
                {active !== "static" && (
                  <>
                    <br />
                    {"  "}<span className="text-[#5a9fd4]">top</span>: <span className="text-[#9b72d4]">0</span>;
                    {"  "}{/* example offset */}
                    <span className="text-rurikon-300">{"/* or any offset */"}</span>
                  </>
                )}
                {(active === "absolute" || active === "fixed" || active === "sticky") && (
                  <>
                    <br />
                    {"  "}<span className="text-rurikon-300">{"/* z-index works on non-static elements */"}</span>
                  </>
                )}
                <br />
                <span className="text-rurikon-400">{"}"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
