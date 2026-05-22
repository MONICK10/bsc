import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-sky-blue to-navy-blue text-white">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="/images/logo.png"
              alt="Bearhatty Logo"
              className="h-32 w-32 md:h-48 md:w-48 mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Bearhatty Sports Club</h1>
            <p className="text-2xl text-blue-100 mb-2">Founded in 1967</p>
            <p className="text-xl text-blue-200 mb-8">
              Excellence in Football & Hockey | Champion Legacy Since 1967
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/matches"
                className="bg-white text-sky-blue px-8 py-3 rounded-lg font-bold hover:bg-gray-100 smooth-transition text-center"
              >
                View Matches
              </Link>
              <Link
                to="/live"
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 smooth-transition text-center"
              >
                Watch Live
              </Link>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="bg-white bg-opacity-20 rounded-lg p-6 text-center backdrop-blur-md"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl mb-2">⚽</div>
                <p className="font-semibold">Football</p>
              </motion.div>
              <motion.div
                className="bg-white bg-opacity-20 rounded-lg p-6 text-center backdrop-blur-md"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl mb-2">🏒</div>
                <p className="font-semibold">Hockey</p>
              </motion.div>
              <motion.div
                className="bg-white bg-opacity-20 rounded-lg p-6 text-center backdrop-blur-md"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl mb-2">🏆</div>
                <p className="font-semibold">Champions</p>
              </motion.div>
              <motion.div
                className="bg-white bg-opacity-20 rounded-lg p-6 text-center backdrop-blur-md"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl mb-2">📹</div>
                <p className="font-semibold">Live Stream</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
