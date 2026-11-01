/**
 * Acesso seguro ao localStorage. O acesso pode lançar exceção (modo privado,
 * armazenamento bloqueado, cota cheia), então tudo fica dentro de try/catch.
 */

/**
 * Lê e valida um valor salvo. `parse` recebe o JSON já convertido (tipo
 * `unknown`) e devolve o valor saneado. Devolve `null` se não houver nada
 * salvo, se o JSON estiver corrompido ou se a leitura falhar.
 */
export function readStorage<T>(key: string, parse: (raw: unknown) => T): T | null {
  try {
    const text = globalThis.localStorage.getItem(key)
    if (text === null) return null
    return parse(JSON.parse(text) as unknown)
  } catch {
    return null
  }
}

/** Grava um valor como JSON. Devolve `false` se não foi possível gravar. */
export function writeStorage(key: string, value: unknown): boolean {
  try {
    globalThis.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
