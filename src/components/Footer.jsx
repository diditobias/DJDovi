import { Music2, Share2 } from 'lucide-react'
import { siteConfig } from '../config'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/8 bg-ink-soft">
      <div className="section-pad mx-auto flex max-w-7xl flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-4xl tracking-[0.1em] text-white md:text-5xl">
            {siteConfig.name}
            <span className="text-lime">.</span>
          </p>
          <p className="mt-3 max-w-md text-sm text-mute">{siteConfig.tagline}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-lime/80">{siteConfig.location}</p>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex items-center gap-3">
            {siteConfig.social.instagram ? (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-fog transition hover:border-lime hover:text-lime"
                aria-label="Instagram"
              >
                <Share2 size={18} />
              </a>
            ) : null}
            {siteConfig.social.soundcloud ? (
              <a
                href={siteConfig.social.soundcloud}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-fog transition hover:border-lime hover:text-lime"
                aria-label="SoundCloud"
              >
                <Music2 size={18} />
              </a>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-5 text-xs uppercase tracking-[0.16em] text-mute">
            <a href="#about" className="hover:text-lime">
              About
            </a>
            <a href="#gallery" className="hover:text-lime">
              Gallery
            </a>
            <a href="#booking" className="hover:text-lime">
              Book
            </a>
            <a href="#contact" className="hover:text-lime">
              Contact
            </a>
          </div>
          <p className="text-xs text-mute/70">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
