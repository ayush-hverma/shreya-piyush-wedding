import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import { useT } from '../lib/lang'
import { Lotus } from './Decor'
import { GaneshaMark, Garland } from './Royal'

export function Hero({ ready }: { ready: boolean }) {
  const t = useT()
  const show = (delay: number) => ({ initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { delay, duration: .9, ease: [.22, 1, .36, 1] as const } })
  return <section aria-label="Wedding invitation cover" className="royal-bg relative flex min-h-[100svh] flex-col items-center overflow-hidden text-cream">
    <Garland />
    {/* side garlands */}
    <div className="garland-v pointer-events-none absolute bottom-[38%] left-2 top-0 w-[18px] sm:left-6" aria-hidden="true" />
    <div className="garland-v pointer-events-none absolute bottom-[38%] right-2 top-0 w-[18px] sm:right-6" aria-hidden="true" />

    {/* jharokha arch */}
    <motion.div initial={{ opacity: 0, scale: .92 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.4, ease: [.22, 1, .36, 1] }} className="pointer-events-none absolute inset-x-8 bottom-12 top-20 mx-auto max-w-xl rounded-t-full border border-gold/50 sm:inset-x-16" aria-hidden="true">
      <div className="absolute inset-2 rounded-t-full border border-gold/20" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
    </motion.div>

    <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-10 pb-20 pt-36 text-center">
      <motion.div initial={{ opacity: 0, scale: .5 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ delay: .5, type: 'spring', stiffness: 110, damping: 12 }}><GaneshaMark className="h-16 w-12 drop-shadow-[0_0_14px_rgba(251,191,36,.5)] sm:h-20 sm:w-16" /></motion.div>
      <motion.p {...show(.8)} className="mt-3 font-deva text-sm text-gold sm:text-base">॥ श्री गणेशाय नमः ॥</motion.p>
      <motion.p {...show(1)} className="mt-6 max-w-xs font-serif text-sm italic text-cream/80 sm:max-w-none sm:text-lg">{t.hero.invite}</motion.p>
      <motion.h1 initial={{ opacity: 0, scale: .9, filter: 'blur(8px)' }} animate={ready ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}} transition={{ delay: 1.2, duration: 1.2 }} className="gold-text mt-2 px-4 py-2 font-script text-7xl leading-normal sm:text-9xl">{t.invite.bride}</motion.h1>
      <motion.p {...show(1.5)} className="-my-2 font-serif text-xl italic text-gold sm:text-2xl">{t.hero.weds}</motion.p>
      <motion.p initial={{ opacity: 0, scale: .9, filter: 'blur(8px)' }} animate={ready ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}} transition={{ delay: 1.7, duration: 1.2 }} className="gold-text px-4 py-2 font-script text-7xl leading-normal sm:text-9xl">{t.invite.groom}</motion.p>
      <motion.div {...show(2)} className="mt-4 flex items-center gap-3 text-gold" aria-hidden="true"><span className="h-px w-12 bg-gold/60" /><Lotus className="h-5 w-5" /><span className="h-px w-12 bg-gold/60" /></motion.div>
      <motion.p {...show(2.1)} className="mt-4 font-serif text-2xl tracking-[.25em] text-cream sm:text-3xl">11 · 12 · 2026</motion.p>
      <motion.p {...show(2.2)} className="mt-1 text-[10px] uppercase tracking-[.35em] text-gold/80">{weddingData.city}</motion.p>
    </div>

    <a href="#invitation" className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-center text-gold/90 transition hover:text-gold" aria-label="Scroll to the invitation">
      <span className="block text-[9px] uppercase tracking-[.32em]">{t.hero.scroll}</span>
      <ChevronDown className="mx-auto mt-1 h-4 w-4 animate-bounce" aria-hidden="true" />
    </a>
  </section>
}
