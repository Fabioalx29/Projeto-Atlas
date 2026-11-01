import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import DestinationCard from '../destinations/DestinationCard'
import { getDestinationById } from '../../data/destinations'
import { useFavorites } from '../../features/favorites/FavoritesContext'
import { useTrips } from '../../features/trips/TripsContext'
import { formatIsoDate, todayIso } from '../../lib/dates'
import type { Destination } from '../../types/destination'

const MAX_FAVORITES = 3
const MAX_TRIPS = 3

/** Atalho na Home para o que o usuário já salvou. Não aparece quando não há nada salvo. */
export default function SavedSection() {
  const { t, i18n } = useTranslation()
  const { favorites } = useFavorites()
  const { trips } = useTrips()

  const favoriteDestinations = [...favorites]
    .reverse()
    .flatMap((id): Destination[] => {
      const destination = getDestinationById(id)
      return destination ? [destination] : []
    })
    .slice(0, MAX_FAVORITES)

  // Viagens que ainda não terminaram (a lista já vem ordenada pela data de ida)
  const today = todayIso()
  const upcomingTrips = trips.filter((trip) => trip.endDate >= today).slice(0, MAX_TRIPS)

  if (favoriteDestinations.length === 0 && upcomingTrips.length === 0) return null

  return (
    <section aria-labelledby="saved-title" className="bg-surface py-16 sm:py-20">
      <Container className="space-y-14">
        <SectionHeading
          id="saved-title"
          eyebrow={t('home.savedEyebrow')}
          title={t('home.savedTitle')}
        />

        {favoriteDestinations.length > 0 && (
          <div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-2xl font-semibold">{t('home.favoritesTitle')}</h3>
              <Link
                to="/favorites"
                className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-gold-deep"
              >
                {t('home.viewAll')}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-6 grid auto-rows-[20rem] gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteDestinations.map((destination) => (
                <li key={destination.id} className="min-h-0">
                  <DestinationCard destination={destination} showCategories />
                </li>
              ))}
            </ul>
          </div>
        )}

        {upcomingTrips.length > 0 && (
          <div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-2xl font-semibold">{t('home.tripsTitle')}</h3>
              <Link
                to="/trips"
                className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-gold-deep"
              >
                {t('home.viewAll')}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {upcomingTrips.map((trip) => {
                const destination = getDestinationById(trip.destinationId)
                return (
                  <li key={trip.id}>
                    <Link
                      to="/trips"
                      className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-2 py-4 hover:bg-ivory"
                    >
                      <span>
                        <span className="block font-display text-xl font-semibold">{trip.name}</span>
                        {destination && (
                          <span className="block text-sm text-ink-muted">
                            {t(`destinations.${destination.id}.name`)},{' '}
                            {t(`destinations.${destination.id}.country`)}
                          </span>
                        )}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm text-forest-soft">
                        <CalendarDays size={15} className="text-gold-deep" aria-hidden="true" />
                        {formatIsoDate(trip.startDate, i18n.language)}
                        <span aria-hidden="true">–</span>
                        {formatIsoDate(trip.endDate, i18n.language)}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </Container>
    </section>
  )
}
