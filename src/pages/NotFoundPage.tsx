import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Container from '../components/ui/Container'
import { usePageMeta } from '../lib/usePageMeta'

export default function NotFoundPage() {
  const { t } = useTranslation()
  usePageMeta(t('meta.notFound.title'), t('meta.notFound.description'))

  return (
    <Container className="py-12">
      <section className="rounded-card border border-line bg-surface p-8 text-center shadow-card">
        <p className="font-display text-6xl font-semibold text-gold">404</p>
        <h1 className="mt-4 text-3xl font-semibold">{t('notFound.title')}</h1>
        <p className="mt-3 text-ink-muted">{t('notFound.description')}</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-control bg-forest px-5 py-2.5 text-sm font-medium text-ivory hover:bg-forest-soft"
        >
          {t('notFound.back')}
        </Link>
      </section>
    </Container>
  )
}
