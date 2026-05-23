import { motion } from 'framer-motion';

const defaultTeamLogo = (
  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-slate-300 to-slate-400 rounded-xl flex items-center justify-center text-5xl">
    ⚽
  </div>
);

export default function ModernMatchCard({ match, onEdit, onDelete, isAdmin = false }) {
  // Prevent render if match is missing
  if (!match) {
    return (
      <motion.div className="premium-card p-6 text-center">
        <p className="text-slate-600">Match data unavailable</p>
      </motion.div>
    );
  }

  const sportIcon = match.sport_type === 'Football' ? '⚽' : '🏒';
  const sportGradient =
    match.sport_type === 'Football'
      ? 'from-blue-500 to-sky-blue'
      : 'from-purple-500 to-pink-500';

  return (
    <motion.div
      className="premium-card overflow-hidden"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Upper Half - Teams VS */}
      <div className={`bg-gradient-to-br ${sportGradient} p-6 md:p-8 flex items-center justify-between gap-4`}>
        {/* Team 1 */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-24 h-24 md:w-28 md:h-28 bg-white/20 rounded-lg overflow-hidden border-2 border-white/40 backdrop-blur-sm">
            {match.team1_image ? (
              <img
                src={match.team1_image}
                alt={match.team1_name}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-white/80">
                {sportIcon}
              </div>
            )}
          </div>
          <p className="text-sm md:text-base font-bold text-white text-center line-clamp-2">
            {match.team1_name || 'Team 1'}
          </p>
        </div>

        {/* VS */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-white text-xl md:text-2xl font-bebas tracking-wider">VS</div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">{sportIcon}</span>
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="w-24 h-24 md:w-28 md:h-28 bg-white/20 rounded-lg overflow-hidden border-2 border-white/40 backdrop-blur-sm">
            {match.team2_image ? (
              <img
                src={match.team2_image}
                alt={match.team2_name}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-white/80">
                {sportIcon}
              </div>
            )}
          </div>
          <p className="text-sm md:text-base font-bold text-white text-center line-clamp-2">
            {match.team2_name || 'Team 2'}
          </p>
        </div>
      </div>

      {/* Lower Half - Match Details */}
      <div className="p-6 md:p-8 space-y-4">
        {/* Match Name */}
        <h3 className="text-xl md:text-2xl font-bold text-navy-blue">{match.match_name || 'Upcoming Match'}</h3>

        {/* Details Grid */}
        <div className="space-y-3">
          {/* Venue */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">📍</span>
            <span className="text-slate-700 font-medium">{match.venue || 'Venue TBD'}</span>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">📅</span>
            <span className="text-slate-700 font-medium">
              {match.match_date ? new Date(match.match_date).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }) : 'Date TBD'}{' '}
              at{' '}
              <span className="font-bold text-navy-blue">
                {match.match_time ? match.match_time.substring(0, 5) : 'TBD'}
              </span>
            </span>
          </div>

          {/* Sport Type */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">{sportIcon}</span>
            <span className="text-slate-700 font-medium capitalize">{match.sport_type || 'Sport TBD'}</span>
          </div>
        </div>

        {/* Description if exists */}
        {match.description && (
          <p className="text-sm text-slate-600 italic border-l-2 border-sky-blue pl-3 py-2">
            {match.description}
          </p>
        )}

        {/* Admin Actions */}
        {isAdmin && (onEdit || onDelete) && (
          <div className="flex gap-3 pt-4">
            {onEdit && (
              <motion.button
                onClick={() => onEdit(match)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 smooth-transition"
              >
                ✏️ Edit
              </motion.button>
            )}
            {onDelete && (
              <motion.button
                onClick={() => onDelete(match.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 smooth-transition"
              >
                🗑️ Delete
              </motion.button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
