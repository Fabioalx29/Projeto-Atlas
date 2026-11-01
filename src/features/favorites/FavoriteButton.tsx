import { useState } from 'react'
import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface FavoriteButtonProps {
  pressed: boolean
  onToggle: () => void
  /** Nome do destino, usado no rótulo acessível do botão só com ícone. */
  name: string
  size?: 'sm' | 'md'
  /** Mostra o texto ("Favoritar" / "Nos favoritos") ao lado do coração. */
  showLabel?: boolean
}

/**
 * Botão de favorito controlado: não conhece o armazenamento, só recebe
 * `pressed` e `onToggle` (veja `FavoriteToggle`, que o liga aos favoritos reais).
 */
export default function FavoriteButton({
  pressed,
  onToggle,
  name,
  size = 'md',
  showLabel = false,
}: FavoriteButtonProps) {
  const { t } = useTranslation()
  const [popping, setPopping] = useState(false)

  function handleClick() {
    // O "pulso" do coração só toca ao favoritar
    if (!pressed) setPopping(true)
    onToggle()
  }

  const shape = showLabel
    ? 'h-11 gap-2 px-4 text-sm font-medium'
    : size === 'sm'
      ? 'size-9'
      : 'size-11'

  return (
    <button
      type="button"
      onClick={handleClick}
      // Com texto visível, o próprio texto é o nome (e muda com o estado)
      {...(showLabel
        ? { title: pressed ? t('favorites.removeHint') : undefined }
        : { 'aria-pressed': pressed, 'aria-label': t('favorites.toggleLabel', { name }) })}
      className={`inline-flex items-center justify-center rounded-full backdrop-blur ${shape} ${
        pressed ? 'bg-gold text-forest hover:bg-gold-deep' : 'bg-ivory/90 text-forest hover:bg-ivory'
      }`}
    >
      <Heart
        size={size === 'sm' ? 16 : 20}
        aria-hidden="true"
        fill={pressed ? 'currentColor' : 'none'}
        onAnimationEnd={() => setPopping(false)}
        className={popping && pressed ? 'animate-heart-pop' : undefined}
      />
      {showLabel && (pressed ? t('favorites.saved') : t('favorites.add'))}
    </button>
  )
}
