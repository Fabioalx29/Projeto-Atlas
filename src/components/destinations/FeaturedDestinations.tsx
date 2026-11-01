import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import DestinationCard from './DestinationCard'
import { FEATURED_DESTINATIONS } from '../../data/destinations'

export default function FeaturedDestinations() {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="featured-title" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="featured-title"
            eyebrow={t('featured.eyebrow')}
            title={t('featured.title')}
            subtitle={t('featured.subtitle')}
          />
          <Link
            to="/explore"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-forest hover:text-gold-deep"
          >
            {t('featured.viewAll')}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:auto-rows-[20rem] lg:grid-cols-4 lg:gap-5">
          {FEATURED_DESTINATIONS.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              featured={index === 0}
              className={index === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
