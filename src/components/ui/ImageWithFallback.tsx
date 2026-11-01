import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ImageWithFallbackProps {
  src: string
  /** Texto alternativo. Use string vazia para imagens decorativas. */
  alt: string
  className?: string
  /** Candidatas em várias larguras; com `sizes`, o navegador escolhe a menor adequada. */
  srcSet?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
}

/**
 * Imagem com tratamento visual quando o arquivo não carrega:
 * mostra um bloco verde-floresta com ícone, mantendo o enquadramento.
 */
export default function ImageWithFallback({
  src,
  alt,
  className = '',
  srcSet,
  sizes,
  loading = 'lazy',
  fetchPriority = 'auto',
}: ImageWithFallbackProps) {
  const { t } = useTranslation()
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  if (failedSrc === src) {
    const decorative = alt === ''
    return (
      <div
        role={decorative ? undefined : 'img'}
        aria-label={decorative ? undefined : alt}
        aria-hidden={decorative ? true : undefined}
        className={`flex flex-col items-center justify-center gap-2 bg-forest-soft text-ivory/70 ${className}`}
      >
        <ImageOff size={28} aria-hidden="true" />
        <span className="text-xs">{t('image.unavailable')}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailedSrc(src)}
      className={className}
    />
  )
}
