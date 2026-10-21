// Wedding music: loops the playlist below (royalty-free, Pixabay Content License);
// if the files fail to load, falls back to a tanpura drone + santoor-style melody in Raag Bhupali, synthesized live.
const TRACKS = ['/assets/music/indian-wedding-folk.mp3', '/assets/music/shehnai-ceremonial.mp3']
let track = 0

let ctx: AudioContext | null = null
let master: GainNode | null = null
let audio: HTMLAudioElement | null = null
let mode: 'file' | 'synth' | null = null
let timer: number | undefined
let nextBeat = 0
let beat = 0
let playing = false
const listeners = new Set<(playing: boolean) => void>()

const emit = (value: boolean) => { playing = value; listeners.forEach(fn => fn(value)) }
export const subscribe = (fn: (playing: boolean) => void) => { listeners.add(fn); fn(playing); return () => { listeners.delete(fn) } }
export const isPlaying = () => playing

const SA = 146.83 // D3
const BHUPALI = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3] // S R G P D
const TANPURA = [3 / 4, 1, 1, 1 / 2] // Pa (mandra), Sa, Sa, Sa (mandra)

function pluck(freq: number, time: number, { gain, decay, type, cutoff }: { gain: number; decay: number; type: OscillatorType; cutoff: number }) {
  if (!ctx || !master) return
  const env = ctx.createGain()
  env.gain.setValueAtTime(0.0001, time)
  env.gain.exponentialRampToValueAtTime(gain, time + 0.015)
  env.gain.exponentialRampToValueAtTime(0.0001, time + decay)
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = cutoff
  filter.connect(env).connect(master)
  for (const detune of [-6, 6]) {
    const osc = ctx.createOscillator()
    osc.type = type
    osc.frequency.value = freq
    osc.detune.value = detune
    osc.connect(filter)
    osc.start(time)
    osc.stop(time + decay + 0.05)
  }
}

let melodyStep = 5
function schedule() {
  if (!ctx) return
  const spb = 0.42 // seconds per beat
  while (nextBeat < ctx.currentTime + 0.3) {
    if (beat % 2 === 0) pluck(SA * TANPURA[(beat / 2) % 4], nextBeat, { gain: 0.07, decay: 3.2, type: 'sawtooth', cutoff: 900 })
    // ponytail: random-walk melody, not a composed bandish; only heard when TRACKS fail to load
    if (beat % 16 < 12 && Math.random() < 0.62) {
      melodyStep = Math.max(0, Math.min(11, melodyStep + [-2, -1, -1, 1, 1, 2][Math.floor(Math.random() * 6)]))
      const freq = SA * 2 * BHUPALI[melodyStep % 5] * 2 ** Math.floor(melodyStep / 5)
      pluck(freq, nextBeat, { gain: 0.045, decay: 1.4, type: 'triangle', cutoff: 3200 })
    }
    nextBeat += spb
    beat++
  }
}

function startSynth() {
  if (!ctx || !master) return
  mode = 'synth'
  // simple echo for a hall-like tail
  const delay = ctx.createDelay()
  delay.delayTime.value = 0.32
  const feedback = ctx.createGain()
  feedback.gain.value = 0.32
  master.connect(delay).connect(feedback).connect(delay)
  delay.connect(ctx.destination)
  runScheduler()
}

function runScheduler() {
  window.clearInterval(timer)
  nextBeat = ctx!.currentTime + 0.1
  timer = window.setInterval(schedule, 100)
}

export async function play() {
  // AudioContext must be created inside the user gesture, before any await
  ctx ??= new AudioContext()
  if (!master) { master = ctx.createGain(); master.gain.value = 0.45; master.connect(ctx.destination) }
  void ctx.resume()
  if (mode === 'synth') { runScheduler(); emit(true); return }
  if (mode === 'file') { try { await audio!.play(); emit(true) } catch { emit(false) } return }
  audio = new Audio(TRACKS[track])
  audio.volume = 0.3
  audio.addEventListener('ended', () => { track = (track + 1) % TRACKS.length; audio!.src = TRACKS[track]; void audio!.play() })
  try { await audio.play(); mode = 'file' } catch { audio = null; startSynth() }
  emit(true)
}

export function pause() {
  if (mode === 'file') audio?.pause()
  else void ctx?.suspend()
  emit(false)
}

export const toggle = () => (playing ? pause() : play())

// keep the scheduler from piling up while the tab is hidden
document.addEventListener('visibilitychange', () => {
  if (mode !== 'synth' || !ctx) return
  if (document.hidden) { window.clearInterval(timer); void ctx.suspend() }
  else if (playing) void ctx.resume().then(runScheduler)
})
