import { isValidIsoDate } from '../../lib/dates'
import type { TripInput } from './types'

export const TRIP_NAME_MAX = 80
export const TRIP_NOTES_MAX = 1000

export type TripField = keyof TripInput

/** Os códigos correspondem às chaves de tradução em `trips.errors.<código>`. */
export type TripErrorCode =
  | 'nameRequired'
  | 'nameTooLong'
  | 'destinationRequired'
  | 'destinationUnknown'
  | 'startRequired'
  | 'startInvalid'
  | 'endRequired'
  | 'endInvalid'
  | 'endBeforeStart'
  | 'notesTooLong'

export type TripErrors = Partial<Record<TripField, TripErrorCode>>

/**
 * Valida os campos de uma viagem. Devolve um objeto vazio quando está tudo certo.
 * As chaves seguem a ordem dos campos do formulário (útil para focar o primeiro erro).
 */
export function validateTrip(
  values: TripInput,
  isKnownDestination: (id: string) => boolean,
): TripErrors {
  const errors: TripErrors = {}

  const name = values.name.trim()
  if (name === '') errors.name = 'nameRequired'
  else if (name.length > TRIP_NAME_MAX) errors.name = 'nameTooLong'

  if (values.destinationId === '') errors.destinationId = 'destinationRequired'
  else if (!isKnownDestination(values.destinationId)) errors.destinationId = 'destinationUnknown'

  if (values.startDate === '') errors.startDate = 'startRequired'
  else if (!isValidIsoDate(values.startDate)) errors.startDate = 'startInvalid'

  if (values.endDate === '') errors.endDate = 'endRequired'
  else if (!isValidIsoDate(values.endDate)) errors.endDate = 'endInvalid'
  else if (!errors.startDate && values.endDate < values.startDate) errors.endDate = 'endBeforeStart'

  if (values.notes.trim().length > TRIP_NOTES_MAX) errors.notes = 'notesTooLong'

  return errors
}
