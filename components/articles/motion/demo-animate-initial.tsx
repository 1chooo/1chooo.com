"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function DemoAnimateInitial() {
  const [key, setKey] = useState(0)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    setKey((k) => k + 1)
    setPlaying(true)
  }

  const handleReset = () => {
    setPlaying(false)
    setKey((k) => k + 1)
  }

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe]">
      {/* Content area */}
      <div className="py-5 px-6 sm:py-6 sm:px-10 flex flex-col items-center gap-5">
        {/* Code annotation */}
        <div className="w-full max-w-xs text-xs text-gray-500 font-mono bg-gray-50 border border-gray-100 rounded-xl p-3 leading-relaxed">
          <span className="text-purple-500">initial</span>
          {"={{ "}
          <span className="text-blue-500">opacity</span>: 0,{" "}
          <span className="text-blue-500">y</span>: 32 {"}}"}
          <br />
          <span className="text-purple-500">animate</span>
          {"={{ "}
          <span className="text-blue-500">opacity</span>: 1,{" "}
          <span className="text-blue-500">y</span>: 0 {"}}"}
        </div>

        {/* The animated card */}
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 32 }}
          animate={playing ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white border border-gray-100 shadow-sm rounded-2xl px-6 py-4 text-sm font-medium text-gray-800"
        >
          Hello, I animated in!
        </motion.div>
      </div>

      {/* Bottom toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
          animate &amp; initial
        </span>
        <button
          onClick={handlePlay}
          className={cn(
            "text-xs rounded px-2.5 py-1.5 border transition-colors",
            !playing
              ? "bg-rurikon-800 text-white border-rurikon-600"
              : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
          )}
        >
          Play
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
