import { MapContainer, Marker, Popup } from 'react-leaflet'
import { useTranslation } from 'react-i18next'
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion'
import type { Destination } from '../../types/destination'
import { markerIcon } from './markerIcon'
import MapResizeHandler from './MapResizeHandler'
import TileLayerOSM from './TileLayerOSM'

const DESTINATION_ZOOM = 10

interface DestinationMapProps {
  destination: Destination
}

export default function DestinationMap({ destination }: DestinationMapProps) {
  const { t } = useTranslation()
  const reducedMotion = usePrefersReducedMotion()
  const { id, coordinates } = destination
  const center: [number, number] = [coordinates.lat, coordinates.lng]

  return (
    <MapContainer
      // Recria o mapa ao trocar de destino, mantendo centro e zoom coerentes
      key={id}
      center={center}
      zoom={DESTINATION_ZOOM}
      scrollWheelZoom={false}
      zoomAnimation={!reducedMotion}
      fadeAnimation={!reducedMotion}
      markerZoomAnimation={!reducedMotion}
      className="size-full"
    >
      <TileLayerOSM />
      <Marker position={center} icon={markerIcon} alt={t(`destinations.${id}.name`)}>
        <Popup>
          <strong>{t(`destinations.${id}.name`)}</strong>
          <br />
          {t(`destinations.${id}.country`)}
        </Popup>
      </Marker>
      <MapResizeHandler />
    </MapContainer>
  )
}
