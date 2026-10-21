import { motion } from 'framer-motion'
import { CalendarDays, Clock3, Flame, Flower2, Gem, MapPin } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import { useT } from '../lib/lang'
import { Garland, RoyalTitle } from './Royal'

const ICONS: Record<string, typeof Gem> = { engagement: Gem, mehendi: Flower2, wedding: Flame }

export function Functions() {
  const t = useT()
  return <section id="celebrations" className="royal-bg relative overflow-hidden text-cream">
    <Garland strands={11} />
    <div className="section-shell relative pt-36">
      <RoyalTitle eyebrow={t.events.eyebrow} title={t.events.title} />
      <ol className="relative mx-auto mt-14 max-w-4xl">
        {/* timeline spine */}
        <motion.span initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: .1 }} transition={{ duration: 1.6, ease: 'easeOut' }} className="absolute bottom-6 left-6 top-6 w-px origin-top bg-gradient-to-b from-gold via-gold/60 to-transparent md:left-1/2" aria-hidden="true" />
        {weddingData.events.map((event, i) => {
          const Icon = ICONS[event.id] ?? Gem
          const local = t.events.items[event.id] ?? {}
          const right = i % 2 === 1
          return <li key={event.id} className="relative mb-10 pl-16 last:mb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
            {/* plain span positions; inner motion span animates (framer's transform would override the translate) */}
            <span className="absolute left-6 top-6 z-10 -translate-x-1/2 md:left-1/2">
              <motion.span initial={{ scale: 0, rotate: -90 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 160, damping: 13 }} className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-gradient-to-br from-maroon to-wine text-gold shadow-[0_0_24px_rgba(251,191,36,.35)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </motion.span>
            </span>
            <motion.article initial={{ opacity: 0, x: right ? 60 : -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .9, ease: [.22, 1, .36, 1] }} whileHover={{ y: -5 }} className={`group relative overflow-hidden rounded-t-[2.5rem] border border-gold/45 bg-white/[.04] p-6 backdrop-blur-sm transition-shadow hover:shadow-[0_0_40px_rgba(181,150,90,.25)] sm:p-8 ${right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}`}>
              <span className="absolute -right-3 -top-3 font-script text-8xl text-gold/10 transition group-hover:text-gold/20" aria-hidden="true">{i + 1}</span>
              <p className="font-serif text-sm italic text-gold">{local.eyebrow ?? event.eyebrow}</p>
              <h3 className="gold-text mt-1 py-1 font-serif text-4xl font-semibold">{local.title ?? event.title}</h3>
              <dl className={`mt-5 space-y-3 text-sm text-cream/85 ${right ? '' : 'md:[&>div]:flex-row-reverse'}`}>
                <div className="flex gap-3"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /><div><dt className="sr-only">Date</dt><dd>{local.date ?? event.date}</dd></div></div>
                <div className="flex gap-3"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /><div><dt className="sr-only">Time</dt><dd>{local.time ?? event.time}</dd></div></div>
                <div className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /><div><dt className="sr-only">Venue</dt><dd className="font-semibold">{event.venue}</dd><dd className="text-cream/60">{event.address}</dd></div></div>
              </dl>
              {event.locationLink ? <a href={event.locationLink} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold via-amber-300 to-gold px-5 py-2 text-[11px] font-semibold uppercase tracking-[.18em] text-wine shadow transition hover:brightness-110"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{t.events.map}</a> : null}
            </motion.article>
          </li>
        })}
      </ol>
    </div>
  </section>
}
