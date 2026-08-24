import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { JourneyDesktop } from './components/JourneyDesktop'
import { ExplodingHero } from './components/ExplodingHero'
import { PartCard } from './components/PartCard'
import { CORE, SUPPORTING } from './data/parts'

const ALL_PARTS = [...CORE, ...SUPPORTING]

// Split by creator: Techdrop built the PC, JLite curated monitors
const TECHDROP_PARTS = ALL_PARTS.filter(p => p.id !== 'monitor' && p.id !== 'monitor-sec')
const JLITE_PARTS = ALL_PARTS.filter(p => p.id === 'monitor' || p.id === 'monitor-sec')

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const shown = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el || shown.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          shown.current = true
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

function PartsSection() {
  const ref = useInView(0.03)
  let idx = 0
  return (
    <section ref={ref} className="py-20 px-4 opacity-0 translate-y-10 transition-all duration-700 [&.in-view]:opacity-100 [&.in-view]:translate-y-0">
      <div className="text-center mb-12">
        <span className="mb-2 block text-[10px] font-semibold tracking-[0.25em] uppercase text-accent">FULL BUILD</span>
        <h2 className="text-3xl font-bold text-white">Every Component</h2>
        <p className="text-slate-400 mt-2 max-w-lg mx-auto">Each part selected for the White Ghost Rig with benchmarks against the competition.</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* From @techdrop.bn */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-xs font-bold tracking-wider text-slate-400">FROM</span>
            <a href="https://instagram.com/techdrop.bn" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-accent hover:text-accent-light transition-colors">@techdrop.bn</a>
            <span className="text-xs text-slate-500">&mdash; PC Build & Components</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TECHDROP_PARTS.map((part) => {
              const i = idx++
              return <PartCard key={part.id} part={part} index={i} />
            })}
          </div>
        </div>

        {/* From @jlitebn */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-xs font-bold tracking-wider text-slate-400">FROM</span>
            <a href="https://instagram.com/jlitebn" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-accent hover:text-accent-light transition-colors">@jlitebn</a>
            <span className="text-xs text-slate-500">&mdash; Display Curation</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {JLITE_PARTS.map((part) => {
              const i = idx++
              return <PartCard key={part.id} part={part} index={i} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16 px-4 text-center border-t border-white/5">
      <h2 className="text-2xl font-bold text-white mb-3">White Ghost Rig</h2>
      <p className="text-slate-500 mb-2">Built and benchmarked with care by</p>
      <div className="flex items-center justify-center gap-6 mb-6">
        <a href="https://instagram.com/techdrop.bn" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light transition-colors text-sm font-semibold">@techdrop.bn</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
        </svg>
        <a href="https://instagram.com/jlitebn" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light transition-colors text-sm font-semibold">@jlitebn</a>
      </div>
      <p className="text-slate-600 text-sm">Real hardware &middot; Verified benchmarks &middot; Animated with Framer Motion</p>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-black">
        Skip to content
      </a>
      <main id="content">
        <ExplodingHero />
        <JourneyDesktop />
        <PartsSection />
        <Footer />
      </main>
    </>
  )
}
