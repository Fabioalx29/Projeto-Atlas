const COMMONS_BASE = 'https://commons.wikimedia.org/wiki'

/** URL de imagem redimensionada do Wikimedia Commons a partir do nome do arquivo. */
export function commonsImageUrl(fileName: string, width: number): string {
  return `${COMMONS_BASE}/Special:FilePath/${encodeURIComponent(fileName)}?width=${width}`
}

/** Página do arquivo no Commons, onde constam autoria e licença. */
export function commonsFilePage(fileName: string): string {
  return `${COMMONS_BASE}/File:${encodeURIComponent(fileName.replace(/ /g, '_'))}`
}

const WIDTH_PARAM = /([?&]width=)\d+/

/**
 * `srcset` com várias larguras de uma URL do Commons (que redimensiona sob demanda),
 * para que cards pequenos não baixem a imagem em tamanho máximo. Devolve `undefined`
 * se a URL não for de redimensionamento, mantendo o `src` original como único candidato.
 */
export function commonsSrcSet(src: string, widths: readonly number[]): string | undefined {
  if (!WIDTH_PARAM.test(src)) return undefined
  return widths.map((width) => `${src.replace(WIDTH_PARAM, `$1${width}`)} ${width}w`).join(', ')
}
