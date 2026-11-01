import { lazy } from 'react'
import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import MapFrame from '../map/MapFrame'
import WeatherPanel from '../../features/weather/WeatherPanel'
import type { Destination } from '../../types/destination'

// Carregado sob demanda: o Leaflet só entra no bundle quando um mapa é exibido
const DestinationMap = lazy(() => import('../../features/map/DestinationMap'))

const OSM_ZOOM = 10

function openStreetMapUrl({ lat, lng }: Destination['coordinates']): string {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${OSM_ZOOM}/${lat}/${lng}`
}

interface LocationSectionProps {
  destination: Destination
}

export default function LocationSection({ destination }: LocationSectionProps) {
  const { t } = useTranslation()
  const name = t(`destinations.${destination.id}.name`)

  return (
    <section aria-labelledby="map-title" className="bg-surface py-16 sm:py-20">
      <Container>
        <h2 id="map-title" className="text-2xl font-semibold sm:text-3xl">
          {t('detail.mapAndWeather')}
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <MapFrame
              label={t('map.destinationLabel', { name })}
              className="h-80 sm:h-[26rem] lg:h-[30rem]"
            >
              <DestinationMap destination={destination} />
            </MapFrame>
            <a
              href={openStreetMapUrl(destination.coordinates)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-gold-deep"
            >
              {t('map.openInOsm')}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>

          <WeatherPanel coordinates={destination.coordinates} />
        </div>
      </Container>
    </section>
  )
}
