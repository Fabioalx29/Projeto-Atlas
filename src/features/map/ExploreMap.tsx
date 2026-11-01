import { useEffect } from 'react'
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { latLngBounds } from 'leaflet'
import { useTranslation } from 'react-i18next'
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion'
import type { Destination } from '../../types/destination'
import { markerIcon } from './markerIcon'
import MapResizeHandler from './MapResizeHandler'
import TileLayerOSM from './TileLayerOSM'

const WORLD_CENTER: [number, number] = [20, 0]
const WORLD_ZOOM = 2
const SINGLE_ZOOM = 6
const FIT_PADDING: [number, number] = [48, 48]
const FIT_MAX_ZOOM = 8

/** Reenquadra o mapa para incluir todos os destinos exibidos. */
function FitToDestinations({ destinations }: { destinations: readonly Destination[] }) {
  const map = useMap()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (destinations.length === 0) return
    if (destinations.length === 1) {
      const { lat, lng } = destinations[0].coordinates
      map.setView([lat, lng], SINGLE_ZOOM, { animate: !reducedMotion })
      return
    }
    const bounds = latLngBounds(
      destinations.map(({ coordinates }): [number, number] => [coordinates.lat, coordinates.lng]),
    )
    map.fitBounds(bounds, { padding: FIT_PADDING, maxZoom: FIT_MAX_ZOOM, animate: !reducedMotion })
  }, [map, destinations, reducedMotion])

  return null
}

interface ExploreMapProps {
  destinations: readonly Destination[]
}

export default function ExploreMap({ destinations }: ExploreMapProps) {
  const { t } = useTranslation()
  const reducedMotion = usePrefersReducedMotion()

  return (
    <MapContainer
      center={WORLD_CENTER}
      zoom={WORLD_ZOOM}
      minZoom={2}
      scrollWheelZoom={false}
      worldCopyJump
      zoomAnimation={!reducedMotion}
      fadeAnimation={!reducedMotion}
      markerZoomAnimation={!reducedMotion}
      className="size-full"
    >
      <TileLayerOSM />
      {destinations.map(({ id, coordinates }) => (
        <Marker
          key={id}
          position={[coordinates.lat, coordinates.lng]}
          icon={markerIcon}
          alt={t(`destinations.${id}.name`)}
        >
          <Popup>
            <strong>{t(`destinations.${id}.name`)}</strong>
            <br />
            {t(`destinations.${id}.country`)}
            <br />
            <Link to={`/destination/${id}`} className="font-semibold text-forest underline">
              {t('map.viewDetails')}
            </Link>
          </Popup>
        </Marker>
      ))}
      <FitToDestinations destinations={destinations} />
      <MapResizeHandler />
    </MapContainer>
  )
}
