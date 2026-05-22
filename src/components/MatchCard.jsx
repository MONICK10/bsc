import { motion } from 'framer-motion';

export default function MatchCard({ match }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const sportIcon = match.sport === 'Football' ? '⚽' : '🏒';

  return (
    <motion.div
      className="sports-card p-6 hover-lift"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">{sportIcon}</span>
            <span className="bg-sky-blue text-white px-3 py-1 rounded text-sm font-semibold">
              {match.sport}
            </span>
          </div>
          <h3 className="text-xl font-bold text-navy-blue">vs {match.opponent}</h3>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-gray-600">
          <span className="text-lg">📅</span>
          <span>{formatDate(match.date)}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <span className="text-lg">⏰</span>
          <span>{match.time}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <span className="text-lg">📍</span>
          <span>{match.venue}</span>
        </div>
      </div>

      <motion.button
        className="w-full mt-6 bg-gradient-to-r from-sky-blue to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View Details
      </motion.button>
    </motion.div>
  );
}
