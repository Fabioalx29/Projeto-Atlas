import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

/**
 * Recalcula o tamanho do mapa quando o contêiner muda (rotação do celular,
 * redimensionamento da janela, troca de aba lista/mapa), evitando tiles cortados.
 */
export default function MapResizeHandler() {
  const map = useMap()

  useEffect(() => {
    const container = map.getContainer()
    const observer = new ResizeObserver(() => map.invalidateSize())
    observer.observe(container)
    return () => observer.disconnect()
  }, [map])

  return null
}
