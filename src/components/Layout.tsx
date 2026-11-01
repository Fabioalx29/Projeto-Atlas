import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from './layout/Header'
import Footer from './layout/Footer'
import ErrorBoundary from './ui/ErrorBoundary'
import ErrorPanel from './ui/ErrorPanel'

export default function Layout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const isFirstRender = useRef(true)

  // Ao trocar de página: volta ao topo e move o foco para o conteúdo, para que
  // leitores de tela e teclado não permaneçam "presos" no link clicado da página anterior.
  // Mudanças só na query (filtros do Explorar) não passam por aqui: dependemos apenas do pathname.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-forest focus:px-4 focus:py-2 focus:text-ivory"
      >
        {t('a11y.skipToContent')}
      </a>
      <Header />
      <main ref={mainRef} id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* `key` zera o erro ao navegar para outra página */}
        <ErrorBoundary
          key={pathname}
          fallback={() => (
            <ErrorPanel
              className="py-24"
              title={t('errors.title')}
              text={t('errors.text')}
              actions={
                <>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="rounded-control bg-forest px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-forest-soft"
                  >
                    {t('errors.reload')}
                  </button>
                  <a
                    href="/"
                    className="rounded-control border border-line bg-surface px-5 py-2.5 text-sm font-medium text-forest hover:border-forest"
                  >
                    {t('errors.home')}
                  </a>
                </>
              }
            />
          )}
        >
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
