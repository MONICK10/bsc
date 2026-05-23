import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index.jsx';
import { useAuthStore, useMatchesStore, useAchievementsStore } from './store/index.js';
import { apiService } from './services/api.js';
import OfflineBanner from './components/OfflineBanner.jsx';
import InstallPrompt from './components/InstallPrompt.jsx';
import { checkOnlineStatus } from './utils/pwa.js';

function App() {
  const { setLoading } = useAuthStore();
  const { setMatches } = useMatchesStore();
  const { setAchievements } = useAchievementsStore();
  const [isOnline, setIsOnline] = useState(checkOnlineStatus());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize app data with offline support
    const initializeApp = async () => {
      try {
        setLoading(true);

        // Load matches with timeout
        try {
          const matchesPromise = apiService.getMatches();
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 5000)
          );
          const matches = await Promise.race([matchesPromise, timeoutPromise]);
          setMatches(matches);
        } catch (error) {
          console.warn('Failed to load matches, using cached data:', error);
          // Continue with empty array or cached data
          setMatches([]);
        }

        // Load achievements with timeout
        try {
          const achievementsPromise = apiService.getAchievements();
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 5000)
          );
          const achievements = await Promise.race([achievementsPromise, timeoutPromise]);
          setAchievements(achievements);
        } catch (error) {
          console.warn('Failed to load achievements, using cached data:', error);
          // Continue with empty array or cached data
          setAchievements([]);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        // App still works with empty data
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, [setLoading, setMatches, setAchievements]);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('📡 App is back online');
      // Optional: Retry data loading when coming back online
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('📡 App is offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Don't render until initialized
  if (!isInitialized) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-dark to-navy-blue">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sky-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white font-semibold">Loading Bearhatty...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <OfflineBanner />
      <InstallPrompt />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
