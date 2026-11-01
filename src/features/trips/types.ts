export interface Trip {
  /** Identificador estável (UUID). */
  id: string
  name: string
  /** `id` de um destino do catálogo (`src/data/destinations.ts`). */
  destinationId: string
  /** Data de ida, "AAAA-MM-DD". */
  startDate: string
  /** Data de retorno, "AAAA-MM-DD". */
  endDate: string
  notes: string
  /** Momento da criação (ms desde 1970), usado como critério de desempate. */
  createdAt: number
}

/** Campos preenchidos pelo usuário no formulário. */
export type TripInput = Omit<Trip, 'id' | 'createdAt'>

export const EMPTY_TRIP_INPUT: TripInput = {
  name: '',
  destinationId: '',
  startDate: '',
  endDate: '',
  notes: '',
}
