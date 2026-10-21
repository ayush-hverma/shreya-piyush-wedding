import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { weddingData } from '../data/weddingData'
import { play } from '../lib/music'
import { Lotus, Mandala } from './Decor'
import { Garland } from './Royal'
import { useT } from '../lib/lang'

const EASE = [.65, 0, .35, 1] as const
// deterministic gold dust so it doesn't reshuffle on re-render
const DUST = Array.from({ length: 22 }, (_, i) => ({ left: (i * 47) % 100, size: 2 + (i % 3), delay: (i * .7) % 6, dur: 6 + (i % 5) }))

function Door({ side, open }: { side: 'left' | 'right'; open: boolean }) {
  const left = side === 'left'
  return <motion.div
    initial={false}
    animate={{ rotateY: open ? (left ? -105 : 105) : 0 }}
    transition={{ duration: 2, ease: EASE }}
    style={{ transformOrigin: left ? 'left center' : 'right center' }}
    className={`maroon-pattern absolute inset-y-0 w-1/2 overflow-hidden bg-maroon shadow-[0_0_80px_rgba(0,0,0,.45)] ${left ? 'left-0' : 'right-0'}`}
  >
    {/* depth: darker toward the hinge */}
    <div className={`absolute inset-0 from-black/40 via-transparent to-black/15 ${left ? 'bg-gradient-to-r' : 'bg-gradient-to-l'}`} />
    <div className="absolute inset-3 border border-gold/60 sm:inset-5" />
    <div className="absolute inset-[18px] border border-gold/20 sm:inset-7" />
    {/* carved arch with jali lattice */}
    <div className="jali absolute inset-x-6 bottom-[30%] top-[9%] rounded-t-full border-2 border-gold/50 sm:inset-x-12" />
    <div className="absolute inset-x-9 bottom-[32%] top-[12%] rounded-t-full border border-gold/25 sm:inset-x-16" />
    <Mandala className="absolute left-1/2 top-[17%] h-24 w-24 -translate-x-1/2 text-gold/45 sm:h-40 sm:w-40" />
    {/* lower panel */}
    <div className="absolute inset-x-6 bottom-[7%] h-[17%] border border-gold/45 sm:inset-x-12">
      <div className="absolute inset-2 border border-gold/20" />
      <Lotus className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-gold/50" />
    </div>
    {/* gold edge + studs along the meeting edge */}
    <div className={`absolute inset-y-0 w-1.5 bg-gradient-to-b from-gold via-amber-200 to-gold ${left ? 'right-0' : 'left-0'}`} />
    <div className={`absolute inset-y-6 flex flex-col justify-between ${left ? 'right-3' : 'left-3'}`} aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-amber-100 to-gold shadow" />)}
    </div>
    {/* knocker */}
    <div className={`absolute top-1/2 -translate-y-1/2 ${left ? 'right-7' : 'left-7'}`}>
      <div className="h-6 w-6 rounded-full border-2 border-amber-200 bg-gradient-to-br from-amber-200 to-gold shadow-lg" />
      <motion.div animate={{ rotate: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="mx-auto -mt-1 h-8 w-8 origin-top -translate-x-1 rounded-full border-[3px] border-gold shadow" />
    </div>
  </motion.div>
}

export function IntroGate({ onOpen, onDone }: { onOpen: () => void; onDone: () => void }) {
  const [open, setOpen] = useState(false)
  const t = useT()
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
  const enter = () => {
    if (open) return
    void play()
    setOpen(true)
    onOpen()
    window.setTimeout(onDone, 2200)
  }

  return <motion.div animate={open ? { opacity: 0 } : { opacity: 1 }} transition={open ? { delay: 1.7, duration: .5 } : {}} className="fixed inset-0 z-[60] overflow-hidden [perspective:1800px]" role="dialog" aria-label="Wedding invitation cover">
    {/* royal backdrop around the doorway; fades as the doors open */}
    <motion.div animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ delay: .3, duration: 1.2 }} className="royal-bg absolute inset-0" aria-hidden="true" />
    <motion.div animate={open ? { opacity: 0, y: -60 } : { opacity: 1, y: 0 }} transition={{ duration: .7 }} className="pointer-events-none absolute inset-x-0 top-0 z-30 h-28"><Garland strands={7} /></motion.div>
    <div className="relative mx-auto h-full max-w-lg [perspective:1800px]">
      <Door side="left" open={open} />
      <Door side="right" open={open} />
    </div>

    {/* light pouring through the seam as the doors part */}
    {open && <motion.div initial={{ opacity: 0, scaleX: .05 }} animate={{ opacity: [0, 1, 0], scaleX: [.05, 1, 1.4] }} transition={{ duration: 1.6, ease: 'easeOut' }} className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,rgba(255,244,204,.95),rgba(251,191,36,.35)_35%,transparent_70%)]" aria-hidden="true" />}

    {/* rising gold dust */}
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      {DUST.map((d, i) => <motion.span key={i} className="absolute bottom-0 rounded-full bg-amber-200 shadow-[0_0_6px_rgba(253,230,138,.9)]" style={{ left: `${d.left}%`, width: d.size, height: d.size }} animate={{ y: [0, -900], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: d.dur, delay: d.delay, ease: 'linear' }} />)}
    </div>

    <motion.div initial={{ opacity: 0 }} animate={open ? { opacity: 0, scale: 1.3 } : { opacity: 1, scale: 1 }} transition={{ duration: open ? .5 : 1.2 }} className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <div className="animate-spin-slow absolute h-[30rem] w-[30rem] rounded-full bg-[repeating-conic-gradient(rgba(251,191,36,.2)_0deg_6deg,transparent_6deg_18deg)] blur-md [mask-image:radial-gradient(circle,#000_15%,transparent_65%)]" aria-hidden="true" />
      <motion.button initial={{ scale: .6, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: .3, type: 'spring', stiffness: 90, damping: 12 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} onClick={enter} autoFocus aria-label={t.gate.tap} className="pointer-events-auto relative flex h-48 w-48 flex-col items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fbe7b0,#d8b56a_45%,#a8843f_80%,#7a5a22)] text-wine shadow-[0_0_0_3px_rgba(122,90,34,.6),0_0_0_7px_rgba(251,231,176,.35),0_18px_50px_rgba(0,0,0,.55),0_0_60px_rgba(251,191,36,.35)] sm:h-52 sm:w-52">
        <span className="absolute inset-0 animate-ping rounded-full border-2 border-amber-200/60 [animation-duration:2.2s]" aria-hidden="true" />
        <span className="absolute inset-3 rounded-full border border-[#7a5a22]/50" aria-hidden="true" />
        <span className="absolute inset-[18px] rounded-full border border-dashed border-[#7a5a22]/35" aria-hidden="true" />
        <span className="relative font-deva text-sm text-[#5b1a24]">॥ शुभ विवाह ॥</span>
        <span className="relative mt-1 font-script text-5xl leading-none text-[#4a0f1c] drop-shadow-[0_1px_0_rgba(255,255,255,.4)]">{weddingData.monogram.bride}<span className="mx-1 align-middle font-serif text-base">♡</span>{weddingData.monogram.groom}</span>
        <span className="relative mt-3 font-serif text-[11px] font-semibold uppercase tracking-[.25em] text-[#5b1a24]">{t.gate.tap}</span>
      </motion.button>
    </motion.div>
  </motion.div>
}
