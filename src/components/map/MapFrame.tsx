import { Suspense, type ReactNode } from 'react'
import { LoaderCircle, RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ErrorBoundary from '../ui/ErrorBoundary'
import ErrorPanel from '../ui/ErrorPanel'

interface MapFrameProps {
  /** Descrição acessível do mapa. */
  label: string
  children: ReactNode
  className?: string
}

/**
 * Moldura comum dos mapas: altura definida (o Leaflet exige), cantos
 * arredondados, isolamento de z-index, fallback enquanto o mapa é carregado
 * e mensagem com "tentar novamente" se o mapa falhar (ex.: chunk não baixou).
 */
export default function MapFrame({ label, children, className = '' }: MapFrameProps) {
  const { t } = useTranslation()

  return (
    <div
      role="region"
      aria-label={label}
      className={`relative isolate z-0 overflow-hidden rounded-card border border-line bg-ivory shadow-card ${className}`}
    >
      <ErrorBoundary
        fallback={(reset) => (
          <ErrorPanel
            className="size-full"
            title={t('map.errorTitle')}
            text={t('map.errorText')}
            actions={
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-control border border-line bg-surface px-4 py-2 text-sm font-medium text-forest hover:border-forest"
              >
                <RefreshCw size={14} aria-hidden="true" />
                {t('common.retry')}
              </button>
            }
          />
        )}
      >
        <Suspense
          fallback={
            <p
              role="status"
              className="flex size-full items-center justify-center gap-3 text-sm text-ink-muted"
            >
              <LoaderCircle
                size={18}
                className="animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
              {t('map.loading')}
            </p>
          }
        >
          {children}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
