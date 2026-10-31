import { useState } from 'react'
import { motion } from 'motion/react'
import { Expand } from 'lucide-react'
import { galleryImages } from '../data/content'
import Lightbox from '../components/Lightbox'

export default function Gallery() {
  const [active, setActive] = useState(null)

  const openAt = (index) => setActive(index)
  const close = () => setActive(null)
  const prev = () => setActive((i) => (i == null ? i : (i - 1 + galleryImages.length) % galleryImages.length))
  const next = () => setActive((i) => (i == null ? i : (i + 1) % galleryImages.length))

  return (
    <section id="gallery" className="relative border-t border-white/5 bg-ink py-20 md:py-28">
      <div className="section-pad mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">Photo gallery</p>
          <h2 className="mt-3 font-display text-5xl tracking-[0.06em] text-white md:text-7xl">
            In the booth
          </h2>
          <p className="mt-4 max-w-lg text-sm text-mute">
            Add your photos to <code className="text-lime/90">public/images/gallery</code> and update{' '}
            <code className="text-lime/90">src/data/content.js</code>. Push to GitHub — Netlify updates
            the live site automatically.
          </p>
        </motion.div>

        <div className="grid auto-rows-[180px] grid-cols-1 gap-3 sm:grid-cols-2 md:auto-rows-[200px] md:grid-cols-4 md:gap-4">
          {galleryImages.map((image, index) => (
            <motion.button
              key={image.id}
              type="button"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              onClick={() => openAt(index)}
              className={`group relative overflow-hidden border border-white/8 bg-steel text-left ${image.span}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition group-hover:opacity-90" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                <p className="line-clamp-2 text-xs text-fog/90">{image.alt}</p>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-lime text-ink opacity-0 transition group-hover:opacity-100">
                  <Expand size={14} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox images={galleryImages} index={active} onClose={close} onPrev={prev} onNext={next} />
    </section>
  )
}
