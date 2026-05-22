import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/index.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuthStore();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/achievements', label: 'Achievements' },
    { path: '/matches', label: 'Matches' },
    { path: '/live', label: 'Live' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-navy-blue">
            <img src="/images/logo.png" alt="Bearhatty Logo" className="h-12 w-12" />
            <span>Bearhatty</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-semibold smooth-transition ${
                  isActive(item.path)
                    ? 'text-sky-blue border-b-2 border-sky-blue pb-1'
                    : 'text-gray-600 hover:text-sky-blue'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <Link
                to="/admin"
                className="bg-sky-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="bg-navy-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-900"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-navy-blue text-2xl"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded ${
                  isActive(item.path)
                    ? 'bg-sky-blue text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 bg-sky-blue text-white rounded"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 bg-navy-blue text-white rounded"
              >
                Admin Login
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
