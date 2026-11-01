import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import LanguageSwitcher from './LanguageSwitcher'
import { useFavorites } from '../../features/favorites/FavoritesContext'
import { NAV_ITEMS } from '../../lib/navigation'

/** Contador de favoritos ao lado do item "Favoritos" do menu (some quando é zero). */
function NavBadge({ itemKey }: { itemKey: string }) {
  const { t } = useTranslation()
  const { count } = useFavorites()
  if (itemKey !== 'favorites' || count === 0) return null

  return (
    <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[0.7rem] font-semibold leading-5 text-forest">
      <span aria-hidden="true">{count}</span>
      <span className="sr-only">{t('favorites.badge', { count })}</span>
    </span>
  )
}

export default function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  // Fecha o menu móvel com a tecla Escape
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-display text-2xl font-semibold tracking-tight text-forest"
        >
          {t('app.name')}
          <span className="text-gold" aria-hidden="true">
            .
          </span>
        </Link>

        <nav aria-label={t('nav.label')} className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map(({ to, key, end }) => (
              <li key={key}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    [
                      "relative py-2 text-sm font-medium after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-300 after:content-['']",
                      isActive
                        ? 'text-forest after:scale-x-100'
                        : 'text-forest-soft hover:text-forest after:scale-x-0 hover:after:scale-x-100',
                    ].join(' ')
                  }
                >
                  {t(`nav.${key}`)}
                  <NavBadge itemKey={key} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-10 items-center justify-center rounded-control border border-line bg-surface text-forest md:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-ivory md:hidden">
          <Container className="py-4">
            <nav aria-label={t('nav.label')}>
              <ul className="flex flex-col">
                {NAV_ITEMS.map(({ to, key, end }) => (
                  <li key={key}>
                    <NavLink
                      to={to}
                      end={end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        [
                          'block border-b border-line py-3 font-display text-xl',
                          isActive ? 'text-forest' : 'text-forest-soft',
                        ].join(' ')
                      }
                    >
                      {t(`nav.${key}`)}
                      <NavBadge itemKey={key} />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="pt-4">
              <LanguageSwitcher />
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
