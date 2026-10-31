import { motion } from 'motion/react'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { isWhatsAppConfigured, siteConfig } from '../config'

export default function Contact() {
  const whatsappReady = isWhatsAppConfigured()

  return (
    <section id="contact" className="relative border-t border-white/5 bg-ink-soft py-20 md:py-28">
      <div className="section-pad mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">Contact</p>
          <h2 className="mt-3 font-display text-5xl tracking-[0.06em] text-white md:text-7xl">
            Let’s talk
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="border border-white/8 bg-ink p-6">
            <MapPin className="text-lime" size={22} />
            <h3 className="mt-4 font-display text-2xl tracking-[0.06em] text-white">Based in</h3>
            <p className="mt-2 text-sm text-mute">{siteConfig.location}</p>
            <p className="mt-1 text-sm text-mute">Available for travel across Gauteng and beyond.</p>
          </article>

          <article className="border border-white/8 bg-ink p-6">
            <Mail className="text-lime" size={22} />
            <h3 className="mt-4 font-display text-2xl tracking-[0.06em] text-white">Email</h3>
            {siteConfig.contactEmail ? (
              <a href={`mailto:${siteConfig.contactEmail}`} className="mt-2 block text-sm text-lime hover:text-white">
                {siteConfig.contactEmail}
              </a>
            ) : (
              <p className="mt-2 text-sm text-mute">
                Use the booking form email button, or set <code className="text-lime/80">VITE_CONTACT_EMAIL</code>.
              </p>
            )}
          </article>

          <article className="border border-white/8 bg-ink p-6">
            <MessageCircle className="text-lime" size={22} />
            <h3 className="mt-4 font-display text-2xl tracking-[0.06em] text-white">WhatsApp</h3>
            {whatsappReady ? (
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-sm text-lime hover:text-white"
              >
                Chat with DJDovi
              </a>
            ) : (
              <p className="mt-2 text-sm text-mute">
                Configure <code className="text-lime/80">VITE_WHATSAPP_NUMBER</code> to enable direct chat.
              </p>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}
