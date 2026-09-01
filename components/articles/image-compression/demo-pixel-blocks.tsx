"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const GRID = 16   // 16×16 pixels = 2×2 blocks of 8×8
const BLOCK = 8

function pixelColor(x: number, y: number): [number, number, number] {
  const r = Math.round(128 + 72 * Math.sin((x / GRID) * Math.PI * 2.5))
  const g = Math.round(128 + 72 * Math.sin((y / GRID) * Math.PI * 2.5 + 1))
  const b = Math.round(128 + 72 * Math.cos(((x + y) / GRID) * Math.PI * 2))
  return [
    Math.max(0, Math.min(255, r)),
    Math.max(0, Math.min(255, g)),
    Math.max(0, Math.min(255, b)),
  ]
}

export function DemoPixelBlocks() {
  const [hovered, setHovered] = useState<{ x: number; y: number } | null>(null)
  const [selected, setSelected] = useState<{ bx: number; by: number } | null>(null)

  const hovBx = hovered ? Math.floor(hovered.x / BLOCK) : null
  const hovBy = hovered ? Math.floor(hovered.y / BLOCK) : null

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6">
        {/* Pixel grid */}
        <div className="flex flex-col" style={{ width: "fit-content" }}>
          {Array.from({ length: GRID }, (_, y) => (
            <div key={y} className="flex">
              {Array.from({ length: GRID }, (_, x) => {
                const [r, g, b] = pixelColor(x, y)
                const bx = Math.floor(x / BLOCK)
                const by = Math.floor(y / BLOCK)
                const inHovBlock = hovBx === bx && hovBy === by
                const inSelBlock = selected?.bx === bx && selected?.by === by
                const isHov = hovered?.x === x && hovered?.y === y
                const blockRight = (x + 1) % BLOCK === 0 && x + 1 < GRID
                const blockBottom = (y + 1) % BLOCK === 0 && y + 1 < GRID

                return (
                  <div
                    key={x}
                    onMouseEnter={() => setHovered({ x, y })}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelected({ bx, by })}
                    className={cn(
                      "w-[18px] h-[18px] cursor-pointer transition-opacity",
                      blockRight && "border-r-2 border-r-rurikon-400/60",
                      blockBottom && "border-b-2 border-b-rurikon-400/60",
                      inSelBlock && !isHov && "brightness-110",
                    )}
                    style={{
                      backgroundColor: `rgb(${r},${g},${b})`,
                      outline: isHov ? "2px solid white" : undefined,
                      outlineOffset: "-2px",
                      opacity: inHovBlock ? 1 : selected ? (inSelBlock ? 1 : 0.55) : 1,
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-4 text-xs text-rurikon-500 min-w-44">
          {hovered ? (
            <>
              <div>
                <span className="text-rurikon-300 uppercase tracking-widest text-[10px]">pixel</span>
                <div className="mt-1 font-mono">
                  ({hovered.x}, {hovered.y})
                </div>
              </div>
              <div>
                <span className="text-rurikon-300 uppercase tracking-widest text-[10px]">block</span>
                <div className="mt-1 font-mono">
                  ({hovBx}, {hovBy}) of (0–1, 0–1)
                </div>
              </div>
              <div>
                <span className="text-rurikon-300 uppercase tracking-widest text-[10px]">rgb</span>
                {(() => {
                  const [r, g, b] = pixelColor(hovered.x, hovered.y)
                  return (
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className="w-3 h-3 inline-block border border-white/30 shrink-0"
                        style={{ backgroundColor: `rgb(${r},${g},${b})` }}
                      />
                      <span className="font-mono">
                        {r}, {g}, {b}
                      </span>
                    </div>
                  )
                })()}
              </div>
              <div>
                <span className="text-rurikon-300 uppercase tracking-widest text-[10px]">
                  local coords
                </span>
                <div className="mt-1 font-mono text-rurikon-300">
                  ({hovered.x % BLOCK}, {hovered.y % BLOCK}) inside block
                </div>
              </div>
            </>
          ) : (
            <p className="italic text-rurikon-300 leading-relaxed">
              Hover a pixel to inspect it. Click to highlight its block.
            </p>
          )}

          <div className="mt-auto pt-3 border-t border-rurikon-border/40 flex flex-col gap-1 text-[10px] text-rurikon-400">
            <div className="flex items-center gap-2">
              <span className="w-4 h-px bg-rurikon-border inline-block" />
              pixel boundary
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-rurikon-400/60 inline-block" />
              8×8 block boundary
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">8×8 block grid</span>
        <span className="text-[10px] text-rurikon-300">16×16 px · 4 blocks total</span>
      </div>
    </div>
  )
}
