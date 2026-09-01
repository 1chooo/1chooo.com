"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function DemoMotionComponent() {
  const [triggered, setTriggered] = useState(false)
  const [key, setKey] = useState(0)

  const handleReset = () => {
    setTriggered(false)
    setKey((k) => k + 1)
  }

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe]">
      {/* Content area */}
      <div className="py-5 px-6 sm:py-6 sm:px-10">
        <div className="grid grid-cols-2 gap-6">
          {/* Plain div */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-rurikon-400">
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">&lt;div&gt;</code>
            </p>
            <div
              className="w-16 h-16 rounded-2xl bg-gray-300 flex items-center justify-center text-white font-bold text-sm"
              style={{
                opacity: triggered ? 1 : 0,
                transform: triggered ? "translateY(0px)" : "translateY(20px)",
              }}
            >
              div
            </div>
            <p className="text-xs text-rurikon-400 text-center">Snaps instantly</p>
          </div>

          {/* motion.div */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-rurikon-400">
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">&lt;motion.div&gt;</code>
            </p>
            <motion.div
              key={key}
              className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center text-white font-bold text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: triggered ? 1 : 0, y: triggered ? 0 : 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              motion
            </motion.div>
            <p className="text-xs text-rurikon-400 text-center">Smooth transition</p>
          </div>
        </div>
      </div>

      {/* Bottom toolbar — placard style */}
      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
          motion.* components
        </span>
        <button
          onClick={() => setTriggered(true)}
          disabled={triggered}
          className={cn(
            "text-xs rounded px-2.5 py-1.5 border transition-colors",
            triggered
              ? "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
              : "bg-rurikon-800 text-white border-rurikon-600"
          )}
        >
          Trigger
        </button>
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
