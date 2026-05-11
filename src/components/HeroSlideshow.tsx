import { useState, useEffect } from 'react'

const SLIDES = ['/images/keyboard1.png', '/images/keyboard2.png']
const INTERVAL_MS = 10000

export default function HeroSlideshow() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveIdx(i => (i + 1) % SLIDES.length), INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            opacity:    i === activeIdx ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
          }}
        >
          <img
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover origin-center ${
              i % 2 === 0 ? 'animate-ken-burns-1' : 'animate-ken-burns-2'
            }`}
          />
        </div>
      ))}
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/45" />
    </div>
  )
}
