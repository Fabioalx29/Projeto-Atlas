import { CloudOff, Droplets, RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Coordinates } from '../../types/destination'
import type { DailyForecast, WeatherForecast } from './types'
import { useWeather } from './useWeather'
import { getWeatherCondition } from './weatherCodes'
import { getWeatherIcon } from './weatherIcons'

interface WeatherPanelProps {
  coordinates: Coordinates
}

function formatTemperature(value: number): string {
  return `${Math.round(value)}°`
}

function DayRow({ day }: { day: DailyForecast }) {
  const { t, i18n } = useTranslation()
  const condition = getWeatherCondition(day.weatherCode)
  const Icon = getWeatherIcon(condition)
  // A data já vem no fuso do destino; formatar em UTC evita deslocar o dia.
  const label = new Intl.DateTimeFormat(i18n.language, {
    weekday: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${day.date}T00:00:00Z`))

  return (
    <li className="grid grid-cols-[3.5rem_1.5rem_1fr_auto] items-center gap-3 py-3 text-sm">
      <span className="font-medium text-forest">{label}</span>
      <Icon size={20} strokeWidth={1.5} className="text-gold-deep" aria-hidden="true" />
      <span className="text-ink-muted">
        <span className="sr-only">{t(`weather.conditions.${condition}`)}. </span>
        {day.precipitationProbability !== null && (
          <span className="inline-flex items-center gap-1">
            <Droplets size={13} aria-hidden="true" />
            {day.precipitationProbability}%
            <span className="sr-only"> {t('weather.rainChanceShort')}</span>
          </span>
        )}
      </span>
      <span className="tabular-nums text-forest">
        <span className="sr-only">{t('weather.max')} </span>
        {formatTemperature(day.temperatureMax)}
        <span className="mx-1 text-ink-muted" aria-hidden="true">
          /
        </span>
        <span className="sr-only">{t('weather.min')} </span>
        <span className="text-ink-muted">{formatTemperature(day.temperatureMin)}</span>
      </span>
    </li>
  )
}

export default function WeatherPanel({ coordinates }: WeatherPanelProps) {
  const { t } = useTranslation()
  const { state, retry } = useWeather(coordinates)

  return (
    <section
      aria-labelledby="weather-title"
      className="rounded-card border border-line bg-surface p-6 shadow-card"
    >
      <h3 id="weather-title" className="text-xl font-semibold">
        {t('weather.title')}
      </h3>

      <div aria-live="polite" className="mt-5">
        {state.status === 'loading' && <ForecastSkeleton label={t('weather.loading')} />}

        {state.status === 'error' && (
          <div className="py-4 text-center">
            <CloudOff size={32} strokeWidth={1.25} className="mx-auto text-gold-deep" aria-hidden="true" />
            <p className="mt-3 text-sm text-ink-muted">{t('weather.error')}</p>
            <button
              type="button"
              onClick={retry}
              className="mt-4 inline-flex items-center gap-2 rounded-control border border-line px-4 py-2 text-sm font-medium text-forest hover:border-forest"
            >
              <RefreshCw size={14} aria-hidden="true" />
              {t('weather.retry')}
            </button>
          </div>
        )}

        {state.status === 'success' && <Forecast forecast={state.forecast} />}
      </div>

      <p className="mt-5 border-t border-line pt-4 text-xs text-ink-muted">{t('weather.source')}</p>
    </section>
  )
}

function Forecast({ forecast }: { forecast: WeatherForecast }) {
  const { t } = useTranslation()
  const { current, daily } = forecast
  const condition = getWeatherCondition(current.weatherCode)
  const Icon = getWeatherIcon(condition, current.isDay)
  const today = daily[0]
  const upcoming = daily.slice(1)

  return (
    <>
      <div className="flex items-center gap-4">
        <Icon size={52} strokeWidth={1.25} className="shrink-0 text-gold-deep" aria-hidden="true" />
        <div>
          <p className="font-display text-5xl font-semibold leading-none">
            {formatTemperature(current.temperature)}
            <span className="ml-1 text-2xl text-ink-muted">C</span>
          </p>
          <p className="mt-1 text-sm text-forest-soft">{t(`weather.conditions.${condition}`)}</p>
        </div>
      </div>

      {today && (
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
              {t('weather.todayRange')}
            </dt>
            <dd className="mt-1 tabular-nums text-forest">
              {formatTemperature(today.temperatureMax)} / {formatTemperature(today.temperatureMin)}
            </dd>
          </div>
          {today.precipitationProbability !== null && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
                {t('weather.rainChance')}
              </dt>
              <dd className="mt-1 tabular-nums text-forest">{today.precipitationProbability}%</dd>
            </div>
          )}
        </dl>
      )}

      {upcoming.length > 0 && (
        <div className="mt-6 border-t border-line pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
            {t('weather.nextDays')}
          </h4>
          <ul className="mt-1 divide-y divide-line">
            {upcoming.map((day) => (
              <DayRow key={day.date} day={day} />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

/** Esqueleto com o mesmo formato da previsão, para evitar saltos de layout ao carregar. */
function ForecastSkeleton({ label }: { label: string }) {
  return (
    <div role="status" className="animate-pulse motion-reduce:animate-none">
      <span className="sr-only">{label}</span>
      <div aria-hidden="true">
        <div className="flex items-center gap-4">
          <div className="size-[52px] rounded-full bg-line" />
          <div className="space-y-2">
            <div className="h-10 w-24 rounded bg-line" />
            <div className="h-3 w-28 rounded bg-line" />
          </div>
        </div>
        <div className="mt-6 space-y-4 border-t border-line pt-4">
          {[0, 1, 2, 3, 4].map((row) => (
            <div key={row} className="h-5 rounded bg-line" />
          ))}
        </div>
      </div>
    </div>
  )
}
