import { motion } from 'framer-motion'
import { weddingData } from '../data/weddingData'
import { useT } from '../lib/lang'
import { RoyalTitle } from './Royal'

const TILT = [-8, 0, 8]

export function Couple() {
  const t = useT()
  return <section className="relative overflow-hidden bg-[#2c0811] text-cream">
    <div className="section-shell">
      <RoyalTitle eyebrow={t.gallery.eyebrow} title={t.gallery.title} />
      {/* fanned photo frames; hover/tap straightens one and lifts it forward */}
      <div className="mt-14 flex justify-center">
        {weddingData.coupleImages.map((image, i) => <motion.figure key={image.src} initial={{ opacity: 0, y: 60, rotate: 0 }} whileInView={{ opacity: 1, y: i === 1 ? -16 : 0, rotate: TILT[i] }} viewport={{ once: true, amount: .3 }} transition={{ delay: i * .15, type: 'spring', stiffness: 70, damping: 14 }} whileHover={{ rotate: 0, scale: 1.08, zIndex: 10 }} whileTap={{ rotate: 0, scale: 1.08, zIndex: 10 }} className={`relative -mx-5 w-36 shrink-0 cursor-pointer border-[6px] border-[#f7e8cd] bg-[#f7e8cd] pb-6 shadow-[0_20px_50px_rgba(0,0,0,.6)] sm:-mx-6 sm:w-64 sm:pb-10 ${i === 1 ? 'z-[5]' : ''}`}>
          <img src={image.src} alt={image.alt} loading="lazy" style={{ objectPosition: image.position ?? 'center' }} className="aspect-[3/4] w-full object-cover" />
          <span className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full marigold" aria-hidden="true" />
        </motion.figure>)}
      </div>
    </div>
  </section>
}
