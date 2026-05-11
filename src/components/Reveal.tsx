import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: string
  from?: 'bottom' | 'left' | 'right'
}

const BASE: Record<string, string> = {
  bottom: 'reveal',
  left:   'reveal-left',
  right:  'reveal-right',
}

export default function Reveal({ children, className, delay = 0, as: Tag = 'div', from = 'bottom' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('on')
          obs.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    // @ts-expect-error dynamic tag
    <Tag
      ref={ref}
      className={cn(BASE[from], className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
