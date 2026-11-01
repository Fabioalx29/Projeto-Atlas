import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { DESTINATIONS } from '../../data/destinations'
import { CATEGORY_ICONS } from '../../lib/categoryIcons'
import { CATEGORY_IDS } from '../../types/destination'

export default function CategoriesSection() {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="categories-title" className="bg-surface py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <SectionHeading
          id="categories-title"
          eyebrow={t('categories.eyebrow')}
          title={t('categories.title')}
          subtitle={t('categories.subtitle')}
        />

        <ul className="divide-y divide-line border-y border-line">
          {CATEGORY_IDS.map((id, index) => {
            const Icon = CATEGORY_ICONS[id]
            const count = DESTINATIONS.filter((destination) =>
              destination.categories.includes(id),
            ).length

            return (
              <li key={id}>
                <Link
                  to={`/explore?category=${id}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-2 py-6 hover:bg-ivory sm:gap-6 sm:px-4"
                >
                  <span className="font-display text-sm font-semibold text-gold-deep">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex items-center gap-4">
                    <Icon size={28} strokeWidth={1.5} className="shrink-0 text-forest" aria-hidden="true" />
                    <span>
                      <span className="block font-display text-2xl font-semibold">
                        {t(`categories.${id}.name`)}
                      </span>
                      <span className="mt-1 block text-sm text-ink-muted">
                        {t(`categories.${id}.description`)}
                      </span>
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="hidden text-xs text-ink-muted sm:inline">
                      {t('categories.count', { count })}
                    </span>
                    <ArrowUpRight
                      size={20}
                      aria-hidden="true"
                      className="text-forest transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep"
                    />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
