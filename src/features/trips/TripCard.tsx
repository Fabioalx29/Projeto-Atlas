import { Link } from 'react-router-dom'
import { CalendarDays, Compass, MapPin, Pencil, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ImageWithFallback from '../../components/ui/ImageWithFallback'
import { getDestinationById } from '../../data/destinations'
import { formatIsoDate, tripLengthInDays } from '../../lib/dates'
import type { Trip } from './types'

interface TripCardProps {
  trip: Trip
  onEdit: (trip: Trip) => void
  onDelete: (trip: Trip) => void
}

const ACTION =
  'inline-flex items-center gap-2 rounded-control border border-line px-4 py-2 text-sm font-medium text-forest-soft hover:border-forest hover:text-forest'

export default function TripCard({ trip, onEdit, onDelete }: TripCardProps) {
  const { t, i18n } = useTranslation()
  // Se o destino saiu do catálogo, a viagem continua visível, sem foto nem link
  const destination = getDestinationById(trip.destinationId)
  const days = tripLengthInDays(trip.startDate, trip.endDate)

  return (
    <article className="overflow-hidden rounded-card border border-line bg-surface shadow-card sm:grid sm:grid-cols-[15rem_1fr]">
      <div className="aspect-[16/10] bg-forest sm:aspect-auto">
        {destination ? (
          <ImageWithFallback
            src={destination.image.src}
            alt={t(`destinations.${destination.id}.imageAlt`)}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-ivory/60">
            <Compass size={36} strokeWidth={1.25} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex flex-col p-5 sm:p-6">
        <h3 className="text-2xl font-semibold">{trip.name}</h3>

        <ul className="mt-3 space-y-1.5 text-sm text-forest-soft">
          <li className="flex items-center gap-2">
            <MapPin size={15} className="shrink-0 text-gold-deep" aria-hidden="true" />
            {destination ? (
              <span>
                {t(`destinations.${destination.id}.name`)},{' '}
                {t(`destinations.${destination.id}.country`)}
              </span>
            ) : (
              <span>{t('trips.destinationUnavailable')}</span>
            )}
          </li>
          <li className="flex items-center gap-2">
            <CalendarDays size={15} className="shrink-0 text-gold-deep" aria-hidden="true" />
            <span>
              <span className="sr-only">{t('trips.fields.startDate')}: </span>
              {formatIsoDate(trip.startDate, i18n.language)}
              <span aria-hidden="true"> – </span>
              <span className="sr-only">, {t('trips.fields.endDate')}: </span>
              {formatIsoDate(trip.endDate, i18n.language)}
              {days !== null && (
                <span className="text-ink-muted"> · {t('trips.duration', { count: days })}</span>
              )}
            </span>
          </li>
        </ul>

        {trip.notes !== '' && (
          <p className="mt-4 whitespace-pre-line break-words border-l-2 border-gold pl-4 text-sm text-ink-muted">
            {trip.notes}
          </p>
        )}

        <div className="mt-auto flex flex-wrap gap-3 pt-5">
          {destination && (
            <Link to={`/destination/${destination.id}`} className={ACTION}>
              {t('trips.openDestination')}
              <span className="sr-only">: {t(`destinations.${destination.id}.name`)}</span>
            </Link>
          )}
          <button type="button" onClick={() => onEdit(trip)} className={ACTION}>
            <Pencil size={14} aria-hidden="true" />
            {t('trips.edit')}
            <span className="sr-only">: {trip.name}</span>
          </button>
          <button type="button" onClick={() => onDelete(trip)} className={ACTION}>
            <Trash2 size={14} aria-hidden="true" />
            {t('trips.delete')}
            <span className="sr-only">: {trip.name}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
