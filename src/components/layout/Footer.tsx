import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import { NAV_ITEMS } from '../../lib/navigation'
import { PHOTO_CREDITS } from '../../data/destinations'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-forest text-ivory">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.4fr]">
        <div>
          <p className="font-display text-3xl font-semibold">
            {t('app.name')}
            <span className="text-gold" aria-hidden="true">
              .
            </span>
          </p>
          <p className="mt-1 text-sm text-gold">{t('app.tagline')}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/75">{t('footer.about')}</p>
        </div>

        <nav aria-label={t('footer.navigation')}>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
            {t('footer.navigation')}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_ITEMS.map(({ to, key }) => (
              <li key={key}>
                <Link to={to} className="text-ivory/80 hover:text-gold">
                  {t(`nav.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
            {t('footer.project')}
          </h2>
          <p className="mt-4 text-sm text-ivory/75">{t('footer.projectText')}</p>
          <p className="mt-5 text-xs font-medium text-ivory/60">{t('footer.photos')}</p>
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
            {PHOTO_CREDITS.map(({ id, sourceUrl }) => (
              <li key={id}>
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/75 underline-offset-2 hover:text-gold hover:underline"
                >
                  {id === 'hero' ? t('footer.photoHero') : t(`destinations.${id}.name`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-ivory/15">
        <Container className="py-5 text-xs text-ivory/60">
          {t('footer.rights', { year: new Date().getFullYear() })}
        </Container>
      </div>
    </footer>
  )
}
