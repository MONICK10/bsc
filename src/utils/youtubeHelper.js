// Extract YouTube video ID from various URL formats
export function extractYoutubeVideoId(url) {
  if (!url) return null;

  // Handle different YouTube URL formats
  const patterns = [
    // https://www.youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    // Direct video ID
    /^[a-zA-Z0-9_-]{11}$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
    // If pattern has no capture group (direct ID pattern)
    if (match === true || (pattern.test(url) && !pattern.toString().includes('('))) {
      return url;
    }
  }

  return null;
}

// Validate if string is a valid YouTube video ID
export function isValidYoutubeVideoId(id) {
  if (!id) return false;
  return /^[a-zA-Z0-9_-]{11}$/.test(id);
}
