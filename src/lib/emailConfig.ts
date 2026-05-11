export const EMAILJS_CONFIG = {
  serviceId:  import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? 'service_pixelcore',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_contact',
  publicKey:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? '',
}

export const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL ?? ''
