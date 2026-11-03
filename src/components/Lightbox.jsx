import { useEffect } from 'react'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const image = index == null ? null : images[index]

  useEffect(() => {
    if (index == null) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, onClose, onPrev, onNext])

  if (!image) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-14 max-[700px]:px-3.5 max-[700px]:pb-16 max-[700px]:pt-[54px]"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      onClick={onClose}
    >
      <div className="relative flex h-[min(82vh,820px)] w-[min(1180px,100%)] items-center justify-center max-[700px]:h-[70vh]">
        <button
          type="button"
          className="absolute right-0 top-[-54px] grid h-12 w-12 place-items-center border border-[#555] bg-black/55 text-2xl text-white max-[700px]:right-1 max-[700px]:top-[-48px] max-[700px]:h-[42px] max-[700px]:w-[42px]"
          onClick={onClose}
          aria-label="Close gallery"
        >
          ×
        </button>
        <button
          type="button"
          className="absolute left-[-60px] top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-[#555] bg-black/55 text-2xl text-white max-[700px]:bottom-[-54px] max-[700px]:left-1 max-[700px]:top-auto max-[700px]:translate-y-0"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          aria-label="Previous image"
        >
          ‹
        </button>
        <img
          src={image.src}
          alt={image.alt}
          className="block max-h-full max-w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          type="button"
          className="absolute right-[-60px] top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-[#555] bg-black/55 text-2xl text-white max-[700px]:bottom-[-54px] max-[700px]:right-1 max-[700px]:top-auto max-[700px]:translate-y-0"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label="Next image"
        >
          ›
        </button>
        <div className="absolute bottom-[-42px] left-0 text-[11px] tracking-[2px] text-[#aaa] max-[700px]:bottom-[-52px] max-[700px]:left-[58px] max-[700px]:right-[58px] max-[700px]:text-center">
          {index + 1} / {images.length} — {image.caption}
        </div>
      </div>
    </div>
  )
}
