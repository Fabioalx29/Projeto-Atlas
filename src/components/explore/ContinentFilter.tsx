import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CONTINENT_IDS, type Continent } from '../../types/destination'
import { isContinent } from '../../features/destinations/filterDestinations'

interface ContinentFilterProps {
  selected: Continent | null
  onChange: (continent: Continent | null) => void
}

/** Seletor de continente: compacto, com rótulo visível e nativo (acessível por teclado e leitor de tela). */
export default function ContinentFilter({ selected, onChange }: ContinentFilterProps) {
  const { t } = useTranslation()
  const id = useId()

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label htmlFor={id} className="text-sm font-medium text-forest-soft">
        {t('explore.continentLabel')}
      </label>
      <div className="relative">
        <select
          id={id}
          value={selected ?? ''}
          onChange={(event) => onChange(isContinent(event.target.value) ? event.target.value : null)}
          className="appearance-none rounded-full border border-line bg-surface py-2 pl-4 pr-10 text-sm font-medium text-forest hover:border-forest"
        >
          <option value="">{t('explore.allContinents')}</option>
          {CONTINENT_IDS.map((continent) => (
            <option key={continent} value={continent}>
              {t(`continents.${continent}`)}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
        />
      </div>
    </div>
  )
}
