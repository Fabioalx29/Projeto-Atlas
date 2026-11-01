import { useId, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import ImageWithFallback from '../ui/ImageWithFallback'
import { DESTINATIONS, HERO_IMAGE } from '../../data/destinations'

const POPULAR_COUNT = 3

export default function Hero() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const inputId = useId()
  const [query, setQuery] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const term = query.trim()
    const params = new URLSearchParams()
    if (term) params.set('q', term)
    const search = params.toString()
    navigate(search ? `/explore?${search}` : '/explore')
  }

  return (
    <section className="relative isolate flex min-h-[34rem] items-center overflow-hidden bg-forest text-ivory sm:min-h-[40rem] lg:min-h-[44rem]">
      <ImageWithFallback
        src={HERO_IMAGE.src}
        alt=""
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-forest/85 via-forest/65 to-forest/35 lg:from-forest/90 lg:via-forest/55 lg:to-forest/10"
      />

      <Container className="py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="animate-rise flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            {t('hero.eyebrow')}
          </p>
          <h1
            className="animate-rise mt-6 text-balance text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '80ms' }}
          >
            {t('hero.title')}
          </h1>
          <p
            className="animate-rise mt-6 max-w-xl text-lg text-ivory/85"
            style={{ animationDelay: '160ms' }}
          >
            {t('hero.subtitle')}
          </p>

          <form
            role="search"
            onSubmit={handleSubmit}
            className="animate-rise mt-10 flex flex-col gap-2 rounded-card bg-surface p-2 shadow-card sm:flex-row sm:items-center"
            style={{ animationDelay: '240ms' }}
          >
            <label htmlFor={inputId} className="sr-only">
              {t('hero.searchLabel')}
            </label>
            <div className="flex flex-1 items-center gap-3 rounded-control px-3 focus-within:ring-2 focus-within:ring-forest">
              <Search size={20} className="shrink-0 text-ink-muted" aria-hidden="true" />
              <input
                id={inputId}
                type="search"
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('hero.searchPlaceholder')}
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent py-3 text-base text-forest placeholder:text-ink-muted focus-visible:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-control bg-forest px-6 py-3 text-sm font-semibold text-ivory hover:bg-forest-soft"
            >
              {t('hero.searchButton')}
            </button>
          </form>

          <p
            className="animate-rise mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ivory/80"
            style={{ animationDelay: '320ms' }}
          >
            <span>{t('hero.popular')}:</span>
            {DESTINATIONS.slice(0, POPULAR_COUNT).map(({ id }) => (
              <Link
                key={id}
                to={`/destination/${id}`}
                className="font-medium text-ivory underline-offset-4 hover:text-gold hover:underline"
              >
                {t(`destinations.${id}.name`)}
              </Link>
            ))}
          </p>
        </div>
      </Container>
    </section>
  )
}
