import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

const serviceWorkerUpdateInterval = 60 * 60 * 1000

registerSW({
  immediate: true,
  onRegisteredSW: (_serviceWorkerUrl, registration) => {
    if (!registration) return

    let lastUpdateCheck = 0
    const checkForUpdate = () => {
      if (document.visibilityState !== 'visible' || !navigator.onLine || registration.installing) return
      if (Date.now() - lastUpdateCheck < 60_000) return

      lastUpdateCheck = Date.now()
      void registration.update().catch(() => {
        // A failed check is retried on the next focus, visibility change, or interval.
      })
    }

    window.setInterval(checkForUpdate, serviceWorkerUpdateInterval)
    window.addEventListener('focus', checkForUpdate)
    document.addEventListener('visibilitychange', checkForUpdate)
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
