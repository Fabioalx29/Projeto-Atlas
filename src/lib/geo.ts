import type { Coordinates } from '../types/destination'

/** Subconjunto de `t` do i18next usado aqui (mantém o módulo puro e testável). */
type Translate = (key: string, options?: Record<string, string>) => string

/**
 * Formata coordenadas conforme o idioma, usando as chaves `geo.*`:
 * pt "35.0116° N, 135.7681° L" · en "35.0116° N, 135.7681° E" · ja "北緯35.0116°、東経135.7681°".
 */
export function formatCoordinates({ lat, lng }: Coordinates, t: Translate): string {
  const latitude = t(lat >= 0 ? 'geo.latNorth' : 'geo.latSouth', {
    value: Math.abs(lat).toFixed(4),
  })
  const longitude = t(lng >= 0 ? 'geo.lngEast' : 'geo.lngWest', {
    value: Math.abs(lng).toFixed(4),
  })
  return t('geo.pair', { lat: latitude, lng: longitude })
}
