import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, CalendarPlus, Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import ImageCarousel from '../ui/ImageCarousel'
import ImageWithFallback from '../ui/ImageWithFallback'
import SectionHeading from '../ui/SectionHeading'
import DestinationCard from './DestinationCard'
import LocationSection from './LocationSection'
import FavoriteToggle from '../../features/favorites/FavoriteToggle'
import { DESTINATIONS } from '../../data/destinations'
import { getDestinationPhotos } from '../../features/destinations/photos'
import { getRelatedDestinations } from '../../features/destinations/related'
import { formatCoordinates } from '../../lib/geo'
import { usePageMeta } from '../../lib/usePageMeta'
import type { Destination } from '../../types/destination'

interface DestinationDetailsProps {
  destination: Destination
}

const BACK_CLASS =
  'inline-flex items-center gap-2 rounded-full bg-ivory/90 px-4 py-2 text-sm font-medium text-forest backdrop-blur hover:bg-ivory'

export default function DestinationDetails({ destination }: DestinationDetailsProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { id, categories, continents, coordinates } = destination
  const name = t(`destinations.${id}.name`)
  usePageMeta(t('meta.destinationTitle', { name }), t(`destinations.${id}.description`))
  // "default" indica que esta é a primeira página da sessão (não há para onde voltar)
  const canGoBack = location.key !== 'default'
  const related = getRelatedDestinations(destination, DESTINATIONS)
  // Capa + galeria: o carrossel é montado a partir dos dados de qualquer destino
  const photos = getDestinationPhotos(destination)
  const slides = photos.map((photo, position) => ({
    src: photo.src,
    alt:
      position === 0
        ? t(`destinations.${id}.imageAlt`)
        : t('detail.galleryAlt', { name, index: position + 1 }),
  }))

  return (
    <>
      <section className="bg-forest text-ivory">
        <Container className="py-6 sm:py-8">
          <div className="flex items-center justify-between">
            {canGoBack ? (
              <button type="button" onClick={() => navigate(-1)} className={BACK_CLASS}>
                <ArrowLeft size={16} aria-hidden="true" />
                {t('detail.back')}
              </button>
            ) : (
              <Link to="/explore" className={BACK_CLASS}>
                <ArrowLeft size={16} aria-hidden="true" />
                {t('detail.backToExplore')}
              </Link>
            )}
            <FavoriteToggle id={id} showLabel />
          </div>

          <div className="animate-rise pb-4 pt-10 sm:pb-6 sm:pt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {t(`destinations.${id}.country`)}
            </p>
            <h1 className="mt-3 text-balance text-5xl font-semibold sm:text-6xl">{name}</h1>
            <ul className="mt-5 flex flex-wrap gap-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/explore?category=${category}`}
                    className="inline-flex rounded-full bg-ivory/90 px-3 py-1 text-xs font-medium text-forest hover:bg-ivory"
                  >
                    {t(`categories.${category}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">{t('detail.about')}</h2>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-forest-soft">
            {t(`destinations.${id}.longDescription`)}
          </p>
        </div>

        <aside
          aria-labelledby="location-title"
          className="h-fit rounded-card border border-line bg-surface p-6 shadow-card"
        >
          {/* Moldura da imagem lateral, acima de país e coordenadas: carrossel nos destinos
              com galeria, foto única estática nos demais (mesmo tamanho e posição) */}
          <div className="aspect-[16/10] overflow-hidden rounded-control bg-forest lg:aspect-[4/3]">
            {slides.length > 1 ? (
              <ImageCarousel images={slides} label={t('carousel.label', { name })} />
            ) : (
              <ImageWithFallback
                src={slides[0].src}
                alt={slides[0].alt}
                loading="eager"
                fetchPriority="high"
                className="size-full object-cover"
              />
            )}
          </div>

          <h2 id="location-title" className="mt-6 text-xl font-semibold">
            {t('detail.location')}
          </h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
                {t('detail.country')}
              </dt>
              <dd className="mt-1 text-forest">{t(`destinations.${id}.country`)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
                {t('detail.continent')}
              </dt>
              <dd className="mt-1 text-forest">
                {continents.map((continent) => t(`continents.${continent}`)).join(' · ')}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
                {t('detail.coordinates')}
              </dt>
              <dd className="mt-1 text-forest">{formatCoordinates(coordinates, t)}</dd>
            </div>
          </dl>

          <Link
            to={`/trips?destination=${id}`}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-control bg-forest px-4 py-2.5 text-sm font-semibold text-ivory hover:bg-forest-soft"
          >
            <CalendarPlus size={16} aria-hidden="true" />
            {t('detail.planTrip')}
          </Link>

          <p className="mt-5 flex gap-2 border-t border-line pt-5 text-xs text-ink-muted">
            <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
            {t('detail.favoriteNote')}
          </p>

          <div className="mt-5 border-t border-line pt-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
              {t('detail.photoCredits')}
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
              {photos.map((photo, index) => (
                <li key={photo.sourceUrl}>
                  <a
                    href={photo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest-soft underline-offset-2 hover:text-forest hover:underline"
                  >
                    {t('detail.photo', { index: index + 1 })}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>

      <LocationSection destination={destination} />

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              id="related-title"
              eyebrow={t('nav.explore')}
              title={t('detail.related')}
              subtitle={t('detail.relatedSubtitle')}
            />
            <ul className="mt-10 grid auto-rows-[20rem] gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} className="min-h-0">
                  <DestinationCard destination={item} showCategories />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  )
}
