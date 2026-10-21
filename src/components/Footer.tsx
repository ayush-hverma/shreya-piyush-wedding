import { ArrowUp } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import { useT } from '../lib/lang'
import { Diya } from './Decor'
import { GaneshaMark } from './Royal'

export function Footer() {
  const t = useT()
  return <footer className="relative bg-[#2c0811] text-cream">
    <div className="garland-h h-[18px]" aria-hidden="true" />
    <div className="section-shell pb-24 pt-16 text-center">
      <div className="flex items-end justify-center gap-10"><Diya /><GaneshaMark className="h-14 w-11" /><Diya /></div>
      <p className="mt-5 font-deva text-base text-gold">{t.footer.blessing}</p>
      <p className="gold-text mt-2 px-4 py-2 font-script text-6xl leading-normal sm:text-7xl">{t.invite.bride} &amp; {t.invite.groom}</p>
      <p className="text-[10px] uppercase tracking-[.3em] text-gold/80">{weddingData.dateLabel} · {weddingData.city}</p>
      <p className="mx-auto mt-8 max-w-xs font-serif text-lg italic text-cream/70">{t.footer.line}</p>
      <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="mt-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-gold hover:text-amber-200">Back to top <ArrowUp className="h-3 w-3" /></a>
    </div>
  </footer>
}
