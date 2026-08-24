'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue } from 'framer-motion'
import { COMPONENTS, ASSEMBLY_ORDER, ASSEMBLED_POSITIONS, getSlidOutPosition } from '../data/components'

// Scroll progress ranges for each component's disassembly (0-1 timeline)
const COMPONENT_PROGRESS: Record<string, { start: number; end: number }> = {
  case:    { start: 0.00, end: 0.12 },
  gpu:     { start: 0.10, end: 0.22 },
  cooler:  { start: 0.18, end: 0.30 },
  cpu:     { start: 0.26, end: 0.38 },
  motherboard: { start: 0.34, end: 0.46 },
  ram:     { start: 0.42, end: 0.54 },
  storage: { start: 0.50, end: 0.62 },
  psu:     { start: 0.58, end: 0.70 },
}

// Chapter definitions
const CHAPTERS = [
  { id: '01', label: 'THE COMPLETE SYSTEM', range: [0.00, 0.08] },
  { id: '02', label: 'GRAPHICS', range: [0.08, 0.18] },
  { id: '03', label: 'COOLING', range: [0.18, 0.28] },
  { id: '04', label: 'PROCESSOR', range: [0.28, 0.38] },
  { id: '05', label: 'MOTHERBOARD', range: [0.38, 0.48] },
  { id: '06', label: 'MEMORY', range: [0.48, 0.58] },
  { id: '07', label: 'STORAGE', range: [0.58, 0.68] },
  { id: '08', label: 'POWER', range: [0.68, 0.78] },
  { id: '09', label: 'FULL EXPLODED VIEW', range: [0.78, 1.00] },
]

// Component images for the teardown (using best available angles)
const COMPONENT_IMAGES: Record<string, string> = {
  case: '/parts/case-segotep-endura-pro-240s-white--0.webp',
  gpu: '/parts/gpu-xfx-swift-rx9060xt-16gb--1.webp',
  cooler: '/parts/cpu-cooler-id-cooling-fx360-lcd-white--0.webp',
  cpu: '/parts/cpu-ryzen-7800x3d--3.webp',
  motherboard: '/parts/mobo-msi-b650-pro-s--0.webp',
  ram: '/parts/ram-xpg-lancer-blade-16x2-6000mhz--3.webp',
  storage: '/parts/ssd-1tb-samsung-990-pro--0.webp',
  psu: '/parts/psu-coolermaster-850-mwe-gold-v3--4.webp',
  assembled: '/parts/white-ghost-rig--0.webp',
}

interface ComponentLayerProps {
  id: string
  progress: ReturnType<typeof useMotionValue<number>>
  isReducedMotion: boolean
}

