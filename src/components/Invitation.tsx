import { motion } from 'framer-motion'
import { useT } from '../lib/lang'
import { Mandala } from './Decor'
import { GaneshaMark } from './Royal'

const rise = (delay: number) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .4 }, transition: { delay, duration: .8, ease: [.22, 1, .36, 1] as const } })

const Corner = ({ className }: { className: string }) => <svg viewBox="0 0 60 60" className={`pointer-events-none absolute h-12 w-12 text-gold sm:h-16 sm:w-16 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
  <path d="M4 56V4h52" /><path d="M10 50V10h40" opacity=".5" />
  <path d="M10 22c8 0 12-4 12-12M22 22c0-6 4-8 8-8" /><circle cx="22" cy="22" r="2.5" fill="currentColor" />
</svg>

function Person({ name, lines, delay, linesFirst }: { name: string; lines: string[][]; delay: number; linesFirst?: boolean }) {
  const family = <div className="space-y-3">{lines.map(([label, names]) => <div key={label}>
    <p className="font-serif text-base italic text-gold sm:text-lg">{label}</p>
    <p className="font-serif text-lg leading-7 text-wine/80 sm:text-xl">{names}</p>
  </div>)}</div>
  return <motion.div {...rise(delay)}>
    {linesFirst && family}
    <p className="px-4 py-1 font-script text-6xl leading-normal text-maroon sm:text-7xl">{name}</p>
    {!linesFirst && family}
  </motion.div>
}

export function Invitation() {
  const t = useT()
  return <section id="invitation" className="relative overflow-hidden bg-[#2c0811] py-20 sm:py-28">
    <Mandala className="pointer-events-none absolute left-1/2 top-1/2 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 text-gold/10" />
    <motion.div initial={{ opacity: 0, y: 40, rotateX: 18 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: 1.1, ease: [.22, 1, .36, 1] }} className="relative mx-4 max-w-2xl border-[6px] border-double border-gold/70 bg-[radial-gradient(ellipse_at_top,#fffaf0,#f7e8cd_70%,#efd9b3)] px-6 py-14 text-center shadow-[0_30px_80px_rgba(0,0,0,.55)] [perspective:1000px] sm:mx-auto sm:px-14">
      <Corner className="left-2 top-2" />
      <Corner className="right-2 top-2 -scale-x-100" />
      <Corner className="bottom-2 left-2 -scale-y-100" />
      <Corner className="bottom-2 right-2 -scale-100" />

      <motion.div {...rise(0)} className="flex justify-center"><GaneshaMark className="h-16 w-12" /></motion.div>
      <motion.p {...rise(.1)} className="mt-2 font-deva text-sm text-maroon">॥ श्री गणेशाय नमः ॥</motion.p>
      <motion.p {...rise(.2)} className="mt-6 font-serif text-sm italic text-gold sm:text-base">{t.invite.eyebrow}</motion.p>
      {/* <motion.p {...rise(.3)} className="mt-3 font-serif text-2xl font-semibold text-wine sm:text-3xl">{t.invite.hosts.map((host, i) => <span key={host}>{i > 0 && ` ${t.invite.and} `}<span className="whitespace-nowrap">{host}</span></span>)}</motion.p> */}
      <motion.p {...rise(.4)} className="mx-auto mt-3 max-w-md font-serif text-lg leading-8 text-wine/80">{t.invite.request}</motion.p>

      <div className="mt-6"><Person name={t.invite.bride} lines={t.invite.brideLines} delay={.5} linesFirst /></div>
      <motion.div {...rise(.6)} className="my-4 flex items-center justify-center gap-3 text-gold" aria-hidden="true">
        <span className="h-px w-14 bg-gold/60" /><span className="rose h-4 w-4" /><span className="font-serif text-xl italic text-maroon">{t.invite.with}</span><span className="rose h-4 w-4" /><span className="h-px w-14 bg-gold/60" />
      </motion.div>
      <Person name={t.invite.groom} lines={t.invite.groomLines} delay={.7} />

      <motion.p {...rise(.8)} className="mx-auto mt-10 max-w-sm border-t border-gold/40 pt-6 font-serif text-lg italic text-wine/80">{t.invite.closing}</motion.p>
    </motion.div>
  </section>
}
