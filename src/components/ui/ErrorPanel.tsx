import type { ReactNode } from 'react'
import { TriangleAlert } from 'lucide-react'

interface ErrorPanelProps {
  title: string
  text: string
  /** Botões de ação (tentar novamente, voltar ao início...). */
  actions?: ReactNode
  className?: string
}

/** Mensagem de erro com ícone e texto (nunca só cor), usada pelos limites de erro. */
export default function ErrorPanel({ title, text, actions, className = '' }: ErrorPanelProps) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center gap-2 p-8 text-center ${className}`}
    >
      <TriangleAlert size={32} strokeWidth={1.25} className="text-gold-deep" aria-hidden="true" />
      <p className="font-display text-xl font-semibold">{title}</p>
      <p className="max-w-md text-sm text-ink-muted">{text}</p>
      {actions && <div className="mt-3 flex flex-wrap justify-center gap-3">{actions}</div>}
    </div>
  )
}
