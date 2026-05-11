import ContactForm from '@/components/ContactForm'
import Reveal from '@/components/Reveal'

const CONTACT_INFO = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'br2583350@gmail.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Response Time',
    value: 'Under 24 hours',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
    label: 'Time Zone',
    value: 'Latin America / GMT-5',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    ),
    label: 'Availability',
    value: 'Global remote projects',
  },
]

export default function ContactPage() {
  return (
    <main className="pt-24 pb-20 min-h-screen bg-background page-enter">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-14">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
            Contact
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Let's talk about your project
          </h1>
          <p className="max-w-xl mx-auto text-muted-foreground">
            Tell me your idea and I'll reply with a proposal within 24 hours.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Reveal>
            <h2 className="text-2xl font-bold text-foreground mb-6">Contact information</h2>
            <div className="space-y-5">
              {CONTACT_INFO.map((item, i) => (
                <Reveal key={item.label} delay={i * 80}>
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.label}</p>
                      <p className="text-foreground font-medium mt-0.5">{item.value}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={350} className="mt-10 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <p className="font-semibold text-foreground mb-2">Prefer a guided process?</p>
              <p className="text-sm text-muted-foreground">
                Use the chat in the bottom-right corner — the assistant walks you through step by step and sends your inquiry automatically.
              </p>
            </Reveal>
          </Reveal>

          <Reveal delay={150} className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Send me a message</h2>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </main>
  )
}
