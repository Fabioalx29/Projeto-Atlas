import { LayoutGrid, Map as MapIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ExploreView } from '../../features/destinations/useExploreFilters'

interface ViewToggleProps {
  value: ExploreView
  onChange: (view: ExploreView) => void
}

const OPTIONS = [
  { view: 'list', icon: LayoutGrid },
  { view: 'map', icon: MapIcon },
] as const

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  const { t } = useTranslation()

  return (
    <div
      role="group"
      aria-label={t('map.viewLabel')}
      className="inline-flex rounded-full border border-line bg-surface p-0.5"
    >
      {OPTIONS.map(({ view, icon: Icon }) => {
        const active = value === view
        return (
          <button
            key={view}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(view)}
            className={[
              'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium',
              active ? 'bg-forest text-ivory' : 'text-forest-soft hover:text-forest',
            ].join(' ')}
          >
            <Icon size={16} aria-hidden="true" />
            {t(view === 'list' ? 'map.listView' : 'map.mapView')}
          </button>
        )
      })}
    </div>
  )
}
