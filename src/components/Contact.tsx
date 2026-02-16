import { motion } from 'framer-motion'
import { siteConfig } from '../data/content'
import RevealOnScroll from './ui/RevealOnScroll'

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 text-center py-28 px-6 md:px-10 max-w-[600px] mx-auto">
      <RevealOnScroll>
        <p className="font-mono text-base text-green mb-4">05. What's Next?</p>
        <h2 className="font-display text-[clamp(40px,5vw,56px)] font-bold text-lightest-slate mb-5">
          Get In Touch
        </h2>
        <p className="text-[17px] mb-10">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
        </p>
        <motion.a
          href={`mailto:${siteConfig.email}`}
          whileHover={{ y: -3 }}
          className="inline-flex px-12 py-4 rounded-md border border-green text-green font-mono text-[15px] hover:bg-green-tint transition-all hover:shadow-[0_10px_30px_rgba(100,255,218,0.1)]"
        >
          Say Hello
        </motion.a>
      </RevealOnScroll>
    </section>
  )
}
