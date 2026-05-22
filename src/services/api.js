// Supabase service configuration
// Replace these with your actual Supabase credentials

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabaseConfig = {
  url: SUPABASE_URL,
  key: SUPABASE_ANON_KEY,
};

// Mock API responses for development
export const mockMatches = [
  {
    id: '1',
    opponent: 'City United',
    date: '2026-06-15',
    venue: 'Main Stadium',
    sport: 'Football',
    time: '14:00',
  },
  {
    id: '2',
    opponent: 'Valley Hawks',
    date: '2026-06-20',
    venue: 'Ice Arena',
    sport: 'Hockey',
    time: '18:00',
  },
  {
    id: '3',
    opponent: 'Mountain Rangers',
    date: '2026-06-25',
    venue: 'Main Stadium',
    sport: 'Football',
    time: '15:30',
  },
];

export const mockAchievements = [
  {
    id: '1',
    title: 'Football Championship 2024',
    description: 'Won the regional football championship',
    media_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=500&fit=crop',
    media_type: 'image',
  },
  {
    id: '2',
    title: 'Hockey Tournament Victory',
    description: 'First place in national hockey tournament',
    media_url: 'https://images.unsplash.com/photo-1518611505868-48510c8dfa93?w=500&h=500&fit=crop',
    media_type: 'image',
  },
];

// API service functions (mock implementations)
export const apiService = {
  // Matches
  getMatches: async () => {
    // In production: fetch from Supabase
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockMatches), 500);
    });
  },

  createMatch: async (match) => {
    // In production: post to Supabase
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...match, id: Date.now().toString() }), 500);
    });
  },

  updateMatch: async (id, match) => {
    // In production: update in Supabase
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...match, id }), 500);
    });
  },

  deleteMatch: async (id) => {
    // In production: delete from Supabase
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id }), 500);
    });
  },

  // Achievements
  getAchievements: async () => {
    // In production: fetch from Supabase
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAchievements), 500);
    });
  },

  createAchievement: async (achievement) => {
    // In production: post to Supabase
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...achievement, id: Date.now().toString() }), 500);
    });
  },

  deleteAchievement: async (id) => {
    // In production: delete from Supabase
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id }), 500);
    });
  },

  // Auth
  login: async (email, password) => {
    // In production: authenticate with Supabase
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@bearhatty.com' && password === 'jithujithu') {
          resolve({ user: { id: '1', email }, token: 'mock-token' });
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  logout: async () => {
    // In production: logout from Supabase
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 500);
    });
  },

  // Live stream
  startLiveStream: async (title) => {
    // In production: initialize live stream in Supabase
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id: '1', title, isLive: true }), 500);
    });
  },

  stopLiveStream: async () => {
    // In production: stop live stream in Supabase
    return new Promise((resolve) => {
      setTimeout(() => resolve({ isLive: false }), 500);
    });
  },

  getLiveStatus: async () => {
    // In production: get live status from Supabase
    return new Promise((resolve) => {
      setTimeout(() => resolve({ isLive: false, title: '' }), 500);
    });
  },
};
