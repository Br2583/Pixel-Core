import Reveal from '@/components/Reveal'

const REVIEWS = [
  { name: 'María González', role: 'CEO · Volcán Studio',      text: 'Brayan entregó nuestro e-commerce antes del plazo. Las animaciones superaron todas nuestras expectativas.', stars: 5 },
  { name: 'Carlos Rojas',   role: 'Founder · Andes Capital',  text: 'Profesionalismo total. El nuevo sitio convierte 3x más que el anterior. La inversión se pagó sola.', stars: 5 },
  { name: 'Ana Martínez',   role: 'Marketing · Roca Fitness', text: 'La app web es hermosa y funciona perfectamente en todos los dispositivos. Nuestros usuarios la adoran.', stars: 5 },
  { name: 'Luis Pérez',     role: 'Owner · Ember Café',       text: 'Comunicación excelente durante todo el proceso. Entregó antes del plazo acordado. Muy recomendado.', stars: 5 },
  { name: 'Sofia Torres',   role: 'Director · Lava Digital',  text: 'Aumentamos conversiones un 200% con el rediseño. Un talento verdaderamente excepcional.', stars: 5 },
  { name: 'Diego Vargas',   role: 'CMO · Pumice Media',       text: 'Diseño impecable y código limpio. Ya es nuestro desarrollador de cabecera para todos los proyectos.', stars: 5 },
]

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ReviewCard({ name, role, text, stars }: { name: string; role: string; text: string; stars: number }) {
  return (
    <div className="flex-shrink-0 w-[280px] p-5 rounded-xl border border-border bg-card shadow-sm select-none">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: stars }).map((_, i) => <StarIcon key={i} />)}
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed mb-4">"{text}"</p>
      <p className="text-sm font-semibold text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
    </div>
  )
}

export default function TestimonialsMarquee() {
  const doubled = [...REVIEWS, ...REVIEWS]

  return (
    <section className="py-16 overflow-hidden bg-secondary/20">
      <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
        <Reveal>
          <span className="inline-block mb-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
            Clientes
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
            Lo que dicen nuestros clientes
          </h2>
        </Reveal>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/20 to-transparent z-10 pointer-events-none" />
        <div
          className="flex gap-5 animate-marquee marquee-track"
          style={{ width: 'max-content', paddingBlock: '6px' }}
        >
          {doubled.map((r, i) => (
            <ReviewCard key={i} {...r} />
          ))}
        </div>
      </div>
    </section>
  )
}
