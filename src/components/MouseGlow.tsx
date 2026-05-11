import { useEffect, useRef } from 'react'

function GlowInner() {
  const glowRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: 0, y: 0 })
  const target  = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    let rafId: number
    function loop() {
      pos.current.x += (target.current.x - pos.current.x) * 0.08
      pos.current.y += (target.current.y - pos.current.y) * 0.08
      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${pos.current.x - 250}px, ${pos.current.y - 250}px)`
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[500px] h-[500px] pointer-events-none z-[9998]"
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  )
}

export default function MouseGlow() {
  const isTouch =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  if (isTouch) return null
  return <GlowInner />
}
