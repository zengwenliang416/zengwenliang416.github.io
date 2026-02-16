export type Locale = 'en' | 'zh'

export interface LocaleContent {
  nav: {
    links: { label: string; href: string }[]
    contact: string
  }
  hero: {
    greeting: string
    chineseName?: string
    roles: string[]
    description: string
    stats: { value: number; suffix: string; label: string }[]
  }
  projects: {
    heading: [string, string]
    counter: (n: number) => string
    moreHeading: string
    featuredLabel: string
    items: Record<string, { title: string; desc: string }>
  }
  techStack: {
    heading: [string, string]
  }
  publications: {
    heading: [string, string]
    items: Record<string, { desc: string }>
  }
  contact: {
    eyebrow: string
    heading: [string, string]
    description: string
    emailBtn: string
    githubBtn: string
  }
  footer: {
    builtBy: string
    builtBySuffix: string
  }
  meta: {
    title: string
    description: string
  }
}
