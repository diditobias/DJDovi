import { siteConfig } from '../config'
import { setupItems } from '../data/content'

export default function Setup() {
  return (
    <section id="setup" className="section-pad border-t border-line py-[110px] max-[700px]:py-[78px]">
      <h2 className="mb-[18px] text-[44px] tracking-[4px] max-[700px]:text-[32px]">MY SETUP</h2>
      <div className="mb-[38px] text-[11px] uppercase tracking-[3px] text-gold">
        Professional • Clean • Event Ready
      </div>

      <div className="grid grid-cols-[1.15fr_0.85fr] items-stretch gap-[38px] max-[1000px]:grid-cols-1">
        <div className="min-h-[540px] overflow-hidden bg-[#111] max-[1000px]:min-h-[440px] max-[700px]:min-h-[330px]">
          <img
            src={siteConfig.setupImage}
            alt="DJ Dovi event setup with DJ booth, speakers, and lighting ready for a Johannesburg event"
            className="block h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="mb-[18px] text-[30px] tracking-[2px]">A clean setup that looks good anywhere.</h3>
          <p className="mb-6 max-w-[560px] text-mute">
            A neat, professional setup designed to look smart in the room while keeping the music
            flowing all event long. The setup can be adjusted depending on the venue, crowd size and
            what your event needs.
          </p>

          <div className="mb-2 grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
            {setupItems.map((item) => (
              <div key={item.title} className="border border-line bg-panel p-[18px]">
                <h4 className="mb-1.5 text-xs font-bold tracking-[1.6px]">{item.title}</h4>
                <p className="m-0 text-[13px] text-mute">{item.body}</p>
              </div>
            ))}
          </div>

          <a className="cta w-fit" href="#book">
            ASK ABOUT SETUP OPTIONS
          </a>
        </div>
      </div>
    </section>
  )
}
