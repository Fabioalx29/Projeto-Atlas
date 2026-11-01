import { useTranslation } from 'react-i18next'
import FavoriteButton from './FavoriteButton'
import { useFavorites } from './FavoritesContext'

interface FavoriteToggleProps {
  /** `id` do destino. */
  id: string
  size?: 'sm' | 'md'
  showLabel?: boolean
}

/** Botão de favorito ligado ao estado global: igual em cards, detalhes e listas. */
export default function FavoriteToggle({ id, size, showLabel }: FavoriteToggleProps) {
  const { t } = useTranslation()
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <FavoriteButton
      pressed={isFavorite(id)}
      onToggle={() => toggleFavorite(id)}
      name={t(`destinations.${id}.name`)}
      size={size}
      showLabel={showLabel}
    />
  )
}
