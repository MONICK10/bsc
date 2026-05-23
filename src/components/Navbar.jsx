import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/index.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/achievements', label: 'Achievements' },
    { path: '/upcoming-matches', label: 'Matches' },
    { path: '/live', label: 'Live' },
  ];

  const isActive = (path) => location.pathname === path;

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      className={`sticky top-0 z-50 smooth-transition ${
        isScrolled
          ? 'glass-effect bg-white/70 shadow-soft'
          : 'bg-white shadow-md'
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container-max">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="flex items-center space-x-3 font-bebas text-2xl font-bold tracking-wider"
            >
              <img
                src="/images/logo.png"
                alt="Bearhatty Logo"
                className="h-14 w-14 rounded-full shadow-soft hover:shadow-glow smooth-transition"
                loading="lazy"
                decoding="async"
              />
              <span className="gradient-text text-2xl hidden sm:inline">
                BEARHATTY
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-medium smooth-transition relative overflow-hidden ${
                    isActive(item.path)
                      ? 'text-sky-blue'
                      : 'text-slate-700 hover:text-sky-blue'
                  }`}
                >
                  {isActive(item.path) && (
                    <motion.div
                      className="absolute inset-0 bg-sky-blue/10 rounded-lg -z-10"
                      layoutId="navIndicator"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Admin Button & Mobile Menu Button Container */}
          <div className="flex items-center space-x-4">
            {/* Admin Button */}
            {user ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/admin"
                  className="btn-primary px-6 py-2 text-sm"
                >
                  Dashboard
                </Link>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/admin/login"
                  className="btn-secondary px-6 py-2 text-sm"
                >
                  Admin
                </Link>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="w-6 h-0.5 bg-gradient-to-r from-sky-blue to-cyan-glow rounded-full block"
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-gradient-to-r from-sky-blue to-cyan-glow rounded-full block my-1.5"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-gradient-to-r from-sky-blue to-cyan-glow rounded-full block"
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                className="pb-4 space-y-2 pt-2 border-t border-slate-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg smooth-transition ${
                        isActive(item.path)
                          ? 'bg-gradient-to-r from-sky-blue to-cyan-glow text-white font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
