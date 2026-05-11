import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { sendEmail } from '@/lib/sendEmail'
import { cn } from '@/lib/utils'

const SERVICES = [
  'Landing Page', 'Full Web Site', 'E-commerce', 'Web App', 'Redesign', 'SEO & Performance', 'Other',
]

export default function ContactForm() {
  const [params] = useSearchParams()
  const [form, setForm] = useState({
    name:    '',
    email:   '',
    service: params.get('service') ?? params.get('servicio') ?? '',
    subject: params.get('plan') ? `Plan ${params.get('plan')}` : '',
    message: '',
  })
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    try {
      await sendEmail({ ...form, subject: form.subject || `Contact from Pixel Core — ${form.service}` })
      setState('ok')
      setForm({ name: '', email: '', service: '', subject: '', message: '' })
    } catch {
      setState('err')
    }
  }

  const inputCls = 'w-full px-4 py-3 rounded-lg border border-input bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition'

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
          <input
            required value={form.name} onChange={e => set('name', e.target.value)}
            placeholder="Your name" className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
          <input
            required type="email" value={form.email} onChange={e => set('email', e.target.value)}
            placeholder="your@email.com" className={inputCls}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Service</label>
          <select
            value={form.service} onChange={e => set('service', e.target.value)}
            className={inputCls}
          >
            <option value="">Select a service…</option>
            {SERVICES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
          <input
            value={form.subject} onChange={e => set('subject', e.target.value)}
            placeholder="What's this about?" className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
        <textarea
          required rows={5} value={form.message} onChange={e => set('message', e.target.value)}
          placeholder="Tell me about your project, goals, timeline…"
          className={`${inputCls} resize-none`}
        />
      </div>

      {state === 'err' && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      {state === 'ok' && (
        <p className="text-sm text-green-700 bg-green-50 px-4 py-2 rounded-lg">
          Message sent! I'll get back to you within 24 hours.
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className={cn(
          'w-full py-3.5 rounded-lg font-semibold text-white transition-colors',
          state === 'sending' ? 'bg-primary/60 cursor-not-allowed' : 'bg-primary hover:bg-primary/90',
        )}
      >
        {state === 'sending' ? 'Sending…' : 'Send Message →'}
      </button>
    </form>
  )
}
