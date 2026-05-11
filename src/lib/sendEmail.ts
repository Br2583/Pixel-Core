import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG, FORMSPREE_URL } from './emailConfig'

export interface EmailPayload {
  name: string
  email: string
  subject?: string
  message: string
  service?: string
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const params = {
    from_name:    payload.name,
    from_email:   payload.email,
    subject:      payload.subject ?? 'Consulta desde Pixel Core',
    message:      payload.message,
    service_type: payload.service ?? '',
  }

  try {
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      params,
      EMAILJS_CONFIG.publicKey,
    )
  } catch {
    if (!FORMSPREE_URL) throw new Error('No fallback configured')
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(params),
    })
    if (!res.ok) throw new Error('Formspree error')
  }
}
