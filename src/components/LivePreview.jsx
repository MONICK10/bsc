import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLiveStore } from '../store/index.js';
import LiveBadge from './LiveBadge.jsx';

export default function LivePreview() {
  const { isLive, streamTitle } = useLiveStore();

  return (
    <section className="section-padding bg-gradient-to-r from-sky-blue via-cyan-glow to-navy-blue text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container-max relative z-10">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left - Live Stream Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group"
          >
            {/* Player Container */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-dark hover:shadow-glow-lg smooth-transition">
              {/* Background Content */}
              <div className="w-full h-full flex items-center justify-center flex-col bg-gradient-to-br from-slate-900 via-black to-slate-900">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-7xl mb-4"
                >
                  📹
                </motion.div>
                
                {isLive ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <p className="text-2xl font-bold mb-2">Live Stream Active</p>
                    <p className="text-cyan-glow text-lg">{streamTitle || 'Watch the match'}</p>
                  </motion.div>
                ) : (
                  <p className="text-xl text-slate-400">Waiting for broadcast...</p>
                )}
              </div>

              {/* Live Badge */}
              <div className="absolute top-4 right-4 z-10">
                <LiveBadge isLive={isLive} />
              </div>

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-glow/0 via-cyan-glow/0 to-cyan-glow/0 group-hover:from-cyan-glow/20 group-hover:to-transparent smooth-transition opacity-0 group-hover:opacity-100" />
            </div>

            {/* Subtitle */}
            <p className="mt-4 text-cyan-glow text-sm font-medium text-center">
              ✦ Click to open full broadcast view
            </p>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bebas tracking-wider">
                WATCH LIVE
              </h2>
              <p className="text-lg md:text-xl text-cyan-glow/80 leading-relaxed">
                {isLive
                  ? 'The action is happening now! Tune in for real-time coverage of our championship match.'
                  : 'Check back soon for upcoming live broadcasts of our matches. Be the first to experience the excitement.'}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: '🎬', label: 'HD Quality Streaming', desc: 'Crystal clear broadcast' },
                { icon: '🌍', label: 'Watch from Anywhere', desc: 'On any device, any time' },
                { icon: '📢', label: 'Real-Time Commentary', desc: 'Expert insight & analysis' },
                { icon: '⚡', label: 'Zero Latency', desc: 'Next-gen streaming technology' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-3xl mt-1">{item.icon}</div>
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-sm text-white/70">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/live"
                className="inline-block btn-primary px-8 py-4 text-lg w-full sm:w-auto text-center"
              >
                Open Live Page →
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
