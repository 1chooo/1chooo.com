"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Section = "navbar" | "hero" | "social-proof" | "features" | "testimonial" | "cta"

const SECTIONS: { id: Section; label: string; desc: string; conversion: string }[] = [
  {
    id: "navbar",
    label: "Navbar",
    desc: "The navigation bar anchors the page and signals credibility. A clean nav with logo, 2–4 links, and a single primary CTA button is the standard. More links = more exits.",
    conversion: "Minimal nav reduces distraction, keeping attention on the hero.",
  },
  {
    id: "hero",
    label: "Hero",
    desc: "The most important section — everything above the fold. Your headline must communicate the value proposition in under five seconds. Sub-headline adds context; CTA captures intent.",
    conversion: "Hero copy is responsible for 80% of whether a visitor keeps reading.",
  },
  {
    id: "social-proof",
    label: "Social Proof",
    desc: "Logos of known customers or usage numbers placed just below the hero. They borrow trust before the visitor has read a word of feature copy. Even a single recognisable name helps.",
    conversion: '""Used by teams at X, Y, Z" placed early doubles conversion vs. buried testimonials.',
  },
  {
    id: "features",
    label: "Features",
    desc: "Feature blocks answer the implicit question: 'How does it work?' Three columns is the convention — icon, short title, one-sentence description. Lead with benefits, trail with mechanics.",
    conversion: "Benefit-led feature copy outperforms feature-led copy by 35–50%.",
  },
  {
    id: "testimonial",
    label: "Testimonials",
    desc: "Direct quotes with a real name, role, and avatar. They handle objections before visitors raise them. Specificity ('saved us 4 hours a week') outperforms generic praise ('great product!').",
    conversion: "Specific testimonials increase conversions by ~34% versus generic praise.",
  },
  {
    id: "cta",
    label: "Footer CTA",
    desc: "A second CTA at the bottom captures visitors who scroll through everything before deciding. Repeat your headline's core promise here — don't introduce new concepts.",
    conversion: "A closing CTA recovers 10–15% of visitors who didn't convert at the hero.",
  },
]

