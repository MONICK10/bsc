import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/index.js';
import { apiService } from '../services/api.js';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await apiService.login(email, password);
      if (result && result.user) {
        setUser(result.user);
        // Store token in localStorage
        localStorage.setItem('authToken', result.token);
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {error && (
        <motion.div
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-xl border border-red-500/30 flex items-center space-x-3 shadow-glow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-2xl">⚠️</span>
          <span className="font-semibold">{error}</span>
        </motion.div>
      )}

      <div className="space-y-2">
        <label className="block text-navy-blue font-oswald font-bold tracking-wide">
          EMAIL ADDRESS
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-3 font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition"
          placeholder="admin@bearhatty.com"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-navy-blue font-oswald font-bold tracking-wide">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-3 font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition"
          placeholder="••••••••"
        />
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-primary py-4 text-lg font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center space-x-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ⏳
            </motion.span>
            <span>Logging in...</span>
          </span>
        ) : (
          '🔓 Login'
        )}
      </motion.button>

      <div className="text-center pt-4">
        <p className="text-slate-600 text-sm">
          Demo Login: <span className="font-semibold text-navy-blue">admin@bearhatty.com</span>
        </p>
      </div>
    </motion.form>
  );
}
