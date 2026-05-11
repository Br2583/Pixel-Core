import { Link } from 'react-router-dom'
import Reveal from '@/components/Reveal'

const SKILLS = ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Supabase', 'Figma', 'SEO', 'Framer Motion', 'Vercel']

const STATS = [
  { num: '50+', label: 'Projects Delivered' },
  { num: '3+',  label: 'Years of Experience' },
  { num: '98%', label: 'Satisfied Clients' },
  { num: '24h', label: 'Response Time' },
]

export default function AboutPage() {
  return (
    <main className="pt-24 pb-20 min-h-screen bg-background page-enter">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">About</span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Hi, I'm Brayan</h1>
          <p className="max-w-xl mx-auto text-muted-foreground">Web designer and developer passionate about building digital experiences that convert.</p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <Reveal className="flex justify-center">
            <div className="w-56 h-56 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <span className="text-primary font-bold text-6xl tracking-tight">BR</span>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="text-2xl font-bold text-foreground mb-4">The story behind Pixel Core</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Pixel Core was born from the belief that every business — regardless of size — deserves an enterprise-level digital presence.</p>
              <p>With over 50 projects delivered and clients across multiple countries, I've refined a process that blends visually stunning design with clean, efficient code.</p>
              <p>Every project I take on is treated as if it were my own — with the same dedication, attention to detail, and commitment to results.</p>
            </div>
            <div className="mt-8 flex gap-4">
              <Link to="/contact" className="px-6 py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 hover:scale-105 transition-all">
                Work Together →
              </Link>
              <Link to="/portfolio" className="px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-secondary hover:scale-105 transition-all">
                View Projects
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Skills */}
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Technologies I work with</h2>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-3 mb-24">
          {SKILLS.map((s, i) => (
            <Reveal key={s} delay={i * 50}>
              <span className="px-5 py-2.5 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:border-primary hover:text-primary hover:scale-105 transition-all cursor-default">
                {s}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all">
                <p className="text-3xl font-bold text-primary mb-1">{s.num}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  )
}
