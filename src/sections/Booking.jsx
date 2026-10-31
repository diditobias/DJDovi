import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { CheckCircle2, Mail, MessageCircle, AlertTriangle } from 'lucide-react'
import { isWhatsAppConfigured, siteConfig } from '../config'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  eventType: '',
  eventLocation: '',
  eventTime: '',
  budget: '',
  additionalInfo: '',
}

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] ?? '')}`)
    .join('&')
}

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Valid email is required'
  }
  if (!form.phone.trim()) errors.phone = 'Phone number is required'
  if (!form.eventDate) errors.eventDate = 'Event date is required'
  if (!form.eventType) errors.eventType = 'Event type is required'
  if (!form.eventLocation.trim()) errors.eventLocation = 'Event location is required'
  if (!form.eventTime) errors.eventTime = 'Event time is required'
  if (!form.budget.trim()) errors.budget = 'Budget (ZAR) is required'
  return errors
}

function buildWhatsAppMessage(form) {
  return [
    `Hi DJDovi — I'd like to book a set.`,
    ``,
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Event date: ${form.eventDate}`,
    `Event type: ${form.eventType}`,
    `Location: ${form.eventLocation}`,
    `Time: ${form.eventTime}`,
    `Budget (ZAR): ${form.budget}`,
    form.additionalInfo?.trim() ? `Additional info: ${form.additionalInfo.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

const fieldClass =
  'w-full rounded-sm border border-white/12 bg-ink px-4 py-3 text-sm text-white outline-none transition placeholder:text-mute/60 focus:border-lime'
const labelClass = 'mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-mute'

export default function Booking() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const whatsappReady = useMemo(() => isWhatsAppConfigured(), [])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const runValidation = () => {
    const next = validate(form)
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const bookViaWhatsApp = () => {
    setStatus({ type: 'idle', message: '' })
    if (!runValidation()) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields before continuing.' })
      return
    }
    if (!whatsappReady) {
      setStatus({
        type: 'error',
        message:
          'WhatsApp number is not configured. Add VITE_WHATSAPP_NUMBER to your .env file (digits only with country code).',
      })
      return
    }
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(buildWhatsAppMessage(form))}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setStatus({ type: 'success', message: 'Opening WhatsApp with your booking details…' })
  }

  const bookViaEmail = async (e) => {
    e.preventDefault()
    setStatus({ type: 'idle', message: '' })
    if (!runValidation()) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields before submitting.' })
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        'form-name': 'booking',
        ...form,
      }
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      })

      if (!response.ok) throw new Error(`Request failed (${response.status})`)

      setForm(initialForm)
      setErrors({})
      setStatus({
        type: 'success',
        message: 'Booking enquiry sent. DJDovi will get back to you soon.',
      })
    } catch {
      setStatus({
        type: 'error',
        message:
          'Could not send the form. On the live Netlify site this should work after Forms are enabled. Locally, use WhatsApp or deploy to test email submissions.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="booking" className="relative border-t border-white/5 bg-ink py-20 md:py-28">
      <div className="section-pad mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">Book DJDovi</p>
          <h2 className="mt-3 font-display text-5xl tracking-[0.06em] text-white md:text-7xl">
            Lock the date
          </h2>
          <p className="mt-4 text-sm text-mute md:text-base">
            Fill in your event details, then book via WhatsApp or email. Email submissions are handled
            by Netlify Forms — no database required.
          </p>
        </motion.div>

        <form
          name="booking"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={bookViaEmail}
          className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]"
        >
          <input type="hidden" name="form-name" value="booking" />
          <p className="hidden">
            <label>
              Don’t fill this out: <input name="bot-field" onChange={onChange} />
            </label>
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Customer name" name="name" value={form.name} onChange={onChange} error={errors.name} required />
            <Field
              label="Email address"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              error={errors.email}
              required
            />
            <Field
              label="Phone number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              error={errors.phone}
              required
            />
            <Field
              label="Event date"
              name="eventDate"
              type="date"
              value={form.eventDate}
              onChange={onChange}
              error={errors.eventDate}
              required
            />
            <div>
              <label className={labelClass} htmlFor="eventType">
                Event type
              </label>
              <select
                id="eventType"
                name="eventType"
                value={form.eventType}
                onChange={onChange}
                className={fieldClass}
                required
              >
                <option value="">Select type</option>
                {siteConfig.eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.eventType ? <p className="mt-1 text-xs text-red-400">{errors.eventType}</p> : null}
            </div>
            <Field
              label="Event location"
              name="eventLocation"
              value={form.eventLocation}
              onChange={onChange}
              error={errors.eventLocation}
              placeholder="Venue / suburb / city"
              required
            />
            <Field
              label="Event time"
              name="eventTime"
              type="time"
              value={form.eventTime}
              onChange={onChange}
              error={errors.eventTime}
              required
            />
            <Field
              label="Budget (ZAR)"
              name="budget"
              value={form.budget}
              onChange={onChange}
              error={errors.budget}
              placeholder="e.g. 8000"
              required
            />
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="additionalInfo">
                Additional information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={4}
                value={form.additionalInfo}
                onChange={onChange}
                className={`${fieldClass} resize-y`}
                placeholder="Crowd size, music preferences, load-in notes…"
              />
            </div>
          </div>

          <aside className="flex flex-col gap-4 border border-white/8 bg-ink-elevated p-6">
            <h3 className="font-display text-3xl tracking-[0.06em] text-white">Send enquiry</h3>
            <p className="text-sm text-mute">
              Choose WhatsApp for a fast chat, or email so the enquiry lands in your Netlify Forms inbox.
            </p>

            <button
              type="button"
              onClick={bookViaWhatsApp}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:brightness-110"
            >
              <MessageCircle size={18} />
              Book via WhatsApp
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-lime px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Mail size={18} />
              {submitting ? 'Sending…' : 'Book via Email'}
            </button>

            {!whatsappReady ? (
              <p className="text-xs leading-relaxed text-amber-300/90">
                WhatsApp is inactive until you set <code>VITE_WHATSAPP_NUMBER</code> in{' '}
                <code>.env</code> (see <code>.env.example</code>).
              </p>
            ) : null}

            {status.type !== 'idle' ? (
              <div
                className={`flex gap-2 rounded-sm border px-3 py-3 text-sm ${
                  status.type === 'success'
                    ? 'border-lime/40 bg-lime/10 text-lime'
                    : 'border-red-400/40 bg-red-500/10 text-red-300'
                }`}
                role="status"
              >
                {status.type === 'success' ? (
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                ) : (
                  <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                )}
                <span>{status.message}</span>
              </div>
            ) : null}
          </aside>
        </form>
      </div>
    </section>
  )
}

function Field({ label, name, error, type = 'text', ...rest }) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} type={type} className={fieldClass} {...rest} />
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  )
}
