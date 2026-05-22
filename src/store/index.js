import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export const useMatchesStore = create((set) => ({
  matches: [],
  loading: false,
  error: null,

  setMatches: (matches) => set({ matches }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  addMatch: (match) => set((state) => ({ matches: [...state.matches, match] })),
  updateMatch: (id, match) =>
    set((state) => ({
      matches: state.matches.map((m) => (m.id === id ? match : m)),
    })),
  deleteMatch: (id) =>
    set((state) => ({
      matches: state.matches.filter((m) => m.id !== id),
    })),
}));

export const useAchievementsStore = create((set) => ({
  achievements: [],
  loading: false,
  error: null,

  setAchievements: (achievements) => set({ achievements }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  addAchievement: (achievement) =>
    set((state) => ({
      achievements: [...state.achievements, achievement],
    })),
  deleteAchievement: (id) =>
    set((state) => ({
      achievements: state.achievements.filter((a) => a.id !== id),
    })),
}));

export const useLiveStore = create((set) => ({
  isLive: false,
  streamTitle: '',
  stream: null,

  setIsLive: (isLive) => set({ isLive }),
  setStreamTitle: (streamTitle) => set({ streamTitle }),
  setStream: (stream) => set({ stream }),
}));
