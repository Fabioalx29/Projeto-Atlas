import { useParams } from 'react-router-dom'
import DestinationDetails from '../components/destinations/DestinationDetails'
import DestinationNotFound from '../components/destinations/DestinationNotFound'
import { getDestinationById } from '../data/destinations'

export default function DestinationPage() {
  const { id = '' } = useParams<{ id: string }>()
  const destination = getDestinationById(id)

  if (!destination) return <DestinationNotFound id={id} />

  // `key` reinicia o estado local (ex.: favorito visual) ao trocar de destino
  return <DestinationDetails key={destination.id} destination={destination} />
}
