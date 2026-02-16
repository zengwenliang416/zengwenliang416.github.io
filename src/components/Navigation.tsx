import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { navLinks, siteConfig } from '../data/content'
import MagneticButton from './ui/MagneticButton'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-green/5 transition-colors duration-300 ${
        scrolled ? 'bg-navy/95 backdrop-blur-xl' : 'bg-navy/85 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-[1100px] mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        <MagneticButton as="a" href="#" className="font-mono font-bold text-lg text-green">
          &lt;WL /&gt;
        </MagneticButton>

        <div className="flex items-center gap-7">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <MagneticButton
                as="a"
                href={link.href}
                className="text-light-slate font-mono text-[13px] hover:text-green transition-colors hidden md:inline-block"
              >
                <span className="text-green text-xs mr-1">{link.num}.</span>
                {link.label}
              </MagneticButton>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <MagneticButton
              as="a"
              href={`mailto:${siteConfig.email}`}
              className="px-5 py-2.5 rounded-md border border-green text-green font-mono text-[13px] hover:bg-green-tint transition-colors"
            >
              Say Hello
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}
