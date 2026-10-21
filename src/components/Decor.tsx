import { motion, useScroll } from 'framer-motion'
import type { CSSProperties } from 'react'

const PETAL_COLORS = ['#f59e0b', '#ea580c', '#e11d48', '#fb7185', '#fbbf24']
// deterministic spread so petals don't reshuffle on re-render; negative delays start them mid-fall
const PETALS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 53) % 100,
  delay: -((i * 2.3) % 16),
  dur: 12 + ((i * 7) % 10),
  size: 9 + ((i * 5) % 9),
  drift: (i % 2 ? 1 : -1) * (40 + ((i * 13) % 80)),
  color: PETAL_COLORS[i % PETAL_COLORS.length],
}))

export function Petals() {
  return <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
    {PETALS.map((p, i) => <span key={i} className="petal" style={{ left: `${p.left}%`, width: p.size, height: p.size * 1.3, background: `linear-gradient(135deg, ${p.color}, ${p.color}99)`, '--delay': `${p.delay}s`, '--dur': `${p.dur}s`, '--drift': `${p.drift}px` } as CSSProperties} />)}
  </div>
}

export function Toran() {
  return <div className="toran" aria-hidden="true">
    {Array.from({ length: 13 }, (_, i) => <span key={i} className={`toran-strand ${i % 2 ? 'leaf' : ''}`} style={{ '--len': `${i % 2 ? 30 : 46 + (i % 3) * 8}px`, '--d': `${-i * 0.37}s` } as CSSProperties} />)}
  </div>
}

export function Mandala({ className = '' }: { className?: string }) {
  return <svg viewBox="-100 -100 200 200" className={`animate-spin-slow ${className}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth=".6">
    {[96, 88, 70, 48, 26, 10].map(r => <circle key={r} r={r} />)}
    {Array.from({ length: 24 }, (_, i) => <ellipse key={`a${i}`} rx="8" ry="19" cy="-69" transform={`rotate(${i * 15})`} />)}
    {Array.from({ length: 16 }, (_, i) => <path key={`b${i}`} d="M0 -26 Q 11 -38 0 -48 Q -11 -38 0 -26" transform={`rotate(${i * 22.5})`} />)}
    {Array.from({ length: 12 }, (_, i) => <path key={`c${i}`} d="M0 -10 Q 6 -18 0 -26 Q -6 -18 0 -10" transform={`rotate(${i * 30})`} />)}
    {Array.from({ length: 36 }, (_, i) => <circle key={`d${i}`} r="1.8" cy="-92" fill="currentColor" stroke="none" transform={`rotate(${i * 10})`} />)}
  </svg>
}

export function Lotus({ className = 'h-5 w-5' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 3c2.2 3 3.2 6.4 0 11.2C8.8 9.4 9.8 6 12 3z" />
    <path d="M3.5 8.5c3.4.1 6.6 2.2 8.5 5.7-4.3 1.2-7.6-1.2-8.5-5.7zM20.5 8.5c-3.4.1-6.6 2.2-8.5 5.7 4.3 1.2 7.6-1.2 8.5-5.7z" opacity=".85" />
    <path d="M2.5 15.5h19c-2 2.5-5.4 3.8-9.5 3.8s-7.5-1.3-9.5-3.8z" opacity=".7" />
  </svg>
}

export function Divider({ className = 'mt-5' }: { className?: string }) {
  const line = { initial: { scaleX: 0 }, whileInView: { scaleX: 1 }, viewport: { once: true }, transition: { delay: .45, duration: .8 } }
  return <div className={`mx-auto flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden="true">
    <motion.span {...line} className="h-px w-14 origin-right bg-gradient-to-l from-gold to-transparent sm:w-20" />
    <motion.span initial={{ scale: 0, rotate: -90 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: .3, type: 'spring', stiffness: 160, damping: 12 }}><Lotus /></motion.span>
    <motion.span {...line} className="h-px w-14 origin-left bg-gradient-to-r from-gold to-transparent sm:w-20" />
  </div>
}

export function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  const words = title.split(' ')
  return <div className="relative text-center">
    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} className="eyebrow">{eyebrow}</motion.p>
    <h2 className={`display mt-3 text-4xl sm:text-6xl ${light ? 'text-cream' : 'text-maroon'}`}>
      {words.map((word, i) => <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
        <motion.span className="inline-block" initial={{ y: '110%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ delay: .12 + i * .09, duration: .8, ease: [.22, 1, .36, 1] }}>{word}</motion.span>{i < words.length - 1 ? ' ' : ''}
      </span>)}
    </h2>
    <Divider />
  </div>
}

export function Diya() {
  return <div className="flex flex-col items-center" aria-hidden="true">
    <div className="diya-flame" />
    <div className="-mt-0.5 h-4 w-12 rounded-b-full border-t-2 border-amber-300 bg-gradient-to-b from-amber-600 to-orange-900 shadow-[0_8px_20px_rgba(251,191,36,.35)]" />
  </div>
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-gradient-to-r from-gold via-amber-300 to-maroon" aria-hidden="true" />
}
