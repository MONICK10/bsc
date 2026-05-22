import { motion } from 'framer-motion';

export default function LiveBadge({ isLive }) {
  if (!isLive) return null;

  return (
    <motion.div
      className="badge-live"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <motion.span
        className="w-3 h-3 bg-white rounded-full inline-block mr-2"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span>LIVE</span>
    </motion.div>
  );
}
