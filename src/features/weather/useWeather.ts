import { useCallback, useEffect, useState } from 'react'
import type { Coordinates } from '../../types/destination'
import type { WeatherForecast } from './types'
import { getCachedForecast, loadForecast } from './forecastCache'

export type WeatherState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; forecast: WeatherForecast }

function initialState(coordinates: Coordinates): WeatherState {
  const cached = getCachedForecast(coordinates)
  return cached ? { status: 'success', forecast: cached } : { status: 'loading' }
}

/**
 * Consulta a previsão do destino, reaproveitando o cache e as requisições em andamento.
 * O resultado é ignorado se o destino mudar ou a página for fechada; `retry` tenta de novo após um erro.
 */
export function useWeather({ lat, lng }: Coordinates) {
  const [state, setState] = useState<WeatherState>(() => initialState({ lat, lng }))
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true
    const cached = getCachedForecast({ lat, lng })
    if (cached) {
      setState({ status: 'success', forecast: cached })
      return
    }
    setState({ status: 'loading' })

    loadForecast({ lat, lng })
      .then((forecast) => {
        if (active) setState({ status: 'success', forecast })
      })
      .catch((error: unknown) => {
        if (!active) return
        console.warn('Atlas: weather request failed', error)
        setState({ status: 'error' })
      })

    return () => {
      active = false
    }
  }, [lat, lng, attempt])

  const retry = useCallback(() => setAttempt((value) => value + 1), [])

  return { state, retry }
}
