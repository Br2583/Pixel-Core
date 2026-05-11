import { useEffect, useRef } from 'react'

const ORBS = [
  { x: 10, y: 12, size: 560, depth: 0.04,  scrollFactor: -0.10, opacity: 0.13 },
  { x: 78, y: 8,  size: 400, depth: 0.07,  scrollFactor:  0.07, opacity: 0.11 },
  { x: 55, y: 62, size: 680, depth: 0.025, scrollFactor: -0.08, opacity: 0.10 },
  { x: 4,  y: 72, size: 320, depth: 0.09,  scrollFactor:  0.11, opacity: 0.09 },
  { x: 86, y: 46, size: 460, depth: 0.05,  scrollFactor: -0.06, opacity: 0.11 },
  { x: 40, y: 30, size: 260, depth: 0.08,  scrollFactor:  0.09, opacity: 0.08 },
]

export default function ParticleBg() {
  const orbRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let mx = 0, my = 0, sy = 0

    const apply = () => {
      orbRefs.current.forEach((orb, i) => {
        if (!orb) return
        const { depth, scrollFactor } = ORBS[i]
        orb.style.transform = `translate(${mx * depth}px, ${my * depth + sy * scrollFactor}px)`
      })
    }

    const onMouse = (e: MouseEvent) => {
      mx = e.clientX - window.innerWidth / 2
      my = e.clientY - window.innerHeight / 2
      apply()
    }

    const onScroll = () => { sy = window.scrollY; apply() }

    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: `${orb.x}%`, top: `${orb.y}%` }}
        >
          <div
            ref={el => { orbRefs.current[i] = el }}
            style={{
              width: orb.size,
              height: orb.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(220,38,38,${(orb.opacity * 2.2).toFixed(2)}) 0%, rgba(220,38,38,${orb.opacity.toFixed(2)}) 40%, transparent 70%)`,
              filter: 'blur(72px)',
              transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
        </div>
      ))}
    </div>
  )
}
