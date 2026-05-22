import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm.jsx';

export default function AdminLoginPage() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-sky-blue via-cyan-glow to-navy-blue flex items-center justify-center p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="premium-card p-8 md:p-12 w-full max-w-md relative z-10 border-2 border-cyan-glow/30"
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-10 space-y-4">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <img
              src="/images/logo.png"
              alt="Bearhatty Logo"
              className="h-32 w-32 mx-auto rounded-full shadow-glow"
            />
          </motion.div>
          <div>
            <h1 className="text-4xl font-bebas tracking-wider text-navy-blue">
              BEARHATTY ADMIN
            </h1>
            <p className="text-cyan-glow font-semibold uppercase tracking-widest text-sm mt-2">
              Sports Club Management
            </p>
          </div>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-center text-xs text-slate-600">
            🔒 Secure Admin Portal • Only authorized access
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
