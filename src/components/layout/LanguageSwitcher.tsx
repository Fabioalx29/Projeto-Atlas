import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type Language } from '../../i18n'

const LANGUAGE_META: Record<Language, { short: string; name: string }> = {
  pt: { short: 'PT', name: 'Português' },
  en: { short: 'EN', name: 'English' },
  ja: { short: '日本語', name: '日本語' },
}

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage

  return (
    <div
      role="group"
      aria-label={t('a11y.language')}
      className="inline-flex items-center rounded-full border border-line bg-surface p-0.5"
    >
      {SUPPORTED_LANGUAGES.map((lng) => {
        const active = current === lng
        return (
          <button
            key={lng}
            type="button"
            lang={lng}
            aria-pressed={active}
            aria-label={LANGUAGE_META[lng].name}
            onClick={() => void i18n.changeLanguage(lng)}
            className={[
              'rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
              active ? 'bg-forest text-ivory' : 'text-forest-soft hover:text-forest',
            ].join(' ')}
          >
            {LANGUAGE_META[lng].short}
          </button>
        )
      })}
    </div>
  )
}
