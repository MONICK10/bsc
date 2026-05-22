import { motion } from 'framer-motion';

export default function LiveBadge({ isLive }) {
  if (!isLive) return null;

  return (
    <motion.div
      className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-full font-bold"
      animate={{ opacity: [1, 0.6, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <motion.span
        className="w-3 h-3 bg-white rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <span>LIVE</span>
    </motion.div>
  );
}
