"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const CARDS = [
  { id: "a", color: "bg-blue-400" },
  { id: "b", color: "bg-rose-400" },
  { id: "c", color: "bg-amber-400" },
]

export function DemoLayout() {
  const [expandedId, setExpandedId] = useState<string | null>(null)


  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe]">
      {/* Content area */}
      <div className="py-5 px-6 sm:py-6 sm:px-10">
        <div className="grid grid-cols-2 gap-6">
          {/* Without layout */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-center text-rurikon-400 font-serif italic mb-1">
              without <code>layout</code>
            </p>
            {CARDS.map((c) => (
              <div
                key={c.id}
                onClick={() =>
                  setExpandedId((prev) => (prev === c.id + "-no" ? null : c.id + "-no"))
                }
                className="bg-white border border-rurikon-border rounded-xl p-3 cursor-pointer select-none overflow-hidden transition-all duration-300"
                style={{ height: expandedId === c.id + "-no" ? 80 : 40 }}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full shrink-0 ${c.color}`} />
                  <span className="text-sm font-medium text-gray-700">Card {c.id.toUpperCase()}</span>
                </div>
                {expandedId === c.id + "-no" && (
                  <p className="text-xs text-rurikon-400 mt-2 pl-5">Siblings snap instantly.</p>
                )}
              </div>
            ))}
          </div>

          {/* With layout */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-center text-rurikon-400 font-serif italic mb-1">
              with <code>layout</code>
            </p>
            {CARDS.map((c) => (
              <motion.div
                layout
                key={c.id + "-layout"}
                onClick={() =>
                  setExpandedId((prev) =>
                    prev === c.id + "-layout" ? null : c.id + "-layout"
                  )
                }
                className="bg-white border border-rurikon-border rounded-xl p-3 cursor-pointer select-none overflow-hidden"
                animate={{ height: expandedId === c.id + "-layout" ? 80 : 40 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full shrink-0 ${c.color}`} />
                  <span className="text-sm font-medium text-gray-700">Card {c.id.toUpperCase()}</span>
                </div>
                {expandedId === c.id + "-layout" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-rurikon-400 mt-2 pl-5"
                  >
                    Siblings glide smoothly.
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-xs text-center text-rurikon-400 mt-4">Click a card to expand it</p>
      </div>

      {/* Bottom toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">layout prop</span>
        <button
          onClick={() => setExpandedId(null)}
          className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
