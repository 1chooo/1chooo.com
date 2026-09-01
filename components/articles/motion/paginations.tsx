"use client"

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

const PAINTINGS = [
  {
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer, 1665",
    src: "https://www.mauritshuis.nl/media/wlola5to/0670_repro_2.jpg",
  },
  {
    title: "The Starry Night",
    artist: "Vincent van Gogh, 1889",
    src: "https://www.moma.org/media/W1siZiIsIjQ2NzUxNyJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MTQ0MFx1MDAzZSJdXQ.jpg",
  },
  {
    title: "The Great Wave",
    artist: "Katsushika Hokusai, 1831",
    src: "https://www.artic.edu/iiif/2/b3974542-b9b4-7568-fc4b-966738f61d78/full/1686,/0/default.jpg",
  },
  {
    title: "The Persistence of Memory",
    artist: "Salvador Dalí, 1931",
    src: "https://www.moma.org/media/W1siZiIsIjYxOTY1OSJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MTQ0MFx1MDAzZSJdXQ.jpg",
  },
]

function Paginations() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    return () => { api.off("select", onSelect) }
  }, [api])

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] py-6 px-4 sm:py-8 sm:px-10 w-full overflow-x-hidden">
      <div className="w-full px-4">
        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: false, skipSnaps: false }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {PAINTINGS.map((p, index) => (
              <CarouselItem key={index} className="pl-4 basis-auto">
                <div className="bg-white border border-rurikon-border rounded-xl overflow-hidden min-w-64 cursor-pointer">
                  <img
                    src={p.src}
                    alt={p.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="px-4 py-3">
                    <p className="font-serif text-sm font-medium text-gray-800 leading-snug">{p.title}</p>
                    <p className="font-serif text-xs italic text-rurikon-400 mt-0.5">{p.artist}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Dot indicators */}
      <ul className="flex flex-row justify-center w-fit mx-auto items-center gap-2 mt-6">
        {PAINTINGS.map((p, index) => (
          <motion.li
            key={index}
            initial={{ scale: current === index ? 1 : 0.8 }}
            animate={{ scale: current === index ? 1 : 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={
              current === index
                ? 'min-w-fit px-3 py-1.5 bg-white border border-rurikon-border rounded-full flex justify-center items-center font-serif text-xs italic text-gray-700 shadow-sm'
                : 'w-2.5 h-2.5 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors'
            }
            onClick={() => api?.scrollTo(index)}
          >
            {current === index ? p.title : ''}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export { Paginations }
