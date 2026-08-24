import { useEffect, useRef, useState } from 'react'
import { Part } from '../data/parts'
import { BenchmarkChart } from './BenchmarkChart'

export function PartCard({ part, index }: { part: Part; index?: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <article
      ref={cardRef}
      className="part-card glass flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-500 hover:border-accent/30 hover:bg-white/[0.07] hover:shadow-[0_8px_40px_rgba(0,212,170,0.08)] hover:-translate-y-1 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: 0,
        transform: 'translateY(24px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.3s, background 0.3s, box-shadow 0.3s',
        transitionDelay: index !== undefined ? (index * 80) + 'ms' : '0ms',
      }}
    >
      <div className="flex items-center justify-center h-56 sm:h-64 mb-4 bg-white/[0.02] rounded-xl overflow-hidden relative">
        <img
          src={part.img}
          alt={part.alt}
          loading="lazy"
          decoding="async"
          // We use w-full h-full object-contain and scale up to remove negative space
          // without stretching the aspect ratio or risking broken pixels.
          className="w-full h-full object-contain scale-[1.2] transition-transform duration-500 group-hover:scale-[1.25] drop-shadow-[0_12px_24px_rgba(2,6,23,0.5)]"
        />
      </div>
      <div className="flex items-center gap-2 mb-1 z-10 relative">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">{part.name}</span>
        <span className="text-[10px] text-slate-600">&middot;</span>
        <span className="text-[10px] text-slate-500 truncate">{part.brand}</span>
      </div>
      <h3 className="text-sm font-semibold text-slate-200 mb-1 z-10 relative">{part.model}</h3>
      <p className="text-[11px] text-slate-500 mb-3 leading-relaxed z-10 relative">{part.role}</p>
      <ul className="grid grid-cols-2 gap-1.5 mb-3 z-10 relative">
        {part.specs.map(([label, value], i) => (
          <li key={i} className="flex items-center gap-1 rounded-md border border-white/5 bg-white/[0.03] px-2 py-1.5 text-[11px]">
            <span className="text-slate-500">{label}:</span>
            <span className="font-medium text-slate-300">{value}</span>
          </li>
        ))}
      </ul>
      {part.chart && <BenchmarkChart chart={part.chart} isHovered={isHovered} />}
    </article>
  )
}
