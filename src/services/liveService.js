const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const liveService = {
  fetchLiveStatus: async () => {
    const response = await fetch(`${API_BASE_URL}/api/live`);
    if (!response.ok) throw new Error('Failed to fetch live status');
    return response.json();
  },

  startLiveStream: async (youtubeVideoId, matchTitle) => {
    const response = await fetch(`${API_BASE_URL}/api/live`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ youtubeVideoId, matchTitle })
    });
    if (!response.ok) throw new Error('Failed to start live stream');
    return response.json();
  },

  endLiveStream: async () => {
    const response = await fetch(`${API_BASE_URL}/api/live/end`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to end live stream');
    return response.json();
  }
};
