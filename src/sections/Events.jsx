import { motion } from 'motion/react'
import { CalendarDays } from 'lucide-react'
import { events } from '../data/content'

function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function Events() {
  return (
    <section id="events" className="relative border-t border-white/5 bg-ink-soft py-20 md:py-28">
      <div className="section-pad mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">Upcoming events</p>
          <h2 className="mt-3 font-display text-5xl tracking-[0.06em] text-white md:text-7xl">
            On the calendar
          </h2>
        </motion.div>

        <ul className="divide-y divide-white/8 border-y border-white/8">
          {events.map((event, i) => (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid gap-3 py-6 md:grid-cols-[180px_1fr_auto] md:items-center md:gap-8"
            >
              <div className="inline-flex items-center gap-2 text-sm text-lime">
                <CalendarDays size={16} />
                {formatDate(event.date)}
              </div>
              <div>
                <h3 className="font-display text-3xl tracking-[0.05em] text-white">{event.title}</h3>
                <p className="mt-1 text-sm text-mute">
                  {event.venue} · {event.city}
                </p>
              </div>
              <span className="inline-flex w-fit rounded-sm border border-lime/40 px-3 py-1 text-xs uppercase tracking-[0.14em] text-lime">
                {event.status}
              </span>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-mute">
          Private bookings take priority. Reach out early for peak weekend dates.
        </p>
      </div>
    </section>
  )
}
