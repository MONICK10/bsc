import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerServiceWorker, checkPWASupport } from './utils/pwa'

// Register service worker for PWA (in production and dev with flag)
if ('serviceWorker' in navigator) {
  // Auto-register in production
  if (import.meta.env.PROD) {
    registerServiceWorker();
    console.log('PWA: Service worker registered for production');
  }
  
  // Optional: Enable in development for testing
  if (import.meta.env.DEV && import.meta.env.VITE_PWA_DEV === 'true') {
    registerServiceWorker();
    console.log('PWA: Service worker registered for development testing');
  }

  // Check PWA support
  const pwaSupport = checkPWASupport();
  if (!pwaSupport.serviceWorker) {
    console.warn('PWA Warning: Service Workers not supported in this browser');
  }
  if (!pwaSupport.manifest) {
    console.warn('PWA Warning: App Manifest not fully supported');
  }
  if (!pwaSupport.installable) {
    console.warn('PWA Warning: App is not fully installable on this browser');
  }
} else {
  console.warn('Service Workers are not supported in this browser');
}

// Handle service worker updates
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('PWA: Service worker controller changed - app updated');
    // Optional: Show toast notification to user
    window.dispatchEvent(new CustomEvent('pwa:updated'));
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
