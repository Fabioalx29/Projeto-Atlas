import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'
import { createId } from '../../lib/id'
import { usePersistedState } from '../../lib/usePersistedState'
import { parseTrips, sortTrips, TRIPS_STORAGE_KEY } from './tripsStorage'
import type { Trip, TripInput } from './types'

interface TripsContextValue {
  /** Viagens ordenadas pela data de ida. */
  trips: readonly Trip[]
  addTrip: (input: TripInput) => Trip
  updateTrip: (id: string, input: TripInput) => void
  deleteTrip: (id: string) => void
  getTrip: (id: string) => Trip | undefined
  /** `true` se não foi possível gravar no navegador (os dados valem só nesta sessão). */
  storageError: boolean
}

const TripsContext = createContext<TripsContextValue | null>(null)

const createInitial = (): Trip[] => []

function normalize(input: TripInput): TripInput {
  return { ...input, name: input.name.trim(), notes: input.notes.trim() }
}

/** Fonte única das viagens salvas. A validação dos campos é feita pelo formulário. */
export function TripsProvider({ children }: { children: ReactNode }) {
  const { value, setValue, writeFailed } = usePersistedState(
    TRIPS_STORAGE_KEY,
    parseTrips,
    createInitial,
  )

  const trips = useMemo(() => sortTrips(value), [value])

  const addTrip = useCallback(
    (input: TripInput): Trip => {
      const trip: Trip = { ...normalize(input), id: createId(), createdAt: Date.now() }
      setValue((current) => [...current, trip])
      return trip
    },
    [setValue],
  )

  const updateTrip = useCallback(
    (id: string, input: TripInput) => {
      setValue((current) =>
        current.map((trip) => (trip.id === id ? { ...trip, ...normalize(input) } : trip)),
      )
    },
    [setValue],
  )

  const deleteTrip = useCallback(
    (id: string) => setValue((current) => current.filter((trip) => trip.id !== id)),
    [setValue],
  )

  const getTrip = useCallback((id: string) => value.find((trip) => trip.id === id), [value])

  const context = useMemo<TripsContextValue>(
    () => ({ trips, addTrip, updateTrip, deleteTrip, getTrip, storageError: writeFailed }),
    [trips, addTrip, updateTrip, deleteTrip, getTrip, writeFailed],
  )

  return <TripsContext.Provider value={context}>{children}</TripsContext.Provider>
}

export function useTrips(): TripsContextValue {
  const context = useContext(TripsContext)
  if (!context) throw new Error('useTrips deve ser usado dentro de <TripsProvider>')
  return context
}
