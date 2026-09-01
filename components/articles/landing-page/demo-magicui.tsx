"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

// ─── 1. Animated Gradient Text ────────────────────────────────────────────────

function GradientText({ children }: { children: string }) {
  return (
    <span
      className="font-bold text-transparent bg-clip-text select-none"
      style={{
        backgroundImage: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #6366f1)",
        backgroundSize: "300% 100%",
        animation: "gradient-shift 4s linear infinite",
        WebkitBackgroundClip: "text",
      }}
    >
      {children}
    </span>
  )
}

// ─── 2. Shimmer Button ────────────────────────────────────────────────────────

function ShimmerButton({ children }: { children: string }) {
  return (
    <button
      className="relative overflow-hidden rounded-md px-5 py-2 text-xs font-medium text-white"
      style={{
        background: "linear-gradient(110deg, #1e293b 0%, #334155 50%, #1e293b 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer-bg 2.5s linear infinite",
        boxShadow: "0 0 0 1px rgba(148,163,184,0.15)",
      }}
    >
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.08) 50%, transparent 80%)",
          backgroundSize: "200% 100%",
          animation: "shimmer-bg 2.5s linear infinite",
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  )
}

// ─── 3. Border Beam Card ──────────────────────────────────────────────────────

function BorderBeamCard() {
  return (
    <div className="relative rounded-lg overflow-hidden" style={{ padding: 1 }}>
      {/* Animated conic border */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: "conic-gradient(from var(--beam-angle, 0deg), transparent 10%, #6366f1 30%, #8b5cf6 50%, transparent 70%)",
          animation: "beam-rotate 3s linear infinite",
        }}
      />
      <div className="relative bg-[#fafbff] rounded-lg px-4 py-3 flex flex-col gap-1">
        <div className="text-[10px] text-rurikon-300 uppercase tracking-widest">feature card</div>
        <div className="text-xs text-rurikon-500 italic">
          A rotating gradient traces the border — drawing the eye without blocking content.
        </div>
      </div>
    </div>
  )
}

// ─── 4. Number Ticker ─────────────────────────────────────────────────────────

function NumberTicker({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const duration = 1800
    const start = performance.now()
    function frame(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [started, target])

  return (
    <div ref={ref} className="flex flex-col items-center gap-0.5">
      <span className="text-xl font-bold text-rurikon-600 tabular-nums font-mono">
        {value.toLocaleString()}{suffix}
      </span>
      <span className="text-[10px] text-rurikon-300 uppercase tracking-widest">{label}</span>
    </div>
  )
}

// ─── 5. Marquee ───────────────────────────────────────────────────────────────

const LOGOS = ["Vercel", "Linear", "Stripe", "Notion", "Figma", "Framer", "Supabase", "Railway"]

function Marquee() {
  const items = [...LOGOS, ...LOGOS]
  return (
    <div className="overflow-hidden relative">
      <div
        className="flex gap-6"
        style={{ animation: "marquee-scroll 12s linear infinite", width: "max-content" }}
      >
        {items.map((name, i) => (
          <span
            key={i}
            className="text-xs text-rurikon-300 font-mono uppercase tracking-widest shrink-0 px-1"
          >
            {name}
          </span>
        ))}
      </div>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-8 bg-linear-to-r from-[#fefefe] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 bg-linear-to-l from-[#fefefe] to-transparent pointer-events-none" />
    </div>
  )
}

// ─── CSS keyframes injected once ──────────────────────────────────────────────

function KeyframeStyle() {
  return (
    <style>{`
      @keyframes gradient-shift {
        0%   { background-position: 0% 50% }
        100% { background-position: 300% 50% }
      }
      @keyframes shimmer-bg {
        0%   { background-position: 200% 0% }
        100% { background-position: -200% 0% }
      }
      @keyframes beam-rotate {
        from { --beam-angle: 0deg }
        to   { --beam-angle: 360deg }
      }
      @keyframes marquee-scroll {
        0%   { transform: translateX(0) }
        100% { transform: translateX(-50%) }
      }
      @property --beam-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
      }
    `}</style>
  )
}

// ─── Tab configuration ────────────────────────────────────────────────────────

type Tab = "gradient-text" | "shimmer" | "border-beam" | "ticker" | "marquee"

const TABS: { id: Tab; label: string; desc: string }[] = [
  {
    id: "gradient-text",
    label: "Gradient Text",
    desc: "Animated gradient flowing through text. Achieved with background-clip: text and a shifting background-position keyframe. No SVG, no canvas.",
  },
  {
    id: "shimmer",
    label: "Shimmer Button",
    desc: "A sweeping highlight travels across the button surface using a layered gradient and background-position animation — the go-to for hero CTAs.",
  },
  {
    id: "border-beam",
    label: "Border Beam",
    desc: "A conic gradient rotates around a card's border using @property-animated --beam-angle. The trick: the card sits inside a 1px container whose background is the animated conic.",
  },
  {
    id: "ticker",
    label: "Number Ticker",
    desc: "Numbers count up from zero when the element enters the viewport. An IntersectionObserver triggers a requestAnimationFrame loop with an eased cubic function.",
  },
  {
    id: "marquee",
    label: "Marquee",
    desc: "Duplicated list items scroll with a CSS translateX animation at constant speed. Gradient left/right fades create the soft fade-out edges.",
  },
]

// ─── Main component ───────────────────────────────────────────────────────────

export function DemoMagicUI() {
  const [tab, setTab] = useState<Tab>("gradient-text")
  const activeTab = TABS.find((t) => t.id === tab)!

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      <KeyframeStyle />

      <div className="p-4 sm:p-6 flex flex-col gap-5">
        {/* Preview area */}
        <div className="flex items-center justify-center min-h-25 border border-rurikon-border/40 bg-[#f9fafc] rounded px-6 py-8">
          {tab === "gradient-text" && (
            <div className="text-center">
              <div className="text-2xl">
                <GradientText>Design Engineers</GradientText>
              </div>
              <div className="text-xs text-rurikon-300 mt-2 italic">
                animated gradient text
              </div>
            </div>
          )}

          {tab === "shimmer" && (
            <div className="flex flex-col items-center gap-3">
              <ShimmerButton>Get Started for Free</ShimmerButton>
              <div className="text-xs text-rurikon-300 italic">shimmer CTA button</div>
            </div>
          )}

          {tab === "border-beam" && (
            <div className="w-full max-w-xs">
              <BorderBeamCard />
            </div>
          )}

          {tab === "ticker" && (
            <div className="flex gap-8 sm:gap-12">
              <NumberTicker target={20298} suffix="+" label="GitHub Stars" />
              <NumberTicker target={150} suffix="+" label="Components" />
              <NumberTicker target={50} suffix="+" label="Templates" />
            </div>
          )}

          {tab === "marquee" && (
            <div className="w-full">
              <div className="text-[10px] text-rurikon-300 uppercase tracking-widest text-center mb-3">
                trusted by teams at
              </div>
              <Marquee />
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-rurikon-400 italic leading-relaxed max-w-md">
          {activeTab.desc}
        </p>
      </div>

      {/* Footer tab strip */}
      <div className="flex flex-col gap-2 px-3 py-2 border-t border-rurikon-border sm:flex-row sm:items-center sm:gap-1">
        <span className="font-serif text-xs text-rurikon-400 sm:mr-auto italic">magic ui effects</span>
        <div className="flex flex-wrap gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "text-xs rounded px-2.5 py-1.5 border transition-colors",
                tab === t.id
                  ? "bg-rurikon-800 text-white border-rurikon-600"
                  : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
