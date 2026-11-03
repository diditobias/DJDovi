import { siteConfig } from '../config'

export default function About() {
  return (
    <section id="about" className="section-pad border-t border-line py-[110px] max-[700px]:py-[78px]">
      <h2 className="mb-[18px] text-[44px] tracking-[4px] max-[700px]:text-[32px]">ABOUT DJ DOVI</h2>
      <p className="max-w-[760px] text-lg text-mute">{siteConfig.about}</p>
    </section>
  )
}
