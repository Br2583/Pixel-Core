import { useRef, useState, type ReactElement } from 'react'
import { cn } from '@/lib/utils'

const ICONS: Record<string, ReactElement> = {
  landing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="3" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  ),
  ecommerce: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  app: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  redesign: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
}

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  features: string[]
  className?: string
  number?: number
}

export default function ServiceCard({ icon, title, description, features, className, number }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [shine, setShine] = useState({ x: 50, y: 50, visible: false })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top
    const cx   = rect.width  / 2
    const cy   = rect.height / 2
    card.style.transition = ''
    card.style.transform  = `perspective(1000px) rotateX(${-((y - cy) / cy) * 6}deg) rotateY(${((x - cx) / cx) * 6}deg)`
    setShine({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, visible: true })
  }

  function onMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 0.5s ease'
    card.style.transform  = ''
    setShine(s => ({ ...s, visible: false }))
  }

  const numStr = number !== undefined ? String(number).padStart(2, '0') : undefined

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        'group relative p-7 rounded-lg border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300 overflow-hidden',
        className,
      )}
      style={{ willChange: 'transform' }}
    >
      {/* Shine */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg transition-opacity duration-200"
        style={{
          opacity:    shine.visible ? 0.1 : 0,
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, white, transparent 60%)`,
        }}
      />

      {/* Background number */}
      {numStr && (
        <span className="absolute -right-2 -top-4 text-8xl font-black text-foreground/[0.06] select-none pointer-events-none leading-none">
          {numStr}
        </span>
      )}

      <div className="relative">
        <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
          {ICONS[icon] ?? <span className="text-lg font-bold">{icon}</span>}
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{description}</p>
        <ul className="space-y-2">
          {features.map(f => (
            <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
