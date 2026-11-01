import { commonsFilePage, commonsImageUrl } from '../lib/commons'
import { findPhotoProblems } from '../features/destinations/photos'
import type { Destination, DestinationImage } from '../types/destination'

function photo(fileName: string, width: number): DestinationImage {
  return { src: commonsImageUrl(fileName, width), sourceUrl: commonsFilePage(fileName) }
}

const HERO_FILE = 'Moraine Lake-Banff NP.JPG'

export const HERO_IMAGE: DestinationImage = photo(HERO_FILE, 2000)

const MAIN_WIDTH = 1400
const GALLERY_WIDTH = 1400

/**
 * Para cadastrar uma cidade nova, basta acrescentar um item aqui (e as
 * traduções em `destinations.<id>` nos arquivos de idioma).
 * - Só `image`: a página de detalhes mostra uma única foto estática.
 * - `image` + `gallery` (2+ itens): a página de detalhes monta o carrossel automaticamente.
 */
export const DESTINATIONS: readonly Destination[] = [
  {
    id: 'kyoto',
    categories: ['culture', 'gastronomy', 'nature'],
    continents: ['asia'],
    coordinates: { lat: 35.0116, lng: 135.7681 },
    image: photo('Torii path with lantern at Fushimi Inari Taisha Shrine, Kyoto, Japan.jpg', MAIN_WIDTH),
    gallery: [
      photo('Kinkaku-ji, Kyoto, Japan, 2004.jpg', GALLERY_WIDTH),
      photo('Sagano Bamboo Forest at Arashimaya.jpg', GALLERY_WIDTH),
      photo('KyotoFushimiInariLarge.jpg', GALLERY_WIDTH),
    ],
  },
  {
    id: 'paris',
    categories: ['culture', 'gastronomy'],
    continents: ['europe'],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    image: photo('Tour Eiffel Wikimedia Commons.jpg', MAIN_WIDTH),
    gallery: [
      photo('Louvre Pyramid.jpg', GALLERY_WIDTH),
      photo('Notre Dame dalla Senna.jpg', GALLERY_WIDTH),
      photo('Eiffel Tower and Pont Alexandre III at night.jpg', GALLERY_WIDTH),
    ],
  },
  {
    id: 'lisbon',
    categories: ['culture', 'gastronomy'],
    continents: ['europe'],
    coordinates: { lat: 38.7223, lng: -9.1393 },
    image: photo('Miradouro Portas do Sol I.jpg', MAIN_WIDTH),
    gallery: [
      photo('Alfama-CCBY.jpg', GALLERY_WIDTH),
      photo('Torre de Belém Lisboa Richard Bartz.jpg', GALLERY_WIDTH),
    ],
  },
  {
    id: 'bali',
    categories: ['nature', 'beaches'],
    continents: ['asia'],
    coordinates: { lat: -8.4095, lng: 115.1889 },
    image: photo('Rice terraces, Bali.jpg', MAIN_WIDTH),
    gallery: [
      photo('Bali, Rice fields in the forest, East Bali, Indonesia.jpg', GALLERY_WIDTH),
      photo('Brantan Bali Pura-Ulun-Danu-Bratan-01.jpg', GALLERY_WIDTH),
    ],
  },
  {
    id: 'newyork',
    categories: ['culture', 'gastronomy'],
    continents: ['northAmerica'],
    coordinates: { lat: 40.7128, lng: -74.006 },
    image: photo('New York Midtown Skyline at night - Jan 2006 edit1.jpg', MAIN_WIDTH),
    gallery: [
      photo('Lower Manhattan from Governors Island August 2017 panorama.jpg', GALLERY_WIDTH),
      photo('Statue of Liberty, NY.jpg', GALLERY_WIDTH),
    ],
  },
  {
    id: 'rome',
    categories: ['culture', 'gastronomy'],
    continents: ['europe'],
    coordinates: { lat: 41.9028, lng: 12.4964 },
    image: photo('Colosseo 2020.jpg', MAIN_WIDTH),
    gallery: [
      photo('Trevi Fountain, Rome, Italy 2 - May 2007.jpg', GALLERY_WIDTH),
      photo('Rome Pantheon front.jpg', GALLERY_WIDTH),
    ],
  },
  {
    id: 'capetown',
    categories: ['nature', 'beaches', 'culture'],
    continents: ['africa'],
    coordinates: { lat: -33.9249, lng: 18.4241 },
    image: photo('SM 20120719 4561 WLM 2014 Table Mountain, Cape Town.jpg', MAIN_WIDTH),
    gallery: [
      photo('View from Table Mountain (Unsplash).jpg', GALLERY_WIDTH),
      photo('Table Mountain-Kings Blockhouse-001.jpg', GALLERY_WIDTH),
    ],
  },
  {
    id: 'rio',
    categories: ['beaches', 'nature', 'culture'],
    continents: ['southAmerica'],
    coordinates: { lat: -22.9068, lng: -43.1729 },
    image: photo('Rio de Janeiro, Pão de Açúcar from Cristo Redentor (15744316848).jpg', MAIN_WIDTH),
    gallery: [
      photo('Christ on Corcovado mountain.JPG', GALLERY_WIDTH),
      photo('Rio de Janeiro-Urca.jpg', GALLERY_WIDTH),
    ],
  },
  {
    id: 'vancouver',
    categories: ['nature', 'beaches'],
    continents: ['northAmerica'],
    coordinates: { lat: 49.2827, lng: -123.1207 },
    image: photo('Vista de Vancouver, Canadá, 2017-08-14, DD 39.jpg', MAIN_WIDTH),
    gallery: [
      photo('Vancouverwaskyline 004.jpg', GALLERY_WIDTH),
      photo('Stanley Park, Vancouver (7889964786).jpg', GALLERY_WIDTH),
    ],
  },
  {
    id: 'istanbul',
    categories: ['culture', 'gastronomy'],
    continents: ['europe', 'asia'],
    coordinates: { lat: 41.0082, lng: 28.9784 },
    image: photo('Istanbul Hagia Sophia IMG 7406 1800.jpg', MAIN_WIDTH),
    gallery: [
      photo('Blue Mosque (The Sultan Ahmed Mosque) (8396648956).jpg', GALLERY_WIDTH),
      photo('Galata Tower (67m.).jpg', GALLERY_WIDTH),
    ],
  },
  {
    id: 'seoul',
    categories: ['culture', 'gastronomy'],
    continents: ['asia'],
    coordinates: { lat: 37.5665, lng: 126.978 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Seoul Gyeongbokgung palace exterior view.jpg', MAIN_WIDTH),
  },
  {
    id: 'bangkok',
    categories: ['culture', 'gastronomy'],
    continents: ['asia'],
    coordinates: { lat: 13.7563, lng: 100.5018 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Wat Arun in Bangkok Yai District, Bangkok, Thailand.jpg', MAIN_WIDTH),
  },
  {
    id: 'singapore',
    categories: ['culture', 'gastronomy', 'nature'],
    continents: ['asia'],
    coordinates: { lat: 1.3521, lng: 103.8198 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Marina Bay and the Singapore skyline at dusk - 20110311.jpg', MAIN_WIDTH),
  },
  {
    id: 'mumbai',
    categories: ['culture', 'gastronomy'],
    continents: ['asia'],
    coordinates: { lat: 19.076, lng: 72.8777 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Gateway of India -Mumbai.jpg', MAIN_WIDTH),
  },
  {
    id: 'hanoi',
    categories: ['culture', 'gastronomy'],
    continents: ['asia'],
    coordinates: { lat: 21.0285, lng: 105.8542 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Hoan Kiem Lake, Hanoi, Vietnam.jpg', MAIN_WIDTH),
  },
  {
    id: 'osaka',
    categories: ['gastronomy', 'culture'],
    continents: ['asia'],
    coordinates: { lat: 34.6937, lng: 135.5023 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Osaka Castle 03bs3200.jpg', MAIN_WIDTH),
  },
  {
    id: 'marrakech',
    categories: ['culture', 'gastronomy'],
    continents: ['africa'],
    coordinates: { lat: 31.6295, lng: -7.9811 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Marrakesh Jemaa El Fna.jpg', MAIN_WIDTH),
  },
  {
    id: 'cairo',
    categories: ['culture'],
    continents: ['africa'],
    coordinates: { lat: 30.0444, lng: 31.2357 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Giza-pyramids.JPG', MAIN_WIDTH),
  },
  {
    id: 'nairobi',
    categories: ['nature', 'culture'],
    continents: ['africa'],
    coordinates: { lat: -1.2921, lng: 36.8219 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Nairobi City Skyline.jpg', MAIN_WIDTH),
  },
  {
    id: 'toronto',
    categories: ['culture', 'gastronomy'],
    continents: ['northAmerica'],
    coordinates: { lat: 43.6532, lng: -79.3832 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Toronto Skyline.jpg', MAIN_WIDTH),
  },
  {
    id: 'mexicocity',
    categories: ['culture', 'gastronomy'],
    continents: ['northAmerica'],
    coordinates: { lat: 19.4326, lng: -99.1332 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Palacio de Bellas Artes, Mexico City, MX.jpg', MAIN_WIDTH),
  },
  {
    id: 'buenosaires',
    categories: ['culture', 'gastronomy'],
    continents: ['southAmerica'],
    coordinates: { lat: -34.6037, lng: -58.3816 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Avenida 9 de Julio - Obelisco - Buenos Aires.jpg', MAIN_WIDTH),
  },
  {
    id: 'santiago',
    categories: ['nature', 'gastronomy'],
    continents: ['southAmerica'],
    coordinates: { lat: -33.4489, lng: -70.6693 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Skyline of Santiago, Chile.jpg', MAIN_WIDTH),
  },
  {
    id: 'cusco',
    categories: ['culture', 'nature'],
    continents: ['southAmerica'],
    coordinates: { lat: -13.532, lng: -71.9675 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Plaza de Armas - Cusco.jpg', MAIN_WIDTH),
  },
  {
    id: 'prague',
    categories: ['culture', 'gastronomy'],
    continents: ['europe'],
    coordinates: { lat: 50.0755, lng: 14.4378 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('The Castle and Charles Bridge, Prague - 7982.jpg', MAIN_WIDTH),
  },
  {
    id: 'amsterdam',
    categories: ['culture'],
    continents: ['europe'],
    coordinates: { lat: 52.3676, lng: 4.9041 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Colorful canal houses at golden hour in Damrak avenue Amsterdam the Netherlands.jpg', MAIN_WIDTH),
  },
  {
    id: 'vienna',
    categories: ['culture', 'gastronomy'],
    continents: ['europe'],
    coordinates: { lat: 48.2082, lng: 16.3738 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Schönbrunn Palace, Vienna.JPG', MAIN_WIDTH),
  },
  {
    id: 'athens',
    categories: ['culture', 'gastronomy'],
    continents: ['europe'],
    coordinates: { lat: 37.9838, lng: 23.7275 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Parthenon-Acropolis of Athens.jpg', MAIN_WIDTH),
  },
  {
    id: 'zurich',
    categories: ['nature', 'culture'],
    continents: ['europe'],
    coordinates: { lat: 47.3769, lng: 8.5417 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Limmat Grossmüster.jpg', MAIN_WIDTH),
  },
  {
    id: 'edinburgh',
    categories: ['culture', 'nature'],
    continents: ['europe'],
    coordinates: { lat: 55.9533, lng: -3.1883 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Edinburgh Old Town Skyline.jpg', MAIN_WIDTH),
  },
  {
    id: 'sydney',
    categories: ['beaches', 'culture'],
    continents: ['oceania'],
    coordinates: { lat: -33.8688, lng: 151.2093 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Sydney Opera House and Harbour Bridge.jpg', MAIN_WIDTH),
  },
  {
    id: 'melbourne',
    categories: ['culture', 'gastronomy'],
    continents: ['oceania'],
    coordinates: { lat: -37.8136, lng: 144.9631 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Melbourne CBD skyline and the Yarra river as seen from Southbank (iPhone) (29845387643).jpg', MAIN_WIDTH),
  },
  {
    id: 'auckland',
    categories: ['nature', 'beaches'],
    continents: ['oceania'],
    coordinates: { lat: -36.8485, lng: 174.7633 },
    // Foto única e estática (sem galeria): a página de detalhes mostra só esta imagem
    image: photo('Auckland skyline (24045221962).jpg', MAIN_WIDTH),
  },
]

// Aviso em desenvolvimento se alguma cidade tiver fotos repetidas ou insuficientes
if (import.meta.env?.DEV) {
  const problems = findPhotoProblems(DESTINATIONS)
  if (problems.length > 0) console.error('Atlas: problemas nas fotos dos destinos\n' + problems.join('\n'))
}

/** Destinos exibidos na seção "em destaque" da Home, na ordem desejada. */
const FEATURED_IDS = ['kyoto', 'paris', 'lisbon', 'bali', 'newyork'] as const

export function getDestinationById(id: string): Destination | undefined {
  return DESTINATIONS.find((destination) => destination.id === id)
}

export const FEATURED_DESTINATIONS: readonly Destination[] = FEATURED_IDS.flatMap((id) => {
  const destination = getDestinationById(id)
  return destination ? [destination] : []
})

/** Créditos das fotografias principais (hero + destinos). */
export const PHOTO_CREDITS: readonly { id: string; sourceUrl: string }[] = [
  { id: 'hero', sourceUrl: HERO_IMAGE.sourceUrl },
  ...DESTINATIONS.map((destination) => ({
    id: destination.id,
    sourceUrl: destination.image.sourceUrl,
  })),
]
