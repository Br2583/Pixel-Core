import { useState, useRef, useEffect } from 'react'
import { sendEmail } from '@/lib/sendEmail'
import { cn } from '@/lib/utils'

interface Message { from: 'bot' | 'user'; text: string }

type Step =
  | { type: 'msg';     text: string; next: string }
  | { type: 'options'; text: string; choices: { label: string; next: string }[] }
  | { type: 'input';   text: string; key: keyof Lead; next: string; inputType?: string }
  | { type: 'end' }

interface Lead {
  name: string; email: string; service: string;
  budget: string; timeline: string; message: string;
}

const TREE: Record<string, Step> = {
  start: {
    type: 'msg',
    text: 'Hi there! I\'m the Pixel Core assistant. What kind of project do you have in mind?',
    next: 'q_service',
  },
  q_service: {
    type: 'options',
    text: 'What type of site do you need?',
    choices: [
      { label: 'Landing Page',    next: 'branch_landing' },
      { label: 'Full Web Site',   next: 'branch_full' },
      { label: 'E-commerce',      next: 'branch_ecom' },
      { label: 'Not sure yet',    next: 'branch_other' },
    ],
  },
  branch_landing: { type: 'msg', text: 'Great choice! Landing pages are conversion machines. What\'s your budget?', next: 'q_budget_a' },
  q_budget_a: {
    type: 'options',
    text: 'Estimated budget:',
    choices: [
      { label: 'Under $1,000',     next: 'q_timeline' },
      { label: '$1,000 – $3,000',  next: 'q_timeline' },
      { label: 'Over $3,000',      next: 'q_timeline' },
    ],
  },
  branch_full: { type: 'msg', text: 'A full web site can transform your brand. What\'s your budget range?', next: 'q_budget_b' },
  q_budget_b: {
    type: 'options',
    text: 'Estimated budget:',
    choices: [
      { label: '$1,500 – $3,000',  next: 'q_timeline' },
      { label: '$3,000 – $6,000',  next: 'q_timeline' },
      { label: 'Over $6,000',      next: 'q_timeline' },
    ],
  },
  branch_ecom: { type: 'msg', text: 'E-commerce sites built right sell themselves. What\'s your budget?', next: 'q_budget_c' },
  q_budget_c: {
    type: 'options',
    text: 'Estimated budget:',
    choices: [
      { label: '$3,000 – $6,000',   next: 'q_timeline' },
      { label: '$6,000 – $12,000',  next: 'q_timeline' },
      { label: 'Over $12,000',      next: 'q_timeline' },
    ],
  },
  branch_other: { type: 'msg', text: 'No problem — I\'ll help you figure it out. Tell me a bit about your business.', next: 'q_message' },
  q_timeline: {
    type: 'options',
    text: 'When do you need it live?',
    choices: [
      { label: 'Within 1 month',  next: 'q_name' },
      { label: '1 – 3 months',    next: 'q_name' },
      { label: 'No rush yet',     next: 'q_name' },
    ],
  },
  q_message: {
    type: 'input',
    text: 'Describe your project idea in a few words:',
    key: 'message',
    next: 'q_name',
  },
  q_name: {
    type: 'input',
    text: 'Awesome! What\'s your name?',
    key: 'name',
    next: 'q_email',
  },
  q_email: {
    type: 'input',
    text: 'And your email so I can send you a proposal?',
    key: 'email',
    inputType: 'email',
    next: 'confirm',
  },
  confirm: {
    type: 'msg',
    text: 'Perfect — I\'m sending your inquiry to Brayan right now. You\'ll hear back within 24 hours!',
    next: 'end',
  },
  end: { type: 'end' },
}

const EMPTY_LEAD: Lead = { name: '', email: '', service: '', budget: '', timeline: '', message: '' }

