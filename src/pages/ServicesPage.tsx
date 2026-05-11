import ServiceCard from '@/components/ServiceCard'
import Reveal from '@/components/Reveal'
import { Link } from 'react-router-dom'

const SERVICES = [
  {
    icon: 'landing',
    title: 'Landing Pages',
    description: 'High-converting landing pages designed to turn visitors into leads. Every element crafted with intent and optimized for action.',
    features: ['Custom design', 'SEO optimized', 'Contact form', 'CSS animations'],
    number: 1,
  },
  {
    icon: 'web',
    title: 'Full Web Sites',
    description: 'Professional digital presence with all the sections your business needs to stand out and convert online.',
    features: ['Up to 12 pages', 'CMS integration', 'Responsive design', 'Analytics setup'],
    number: 2,
  },
  {
    icon: 'ecommerce',
    title: 'E-commerce',
    description: 'Online stores with seamless shopping experiences. Payment integration, inventory management, and shipping flows.',
    features: ['Product catalog', 'Payment gateway', 'Admin panel', 'Order management'],
    number: 3,
  },
  {
    icon: 'app',
    title: 'Web Apps',
    description: 'Interactive web applications with React, databases and custom business logic built from the ground up to scale.',
    features: ['React / TypeScript', 'REST API', 'Authentication', 'Data dashboard'],
    number: 4,
  },
  {
    icon: 'redesign',
    title: 'Redesigns',
    description: 'Modernize your current site. Better performance, fresh design, and measurable improvements in conversion rates.',
    features: ['Full audit', 'Content migration', 'Speed optimization', 'New UI/UX'],
    number: 5,
  },
  {
    icon: 'seo',
    title: 'SEO & Performance',
    description: 'Rank higher on Google and improve load speed for more organic traffic and a better user experience.',
    features: ['SEO audit', 'Core Web Vitals', 'Schema markup', 'Monthly report'],
    number: 6,
  },
]

export default function ServicesPage() {
  return (
    <main className="pt-24 pb-20 min-h-screen bg-background page-enter">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
            Services
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything your brand needs
          </h1>
          <p className="max-w-xl mx-auto text-muted-foreground">
            From a landing page to a full web application — every project delivered with
            pixel-perfect attention to detail.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 80} from={i % 2 === 0 ? 'left' : 'right'}>
              <ServiceCard {...s} className="h-full" />
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center">
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Not sure which service fits your project? Let's talk it through.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 hover:scale-105 transition-all"
          >
            Request a Quote →
          </Link>
        </Reveal>
      </div>
    </main>
  )
}
