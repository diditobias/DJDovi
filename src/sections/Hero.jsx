import { motion } from 'motion/react'
import { ArrowDown, MapPin } from 'lucide-react'
import { siteConfig } from '../config'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-ink">
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(200,255,0,0.14),transparent_45%),radial-gradient(ellipse_at_80%_70%,rgba(200,255,0,0.08),transparent_40%),linear-gradient(180deg,#050505_0%,#0a0a0a_55%,#050505_100%)]" />
      <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="section-pad relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-lime">
            <MapPin size={14} />
            {siteConfig.location}
          </div>

          <h1 className="font-display text-[clamp(4.5rem,18vw,11rem)] leading-[0.85] tracking-[0.04em] text-white">
            {siteConfig.name}
            <span className="text-lime">.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-fog/90 md:text-lg">{siteConfig.tagline}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="inline-flex items-center justify-center rounded-sm bg-lime px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-white"
            >
              Book DJDovi
            </a>
            <a
              href="#music"
              className="inline-flex items-center justify-center rounded-sm border border-white/20 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-lime hover:text-lime"
            >
              Hear the mixes
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex items-end gap-8 md:absolute md:bottom-24 md:right-8 md:mt-0"
          aria-hidden
        >
          <div className="flex h-16 items-end gap-1.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="eq-bar inline-block w-1.5 rounded-sm bg-lime"
                style={{
                  height: `${28 + (i % 3) * 14}px`,
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            ))}
          </div>
          <a
            href="#about"
            className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-mute transition hover:text-lime md:inline-flex"
          >
            Scroll
            <ArrowDown size={14} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
