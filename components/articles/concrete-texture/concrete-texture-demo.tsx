"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { generateConcreteTexture, CONCRETE_STYLES } from '@/lib/concrete-generator'
import type { ConcreteStyleConfig } from '@/lib/concrete-generator'

type Variant = 'brutalist' | 'polished' | 'weathered' | 'boardFormed' | 'exposed'

const VARIANTS: { id: Variant; label: string }[] = [
  { id: 'brutalist', label: 'brutalist' },
  { id: 'polished', label: 'polished' },
  { id: 'weathered', label: 'weathered' },
  { id: 'boardFormed', label: 'board formed' },
  { id: 'exposed', label: 'exposed' },
]

const FACTORS: { key: keyof Factors; label: string }[] = [
  { key: 'cracks', label: 'cracks' },
  { key: 'porosity', label: 'porosity' },
  { key: 'weathering', label: 'weathering' },
  { key: 'staining', label: 'staining' },
]

const RENDER_WIDTH = 1920
const RENDER_HEIGHT = 1080

interface Factors {
  cracks: number
  porosity: number
  weathering: number
  staining: number
}

function factorsFromStyle(s: ConcreteStyleConfig): Factors {
  return {
    cracks: s.crackDensity,
    porosity: s.porosity,
    weathering: s.weatheringIntensity,
    staining: s.stainDensity,
  }
}

export function ConcreteTextureDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [variant, setVariant] = useState<Variant>('brutalist')
  const [seed, setSeed] = useState(42069)
  const [isGenerating, setIsGenerating] = useState(true)
  const [factors, setFactors] = useState<Factors>(() => factorsFromStyle(CONCRETE_STYLES['brutalist']))

  function setFactor(key: keyof Factors) {
    return (v: number) => setFactors((prev) => ({ ...prev, [key]: v }))
  }

  function selectVariant(id: Variant) {
    setVariant(id)
    setFactors(factorsFromStyle(CONCRETE_STYLES[id]))
  }

  const generate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    setIsGenerating(true)
    const style: ConcreteStyleConfig = {
      ...CONCRETE_STYLES[variant],
      crackDensity: factors.cracks,
      porosity: factors.porosity,
      weatheringIntensity: factors.weathering,
      stainDensity: factors.staining,
    }
    requestAnimationFrame(() => {
      generateConcreteTexture(ctx, RENDER_WIDTH, RENDER_HEIGHT, style, seed)
      setIsGenerating(false)
    })
  }, [variant, seed, factors])

  useEffect(() => {
    generate()
  }, [generate])

  return (
    <div className="my-8 article-demo-shell">
      <div className="overflow-hidden border border-rurikon-border bg-[#fefefe] font-serif">
        <div className="flex flex-col text:flex-row">

          {/* Left — canvas + factors below */}
          <div className="flex-1 min-w-0 text:border-r border-rurikon-border flex flex-col">
            {/* Canvas */}
            <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
              <canvas
                ref={canvasRef}
                width={RENDER_WIDTH}
                height={RENDER_HEIGHT}
                className={cn(
                  'absolute inset-0 w-full h-full transition-opacity duration-300',
                  isGenerating ? 'opacity-0' : 'opacity-100'
                )}
              />
              {isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center bg-rurikon-50">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-5 h-5 border border-rurikon-300 border-t-rurikon-700 rounded-full animate-spin" />
                    <span className="text-xs text-rurikon-400 font-mono">generating…</span>
                  </div>
                </div>
              )}
            </div>

            {/* Factors — below canvas */}
            <div className="border-t border-rurikon-border p-3 grid grid-cols-2 gap-x-4 gap-y-3">
              {FACTORS.map(({ key, label }) => (
                <div key={key} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-rurikon-500">{label}</span>
                    <span className="font-mono text-xs text-rurikon-700">{factors[key].toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={factors[key]}
                    onChange={(e) => setFactor(key)(parseFloat(e.target.value))}
                    className="w-full accent-rurikon-500 h-1"
                  />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
              <span className="font-serif text-xs text-rurikon-400 italic">
                {CONCRETE_STYLES[variant].name} · seed {seed}
              </span>
            </div>
          </div>

          {/* Right — variant, seed, technical notes */}
          <div className="w-full text:w-85 flex flex-col justify-center bg-[#fdfcfa]">
            <div className="p-3 flex flex-col gap-3">

              {/* Variant */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-rurikon-500">variant</span>
                <div className="flex flex-wrap gap-1">
                  {VARIANTS.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => selectVariant(id)}
                      className={cn(
                        'text-xs rounded px-2.5 py-1.5 border transition-colors',
                        variant === id
                          ? 'bg-rurikon-800 text-white border-rurikon-600'
                          : 'border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seed */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-rurikon-500">seed</span>
                  <span className="font-mono text-xs text-rurikon-700">{seed}</span>
                </div>
                <button
                  onClick={() => setSeed(Math.floor(Math.random() * 1_000_000))}
                  className="text-xs rounded px-2.5 py-1.5 border transition-colors border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
                >
                  ↻ randomize
                </button>
              </div>

              {/* Technical notes */}
              <div className="font-mono text-xs bg-rurikon-50/60 border border-rurikon-border/40 p-3 text-rurikon-600 leading-6">
                <div className="flex justify-between">
                  <span className="text-rurikon-400">format</span>
                  <span>16:9 Cinematic</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rurikon-400">resolution</span>
                  <span>1920 × 1080 px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rurikon-400">generation</span>
                  <span>Fully Deterministic</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
