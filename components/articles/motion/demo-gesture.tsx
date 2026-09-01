"use client"

import { useState } from "react"
import { motion } from "motion/react"

export function DemoGesture() {
  const [hoverCount, setHoverCount] = useState(0)
  const [tapCount, setTapCount] = useState(0)

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe]">
      {/* Content area */}
      <div className="py-5 px-6 sm:py-6 sm:px-10 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* whileHover only */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onHoverStart={() => setHoverCount((c) => c + 1)}
              className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center cursor-pointer select-none"
            >
              <span className="text-xs font-medium text-white">hover me</span>
            </motion.div>
            <p className="font-serif text-xs italic text-rurikon-400">whileHover</p>
          </div>

          {/* whileTap only */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              onClick={() => setTapCount((c) => c + 1)}
              className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center cursor-pointer select-none"
            >
              <span className="text-xs font-medium text-white">tap me</span>
            </motion.div>
            <p className="font-serif text-xs italic text-rurikon-400">whileTap</p>
          </div>

          {/* both */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.92, y: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onHoverStart={() => setHoverCount((c) => c + 1)}
              onTap={() => setTapCount((c) => c + 1)}
              className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center cursor-pointer select-none"
            >
              <span className="text-xs font-medium text-white">both</span>
            </motion.div>
            <p className="font-serif text-xs italic text-rurikon-400">both</p>
          </div>
        </div>

        {(hoverCount > 0 || tapCount > 0) && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center font-serif text-xs italic text-rurikon-400"
          >
            {hoverCount > 0 && (
              <>Hovered {hoverCount} time{hoverCount !== 1 ? "s" : ""}{tapCount > 0 ? "  ·  " : ""}</>
            )}
            {tapCount > 0 && (
              <>Tapped {tapCount} time{tapCount !== 1 ? "s" : ""}</>
            )}
          </motion.p>
        )}
      </div>

      {/* Bottom toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
          whileHover &amp; whileTap
        </span>
        <button
          onClick={() => { setTapCount(0); setHoverCount(0) }}
          className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
