import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { liveService } from '../services/liveService.js';

export default function LivePage() {
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    loadLiveStatus();
    // Poll every 3 seconds to check if live
    const interval = setInterval(loadLiveStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadLiveStatus = async () => {
    try {
      const status = await liveService.fetchLiveStatus();
      setLiveData(status);
      setIsLive(status.isLive);
    } catch (error) {
      console.error('Failed to load live status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 border-4 border-cyan-glow border-t-transparent rounded-full"></div>
          </motion.div>
          <p className="text-white text-xl">Loading broadcast...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-slate-900 to-black"
    >
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-md border-b border-cyan-glow/30">
        <div className="container-max py-6">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">📺</div>
              <h1 className="text-3xl md:text-4xl font-bebas text-white tracking-wider">
                LIVE BROADCAST
              </h1>
            </div>
            {isLive && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex items-center gap-2 bg-red-600 px-6 py-3 rounded-full"
              >
                <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                <span className="text-white font-bold">LIVE</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-8 md:py-12">
        {isLive && liveData?.youtubeVideoId ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Match Title */}
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-center space-y-2"
            >
              <p className="text-cyan-glow font-semibold uppercase tracking-widest">
                ✦ Now Broadcasting
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {liveData.matchTitle}
              </h2>
            </motion.div>

            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* Aspect ratio container 16:9 */}
              <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-2xl"
                style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${liveData.youtubeVideoId}?autoplay=1&rel=0&controls=1&modestbranding=1`}
                  title="Live Stream"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Stream Info */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 grid md:grid-cols-2 gap-6"
              >
                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl p-6 border border-blue-700/50">
                  <p className="text-cyan-glow font-semibold text-sm mb-2">📊 Stream Status</p>
                  <p className="text-white text-lg font-bold">STREAMING LIVE</p>
                  <p className="text-white/70 text-sm mt-1">
                    Watch full HD broadcast without leaving our website
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl p-6 border border-purple-700/50">
                  <p className="text-cyan-glow font-semibold text-sm mb-2">💬 Features</p>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>✓ Fullscreen mode</li>
                    <li>✓ HD quality</li>
                    <li>✓ Live chat available</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-24 text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl md:text-9xl mb-6"
            >
              📺
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bebas text-white mb-4">
              NO LIVE MATCH CURRENTLY
            </h2>
            <p className="text-cyan-glow text-lg mb-8 max-w-2xl mx-auto">
              Check back soon for the next exciting Bearhatty Sports Club match!
            </p>

            {/* Info Cards */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                <p className="text-4xl mb-3">⚽</p>
                <p className="text-white font-bold mb-2">Football</p>
                <p className="text-white/70 text-sm">
                  Watch Bearhatty SC compete in action-packed football matches
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                <p className="text-4xl mb-3">🏒</p>
                <p className="text-white font-bold mb-2">Hockey</p>
                <p className="text-white/70 text-sm">
                  Experience thrilling hockey tournaments and championship games
                </p>
              </div>
            </motion.div>

            <div className="mt-12 p-6 bg-blue-900/30 border border-blue-700/50 rounded-xl max-w-2xl mx-auto">
              <p className="text-cyan-glow font-semibold mb-2">📅 Upcoming Matches</p>
              <p className="text-white/80">
                Check our <strong>Upcoming Matches</strong> page to see scheduled games and set reminders
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
