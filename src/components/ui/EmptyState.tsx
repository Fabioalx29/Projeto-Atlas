import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  text: string
  action?: ReactNode
}

export default function EmptyState({ icon: Icon, title, text, action }: EmptyStateProps) {
  return (
    <div className="rounded-card border border-dashed border-line bg-surface px-6 py-16 text-center">
      <Icon size={44} strokeWidth={1.25} className="mx-auto text-gold-deep" aria-hidden="true" />
      <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-ink-muted">{text}</p>
      {action && <div className="mt-7">{action}</div>}
    </div>
  )
}
