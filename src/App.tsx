import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import DestinationPage from './pages/DestinationPage'
import FavoritesPage from './pages/FavoritesPage'
import TripsPage from './pages/TripsPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="destination/:id" element={<DestinationPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="trips" element={<TripsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
