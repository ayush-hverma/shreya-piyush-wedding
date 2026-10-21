import { MotionConfig, motion } from 'framer-motion'
import { BellRing, Phone } from 'lucide-react'
import { useState } from 'react'
import { Countdown } from './components/Countdown'
import { Couple } from './components/Couple'
import { Petals, ScrollProgress } from './components/Decor'
import { Footer } from './components/Footer'
import { Functions } from './components/Functions'
import { Hero } from './components/Hero'
import { IntroGate } from './components/IntroGate'
import { Invitation } from './components/Invitation'
import { MusicPlayer } from './components/MusicPlayer'
import { LangToggle, RoyalTitle } from './components/Royal'
import { weddingData } from './data/weddingData'
import { LangProvider, useT } from './lib/lang'

function ThingsToKnow() {
  const t = useT()
  const numbers = weddingData.thingsToKnow[0].body.split(' · ')
  const cardClass = 'rounded-t-[2rem] border border-gold/45 bg-white/[.04] p-7 text-center backdrop-blur-sm'
  return <section className="royal-bg relative overflow-hidden text-cream">
    <div className="section-shell relative">
      <RoyalTitle eyebrow={t.info.eyebrow} title={t.info.title} />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={cardClass}>
          <Phone className="mx-auto h-6 w-6 text-gold" aria-hidden="true" />
          <h3 className="gold-text mt-4 font-serif text-3xl font-semibold">{t.info.contact}</h3>
          <p className="mt-4 flex flex-wrap justify-center gap-2">
            {numbers.map(number => <a key={number} href={`tel:+91${number.replace(/\s|\./g, '')}`} className="rounded-full border border-gold/50 px-3 py-1.5 text-sm text-cream transition hover:bg-gold hover:text-wine">{number}</a>)}
          </p>
        </motion.article>
        <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} className={cardClass}>
          <BellRing className="mx-auto h-6 w-6 text-gold" aria-hidden="true" />
          <h3 className="gold-text mt-4 font-serif text-3xl font-semibold">{t.info.reminder}</h3>
          <p className="mt-4 font-serif text-lg leading-8 text-cream/80">{t.info.reminderBody}</p>
        </motion.article>
      </div>
      <div className="mt-8 overflow-hidden rounded-t-[2rem] border-2 border-gold/50">
        <iframe title="Wedding venue map" src={weddingData.mapEmbedUrl} className="block h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </div>
  </section>
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [gateGone, setGateGone] = useState(false)
  return <LangProvider><MotionConfig reducedMotion="user"><main id="top" className="bg-wine">
    {!gateGone && <IntroGate onOpen={() => setOpened(true)} onDone={() => setGateGone(true)} />}
    <ScrollProgress />
    <LangToggle />
    {opened && <Petals />}
    <Hero ready={opened} />
    <Invitation />
    <Functions />
    <Couple />
    <Countdown />
    <ThingsToKnow />
    <Footer />
    <MusicPlayer />
  </main></MotionConfig></LangProvider>
}
