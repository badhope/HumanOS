/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { translations, type Language, type TranslationKeys } from './translations'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations[Language]
  dir: 'ltr' | 'rtl'
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('humanos-language') as Language
      if (saved && translations[saved]) return saved
    }
    return 'zh'
  })

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('humanos-language', lang)
      document.documentElement.lang = lang
      document.documentElement.dir = 'ltr'
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value: I18nContextType = {
    language,
    setLanguage,
    t: translations[language],
    dir: 'ltr',
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export function useTranslation() {
  const { t, language, setLanguage } = useI18n()
  return { t, language, setLanguage }
}

export { I18nContext }
