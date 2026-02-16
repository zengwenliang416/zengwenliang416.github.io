import { motion } from 'framer-motion'
import { publications } from '../data/content'
import RevealOnScroll from './ui/RevealOnScroll'
import SectionHeader from './SectionHeader'

export default function Publications() {
  return (
    <section id="papers" className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 py-24">
      <SectionHeader num="04" title="Publications" />
      <div className="flex flex-col gap-4">
        {publications.map((pub, i) => (
          <RevealOnScroll key={pub.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ x: 6 }}
              className="flex gap-5 items-start p-7 rounded-lg bg-navy-light border border-green/5 hover:border-green/15 transition-colors"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center bg-green-tint text-green text-lg">
                📄
              </div>
              <div>
                <h3 className="font-display text-[17px] font-bold text-lightest-slate mb-1.5">
                  {pub.title}
                </h3>
                <p className="text-sm leading-relaxed">{pub.desc}</p>
              </div>
            </motion.div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
