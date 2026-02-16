import { motion } from 'framer-motion'
import { siteConfig } from '../data/content'
import { useLocale } from '../i18n/LocaleContext'
import RevealOnScroll from './ui/RevealOnScroll'

export default function Contact() {
  const { t } = useLocale()

  return (
    <section id="contact" className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
      <RevealOnScroll>
        <div className="relative rounded-3xl bg-dark-card border border-dark-border p-12 md:p-20 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #FF3C5F, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-[0.04] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #BEFF00, transparent 70%)' }} />

          <p className="text-text-muted text-sm font-mono uppercase tracking-widest mb-6">{t.contact.eyebrow}</p>
          <h2 className="font-display text-[clamp(36px,6vw,72px)] font-bold text-text-primary leading-[1.1] mb-8">
            {t.contact.heading[0]}<br />
            <span className="text-gradient-multi">{t.contact.heading[1]}</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-[480px] mb-10">
            {t.contact.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.a
              href={`mailto:${siteConfig.email}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-full bg-coral text-dark font-semibold text-sm hover:bg-coral/90 transition-colors"
            >
              {t.contact.emailBtn}
            </motion.a>
            <motion.a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-full border border-dark-border text-text-primary text-sm hover:border-text-muted transition-colors"
            >
              {t.contact.githubBtn}
            </motion.a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
