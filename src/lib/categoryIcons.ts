import { Landmark, Trees, UtensilsCrossed, Waves, type LucideIcon } from 'lucide-react'
import type { CategoryId } from '../types/destination'

export const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  nature: Trees,
  culture: Landmark,
  beaches: Waves,
  gastronomy: UtensilsCrossed,
}
