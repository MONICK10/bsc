import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { liveService } from '../../services/liveService.js';
import { extractYoutubeVideoId } from '../../utils/youtubeHelper.js';

export default function LiveControl() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [matchTitle, setMatchTitle] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadLiveStatus();
  }, []);

  const loadLiveStatus = async () => {
    try {
      const status = await liveService.fetchLiveStatus();
      setIsLive(status.isLive);
      if (status.isLive) {
        setMatchTitle(status.matchTitle || '');
      }
    } catch (err) {
      console.error('Failed to load live status:', err);
    }
  };

  const handleGoLive = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!youtubeUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }
    if (!matchTitle.trim()) {
      setError('Please enter a match title');
      return;
    }

    const videoId = extractYoutubeVideoId(youtubeUrl);
    if (!videoId) {
      setError('Invalid YouTube URL. Please enter a valid YouTube video or livestream link.');
      return;
    }

    setLoading(true);
    try {
      await liveService.startLiveStream(videoId, matchTitle);
      setSuccess('✅ Live stream is now active!');
      setIsLive(true);
      setYoutubeUrl('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to start live stream');
    } finally {
      setLoading(false);
    }
  };

  const handleEndLive = async () => {
    if (!window.confirm('Are you sure you want to end the live stream?')) return;

    setLoading(true);
    setError('');
    try {
      await liveService.endLiveStream();
      setIsLive(false);
      setMatchTitle('');
      setSuccess('✅ Live stream ended');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to end live stream');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">🎬 LIVE STREAM CONTROL</h1>
          <p className="text-cyan-400">Manage your YouTube Live broadcast</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`mb-8 p-6 rounded-2xl ${
            isLive
              ? 'bg-gradient-to-r from-red-500 to-red-600'
              : 'bg-gradient-to-r from-slate-700 to-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-semibold uppercase">Status</p>
              <p className="text-white text-2xl font-bold mt-1">
                {isLive ? (
                  <>
                    <span className="inline-block w-3 h-3 bg-red-300 rounded-full animate-pulse mr-2"></span>
                    LIVE NOW
                  </>
                ) : (
                  'OFFLINE'
                )}
              </p>
            </div>
            {isLive && (
              <p className="text-white/90 text-sm">{matchTitle}</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 mb-6"
        >
          {!isLive ? (
            <form onSubmit={handleGoLive} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-navy-blue mb-2">
                  🎥 YouTube Live URL
                </label>
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=abc123xyz"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 transition"
                  disabled={loading}
                />
                <p className="text-slate-600 text-xs mt-2">
                  ℹ️ Paste your YouTube livestream URL. Video ID will be extracted automatically.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-blue mb-2">
                  🏆 Match Title
                </label>
                <input
                  type="text"
                  value={matchTitle}
                  onChange={(e) => setMatchTitle(e.target.value)}
                  placeholder="e.g., Bearhatty SC vs Tigers FC"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 transition"
                  disabled={loading}
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 border-2 border-green-400 text-green-700 rounded-lg"
                >
                  {success}
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? '🔄 Starting...' : '🔴 GO LIVE'}
              </motion.button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div>
                <p className="text-slate-600 font-semibold mb-2">Currently Broadcasting</p>
                <p className="text-2xl font-bold text-navy-blue">{matchTitle}</p>
              </div>

              <div className="p-4 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-900">
                  ✅ Your livestream is now playing on the public live page.
                </p>
                <p className="text-sm text-blue-900 mt-2">
                  Users can watch at: <strong>/live</strong>
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEndLive}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold rounded-lg hover:from-slate-800 hover:to-slate-900 transition disabled:opacity-50"
              >
                {loading ? '⏹️ Ending...' : '⏹️ END LIVE STREAM'}
              </motion.button>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-900/30 border-2 border-cyan-400 rounded-xl p-6"
        >
          <h3 className="text-cyan-400 font-bold mb-3">ℹ️ How to Use</h3>
          <ul className="text-white/90 space-y-2 text-sm">
            <li>✓ Start your livestream on YouTube</li>
            <li>✓ Copy the YouTube URL from your browser</li>
            <li>✓ Paste it here and enter the match title</li>
            <li>✓ Click "GO LIVE" to start broadcasting on the website</li>
            <li>✓ Users can watch at /live page instantly</li>
            <li>✓ Click "END LIVE STREAM" when finished</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
