import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import Reveal from '@/components/Reveal'

const PROJECTS = [
  {
    title: 'Volcán Studio',
    cat: 'E-commerce',
    monogram: 'VS',
    desc: 'Artisan craft store with integrated Stripe payment gateway, inventory dashboard, and automatic order confirmation emails.',
    tech: ['React', 'Stripe', 'Supabase'],
    featured: true,
    color: 'from-primary/20 to-primary/5',
  },
  {
    title: 'Andes Capital',
    cat: 'Landing Page',
    monogram: 'AC',
    desc: 'Investment firm landing page with premium scroll animations and high-performance lead capture form.',
    tech: ['HTML/CSS', 'GSAP', 'EmailJS'],
  },
  {
    title: 'Roca Fitness',
    cat: 'Web App',
    monogram: 'RF',
    desc: 'Workout and nutrition tracking application with interactive dashboard, progress graphs, and routine builder.',
    tech: ['React', 'TypeScript', 'Supabase'],
  },
  {
    title: 'Ember Café',
    cat: 'Full Web Site',
    monogram: 'EC',
    desc: 'Complete digital presence for a café chain — online menu, reservations, and blog integrated with a headless CMS.',
    tech: ['Next.js', 'Tailwind', 'Contentful'],
  },
  {
    title: 'Lava Digital',
    cat: 'Redesign',
    monogram: 'LD',
    desc: 'Full redesign that increased conversions by 200% and reduced load time by 60%. Complete UI/UX overhaul.',
    tech: ['React', 'Vite', 'SEO'],
  },
  {
    title: 'Pumice Media',
    cat: 'Full Web Site',
    monogram: 'PM',
    desc: 'Digital identity and site for a content agency — portfolio showcase, blog, and client intake system.',
    tech: ['Next.js', 'MDX', 'Vercel'],
  },
]

const CATS = ['All', 'Landing Page', 'Full Web Site', 'E-commerce', 'Web App', 'Redesign']

// 3D tilt card hook
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [shine, setShine] = useState({ x: 50, y: 50, on: false })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current
    if (!el) return
    const r  = el.getBoundingClientRect()
    const x  = e.clientX - r.left
    const y  = e.clientY - r.top
    el.style.transition = ''
    el.style.transform  = `perspective(1000px) rotateX(${-((y - r.height / 2) / r.height) * 7}deg) rotateY(${((x - r.width / 2) / r.width) * 7}deg)`
    setShine({ x: (x / r.width) * 100, y: (y / r.height) * 100, on: true })
  }

  function onMouseLeave() {
    const el = cardRef.current
    if (!el) return
    el.style.transition = 'transform 0.5s ease'
    el.style.transform  = ''
    setShine(s => ({ ...s, on: false }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn('relative overflow-hidden', className)}
      style={{ willChange: 'transform' }}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-lg transition-opacity duration-200"
        style={{
          opacity:    shine.on ? 0.1 : 0,
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, white, transparent 60%)`,
        }}
      />
      {children}
    </div>
  )
}

export default function PortfolioPage() {
  const [active, setActive] = useState('All')

  const featured = PROJECTS.find(p => p.featured)
  const rest      = PROJECTS.filter(p => !p.featured)
  const filtered  = active === 'All' ? rest : rest.filter(p => p.cat === active)

  return (
    <main className="pt-24 pb-20 min-h-screen bg-background page-enter">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Projects that convert
          </h1>
          <p className="max-w-xl mx-auto text-muted-foreground">
            Every project is a success story. Here are some of the most recent ones.
          </p>
        </Reveal>

        {/* Featured Project */}
        {featured && (
          <Reveal className="mb-12">
            <TiltCard className="w-full rounded-xl border border-primary/20 bg-card overflow-hidden">
              {/* Coral gradient banner */}
              <div
                className={cn(
                  'w-full h-48 flex items-center justify-center bg-gradient-to-br',
                  featured.color ?? 'from-primary/20 to-primary/5',
                )}
              >
                <span className="text-7xl font-black text-primary/30 tracking-tighter select-none">
                  {featured.monogram}
                </span>
              </div>
              <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                    {featured.cat} · Featured Project
                  </span>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{featured.title}</h2>
                  <p className="text-sm text-muted-foreground max-w-lg mb-4">{featured.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {featured.tech.map(t => (
                      <span key={t} className="px-2.5 py-0.5 rounded text-xs border border-border text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 hover:scale-105 transition-all"
                >
                  View Case Study →
                </Link>
              </div>
            </TiltCard>
          </Reveal>
        )}

        {/* Filter tabs */}
        <Reveal className="flex flex-wrap justify-center gap-3 mb-12">
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                active === c
                  ? 'bg-primary text-white scale-105'
                  : 'border border-border text-muted-foreground hover:border-primary hover:text-primary',
              )}
            >
              {c}
            </button>
          ))}
        </Reveal>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={i * 70} from={i % 2 === 0 ? 'left' : 'right'}>
              <TiltCard className="h-full rounded-lg border border-border bg-card hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="p-6 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-lg tracking-tight">{p.monogram}</span>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                    {p.cat}
                  </span>
                  <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-xs border border-border text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-14">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 hover:scale-105 transition-all"
          >
            Ready to be next? →
          </Link>
        </Reveal>
      </div>
    </main>
  )
}
