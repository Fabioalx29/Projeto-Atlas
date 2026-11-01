
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import './index.css'
import './i18n'
import App from './App'
import { ToastProvider } from './components/ui/Toast'
import { FavoritesProvider } from './features/favorites/FavoritesContext'
import { TripsProvider } from './features/trips/TripsContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ToastProvider>
        <FavoritesProvider>
          <TripsProvider>
            <App />
          </TripsProvider>
        </FavoritesProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
