import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm.jsx';

export default function AdminLoginPage() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-sky-blue to-navy-blue flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="text-center mb-8">
          <motion.img
            src="/images/logo.png"
            alt="Bearhatty Logo"
            className="h-32 w-32 mx-auto mb-4"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <h1 className="text-3xl font-bold text-navy-blue mb-2">Bearhatty Admin</h1>
          <p className="text-gray-600">Sports Club Management Portal</p>
        </div>

        <LoginForm />

        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-gray-600 text-sm mb-4">Demo Credentials</p>
          <div className="bg-gray-50 p-4 rounded text-sm">
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> admin@bearhatty.com
            </p>
            <p className="text-gray-700">
              <strong>Password:</strong> admin123
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
