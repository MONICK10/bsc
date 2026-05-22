// Local file-based API service for match management
// Uses Express backend with local JSON storage and file uploads

const API_BASE = 'http://localhost:3001';

// Fetch all matches
export const fetchMatches = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/matches`);
    if (!response.ok) throw new Error('Failed to fetch matches');
    return await response.json();
  } catch (error) {
    console.error('Fetch matches error:', error);
    return [];
  }
};

// Create new match with image uploads
export const createMatch = async (matchData, team1File, team2File) => {
  try {
    const formData = new FormData();
    
    // Add match data
    formData.append('match_name', matchData.match_name);
    formData.append('team1_name', matchData.team1_name);
    formData.append('team2_name', matchData.team2_name);
    formData.append('venue', matchData.venue);
    formData.append('match_date', matchData.match_date);
    formData.append('match_time', matchData.match_time);
    formData.append('sport_type', matchData.sport_type);
    formData.append('description', matchData.description || '');
    
    // Add image files if provided
    if (team1File) {
      formData.append('team1_image', team1File);
    }
    if (team2File) {
      formData.append('team2_image', team2File);
    }

    const response = await fetch(`${API_BASE}/api/matches`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Failed to create match');
    return await response.json();
  } catch (error) {
    console.error('Create match error:', error);
    throw error;
  }
};

// Update existing match
export const updateMatch = async (matchId, matchData, team1File, team2File) => {
  try {
    const formData = new FormData();
    
    // Add match data
    formData.append('match_name', matchData.match_name);
    formData.append('team1_name', matchData.team1_name);
    formData.append('team2_name', matchData.team2_name);
    formData.append('venue', matchData.venue);
    formData.append('match_date', matchData.match_date);
    formData.append('match_time', matchData.match_time);
    formData.append('sport_type', matchData.sport_type);
    formData.append('description', matchData.description || '');
    
    // Add image files if being replaced
    if (team1File) {
      formData.append('team1_image', team1File);
    }
    if (team2File) {
      formData.append('team2_image', team2File);
    }

    const response = await fetch(`${API_BASE}/api/matches/${matchId}`, {
      method: 'PUT',
      body: formData
    });

    if (!response.ok) throw new Error('Failed to update match');
    return await response.json();
  } catch (error) {
    console.error('Update match error:', error);
    throw error;
  }
};

// Delete match and associated images
export const deleteMatch = async (matchId) => {
  try {
    const response = await fetch(`${API_BASE}/api/matches/${matchId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete match');
    return await response.json();
  } catch (error) {
    console.error('Delete match error:', error);
    throw error;
  }
};
