import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Container from './ui/Container'

interface PlaceholderPageProps {
  /** Chave de tradução do título da página (ex.: "pages.home"). */
  titleKey: string
  children?: ReactNode
}

export default function PlaceholderPage({ titleKey, children }: PlaceholderPageProps) {
  const { t } = useTranslation()

  return (
    <Container className="py-12">
      <section className="rounded-card border border-line bg-surface p-8 shadow-card">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gold-deep">
          {t('app.name')}
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">{t(titleKey)}</h1>
        <p className="mt-4 max-w-prose text-ink-muted">{t('placeholder.description')}</p>
        {children}
      </section>
    </Container>
  )
}
