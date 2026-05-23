import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/index.js';

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    logout();
    window.location.href = '/admin/login';
  };

  const navItems = [
    { path: '/admin', icon: '📊', label: 'Dashboard' },
    { path: '/admin/matches', icon: '⚽', label: 'Manage Matches' },
    { path: '/admin/achievements', icon: '🏆', label: 'Achievements' },
    { path: '/admin/live', icon: '📹', label: 'Live Control' },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <motion.div
      className="w-64 bg-gradient-to-b from-slate-dark to-navy-blue text-white shadow-dark border-r border-cyan-glow/20 flex flex-col"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-cyan-glow/20">
        <Link to="/" className="flex items-center space-x-3 mb-3">
          <img
            src="/images/logo.png"
            alt="Bearhatty Logo"
            className="h-12 w-12 rounded-full shadow-glow"
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="text-lg font-bebas tracking-wider gradient-text">BEARHATTY</p>
            <p className="text-xs text-cyan-glow">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <motion.div
            key={item.path}
            whileHover={{ x: 4 }}
          >
            <Link
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl smooth-transition group ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-sky-blue to-cyan-glow text-white shadow-glow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
              {isActive(item.path) && (
                <motion.div
                  className="ml-auto w-2 h-2 rounded-full bg-white"
                  layoutId="indicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-cyan-glow/20">
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold smooth-transition hover:shadow-glow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
