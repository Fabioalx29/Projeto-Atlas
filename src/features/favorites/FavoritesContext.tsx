import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from '../../components/ui/Toast'
import { getDestinationById } from '../../data/destinations'
import { usePersistedState } from '../../lib/usePersistedState'
import { FAVORITES_STORAGE_KEY, parseFavoriteIds } from './favoritesStorage'

interface FavoritesContextValue {
  /** Ids dos favoritos, do mais antigo para o mais recente (sem duplicados). */
  favorites: readonly string[]
  count: number
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  /** `true` se não foi possível gravar no navegador (os dados valem só nesta sessão). */
  storageError: boolean
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

const parse = (raw: unknown) =>
  parseFavoriteIds(raw, (id) => getDestinationById(id) !== undefined)
const createInitial = (): string[] => []

/** Fonte única dos favoritos: todas as páginas e cards leem o mesmo estado. */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const { showToast } = useToast()
  const { value, setValue, writeFailed } = usePersistedState(
    FAVORITES_STORAGE_KEY,
    parse,
    createInitial,
  )

  const isFavorite = useCallback((id: string) => value.includes(id), [value])

  const toggleFavorite = useCallback(
    (id: string) => {
      if (getDestinationById(id) === undefined) return
      const name = t(`destinations.${id}.name`)
      if (value.includes(id)) {
        setValue((current) => current.filter((item) => item !== id))
        showToast(t('favorites.removed', { name }))
      } else {
        // O filtro impede duplicados mesmo em cliques rápidos
        setValue((current) => (current.includes(id) ? current : [...current, id]))
        showToast(t('favorites.added', { name }))
      }
    },
    [value, setValue, showToast, t],
  )

  const removeFavorite = useCallback(
    (id: string) => {
      if (!value.includes(id)) return
      setValue((current) => current.filter((item) => item !== id))
      showToast(t('favorites.removed', { name: t(`destinations.${id}.name`) }))
    },
    [value, setValue, showToast, t],
  )

  const context = useMemo<FavoritesContextValue>(
    () => ({
      favorites: value,
      count: value.length,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      storageError: writeFailed,
    }),
    [value, isFavorite, toggleFavorite, removeFavorite, writeFailed],
  )

  return <FavoritesContext.Provider value={context}>{children}</FavoritesContext.Provider>
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites deve ser usado dentro de <FavoritesProvider>')
  return context
}
