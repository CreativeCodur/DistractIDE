import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Import security utilities
import { initCsrfProtection } from './middleware/csrfProtection'

// Import theme utilities
import { applyThemeColorFromStorage } from './utils/themeUtils'

// Initialize security measures
initCsrfProtection()

// Apply theme color from localStorage before React renders
applyThemeColorFromStorage()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
