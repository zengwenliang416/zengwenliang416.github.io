# Coding Conventions Reference

## TypeScript Configuration

### Compiler Settings
- **Target**: ES2020 (modern JavaScript features)
- **Module**: ESNext with bundler resolution
- **JSX**: `react-jsx` (automatic runtime, no React imports needed)
- **Strict Mode**: Enabled
- **Unused Checks**: Disabled (`noUnusedLocals`/`noUnusedParameters` = false)
- **Build**: `noEmit: true` (Vite handles compilation)

### Type Safety
- Full TypeScript coverage required
- Strict mode enforced for type checking
- Typed i18n content via `LocaleContent` interface
- Use type inference where possible, explicit types for props/state

## React Patterns

### Component Structure
- **Functional components only**: No class components
- **Hooks-based state management**: `useState`, `useEffect`, `useContext`, `useRef`
- **No prop spreading**: Explicit prop declarations
- **Default exports**: Components use default export pattern

### i18n Integration
```typescript
// Pattern 1: Basic usage
const { locale, setLocale, t } = useLocale()

// Pattern 2: Dynamic content access
t.projects.items[project.name]

// Pattern 3: Optional chaining with fallback
{tr?.title ?? project.name}

// Pattern 4: Conditional rendering for locale-specific fields
{t.hero.chineseName && <p>{t.hero.chineseName}</p>}
```

### Context API
- Single `LocaleProvider` wraps entire app (App.tsx line 13)
- Custom `useLocale()` hook for i18n access
- No nested context providers
- Context initialization via localStorage → browser language → fallback

## Styling Conventions

### TailwindCSS Architecture
- **Utility-first approach**: No CSS modules or styled-components
- **Responsive design**: Mobile-first with `md:`, `lg:` breakpoints
- **Custom utilities defined in index.css**:
  - Text gradients: `.text-gradient-coral`, `.text-gradient-lime`, `.text-gradient-multi`
  - Noise overlay: `.noise-overlay::before`
- **Group hover pattern**: `group` + `group-hover:*` for coordinated child states
- **Conditional classes**: Template literals for dynamic styling

### Design Tokens
```javascript
// Colors
dark: '#0A0A0A'              // Background
coral: '#FF3C5F'              // Primary accent
lime: '#BEFF00'               // Secondary accent
indigo: '#6C63FF'             // Tertiary accent
text-primary: '#FAFAFA'       // High contrast
text-secondary: '#888888'     // Medium contrast
text-muted: '#555555'         // Low contrast

// Fonts
font-sans: Inter + Noto Sans SC    // Body text (Chinese support)
font-mono: JetBrains Mono          // Code/technical
font-display: Space Grotesk        // Headings/hero
```

### Responsive Patterns
```html
<!-- Hide on mobile -->
<nav className="hidden md:flex">

<!-- Custom cursor desktop-only -->
<div className="hidden md:block">

<!-- Disable native cursor -->
<main className="md:cursor-none">
```

## Animation System

### Framer Motion Patterns

#### 1. Shared Easing Curve
```typescript
ease: [0.16, 1, 0.3, 1]  // Expo-out-like deceleration
```
Used in: Navigation, Hero, RevealOnScroll

#### 2. Variant System
```typescript
// Declarative animation states
const letterVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.5 + i * 0.04, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  })
}

// Usage
<motion.span
  custom={i}
  variants={letterVariants}
  initial="hidden"
  animate="visible"
/>
```

#### 3. Scroll-Triggered Animations
```typescript
// RevealOnScroll wrapper pattern
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-60px' }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
>
```

#### 4. Hover States
```typescript
// Button interactions
whileHover={{ scale: 1.03 }}
whileTap={{ scale: 0.98 }}

// Card lift
whileHover={{ y: -4 }}
```

#### 5. Staggered Animations
```typescript
// Navigation links: 0.1s intervals
transition={{ delay: 0.1 * i + 0.3 }}

// Project cards: 0.08s intervals
<ProjectCard delay={i * 0.08} />
```

### CSS Animations

#### Custom Keyframes (index.css)
- **gradient-shift** (8s loop): Multi-color gradient animation
- **marquee / marquee-reverse** (30s linear): Infinite horizontal scroll
- **float** (20-25s ease-in-out): 3D-like floating with translate + rotate
- **noise** (8s steps): Film grain texture animation

#### Performance Patterns
- `once: true` on scroll animations (no repeated work)
- `IntersectionObserver` for viewport-aware triggers
- `requestAnimationFrame` for smooth cursor tracking (not CSS transitions)

