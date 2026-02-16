import { motion } from 'framer-motion'
import { buildCards } from '../data/content'
import RevealOnScroll from './ui/RevealOnScroll'
import SectionHeader from './SectionHeader'

export default function WhatIBuild() {
  return (
    <section id="build" className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 py-24">
      <SectionHeader num="01" title="What I Build" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {buildCards.map((card, i) => (
          <RevealOnScroll key={card.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative bg-navy-light border border-green/5 rounded-lg p-8 overflow-hidden"
            >
              {/* Spinning gradient border */}
              <div
                className="absolute inset-[-1px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10"
                style={{
                  background: 'conic-gradient(from var(--angle, 0deg), #64ffda, #57cbff, #bd93f9, #f471b5, #64ffda)',
                  animation: 'border-spin 3s linear infinite',
                }}
              />
              <div className="absolute inset-[1px] rounded-[7px] bg-navy-light -z-10" />

              <div className="text-3xl mb-5">{card.icon}</div>
              <h3 className="font-display text-xl font-bold text-lightest-slate mb-3">
                {card.title}
              </h3>
              <p className="text-[15px] leading-relaxed mb-5">{card.desc}</p>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((t) => (
                  <span key={t} className="font-mono text-xs text-light-slate">{t}</span>
                ))}
              </div>
            </motion.div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
