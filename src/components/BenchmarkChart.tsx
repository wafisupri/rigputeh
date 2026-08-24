import { useReducedMotion } from 'framer-motion'
import { Chart } from '../data/parts'

interface Props {
  chart: Chart
  isHovered: boolean
}

export function BenchmarkChart({ chart, isHovered }: Props) {
  const reduce = useReducedMotion()
  const sorted = [...chart.bars].sort((a, b) => b.value - a.value)
  const maxVal = sorted[0]?.value || 1
  const direction = chart.betterIsLower ? 'Lower is better' : 'Higher is better'

  if (reduce) return (
    <ul className="mt-3 space-y-1">
      {sorted.map((b) => (
        <li key={b.name} className="flex justify-between text-[11px]">
          <span className="text-slate-400">{b.name}{b.ours ? ' *' : ''}</span>
          <span className="font-mono text-slate-300 tabular-nums">{b.value.toLocaleString()}</span>
        </li>
      ))}
      <li className="text-[9px] text-slate-600 text-center mt-2">{direction}</li>
    </ul>
  )

  return (
    <figure className="chart-area mt-4">
      <figcaption className="sr-only">{chart.title}</figcaption>
      <div className="space-y-2">
        {sorted.map((b, i) => {
          const pct = Math.max(4, (b.value / maxVal) * 100)
          return (
            <div key={b.name} className="chart-row">
              <div className="flex items-baseline justify-between mb-0.5">
                <span className="text-[11px] text-slate-400 truncate max-w-[65%]">
                  {b.name}
                  {b.ours && (
                    <span className="ml-1.5 inline-block rounded bg-accent/20 px-1.5 py-0 text-[8px] font-bold text-accent tracking-wider align-middle">
                      YOURS
                    </span>
                  )}
                </span>
                <span className="font-mono text-[11px] tabular-nums text-slate-300">
                  {b.value.toLocaleString()}
                </span>
              </div>
              <div className="relative h-3 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full ${
                    b.ours
                      ? 'bg-gradient-to-r from-accent/80 to-accent shadow-[0_0_12px_rgba(0,212,170,0.5)]'
                      : 'bg-slate-600/40'
                  }`}
                  style={{
                    width: isHovered ? pct + '%' : '0%',
                    transition: 'width 3s cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: isHovered ? (i * 200) + 'ms' : '0ms',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[9px] text-slate-600 font-medium">{chart.title}</span>
        <span className={`text-[9px] font-medium ${chart.betterIsLower ? 'text-blue-400/60' : 'text-accent/60'}`}>
          {direction}
        </span>
      </div>
    </figure>
  )
}
