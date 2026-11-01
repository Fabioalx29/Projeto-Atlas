import { useEffect } from 'react'

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

/**
 * Atualiza título e descrição da página (e as tags Open Graph equivalentes).
 * Como o Atlas é uma SPA, cada página chama este hook com textos já traduzidos;
 * ao trocar de idioma o componente re-renderiza e o título acompanha.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
  }, [title, description])
}
