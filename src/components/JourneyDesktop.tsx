import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// New slideshow images, naturally 1672x941
const SLIDE_IMAGES = [
  `${import.meta.env.BASE_URL}slideshow/battlestation-1.png`,
  `${import.meta.env.BASE_URL}slideshow/battlestation-2.png`,
  `${import.meta.env.BASE_URL}slideshow/battlestation-3.png`,
]

export function JourneyDesktop() {
  const [index, setIndex] = useState(0)

  // Auto-cycle non-stop every 3 seconds.
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDE_IMAGES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [index])

  return (
    <section className="w-full bg-black flex flex-col items-center justify-center pt-32 md:pt-48">
      
      {/* 
        Perfectly centered container. 
        max-w-[1672px] ensures it doesn't stretch past original resolution (avoids pixelation).
        mx-auto ensures equal margin/padding on both sides on large screens.
        aspect-[1672/941] locks the exact ratio of the images.
      */}
      <div className="relative w-full max-w-[1672px] mx-auto aspect-[1672/941] bg-black overflow-hidden flex items-center justify-center">
        <AnimatePresence>
          <motion.img
            key={index}
            src={SLIDE_IMAGES[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-contain"
            alt={`Banner slide ${index + 1}`}
          />
        </AnimatePresence>
      </div>

      {/* Manual Pick Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 p-4 md:p-6 w-full max-w-3xl">
        {SLIDE_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              i === index 
                ? 'w-8 h-2 md:w-10 md:h-2.5 bg-accent' 
                : 'w-2 h-2 md:w-2.5 md:h-2.5 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`View image ${i + 1}`}
          />
        ))}
      </div>
      
    </section>
  )
}
