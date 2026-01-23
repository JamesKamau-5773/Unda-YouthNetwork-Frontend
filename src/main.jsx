import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AlertProvider } from './components/shared/GlobalAlert'

// Build stamp to force new bundle hash when we request a redeploy
const __BUILD_STAMP = '2026-01-23T00:00:00Z';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </StrictMode>,
)
