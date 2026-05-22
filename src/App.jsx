import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index.jsx';
import { useAuthStore, useMatchesStore, useAchievementsStore } from './store/index.js';
import { apiService } from './services/api.js';

function App() {
  const { setLoading } = useAuthStore();
  const { setMatches } = useMatchesStore();
  const { setAchievements } = useAchievementsStore();

  useEffect(() => {
    // Initialize app data
    const initializeApp = async () => {
      try {
        // Load matches
        const matches = await apiService.getMatches();
        setMatches(matches);

        // Load achievements
        const achievements = await apiService.getAchievements();
        setAchievements(achievements);
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, [setLoading, setMatches, setAchievements]);

  return <RouterProvider router={router} />;
}

export default App;
