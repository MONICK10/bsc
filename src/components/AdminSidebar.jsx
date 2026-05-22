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
      className="w-64 bg-navy-blue text-white shadow-xl"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b border-blue-700">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <img src="/images/logo.png" alt="Bearhatty Logo" className="h-12 w-12" />
          <span>Bearhatty</span>
        </Link>
        <p className="text-blue-300 text-sm mt-2">Admin Panel</p>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg smooth-transition ${
              isActive(item.path)
                ? 'bg-sky-blue text-white'
                : 'text-blue-200 hover:bg-blue-700'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-semibold">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700 bg-navy-blue">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 smooth-transition text-left"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </motion.div>
  );
}
