import { motion } from 'framer-motion'
import { projects } from '../data/content'
import RevealOnScroll from './ui/RevealOnScroll'
import SectionHeader from './SectionHeader'

function FeaturedProject({ project, index }: { project: typeof projects[0]; index: number }) {
  const isEven = index % 2 === 1
  return (
    <RevealOnScroll>
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-5 items-center ${isEven ? 'md:text-right' : ''}`}>
        {/* Image placeholder */}
        <motion.a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          className={`relative rounded-lg overflow-hidden bg-navy-light border border-green/5 aspect-video flex items-center justify-center text-5xl text-green/30 ${
            isEven ? 'md:col-start-6 md:col-end-13 md:row-start-1' : 'md:col-start-1 md:col-end-8'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green/10 to-blue-400/5 hover:from-green/5 hover:to-blue-400/[0.02] transition-colors" />
          {project.name.includes('mcp') ? '🤖' : '🔔'}
        </motion.a>

        {/* Info */}
        <div className={`${isEven ? 'md:col-start-1 md:col-end-7 md:row-start-1' : 'md:col-start-7 md:col-end-13'} relative z-10`}>
          <p className="font-mono text-[13px] text-green mb-2">Featured Project</p>
          <h3 className="font-display text-[28px] font-bold text-lightest-slate mb-4 hover:text-green transition-colors">
            <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
          </h3>
          <div className="bg-navy-light p-6 rounded-lg shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)] mb-4 text-[15px] leading-relaxed text-left">
            {project.desc}
            {project.stars && <strong className="text-green ml-2">★ {project.stars}</strong>}
          </div>
          <div className={`flex flex-wrap gap-3 font-mono text-[13px] text-light-slate mb-3 ${isEven ? 'md:justify-end' : ''}`}>
            {project.tech.map((t) => <span key={t}>{t}</span>)}
          </div>
          <div className={`${isEven ? 'md:text-right' : ''}`}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-light-slate text-xl hover:text-green transition-colors">↗</a>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  )
}

function MiniCard({ project, delay }: { project: typeof projects[0]; delay: number }) {
  return (
    <RevealOnScroll delay={delay}>
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -8 }}
        className="block bg-navy-light border border-green/5 rounded-lg p-7 min-h-[260px] flex flex-col hover:shadow-[0_20px_40px_rgba(2,12,27,0.5)] transition-shadow group"
        style={{ perspective: '600px' }}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-4xl text-green">📂</span>
          <span className="text-light-slate text-lg hover:text-green transition-colors">↗</span>
        </div>
        <h3 className="font-display text-lg font-bold text-lightest-slate mb-3 group-hover:text-green transition-colors">
          {project.name}
        </h3>
        <p className="text-sm leading-relaxed flex-1">{project.desc}</p>
        <div className="flex flex-wrap gap-2.5 mt-5 font-mono text-xs text-light-slate">
          {project.tech.map((t) => <span key={t}>{t}</span>)}
        </div>
      </motion.a>
    </RevealOnScroll>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 py-24">
      <SectionHeader num="03" title="Things I've Built" />

      <div className="flex flex-col gap-20 mb-12">
        {featured.map((p, i) => (
          <FeaturedProject key={p.name} project={p} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {others.map((p, i) => (
          <MiniCard key={p.name} project={p} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}
