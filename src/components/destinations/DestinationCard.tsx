import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ImageWithFallback from '../ui/ImageWithFallback'
import FavoriteToggle from '../../features/favorites/FavoriteToggle'
import { commonsSrcSet } from '../../lib/commons'
import type { Destination } from '../../types/destination'

const MAX_VISIBLE_CATEGORIES = 2
const SRC_SET_WIDTHS = [480, 800, 1400] as const
const CARD_SIZES = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
const FEATURED_SIZES = '(min-width: 1024px) 50vw, 100vw'

interface DestinationCardProps {
  destination: Destination
  /** Versão ampliada, com descrição completa e chamada para ação. */
  featured?: boolean
  /** Exibe as categorias do destino sobre a imagem. */
  showCategories?: boolean
  /** Nível do título do card, conforme o contexto: h2 sob um h1 (Explorar), h3 sob um h2 (padrão). */
  headingLevel?: 'h2' | 'h3'
  className?: string
}

export default function DestinationCard({
  destination,
  featured = false,
  showCategories = false,
  headingLevel: Heading = 'h3',
  className = '',
}: DestinationCardProps) {
  const { t } = useTranslation()
  const { id, image, categories } = destination

  return (
    // O coração fica ao lado do link (e não dentro dele): botão dentro de <a> é HTML inválido
    <div className={`relative lg:h-full ${featured ? 'h-96' : 'h-80'} ${className}`}>
      <Link
        to={`/destination/${id}`}
        className="group relative block size-full overflow-hidden rounded-card bg-forest shadow-card"
      >
        <ImageWithFallback
          src={image.src}
          srcSet={commonsSrcSet(image.src, SRC_SET_WIDTHS)}
          sizes={featured ? FEATURED_SIZES : CARD_SIZES}
          alt={t(`destinations.${id}.imageAlt`)}
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-(--ease-atlas) group-hover:scale-105"
        />

        {showCategories && (
          <ul className="absolute left-4 top-4 flex max-w-[calc(100%-4.5rem)] flex-wrap gap-1.5">
            {categories.slice(0, MAX_VISIBLE_CATEGORIES).map((category) => (
              <li
                key={category}
                className="rounded-full bg-ivory/90 px-2.5 py-1 text-xs font-medium text-forest"
              >
                {t(`categories.${category}.name`)}
              </li>
            ))}
          </ul>
        )}

        <span
          aria-hidden="true"
          className="absolute right-4 top-16 inline-flex size-9 translate-y-1 items-center justify-center rounded-full bg-ivory/90 text-forest opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          <ArrowUpRight size={16} />
        </span>

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-forest/90 via-forest/50 to-transparent p-5 pt-24 text-ivory sm:p-6 sm:pt-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            {t(`destinations.${id}.country`)}
          </p>
          <Heading className={`mt-1 font-semibold ${featured ? 'text-4xl' : 'text-2xl'}`}>
            {t(`destinations.${id}.name`)}
          </Heading>
          <p className={`mt-2 text-sm text-ivory/85 ${featured ? 'max-w-md' : 'line-clamp-2'}`}>
            {t(`destinations.${id}.description`)}
          </p>
          {featured && (
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold">
              {t('featured.discover')}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          )}
        </div>
      </Link>

      <div className="absolute right-3 top-3 z-10">
        <FavoriteToggle id={id} size="sm" />
      </div>
    </div>
  )
}
