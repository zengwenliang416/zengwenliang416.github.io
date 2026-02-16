# i18n System Architecture

## Overview

Zero-dependency internationalization system using React Context API. Supports English and Chinese with type-safe translations and persistent user preferences.

## Core Components

### Type System (`src/i18n/types.ts`)

**Locale Type**
```typescript
type Locale = 'en' | 'zh'
```

**LocaleContent Interface**
Complete type definition for all translatable content:
```typescript
interface LocaleContent {
  nav: { links: { label: string; href: string }[]; contact: string }
  hero: {
    greeting: string
    chineseName?: string  // Locale-specific optional field
    roles: string[]
    description: string
    stats: { value: number; suffix: string; label: string }[]
  }
  projects: {
    heading: [string, string]  // Multi-part heading
    counter: (n: number) => string  // Function translation
    moreHeading: string
    featuredLabel: string
    items: Record<string, { title: string; desc: string }>  // Key-based lookup
  }
  techStack: { heading: [string, string] }
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
    builtBySuffix: string  // Word order flexibility
  }
  meta: { title: string; description: string }
}
```

### Context Provider (`src/i18n/LocaleContext.tsx`)

**Context Value**
```typescript
interface LocaleContextValue {
  locale: Locale                    // Current locale
  setLocale: (l: Locale) => void   // Locale switcher
  t: LocaleContent                  // Translated content
}
```

**Locale Initialization Priority**
1. `localStorage['locale']` - User preference
2. `navigator.language.startsWith('zh')` - Browser detection
3. Default fallback: `'en'`

**Side Effects on Locale Change**
- `document.documentElement.lang = locale` - HTML lang attribute
- `document.title = t.meta.title` - Page title
- `meta[name="description"]` content - SEO metadata

**Persistence**
Locale saved to `localStorage` on every change, survives browser refresh.

### Translation Files

**`src/i18n/en.ts`** and **`src/i18n/zh.ts`**
Both export `LocaleContent` objects with:
- Identical structure (full type safety)
- Key parity across locales
- Locale-specific optional fields (e.g., `chineseName` only in Chinese)
- Word order flexibility via split fields (e.g., `builtBy` + `builtBySuffix`)

## Data-i18n Separation

### Structural Data (`src/data/content.ts`)
- **siteConfig**: Name, email, GitHub URL (language-agnostic)
- **techStack**: Array of technology names (no translation)
- **projects**: Project metadata with unique `name` keys
- **publications**: Publication metadata with `title` keys

### Translation Lookup Pattern
Projects and publications use `name`/`title` as keys:
```typescript
const tr = t.projects.items[project.name]  // { title: string, desc: string }
```

### Fallback Strategy
Optional chaining with default values:
```typescript
{tr?.title ?? project.name}  // Use translation or fall back to key
```

## Consumption Pattern

### Provider Setup
Wrap app root with `LocaleProvider`:
```tsx
<LocaleProvider>
  {/* All components */}
</LocaleProvider>
```

### Component Usage
Access translations via `useLocale` hook:
```tsx
const { locale, setLocale, t } = useLocale()

// Static translation
<h1>{t.hero.greeting}</h1>

// Optional locale-specific field
{t.hero.chineseName && <p>{t.hero.chineseName}</p>}

// Function translation
<span>{t.projects.counter(projects.length)}</span>

// Dynamic key lookup
const tr = t.projects.items[project.name]
<h2>{tr?.title ?? project.name}</h2>

// Locale toggle
<button onClick={() => setLocale(locale === 'en' ? 'zh' : 'en')}>
  {locale === 'en' ? '中' : 'EN'}
</button>
```

## Technical Characteristics

### Zero Dependencies
- No i18next, react-i18next, or external libraries
- Custom implementation using React Context API
- Minimal bundle size impact

### Type Safety
- Full TypeScript coverage for all translations
- Compile-time verification of translation completeness
- IDE autocomplete for translation keys

### Performance
- Single context provider (no nested providers)
- Translations loaded statically (no async loading)
- No re-renders except on locale change

### SEO Integration
Automatic meta tag updates on locale change:
- HTML lang attribute
- Page title
- Meta description
