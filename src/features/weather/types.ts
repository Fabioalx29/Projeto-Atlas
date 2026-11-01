export interface CurrentWeather {
  /** Temperatura em °C. */
  temperature: number
  /** Código WMO da condição (ex.: 0 = céu limpo). */
  weatherCode: number
  isDay: boolean
}

export interface DailyForecast {
  /** Data local do destino, no formato AAAA-MM-DD. */
  date: string
  weatherCode: number
  temperatureMax: number
  temperatureMin: number
  /** Probabilidade máxima de precipitação (0–100), quando a API a fornece. */
  precipitationProbability: number | null
}

export interface WeatherForecast {
  current: CurrentWeather
  /** O primeiro item é o dia de hoje no fuso do destino. */
  daily: DailyForecast[]
}
