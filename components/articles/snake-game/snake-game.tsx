"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

const COLS = 20
const ROWS = 15
const CELL = 20
const TICK_MS = 140

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Pt = { x: number; y: number }

const OPPOSITE: Record<Dir, Dir> = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
}

function initSnake(): Pt[] {
  return [
    { x: 10, y: 7 },
    { x: 9, y: 7 },
    { x: 8, y: 7 },
  ]
}

function randomFood(snake: Pt[]): Pt {
  let p: Pt
  do {
    p = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    }
  } while (snake.some((s) => s.x === p.x && s.y === p.y))
  return p
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  snake: Pt[],
  food: Pt
) {
  const W = COLS * CELL
  const H = ROWS * CELL

  // Background
  ctx.fillStyle = "#0c0c0c"
  ctx.fillRect(0, 0, W, H)

  // Subtle grid dots
  ctx.fillStyle = "#1c1c1c"
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      ctx.fillRect(x * CELL + 9, y * CELL + 9, 2, 2)
    }
  }

  // Food
  const fx = food.x * CELL + 3
  const fy = food.y * CELL + 3
  const fs = CELL - 6
  ctx.fillStyle = "#d94f4f"
  ctx.fillRect(fx, fy, fs, fs)
  ctx.fillStyle = "#e87070"
  ctx.fillRect(fx + 2, fy + 2, fs - 4, fs - 4)

  // Snake body (draw tail-to-head so head renders on top)
  for (let i = snake.length - 1; i >= 0; i--) {
    const pt = snake[i]
    const isHead = i === 0
    ctx.fillStyle = isHead ? "#3d5f95" : "#2a4470"
    ctx.fillRect(pt.x * CELL + 1, pt.y * CELL + 1, CELL - 2, CELL - 2)
    if (isHead) {
      ctx.fillStyle = "#5a7fbf"
      ctx.fillRect(pt.x * CELL + 4, pt.y * CELL + 4, CELL - 8, CELL - 8)
    } else {
      ctx.fillStyle = "#324f80"
      ctx.fillRect(pt.x * CELL + 3, pt.y * CELL + 3, CELL - 6, CELL - 6)
    }
  }
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const gameRef = useRef({
    snake: initSnake(),
    dir: "RIGHT" as Dir,
    nextDir: "RIGHT" as Dir,
    food: { x: 15, y: 7 } as Pt,
    score: 0,
    running: false,
  })

  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<"idle" | "running" | "over">("idle")

  const stopGame = useCallback((markOver = true) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    gameRef.current.running = false
    if (markOver) setPhase("over")
  }, [])

  const tick = useCallback(() => {
    const g = gameRef.current
    g.dir = g.nextDir
    const head = g.snake[0]
    const newHead: Pt = {
      x: head.x + (g.dir === "RIGHT" ? 1 : g.dir === "LEFT" ? -1 : 0),
      y: head.y + (g.dir === "DOWN" ? 1 : g.dir === "UP" ? -1 : 0),
    }

    // Wall collision
    if (
      newHead.x < 0 ||
      newHead.x >= COLS ||
      newHead.y < 0 ||
      newHead.y >= ROWS
    ) {
      stopGame()
      return
    }

    // Self collision — ignore last segment (it will be removed)
    if (g.snake.slice(0, -1).some((s) => s.x === newHead.x && s.y === newHead.y)) {
      stopGame()
      return
    }

    g.snake.unshift(newHead)

    if (newHead.x === g.food.x && newHead.y === g.food.y) {
      g.score++
      setScore(g.score)
      g.food = randomFood(g.snake)
    } else {
      g.snake.pop()
    }

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx) drawFrame(ctx, g.snake, g.food)
  }, [stopGame])

  const start = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    const g = gameRef.current
    g.snake = initSnake()
    g.dir = "RIGHT"
    g.nextDir = "RIGHT"
    g.food = randomFood(g.snake)
    g.score = 0
    g.running = true
    setScore(0)
    setPhase("running")

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx) drawFrame(ctx, g.snake, g.food)

    intervalRef.current = setInterval(tick, TICK_MS)
  }, [tick])

  // Initial blank canvas draw
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx) return
    drawFrame(ctx, gameRef.current.snake, gameRef.current.food)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keyboard handler
  useEffect(() => {
    const map: Record<string, Dir> = {
      ArrowUp: "UP",
      w: "UP",
      W: "UP",
      ArrowDown: "DOWN",
      s: "DOWN",
      S: "DOWN",
      ArrowLeft: "LEFT",
      a: "LEFT",
      A: "LEFT",
      ArrowRight: "RIGHT",
      d: "RIGHT",
      D: "RIGHT",
    }
    const handleKey = (e: KeyboardEvent) => {
      const g = gameRef.current
      if (!g.running) return
      const newDir = map[e.key]
      if (newDir && newDir !== OPPOSITE[g.dir]) {
        e.preventDefault()
        g.nextDir = newDir
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const pressDir = (d: Dir) => {
    const g = gameRef.current
    if (g.running && d !== OPPOSITE[g.dir]) g.nextDir = d
  }

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      {/* Top score bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 italic">snake</span>
        <span className="font-mono text-xs text-rurikon-600 tabular-nums">
          score: {score}
        </span>
      </div>

      {/* Canvas area */}
      <div className="flex justify-center p-4 sm:p-6">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={COLS * CELL}
            height={ROWS * CELL}
            className="block"
          />
          {phase !== "running" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75">
              <p className="font-serif text-white text-sm mb-1">
                {phase === "over" ? `Game Over — ${score} pt${score !== 1 ? "s" : ""}` : "Snake"}
              </p>
              <p className="font-serif text-white/40 text-xs mb-5">
                {phase === "over"
                  ? "better luck next time"
                  : "use arrow keys or WASD"}
              </p>
              <button
                onClick={start}
                className="text-xs rounded px-3 py-1.5 border transition-colors bg-rurikon-800 text-white border-rurikon-600"
              >
                {phase === "over" ? "Restart" : "Start"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile D-pad */}
      <div className="flex flex-col items-center gap-1.5 pb-4 sm:hidden">
        <button
          onClick={() => pressDir("UP")}
          className="text-sm rounded w-10 h-10 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600 active:bg-rurikon-50"
        >
          ↑
        </button>
        <div className="flex gap-1.5">
          {(["LEFT", "DOWN", "RIGHT"] as Dir[]).map((d) => (
            <button
              key={d}
              onClick={() => pressDir(d)}
              className="text-sm rounded w-10 h-10 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600 active:bg-rurikon-50"
            >
              {d === "LEFT" ? "←" : d === "DOWN" ? "↓" : "→"}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
        <span className="font-serif text-xs text-rurikon-400 mr-auto italic">
          ↑↓←→ or WASD · eat red food to grow
        </span>
        {phase === "running" && (
          <button
            onClick={() => stopGame(true)}
            className={cn(
              "text-xs rounded px-2.5 py-1.5 border transition-colors",
              "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
            )}
          >
            Quit
          </button>
        )}
        <button
          onClick={start}
          className={cn(
            "text-xs rounded px-2.5 py-1.5 border transition-colors",
            "bg-rurikon-800 text-white border-rurikon-600"
          )}
        >
          {phase === "idle" ? "Start" : "Restart"}
        </button>
      </div>
    </div>
  )
}
