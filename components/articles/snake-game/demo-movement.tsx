"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const COLS = 10
const ROWS = 6

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Pt = { x: number; y: number }

const DIR_LABELS: Record<Dir, string> = {
  UP: "↑ UP  y−1",
  DOWN: "↓ DOWN  y+1",
  LEFT: "← LEFT  x−1",
  RIGHT: "→ RIGHT  x+1",
}

const OPPOSITE: Record<Dir, Dir> = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
}

const DELTA: Record<Dir, Pt> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
}

const FOOD_POS: Pt = { x: 7, y: 2 }

const INIT_SNAKE: Pt[] = [
  { x: 4, y: 2 },
  { x: 3, y: 2 },
  { x: 2, y: 2 },
]

function isWallCollision(p: Pt) {
  return p.x < 0 || p.x >= COLS || p.y < 0 || p.y >= ROWS
}

export function DemoMovement() {
  const [snake, setSnake] = useState<Pt[]>(INIT_SNAKE)
  const [dir, setDir] = useState<Dir>("RIGHT")
  const [food, setFood] = useState<Pt>(FOOD_POS)
  const [log, setLog] = useState<string[]>([])
  const [collided, setCollided] = useState<"wall" | "self" | null>(null)
  const [score, setScore] = useState(0)

  const step = (nextDir: Dir) => {
    if (collided) return
    const actualDir = nextDir === OPPOSITE[dir] ? dir : nextDir
    const head = snake[0]
    const d = DELTA[actualDir]
    const newHead = { x: head.x + d.x, y: head.y + d.y }

    const entry = `step → dir=${actualDir}  head (${head.x},${head.y}) → (${newHead.x},${newHead.y})`

    if (isWallCollision(newHead)) {
      setLog((l) => [`💥 wall collision at (${newHead.x},${newHead.y})`, ...l].slice(0, 6))
      setCollided("wall")
      return
    }

    if (snake.slice(0, -1).some((s) => s.x === newHead.x && s.y === newHead.y)) {
      setLog((l) => [`💥 self collision at (${newHead.x},${newHead.y})`, ...l].slice(0, 6))
      setCollided("self")
      return
    }

    const atFood = newHead.x === food.x && newHead.y === food.y
    const newSnake = [newHead, ...snake]
    if (!atFood) newSnake.pop()

    setSnake(newSnake)
    setDir(actualDir)
    setLog((l) => [
      atFood ? `🍎 ${entry}  +1 score` : entry,
      ...l,
    ].slice(0, 6))
    if (atFood) {
      setScore((s) => s + 1)
      // Move food to a random free cell
      let f: Pt
      do {
        f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
      } while (newSnake.some((s) => s.x === f.x && s.y === f.y))
      setFood(f)
    }
  }

  const reset = () => {
    setSnake(INIT_SNAKE)
    setDir("RIGHT")
    setFood(FOOD_POS)
    setLog([])
    setCollided(null)
    setScore(0)
  }

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      <div className="p-4 sm:p-6 flex flex-col gap-4">
        {/* Grid */}
        <div className="flex flex-col border border-rurikon-border/40 self-center">
          {Array.from({ length: ROWS }, (_, y) => (
            <div key={y} className="flex">
              {Array.from({ length: COLS }, (_, x) => {
                const isHead = snake[0].x === x && snake[0].y === y
                const isBody = snake.slice(1).some((s) => s.x === x && s.y === y)
                const isFood = food.x === x && food.y === y
                return (
                  <div
                    key={x}
                    className={cn(
                      "w-8 h-8 border-r border-b border-rurikon-border/20 flex items-center justify-center",
                      isHead && (collided ? "bg-red-400" : "bg-[#2d4a7a]"),
                      isBody && !isHead && "bg-[#4a6fa5]/50",
                      isFood && "bg-red-400/70",
                    )}
                  >
                    {isHead && (
                      <span className="text-[8px] text-white/70 select-none">
                        {collided ? "✕" : "●"}
                      </span>
                    )}
                    {isFood && !isHead && (
                      <span className="text-[10px] select-none">🍎</span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Direction buttons */}
        <div className="flex flex-col items-center gap-1.5 self-center">
          <button
            onClick={() => step("UP")}
            disabled={!!collided}
            className={cn(
              "text-xs rounded px-4 py-1.5 border transition-colors",
              collided
                ? "border-rurikon-border/30 text-rurikon-300 cursor-not-allowed"
                : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
            )}
          >
            ↑
          </button>
          <div className="flex gap-1.5">
            {(["LEFT", "DOWN", "RIGHT"] as Dir[]).map((d) => (
              <button
                key={d}
                onClick={() => step(d)}
                disabled={!!collided}
                className={cn(
                  "text-xs rounded px-4 py-1.5 border transition-colors",
                  collided
                    ? "border-rurikon-border/30 text-rurikon-300 cursor-not-allowed"
                    : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                )}
              >
                {d === "LEFT" ? "←" : d === "DOWN" ? "↓" : "→"}
              </button>
            ))}
          </div>
        </div>

        {/* Log */}
        <div className="font-mono text-[10px] text-rurikon-400 bg-rurikon-50/50 border border-rurikon-border/40 px-3 py-2 h-24 overflow-y-auto">
          {log.length === 0 && !collided && (
            <div className="text-rurikon-300 italic">press a direction button to step …</div>
          )}
          {collided && (
            <div className="text-red-400 mb-4">
              game over · {collided === "wall" ? "hit the wall" : "hit itself"} · score: {score}
            </div>
          )}
          {log.map((l, i) => (
            <div key={i} className="mb-4 wrap-break-word">{l}</div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
          current dir: {DIR_LABELS[dir]} · score: {score}
        </span>
        <button
          onClick={reset}
          className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
