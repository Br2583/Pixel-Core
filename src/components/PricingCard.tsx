import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'

interface PricingCardProps {
  name: string
  price: number
  period?: string
  description: string
  features: string[]
  excluded?: string[]
  cta: string
  featured?: boolean
  plan: string
  onOpenAuth?: () => void
}

function applyDiscount(price: number): number {
  return Math.round(price * 0.85)
}

function fmt(n: number): string {
  return '$' + n.toLocaleString('en-US')
}

export default function PricingCard({
  name, price, period = '/project', description, features, excluded = [],
  cta, featured, plan, onOpenAuth,
}: PricingCardProps) {
  const { user } = useAuth()
  const hasDiscount = !!user?.hasDiscount
  const cardRef = useRef<HTMLDivElement>(null)
  const [shine, setShine] = useState({ x: 50, y: 50, visible: false })

  const href = `/contact?plan=${encodeURIComponent(plan)}`

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top
    const cx   = rect.width  / 2
    const cy   = rect.height / 2
    const rotY = ((x - cx) / cx) * 8
    const rotX = -((y - cy) / cy) * 8
    card.style.transition = ''
    card.style.transform  = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
    setShine({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, visible: true })
  }

  function onMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 0.5s ease'
    card.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    setShine(s => ({ ...s, visible: false }))
  }

  const isCustom = name === 'Enterprise'

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        'group relative flex flex-col rounded-xl border transition-all duration-300',
        featured
          ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/15 scale-[1.02]'
          : 'border-border bg-card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1',
      )}
      style={{ padding: '2rem', willChange: 'transform' }}
    >
      {/* Shine overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-200"
        style={{
          opacity:    shine.visible ? 0.12 : 0,
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, white, transparent 60%)`,
        }}
      />

      {featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/30">
          Most Popular
        </span>
      )}

      {/* Price block */}
      <div className="relative mb-6">
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{name}</p>

        {hasDiscount && !isCustom ? (
          <div className="mb-2">
            <span className="text-muted-foreground line-through text-lg mr-2">{fmt(price)}</span>
            <span className="text-4xl font-black text-foreground">{fmt(applyDiscount(price))}</span>
            <span className="text-muted-foreground text-sm ml-1">{period}</span>
          </div>
        ) : (
          <div className="mb-2">
            <span className="text-4xl font-black text-foreground">
              {isCustom ? 'Custom' : fmt(price)}
            </span>
            {!isCustom && <span className="text-muted-foreground text-sm ml-1">{period}</span>}
          </div>
        )}

        {!hasDiscount && !isCustom && (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors group/lock"
            title="Sign up free to unlock 15% off"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path strokeLinecap="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="group-hover/lock:underline">Sign up to unlock 15% off</span>
          </button>
        )}

        <p className="text-sm text-muted-foreground mt-3">{description}</p>
      </div>

      {/* Features */}
      <ul className="relative space-y-2.5 flex-1 mb-8">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
            <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {f}
          </li>
        ))}
        {excluded.map(f => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground/50">
            <svg className="w-4 h-4 text-muted-foreground/40 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <Link
        to={href}
        className={cn(
          'relative block text-center py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95',
          featured
            ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30'
            : 'border border-primary text-primary hover:bg-primary hover:text-white',
        )}
      >
        {cta}
      </Link>
    </div>
  )
}
