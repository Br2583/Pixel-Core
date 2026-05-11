import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'

const LINKS = [
  { href: '/',          label: 'Home' },
  { href: '/services',  label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing',   label: 'Pricing' },
  { href: '/about',     label: 'About' },
  { href: '/contact',   label: 'Contact' },
]

interface NavbarProps {
  onOpenAuth: (tab?: 'signin' | 'register') => void
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const { pathname }                  = useLocation()
  const { user, logout, isAuthenticated } = useAuth()
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [progress, setProgress]       = useState(0)
  const [avatarOpen, setAvatarOpen]   = useState(false)
  const avatarRef                     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50)
      const doc   = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      setProgress(total > 0 ? (doc.scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Close avatar dropdown on outside click
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (!avatarRef.current?.contains(e.target as Node)) setAvatarOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  const initials = user ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : ''

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-foreground/10 shadow-sm'
          : 'bg-transparent',
      )}
    >
      {/* Scroll progress */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-xl tracking-tight text-foreground hover:text-primary transition-colors duration-200 hover:scale-105 inline-block"
        >
          Pixel<span className="text-primary">Core</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map(l => (
            <li key={l.href}>
              <Link
                to={l.href}
                className={cn(
                  'text-sm font-medium transition-colors nav-link-animated',
                  isActive(l.href) ? 'text-primary' : 'text-foreground/70 hover:text-foreground',
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2" ref={avatarRef}>
              {user.hasDiscount && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
                  15% OFF Active
                </span>
              )}
              <div className="relative">
                <button
                  onClick={() => setAvatarOpen(v => !v)}
                  className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center hover:bg-primary/90 transition-colors"
                  aria-label="Account menu"
                >
                  {initials}
                </button>
                {avatarOpen && (
                  <div className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-xl border border-border py-1.5 animate-fade-in z-10">
                    <div className="px-3 py-2 border-b border-border">
                      <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { logout(); setAvatarOpen(false) }}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('signin')}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Sign In
            </button>
          )}
          <Link
            to="/contact"
            className="inline-flex items-center px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 hover:scale-105 transition-all"
          >
            Quote Project
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span className={cn('block w-5 h-0.5 bg-foreground transition-transform duration-200', menuOpen && 'rotate-45 translate-y-2')} />
          <span className={cn('block w-5 h-0.5 bg-foreground transition-opacity duration-200', menuOpen && 'opacity-0')} />
          <span className={cn('block w-5 h-0.5 bg-foreground transition-transform duration-200', menuOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-border px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {LINKS.map(l => (
            <Link
              key={l.href}
              to={l.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isActive(l.href) ? 'text-primary' : 'text-foreground/70',
              )}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            {!isAuthenticated && (
              <button
                onClick={() => { onOpenAuth('signin'); setMenuOpen(false) }}
                className="flex-1 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Sign In
              </button>
            )}
            <Link
              to="/contact"
              className="flex-1 inline-flex items-center justify-center py-2 rounded-lg bg-primary text-white text-sm font-semibold"
            >
              Quote Project
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
