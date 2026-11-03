import { siteConfig } from '../config'

const links = [
  { href: '#home', label: 'HOME' },
  { href: '#about', label: 'ABOUT' },
  { href: '#setup', label: 'SETUP' },
  { href: '#gallery', label: 'GALLERY' },
  { href: '#book', label: 'BOOK' },
]

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/35 to-transparent px-[5%] py-5 max-[700px]:items-start max-[700px]:py-3.5">
      <a href="#home" className="inline-flex items-center" aria-label="DJ Dovi home">
        <img
          src={siteConfig.logoNav}
          alt="DJDovi logo — Johannesburg DJ and event bookings"
          className="block w-[68px] transition duration-200 hover:scale-[0.98] hover:opacity-80 max-[700px]:w-[54px]"
        />
      </a>
      <div className="flex items-center gap-6 text-sm font-semibold tracking-[2px] max-[1000px]:gap-3.5 max-[1000px]:text-xs max-[700px]:max-w-[82%] max-[700px]:flex-wrap max-[700px]:justify-end max-[700px]:gap-x-3 max-[700px]:gap-y-2.5 max-[700px]:pt-1 max-[700px]:text-[10px] max-[700px]:tracking-[1.3px]">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="opacity-90 transition hover:opacity-55">
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
