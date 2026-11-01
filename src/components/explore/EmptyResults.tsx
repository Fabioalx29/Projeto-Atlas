import { SearchX } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface EmptyResultsProps {
  onClear: () => void
}

export default function EmptyResults({ onClear }: EmptyResultsProps) {
  const { t } = useTranslation()

  return (
    <div className="rounded-card border border-dashed border-line bg-surface px-6 py-16 text-center">
      <SearchX size={40} strokeWidth={1.25} className="mx-auto text-gold-deep" aria-hidden="true" />
      <h2 className="mt-4 text-2xl font-semibold">{t('explore.emptyTitle')}</h2>
      <p className="mx-auto mt-2 max-w-md text-ink-muted">{t('explore.emptyText')}</p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 rounded-control bg-forest px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-forest-soft"
      >
        {t('explore.clearFilters')}
      </button>
    </div>
  )
}
