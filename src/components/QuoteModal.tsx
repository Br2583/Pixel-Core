import { useState } from 'react'
import { sendEmail } from '@/lib/sendEmail'
import { cn } from '@/lib/utils'

interface QuoteModalProps {
  open: boolean
  onClose: () => void
  defaultService?: string
}

const SERVICES = [
  'Landing Page', 'Full Web Site', 'E-commerce', 'Web App', 'Redesign', 'SEO & Performance', 'Other',
]

export default function QuoteModal({ open, onClose, defaultService }: QuoteModalProps) {
  const [form, setForm] = useState({ name: '', email: '', service: defaultService ?? '', message: '' })
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  if (!open) return null

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    try {
      await sendEmail({ ...form, subject: `Quote Request: ${form.service}` })
      setState('ok')
    } catch {
      setState('err')
    }
  }

  const inputCls = 'w-full px-3 py-2.5 rounded-lg border border-input bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-background rounded-xl border border-border shadow-2xl p-8 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-foreground mb-1">Get a Quote</h2>
        <p className="text-sm text-muted-foreground mb-6">I'll respond within 24 hours.</p>

        {state === 'ok' ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">✓</p>
            <p className="font-semibold text-foreground">Quote request sent!</p>
            <p className="text-sm text-muted-foreground mt-1">I'll be in touch very soon.</p>
            <button onClick={onClose} className="mt-6 px-6 py-2 rounded-lg bg-primary text-white text-sm font-semibold">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Name</label>
                <input required value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Email</label>
                <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Service</label>
              <select value={form.service} onChange={e => set('service', e.target.value)} className={inputCls}>
                <option value="">Select a service…</option>
                {SERVICES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Tell me about your project</label>
              <textarea
                required rows={3} value={form.message} onChange={e => set('message', e.target.value)}
                className={`${inputCls} resize-none`}
              />
            </div>
            {state === 'err' && <p className="text-xs text-red-500">Failed to send. Please try again.</p>}
            <button
              type="submit" disabled={state === 'sending'}
              className={cn(
                'w-full py-3 rounded-lg font-semibold text-sm text-white transition-colors',
                state === 'sending' ? 'bg-primary/60 cursor-not-allowed' : 'bg-primary hover:bg-primary/90',
              )}
            >
              {state === 'sending' ? 'Sending…' : 'Request Quote →'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
