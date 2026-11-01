import { useTranslation } from 'react-i18next'
import { usePageMeta } from '../lib/usePageMeta'
import Hero from '../components/home/Hero'
import SavedSection from '../components/home/SavedSection'
import FeaturedDestinations from '../components/destinations/FeaturedDestinations'
import CategoriesSection from '../components/home/CategoriesSection'
import CallToAction from '../components/home/CallToAction'

export default function HomePage() {
  const { t } = useTranslation()
  usePageMeta(t('meta.home.title'), t('meta.home.description'))

  return (
    <>
      <Hero />
      <SavedSection />
      <FeaturedDestinations />
      <CategoriesSection />
      <CallToAction />
    </>
  )
}
