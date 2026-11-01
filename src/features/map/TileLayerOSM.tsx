import { useRef, useState } from 'react'
import { TileLayer } from 'react-leaflet'
import { CloudOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

/** Quantos erros de tile, sem nenhum tile carregado, indicam que o mapa base está indisponível. */
const ERROR_THRESHOLD = 4

/**
 * Camada de mapa base do OpenStreetMap (atribuição obrigatória incluída).
 * Se os tiles não carregarem (offline, bloqueio), avisa o usuário sem esconder os marcadores.
 */
export default function TileLayerOSM() {
  const { t } = useTranslation()
  const [unavailable, setUnavailable] = useState(false)
  const errors = useRef(0)

  return (
    <>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={OSM_ATTRIBUTION}
        maxZoom={19}
        eventHandlers={{
          tileerror: () => {
            errors.current += 1
            if (errors.current >= ERROR_THRESHOLD) setUnavailable(true)
          },
          tileload: () => {
            errors.current = 0
            setUnavailable(false)
          },
        }}
      />
      {unavailable && (
        <p
          role="status"
          className="absolute inset-x-3 top-3 z-[1000] flex items-center gap-2 rounded-control border border-line bg-surface/95 px-3 py-2 text-xs text-forest shadow-card"
        >
          <CloudOff size={14} className="shrink-0" aria-hidden="true" />
          {t('map.tilesError')}
        </p>
      )}
    </>
  )
}
