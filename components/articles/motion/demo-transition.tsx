"use client"

import { useState, useRef, useEffect } from "react"
import { type Transition, motion } from "motion/react"
import { cn } from "@/lib/utils"

interface TransitionItem {
  label: string
  color: string
  transition: Transition
}

const ITEMS: TransitionItem[] = [
  {
    label: "tween",
    color: "bg-blue-500",
    transition: { type: "tween", duration: 0.6, ease: "easeInOut" },
  },
  {
    label: "spring",
    color: "bg-emerald-500",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  {
    label: "stiff spring",
    color: "bg-orange-500",
    transition: { type: "spring", stiffness: 600, damping: 10 },
  },
]

export function DemoTransition() {
  const [moved, setMoved] = useState(false)
  const trackRefs = useRef<(HTMLDivElement | null)[]>([])
  const [trackWidths, setTrackWidths] = useState<number[]>([])

  useEffect(() => {
    // Update track widths on mount and when window resizes
    function updateWidths() {
      setTrackWidths(trackRefs.current.map(ref => ref?.offsetWidth || 0))
    }
    updateWidths()
    window.addEventListener('resize', updateWidths)
    return () => window.removeEventListener('resize', updateWidths)
  }, [])

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe]">
      {/* Content area — horizontally scrollable so the long track always shows */}
      <div className="py-5 px-6 sm:py-6 sm:px-10 overflow-x-auto">
        <div className="flex flex-col gap-5">
          {ITEMS.map(({ label, color, transition }, idx) => (
            <div key={label} className="flex items-center gap-4 w-full">
              <span className="font-serif text-xs italic text-rurikon-400 w-20 shrink-0 text-right">
                {label}
              </span>
              {/* Responsive track width: full width on mobile, fixed on larger screens */}
              <div
                ref={el => {trackRefs.current[idx] = el}}
                className="relative h-10 bg-gray-50 rounded-full overflow-hidden border border-rurikon-border w-full sm:w-100"
              >
                <motion.div
                  className={`absolute left-2 top-2 w-6 h-6 rounded-full ${color}`}
                  animate={{
                    // Always clamp to measured track width so the ball never exits the bar,
                    // regardless of screen size or orientation change.
                    x: moved ? Math.max(0, (trackWidths[idx] ?? 0) - 40) : 0
                  }}
                  transition={transition}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
          transition types
        </span>
        <button
          onClick={() => setMoved(true)}
          disabled={moved}
          className={cn(
            "text-xs rounded px-2.5 py-1.5 border transition-colors",
            !moved
              ? "bg-rurikon-800 text-white border-rurikon-600"
              : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
          )}
        >
          Go →
        </button>
        <button
          onClick={() => setMoved(false)}
          disabled={!moved}
          className={cn(
            "text-xs rounded px-2.5 py-1.5 border transition-colors",
            moved
              ? "bg-rurikon-800 text-white border-rurikon-600"
              : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
          )}
        >
          ← Back
        </button>
        <button
          onClick={() => setMoved(false)}
          className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
