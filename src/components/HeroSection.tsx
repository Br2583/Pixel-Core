import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import HeroSlideshow from './HeroSlideshow'

// ── phrases for typewriter ─────────────────────────────────────────────────
const PHRASES = [
  { before: 'We craft',  keyword: 'digital',  after: 'experiences.' },
  { before: 'We build',  keyword: 'modern',   after: 'websites.'    },
  { before: 'We design', keyword: 'your',     after: 'vision.'      },
  { before: 'We code',   keyword: 'your',     after: 'future.'      },
]

function TypewriterHeadline() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx,   setCharIdx]   = useState(0)
  const [phase, setPhase]         = useState<'typing' | 'pause' | 'deleting'>('typing')

  const phrase   = PHRASES[phraseIdx]
  const fullText = `${phrase.before} ${phrase.keyword} ${phrase.after}`
  const b1End    = phrase.before.length
  const kwStart  = b1End + 1
  const kwEnd    = kwStart + phrase.keyword.length

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>
    if (phase === 'typing') {
      if (charIdx < fullText.length) {
        id = setTimeout(() => setCharIdx(n => n + 1), 45)
      } else {
        id = setTimeout(() => setPhase('pause'), 2000)
      }
    } else if (phase === 'pause') {
      id = setTimeout(() => setPhase('deleting'), 0)
    } else {
      if (charIdx > 0) {
        id = setTimeout(() => setCharIdx(n => n - 1), 22)
      } else {
        setPhraseIdx(i => (i + 1) % PHRASES.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(id)
  }, [charIdx, phase, fullText.length])

  // Visible text split into before / keyword / after portions
  const beforeText = fullText.slice(0, Math.min(charIdx, b1End))
  const kwText     = charIdx > kwStart ? fullText.slice(kwStart, Math.min(charIdx, kwEnd)) : ''
  const afterText  = charIdx > kwEnd + 1 ? fullText.slice(kwEnd + 1, charIdx) : ''

  const cursorEl = <span className="animate-blink text-primary">|</span>

  return (
    <h1
      className="font-black leading-[1.05] tracking-tight mb-8"
      style={{ fontSize: 'clamp(3.2rem, 8.5vw, 7.5rem)' }}
    >
      <span className="block text-white">
        {beforeText}
        {charIdx <= b1End && cursorEl}
      </span>
      <span className="block text-primary">
        {kwText}
        {charIdx > b1End && charIdx <= kwEnd && cursorEl}
      </span>
      <span className="block text-white">
        {afterText}
        {charIdx > kwEnd && cursorEl}
      </span>
    </h1>
  )
}

// ── animated counter ───────────────────────────────────────────────────────
function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const spanRef       = useRef<HTMLSpanElement>(null)
  const started       = useRef(false)

  useEffect(() => {
    const el = spanRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true
      obs.unobserve(el)
      const dur = 2000
      const t0  = performance.now()
      function step(now: number) {
        const p     = Math.min((now - t0) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(eased * end))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end])

  return <span ref={spanRef}>{val}{suffix}</span>
}

// ── main component ─────────────────────────────────────────────────────────
export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const cx = window.innerWidth  / 2
    const cy = window.innerHeight / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    if (contentRef.current) {
      contentRef.current.style.transform = `translate(${dx * 0.04}px, ${dy * 0.04}px)`
    }
    if (bgRef.current) {
      bgRef.current.style.transform = `translate(${dx * -0.02}px, ${dy * -0.02}px)`
    }
  }, [])

  const onMouseLeave = useCallback(() => {
    if (contentRef.current) contentRef.current.style.transform = ''
    if (bgRef.current)      bgRef.current.style.transform      = ''
  }, [])

  function onBtnMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx   = (e.clientX - (rect.left + rect.width  / 2)) * 0.35
    const dy   = (e.clientY - (rect.top  + rect.height / 2)) * 0.35
    setBtnOffset({
      x: Math.max(-12, Math.min(12, dx)),
      y: Math.max(-12, Math.min(12, dy)),
    })
  }
  function onBtnLeave() { setBtnOffset({ x: 0, y: 0 }) }

  const btnMoved = btnOffset.x !== 0 || btnOffset.y !== 0

  return (
    <section
      className="relative min-h-screen flex flex-col justify-start overflow-hidden bg-black pt-16"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Fullscreen photo slideshow */}
      <HeroSlideshow />

      {/* Subtle grid overlay */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ transition: 'transform 0.4s ease-out' }}
      >
        <div
          className="absolute inset-0 animate-grid-scroll"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating rotating badge */}
      <div className="absolute top-28 right-8 hidden lg:flex items-center justify-center pointer-events-none z-10">
        <span
          className="border border-white/30 text-white/80 rounded-full px-4 py-1.5 text-[10px] tracking-widest font-medium uppercase"
          style={{ animation: 'spin 12s linear infinite' }}
        >
          Available for new projects ✦
        </span>
      </div>

      {/* Text content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-8 w-full"
        style={{ transition: 'transform 0.15s ease-out' }}
      >
        <TypewriterHeadline />

        <p
          className="max-w-lg text-lg text-white/70 mb-10 leading-relaxed word-in"
          style={{ animationDelay: '600ms' }}
        >
          We convert visitors into clients with premium web design and development.
          Every pixel, every interaction — crafted with intention.
        </p>

        <div
          className="flex flex-wrap gap-4 word-in"
          style={{ animationDelay: '720ms' }}
        >
          <Link
            to="/contact"
            onMouseMove={onBtnMove}
            onMouseLeave={onBtnLeave}
            style={{
              transform:  `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
              transition: btnMoved ? 'none' : 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 shadow-lg shadow-primary/25"
          >
            Start Your Project →
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10 hover:scale-105 transition-all"
          >
            View Our Work
          </Link>
        </div>

        {/* Stats with count-up */}
        <div
          className="mt-14 flex flex-wrap gap-12 word-in"
          style={{ animationDelay: '840ms' }}
        >
          {[
            { end: 50, suffix: '+', label: 'Projects Delivered' },
            { end: 98, suffix: '%', label: 'Client Satisfaction' },
            { end: 3,  suffix: '×', label: 'More Conversions'   },
          ].map(s => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-primary">
                <CountUp end={s.end} suffix={s.suffix} />
              </p>
              <p className="text-sm text-white/60 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
