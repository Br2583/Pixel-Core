import { useState } from 'react'
import PricingCard from '@/components/PricingCard'
import Reveal from '@/components/Reveal'
import ParticleBg from '@/components/ParticleBg'
import TestimonialsMarquee from '@/components/TestimonialsMarquee'
import { useAuth } from '@/context/AuthContext'

const PLANS = [
  {
    name: 'Starter',
    price: 699,
    plan: 'starter',
    description: 'Perfect for entrepreneurs & local businesses',
    features: [
      '1-page landing site',
      'Mobile responsive design',
      'Contact form integrated',
      'Social media links',
      'Basic SEO setup',
      '1 revision round',
      'Delivered in 7 days',
    ],
    excluded: ['Blog / CMS', 'Custom animations', 'E-commerce'],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: 1499,
    plan: 'growth',
    description: 'For businesses ready to scale online',
    features: [
      'Up to 6 pages',
      'Custom UI/UX design',
      'Email forms + delivery',
      'On-page SEO optimized',
      'Micro-animations & hover',
      'Google Analytics setup',
      '3 revision rounds',
      'Delivered in 14 days',
      'Speed optimization',
    ],
    excluded: ['E-commerce / store'],
    cta: 'Get Started',
    featured: true,
  },
  {
    name: 'Professional',
    price: 2999,
    plan: 'professional',
    description: 'For brands that demand premium impact',
    features: [
      'Up to 12 pages',
      'Spline 3D animations',
      'Blog / CMS integrated',
      'Advanced SEO + sitemap',
      'Custom chatbot',
      'Google Search Console',
      'EmailJS + Formspree',
      '5 revision rounds',
      'Delivered in 21 days',
      'Performance audit',
    ],
    excluded: [],
    cta: 'Get Started',
  },
  {
    name: 'Enterprise',
    price: 5500,
    plan: 'enterprise',
    description: 'Full-scale solution for growing companies',
    features: [
      'Everything in Professional',
      'Full e-commerce (cart, checkout, payments)',
      'Admin dashboard',
      'API integrations',
      'AI-powered lead chatbot',
      '3-month post-launch support',
      'Unlimited revisions',
      'Delivered in 30–45 days',
      'Custom domain + hosting setup',
    ],
    excluded: [],
    cta: 'Book a Call',
  },
]

const FAQS = [
  { q: 'How long does a project take?',              a: 'Depends on scope. A landing page: 5–7 days. A full site: 2–4 weeks. An e-commerce or web app: 4–8 weeks.' },
  { q: 'What does post-launch support include?',     a: 'Bug fixes, minor updates and email support during the period specified in each plan.' },
  { q: 'Can I request changes during development?',  a: 'Yes, within the revision rounds in your plan. Additional changes are billed hourly.' },
  { q: 'What technologies do you use?',              a: 'React, TypeScript, Next.js, Tailwind CSS, Node.js, Supabase, and Vercel/Netlify for deployment.' },
  { q: 'How does payment work?',                     a: '50% upfront, 50% before final delivery. I accept bank transfer and PayPal.' },
  { q: 'Do you offer monthly maintenance?',          a: 'Yes, from $99/mo — includes updates, security patches and priority support.' },
]

interface PricingPageProps {
  onOpenAuth?: (tab?: 'signin' | 'register') => void
}

function cn(...cls: (string | boolean | undefined)[]) { return cls.filter(Boolean).join(' ') }

export default function PricingPage({ onOpenAuth }: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { user } = useAuth()

  return (
    <main className="relative pt-24 pb-20 min-h-screen bg-background overflow-hidden page-enter">
      <ParticleBg />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-10">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
              Pricing
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Transparent pricing, no surprises
            </h1>
            <p className="max-w-xl mx-auto text-muted-foreground">
              Every plan includes a full design process, clean code, and dedicated support.
              If your project doesn't fit a plan, we'll create a custom proposal.
            </p>
          </Reveal>

          {/* Discount banner */}
          {user?.hasDiscount && (
            <Reveal className="mb-8">
              <div className="max-w-2xl mx-auto flex items-center gap-3 px-5 py-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium">
                <span className="text-lg">🎉</span>
                <span>Your 15% member discount is applied to all plans below!</span>
              </div>
            </Reveal>
          )}

          {/* Pricing cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start mb-20 overflow-visible pt-6">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 90} from={i % 2 === 0 ? 'left' : 'right'}>
                <PricingCard
                  {...p}
                  onOpenAuth={onOpenAuth ? () => onOpenAuth('register') : undefined}
                />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <TestimonialsMarquee />

        {/* FAQs */}
        <div className="max-w-6xl mx-auto px-6 pt-16">
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground text-center mb-10">
                Frequently asked questions
              </h2>
              <div className="space-y-3">
                {FAQS.map((f, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <div className="border border-border rounded-lg overflow-hidden bg-card/80">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-foreground hover:bg-secondary/50 transition-colors"
                      >
                        {f.q}
                        <span className={cn('text-primary text-lg ml-4 flex-shrink-0 transition-transform duration-200', openFaq === i && 'rotate-45')}>
                          +
                        </span>
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed animate-fade-in">
                          {f.a}
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  )
}
