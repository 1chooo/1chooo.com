"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

const TABS = ["Home", "Files", "Settings"] as const
type Tab = (typeof TABS)[number]

export function DemoAnimatePresence() {
  const [visible, setVisible] = useState(true)
  const [tab, setTab] = useState<Tab>("Home")
  const [direction, setDirection] = useState(1)

  const handleTab = (next: Tab) => {
    const currentIdx = TABS.indexOf(tab)
    const nextIdx = TABS.indexOf(next)
    setDirection(nextIdx > currentIdx ? 1 : -1)
    setTab(next)
  }

  const handleReset = () => {
    setVisible(true)
    setTab("Home")
    setDirection(1)
  }

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe]">
      {/* Content area */}
      <div className="py-5 px-6 sm:py-6 sm:px-10 flex flex-col gap-6">
        {/* Mount / unmount */}
        <div>
          <p className="font-serif text-xs italic text-rurikon-400 mb-4">
            mount &amp; unmount with exit animation
          </p>
          <div className="flex flex-col items-center gap-4">
            <AnimatePresence>
              {visible && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, scale: 0.8, y: -16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black text-white rounded-2xl px-6 py-4 text-sm font-medium"
                >
                  I animate in and out
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setVisible((v) => !v)}
              className={cn(
                "text-xs rounded px-2.5 py-1.5 border transition-colors",
                visible
                  ? "bg-rurikon-800 text-white border-rurikon-600"
                  : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
              )}
            >
              {visible ? "Unmount" : "Mount"}
            </button>
          </div>
        </div>

        {/* Tab swap */}
        <div>
          <p className="font-serif text-xs italic text-rurikon-400 mb-4">
            tab swap with <code>mode=&quot;wait&quot;</code>
          </p>
          <div className="flex gap-1 mb-4 justify-center flex-wrap">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => handleTab(t)}
                className={cn(
                  "text-xs rounded px-2.5 py-1.5 border transition-colors",
                  tab === t
                    ? "bg-rurikon-800 text-white border-rurikon-600"
                    : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="h-12 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={tab}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.25 }}
                className="text-sm font-medium text-gray-700"
              >
                {tab} content
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
          AnimatePresence &amp; exit
        </span>
        <button
          onClick={handleReset}
          className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
