import { isValidIsoDate } from '../../lib/dates'
import { TRIP_NAME_MAX, TRIP_NOTES_MAX } from './tripValidation'
import type { Trip } from './types'

export const TRIPS_STORAGE_KEY = 'atlas.trips.v1'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Valida um item salvo. Devolve `null` se não for uma viagem íntegra. */
function parseTrip(raw: unknown): Trip | null {
  if (!isRecord(raw)) return null
  const { id, name, destinationId, startDate, endDate, notes, createdAt } = raw

  if (typeof id !== 'string' || id === '') return null
  if (typeof name !== 'string' || name.trim() === '') return null
  if (typeof destinationId !== 'string' || destinationId === '') return null
  if (typeof startDate !== 'string' || !isValidIsoDate(startDate)) return null
  if (typeof endDate !== 'string' || !isValidIsoDate(endDate) || endDate < startDate) return null

  return {
    id,
    name: name.trim().slice(0, TRIP_NAME_MAX),
    destinationId,
    startDate,
    endDate,
    notes: typeof notes === 'string' ? notes.trim().slice(0, TRIP_NOTES_MAX) : '',
    createdAt: typeof createdAt === 'number' && Number.isFinite(createdAt) ? createdAt : 0,
  }
}

/**
 * Converte o que veio do localStorage em uma lista confiável de viagens:
 * descarta itens inválidos ou corrompidos e remove ids duplicados.
 * Viagens cujo destino saiu do catálogo são mantidas (a interface trata esse caso).
 */
export function parseTrips(raw: unknown): Trip[] {
  if (!Array.isArray(raw)) return []
  const seen = new Set<string>()
  const trips: Trip[] = []
  for (const item of raw) {
    const trip = parseTrip(item)
    if (!trip || seen.has(trip.id)) continue
    seen.add(trip.id)
    trips.push(trip)
  }
  return trips
}

/** Ordena pela data de ida (depois volta e criação), sem alterar a lista original. */
export function sortTrips(trips: readonly Trip[]): Trip[] {
  return [...trips].sort(
    (a, b) =>
      a.startDate.localeCompare(b.startDate) ||
      a.endDate.localeCompare(b.endDate) ||
      a.createdAt - b.createdAt,
  )
}
