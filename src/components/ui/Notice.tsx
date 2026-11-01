import type { ReactNode } from 'react'
import { Info, TriangleAlert } from 'lucide-react'

interface NoticeProps {
  tone?: 'info' | 'warning'
  children: ReactNode
  className?: string
}

export default function Notice({ tone = 'info', children, className = '' }: NoticeProps) {
  const Icon = tone === 'warning' ? TriangleAlert : Info
  const colors =
    tone === 'warning'
      ? 'border-gold bg-gold/15 text-forest'
      : 'border-line bg-surface text-ink-muted'

  return (
    <p
      role={tone === 'warning' ? 'alert' : undefined}
      className={`flex gap-3 rounded-control border px-4 py-3 text-sm ${colors} ${className}`}
    >
      <Icon size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
