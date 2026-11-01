import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import { usePageMeta } from '../../lib/usePageMeta'

interface DestinationNotFoundProps {
  id: string
}

export default function DestinationNotFound({ id }: DestinationNotFoundProps) {
  const { t } = useTranslation()
  usePageMeta(t('meta.destinationNotFound.title'), t('meta.destinationNotFound.description'))

  return (
    <Container className="py-20 sm:py-28">
      <section className="mx-auto max-w-xl rounded-card border border-line bg-surface px-6 py-14 text-center shadow-card">
        <Compass size={44} strokeWidth={1.25} className="mx-auto text-gold-deep" aria-hidden="true" />
        <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">{t('detail.notFoundTitle')}</h1>
        <p className="mt-3 text-ink-muted">{t('detail.notFoundText', { id })}</p>
        <Link
          to="/explore"
          className="mt-8 inline-flex rounded-control bg-forest px-6 py-3 text-sm font-semibold text-ivory hover:bg-forest-soft"
        >
          {t('detail.notFoundBack')}
        </Link>
      </section>
    </Container>
  )
}
