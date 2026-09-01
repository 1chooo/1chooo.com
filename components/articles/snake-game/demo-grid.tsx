"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const COLS = 12
const ROWS = 7

const SNAKE: { x: number; y: number }[] = [
  { x: 5, y: 3 },
  { x: 4, y: 3 },
  { x: 3, y: 3 },
]
const FOOD = { x: 9, y: 4 }

export function DemoGrid() {
  const [hovered, setHovered] = useState<{ x: number; y: number } | null>(null)

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      <div className="p-4 sm:p-6 flex flex-col items-center gap-4">
        {/* Column axis labels */}
        <div className="flex" style={{ marginLeft: "1.5rem" }}>
          {Array.from({ length: COLS }, (_, x) => (
            <div
              key={x}
              className="w-7 h-4 flex items-center justify-center text-[9px] text-rurikon-300"
            >
              {x}
            </div>
          ))}
        </div>

        {/* Grid rows */}
        <div className="flex flex-col border border-rurikon-border/40">
          {Array.from({ length: ROWS }, (_, y) => (
            <div key={y} className="flex">
              {/* Row axis label */}
              <div className="w-6 flex items-center justify-center text-[9px] text-rurikon-300 border-r border-rurikon-border/40">
                {y}
              </div>
              {Array.from({ length: COLS }, (_, x) => {
                const isHead = SNAKE[0].x === x && SNAKE[0].y === y
                const isBody = SNAKE.slice(1).some((s) => s.x === x && s.y === y)
                const isFood = FOOD.x === x && FOOD.y === y
                const isHov = hovered?.x === x && hovered?.y === y

                return (
                  <div
                    key={x}
                    onMouseEnter={() => setHovered({ x, y })}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      "w-7 h-7 border-r border-b border-rurikon-border/20 transition-colors flex items-center justify-center",
                      isHead && "bg-[#2d4a7a]",
                      isBody && !isHead && "bg-[#4a6fa5]/50",
                      isFood && "bg-red-400/70",
                      isHov && !isHead && !isBody && !isFood && "bg-rurikon-50"
                    )}
                  >
                    {isHov && !isHead && !isBody && !isFood && (
                      <span className="text-[8px] text-rurikon-300 select-none">
                        {x},{y}
                      </span>
                    )}
                    {isHead && isHov && (
                      <span className="text-[8px] text-white/70 select-none">
                        {x},{y}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-5 text-xs text-rurikon-400 self-start pl-6">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#2d4a7a] inline-block" />
            head (5, 3)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#4a6fa5]/50 border border-rurikon-border inline-block" />
            body
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-red-400/70 inline-block" />
            food (9, 4)
          </span>
        </div>
      </div>

      <div className="flex items-center px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 italic">
          hover over any cell to see its (x, y) coordinate · origin (0, 0) is top-left
        </span>
      </div>
    </div>
  )
}
