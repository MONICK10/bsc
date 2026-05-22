import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-blue via-cyan-glow to-navy-blue text-white p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="text-center relative z-10 space-y-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* 404 Number */}
        <motion.div
          animate={{ rotate: [0, -5, 5, 0], y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-block"
        >
          <h1 className="text-9xl md:text-[150px] font-bebas tracking-wider font-bold drop-shadow-lg">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold">
            Page Not Found
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-md mx-auto">
            Oops! It seems you've wandered off the playing field.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-6 text-5xl">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ⚽
          </motion.div>
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >
            🏒
          </motion.div>
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          >
            🏆
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="btn-primary px-8 py-4 text-lg inline-block"
            >
              ← Return Home
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/matches"
              className="px-8 py-4 text-lg border-2 border-white text-white rounded-xl font-semibold smooth-transition hover:bg-white hover:text-sky-blue inline-block"
            >
              View Matches →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
