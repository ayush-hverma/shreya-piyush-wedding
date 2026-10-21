import { motion } from 'framer-motion'
import { useLang } from '../lib/lang'
import { Lotus } from './Decor'

export function GaneshaMark({ className = 'h-20 w-16' }: { className?: string }) {
  return <div className={`ganesha-gold ${className}`} role="img" aria-label="Lord Ganesha" />
}

// marigold rope across the top with alternating marigold / rose strands hanging from it
export function Garland({ strands = 9 }: { strands?: number }) {
  return <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28" aria-hidden="true">
    <div className="garland-h absolute inset-x-0 top-0 h-[18px]" />
    <div className="absolute inset-x-0 top-3 flex justify-around">
      {Array.from({ length: strands }, (_, i) => <motion.div key={i} className="flex origin-top flex-col items-center" animate={{ rotate: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3 + (i % 3) * .4, delay: i * .2, ease: 'easeInOut' }}>
        <span className="garland-v w-[18px]" style={{ height: 34 + (i % 3) * 18 }} />
        <span className={i % 2 ? 'rose h-5 w-5' : 'marigold h-6 w-6'} />
        {i % 2 === 0 && <span className="leaf -mt-1 h-4 w-3 rotate-45" />}
      </motion.div>)}
    </div>
  </div>
}

export function RoyalTitle({ eyebrow, title, dark = true }: { eyebrow: string; title: string; dark?: boolean }) {
  return <div className="text-center">
    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} className="font-serif text-sm italic tracking-[.08em] text-gold sm:text-base">{eyebrow}</motion.p>
    <motion.h2 initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ delay: .15, duration: .9 }} className={`mt-2 px-2 py-1 font-serif text-4xl font-semibold leading-tight sm:text-6xl ${dark ? 'gold-text' : 'text-wine'}`}>{title}</motion.h2>
    <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-gold" aria-hidden="true">
      <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: .4, duration: .8 }} className="h-px w-16 origin-right bg-gradient-to-l from-gold to-transparent" />
      <span className="marigold h-3 w-3" />
      <Lotus className="h-6 w-6" />
      <span className="marigold h-3 w-3" />
      <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: .4, duration: .8 }} className="h-px w-16 origin-left bg-gradient-to-r from-gold to-transparent" />
    </div>
  </div>
}

export function LangToggle() {
  const { lang, setLang } = useLang()
  return <div className="fixed right-3 top-3 z-50 flex overflow-hidden rounded-full border border-gold/60 bg-wine/85 text-[11px] font-semibold text-cream shadow-lg backdrop-blur" role="group" aria-label="Language">
    {(['en', 'hi'] as const).map(code => <button key={code} onClick={() => setLang(code)} aria-pressed={lang === code} className={`px-3 py-1.5 transition ${lang === code ? 'bg-gold text-wine' : 'hover:bg-white/10'}`}>{code === 'en' ? 'EN' : 'हिं'}</button>)}
  </div>
}