export function DemoAnatomy() {
  const [active, setActive] = useState<Section>("hero")

  const activeSection = SECTIONS.find((s) => s.id === active)!

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] font-serif">
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6">

        {/* Wireframe */}
        <div className="shrink-0 w-full sm:w-44 flex flex-col gap-0.5 text-[9px] text-rurikon-400 select-none">
          {/* Navbar */}
          <button
            onClick={() => setActive("navbar")}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1.5 border transition-colors w-full text-left",
              active === "navbar"
                ? "border-rurikon-400 bg-rurikon-50"
                : "border-rurikon-border/60 hover:border-rurikon-300"
            )}
          >
            <div className="flex gap-1 items-center flex-1">
              <div className="w-4 h-1.5 bg-rurikon-300 rounded-sm" />
              <div className="ml-auto flex gap-1">
                <div className="w-5 h-1 bg-rurikon-200 rounded-sm" />
                <div className="w-5 h-1 bg-rurikon-200 rounded-sm" />
                <div className="w-7 h-1.5 bg-rurikon-400 rounded-sm" />
              </div>
            </div>
          </button>

          {/* Hero */}
          <button
            onClick={() => setActive("hero")}
            className={cn(
              "flex flex-col gap-1 px-2 py-3 border transition-colors w-full text-left",
              active === "hero"
                ? "border-rurikon-400 bg-rurikon-50"
                : "border-rurikon-border/60 hover:border-rurikon-300"
            )}
          >
            <div className="w-full h-2 bg-rurikon-400 rounded-sm" />
            <div className="w-4/5 h-1.5 bg-rurikon-300 rounded-sm" />
            <div className="w-3/4 h-1 bg-rurikon-200 rounded-sm mt-0.5" />
            <div className="w-3/4 h-1 bg-rurikon-200 rounded-sm" />
            <div className="flex gap-1 mt-1">
              <div className="w-10 h-2.5 bg-rurikon-500 rounded-sm" />
              <div className="w-10 h-2.5 bg-rurikon-200 border border-rurikon-300 rounded-sm" />
            </div>
          </button>

          {/* Social proof */}
          <button
            onClick={() => setActive("social-proof")}
            className={cn(
              "flex flex-col gap-1 px-2 py-2 border transition-colors w-full text-left",
              active === "social-proof"
                ? "border-rurikon-400 bg-rurikon-50"
                : "border-rurikon-border/60 hover:border-rurikon-300"
            )}
          >
            <div className="w-16 h-1 bg-rurikon-200 rounded-sm mx-auto" />
            <div className="flex justify-around mt-0.5">
              {[14, 12, 16, 11, 13].map((w, i) => (
                <div key={i} className="h-2 bg-rurikon-200 rounded-sm" style={{ width: w }} />
              ))}
            </div>
          </button>

          {/* Features */}
          <button
            onClick={() => setActive("features")}
            className={cn(
              "flex flex-col gap-1 px-2 py-2 border transition-colors w-full text-left",
              active === "features"
                ? "border-rurikon-400 bg-rurikon-50"
                : "border-rurikon-border/60 hover:border-rurikon-300"
            )}
          >
            <div className="w-16 h-1 bg-rurikon-300 rounded-sm mx-auto" />
            <div className="flex gap-1 mt-0.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex-1 flex flex-col gap-0.5">
                  <div className="w-full h-1.5 bg-rurikon-200 rounded-sm" />
                  <div className="w-full h-1 bg-rurikon-100 rounded-sm" />
                  <div className="w-3/4 h-1 bg-rurikon-100 rounded-sm" />
                </div>
              ))}
            </div>
          </button>

          {/* Testimonial */}
          <button
            onClick={() => setActive("testimonial")}
            className={cn(
              "flex flex-col gap-1 px-2 py-2 border transition-colors w-full text-left",
              active === "testimonial"
                ? "border-rurikon-400 bg-rurikon-50"
                : "border-rurikon-border/60 hover:border-rurikon-300"
            )}
          >
            <div className="flex gap-1">
              {[0, 1].map((i) => (
                <div key={i} className="flex-1 border border-rurikon-border/60 rounded-sm p-1 flex flex-col gap-0.5">
                  <div className="w-full h-1 bg-rurikon-100 rounded-sm" />
                  <div className="w-3/4 h-1 bg-rurikon-100 rounded-sm" />
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-rurikon-200" />
                    <div className="w-8 h-1 bg-rurikon-200 rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          </button>

          {/* Footer CTA */}
          <button
            onClick={() => setActive("cta")}
            className={cn(
              "flex flex-col items-center gap-1 px-2 py-2 border transition-colors w-full",
              active === "cta"
                ? "border-rurikon-400 bg-rurikon-50"
                : "border-rurikon-border/60 hover:border-rurikon-300"
            )}
          >
            <div className="w-24 h-1.5 bg-rurikon-300 rounded-sm" />
            <div className="w-16 h-1 bg-rurikon-200 rounded-sm" />
            <div className="w-12 h-2.5 bg-rurikon-500 rounded-sm mt-0.5" />
          </button>
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <div>
            <span className="text-[10px] text-rurikon-300 uppercase tracking-widest block mb-1.5">
              section
            </span>
            <span className="text-sm font-semibold text-rurikon-600">{activeSection.label}</span>
          </div>

          <div>
            <span className="text-[10px] text-rurikon-300 uppercase tracking-widest block mb-1.5">
              purpose
            </span>
            <p className="text-xs text-rurikon-500 italic leading-relaxed">
              {activeSection.desc}
            </p>
          </div>

          <div className="border-l-2 border-rurikon-200 pl-3">
            <span className="text-[10px] text-rurikon-300 uppercase tracking-widest block mb-1">
              conversion note
            </span>
            <p className="text-xs text-rurikon-400 italic leading-relaxed">
              {activeSection.conversion}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-2 px-3 py-2 border-t border-rurikon-border sm:flex-row sm:items-center sm:gap-1">
        <span className="font-serif text-xs text-rurikon-400 sm:mr-auto italic">page anatomy</span>
        <div className="flex flex-wrap gap-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "text-xs rounded px-2.5 py-1.5 border transition-colors",
                active === s.id
                  ? "bg-rurikon-800 text-white border-rurikon-600"
                  : "border-rurikon-border text-rurikon-400 hover:border-rurikon-400 hover:text-rurikon-600"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