## File Organization

### Directory Structure
```
src/
├── components/           # Page-level components
│   ├── Hero.tsx          # Landing section
│   ├── Navigation.tsx    # Fixed header
│   ├── Projects.tsx      # Portfolio showcase
│   ├── TechMarquee.tsx   # Tech stack animation
│   ├── Publications.tsx  # Academic papers
│   ├── Contact.tsx       # CTA section
│   ├── Footer.tsx        # Site credits
│   └── CustomCursor.tsx  # Custom cursor
├── components/ui/        # Reusable utilities
│   ├── CountUp.tsx       # Number counter animation
│   ├── RevealOnScroll.tsx # Scroll reveal wrapper
│   ├── MagneticButton.tsx (unused)
│   └── TextScramble.tsx  (unused)
├── i18n/                 # Internationalization
│   ├── types.ts          # LocaleContent interface
│   ├── en.ts             # English translations
│   ├── zh.ts             # Chinese translations
│   └── LocaleContext.tsx # Context provider + useLocale hook
├── data/                 # Content & configuration
│   └── content.ts        # siteConfig, techStack, projects, publications
├── App.tsx               # Main application layout
├── main.tsx              # React 18 entry point
└── index.css             # Global styles + custom utilities
```

### Import Conventions
```typescript
// React core
import { useState, useEffect, type ReactNode } from 'react'

// Third-party
import { motion } from 'framer-motion'

// Local components
import Navigation from './components/Navigation'
import { useLocale } from './i18n/LocaleContext'

// Data
import { projects } from './data/content'
```

## Naming Conventions

### Components & Files
- **PascalCase** for component files: `Hero.tsx`, `CustomCursor.tsx`, `RevealOnScroll.tsx`
- **PascalCase** for component names: `export default function Hero() { ... }`
- **camelCase** for utility files: `content.ts`, `types.ts`

### Functions & Variables
- **camelCase** for functions: `getInitialLocale()`, `setLocale()`
- **camelCase** for variables: `const letterVariants = { ... }`
- **camelCase** for state: `const [locale, setLocale] = useState()`

### Types & Interfaces
- **PascalCase** for types: `type Locale = 'en' | 'zh'`
- **PascalCase** for interfaces: `interface LocaleContent { ... }`
- **Props suffix** for component props: `interface CountUpProps { ... }`

### Constants
- **camelCase** for exported data: `export const siteConfig`, `export const techStack`
- **UPPER_SNAKE_CASE** not used in this codebase

## Data Architecture

### Separation of Concerns
```typescript
// content.ts: Structural data (URLs, metadata, technical tags)
export const projects: Project[] = [
  {
    name: 'sequential-thinking',  // Key for i18n lookup
    tech: ['Python', 'FastAPI'],
    url: 'https://github.com/...',
    accent: 'coral',
    gradient: ['#FF3C5F', '#FF8A5C']
  }
]

// i18n/*.ts: User-facing text
projects: {
  items: {
    'sequential-thinking': {
      title: 'Sequential Thinking',
      desc: 'Advanced reasoning framework...'
    }
  }
}
```

### Key-Based Linking
- Use `name` or `title` as bridge between data and i18n
- Pattern: `t.projects.items[project.name]`
- Fallback: `tr?.title ?? project.name`

## Best Practices

### Performance
- Single context provider (no nested providers)
- Translations loaded statically (no async)
- `once: true` on scroll animations
- `IntersectionObserver` for viewport triggers
- `requestAnimationFrame` for 60fps cursor

### Accessibility
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`
- `document.documentElement.lang` updates on locale change
- Keyboard-friendly navigation (anchor-based, no JS routing)

### Type Safety
- Full TypeScript coverage
- Typed i18n content via `LocaleContent`
- Compile-time verification of translation completeness
- Optional fields for locale-specific data: `chineseName?: string`

### Maintainability
- Clear separation: components/ vs. ui/ vs. i18n/ vs. data/
- Single-responsibility components
- No over-engineering (zero-dependency i18n, no router)
- Minimal dependencies (React, Framer Motion, TailwindCSS only)

### Anti-Patterns to Avoid
- ❌ Class components
- ❌ CSS Modules or styled-components
- ❌ Prop spreading
- ❌ Three.js (dependencies present but unused)
- ❌ Unused components (MagneticButton, TextScramble)
- ❌ Complex state management libraries (Context API sufficient)
- ❌ External i18n libraries (custom implementation preferred)
