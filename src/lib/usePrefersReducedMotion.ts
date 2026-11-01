import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/** `true` quando o sistema pede menos movimento; acompanha mudanças em tempo real. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches)
  useEffect(() => {
    const query = window.matchMedia(QUERY)
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}
