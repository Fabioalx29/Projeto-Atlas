import type { Coordinates } from '../../types/destination'
import type { DailyForecast, WeatherForecast } from './types'

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
/** Hoje + 5 dias seguintes. */
const FORECAST_DAYS = 6

export class WeatherError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WeatherError'
  }
}

type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function numberArray(value: unknown): (number | null)[] | null {
  if (!Array.isArray(value)) return null
  return value.map((item) => (typeof item === 'number' && Number.isFinite(item) ? item : null))
}

export function buildForecastUrl({ lat, lng }: Coordinates, days = FORECAST_DAYS): string {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    current: 'temperature_2m,weather_code,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    forecast_days: String(days),
    timezone: 'auto',
  })
  return `${FORECAST_URL}?${params.toString()}`
}

/**
 * Converte a resposta bruta da Open-Meteo em um formato tipado.
 * Valores ausentes ou inválidos não são preenchidos com números inventados:
 * dias sem dados essenciais são descartados e a probabilidade fica `null`.
 */
export function parseForecast(json: unknown): WeatherForecast {
  if (!isRecord(json) || !isRecord(json.current) || !isRecord(json.daily)) {
    throw new WeatherError('Unexpected forecast response')
  }

  const { temperature_2m, weather_code, is_day } = json.current
  if (
    typeof temperature_2m !== 'number' ||
    !Number.isFinite(temperature_2m) ||
    typeof weather_code !== 'number'
  ) {
    throw new WeatherError('Missing current weather data')
  }

  const { time, weather_code: codes } = json.daily
  const maxima = numberArray(json.daily.temperature_2m_max)
  const minima = numberArray(json.daily.temperature_2m_min)
  const rain = numberArray(json.daily.precipitation_probability_max)
  const dailyCodes = numberArray(codes)

  const daily: DailyForecast[] = []
  if (Array.isArray(time) && maxima && minima && dailyCodes) {
    time.forEach((date, index) => {
      const max = maxima[index]
      const min = minima[index]
      const code = dailyCodes[index]
      if (typeof date !== 'string' || max == null || min == null || code == null) return
      daily.push({
        date,
        weatherCode: code,
        temperatureMax: max,
        temperatureMin: min,
        precipitationProbability: rain?.[index] ?? null,
      })
    })
  }

  return {
    current: {
      temperature: temperature_2m,
      weatherCode: weather_code,
      // is_day: 1 = dia, 0 = noite; se ausente, assume dia só para escolher o ícone
      isDay: is_day !== 0,
    },
    daily,
  }
}

export async function fetchForecast(
  coordinates: Coordinates,
  signal?: AbortSignal,
): Promise<WeatherForecast> {
  const response = await fetch(buildForecastUrl(coordinates), { signal })
  if (!response.ok) throw new WeatherError(`Forecast request failed (${response.status})`)
  return parseForecast((await response.json()) as unknown)
}
