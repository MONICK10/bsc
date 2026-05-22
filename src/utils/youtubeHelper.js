export function extractYoutubeVideoId(url) {
  if (!url) return null;

  // Remove whitespace
  url = url.trim();

  // Pattern 1: https://www.youtube.com/watch?v=VIDEO_ID
  const watchPattern = /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/;
  const watchMatch = url.match(watchPattern);
  if (watchMatch) return watchMatch[1];

  // Pattern 2: https://youtu.be/VIDEO_ID
  const shortPattern = /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const shortMatch = url.match(shortPattern);
  if (shortMatch) return shortMatch[1];

  // Pattern 3: https://www.youtube.com/embed/VIDEO_ID
  const embedPattern = /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
  const embedMatch = url.match(embedPattern);
  if (embedMatch) return embedMatch[1];

  // Pattern 4: https://www.youtube.com/live/VIDEO_ID
  const livePattern = /(?:youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/;
  const liveMatch = url.match(livePattern);
  if (liveMatch) return liveMatch[1];

  // If it's already just the video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  return null;
}
