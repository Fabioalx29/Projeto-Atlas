import { Link } from 'react-router-dom'
import { ArrowRight, HeartOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ImageWithFallback from '../ui/ImageWithFallback'
import { commonsSrcSet } from '../../lib/commons'
import type { Destination } from '../../types/destination'

interface FavoriteItemProps {
  destination: Destination
  onRemove: (id: string) => void
}

/** Cartão da página de favoritos: foto, nome, país, descrição e as duas ações. */
export default function FavoriteItem({ destination, onRemove }: FavoriteItemProps) {
  const { t } = useTranslation()
  const { id, image } = destination
  const name = t(`destinations.${id}.name`)

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card">
      <Link to={`/destination/${id}`} tabIndex={-1} aria-hidden="true" className="block">
        <div className="aspect-[4/3] overflow-hidden bg-forest">
          <ImageWithFallback
            src={image.src}
            srcSet={commonsSrcSet(image.src, [480, 800])}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            alt=""
            className="size-full object-cover transition-transform duration-700 ease-(--ease-atlas) hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
          {t(`destinations.${id}.country`)}
        </p>
        <h2 className="mt-1 text-2xl font-semibold">{name}</h2>
        <p className="mt-2 line-clamp-3 text-sm text-ink-muted">
          {t(`destinations.${id}.description`)}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <Link
            to={`/destination/${id}`}
            className="inline-flex items-center gap-2 rounded-control bg-forest px-4 py-2 text-sm font-semibold text-ivory hover:bg-forest-soft"
          >
            {t('favorites.openDetails')}
            <span className="sr-only">: {name}</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => onRemove(id)}
            className="inline-flex items-center gap-2 rounded-control border border-line px-4 py-2 text-sm font-medium text-forest-soft hover:border-forest hover:text-forest"
          >
            <HeartOff size={14} aria-hidden="true" />
            {t('favorites.remove')}
            <span className="sr-only">: {name}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
