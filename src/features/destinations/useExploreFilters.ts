import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { CategoryId, Continent } from '../../types/destination'
import { isCategoryId, isContinent } from './filterDestinations'

const URL_DEBOUNCE_MS = 250

export type ExploreView = 'list' | 'map'

/**
 * Estado de pesquisa, categoria e continente da página Explorar, sincronizado com a URL:
 * `?q=termo&category=nature&continent=asia`.
 *
 * - A categoria vem direto da URL.
 * - O texto digitado fica em estado local (digitação fluida, inclusive com IME
 *   japonês) e é gravado na URL após uma pausa curta, sem poluir o histórico.
 * - Mudanças externas da URL (botão voltar, links) atualizam o campo.
 */
export function useExploreFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlQuery = searchParams.get('q') ?? ''
  const categoryParam = searchParams.get('category')
  const category: CategoryId | null = isCategoryId(categoryParam) ? categoryParam : null
  const continentParam = searchParams.get('continent')
  const continent: Continent | null = isContinent(continentParam) ? continentParam : null

  const view: ExploreView = searchParams.get('view') === 'map' ? 'map' : 'list'

  const [query, setQuery] = useState(urlQuery)
  const lastSynced = useRef(urlQuery)

  // URL → campo
  useEffect(() => {
    if (urlQuery !== lastSynced.current) {
      lastSynced.current = urlQuery
      setQuery(urlQuery)
    }
  }, [urlQuery])

  // campo → URL (com atraso)
  useEffect(() => {
    const term = query.trim()
    if (term === urlQuery) return

    const timer = window.setTimeout(() => {
      lastSynced.current = term
      setSearchParams(
        (previous) => {
          const next = new URLSearchParams(previous)
          if (term) next.set('q', term)
          else next.delete('q')
          return next
        },
        { replace: true },
      )
    }, URL_DEBOUNCE_MS)

    return () => window.clearTimeout(timer)
  }, [query, urlQuery, setSearchParams])

  function setCategory(next: CategoryId | null) {
    const term = query.trim()
    lastSynced.current = term
    setSearchParams((previous) => {
      const params = new URLSearchParams(previous)
      if (term) params.set('q', term)
      else params.delete('q')
      if (next) params.set('category', next)
      else params.delete('category')
      return params
    })
  }

  function setContinent(next: Continent | null) {
    const term = query.trim()
    lastSynced.current = term
    setSearchParams((previous) => {
      const params = new URLSearchParams(previous)
      if (term) params.set('q', term)
      else params.delete('q')
      if (next) params.set('continent', next)
      else params.delete('continent')
      return params
    })
  }

  function setView(next: ExploreView) {
    setSearchParams(
      (previous) => {
        const params = new URLSearchParams(previous)
        if (next === 'map') params.set('view', 'map')
        else params.delete('view')
        return params
      },
      { replace: true },
    )
  }

  function clearFilters() {
    lastSynced.current = ''
    setQuery('')
    // Limpa pesquisa, categoria e continente, mas mantém a visualização escolhida (lista ou mapa)
    setSearchParams(view === 'map' ? { view: 'map' } : {})
  }

  return {
    query,
    setQuery,
    category,
    setCategory,
    continent,
    setContinent,
    view,
    setView,
    clearFilters,
    hasFilters: query.trim() !== '' || category !== null || continent !== null,
  }
}
