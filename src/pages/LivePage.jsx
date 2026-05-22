import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { liveService } from '../services/liveService.js';
import LiveBadge from '../components/LiveBadge.jsx';
import LiveChat from '../components/LiveChat.jsx';

export default function LivePage() {
  const [isLive, setIsLive] = useState(false);
  const [matchTitle, setMatchTitle] = useState('');
  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLiveStatus();
    const interval = setInterval(loadLiveStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadLiveStatus = async () => {
    try {
      const status = await liveService.fetchLiveStatus();
      setIsLive(status.isLive);
      setMatchTitle(status.matchTitle || '');
      setYoutubeVideoId(status.youtubeVideoId || '');
    } catch (error) {
      console.error('Failed to load live status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="bg-gradient-to-r from-sky-500 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Live Broadcast</h1>
              <p className="text-blue-100">Watch our matches live</p>
            </div>
            <LiveBadge isLive={isLive} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white rounded-lg shadow-xl overflow-hidden"
                whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              >
                {loading ? (
                  <div className="min-h-96 flex flex-col items-center justify-center p-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="text-6xl mb-4"
                    >
                      ⏳
                    </motion.div>
                    <h2 className="text-2xl font-bold text-navy-blue mb-2">Loading...</h2>
                    <p className="text-gray-600">Checking live status</p>
                  </div>
                ) : isLive && youtubeVideoId ? (
                  <div className="space-y-6">
                    <div className="aspect-video bg-black relative">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                        title="Live Stream"
                        frameBorder="0"
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                      
                      <motion.div
                        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold flex items-center space-x-2 z-10"
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        <span>LIVE</span>
                      </motion.div>
                    </div>

                    <div className="p-6 border-t">
                      <h2 className="text-2xl font-bold text-navy-blue mb-2">{matchTitle}</h2>
                      <p className="text-gray-600">Tune in to watch the action unfold live!</p>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-96 flex flex-col items-center justify-center p-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-6xl mb-4"
                    >
                      📺
                    </motion.div>
                    <h2 className="text-3xl font-bold text-navy-blue mb-2">No Live Match Currently</h2>
                    <p className="text-gray-600 text-center max-w-md mb-6">
                      Check back soon for upcoming live broadcasts. Visit our matches page to see scheduled games.
                    </p>
                    <motion.div
                      className="text-sm text-gray-500"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Waiting for the next broadcast...
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <LiveChat isLive={isLive} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <motion.div
              className="bg-white rounded-lg p-6 shadow-md"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="font-bold text-navy-blue mb-2">Schedule</h3>
              <p className="text-gray-600 text-sm">
                Check the matches page to find when the next game will be broadcast live.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg p-6 shadow-md"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-3">🎥</div>
              <h3 className="font-bold text-navy-blue mb-2">HD Quality</h3>
              <p className="text-gray-600 text-sm">
                Enjoy crystal-clear HD streaming of all our matches.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg p-6 shadow-md"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="font-bold text-navy-blue mb-2">Accessible Anywhere</h3>
              <p className="text-gray-600 text-sm">
                Watch live matches from any device, anywhere in the world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
