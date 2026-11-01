export type WeatherCondition =
  | 'clear'
  | 'mostlyClear'
  | 'partlyCloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'freezingDrizzle'
  | 'rain'
  | 'freezingRain'
  | 'snow'
  | 'snowGrains'
  | 'showers'
  | 'snowShowers'
  | 'thunderstorm'
  | 'thunderstormHail'
  | 'unknown'

/** Códigos WMO usados pela Open-Meteo, agrupados por condição. */
const CONDITIONS: Record<WeatherCondition, readonly number[]> = {
  clear: [0],
  mostlyClear: [1],
  partlyCloudy: [2],
  overcast: [3],
  fog: [45, 48],
  drizzle: [51, 53, 55],
  freezingDrizzle: [56, 57],
  rain: [61, 63, 65],
  freezingRain: [66, 67],
  snow: [71, 73, 75],
  snowGrains: [77],
  showers: [80, 81, 82],
  snowShowers: [85, 86],
  thunderstorm: [95],
  thunderstormHail: [96, 99],
  unknown: [],
}

const BY_CODE = new Map<number, WeatherCondition>(
  (Object.entries(CONDITIONS) as [WeatherCondition, readonly number[]][]).flatMap(
    ([condition, codes]) => codes.map((code) => [code, condition] as const),
  ),
)

export function getWeatherCondition(code: number): WeatherCondition {
  return BY_CODE.get(code) ?? 'unknown'
}
