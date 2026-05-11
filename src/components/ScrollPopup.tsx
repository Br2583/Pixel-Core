import { useState, useEffect } from 'react'

const POPUP_KEY = 'pixelcore_popup_shown'

interface ScrollPopupProps {
  onOpenAuth: () => void
}

export default function ScrollPopup({ onOpenAuth }: ScrollPopupProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(POPUP_KEY)) return

    const onScroll = () => {
      const scrolled = window.scrollY
      const total    = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0 && scrolled / total >= 0.85) {
        setVisible(true)
        sessionStorage.setItem(POPUP_KEY, 'true')
        window.removeEventListener('scroll', onScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function close() {
    setVisible(false)
    sessionStorage.setItem(POPUP_KEY, 'true')
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-[500] w-80 bg-white rounded-2xl shadow-2xl border border-foreground/10 overflow-hidden animate-slide-up">
      {/* Coral accent bar */}
      <div className="h-1 bg-primary w-full" />

      <div className="p-6 relative">
        <button
          onClick={close}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="font-bold text-lg text-foreground mb-1 pr-6">Get 15% Off Your First Project</p>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Create a free account and lock in your discount before you leave.
        </p>

        <div className="flex items-center gap-2 mb-5 text-xs text-muted-foreground">
          <span className="text-primary font-bold text-base">✦</span>
          <span>50+ projects delivered · 98% satisfaction rate</span>
        </div>

        <button
          onClick={() => { close(); onOpenAuth() }}
          className="w-full py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors mb-2"
        >
          Create Free Account
        </button>
        <button
          onClick={close}
          className="w-full py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          No thanks
        </button>
      </div>
    </div>
  )
}
