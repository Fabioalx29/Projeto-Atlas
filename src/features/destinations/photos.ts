import type { Destination, DestinationImage } from '../../types/destination'

export const MIN_DESTINATION_PHOTOS = 3

/** Todas as fotos do destino, na ordem do carrossel: capa primeiro. */
export function getDestinationPhotos(destination: Destination): DestinationImage[] {
  return [destination.image, ...(destination.gallery ?? [])]
}

/**
 * Confere o catálogo: sem repetição dentro do destino, sem reaproveitar a mesma
 * foto em outra cidade e, quando há galeria (carrossel), o mínimo de fotos.
 * Destinos de foto única (sem `gallery`) são válidos.
 * Devolve uma lista de problemas legíveis (vazia quando está tudo certo).
 */
export function findPhotoProblems(destinations: readonly Destination[]): string[] {
  const problems: string[] = []
  const owner = new Map<string, string>()

  for (const destination of destinations) {
    const photos = getDestinationPhotos(destination)
    const own = new Set<string>()

    for (const { sourceUrl } of photos) {
      if (own.has(sourceUrl)) problems.push(`${destination.id}: foto repetida (${sourceUrl})`)
      own.add(sourceUrl)

      const other = owner.get(sourceUrl)
      if (other && other !== destination.id) {
        problems.push(`${destination.id}: foto já usada em ${other} (${sourceUrl})`)
      }
      owner.set(sourceUrl, destination.id)
    }

    if (destination.gallery && own.size < MIN_DESTINATION_PHOTOS) {
      problems.push(`${destination.id}: ${own.size} foto(s) distinta(s), mínimo ${MIN_DESTINATION_PHOTOS}`)
    }
  }

  return problems
}
