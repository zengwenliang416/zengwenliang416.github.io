import { stats } from '../data/content'
import CountUp from './ui/CountUp'
import RevealOnScroll from './ui/RevealOnScroll'

export default function Stats() {
  return (
    <section className="relative z-10 py-20 px-6 md:px-10 border-y border-green/5 bg-navy-light/50">
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((s, i) => (
          <RevealOnScroll key={s.label} delay={i * 0.1}>
            <div className="relative">
              <div className="font-display text-[clamp(48px,8vw,72px)] font-bold text-lightest-slate leading-none mb-2">
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              {/* Glow */}
              <div
                className="absolute inset-0 font-display text-[clamp(48px,8vw,72px)] font-bold leading-none text-transparent bg-clip-text pointer-events-none select-none"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #64ffda, #57cbff)',
                  filter: 'blur(20px)',
                  opacity: 0.4,
                  WebkitBackgroundClip: 'text',
                }}
                aria-hidden
              >
                {s.value}{s.suffix}
              </div>
              <div className="font-mono text-sm text-slate">{s.label}</div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
