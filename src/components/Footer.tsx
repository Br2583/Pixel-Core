import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '@/components/Toast'

const SERVICES_LINKS = [
  { label: 'Landing Pages',    href: '/services' },
  { label: 'Full Web Sites',   href: '/services' },
  { label: 'E-commerce',       href: '/services' },
  { label: 'Web Apps',         href: '/services' },
  { label: 'Redesign',         href: '/services' },
  { label: 'SEO & Performance',href: '/services' },
]

const QUICK_LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing',   href: '/pricing' },
  { label: 'About',     href: '/about' },
  { label: 'Contact',   href: '/contact' },
]

const SOCIALS = [
  {
    label: 'Instagram',
    href:  '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'Behance',
    href:  '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H-0.001v-6.5h6.33c1.935 0 2.758.7 2.758 2.103 0 1.404-.823 1.903-1.45 2.053.73.15 1.826.65 1.826 2.163 0 1.62-.932 2.181-3.017 2.181zm-3.674-3.969v2.046H3.26c.714 0 1.205-.213 1.205-.991 0-.794-.49-1.055-1.2-1.055zm0-2.988v1.92h2.688c.693 0 1.056-.282 1.056-.96 0-.731-.417-.96-1.056-.96H2.792z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    showToast('Thanks! We\'ll be in touch soon.', 'success')
    setEmail('')
  }

  return (
    <footer className="bg-[#1A1A1A] text-white relative overflow-hidden">
      {/* Gradient top border */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #DC2626 40%, #DC2626 60%, transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Brand */}
          <div className="md:col-span-1">
            <p className="text-2xl font-bold tracking-tight mb-3">
              PIXEL<span className="text-primary">CORE</span>
            </p>
            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-[200px]">
              Premium web design & development that converts visitors into clients.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Services</p>
            <ul className="space-y-3">
              {SERVICES_LINKS.map(l => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="group text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="inline-block transition-transform group-hover:translate-x-1 duration-200">→</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Quick Links */}
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Quick Links</p>
            <ul className="space-y-3">
              {QUICK_LINKS.map(l => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="group text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="inline-block transition-transform group-hover:translate-x-1 duration-200">→</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Start a Project mini CTA */}
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Start a Project</p>
            <p className="text-sm text-white/50 mb-4 leading-relaxed">
              Have a project in mind? Drop your email and we'll get back to you within 24 hours.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2.5 rounded-lg bg-white/10 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition min-w-0"
              />
              <button
                type="submit"
                className="px-3 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors flex-shrink-0"
                aria-label="Submit"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Pixel Core · Brayan Romero. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Made with ✦ in Los Angeles
          </p>
        </div>
      </div>
    </footer>
  )
}
