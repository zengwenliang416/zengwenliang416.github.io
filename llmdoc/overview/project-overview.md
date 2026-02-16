# Project Overview

## Purpose
Personal portfolio website for Wenliang Zeng showcasing software engineering projects, technical skills, and academic publications with a bold, modern visual design.

## Tech Stack
- **Framework**: React 18.3.1 + TypeScript 5.7.2
- **Build Tool**: Vite 6.0.5
- **Styling**: TailwindCSS 3.4.17 + custom animations
- **Animation**: Framer Motion 11.15.0
- **3D Graphics**: Three.js 0.170.0 + React Three Fiber 8.17.10 (installed but unused in current implementation)

## Architecture
Single-page application (SPA) with section-based anchor navigation. No router library, no state management library, no i18n library—minimal dependency philosophy with custom implementations.

**Core Design Principles**:
- Zero-dependency i18n system using React Context
- Awwwards-style dark theme with bold contrasting colors
- Performance-optimized with font preloading and smooth animations
- Bilingual support (English/Chinese) with automatic locale detection

## Component Hierarchy
```
App.tsx
└── LocaleProvider (i18n context wrapper)
    ├── CustomCursor (desktop-only interactive cursor)
    ├── Navigation (scroll-aware fixed header)
    └── main (content sections)
        ├── Hero (landing section)
        ├── Projects (portfolio showcase)
        ├── TechMarquee (animated tech stack)
        ├── Publications (academic papers)
        ├── Contact (CTA section)
        └── Footer (site credits)
```

## File Structure
```
src/
├── components/
│   ├── CustomCursor.tsx      # Interactive cursor with easing animation
│   ├── Navigation.tsx         # Scroll-aware header with i18n toggle
│   ├── Hero.tsx              # Landing section
│   ├── Projects.tsx          # Portfolio showcase
│   ├── TechMarquee.tsx       # Infinite scrolling tech stack
│   ├── Publications.tsx      # Academic publications list
│   ├── Contact.tsx           # Call-to-action section
│   └── Footer.tsx            # Site footer
├── components/ui/
│   ├── Button.tsx            # Reusable button component
│   ├── MagneticButton.tsx    # ⚠️ Unused component
│   └── TextScramble.tsx      # ⚠️ Unused component
├── i18n/
│   ├── LocaleContext.tsx     # Zero-dependency i18n implementation
│   ├── types.ts              # TypeScript type definitions
│   ├── en.ts                 # English translations
│   └── zh.ts                 # Chinese translations
├── data/
│   └── content.ts            # Projects, tech stack, publications data
├── App.tsx                   # Main application component
├── main.tsx                  # React 18 bootstrapping
└── index.css                 # Global styles + custom animations
```

## Build & Deploy Pipeline
1. **Development**: Vite dev server with HMR at `localhost:5173`
2. **Build**: `npm run build` → TypeScript compilation + Vite bundling
3. **CI/CD**: GitHub Actions on push to `main`
   - Runs `npm ci` for clean install
   - Executes `npm run build` for production bundle
   - Deploys to `gh-pages` branch via peaceiris/actions-gh-pages@v4
4. **Hosting**: GitHub Pages at root (`/`) for username.github.io deployment

**Additional Workflow**: WakaTime metrics auto-update daily at 12am IST

## Key Design Decisions

### 1. No Router
Single-page layout with all sections in `App.tsx`, using anchor-based navigation (`#projects`, `#publications`, etc.). Navigation component renders links to section IDs.

### 2. Zero-Dependency i18n
Custom React Context implementation (`LocaleContext.tsx`) with:
- Locale detection: localStorage → navigator.language → fallback 'en'
- SEO metadata updates: `document.title` and `meta[name="description"]` on locale change
- Typed content structure with TypeScript interfaces

### 3. Minimal Dependencies
Only 16 total packages (8 production + 8 dev). No router, no state library, no i18n library, no testing framework.

