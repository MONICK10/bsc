import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-blue to-navy-blue text-white p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          className="text-9xl font-bold mb-4"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          404
        </motion.div>
        <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
        <p className="text-xl text-blue-100 mb-8">
          Oops! It seems you've wandered off the playing field.
        </p>
        <Link
          to="/"
          className="inline-block bg-white text-navy-blue px-8 py-3 rounded-lg font-bold hover:bg-gray-100 smooth-transition"
        >
          ← Return Home
        </Link>
      </motion.div>
    </motion.div>
  );
}
