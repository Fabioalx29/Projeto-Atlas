export const FAVORITES_STORAGE_KEY = 'atlas.favorites.v1'

/**
 * Converte o que veio do localStorage em uma lista confiável de ids:
 * mantém só textos, remove duplicados e ignora ids que não existem no catálogo.
 */
export function parseFavoriteIds(raw: unknown, isKnownDestination: (id: string) => boolean): string[] {
  if (!Array.isArray(raw)) return []
  const ids: string[] = []
  for (const item of raw) {
    if (typeof item === 'string' && isKnownDestination(item) && !ids.includes(item)) ids.push(item)
  }
  return ids
}