export default function ChatBot() {
  const [open, setOpen]       = useState(false)
  const [msgs, setMsgs]       = useState<Message[]>([])
  const [step, setStep]       = useState('start')
  const [lead, setLead]       = useState<Lead>(EMPTY_LEAD)
  const [input, setInput]     = useState('')
  const [sent, setSent]       = useState(false)
  const [started, setStarted] = useState(false)
  const bottomRef             = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  function botMsg(text: string) { setMsgs(m => [...m, { from: 'bot', text }]) }
  function userMsg(text: string) { setMsgs(m => [...m, { from: 'user', text }]) }

  function advance(nextKey: string, updatedLead = lead) {
    const s = TREE[nextKey]
    if (!s) return
    setStep(nextKey)
    if (s.type === 'msg') {
      botMsg(s.text)
      setTimeout(() => advance(s.next, updatedLead), 600)
    } else if (s.type === 'options' || s.type === 'input') {
      botMsg(s.text)
    } else if (s.type === 'end') {
      sendEmail({
        name:    updatedLead.name,
        email:   updatedLead.email,
        service: updatedLead.service,
        message: `Budget: ${updatedLead.budget}\nTimeline: ${updatedLead.timeline}\n\n${updatedLead.message}`,
        subject: `Lead ChatBot — ${updatedLead.service || 'General Inquiry'}`,
      }).catch(() => {})
      setSent(true)
    }
  }

  function start() {
    setStarted(true)
    setMsgs([])
    setLead(EMPTY_LEAD)
    setSent(false)
    advance('start')
  }

  function handleChoice(label: string, next: string) {
    userMsg(label)
    let updatedLead = lead
    const s = TREE[step]
    if (s.type === 'options') {
      if (step === 'q_service' || step.startsWith('branch_')) {
        updatedLead = { ...lead, service: label }
      } else if (step.startsWith('q_budget')) {
        updatedLead = { ...lead, budget: label }
      } else if (step === 'q_timeline') {
        updatedLead = { ...lead, timeline: label }
      }
    }
    setLead(updatedLead)
    advance(next, updatedLead)
  }

  function handleInput(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    const s = TREE[step]
    if (s.type !== 'input') return
    userMsg(input)
    const updatedLead = { ...lead, [s.key]: input }
    setLead(updatedLead)
    setInput('')
    advance(s.next, updatedLead)
  }

  const currentStep = TREE[step]

  return (
    <>
      <button
        onClick={() => { setOpen(v => !v); if (!started) start() }}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-primary shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center"
        aria-label="Chat"
      >
        <RobotSvg open={open} />
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-80 md:w-96 bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          <div className="bg-primary px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white">PC</div>
            <div>
              <p className="text-white text-sm font-semibold">Pixel Core Assistant</p>
              <p className="text-white/70 text-xs">Replies within 24h</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
            {msgs.map((m, i) => (
              <div key={i} className={cn('flex', m.from === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  'max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed',
                  m.from === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-secondary text-foreground rounded-bl-none',
                )}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {!sent && currentStep?.type === 'options' && (
            <div className="px-3 pb-3 flex flex-wrap gap-2">
              {currentStep.choices.map(c => (
                <button
                  key={c.label}
                  onClick={() => handleChoice(c.label, c.next)}
                  className="px-3 py-1.5 text-xs rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}

          {!sent && currentStep?.type === 'input' && (
            <form onSubmit={handleInput} className="flex border-t border-border">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                type={currentStep.inputType ?? 'text'}
                placeholder="Type here…"
                className="flex-1 px-3 py-2.5 text-sm bg-background focus:outline-none"
              />
              <button type="submit" className="px-4 text-primary font-semibold text-sm hover:text-primary/80">→</button>
            </form>
          )}

          {sent && (
            <div className="px-4 py-3 text-center text-sm text-muted-foreground border-t border-border">
              Done! Brayan will contact you very soon.
            </div>
          )}
        </div>
      )}
    </>
  )
}

function RobotSvg({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-9 animate-float">
      <rect x="17" y="0" width="2" height="8" rx="1" fill="rgba(255,255,255,0.9)" />
      <circle cx="18" cy="2" r="2.5" fill="white" />
      <rect x="5" y="8" width="26" height="18" rx="4" fill="white" opacity="0.95" />
      <circle cx="14" cy="17" r="4" fill="#DC2626" className="animate-blink" />
      <circle cx="15.5" cy="15.5" r="1.5" fill="white" />
      <circle cx="22" cy="17" r="4" fill="#DC2626" className="animate-blink" />
      <circle cx="23.5" cy="15.5" r="1.5" fill="white" />
      <rect x="12" y="22" width="12" height="2" rx="1" fill="#DC2626" opacity="0.7" />
      <rect x="8" y="28" width="20" height="13" rx="3" fill="white" opacity="0.85" />
      <rect x="13" y="31" width="10" height="2" rx="1" fill="#DC2626" opacity="0.5" />
      <rect x="13" y="34" width="7" height="2" rx="1" fill="#DC2626" opacity="0.3" />
      <rect x="2" y="29" width="5" height="9" rx="2.5" fill="white" opacity="0.8" />
      <rect x="29" y="29" width="5" height="9" rx="2.5" fill="white" opacity="0.8" />
    </svg>
  )
}
