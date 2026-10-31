/**
 * Site configuration.
 * Set VITE_WHATSAPP_NUMBER in .env (digits only, country code included, no + or spaces).
 * Example South Africa: 27821234567
 * Do not commit real secrets; .env is gitignored.
 */
export const siteConfig = {
  name: 'DJDovi',
  fullName: 'DJ Dovi',
  tagline: 'Johannesburg nights. High-energy sets. Unforgettable rooms.',
  location: 'Johannesburg, South Africa',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '') || '',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || '',
  social: {
    instagram: import.meta.env.VITE_INSTAGRAM_URL || '',
    soundcloud: import.meta.env.VITE_SOUNDCLOUD_URL || '',
    tiktok: import.meta.env.VITE_TIKTOK_URL || '',
  },
  eventTypes: [
    'Club Night',
    'Private Party',
    'Wedding',
    'Corporate Event',
    'Festival',
    'Birthday',
    'Launch Party',
    'Other',
  ],
}

export function isWhatsAppConfigured() {
  return Boolean(siteConfig.whatsappNumber && siteConfig.whatsappNumber.length >= 10)
}