### 4. Awwwards-Style Design System
**Color Palette**:
- Dark surfaces: `#0A0A0A` (dark), `#141414` (surface), `#1A1A1A` (card), `#262626` (border)
- Accent colors: `#FF3C5F` (coral), `#BEFF00` (lime), `#6C63FF` (indigo)
- Text hierarchy: `#FAFAFA` (primary), `#888888` (secondary), `#555555` (muted)

**Typography**:
- Sans: Inter + Noto Sans SC (bilingual support)
- Mono: JetBrains Mono (code/technical)
- Display: Space Grotesk (headings)

**Custom Effects**:
- Noise overlay: SVG fractal noise with 8s animation for film grain texture
- Custom cursor: Trailing ring + instant dot with easing (`cx += (mx - cx) * 0.12`)
- Gradient text: Animated 3-color gradients with `gradient-shift` keyframes
- Marquee: Infinite scrolling tech stack with `marquee` and `marquee-reverse`

### 5. Performance Optimizations
- Font preloading: Google Fonts preconnect in `index.html`
- Smooth scrolling: CSS `scroll-behavior: smooth`
- Custom cursor: MutationObserver for dynamic hover listener management
- Scroll-aware nav: Transparent → backdrop blur transition at 50px scroll

## Data Architecture

### Site Configuration (`src/data/content.ts`)
```typescript
siteConfig = {
  name: 'Wenliang Zeng',
  email: 'wenliang_zeng416@163.com',
  github: 'https://github.com/Zengwenliang0416'
}
```

### Tech Stack Array
28 technologies: Python, TypeScript, JavaScript, Swift, Rust, Java, React, Vue 3, TailwindCSS, FastAPI, Node.js, Spring Boot, PyTorch, GNN, MCP Protocol, Docker, Kubernetes, GitHub Actions, MySQL, MongoDB, Redis, PostgreSQL, Deep Learning, Django

### Projects Data
8 projects with 3 featured:
- Sequential Thinking (coral accent)
- Claude Notifier (lime accent)
- Banana Image (indigo accent)

Each project has: `name`, `tech[]`, `stars`, `url`, `featured`, `accent`, `gradient`, `image`

### Publications Data
Academic papers with: `title`, `journal`, `authors`, `doi`, `tags[]`

## Internationalization System

### Type-Safe Content Structure
```typescript
type Locale = 'en' | 'zh'

interface LocaleContent {
  nav: { links: { label: string; href: string }[], contact: string }
  hero: { greeting: string; chineseName?: string; roles: string[]; ... }
  projects: { heading: [string, string]; counter: (n: number) => string; ... }
  publications: { items: Record<string, { desc: string }> }
  meta: { title: string; description: string }
}
```

**Design Patterns**:
- Tuple headings: `[string, string]` for split emphasis (e.g., "Selected" + "Works")
- Optional fields: `chineseName?` only in Chinese locale
- Function content: `counter: (n: number) => string` for dynamic formatting
- Keyed items: Project-specific translations with `Record<string, { desc: string }>`

### Locale Toggle
Button in Navigation shows opposite language code (when EN, shows "中"). Click toggles between `en` and `zh`, updates localStorage, and triggers `useEffect` to update `document.lang` and SEO metadata.

## Unused Code
- **Three.js dependencies**: `@react-three/fiber`, `@react-three/drei`, `three` installed but not imported in any components
- **MagneticButton component**: `src/components/ui/MagneticButton.tsx` exists but unused
- **TextScramble component**: `src/components/ui/TextScramble.tsx` exists but unused

These may be for future features or removed during refactoring.

## Git Workflow
- **Convention**: Conventional Commits format (`feat:`, `fix:`)
- **Main branch**: `main`
- **Deploy branch**: `gh-pages` (auto-generated)
- **Base path**: `/` (root deployment for username.github.io)

**Recent Architectural Changes**:
- Base path changed from `/Zengwenliang0416/` to `/` for root deployment
- Added zero-dependency i18n system
- Redesigned with Awwwards-style bold contrasting colors
