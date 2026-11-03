import { siteConfig } from '../config'

export default function Hero() {
  return (
    <header
      id="home"
      className="relative flex min-h-[650px] h-screen items-center justify-center overflow-hidden text-center max-[700px]:min-h-[600px]"
    >
      <img
        src={siteConfig.heroImage}
        alt="DJ Dovi performing live at an event in Johannesburg"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.42]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/12 to-black/70" />
      <div className="relative z-[2] px-5">
        <h1 className="text-[clamp(70px,14vw,190px)] font-extrabold leading-[0.9] tracking-[0.08em]">
          {siteConfig.name}
        </h1>
        <div className="mt-5 text-[13px] tracking-[6px] max-[700px]:text-[10px] max-[700px]:tracking-[3px]">
          {siteConfig.tagline}
        </div>
        <a className="cta" href="#book">
          BOOK DJ DOVI
        </a>
      </div>
    </header>
  )
}
