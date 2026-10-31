import { motion } from 'motion/react'
import { Headphones, Sparkles, Zap } from 'lucide-react'
import { siteConfig } from '../config'

const traits = [
  {
    icon: Zap,
    title: 'High-energy sets',
    text: 'Built for packed rooms — amapiano heat, afro house drive, and club-ready transitions.',
  },
  {
    icon: Headphones,
    title: 'Reading the floor',
    text: 'Young, sharp, and adaptive. Every booking gets a set shaped around the crowd and the brief.',
  },
  {
    icon: Sparkles,
    title: 'Joburg nightlife DNA',
    text: 'Rooted in Johannesburg’s nightlife — from intimate lounges to full-send club nights.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative border-t border-white/5 bg-ink-soft py-20 md:py-28">
      <div className="section-pad mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">About DJDovi</p>
            <h2 className="mt-3 font-display text-5xl tracking-[0.06em] text-white md:text-7xl">
              Young. Loud.
              <br />
              Unmissable.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fog/85 md:text-lg">
              {siteConfig.fullName} is a young, energetic DJ based in Johannesburg, South Africa —
              delivering premium nightlife energy for clubs, private parties, weddings, and brand
              activations. Expect bold selections, tight mixing, and a presence that lifts the room.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-mute">
              Whether you need a warm-up that builds tension or a peak-time set that keeps hands in
              the air, DJDovi brings a polished, modern sound with local soul.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {traits.map((trait, i) => (
              <motion.article
                key={trait.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="border border-white/8 bg-ink px-5 py-5 transition hover:border-lime/40"
              >
                <trait.icon className="text-lime" size={22} />
                <h3 className="mt-3 font-display text-2xl tracking-[0.06em] text-white">{trait.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{trait.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
