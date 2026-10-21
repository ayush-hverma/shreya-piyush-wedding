import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { weddingData } from '../data/weddingData'
import { useT } from '../lib/lang'
import { Mandala } from './Decor'
import { RoyalTitle } from './Royal'

function getLeft() {
  const total = Math.floor(Math.max(0, new Date(weddingData.dateISO).getTime() - Date.now()) / 1000)
  return [Math.floor(total / 86400), Math.floor(total / 3600) % 24, Math.floor(total / 60) % 60, total % 60]
}

export function Countdown() {
  const t = useT()
  const [left, setLeft] = useState(getLeft)
  useEffect(() => { const id = window.setInterval(() => setLeft(getLeft()), 1000); return () => clearInterval(id) }, [])
  return <section className="royal-bg relative overflow-hidden text-cream">
    <Mandala className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 text-gold/10" />
    <div className="section-shell relative text-center">
      <RoyalTitle eyebrow={t.countdown.eyebrow} title={t.countdown.title} />
      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-4 gap-2 sm:gap-5">
        {left.map((value, i) => <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .12, type: 'spring', stiffness: 130, damping: 14 }} className="relative rounded-t-full border border-gold/60 bg-gradient-to-b from-maroon/80 to-wine px-1 pb-4 pt-8 shadow-[inset_0_0_0_4px_rgba(74,15,28,1),inset_0_0_0_5px_rgba(181,150,90,.35)] sm:pb-6 sm:pt-12">
          <span className="marigold absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2" aria-hidden="true" />
          <div className="relative h-10 overflow-hidden font-serif text-3xl font-semibold leading-10 sm:h-16 sm:text-6xl sm:leading-[4rem]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span key={value} className="gold-text block" initial={{ y: '-100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }} transition={{ duration: .45 }}>{String(value).padStart(2, '0')}</motion.span>
            </AnimatePresence>
          </div>
          <p className="mt-2 text-[9px] uppercase tracking-[.18em] text-cream/60 sm:text-[11px]">{t.countdown.units[i]}</p>
        </motion.div>)}
      </div>
    </div>
  </section>
}
