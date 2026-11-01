import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { readStorage, writeStorage } from './storage'

interface PersistedState<T> {
  value: T
  setValue: Dispatch<SetStateAction<T>>
  /** `true` quando a última gravação no navegador falhou. */
  writeFailed: boolean
}

/**
 * Estado React espelhado no localStorage.
 *
 * - Ao iniciar, lê e valida o que estava salvo (`parse` nunca deve confiar no dado).
 * - A cada mudança, grava no navegador; a interface atualiza na hora, sem esperar a gravação.
 * - Mudanças feitas em outra aba do mesmo navegador chegam pelo evento `storage`.
 *
 * `parse` e `createInitial` devem ser funções estáveis (definidas fora do componente).
 */
export function usePersistedState<T>(
  key: string,
  parse: (raw: unknown) => T,
  createInitial: () => T,
): PersistedState<T> {
  const [value, setValue] = useState<T>(() => readStorage(key, parse) ?? createInitial())
  const [writeFailed, setWriteFailed] = useState(false)

  useEffect(() => {
    setWriteFailed(!writeStorage(key, value))
  }, [key, value])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      // `key === null` significa que o armazenamento inteiro foi limpo
      if (event.key !== null && event.key !== key) return
      setValue(readStorage(key, parse) ?? createInitial())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key, parse, createInitial])

  return { value, setValue, writeFailed }
}
