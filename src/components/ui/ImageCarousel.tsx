import { useCallback, useEffect, useState, type KeyboardEvent, type TouchEvent } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ImageWithFallback from './ImageWithFallback'
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion'

export interface CarouselImage {
  src: string
  alt: string
}

interface ImageCarouselProps {
  images: readonly CarouselImage[]
  /** Nome acessível do carrossel (ex.: "Fotos de Kyoto"). */
  label: string
  /** Intervalo da troca automática. */
  intervalMs?: number
  className?: string
}

const SWIPE_THRESHOLD_PX = 40

function usePageVisible(): boolean {
  const [visible, setVisible] = useState(() => document.visibilityState === 'visible')
  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])
  return visible
}

const ARROW_CLASS =
  'absolute top-1/2 z-10 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/85 text-forest shadow-card backdrop-blur hover:bg-ivory'

/**
 * Carrossel reutilizável: troca automática a cada `intervalMs` (3 s por padrão),
 * transição suave, setas, indicadores de posição, botão de pausa, swipe no celular
 * e teclas ← →. A troca automática pausa com o mouse ou o foco sobre o carrossel,
 * com a aba em segundo plano e quando o usuário prefere movimento reduzido.
 * O tamanho é do contêiner pai (o carrossel preenche 100% dele), que precisa ter altura
 * definida: na página de detalhes, uma moldura compacta na coluna lateral.
 */
export default function ImageCarousel({
  images,
  label,
  intervalMs = 3000,
  className = '',
}: ImageCarouselProps) {
  const { t } = useTranslation()
  const count = images.length
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const reducedMotion = usePrefersReducedMotion()
  const pageVisible = usePageVisible()

  const current = Math.min(index, Math.max(count - 1, 0))
  const autoPlaying = count > 1 && !userPaused && !interacting && !reducedMotion && pageVisible

  const goTo = useCallback((next: number) => setIndex(((next % count) + count) % count), [count])

  // Um temporizador por slide: qualquer troca (manual ou automática) reinicia os 3 s
  useEffect(() => {
    if (!autoPlaying) return
    const timer = window.setTimeout(() => goTo(current + 1), intervalMs)
    return () => window.clearTimeout(timer)
  }, [autoPlaying, current, goTo, intervalMs])

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') goTo(current - 1)
    else if (event.key === 'ArrowRight') goTo(current + 1)
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) return
    const delta = event.changedTouches[0].clientX - touchStartX
    setTouchStartX(null)
    if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) goTo(current + (delta < 0 ? 1 : -1))
  }

  if (count === 0) return null

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={() => setInteracting(false)}
      onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
      className={`relative size-full overflow-hidden ${className}`}
    >
      <div
        aria-live={autoPlaying ? 'off' : 'polite'}
        className="flex size-full transition-transform duration-700 ease-(--ease-atlas)"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((image, position) => (
          <div
            key={image.src}
            role="group"
            aria-roledescription="slide"
            aria-label={t('carousel.slideOf', { index: position + 1, total: count })}
            aria-hidden={position !== current}
            className="size-full shrink-0 basis-full"
          >
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              loading={position === 0 ? 'eager' : 'lazy'}
              fetchPriority={position === 0 ? 'high' : 'auto'}
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          {/* Sombra suave na base para os indicadores ficarem legíveis sobre qualquer foto */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-forest/50 to-transparent"
          />
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            aria-label={t('carousel.previous')}
            className={`${ARROW_CLASS} left-2`}
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            aria-label={t('carousel.next')}
            className={`${ARROW_CLASS} right-2`}
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>

          <div className="absolute inset-x-0 bottom-1.5 z-10 flex items-center justify-center">
            {images.map((image, position) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(position)}
                aria-label={t('carousel.goTo', { index: position + 1 })}
                aria-current={position === current ? 'true' : undefined}
                className="group inline-flex size-5 items-center justify-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    position === current ? 'w-5 bg-gold' : 'w-1.5 bg-ivory/70 group-hover:bg-ivory'
                  }`}
                />
              </button>
            ))}
          </div>

          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setUserPaused((value) => !value)}
              aria-label={userPaused ? t('carousel.play') : t('carousel.pause')}
              title={userPaused ? t('carousel.play') : t('carousel.pause')}
              className="absolute bottom-1.5 right-2 z-10 inline-flex size-6 items-center justify-center rounded-full bg-ivory/85 text-forest backdrop-blur hover:bg-ivory"
            >
              {userPaused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
            </button>
          )}
        </>
      )}
    </div>
  )
}
