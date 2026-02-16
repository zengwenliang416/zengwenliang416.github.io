# i18n Guide

## Adding a New Translatable Section

### 1. Extend LocaleContent Interface
`src/i18n/types.ts`:
```typescript
export interface LocaleContent {
  // ... existing fields
  newSection: {
    heading: string
    description: string
  }
}
```

### 2. Add Translations to Both Locales
`src/i18n/en.ts`:
```typescript
export const en: LocaleContent = {
  // ... existing fields
  newSection: {
    heading: 'New Section',
    description: 'This is a new section.',
  }
}
```

`src/i18n/zh.ts`:
```typescript
export const zh: LocaleContent = {
  // ... existing fields
  newSection: {
    heading: '新章节',
    description: '这是一个新章节。',
  }
}
```

### 3. Use in Component
```tsx
const { t } = useLocale()
return <h2>{t.newSection.heading}</h2>
```

## Adding a New Locale

### 1. Update Locale Type
`src/i18n/types.ts`:
```typescript
export type Locale = 'en' | 'zh' | 'es'
```

### 2. Create Translation File
`src/i18n/es.ts`:
```typescript
import type { LocaleContent } from './types'

export const es: LocaleContent = {
  nav: { ... },
  hero: { ... },
  // ... implement all required fields
}
```

### 3. Register in Context
`src/i18n/LocaleContext.tsx`:
```typescript
import { es } from './es'

const locales: Record<Locale, LocaleContent> = { en, zh, es }
```

### 4. Update Initialization Logic
Add browser detection for new locale:
```typescript
function getInitialLocale(): Locale {
  const saved = localStorage.getItem('locale')
  if (saved === 'en' || saved === 'zh' || saved === 'es') return saved
  if (navigator.language.startsWith('zh')) return 'zh'
  if (navigator.language.startsWith('es')) return 'es'
  return 'en'
}
```

## Using Function Translations

### 1. Define Function in LocaleContent
`src/i18n/types.ts`:
```typescript
projects: {
  counter: (n: number) => string
}
```

### 2. Implement in Translation Files
`src/i18n/en.ts`:
```typescript
projects: {
  counter: (n) => `${n} projects`
}
```

`src/i18n/zh.ts`:
```typescript
projects: {
  counter: (n) => `${n} 个项目`
}
```

### 3. Call in Component
```tsx
const { t } = useLocale()
const projectCount = projects.length
return <span>{t.projects.counter(projectCount)}</span>
```

**Use Cases**:
- Dynamic counts with locale-specific formatting
- Pluralization rules
- Conditional text based on parameters

## Handling Locale-Specific Optional Fields

### 1. Define Optional Field
`src/i18n/types.ts`:
```typescript
hero: {
  greeting: string
  chineseName?: string  // Only present in Chinese
}
```

### 2. Implement in Relevant Locale
`src/i18n/zh.ts`:
```typescript
hero: {
  greeting: '你好，我是',
  chineseName: '曾文亮',
}
```

`src/i18n/en.ts`:
```typescript
hero: {
  greeting: "Hello, I'm",
  // chineseName omitted
}
```

### 3. Conditional Rendering
```tsx
const { t } = useLocale()
return (
  <>
    <p>{t.hero.greeting}</p>
    {t.hero.chineseName && <p>{t.hero.chineseName}</p>}
  </>
)
```

**Use Cases**:
- Locale-specific names or titles
- Cultural context that doesn't translate
- Layout differences between locales

## Accessing Translations in Components

### Basic Hook Usage
```tsx
import { useLocale } from '@/i18n/LocaleContext'

function MyComponent() {
  const { locale, setLocale, t } = useLocale()

  return (
    <div>
      <h1>{t.hero.greeting}</h1>
      <button onClick={() => setLocale(locale === 'en' ? 'zh' : 'en')}>
        Toggle Language
      </button>
    </div>
  )
}
```

### Dynamic Key Lookup
For translations stored in `Record<string, T>`:
```tsx
const { t } = useLocale()
const project = { name: 'ParaCPI' }
const tr = t.projects.items[project.name]

return (
  <>
    <h2>{tr?.title ?? project.name}</h2>
    <p>{tr?.desc}</p>
  </>
)
```

### Multi-Part Headings
For headings defined as `[string, string]`:
```tsx
const { t } = useLocale()
const [part1, part2] = t.projects.heading

return (
  <h1>
    <span>{part1}</span> <span>{part2}</span>
  </h1>
)
```

### Array Iteration
```tsx
const { t } = useLocale()

return (
  <ul>
    {t.nav.links.map((link) => (
      <li key={link.href}>
        <a href={link.href}>{link.label}</a>
      </li>
    ))}
  </ul>
)
```

## Best Practices

### Type Safety
- Always use `LocaleContent` type for new translation files
- TypeScript will enforce all required fields
- Use optional fields (`?`) only for locale-specific content

### Key Naming
- Use consistent naming across all locales
- Match `Record<string, T>` keys with data identifiers
- Example: `project.name` → `t.projects.items[project.name]`

### Fallback Strategy
- Always provide fallback for dynamic lookups: `tr?.title ?? defaultValue`
- Use optional chaining to avoid runtime errors
- Consider default values for missing translations

### Avoiding Redundancy
- Store language-agnostic data (URLs, numbers, tags) in `src/data/content.ts`
- Only store user-facing text in translation files
- Separate structural data from translatable content
