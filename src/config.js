/**
 * Site configuration.
 * Override with VITE_* env vars when needed. Defaults match the live DJ Dovi site.
 */
export const siteConfig = {
  name: 'DJ DOVI',
  shortName: 'DJ Dovi',
  tagline: 'MUSIC • ENERGY • MEMORIES',
  about:
    'DJ Dovi is a young DJ based in Johannesburg, South Africa, who loves bringing people together through music. From energetic sets to unforgettable moments, the goal is simple — play great music, create an atmosphere, and make every event one to remember.',
  pricing: {
    label: 'PRICING GUIDE',
    line: 'R850 setup & takedown + R1,000 per hour',
    note: 'Your final quote will be confirmed based on your event requirements.',
  },
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER || '27724180855').replace(/\D/g, ''),
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'dovitobias@gmail.com',
  phoneDisplay: '+27 72 418 0855',
  phoneTel: '+27724180855',
  logoNav: '/logo-nav.png',
  heroImage: '/images/photo2.jpg',
  setupImage: '/images/setup-main.png',
}

export function isWhatsAppConfigured() {
  return Boolean(siteConfig.whatsappNumber && siteConfig.whatsappNumber.length >= 10)
}
