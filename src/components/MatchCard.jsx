import { motion } from 'framer-motion';

export default function MatchCard({ match }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const sportIcon = match.sport === 'Football' ? '⚽' : '🏒';
  const sportColor = match.sport === 'Football' ? 'from-blue-500 to-sky-blue' : 'from-purple-500 to-pink-500';

  return (
    <motion.div
      className="group h-full"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="premium-card h-full overflow-hidden">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${sportColor} p-6 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 smooth-transition">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full" />
          </div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-white/80">{match.sport}</p>
              <h3 className="text-2xl font-bold mt-1">vs</h3>
            </div>
            <span className="text-4xl">{sportIcon}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-4">
          {/* Opponent Name */}
          <motion.div
            className="space-y-2"
            whileHover={{ x: 4 }}
          >
            <p className="text-xs font-semibold text-sky-blue uppercase tracking-widest">
              Opponent
            </p>
            <h4 className="text-2xl font-bold text-navy-blue group-hover:text-sky-blue smooth-transition">
              {match.opponent}
            </h4>
          </motion.div>

          {/* Match Details */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            {/* Date */}
            <motion.div
              className="flex items-center space-x-3 text-slate-700"
              whileHover={{ x: 4 }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-sky-blue/20 to-cyan-glow/20 flex items-center justify-center">
                <span className="text-lg">📅</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Date</p>
                <p className="font-semibold text-slate-900">
                  {formatDate(match.date)}
                </p>
              </div>
            </motion.div>

            {/* Time */}
            <motion.div
              className="flex items-center space-x-3 text-slate-700"
              whileHover={{ x: 4 }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                <span className="text-lg">⏰</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Time</p>
                <p className="font-semibold text-slate-900">
                  {formatTime(match.time)}
                </p>
              </div>
            </motion.div>

            {/* Venue */}
            <motion.div
              className="flex items-center space-x-3 text-slate-700"
              whileHover={{ x: 4 }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <span className="text-lg">📍</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Venue</p>
                <p className="font-semibold text-slate-900 truncate">
                  {match.venue}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="px-6 pb-6 pt-4 border-t border-slate-100">
          <motion.button
            className="w-full bg-gradient-to-r from-sky-blue to-cyan-glow text-white py-3 rounded-xl font-semibold"
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
