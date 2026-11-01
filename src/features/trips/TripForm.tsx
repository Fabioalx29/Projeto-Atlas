import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { DESTINATIONS, getDestinationById } from '../../data/destinations'
import { TRIP_NAME_MAX, TRIP_NOTES_MAX, validateTrip, type TripErrors } from './tripValidation'
import type { TripInput } from './types'

interface TripFormProps {
  heading: string
  initialValues: TripInput
  submitLabel: string
  onSubmit: (values: TripInput) => void
  onCancel: () => void
}

const isKnownDestination = (id: string) => getDestinationById(id) !== undefined

const CONTROL =
  'w-full rounded-control border bg-surface px-3 py-2.5 text-base text-forest placeholder:text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest'
const LABEL = 'block text-sm font-semibold text-forest'

function controlClass(hasError: boolean): string {
  return `${CONTROL} ${hasError ? 'border-red-700' : 'border-line'}`
}

export default function TripForm({
  heading,
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: TripFormProps) {
  const { t, i18n } = useTranslation()
  const uid = useId()
  const [values, setValues] = useState<TripInput>(initialValues)
  // Os erros só aparecem depois da primeira tentativa de salvar; a partir daí atualizam ao digitar
  const [attempted, setAttempted] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const errors: TripErrors = useMemo(
    () => (attempted ? validateTrip(values, isKnownDestination) : {}),
    [attempted, values],
  )

  // Destinos reais do catálogo, em ordem alfabética no idioma atual
  const options = useMemo(
    () =>
      DESTINATIONS.map(({ id }) => ({
        id,
        label: `${t(`destinations.${id}.name`)} — ${t(`destinations.${id}.country`)}`,
      })).sort((a, b) => a.label.localeCompare(b.label, i18n.language)),
    [t, i18n.language],
  )

  function update<K extends keyof TripInput>(field: K, value: TripInput[K]) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    const found = validateTrip(values, isKnownDestination)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus()
      return
    }
    onSubmit(values)
  }

  const fieldId = (field: keyof TripInput) => `${uid}-${field}`
  const errorId = (field: keyof TripInput) => `${uid}-${field}-error`
  const describe = (field: keyof TripInput) => (errors[field] ? errorId(field) : undefined)

  function errorMessage(field: keyof TripInput) {
    const code = errors[field]
    if (!code) return null
    return (
      <p id={errorId(field)} className="mt-1.5 text-sm font-medium text-red-700">
        {t(`trips.errors.${code}`)}
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={heading}
      className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8"
    >
      <h2 className="text-2xl font-semibold">{heading}</h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={fieldId('name')} className={LABEL}>
            {t('trips.fields.name')}
          </label>
          <input
            ref={nameRef}
            id={fieldId('name')}
            type="text"
            value={values.name}
            maxLength={TRIP_NAME_MAX + 20}
            onChange={(event) => update('name', event.target.value)}
            placeholder={t('trips.fields.namePlaceholder')}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe('name')}
            required
            className={`mt-1.5 ${controlClass(!!errors.name)}`}
          />
          {errorMessage('name')}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={fieldId('destinationId')} className={LABEL}>
            {t('trips.fields.destination')}
          </label>
          <select
            id={fieldId('destinationId')}
            value={values.destinationId}
            onChange={(event) => update('destinationId', event.target.value)}
            aria-invalid={errors.destinationId ? true : undefined}
            aria-describedby={describe('destinationId')}
            required
            className={`mt-1.5 ${controlClass(!!errors.destinationId)}`}
          >
            <option value="">{t('trips.fields.destinationPlaceholder')}</option>
            {options.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          {errorMessage('destinationId')}
        </div>

        <div>
          <label htmlFor={fieldId('startDate')} className={LABEL}>
            {t('trips.fields.startDate')}
          </label>
          <input
            id={fieldId('startDate')}
            type="date"
            value={values.startDate}
            onChange={(event) => update('startDate', event.target.value)}
            aria-invalid={errors.startDate ? true : undefined}
            aria-describedby={describe('startDate')}
            required
            className={`mt-1.5 ${controlClass(!!errors.startDate)}`}
          />
          {errorMessage('startDate')}
        </div>

        <div>
          <label htmlFor={fieldId('endDate')} className={LABEL}>
            {t('trips.fields.endDate')}
          </label>
          <input
            id={fieldId('endDate')}
            type="date"
            value={values.endDate}
            min={values.startDate || undefined}
            onChange={(event) => update('endDate', event.target.value)}
            aria-invalid={errors.endDate ? true : undefined}
            aria-describedby={describe('endDate')}
            required
            className={`mt-1.5 ${controlClass(!!errors.endDate)}`}
          />
          {errorMessage('endDate')}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={fieldId('notes')} className={LABEL}>
            {t('trips.fields.notes')}{' '}
            <span className="font-normal text-ink-muted">({t('trips.fields.optional')})</span>
          </label>
          <textarea
            id={fieldId('notes')}
            value={values.notes}
            rows={4}
            onChange={(event) => update('notes', event.target.value)}
            placeholder={t('trips.fields.notesPlaceholder')}
            aria-invalid={errors.notes ? true : undefined}
            aria-describedby={describe('notes')}
            className={`mt-1.5 resize-y ${controlClass(!!errors.notes)}`}
          />
          <p className="mt-1 text-xs text-ink-muted">
            {values.notes.trim().length}/{TRIP_NOTES_MAX}
          </p>
          {errorMessage('notes')}
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-control border border-line px-6 py-2.5 text-sm font-semibold text-forest hover:border-forest"
        >
          {t('common.cancel')}
        </button>
        <button
          type="submit"
          className="rounded-control bg-forest px-6 py-2.5 text-sm font-semibold text-ivory hover:bg-forest-soft"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
