export const siteConfig = {
  name: 'Wenliang Zeng',
  title: 'Full-Stack Developer & AI Tooling Builder',
  email: 'zengwenliang416@gmail.com',
  github: 'https://github.com/zengwenliang416',
}

export const heroData = {
  greeting: 'Hi, my name is',
  name: 'Wenliang Zeng.',
  tagline: 'I build things that',
  taglineHighlight: 'push boundaries.',
  description:
    'Full-stack developer specializing in AI tooling, MCP protocol servers, and production-grade applications. Bridging AI research with real-world engineering.',
  scrambleTexts: ['Wenliang Zeng.', 'a Developer.', 'an AI Builder.', 'Wenliang Zeng.'],
}

export const navLinks = [
  { num: '01', label: 'About', href: '#build' },
  { num: '02', label: 'Skills', href: '#skills' },
  { num: '03', label: 'Projects', href: '#projects' },
  { num: '04', label: 'Papers', href: '#papers' },
]

export const buildCards = [
  {
    icon: '🤖',
    title: 'AI Tooling',
    desc: 'MCP servers, AI agents, and developer tools bridging AI models with production workflows.',
    tags: ['MCP', 'Python', 'TypeScript'],
  },
  {
    icon: '⚙️',
    title: 'Full-Stack Apps',
    desc: 'End-to-end applications with modern frontends, robust backends, and scalable infrastructure.',
    tags: ['React', 'Vue', 'FastAPI'],
  },
  {
    icon: '💻',
    title: 'Open Source',
    desc: '43+ repositories contributing to the developer ecosystem, used by developers worldwide.',
    tags: ['GitHub', 'NPM', 'PyPI'],
  },
]

export const stats = [
  { value: 43, suffix: '+', label: 'repos' },
  { value: 80, suffix: '+', label: 'stars' },
  { value: 6, suffix: '', label: 'languages' },
  { value: 2, suffix: '', label: 'papers' },
]

export const techStack = [
  { category: 'Languages', tags: ['Python', 'TypeScript', 'JavaScript', 'Swift', 'Rust', 'Java'] },
  { category: 'Frontend', tags: ['Vue 3', 'React', 'TailwindCSS'] },
  { category: 'Backend', tags: ['FastAPI', 'Node.js', 'Spring Boot', 'Django'] },
  { category: 'Infrastructure', tags: ['Docker', 'Kubernetes', 'GitHub Actions'] },
  { category: 'AI / ML', tags: ['PyTorch', 'GNN', 'MCP Protocol', 'Deep Learning'] },
  { category: 'Databases', tags: ['MySQL', 'MongoDB', 'Redis', 'PostgreSQL'] },
]

export interface Project {
  name: string
  desc: string
  tech: string[]
  stars?: number
  url: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: 'mcp-server-sequential-thinking',
    desc: 'MCP server enabling structured sequential thinking capabilities for AI agents. Provides a protocol for step-by-step reasoning and decision-making.',
    tech: ['JavaScript', 'MCP Protocol', 'Node.js'],
    stars: 42,
    url: 'https://github.com/zengwenliang416/mcp-server-sequential-thinking',
    featured: true,
  },
  {
    name: 'claude-notifier',
    desc: 'macOS native notification tool for Claude Code. Alerts developers when long-running AI tasks complete via system notifications.',
    tech: ['Swift', 'macOS', 'Notifications API'],
    stars: 17,
    url: 'https://github.com/zengwenliang416/claude-notifier',
    featured: true,
  },
  {
    name: 'banana-image-mcp',
    desc: 'MCP server for AI-powered image generation and processing pipelines.',
    tech: ['Python', 'MCP'],
    stars: 11,
    url: 'https://github.com/zengwenliang416/banana-image-mcp',
  },
  {
    name: 'IWSS',
    desc: 'Intelligent waste classification system using deep learning for automatic recognition.',
    tech: ['Python', 'Deep Learning', 'CV'],
    stars: 8,
    url: 'https://github.com/zengwenliang416/IWSS',
  },
  {
    name: 'Mermaid_General_Pic',
    desc: 'Web app converting Mermaid diagrams to images with live preview and multi-format export.',
    tech: ['Vue 3', 'Node.js'],
    stars: 1,
    url: 'https://github.com/zengwenliang416/Mermaid_General_Pic',
  },
  {
    name: '12306QueryMaster',
    desc: 'Modern train ticket query system with real-time scheduling data.',
    tech: ['FastAPI', 'Vue 3'],
    stars: 1,
    url: 'https://github.com/zengwenliang416/12306QueryMaster',
  },
  {
    name: 'AI-Cloth',
    desc: 'Deep learning clothing recommendation system matching personal style.',
    tech: ['Python', 'Deep Learning'],
    stars: 2,
    url: 'https://github.com/zengwenliang416/AI-Cloth',
  },
  {
    name: 'ClosetCutie-API',
    desc: 'High-performance backend API built with Rust for clothing management.',
    tech: ['Rust', 'REST API'],
    url: 'https://github.com/zengwenliang416/ClosetCutie-API',
  },
]

export const publications = [
  {
    title: 'GDilatedDTA',
    desc: 'Drug-target binding affinity prediction using graph dilated convolution networks. Novel GNN + dilated convolution architecture for molecular interaction modeling.',
  },
  {
    title: 'ParaCPI',
    desc: 'Parallel graph convolutional network for compound-protein interaction prediction. A parallel GCN framework improving prediction accuracy in drug discovery.',
  },
]
