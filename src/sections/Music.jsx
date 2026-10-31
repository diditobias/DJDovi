import { motion } from 'motion/react'
import { Play } from 'lucide-react'
import { mixes } from '../data/content'
import { siteConfig } from '../config'

export default function Music() {
  return (
    <section id="music" className="relative border-t border-white/5 bg-ink py-20 md:py-28">
      <div className="section-pad mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">Music & mixes</p>
            <h2 className="mt-3 font-display text-5xl tracking-[0.06em] text-white md:text-7xl">
              The sound
            </h2>
          </div>
          <p className="max-w-md text-sm text-mute md:text-right">
            Featured mix concepts for booking briefs. Drop your SoundCloud or Mixcloud link in{' '}
            <code className="text-lime/90">.env</code> to wire live players.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {mixes.map((mix, i) => (
            <motion.article
              key={mix.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group flex items-start gap-4 border border-white/8 bg-ink-elevated p-5 transition hover:border-lime/50"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-lime text-ink transition group-hover:scale-105">
                <Play size={22} fill="currentColor" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl tracking-[0.05em] text-white">{mix.title}</h3>
                  <span className="text-xs uppercase tracking-[0.14em] text-mute">{mix.duration}</span>
                </div>
                <p className="mt-1 text-sm text-lime/90">{mix.genre}</p>
                <p className="mt-2 text-sm text-mute">{mix.vibe}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {siteConfig.social.soundcloud ? (
          <a
            href={siteConfig.social.soundcloud}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-lime hover:text-white"
          >
            Open full catalogue →
          </a>
        ) : null}
      </div>
    </section>
  )
}
