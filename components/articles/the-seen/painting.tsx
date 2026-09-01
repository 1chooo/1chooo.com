'use client'

import Image from 'next/image'

type PaintingGalleryProps = {
  title?: string
  artist?: string
  artistYears?: string
  year?: string
  medium?: string
  dimensions?: string
  collection?: string
  creditLine?: string
  imageUrl?: string
  /** CSS aspect-ratio value, e.g. "4/3", "16/9", "11/13" */
  aspectRatio?: string
}

const DEFAULT_PAINTING: Required<PaintingGalleryProps> = {
  title: "The Starry Night",
  artist: "Vincent van Gogh",
  artistYears: "1853-1890",
  year: "1889",
  medium: "Oil on canvas",
  dimensions: "",
  collection: "The Museum of Modern Art, New York",
  creditLine: "Acquired through the Lillie P. Bliss Bequest, 1941",
  imageUrl: "https://www.moma.org/media/W1siZiIsIjQ2NzUxNyJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MTQ0MFx1MDAzZSJdXQ.jpg",
  aspectRatio: "4/3",
}

/** Small museum-style wall label, positioned to the lower-left of the painting */
function WallLabel({ painting }: { painting: Required<PaintingGalleryProps> }) {
  return (
    <div className="flex flex-col gap-0.5 max-w-full lg:max-w-50">
      <p className="font-sans leading-snug text-[13px] font-bold text-[#1a1a1a] mb-px">
        {painting.artist}
      </p>
      <p className="font-sans text-[11px] text-[#555] mb-1.5">
        {painting.artistYears}
      </p>
      <p className="font-sans text-[12px] italic text-[#1a1a1a] leading-[1.35]">
        {painting.title}
      </p>
      <p className="font-sans text-[11px] text-[#555] mt-0.5">
        {painting.year}
      </p>
      <p className="font-sans text-[11px] text-[#666] leading-[1.4] mt-0.5">
        {painting.medium}
      </p>
      <p className="font-sans text-[11px] text-[#777] leading-[1.4]">
        {painting.dimensions}
      </p>
      <div className="h-px bg-[#c8c4bc] my-2 w-9" />
      <p className="font-sans text-[10px] text-[#888] leading-normal">
        {painting.collection}
      </p>
      <p className="font-sans text-[10px] text-[#aaa] leading-[1.4] mt-0.75">
        {painting.creditLine}
      </p>
    </div>
  )
}

/** A painting hung on the wall — white mat mount, thin drop shadow */
function HungPainting({ painting }: { painting: Required<PaintingGalleryProps> }) {
  const [ratio, height] = (painting.aspectRatio ?? '4/3').split('/').map(Number)
  const paddingPercent = height && ratio ? (height / ratio) * 100 : 75

  return (
    <div className="bg-[#fafaf8] p-4 w-full max-w-full lg:max-w-130 leading-0">
      <div className="relative leading-0" style={{ paddingBottom: `${paddingPercent}%` }}>
        {painting.imageUrl && (
          <Image
            src={painting.imageUrl}
            alt={`${painting.title} by ${painting.artist}`}
            fill
            draggable={false}
            className="block! object-cover select-none"
            sizes="(max-width: 1024px) 100vw, 520px"
            quality={90}
          />
        )}
      </div>
    </div>
  )
}

export function PaintingGallery(props?: PaintingGalleryProps) {
  const painting = { ...DEFAULT_PAINTING, ...props }

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] flex flex-col-reverse items-center gap-6 py-8 px-6 lg:flex-row lg:items-end lg:gap-14 lg:py-18 lg:px-20">
      {/* Wall label — lower-left on desktop, below painting on mobile */}
      <div className="shrink-0 w-full lg:w-auto lg:pb-1">
        <WallLabel painting={painting} />
      </div>

      {/* Painting */}
      <div className="w-full lg:flex-auto lg:min-w-0 flex justify-center lg:justify-start">
        <HungPainting painting={painting} />
      </div>
    </div>
  )
}
