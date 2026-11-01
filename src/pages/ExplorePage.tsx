import { lazy, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import SearchField from '../components/explore/SearchField'
import CategoryFilter from '../components/explore/CategoryFilter'
import ContinentFilter from '../components/explore/ContinentFilter'
import EmptyResults from '../components/explore/EmptyResults'
import ViewToggle from '../components/explore/ViewToggle'
import MapFrame from '../components/map/MapFrame'
import DestinationCard from '../components/destinations/DestinationCard'
import { DESTINATIONS } from '../data/destinations'
import { filterDestinations } from '../features/destinations/filterDestinations'
import { useExploreFilters } from '../features/destinations/useExploreFilters'
import { usePageMeta } from '../lib/usePageMeta'
import type { Destination } from '../types/destination'

// Carregado sob demanda: o Leaflet só entra no bundle quando o mapa é exibido
const ExploreMap = lazy(() => import('../features/map/ExploreMap'))

export default function ExplorePage() {
  const { t } = useTranslation()
  usePageMeta(t('meta.explore.title'), t('meta.explore.description'))
  const {
    query,
    setQuery,
    category,
    setCategory,
    continent,
    setContinent,
    view,
    setView,
    clearFilters,
    hasFilters,
  } = useExploreFilters()

  // Texto pesquisável no idioma atual: nome, país e descrição
  const getSearchText = useCallback(
    ({ id }: Destination) =>
      [
        t(`destinations.${id}.name`),
        t(`destinations.${id}.country`),
        t(`destinations.${id}.description`),
      ].join(' '),
    [t],
  )

  const results = useMemo(
    () => filterDestinations(DESTINATIONS, { query, category, continent }, getSearchText),
    [query, category, continent, getSearchText],
  )

  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        id="explore-title"
        as="h1"
        eyebrow={t('explore.eyebrow')}
        title={t('explore.title')}
        subtitle={t('explore.subtitle')}
      />

      <div className="mt-10 space-y-5">
        <SearchField value={query} onChange={setQuery} />
        <CategoryFilter selected={category} onChange={setCategory} />
        <ContinentFilter selected={continent} onChange={setContinent} />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <p role="status" aria-live="polite" className="text-sm text-ink-muted">
            {t('explore.results', { count: results.length })}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-semibold text-forest underline-offset-4 hover:text-gold-deep hover:underline"
            >
              {t('explore.clearFilters')}
            </button>
          )}
        </div>
        <ViewToggle value={view} onChange={setView} />
      </div>

      <div className="mt-6">
        {results.length === 0 ? (
          <EmptyResults onClear={clearFilters} />
        ) : view === 'map' ? (
          <MapFrame
            label={t('map.exploreLabel', { count: results.length })}
            className="h-[28rem] sm:h-[34rem] lg:h-[38rem]"
          >
            <ExploreMap destinations={results} />
          </MapFrame>
        ) : (
          <ul className="grid auto-rows-[20rem] gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((destination) => (
              <li key={destination.id} className="min-h-0">
                <DestinationCard destination={destination} showCategories headingLevel="h2" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  )
}
