import type { Coordinates } from '../../types/destination'
import type { WeatherForecast } from './types'
import { fetchForecast } from './weatherApi'

/** Previsões recentes são reaproveitadas por alguns minutos (evita refazer a chamada ao voltar à página). */
const TTL_MS = 10 * 60 * 1000

const cache = new Map<string, { at: number; forecast: WeatherForecast }>()
const inFlight = new Map<string, Promise<WeatherForecast>>()

function keyOf({ lat, lng }: Coordinates): string {
  return `${lat.toFixed(4)},${lng.toFixed(4)}`
}

export function getCachedForecast(coordinates: Coordinates, now = Date.now()): WeatherForecast | null {
  const entry = cache.get(keyOf(coordinates))
  return entry && now - entry.at < TTL_MS ? entry.forecast : null
}

/**
 * Devolve a previsão do cache ou faz a requisição. Chamadas simultâneas para o mesmo
 * local compartilham uma única requisição. Falhas nunca são guardadas: "tentar novamente"
 * sempre consulta a API de verdade.
 */
export function loadForecast(coordinates: Coordinates): Promise<WeatherForecast> {
  const cached = getCachedForecast(coordinates)
  if (cached) return Promise.resolve(cached)

  const key = keyOf(coordinates)
  const pending = inFlight.get(key)
  if (pending) return pending

  const request = fetchForecast(coordinates)
    .then((forecast) => {
      cache.set(key, { at: Date.now(), forecast })
      return forecast
    })
    .finally(() => inFlight.delete(key))
  inFlight.set(key, request)
  return request
}

/** Usado apenas em testes. */
export function clearForecastCache() {
  cache.clear()
  inFlight.clear()
}
