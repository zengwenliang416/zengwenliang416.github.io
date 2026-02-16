import { siteConfig } from '../data/content'

export default function Footer() {
  return (
    <footer className="relative z-10 text-center py-6 px-10 font-mono text-xs text-slate">
      <p>
        Designed & Built by{' '}
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green hover:underline"
        >
          {siteConfig.name}
        </a>
      </p>
    </footer>
  )
}
