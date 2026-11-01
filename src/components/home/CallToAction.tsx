import { Link } from 'react-router-dom'
import { ArrowRight, Compass } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'

export default function CallToAction() {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="cta-title" className="py-20 sm:py-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-card bg-forest px-6 py-16 text-ivory sm:px-14 sm:py-24">
          <Compass
            aria-hidden="true"
            strokeWidth={0.75}
            className="pointer-events-none absolute -right-16 -top-16 -z-10 size-96 text-gold/15"
          />
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              {t('cta.eyebrow')}
            </p>
            <h2 id="cta-title" className="mt-4 text-balance text-3xl font-semibold sm:text-5xl">
              {t('cta.title')}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-ivory/80">{t('cta.text')}</p>
            <Link
              to="/explore"
              className="group mt-8 inline-flex items-center gap-2 rounded-control bg-gold px-6 py-3 text-sm font-semibold text-forest hover:bg-ivory"
            >
              {t('cta.button')}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
