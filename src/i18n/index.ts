import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import pt from './locales/pt.json'
import en from './locales/en.json'
import ja from './locales/ja.json'

export const SUPPORTED_LANGUAGES = ['pt', 'en', 'ja'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]

const STORAGE_KEY = 'atlas-language'
const DEFAULT_LANGUAGE: Language = 'pt'

function isSupported(value: string | null | undefined): value is Language {
  return !!value && (SUPPORTED_LANGUAGES as readonly string[]).includes(value)
}

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isSupported(stored)) return stored
  } catch {
    // localStorage pode estar indisponível (modo privado, etc.)
  }
  const browser = navigator.language?.slice(0, 2).toLowerCase()
  return isSupported(browser) ? browser : DEFAULT_LANGUAGE
}

void i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
    ja: { translation: ja },
  },
  lng: getInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: [...SUPPORTED_LANGUAGES],
  interpolation: { escapeValue: false }, // React já escapa os valores
})

// Mantém o atributo lang do <html> e a preferência salva em sincronia
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    // ignorado
  }
})
document.documentElement.lang = i18n.language

export default i18n