function ComponentLayer({ id, progress, isReducedMotion }: ComponentLayerProps) {
  const spec = COMPONENTS[id]
  if (!spec) return null

  const assembled = ASSEMBLED_POSITIONS[id]
  const exploded = getSlidOutPosition(id)
  const progRange = COMPONENT_PROGRESS[id]

  // Create derived MotionValues for each transform property
  const localProgress = useTransform(progress, [progRange?.start || 0, progRange?.end || 1], [0, 1], { clamp: true })

  // Cubic ease-out: 1 - (1 - t)^3
  const easedProgress = useTransform(localProgress, (t) => 1 - Math.pow(1 - t, 3))

  const x = useTransform(easedProgress, [0, 1], [assembled.x, exploded.x])
  const y = useTransform(easedProgress, [0, 1], [assembled.y, exploded.y])
  const z = useTransform(easedProgress, [0, 1], [assembled.z, exploded.z])
  const rx = useTransform(easedProgress, [0, 1], [assembled.rotationX, exploded.rotationX])
  const ry = useTransform(easedProgress, [0, 1], [assembled.rotationY, exploded.rotationY])
  const rz = useTransform(easedProgress, [0, 1], [assembled.rotationZ, exploded.rotationZ])
  const scale = useTransform(easedProgress, [0, 1], [1, 0.85])

  if (isReducedMotion) {
    const showExploded = useTransform(progress, (p) => p > 0.5)
    const posX = useTransform(showExploded, (show) => show ? exploded.x : assembled.x)
    const posY = useTransform(showExploded, (show) => show ? exploded.y : assembled.y)
    const posZ = useTransform(showExploded, (show) => show ? exploded.z : assembled.z)
    const posRx = useTransform(showExploded, (show) => show ? exploded.rotationX : assembled.rotationX)
    const posRy = useTransform(showExploded, (show) => show ? exploded.rotationY : assembled.rotationY)
    const posRz = useTransform(showExploded, (show) => show ? exploded.rotationZ : assembled.rotationZ)

    return (
      <motion.img
        key={id}
        src={COMPONENT_IMAGES[id]}
        alt={spec.name}
        className="layer-img"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '60vw',
          maxWidth: '500px',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
        animate={{
          transform: `translate3d(calc(-50% + ${posX}px), calc(-50% + ${posY}px), ${posZ}px) rotateX(${posRx}rad) rotateY(${posRy}rad) rotateZ(${posRz}rad)`,
        }}
        transition={{ duration: 0.3 }}
      />
    )
  }

  return (
    <motion.img
      key={id}
      src={COMPONENT_IMAGES[id]}
      alt={spec.name}
      className="layer-img"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '60vw',
        maxWidth: '500px',
        transformOrigin: 'center center',
        willChange: 'transform, opacity',
        transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateX(${rx}rad) rotateY(${ry}rad) rotateZ(${rz}rad) scale(${scale})`,
        opacity: 1,
      }}
    />
  )
}

interface ComponentCardProps {
  id: string
  progress: ReturnType<typeof useMotionValue<number>>
  isReducedMotion: boolean
}

function ComponentCard({ id, progress, isReducedMotion }: ComponentCardProps) {
  const spec = COMPONENTS[id]
  if (!spec) return null

  const progRange = COMPONENT_PROGRESS[id]
  const localProgress = useTransform(progress, [progRange?.start || 0, progRange?.end || 1], [0, 1], { clamp: true })

  // Card appears at ~70% of component's disassembly
  const cardProgress = useTransform(localProgress, (t) => Math.max(0, Math.min(1, (t - 0.7) / 0.3)))
  const cardEase = useTransform(cardProgress, (t) => 1 - Math.pow(1 - t, 3))
  const cardOpacity = useTransform(cardEase, (t) => t)
  const cardY = useTransform(cardEase, (t) => 20 * (1 - t))

  if (isReducedMotion) {
    const showCard = useTransform(progress, (p) => p > 0.5 ? 1 : 0)
    return (
      <motion.div
        key={id}
        className="teardown-card glass"
        style={{ opacity: showCard, y: useTransform(showCard, (s) => s ? 0 : 20) }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">{spec.name.toUpperCase()}</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{spec.model}</h3>
        <p className="text-sm text-slate-400 mb-4">{spec.brand}</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {spec.keySpecs.slice(0, 4).map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1.5 text-[11px]">
              <span className="font-medium text-slate-300">{s}</span>
            </div>
          ))}
        </div>
        <BenchmarkPreview benchmark={spec.benchmark} />
      </motion.div>
    )
  }

  return (
    <motion.div
      key={id}
      className="teardown-card glass"
      style={{
        opacity: cardOpacity,
        y: cardY,
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">{spec.name.toUpperCase()}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{spec.model}</h3>
      <p className="text-sm text-slate-400 mb-4">{spec.brand}</p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {spec.keySpecs.slice(0, 4).map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1.5 text-[11px]">
            <span className="font-medium text-slate-300">{s}</span>
          </div>
        ))}
      </div>
      <BenchmarkPreview benchmark={spec.benchmark} />
    </motion.div>
  )
}

interface BenchmarkPreviewProps {
  benchmark: typeof COMPONENTS[keyof typeof COMPONENTS]['benchmark']
}

function BenchmarkPreview({ benchmark }: BenchmarkPreviewProps) {
  const maxVal = Math.max(...benchmark.dataPoints)
  const minVal = Math.min(...benchmark.dataPoints)

  return (
    <div className="space-y-2 text-xs">
      <div className="flex justify-between text-slate-500">
        <span>{benchmark.title}</span>
        <span className="font-mono text-accent">{benchmark.unit}</span>
      </div>
      <div className="space-y-1.5">
        {benchmark.dataPoints.slice(0, 5).map((val, i) => {
          const pct = ((val - minVal) / (maxVal - minVal)) * 100
          return (
            <div key={i} className="flex items-center gap-2">
              <span className="text-slate-500 w-20 truncate">{benchmark.labels[i]}</span>
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent/60 to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="font-mono text-slate-300 w-16 text-right">{val.toLocaleString()}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function TeardownDesktop() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isReducedMotion = useReducedMotion() ?? false
  const [currentChapter, setCurrentChapter] = useState(0)

  // Framer Motion scroll progress (0-1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Track current chapter based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress: number) => {
      const chapterIndex = CHAPTERS.findIndex(c => progress >= c.range[0] && progress < c.range[1])
      if (chapterIndex !== -1) {
        setCurrentChapter(chapterIndex)
      } else if (progress >= 1) {
        setCurrentChapter(CHAPTERS.length - 1)
      }
    })
    return unsubscribe
  }, [scrollYProgress])

  // Derived MotionValues for UI elements
  const assembledOpacity = useTransform(scrollYProgress, (p) => isReducedMotion ? (p > 0.5 ? 0 : 1) : (p < 0.1 ? 1 : 1 - Math.min(1, p / 0.15)))
  const assembledScale = useTransform(scrollYProgress, (p) => isReducedMotion ? 1 : (1 - Math.min(1, p / 0.15) * 0.05))

  const chapterOpacity = useTransform(scrollYProgress, (p) => isReducedMotion ? 1 : (p < 0.1 ? 1 : 1 - Math.min(1, p / 0.1)))
  const chapterTranslateY = useTransform(scrollYProgress, (p) => Math.min(1, p / 0.1) * -100)

  const scrollCueOpacity = useTransform(scrollYProgress, (p) => isReducedMotion ? 0 : (p < 0.05 ? 1 : 1 - Math.min(1, p / 0.05)))
  const reassembleCueOpacity = useTransform(scrollYProgress, (p) => isReducedMotion ? 0 : (p > 0.95 ? 1 : 0))

  const finalCardOpacity = useTransform(scrollYProgress, (p) => isReducedMotion ? (p > 0.8 ? 1 : 0) : (p > 0.75 ? 1 : 0))
  const finalCardY = useTransform(scrollYProgress, (p) => isReducedMotion ? 0 : (p > 0.75 ? 0 : 20))

  // Chapter progress bar width
  const chapterProgressWidth = useTransform(scrollYProgress, [CHAPTERS[currentChapter].range[0], CHAPTERS[currentChapter].range[1]], [0, 100], { clamp: true })

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '500vh', minHeight: '500vh' }}
      aria-label="White Ghost Rig interactive teardown"
    >
      {/* Sticky stage - stays fixed while scrolling */}
      <div
        className="fixed inset-0 top-0 z-10 w-full h-screen overflow-hidden pointer-events-none"
        style={{ perspective: '1200px' }}
      >
        {/* Assembled rig - fades out as components explode */}
        <motion.img
          src={COMPONENT_IMAGES.assembled}
          alt="White Ghost Rig fully assembled"
          className="layer-img"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '65vw',
            maxWidth: '550px',
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
            opacity: assembledOpacity,
            transform: `translate(-50%, -50%) scale(${assembledScale})`,
          }}
        />

        {/* Individual component layers */}
        {ASSEMBLY_ORDER.map((id) => (
          <ComponentLayer
            key={id}
            id={id}
            progress={scrollYProgress}
            isReducedMotion={isReducedMotion}
          />
        ))}

        {/* Guide lines - subtle connectors from components to original positions */}
        {!isReducedMotion && ASSEMBLY_ORDER.map((id) => {
          const spec = COMPONENTS[id]
          const progRange = COMPONENT_PROGRESS[id]
          if (!spec || !progRange) return null

          const localProgress = useTransform(scrollYProgress, [progRange.start, progRange.end], [0, 1], { clamp: true })
          const ease = useTransform(localProgress, (t) => 1 - Math.pow(1 - t, 3))
          const showGuide = useTransform(ease, (e) => (e >= 0.1 && e <= 0.95) ? 1 : 0)

          const assembled = ASSEMBLED_POSITIONS[id]
          const exploded = getSlidOutPosition(id)

          const x = useTransform(ease, [0, 1], [assembled.x * 60, exploded.x * 60])
          const y = useTransform(ease, [0, 1], [assembled.y * 60, exploded.y * 60])
          const guideOpacity = useTransform(ease, (e) => e * 0.3)
          const x2 = useTransform(x, (v) => v)
          const y2 = useTransform(y, (v) => v)

          return (
            <motion.svg
              key={`guide-${id}`}
              className="pointer-events-none"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '80vw',
                height: '80vh',
                transform: 'translate(-50%, -50%)',
                opacity: useTransform(showGuide, (s) => s ? guideOpacity : 0),
              }}
            >
              <motion.line
                x1={assembled.x * 60}
                y1={assembled.y * 60}
                x2={x2}
                y2={y2}
                stroke="#00d4aa"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                style={{ filter: 'drop-shadow(0 0 4px rgba(0,212,170,0.5))' }}
              />
            </motion.svg>
          )
        })}

        {/* Chapter indicator */}
        <motion.div
          className="absolute bottom-8 left-8 z-20 pointer-events-auto glass px-4 py-3 min-w-[180px]"
          style={{
            transform: isReducedMotion ? undefined : chapterTranslateY,
            opacity: chapterOpacity,
          }}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">CHAPTER</span>
            <span className="font-mono text-2xl font-bold text-white tabular-nums">{CHAPTERS[currentChapter].id}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">{CHAPTERS[currentChapter].label}</p>
          <div className="mt-2 h-0.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              style={{ width: chapterProgressWidth }}
            />
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 right-8 z-20 pointer-events-auto text-center glass px-4 py-3"
          style={{ opacity: scrollCueOpacity }}
        >
          <div className="cue-bob flex flex-col items-center gap-1">
            <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-slate-500">SCROLL TO</span>
            <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-accent">DISASSEMBLE</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>

        {/* Reassemble cue - shows when scrolling up past midpoint */}
        <motion.div
          className="absolute bottom-8 right-8 z-20 pointer-events-auto text-center glass px-4 py-3"
          style={{ opacity: reassembleCueOpacity }}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-slate-500">SCROLL UP TO</span>
            <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-accent">REASSEMBLE</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" style={{ transform: 'rotate(180deg)' }}>
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Component cards sidebar - appears on the right */}
      <div className="fixed right-0 top-0 z-20 h-screen w-full max-w-md px-4 py-8 overflow-y-auto pointer-events-auto lg:max-w-lg xl:max-w-xl">
        <div className="space-y-4">
          {ASSEMBLY_ORDER.map((id) => (
            <ComponentCard
              key={id}
              id={id}
              progress={scrollYProgress}
              isReducedMotion={isReducedMotion}
            />
          ))}

          {/* Final summary card at full exploded */}
          <motion.div
            className="teardown-card glass border-accent/30"
            style={{
              opacity: finalCardOpacity,
              y: finalCardY,
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">COMPLETE</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Full Exploded View</h3>
            <p className="text-sm text-slate-400 mb-4">All major components separated. Scroll up to reassemble the White Ghost Rig.</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              {ASSEMBLY_ORDER.map((id, i) => (
                <div key={id} className="p-2 rounded-lg bg-white/5">
                  <span className="font-mono text-xs text-accent block">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[10px] text-slate-400">{COMPONENTS[id]?.name.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Progress indicator on left */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none">
        {CHAPTERS.map((chapter, i) => (
          <motion.div
            key={chapter.id}
            className="w-2 h-2 rounded-full transition-all duration-300"
            animate={{
              backgroundColor: i === currentChapter ? '#00d4aa' : 'rgba(255,255,255,0.1)',
              scale: i === currentChapter ? 1.5 : 1,
              boxShadow: i === currentChapter ? '0 0 12px rgba(0,212,170,0.6)' : 'none',
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </section>
  )
}