interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
  className?: string
  /** Nível semântico do título: h1 nas páginas sem outro h1, h2 nas seções (padrão). */
  as?: 'h1' | 'h2'
}

export default function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  className = '',
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">
        <span className="h-px w-8 bg-gold" aria-hidden="true" />
        {eyebrow}
      </p>
      <Heading id={id} className="mt-4 text-balance text-3xl font-semibold sm:text-5xl">
        {title}
      </Heading>
      {subtitle && <p className="mt-4 text-lg text-ink-muted">{subtitle}</p>}
    </div>
  )
}
