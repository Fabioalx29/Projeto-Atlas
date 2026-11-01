import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from '../components/ui/Container'
import EmptyState from '../components/ui/EmptyState'
import Notice from '../components/ui/Notice'
import SectionHeading from '../components/ui/SectionHeading'
import FavoriteItem from '../components/favorites/FavoriteItem'
import { getDestinationById } from '../data/destinations'
import { useFavorites } from '../features/favorites/FavoritesContext'
import { usePageMeta } from '../lib/usePageMeta'
import type { Destination } from '../types/destination'

export default function FavoritesPage() {
  const { t } = useTranslation()
  usePageMeta(t('meta.favorites.title'), t('meta.favorites.description'))
  const { favorites, removeFavorite, storageError } = useFavorites()

  // Do mais recente para o mais antigo, usando os dados reais do catálogo
  const destinations = [...favorites]
    .reverse()
    .flatMap((id): Destination[] => {
      const destination = getDestinationById(id)
      return destination ? [destination] : []
    })

  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        id="favorites-title"
        as="h1"
        eyebrow={t('nav.favorites')}
        title={t('favorites.title')}
        subtitle={t('favorites.subtitle')}
      />

      <div className="mt-8 space-y-3">
        <Notice>{t('storage.notice')}</Notice>
        {storageError && <Notice tone="warning">{t('storage.error')}</Notice>}
      </div>

      <div className="mt-10">
        {destinations.length === 0 ? (
          <EmptyState
            icon={Heart}
            title={t('favorites.emptyTitle')}
            text={t('favorites.emptyText')}
            action={
              <Link
                to="/explore"
                className="inline-flex rounded-control bg-forest px-6 py-3 text-sm font-semibold text-ivory hover:bg-forest-soft"
              >
                {t('favorites.emptyAction')}
              </Link>
            }
          />
        ) : (
          <>
            <p role="status" aria-live="polite" className="mb-6 text-sm text-ink-muted">
              {t('favorites.count', { count: destinations.length })}
            </p>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination) => (
                <li key={destination.id}>
                  <FavoriteItem destination={destination} onRemove={removeFavorite} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Container>
  )
}
