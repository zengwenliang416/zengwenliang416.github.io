import { motion } from 'framer-motion'
import { techStack } from '../data/content'
import RevealOnScroll from './ui/RevealOnScroll'
import SectionHeader from './SectionHeader'

export default function TechStack() {
  return (
    <section id="skills" className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 py-24">
      <SectionHeader num="02" title="Tech Stack" />
      <RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techStack.map((cat) => (
            <div key={cat.category}>
              <h3 className="font-mono text-[13px] text-green uppercase tracking-widest mb-4 flex items-center gap-2">
                <span>▹</span> {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {cat.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="font-mono text-[13px] px-4 py-2 rounded bg-navy-light border border-green/[0.06] text-light-slate hover:text-green hover:border-green/20 hover:shadow-[0_4px_20px_rgba(100,255,218,0.08)] transition-colors cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}
