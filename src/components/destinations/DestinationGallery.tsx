import { useTranslation } from 'react-i18next'
import ImageWithFallback from '../ui/ImageWithFallback'
import type { Destination } from '../../types/destination'

interface DestinationGalleryProps {
  destination: Destination
}

/** Mostra as imagens adicionais; não renderiza nada quando não há galeria. */
export default function DestinationGallery({ destination }: DestinationGalleryProps) {
  const { t } = useTranslation()
  const gallery = destination.gallery ?? []
  if (gallery.length === 0) return null

  const name = t(`destinations.${destination.id}.name`)

  return (
    <section aria-labelledby="gallery-title" className="mt-14">
      <h2 id="gallery-title" className="text-2xl font-semibold">
        {t('detail.gallery')}
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {gallery.map((image, index) => (
          <li
            key={image.src}
            className={`aspect-[4/3] overflow-hidden rounded-card bg-forest ${
              gallery.length % 2 === 1 && index === 0 ? 'sm:col-span-2 sm:aspect-[16/9]' : ''
            }`}
          >
            <ImageWithFallback
              src={image.src}
              alt={t('detail.galleryAlt', { name, index: index + 2 })}
              className="size-full object-cover transition-transform duration-700 ease-(--ease-atlas) hover:scale-105"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
