import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { liveService } from '../services/liveService.js';
import LiveBadge from '../components/LiveBadge.jsx';
import LiveChat from '../components/LiveChat.jsx';

export default function LivePage() {
  const [isLive, setIsLive] = useState(false);
  const [matchTitle, setMatchTitle] = useState('');
  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    loadLiveStatus();
    const interval = setInterval(loadLiveStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  // Connect to socket.io for live viewer count
  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      console.log('Connected to live broadcast');
    });

    socket.on('viewer-count', (count) => {
      setViewerCount(count);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from live broadcast');
    });

    return () => {
      socket.disconnect();
    };
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

                      {/* Viewer Count */}
                      <motion.div
                        className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg font-semibold flex items-center space-x-2 z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-lg">👥</span>
                        <span>{viewerCount.toLocaleString()} watching</span>
                      </motion.div>
                    </div>

                    <div className="p-6 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-navy-blue">{matchTitle}</h2>
                        <motion.div
                          className="flex items-center space-x-1 text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-semibold"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          <span>👥</span>
                          <span>{viewerCount.toLocaleString()} watching</span>
                        </motion.div>
                      </div>
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

      {/* Live Commentary Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-2">💬 Live Commentary</h2>
            <p className="text-gray-600">Default commentary lines for broadcasters and fans</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMENTARY_LINES.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -3, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => navigator.clipboard.writeText(line)}
                title="Click to copy"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-xl text-blue-500 font-bold flex-shrink-0 min-w-[2rem] text-center">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm leading-relaxed group-hover:text-blue-600 transition-colors">
                      {line}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                    📋
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg"
          >
            <h3 className="font-bold text-blue-900 mb-2 flex items-center space-x-2">
              <span>💡</span>
              <span>How to Use</span>
            </h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Click any commentary line to copy it</li>
              <li>• Use these lines during live broadcasts</li>
              <li>• Share exciting moments with these pre-written comments</li>
              <li>• Keep the energy up with dynamic commentary!</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

// Default commentary lines for live broadcasts
const COMMENTARY_LINES = [
  "Welcome everyone to Bearhatty Sports Club live coverage. We're excited to have all the fans joining us today.",
  "A beautiful evening here at Bearhatty Sports Club as both teams prepare for an exciting contest.",
  "The atmosphere is building up nicely and the crowd is ready for a thrilling match.",
  "Players are warming up confidently and looking focused before kickoff.",
  "Both teams are showing strong energy early in the game.",
  "A quick passing move there from the midfield.",
  "Great control from the player under pressure.",
  "The defense stays solid and clears the danger away.",
  "Fantastic teamwork being displayed on the field.",
  "The supporters are fully behind their teams tonight.",
  "A promising attack developing down the wing.",
  "The goalkeeper stays alert and makes a safe collection.",
  "Wonderful movement off the ball from the attacking side.",
  "The pace of the match is increasing now.",
  "Bearhatty Sports Club thanks all viewers watching live from different places.",
  "Strong challenge in midfield and possession changes quickly.",
  "The players are giving everything for their club.",
  "Good communication between teammates at the back.",
  "An exciting moment here as the attack continues forward.",
  "The crowd reacts loudly after that close opportunity.",
  "Excellent discipline shown by both teams so far.",
  "The game is being played in a great sporting spirit.",
  "Quick counterattack starting to build here.",
  "A clever pass opens up some space in the final third.",
  "The defense recovers well to stop the move.",
  "High energy football and hockey action here today at Bearhatty Sports Club.",
  "Players continue to press aggressively and maintain intensity.",
  "Great vision shown in midfield during that buildup.",
  "The supporters are creating an amazing atmosphere around the ground.",
  "Another attacking chance developing for the home side.",
  "Both teams remain determined and focused.",
  "A calm finish there from the goalkeeper.",
  "The tempo of this match has been excellent.",
  "Good pressing from the forwards forces a mistake.",
  "What an entertaining contest we are witnessing tonight.",
  "Bearhatty Sports Club proudly welcomes all sports lovers to this live event.",
  "The players are battling hard for every ball.",
  "A strong run through the center creates danger.",
  "Smart defending prevents the scoring opportunity.",
  "The crowd continues to cheer loudly from every corner of the ground.",
  "A fantastic effort from long range.",
  "The teams continue to show great determination and passion.",
  "Quick passing football on display right now.",
  "A dangerous move breaks forward at speed.",
  "Excellent anticipation from the defender.",
  "The excitement keeps building as the match continues.",
  "Both sides are competing with great spirit and intensity.",
  "Wonderful support from everyone watching online and at the venue.",
  "Thank you for joining the Bearhatty Sports Club live stream.",
  "Stay tuned for more exciting action here at Bearhatty Sports Club."
];

