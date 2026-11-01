import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Luggage, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import Container from '../components/ui/Container'
import EmptyState from '../components/ui/EmptyState'
import Notice from '../components/ui/Notice'
import SectionHeading from '../components/ui/SectionHeading'
import { useToast } from '../components/ui/Toast'
import { getDestinationById } from '../data/destinations'
import { usePageMeta } from '../lib/usePageMeta'
import TripCard from '../features/trips/TripCard'
import TripForm from '../features/trips/TripForm'
import { useTrips } from '../features/trips/TripsContext'
import { EMPTY_TRIP_INPUT, type Trip, type TripInput } from '../features/trips/types'

type FormMode = { kind: 'closed' } | { kind: 'create'; destinationId: string } | { kind: 'edit'; id: string }

const PRIMARY_BUTTON =
  'inline-flex items-center gap-2 rounded-control bg-forest px-6 py-3 text-sm font-semibold text-ivory hover:bg-forest-soft'

export default function TripsPage() {
  const { t } = useTranslation()
  usePageMeta(t('meta.trips.title'), t('meta.trips.description'))
  const { showToast } = useToast()
  const { trips, addTrip, updateTrip, deleteTrip, storageError } = useTrips()
  const [searchParams, setSearchParams] = useSearchParams()

  // "Planejar uma viagem" na página do destino chega aqui com ?destination=<id>
  const [mode, setMode] = useState<FormMode>(() => {
    const preselected = searchParams.get('destination')
    return preselected && getDestinationById(preselected)
      ? { kind: 'create', destinationId: preselected }
      : { kind: 'closed' }
  })
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null)

  function closeForm() {
    setMode({ kind: 'closed' })
    if (searchParams.has('destination')) setSearchParams({}, { replace: true })
  }

  function handleCreate(values: TripInput) {
    const trip = addTrip(values)
    showToast(t('trips.toast.created', { name: trip.name }))
    closeForm()
  }

  function handleUpdate(id: string, values: TripInput) {
    updateTrip(id, values)
    showToast(t('trips.toast.updated', { name: values.name.trim() }))
    closeForm()
  }

  function handleConfirmDelete() {
    if (!tripToDelete) return
    deleteTrip(tripToDelete.id)
    showToast(t('trips.toast.deleted', { name: tripToDelete.name }))
    // Se a viagem excluída estava sendo editada, fecha o formulário
    if (mode.kind === 'edit' && mode.id === tripToDelete.id) closeForm()
    setTripToDelete(null)
  }

  const creating = mode.kind === 'create'

  return (
    <Container className="py-12 sm:py-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="trips-title"
          as="h1"
          eyebrow={t('nav.trips')}
          title={t('trips.title')}
          subtitle={t('trips.subtitle')}
        />
        {!creating && (
          <button
            type="button"
            onClick={() => setMode({ kind: 'create', destinationId: '' })}
            className={`${PRIMARY_BUTTON} shrink-0 self-start sm:self-auto`}
          >
            <Plus size={16} aria-hidden="true" />
            {t('trips.new')}
          </button>
        )}
      </div>

      <div className="mt-8 space-y-3">
        <Notice>{t('storage.notice')}</Notice>
        {storageError && <Notice tone="warning">{t('storage.error')}</Notice>}
      </div>

      {creating && (
        <div className="mt-8">
          <TripForm
            heading={t('trips.newTitle')}
            initialValues={{ ...EMPTY_TRIP_INPUT, destinationId: mode.destinationId }}
            submitLabel={t('trips.create')}
            onSubmit={handleCreate}
            onCancel={closeForm}
          />
        </div>
      )}

      <div className="mt-10">
        {trips.length === 0 ? (
          !creating && (
            <EmptyState
              icon={Luggage}
              title={t('trips.emptyTitle')}
              text={t('trips.emptyText')}
              action={
                <button
                  type="button"
                  onClick={() => setMode({ kind: 'create', destinationId: '' })}
                  className={PRIMARY_BUTTON}
                >
                  <Plus size={16} aria-hidden="true" />
                  {t('trips.emptyAction')}
                </button>
              }
            />
          )
        ) : (
          <>
            <p role="status" aria-live="polite" className="mb-2 text-sm text-ink-muted">
              {t('trips.count', { count: trips.length })}
            </p>
            <p className="mb-6 text-xs text-ink-muted">{t('trips.sortedNote')}</p>
            <ul className="space-y-5">
              {trips.map((trip) => (
                <li key={trip.id}>
                  {mode.kind === 'edit' && mode.id === trip.id ? (
                    <TripForm
                      heading={t('trips.editTitle')}
                      initialValues={{
                        name: trip.name,
                        destinationId: trip.destinationId,
                        startDate: trip.startDate,
                        endDate: trip.endDate,
                        notes: trip.notes,
                      }}
                      submitLabel={t('trips.saveChanges')}
                      onSubmit={(values) => handleUpdate(trip.id, values)}
                      onCancel={closeForm}
                    />
                  ) : (
                    <TripCard
                      trip={trip}
                      onEdit={(item) => setMode({ kind: 'edit', id: item.id })}
                      onDelete={setTripToDelete}
                    />
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <ConfirmDialog
        open={tripToDelete !== null}
        title={t('trips.confirm.title')}
        message={t('trips.confirm.text', { name: tripToDelete?.name ?? '' })}
        confirmLabel={t('trips.confirm.confirm')}
        cancelLabel={t('common.cancel')}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTripToDelete(null)}
      />
    </Container>
  )
}
