import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Locale, LocaleContent } from './types'
import { en } from './en'
import { zh } from './zh'

const locales: Record<Locale, LocaleContent> = { en, zh }

interface LocaleContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: LocaleContent
}

const LocaleContext = createContext<LocaleContextValue>(null!)

function getInitialLocale(): Locale {
  const saved = localStorage.getItem('locale')
  if (saved === 'en' || saved === 'zh') return saved
  return navigator.language.startsWith('zh') ? 'zh' : 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('locale', l)
  }

  useEffect(() => {
    const t = locales[locale]
    document.documentElement.lang = locale
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: locales[locale] }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
