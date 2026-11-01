import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Snowflake,
  Sun,
  type LucideIcon,
} from 'lucide-react'
import type { WeatherCondition } from './weatherCodes'

const ICONS: Record<WeatherCondition, LucideIcon> = {
  clear: Sun,
  mostlyClear: Sun,
  partlyCloudy: CloudSun,
  overcast: Cloud,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  freezingDrizzle: CloudDrizzle,
  rain: CloudRain,
  freezingRain: CloudRain,
  snow: CloudSnow,
  snowGrains: Snowflake,
  showers: CloudRain,
  snowShowers: CloudSnow,
  thunderstorm: CloudLightning,
  thunderstormHail: CloudHail,
  unknown: Cloud,
}

/** Ícone da condição; à noite, céu limpo e parcialmente nublado usam a lua. */
export function getWeatherIcon(condition: WeatherCondition, isDay = true): LucideIcon {
  if (!isDay) {
    if (condition === 'clear' || condition === 'mostlyClear') return Moon
    if (condition === 'partlyCloudy') return CloudMoon
  }
  return ICONS[condition]
}
