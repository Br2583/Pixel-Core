# Pixel Core — Upgrade Progress

## COMPLETED ✓

| File | What changed |
|---|---|
| `tailwind.config.js` | New animations: `text-scroll`, `grid-scroll`, `spin-slow`, `page-enter`, `marquee-fast` |
| `src/index.css` | `reveal-left/right`, `.marquee-track:hover`, `.word-in`, `.nav-link-animated`, `cursor:none` on body |
| `src/context/AuthContext.tsx` | NEW — localStorage auth (login, register, logout), `useAuth()` hook |
| `src/components/Toast.tsx` | NEW — ToastProvider + `useToast()`, auto-dismiss with progress bar |
| `src/components/MouseGlow.tsx` | NEW — radial glow follows cursor (lerp+rAF), custom dot cursor, disabled on touch |
| `src/components/AuthModal.tsx` | NEW — Sign In / Create Account modal with sliding tab indicator |
| `src/components/ScrollPopup.tsx` | NEW — 15% off popup at 85% scroll depth (once per session via sessionStorage) |
| `src/components/Marquee.tsx` | NEW — "WEB DESIGN ✦ DEVELOPMENT ✦…" ticker scrolling left |
| `src/App.tsx` | All providers wired; English routes + legacy Spanish route aliases |
| `src/components/Navbar.tsx` | English labels, animated underline, auth avatar + 15% badge + logout dropdown |
| `src/components/HeroSection.tsx` | EN text, SplitWords stagger, CountUp stats, magnetic CTA, mouse parallax, grid bg, rotating badge |
| `src/components/Footer.tsx` | Dark #1A1A1A bg, 4-column grid (Brand+socials, Services, Quick Links, mini CTA) |
| `src/components/PricingCard.tsx` | 3D tilt + shine, discount price logic, lock icon for non-auth |
| `src/components/ServiceCard.tsx` | 3D tilt + shine, background number overlay ("01"…) |
| `src/components/ChatBot.tsx` | Full English conversation tree |
| `src/components/ContactForm.tsx` | Full English translation |
| `src/components/QuoteModal.tsx` | Full English translation |
| `src/pages/PricingPage.tsx` | New prices (Starter $699 / Growth $1,499 / Professional $2,999 / Enterprise $5,500), discount banner, ParticleBg, TestimonialsMarquee, EN FAQs |
| `src/pages/HomePage.tsx` | EN text, Marquee ticker, TestimonialsMarquee, updated service cards with numbers, new pricing preview |

---

## PENDING ✗

| File | What needs to happen |
|---|---|
| `src/pages/ServicesPage.tsx` | Translate all text to English; pass `number={1..6}` to each ServiceCard |
| `src/pages/PortfolioPage.tsx` | English text; add Featured Project full-width card at top; EN filter labels (All / Landing / E-commerce / Corporate); EN project descriptions |
| `src/pages/AboutPage.tsx` | Full English bio for Brayan Romero; EN skills + stats labels |
| `src/pages/ContactPage.tsx` | Translate section labels, info items, form card heading to English |
| **Build verification** | Run `npm.cmd run build` — must pass 0 TypeScript errors |

---

## Resume instructions

Open this project and say:
> "Continue the Pixel Core upgrade — complete all PENDING files in TODO.md, then run the build."
