"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react"
import type { GaltonBoardHandle, GaltonBoardProps } from '@/types/articles/bell-curve'

type Stage =
  | { kind: "to-peg"; row: number; col: number }
  | { kind: "to-bin"; binIndex: number }
  | { kind: "settled" }

interface Ball {
  id: number
  fromX: number
  fromY: number
  toX: number
  toY: number
  x: number
  y: number
  t: number
  duration: number
  stage: Stage
  col: number
}

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t)
}
function easeInQuad(t: number) {
  return t * t
}

// Rurikon-palette colors (hardcoded, matches site theme)
const PEG_COLOR = "#b0bad0"       // rurikon-300 approx
const BIN_BORDER_COLOR = "#d0d8e8" // rurikon-border approx
const BALL_FILL_LIGHT = "#8ba4c8"  // rurikon-400 approx
const BALL_FILL_DARK  = "#4a6fa5"  // rurikon-600 approx
const BIN_FILL = "#dce8f5"        // blue palette (index-0 bg)

export const GaltonBoard = forwardRef<GaltonBoardHandle, GaltonBoardProps>(
  function GaltonBoard({ rows, bias, speed, onBallLanded, onActiveChange }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const sizeRef = useRef({ width: 0, height: 0, dpr: 1 })

    const ballsRef = useRef<Ball[]>([])
    const binCountsRef = useRef<number[]>(Array(rows + 1).fill(0))
    const nextIdRef = useRef(0)
    const animRef = useRef<number | null>(null)
    const lastTimeRef = useRef(0)
    const spawnQueueRef = useRef<{ count: number; spacing: number; last: number }[]>([])

    const rowsRef = useRef(rows)
    const biasRef = useRef(bias)
    const speedRef = useRef(speed)
    const onLandedRef = useRef(onBallLanded)
    const onActiveRef = useRef(onActiveChange)

    useEffect(() => { rowsRef.current = rows }, [rows])
    useEffect(() => { biasRef.current = bias }, [bias])
    useEffect(() => { speedRef.current = speed }, [speed])
    useEffect(() => { onLandedRef.current = onBallLanded }, [onBallLanded])
    useEffect(() => { onActiveRef.current = onActiveChange }, [onActiveChange])

    const geometry = useCallback(() => {
      const { width, height } = sizeRef.current
      const r = rowsRef.current
      const sidePadding = 20
      const topPadding = 24
      const binHeight = Math.min(120, Math.max(70, height * 0.2))
      const pegAreaHeight = height - topPadding - binHeight - 8
      const usableWidth = width - sidePadding * 2
      const pegSpacingX = usableWidth / r
      const pegSpacingY = pegAreaHeight / Math.max(r, 1)
      const centerX = width / 2
      return {
        width, height, sidePadding, topPadding,
        binHeight, pegSpacingX, pegSpacingY, centerX,
        rows: r, binTopY: height - binHeight,
      }
    }, [])

    const pegPos = useCallback((row: number, col: number) => {
      const g = geometry()
      const x = g.centerX + (col - row / 2) * g.pegSpacingX
      const y = g.topPadding + row * g.pegSpacingY
      return { x, y }
    }, [geometry])

    const binPos = useCallback((binIndex: number) => {
      const g = geometry()
      const x = g.centerX + (binIndex - g.rows / 2) * g.pegSpacingX
      const y = g.binTopY + g.binHeight - 16
      return { x, y, top: g.binTopY }
    }, [geometry])

    const ballRadius = useCallback(() => {
      const g = geometry()
      return Math.max(4, Math.min(7, g.pegSpacingX * 0.22))
    }, [geometry])

    const pegRadius = useCallback(() => {
      const g = geometry()
      return Math.max(2, Math.min(4, g.pegSpacingX * 0.1))
    }, [geometry])

    const spawnOne = useCallback(() => {
      const g = geometry()
      const target = pegPos(0, 0)
      const r = ballRadius()
      const ball: Ball = {
        id: nextIdRef.current++,
        fromX: g.centerX, fromY: -r * 2,
        toX: target.x, toY: target.y - r - 1,
        x: g.centerX, y: -r * 2,
        t: 0, duration: 0.32,
        stage: { kind: "to-peg", row: 0, col: 0 },
        col: 0,
      }
      ballsRef.current.push(ball)
      onActiveRef.current?.(ballsRef.current.length)
    }, [geometry, pegPos, ballRadius])

    const drop = useCallback((count: number) => {
      if (count <= 0) return
      spawnQueueRef.current.push({
        count,
        spacing: count > 1 ? 0.06 : 0,
        last: -Infinity,
      })
    }, [])

    const reset = useCallback(() => {
      ballsRef.current = []
      binCountsRef.current = Array(rowsRef.current + 1).fill(0)
      spawnQueueRef.current = []
      onActiveRef.current?.(0)
    }, [])

    useImperativeHandle(ref, () => ({
      drop, reset,
      getActiveCount: () => ballsRef.current.length,
    }), [drop, reset])

    useEffect(() => {
      ballsRef.current = []
      binCountsRef.current = Array(rows + 1).fill(0)
      spawnQueueRef.current = []
      onActiveRef.current?.(0)
    }, [rows])

    useEffect(() => {
      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return

      const apply = (width: number, height: number) => {
        const dpr = window.devicePixelRatio || 1
        canvas.width = Math.max(1, Math.floor(width * dpr))
        canvas.height = Math.max(1, Math.floor(height * dpr))
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        sizeRef.current = { width, height, dpr }
        const ctx = canvas.getContext("2d")
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }

      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect
          apply(width, height)
        }
      })
      ro.observe(container)
      const rect = container.getBoundingClientRect()
      apply(rect.width, rect.height)
      return () => ro.disconnect()
    }, [])

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const tick = (time: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = time
        const dt = Math.min(0.05, (time - lastTimeRef.current) / 1000) * speedRef.current
        lastTimeRef.current = time

        // Process spawn queue
        const elapsed = time / 1000
        const queue = spawnQueueRef.current
        for (let i = queue.length - 1; i >= 0; i--) {
          const item = queue[i]
          if (item.spacing === 0) {
            for (let j = 0; j < item.count; j++) spawnOne()
            queue.splice(i, 1)
            continue
          }
          if (elapsed - item.last >= item.spacing) {
            spawnOne()
            item.count -= 1
            item.last = elapsed
            if (item.count <= 0) queue.splice(i, 1)
          }
        }

        const balls = ballsRef.current
        const r = ballRadius()
        const remaining: Ball[] = []
        for (const ball of balls) {
          ball.t += dt / ball.duration
          if (ball.t >= 1) ball.t = 1

          const tx = easeOutQuad(ball.t)
          const ty = easeInQuad(ball.t)
          ball.x = ball.fromX + (ball.toX - ball.fromX) * tx
          ball.y = ball.fromY + (ball.toY - ball.fromY) * ty

          if (ball.t >= 1) {
            if (ball.stage.kind === "to-peg") {
              const currentRow = ball.stage.row
              const currentCol = ball.stage.col
              const goRight = Math.random() < biasRef.current
              const nextCol = currentCol + (goRight ? 1 : 0)
              const totalRows = rowsRef.current

              if (currentRow < totalRows - 1) {
                const next = pegPos(currentRow + 1, nextCol)
                ball.fromX = ball.x; ball.fromY = ball.y
                ball.toX = next.x; ball.toY = next.y - r - 1
                ball.t = 0; ball.duration = 0.28
                ball.stage = { kind: "to-peg", row: currentRow + 1, col: nextCol }
                ball.col = nextCol
              } else {
                const bp = binPos(nextCol)
                const counts = binCountsRef.current
                const stackHeight = Math.min(counts[nextCol], 24) * (r * 1.6)
                ball.fromX = ball.x; ball.fromY = ball.y
                ball.toX = bp.x; ball.toY = bp.y - stackHeight
                ball.t = 0; ball.duration = 0.4
                ball.stage = { kind: "to-bin", binIndex: nextCol }
                ball.col = nextCol
              }
            } else if (ball.stage.kind === "to-bin") {
              const idx = ball.stage.binIndex
              binCountsRef.current[idx] = (binCountsRef.current[idx] || 0) + 1
              onLandedRef.current?.(idx)
              ball.stage = { kind: "settled" }
            }
          }

          if (ball.stage.kind !== "settled") remaining.push(ball)
        }

        if (remaining.length !== balls.length) {
          ballsRef.current = remaining
          onActiveRef.current?.(remaining.length)
        }

        const g = geometry()
        ctx.clearRect(0, 0, g.width, g.height)

        // Pegs
        const pegR = pegRadius()
        ctx.fillStyle = PEG_COLOR
        for (let row = 0; row < rowsRef.current; row++) {
          for (let col = 0; col <= row; col++) {
            const p = pegPos(row, col)
            ctx.beginPath()
            ctx.arc(p.x, p.y, pegR, 0, Math.PI * 2)
            ctx.fill()
          }
        }

        // Bin separators
        ctx.strokeStyle = BIN_BORDER_COLOR
        ctx.lineWidth = 1
        const totalBins = rowsRef.current + 1
        for (let i = 0; i <= totalBins; i++) {
          const x = g.centerX + (i - totalBins / 2) * g.pegSpacingX
          ctx.beginPath()
          ctx.moveTo(x, g.binTopY)
          ctx.lineTo(x, g.height - 4)
          ctx.stroke()
        }
        ctx.beginPath()
        ctx.moveTo(g.centerX - (totalBins / 2) * g.pegSpacingX, g.height - 4)
        ctx.lineTo(g.centerX + (totalBins / 2) * g.pegSpacingX, g.height - 4)
        ctx.stroke()

        // Bin fill (proportional to count)
        const counts = binCountsRef.current
        const maxCount = counts.reduce((m, c) => Math.max(m, c), 0)
        if (maxCount > 0) {
          for (let i = 0; i < counts.length; i++) {
            const c = counts[i]
            if (c === 0) continue
            const ratio = c / maxCount
            const x = g.centerX + (i - totalBins / 2) * g.pegSpacingX
            const w = g.pegSpacingX
            const h = ratio * (g.binHeight - 10)
            ctx.fillStyle = BIN_FILL
            ctx.fillRect(x + 1, g.height - 4 - h, w - 2, h)
          }
        }

        // Balls
        for (const ball of ballsRef.current) {
          const grad = ctx.createRadialGradient(
            ball.x - r * 0.3, ball.y - r * 0.3, r * 0.2,
            ball.x, ball.y, r,
          )
          grad.addColorStop(0, BALL_FILL_LIGHT)
          grad.addColorStop(1, BALL_FILL_DARK)
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(ball.x, ball.y, r, 0, Math.PI * 2)
          ctx.fill()
        }

        animRef.current = requestAnimationFrame(tick)
      }

      animRef.current = requestAnimationFrame(tick)
      return () => {
        if (animRef.current) cancelAnimationFrame(animRef.current)
        animRef.current = null
        lastTimeRef.current = 0
      }
    }, [geometry, pegPos, binPos, ballRadius, pegRadius, spawnOne])

    return (
      <div ref={containerRef} className="w-full h-full">
        <canvas ref={canvasRef} className="block" />
      </div>
    )
  },
)
