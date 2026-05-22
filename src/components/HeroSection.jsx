import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.320, 1] },
    },
  };

  return (
    <div className="relative overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-glow/20 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0], x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-sky-blue/20 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0], x: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative container-max py-20 md:py-32 lg:py-40">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-4"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-glow/40 rounded-full blur-lg animate-pulse-slow" />
                <img
                  src="/images/logo.png"
                  alt="Bearhatty Logo"
                  className="h-24 w-24 md:h-32 md:w-32 rounded-full relative shadow-glow"
                />
              </div>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bebas tracking-wider text-white leading-tight"
                variants={itemVariants}
              >
                BEARHATTY
              </motion.h1>
              <motion.h2
                className="text-3xl md:text-4xl font-oswald font-bold text-cyan-glow"
                variants={itemVariants}
              >
                SPORTS CLUB
              </motion.h2>
            </div>

            {/* Subtitle */}
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-lg md:text-xl text-cyan-glow font-medium">
                ✦ Founded in 1967
              </p>
              <p className="text-xl md:text-2xl text-white/90 font-poppins leading-relaxed">
                Excellence in Football & Hockey
                <span className="block text-cyan-glow font-bold">Champion Legacy Since 1967</span>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/upcoming-matches"
                  className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <span>📋</span>
                  <span>View Matches</span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/live"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold smooth-transition shadow-soft hover:shadow-glow w-full sm:w-auto"
                >
                  <span>🔴</span>
                  <span>Watch Live</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 pt-8 border-t border-white/20"
            >
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white">2</p>
                <p className="text-sm text-cyan-glow">Sports</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white">57+</p>
                <p className="text-sm text-cyan-glow">Years Strong</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Grid */}
          <motion.div
            className="hidden md:grid grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { emoji: '⚽', label: 'Football', color: 'from-blue-500' },
              { emoji: '🏒', label: 'Hockey', color: 'from-purple-500' },
              { emoji: '🏆', label: 'Champions', color: 'from-yellow-500' },
              { emoji: '📹', label: 'Live Stream', color: 'from-red-500' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -10 }}
                className={`glass-effect bg-gradient-to-br ${item.color} to-transparent p-8 text-center cursor-pointer relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 smooth-transition" />
                <div className="relative z-10 space-y-3">
                  <div className="text-5xl md:text-6xl">
                    {item.emoji}
                  </div>
                  <p className="font-semibold text-white text-lg">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
