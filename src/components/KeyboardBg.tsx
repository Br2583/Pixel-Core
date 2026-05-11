import { useEffect, useRef } from 'react'

type KeyDef = [string, number]

// [label, flex-grow multiplier] — empty label = space key (transparent)
const ROWS: KeyDef[][] = [
  [['Esc',1],['F1',1],['F2',1],['F3',1],['F4',1],['F5',1],['F6',1],['F7',1],['F8',1],['F9',1],['F10',1],['F11',1],['F12',1]],
  [['`',1],['1',1],['2',1],['3',1],['4',1],['5',1],['6',1],['7',1],['8',1],['9',1],['0',1],['-',1],['=',1],['⌫',2]],
  [['Tab',1.5],['Q',1],['W',1],['E',1],['R',1],['T',1],['Y',1],['U',1],['I',1],['O',1],['P',1],['[',1],[']',1],['\\',1.5]],
  [['Caps',1.75],['A',1],['S',1],['D',1],['F',1],['G',1],['H',1],['J',1],['K',1],['L',1],[';',1],["'",1],['↩',2.25]],
  [['⇧',2.25],['Z',1],['X',1],['C',1],['V',1],['B',1],['N',1],['M',1],[',',1],['.',1],['/',1],['⇧',2.75]],
  [['Ctrl',1.5],['⊞',1.25],['Alt',1.25],['',7.25],['Alt',1.25],['Fn',1.25],['Ctrl',1.5]],
]

// How many px each row floats upward at scroll progress=1 (top rows float most)
const FLOATS = [180, 148, 118, 88, 56, 18]

interface Props {
  containerRef: React.RefObject<HTMLElement | null>
}

export default function KeyboardBg({ containerRef }: Props) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (-top) / (height * 0.75)))

      rowRefs.current.forEach((row, i) => {
        if (!row) return
        row.style.transform = `translateY(${-progress * FLOATS[i]}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [containerRef])

  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 pointer-events-none select-none overflow-hidden">
      {/* Red LED ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[760px] h-56 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(220,38,38,0.22) 0%, transparent 68%)',
          filter: 'blur(12px)',
        }}
      />

      {/* Keyboard chassis */}
      <div
        className="relative rounded-2xl"
        style={{
          width: '680px',
          background: '#111110',
          padding: '12px 14px 14px',
          boxShadow: '0 -4px 60px rgba(220,38,38,0.10), 0 24px 80px rgba(0,0,0,0.55)',
          transform: 'perspective(900px) rotateX(10deg)',
          transformOrigin: 'bottom center',
        }}
      >
        {/* PCB LED dot grid */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(220,38,38,0.85) 1.5px, transparent 1.5px)',
            backgroundSize: '38px 38px',
            backgroundPosition: '19px 19px',
            opacity: 0.22,
          }}
        />

        {/* Key rows */}
        <div className="relative flex flex-col gap-1">
          {ROWS.map((row, rIdx) => (
            <div
              key={rIdx}
              ref={el => { rowRefs.current[rIdx] = el }}
              className="flex gap-1"
              style={{ willChange: 'transform' }}
            >
              {row.map(([label, flex], kIdx) =>
                label === '' ? (
                  <div
                    key={kIdx}
                    style={{ flex, height: 32 }}
                    className="rounded bg-white/5 border border-white/[0.06]"
                  />
                ) : (
                  <div
                    key={kIdx}
                    style={{
                      flex,
                      height: 32,
                      flexShrink: 0,
                      boxShadow: '0 2px 0 rgba(0,0,0,0.55), 0 0 6px rgba(220,38,38,0.18)',
                    }}
                    className="rounded bg-white flex items-center justify-center overflow-hidden text-[7px] font-semibold text-gray-400"
                  >
                    {label}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
