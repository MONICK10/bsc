// Live stream service - communicates with backend API

export const liveService = {
  // Get current live status
  async fetchLiveStatus() {
    try {
      const response = await fetch('http://localhost:3001/api/live');
      if (!response.ok) throw new Error('Failed to fetch live status');
      return await response.json();
    } catch (error) {
      console.error('Fetch live status error:', error);
      return { isLive: false, youtubeVideoId: null, matchTitle: null };
    }
  },

  // Start live stream
  async startLiveStream(youtubeVideoId, matchTitle) {
    try {
      const response = await fetch('http://localhost:3001/api/live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeVideoId, matchTitle })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start live stream');
      }

      return await response.json();
    } catch (error) {
      console.error('Start live stream error:', error);
      throw error;
    }
  },

  // End live stream
  async endLiveStream() {
    try {
      const response = await fetch('http://localhost:3001/api/live/end', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to end live stream');
      }

      return await response.json();
    } catch (error) {
      console.error('End live stream error:', error);
      throw error;
    }
  }
};
