import { useState } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '@/components/HeroSection'
import ServiceCard from '@/components/ServiceCard'
import PricingCard from '@/components/PricingCard'
import QuoteModal from '@/components/QuoteModal'
import Reveal from '@/components/Reveal'
import TestimonialsMarquee from '@/components/TestimonialsMarquee'
import Marquee from '@/components/Marquee'

const SERVICES = [
  { icon: 'landing',   title: 'Landing Pages',       description: 'High-converting landing pages designed to turn visitors into leads. Every element crafted with intent.',        features: ['Custom design', 'SEO optimized', 'Contact form', 'CSS animations'],       number: 1 },
  { icon: 'web',       title: 'Full Web Sites',       description: 'Professional digital presence with all the sections your business needs to stand out online.',                features: ['Up to 12 pages', 'CMS integration', 'Responsive design', 'Analytics'],    number: 2 },
  { icon: 'ecommerce', title: 'E-commerce',           description: 'Online stores with seamless shopping experiences. Payment integration, inventory, and shipping flows.',       features: ['Product catalog', 'Payment gateway', 'Admin panel', 'Order management'], number: 3 },
  { icon: 'app',       title: 'Web Apps',             description: 'Interactive web applications with React, databases and custom business logic built from the ground up.',      features: ['React / TypeScript', 'REST API', 'Authentication', 'Data dashboard'],    number: 4 },
  { icon: 'redesign',  title: 'Redesigns',            description: 'Modernize your current site. Better performance, fresh design, and measurable conversion improvements.',     features: ['Full audit', 'Content migration', 'Speed optimization', 'New UI/UX'],     number: 5 },
  { icon: 'seo',       title: 'SEO & Performance',    description: 'Rank higher on Google and improve load speed for more organic traffic and better user experience.',          features: ['SEO audit', 'Core Web Vitals', 'Schema markup', 'Monthly report'],        number: 6 },
]

const PLANS = [
  {
    name: 'Starter',    price: 699,   plan: 'starter',
    description: 'Perfect for entrepreneurs & local businesses',
    features: ['1-page landing site', 'Mobile responsive', 'Contact form', 'Basic SEO', '1 revision round', 'Delivered in 7 days'],
    cta: 'Get Started',
  },
  {
    name: 'Growth',     price: 1499,  plan: 'growth',
    description: 'For businesses ready to scale online',
    features: ['Up to 6 pages', 'Custom UI/UX design', 'SEO optimized', 'Micro-animations', '3 revision rounds', 'Delivered in 14 days'],
    cta: 'Get Started', featured: true,
  },
  {
    name: 'Professional', price: 2999, plan: 'professional',
    description: 'For brands that demand premium impact',
    features: ['Up to 12 pages', '3D animations', 'Blog / CMS', 'Advanced SEO', '5 revision rounds', 'Delivered in 21 days'],
    cta: 'Get Started',
  },
]

const PORTFOLIO = [
  { title: 'Volcán Studio',  cat: 'E-commerce',     monogram: 'VS', desc: 'Artisan craft store with integrated payment gateway.' },
  { title: 'Andes Capital',  cat: 'Landing Page',   monogram: 'AC', desc: 'Investment landing with premium animations.' },
  { title: 'Roca Fitness',   cat: 'Web App',        monogram: 'RF', desc: 'Workout and nutrition tracking app.' },
  { title: 'Ember Café',     cat: 'Full Web Site',  monogram: 'EC', desc: 'Complete digital presence for café chain.' },
  { title: 'Lava Digital',   cat: 'Redesign',       monogram: 'LD', desc: '200% conversion lift via complete redesign.' },
  { title: 'Pumice Media',   cat: 'Branding Web',   monogram: 'PM', desc: 'Brand identity & site for content agency.' },
]

interface HomePageProps {
  onOpenAuth?: (tab?: 'signin' | 'register') => void
}

export default function HomePage({ onOpenAuth }: HomePageProps) {
  const [quoteOpen, setQuoteOpen] = useState(false)

  return (
    <>
      <HeroSection />

      {/* Text marquee ticker */}
      <Marquee />

      {/* Services */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
              Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything your brand needs
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground">
              From landing page to full web application. Every project crafted with attention to detail.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} from={i % 2 === 0 ? 'left' : 'right'}>
                <ServiceCard {...s} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Recent projects</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} from={i % 3 === 0 ? 'left' : i % 3 === 2 ? 'right' : 'bottom'}>
                <div className="group p-6 rounded-lg border border-border bg-card hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-bold text-lg tracking-tight">{p.monogram}</span>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">{p.cat}</span>
                  <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors text-sm"
            >
              View all projects →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsMarquee />

      {/* Pricing preview */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
              Pricing
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Transparent pricing, no surprises
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground">
              Quality guaranteed. Create a free account to unlock 15% off.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 100} from={i === 0 ? 'left' : i === 2 ? 'right' : 'bottom'}>
                <PricingCard
                  {...p}
                  onOpenAuth={onOpenAuth ? () => onOpenAuth('register') : undefined}
                />
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-10">
            <Link to="/pricing" className="text-sm text-primary font-medium hover:underline">
              See all plans & FAQs →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to start?</h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Tell me about your project and you'll have a proposal in your inbox within 24 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setQuoteOpen(true)}
                className="px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/20"
              >
                Request a Quote →
              </button>
              <Link
                to="/portfolio"
                className="px-8 py-4 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary hover:scale-105 transition-all"
              >
                View Portfolio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}
