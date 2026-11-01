import { icon } from 'leaflet'
// O Vite resolve estes arquivos e gera URLs válidas; sem isso o Leaflet procura
// os ícones por um caminho relativo e o marcador aparece quebrado.
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

export const markerIcon = icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
