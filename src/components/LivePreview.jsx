import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLiveStore } from '../store/index.js';
import LiveBadge from './LiveBadge.jsx';

export default function LivePreview() {
  const { isLive, streamTitle } = useLiveStore();

  return (
    <section className="py-16 bg-gradient-to-r from-sky-blue to-navy-blue text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left - Live Stream Preview */}
          <div>
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
              <div className="w-full h-full flex items-center justify-center flex-col bg-gradient-to-br from-gray-800 to-black">
                <div className="text-6xl mb-4">📹</div>
                {isLive ? (
                  <>
                    <p className="text-xl">Live Stream Active</p>
                    <p className="text-gray-400 mt-2">{streamTitle || 'Watch the match'}</p>
                  </>
                ) : (
                  <p className="text-xl text-gray-400">Waiting for broadcast...</p>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <LiveBadge isLive={isLive} />
              </div>
            </div>
          </div>

          {/* Right - Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 className="text-4xl font-bold mb-4">Watch Live</h2>
            <p className="text-blue-100 mb-6 text-lg">
              {isLive
                ? 'Tune in now to watch the action unfold live!'
                : 'Check back soon for upcoming live broadcasts of our matches.'}
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">✓</span>
                <span>HD Quality Streaming</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">✓</span>
                <span>Watch from Anywhere</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">✓</span>
                <span>Real-Time Commentary</span>
              </div>
            </div>

            <Link
              to="/live"
              className="inline-block bg-white text-sky-blue px-8 py-3 rounded-lg font-bold hover:bg-gray-100 smooth-transition"
            >
              Open Live Page →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
