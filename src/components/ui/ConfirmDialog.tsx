import { useEffect, useId, useRef } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
}

/**
 * Confirmação modal sobre o elemento nativo <dialog>: o navegador cuida do
 * bloqueio de foco, do fundo inerte e da tecla Escape.
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const messageId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={messageId}
      onCancel={(event) => {
        // Escape: deixa o React controlar o fechamento
        event.preventDefault()
        onCancel()
      }}
      onClick={(event) => {
        // Clique no fundo escurecido (o alvo é o próprio <dialog>)
        if (event.target === event.currentTarget) onCancel()
      }}
      className="m-auto w-[min(92vw,26rem)] rounded-card border border-line bg-surface p-0 text-forest shadow-card backdrop:bg-forest/60"
    >
      <div className="p-6">
        <h2 id={titleId} className="text-2xl font-semibold">
          {title}
        </h2>
        <p id={messageId} className="mt-3 text-ink-muted">
          {message}
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-control border border-line px-5 py-2.5 text-sm font-semibold text-forest hover:border-forest"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-control bg-red-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-900"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
}
