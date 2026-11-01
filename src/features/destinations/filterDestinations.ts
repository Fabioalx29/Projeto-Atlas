import {
  CATEGORY_IDS,
  CONTINENT_IDS,
  type CategoryId,
  type Continent,
  type Destination,
} from '../../types/destination'

export interface DestinationFilters {
  query: string
  category: CategoryId | null
  continent?: Continent | null
}

/** Minúsculas, sem espaços nas pontas e sem acentos latinos (ex.: "Japão" → "japao"). */
export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .normalize('NFC')
    .toLowerCase()
    .trim()
}

export function isCategoryId(value: string | null): value is CategoryId {
  return value !== null && (CATEGORY_IDS as readonly string[]).includes(value)
}

export function isContinent(value: string | null): value is Continent {
  return value !== null && (CONTINENT_IDS as readonly string[]).includes(value)
}

/**
 * Aplica pesquisa, categoria e continente em conjunto (E lógico).
 * `getSearchText` devolve o texto pesquisável do destino no idioma atual.
 */
export function filterDestinations(
  destinations: readonly Destination[],
  filters: DestinationFilters,
  getSearchText: (destination: Destination) => string,
): Destination[] {
  const term = normalizeText(filters.query)

  return destinations.filter((destination) => {
    if (filters.category && !destination.categories.includes(filters.category)) return false
    if (filters.continent && !destination.continents.includes(filters.continent)) return false
    if (term === '') return true
    return normalizeText(getSearchText(destination)).includes(term)
  })
}
