import { motion } from 'framer-motion'
import { heroData } from '../data/content'
import TextScramble from './ui/TextScramble'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex items-center px-6 md:px-10 max-w-[1100px] mx-auto">
      <div className="max-w-[700px]">
        <motion.p {...fadeUp(0.2)} className="font-mono text-base text-green mb-6">
          {heroData.greeting}
        </motion.p>

        <motion.h1
          {...fadeUp(0.4)}
          className="font-display text-[clamp(40px,7vw,80px)] font-bold leading-[1.05] text-lightest-slate mb-2"
        >
          <TextScramble texts={heroData.scrambleTexts} />
        </motion.h1>

        <motion.h2
          {...fadeUp(0.6)}
          className="font-display text-[clamp(36px,6vw,68px)] font-bold leading-[1.1] text-slate mb-6"
        >
          {heroData.tagline}{' '}
          <span className="text-gradient">{heroData.taglineHighlight}</span>
        </motion.h2>

        <motion.p {...fadeUp(0.8)} className="text-lg max-w-[520px] leading-relaxed mb-12">
          {heroData.description}
        </motion.p>

        <motion.a
          {...fadeUp(1.0)}
          href="#projects"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-md border border-green text-green font-mono text-sm hover:bg-green-tint transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(100,255,218,0.1)]"
        >
          Check out my work →
        </motion.a>
      </div>
    </section>
  )
}
