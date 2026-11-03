import { useState } from 'react'
import { galleryImages } from '../data/content'
import Lightbox from '../components/Lightbox'

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" className="section-pad border-t border-line py-[110px] max-[700px]:py-[78px]">
      <h2 className="mb-[18px] text-[44px] tracking-[4px] max-[700px]:text-[32px]">GALLERY</h2>
      <p className="mb-8 max-w-[760px] text-mute">
        Photos from DJ Dovi&apos;s setup and performances.
      </p>

      <div className="grid grid-cols-4 gap-3.5 max-[1000px]:grid-cols-2 max-[700px]:gap-2.5">
        {galleryImages.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className="group relative aspect-[4/5] overflow-hidden border-0 bg-[#111]"
            onClick={() => setActive(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="block h-full w-full object-cover transition duration-[350ms] group-hover:scale-[1.035] group-hover:brightness-80"
            />
            <span className="absolute bottom-3 left-3.5 bg-black/70 px-2.5 py-1.5 text-[10px] tracking-[2px] max-[700px]:bottom-2 max-[700px]:left-2.5 max-[700px]:px-1.5 max-[700px]:py-1 max-[700px]:text-[8px]">
              VIEW
            </span>
          </button>
        ))}
      </div>

      <Lightbox
        images={galleryImages}
        index={active}
        onClose={() => setActive(null)}
        onPrev={() => setActive((i) => (i == null ? i : (i - 1 + galleryImages.length) % galleryImages.length))}
        onNext={() => setActive((i) => (i == null ? i : (i + 1) % galleryImages.length))}
      />
    </section>
  )
}
