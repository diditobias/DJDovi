import { useState } from 'react'
import { isWhatsAppConfigured, siteConfig } from '../config'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  event_date: '',
  event_type: '',
  venue_area: '',
  event_details: '',
}

const fieldClass =
  'w-full border border-line bg-[#0b0b0b] px-[15px] py-3.5 text-sm text-white outline-none focus:border-[#777]'
const labelClass = 'mb-1.5 block text-[10px] tracking-[1.6px] text-[#bbb]'

function bookingMessage(v) {
  return [
    'Hi Dovi,',
    '',
    'I would like to make a booking enquiry and get a quote.',
    '',
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone}`,
    `Event date: ${v.event_date}`,
    `Event type: ${v.event_type}`,
    `Venue / Area: ${v.venue_area}`,
    '',
    'Event details:',
    v.event_details.trim() || 'No additional details provided.',
    '',
    'Thank you.',
  ].join('\n')
}

export default function Booking() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const openGmail = (e) => {
    e.preventDefault()
    const formEl = e.currentTarget
    if (!formEl.reportValidity()) return

    const subject = `DJ Dovi Booking Enquiry - ${form.name}`
    const body = bookingMessage(form)
    const gmail =
      'https://mail.google.com/mail/?view=cm&fs=1' +
      `&to=${encodeURIComponent(siteConfig.contactEmail)}` +
      `&cc=${encodeURIComponent(form.email)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    window.open(gmail, '_blank', 'noopener,noreferrer')
    setStatus('Opening Gmail with your enquiry…')
  }

  const sendWhatsApp = () => {
    const formEl = document.getElementById('booking-form')
    if (formEl && !formEl.reportValidity()) return
    if (!isWhatsAppConfigured()) {
      setStatus('WhatsApp number is not configured.')
      return
    }
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(bookingMessage(form))}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setStatus('Opening WhatsApp with your enquiry…')
  }

  const quickEmail = () => {
    const gmail =
      'https://mail.google.com/mail/?view=cm&fs=1' +
      `&to=${encodeURIComponent(siteConfig.contactEmail)}`
    window.open(gmail, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="book"
      className="section-pad flex min-h-[58vh] flex-col items-center justify-center border-t border-line py-[110px] text-center max-[700px]:py-[78px]"
    >
      <h2 className="text-[clamp(45px,8vw,90px)] tracking-[4px]">BOOK DJ DOVI</h2>
      <p className="mt-5 mb-7 max-w-[650px] text-mute">
        For bookings and availability, send your enquiry below and get a quote for your event.
      </p>

      <div className="mb-7 flex max-w-[520px] flex-col items-center gap-1.5 border border-line bg-panel px-6 py-[18px]">
        <strong className="text-[10px] tracking-[2px] text-gold">{siteConfig.pricing.label}</strong>
        <span className="text-lg tracking-[0.5px]">{siteConfig.pricing.line}</span>
        <small className="text-[11px] text-[#888]">{siteConfig.pricing.note}</small>
      </div>

      <form
        id="booking-form"
        name="booking"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={openGmail}
        className="mt-1 grid w-[min(760px,100%)] grid-cols-2 gap-3.5 text-left max-[700px]:grid-cols-1"
      >
        <input type="hidden" name="form-name" value="booking" />
        <p className="hidden">
          <label>
            Don’t fill this out: <input name="bot-field" onChange={onChange} />
          </label>
        </p>

        <Field label="NAME" name="name" value={form.name} onChange={onChange} autoComplete="name" required />
        <Field
          label="EMAIL"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          autoComplete="email"
          required
        />
        <Field
          label="PHONE"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={onChange}
          autoComplete="tel"
          required
        />
        <Field
          label="EVENT DATE"
          name="event_date"
          type="date"
          value={form.event_date}
          onChange={onChange}
          required
        />
        <Field
          label="EVENT TYPE"
          name="event_type"
          value={form.event_type}
          onChange={onChange}
          placeholder="e.g. Barmitzvah"
          required
        />
        <Field
          label="VENUE / AREA"
          name="venue_area"
          value={form.venue_area}
          onChange={onChange}
          required
        />

        <div className="col-span-2 max-[700px]:col-span-1">
          <label className={labelClass} htmlFor="event_details">
            EVENT DETAILS
          </label>
          <textarea
            id="event_details"
            name="event_details"
            value={form.event_details}
            onChange={onChange}
            className={`${fieldClass} min-h-[130px] resize-y`}
            placeholder="Tell me the event time, number of guests, setup required and anything else I should know."
          />
        </div>

        <div className="col-span-2 flex flex-wrap justify-center gap-3 text-center max-[700px]:col-span-1">
          <button className="cta mt-2" type="submit">
            OPEN GMAIL
          </button>
          <button className="cta cta-gold mt-2" type="button" onClick={sendWhatsApp}>
            SEND BY WHATSAPP
          </button>
        </div>

        <div className="col-span-2 min-h-5 text-center text-xs tracking-[0.4px] text-[#c8d8c2] max-[700px]:col-span-1" role="status">
          {status}
        </div>
        <p className="col-span-2 mt-0.5 text-center text-[11px] text-[#777] max-[700px]:col-span-1">
          Choose Gmail or WhatsApp. When you use Gmail, the email address you entered is automatically
          copied in so you also receive a copy of the enquiry after you press Send.
        </p>
      </form>

      <div className="mt-[46px] w-[min(760px,100%)] border-t border-line pt-[30px] text-center max-[700px]:mt-[38px] max-[700px]:pt-[26px]">
        <h3 className="mb-2 text-xl tracking-[2px]">OTHER ENQUIRIES</h3>
        <p className="mx-auto mb-[18px] text-[13px] text-mute">
          For anything other than a booking, contact me directly.
        </p>
        <div className="mx-auto grid w-[min(560px,100%)] grid-cols-2 gap-3.5 max-[700px]:max-w-[320px] max-[700px]:grid-cols-1">
          <div className="flex min-w-0 flex-col items-stretch gap-2.5">
            <button className="cta mt-0 w-full px-5 py-3 text-center" type="button" onClick={quickEmail}>
              EMAIL ME
            </button>
            <a className="flex min-h-[18px] items-center justify-center text-center text-[11px] tracking-[0.5px] text-[#888] hover:text-white" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          </div>
          <div className="flex min-w-0 flex-col items-stretch gap-2.5">
            <a
              className="cta cta-gold mt-0 w-full px-5 py-3 text-center"
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WHATSAPP ME
            </a>
            <a className="flex min-h-[18px] items-center justify-center text-center text-[11px] tracking-[0.5px] text-[#888] hover:text-white" href={`tel:${siteConfig.phoneTel}`}>
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', ...rest }) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} type={type} className={fieldClass} {...rest} />
    </div>
  )
}
