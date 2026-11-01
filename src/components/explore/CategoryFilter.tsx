import { useTranslation } from 'react-i18next'
import { CATEGORY_ICONS } from '../../lib/categoryIcons'
import { CATEGORY_IDS, type CategoryId } from '../../types/destination'

interface CategoryFilterProps {
  selected: CategoryId | null
  onChange: (category: CategoryId | null) => void
}

const CHIP_BASE =
  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium'
const CHIP_ACTIVE = 'border-forest bg-forest text-ivory'
const CHIP_IDLE = 'border-line bg-surface text-forest-soft hover:border-forest hover:text-forest'

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const { t } = useTranslation()

  return (
    <div role="group" aria-label={t('explore.categoryLabel')} className="flex flex-wrap gap-2">
      <button
        type="button"
        aria-pressed={selected === null}
        onClick={() => onChange(null)}
        className={`${CHIP_BASE} ${selected === null ? CHIP_ACTIVE : CHIP_IDLE}`}
      >
        {t('explore.all')}
      </button>

      {CATEGORY_IDS.map((id) => {
        const Icon = CATEGORY_ICONS[id]
        const active = selected === id
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            // Clicar na categoria já selecionada remove o filtro
            onClick={() => onChange(active ? null : id)}
            className={`${CHIP_BASE} ${active ? CHIP_ACTIVE : CHIP_IDLE}`}
          >
            <Icon size={16} aria-hidden="true" />
            {t(`categories.${id}.name`)}
          </button>
        )
      })}
    </div>
  )
}
