const SEGMENT = 'WEB DESIGN ✦ DEVELOPMENT ✦ BRANDING ✦ MOTION ✦ E-COMMERCE ✦ PIXEL CORE ✦ '

export default function Marquee() {
  // Repeat 6× so the duplicated set always covers the viewport
  const text = SEGMENT.repeat(6)

  return (
    <div className="overflow-hidden py-5 border-y border-border/40 bg-background">
      <div
        className="whitespace-nowrap inline-block animate-text-scroll"
        style={{ willChange: 'transform' }}
      >
        <span className="text-5xl font-black uppercase tracking-widest text-foreground/[0.08] select-none">
          {text}{text}
        </span>
      </div>
    </div>
  )
}
