'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"

type TextAlignment = 'left' | 'center' | 'right'

interface GalleryPlacardProps {
  roomNumber?: string | number
  title: string
  paragraphs: string[]
  organizedBy?: string
  className?: string
}

const alignmentConfig: Record<
  TextAlignment,
  { wrapper: string; text: string; label: string }
> = {
  left: {
    wrapper: "w-full sm:w-[68%] mr-auto",
    text: "text-left",
    label: "Left",
  },
  center: {
    wrapper: "w-full sm:w-[68%] mx-auto",
    text: "text-left",
    label: "Center",
  },
  right: {
    wrapper: "w-full sm:w-[68%] ml-auto",
    text: "text-left",
    label: "Right",
  },
}

export function GalleryPlacard({
  roomNumber = 523,
  title = "Portraits in Wartime",
  paragraphs = [
    "In the late 1930s and '40s, Europe was torn apart by war. Though some artists secured passage to leave the continent, others lived through the upheaval and destruction. This gallery brings together examples of portraits by those who stayed behind, including Joan Miró and Pablo Picasso. The works evidence how these artists transformed the traditional genre of portraiture as they reflected on the anxieties of wartime.",
    "Paintings by Miró and the other artists in this gallery offered a vision of the future during a time of turmoil. In 1941 art historian James Johnson Sweeney wrote that Miró's work \u201cbelongs to the youth of a period that is opening, rather than the old age of a closing one.\u201d",
  ],
  organizedBy = "Organized by Ann Temkin with Rachel Remick",
  className,
}: GalleryPlacardProps) {
  const [alignment, setAlignment] = useState<TextAlignment>('left')
  const config = alignmentConfig[alignment]

  return (
    <div className="flex justify-center my-8">
      {/* The physical card */}
      <article
        className={cn(
          "relative bg-[#fefefe] w-full sm:max-w-2xl md:max-w-2xl lg:max-w-2xl xl:max-w-2xl border border-rurikon-border",
          className
        )}
        aria-label={`Gallery placard: ${title}`}
      >
        {/* Content column — shifts based on alignment */}
        <div className={cn("px-12 pt-14 pb-10 transition-all duration-300", config.wrapper)}>
          {/* Header row: room number + title */}
          <header className={cn("flex items-baseline gap-8 mb-10", config.text)}>
            {roomNumber !== undefined && (
              <span
                className="font-sans font-black leading-none tracking-tight text-foreground shrink-0"
                aria-label={`Room ${roomNumber}`}
              >
                {roomNumber}
              </span>
            )}
            <h1 className="font-sans font-black leading-tight tracking-tight text-foreground text-balance">
              {title}
            </h1>
          </header>

          {/* Body paragraphs */}
          <div className={cn("space-y-5", config.text)}>
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-sans text-sm leading-[1.65] text-foreground/90 text-pretty"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Curator credit */}
          {organizedBy && (
            <p className={cn("mt-10 font-sans text-xs leading-snug text-foreground/55 italic", config.text)}>
              {organizedBy}
            </p>
          )}
        </div>

        {/* Alignment toolbar */}
        <div className="flex items-center gap-1 px-3 py-2 border-t border-rurikon-border">
          {(Object.keys(alignmentConfig) as TextAlignment[]).map((key) => {
            const isActive = alignment === key
            return (
              <button
                key={key}
                onClick={() => setAlignment(key)}
                aria-pressed={isActive}
                className={cn(
                  "transition-colors duration-150 px-2.5 py-1 text-xs font-medium rounded border-none cursor-pointer",
                  isActive
                    ? "bg-rurikon-800 text-white"
                    : "bg-transparent text-rurikon-400 hover:bg-rurikon-50 hover:text-rurikon-800"
                )}
              >
                {alignmentConfig[key].label}
              </button>
            )
          })}
        </div>

        {/* Bottom shadow strip — simulates the card lifting off the wall */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.75 bg-linear-to-r from-transparent via-black/10 to-transparent"
          aria-hidden="true"
        />
      </article>
    </div>
  )
}
