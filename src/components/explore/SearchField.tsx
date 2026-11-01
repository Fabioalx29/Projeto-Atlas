import { useId } from 'react'
import { Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface SearchFieldProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchField({ value, onChange }: SearchFieldProps) {
  const { t } = useTranslation()
  const inputId = useId()

  return (
    <form role="search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor={inputId} className="sr-only">
        {t('explore.searchLabel')}
      </label>
      <div className="flex items-center gap-3 rounded-card border border-line bg-surface px-4 shadow-card focus-within:border-forest focus-within:ring-2 focus-within:ring-forest">
        <Search size={20} className="shrink-0 text-ink-muted" aria-hidden="true" />
        <input
          id={inputId}
          type="text"
          inputMode="search"
          enterKeyHint="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t('explore.searchPlaceholder')}
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-4 text-base text-forest placeholder:text-ink-muted focus-visible:outline-none"
        />
        {value !== '' && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label={t('explore.clearSearch')}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-ivory hover:text-forest"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  )
}
