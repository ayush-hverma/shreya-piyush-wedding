import { motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { subscribe, toggle } from '../lib/music'
import { useT } from '../lib/lang'

export function MusicPlayer() {
  const t = useT()
  const [playing, setPlaying] = useState(false)
  useEffect(() => subscribe(setPlaying), [])
  // spinning record; the gold notch makes the rotation visible
  return <motion.button initial={{ opacity: 0, scale: .5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.4 }} onClick={() => void toggle()} aria-label={playing ? t.music.pause : t.music.play} className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-wine shadow-[0_8px_30px_rgba(0,0,0,.5),0_0_20px_rgba(181,150,90,.35)]">
    <motion.span animate={playing ? { rotate: 360 } : {}} transition={playing ? { repeat: Infinity, duration: 4, ease: 'linear' } : {}} className="absolute inset-1 rounded-full bg-[repeating-radial-gradient(circle,#2c0811_0_2px,#4a0f1c_2px_4px)]" aria-hidden="true">
      <span className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold" />
    </motion.span>
    <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gold/90 text-wine">{playing ? <Pause className="h-3 w-3" /> : <Play className="ml-0.5 h-3 w-3" />}</span>
  </motion.button>
}
