import type { Destination } from '../../types/destination'

/**
 * Destinos que compartilham categorias com o destino atual.
 * Mais categorias em comum primeiro; empates seguem a ordem do catálogo.
 */
export function getRelatedDestinations(
  destination: Destination,
  all: readonly Destination[],
  limit = 3,
): Destination[] {
  return all
    .map((candidate, index) => ({
      candidate,
      index,
      shared: candidate.categories.filter((category) => destination.categories.includes(category))
        .length,
    }))
    .filter(({ candidate, shared }) => candidate.id !== destination.id && shared > 0)
    .sort((a, b) => b.shared - a.shared || a.index - b.index)
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}
