import { Workbox } from 'workbox-window';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/service-worker.js');

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        if (confirm('New content is available! Click OK to refresh.')) {
          window.location.reload();
        }
      }
    });

    wb.addEventListener('waiting', () => {
      wb.messageSkipWaiting();
    });

    wb.addEventListener('controlling', () => {
      window.location.reload();
    });

    wb.register()
      .then(() => console.log('✅ Service Worker registered'))
      .catch((err) => console.error('❌ Service Worker registration failed:', err));
  }
}

export function checkOnlineStatus() {
  return navigator.onLine;
}

export function addOnlineListener(callback) {
  window.addEventListener('online', callback);
}

export function addOfflineListener(callback) {
  window.addEventListener('offline', callback);
}

export function removeOnlineListener(callback) {
  window.removeEventListener('online', callback);
}

export function removeOfflineListener(callback) {
  window.removeEventListener('offline', callback);
}

/**
 * Check PWA support in the browser
 */
export function checkPWASupport() {
  return {
    serviceWorker: 'serviceWorker' in navigator,
    webAppManifest: 'onbeforeinstallprompt' in window,
    installable: 'beforeinstallprompt' in window,
    manifest: document.querySelector('link[rel="manifest"]') !== null,
    standalone: window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches,
    localStorage: typeof localStorage !== 'undefined',
    cacheApi: 'caches' in window,
    fetchApi: 'fetch' in window
  };
}

/**
 * Check if app is installed (for showing/hiding install prompt)
 */
export function isAppInstalled() {
  // Check if running as standalone app
  if (window.navigator.standalone === true) {
    return true;
  }

  // Check if running in PWA display mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }

  // Check if running in fullscreen mode
  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return true;
  }

  return false;
}

/**
 * Trigger app install prompt if available
 */
export function triggerAppInstall(deferredPrompt) {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ User accepted the install prompt');
      } else {
        console.log('❌ User dismissed the install prompt');
      }
    });
  }
}
