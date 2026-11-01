export const CATEGORY_IDS = ['nature', 'culture', 'beaches', 'gastronomy'] as const

export type CategoryId = (typeof CATEGORY_IDS)[number]

export const CONTINENT_IDS = [
  'europe',
  'asia',
  'africa',
  'northAmerica',
  'southAmerica',
  'oceania',
] as const

export type Continent = (typeof CONTINENT_IDS)[number]

export interface DestinationImage {
  /** URL da fotografia (largura já definida). */
  src: string
  /** Página do arquivo de origem, com autoria e licença. */
  sourceUrl: string
}

export interface Coordinates {
  lat: number
  lng: number
}

/**
 * Dados estáveis do destino. Nome, país, descrições e texto alternativo da
 * imagem ficam nos arquivos de tradução, em `destinations.<id>.*`.
 */
export interface Destination {
  id: string
  categories: readonly CategoryId[]
  continents: readonly Continent[]
  coordinates: Coordinates
  /** Foto de capa (cards e primeiro slide do carrossel). */
  image: DestinationImage
  /**
   * Fotos adicionais. Sem `gallery`, o destino tem uma única foto estática na
   * página de detalhes. Com `gallery`, a tupla exige pelo menos 2 itens: o
   * carrossel só existe com 3 fotos ou mais (capa + 2).
   */
  gallery?: readonly [DestinationImage, DestinationImage, ...DestinationImage[]]
}
