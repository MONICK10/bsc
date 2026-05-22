import { motion } from 'framer-motion';
import { useMatchesStore, useAchievementsStore } from '../store/index.js';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { matches } = useMatchesStore();
  const { achievements } = useAchievementsStore();

  const stats = [
    {
      label: 'Total Matches',
      value: matches.length,
      icon: '⚽',
      color: 'from-sky-blue to-cyan-glow',
      trend: '+2 this month',
    },
    {
      label: 'Achievements',
      value: achievements.length,
      icon: '🏆',
      color: 'from-yellow-400 to-yellow-500',
      trend: '+3 this month',
    },
    {
      label: 'Football Matches',
      value: matches.filter((m) => m.sport === 'Football').length,
      icon: '🎯',
      color: 'from-green-400 to-emerald-500',
      trend: 'Active',
    },
    {
      label: 'Hockey Matches',
      value: matches.filter((m) => m.sport === 'Hockey').length,
      icon: '🏒',
      color: 'from-purple-400 to-pink-500',
      trend: 'Active',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50"
    >
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-bebas tracking-wider text-navy-blue">
            ADMIN DASHBOARD
          </h1>
          <p className="text-slate-600">
            Manage your club's matches, achievements, and live broadcasts
          </p>
        </motion.div>
      </div>

      <div className="container-max pb-12">
        {/* Stats Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, shadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-soft overflow-hidden relative group`}
            >
              {/* Glow Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 smooth-transition bg-white rounded-2xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                    <p className="text-5xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <span className="text-5xl opacity-30">{stat.icon}</span>
                </div>
                <p className="text-white/70 text-xs font-semibold">{stat.trend}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-soft p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-navy-blue mb-8">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                to: '/admin/matches',
                icon: '📋',
                label: 'Manage Matches',
                color: 'from-sky-blue to-cyan-glow',
              },
              {
                to: '/admin/achievements',
                icon: '🏆',
                label: 'Manage Achievements',
                color: 'from-yellow-400 to-yellow-500',
              },
              {
                to: '/admin/live',
                icon: '📹',
                label: 'Live Control',
                color: 'from-red-500 to-pink-600',
              },
              {
                to: '/',
                icon: '👀',
                label: 'View Site',
                color: 'from-slate-400 to-slate-600',
              },
            ].map((action, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={action.to}
                  className={`bg-gradient-to-br ${action.color} text-white p-6 rounded-xl font-semibold smooth-transition hover:shadow-glow flex flex-col items-center justify-center text-center space-y-2 min-h-32`}
                >
                  <span className="text-4xl">{action.icon}</span>
                  <span>{action.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Matches */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-soft p-8"
          >
            <h2 className="text-2xl font-bold text-navy-blue mb-6">Recent Matches</h2>
            {matches.length > 0 ? (
              <div className="space-y-4">
                {matches.slice(0, 5).map((match) => (
                  <motion.div
                    key={match.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 smooth-transition border-l-4 border-sky-blue"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-navy-blue">vs {match.opponent}</p>
                      <p className="text-sm text-slate-600">
                        {match.date} • {match.time}
                      </p>
                    </div>
                    <div className="text-center">
                      <span className="bg-sky-blue/20 text-sky-blue px-3 py-1 rounded-full text-sm font-semibold">
                        {match.sport}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">No matches yet</p>
            )}
          </motion.div>

          {/* Recent Achievements */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-soft p-8"
          >
            <h2 className="text-2xl font-bold text-navy-blue mb-6">Recent Achievements</h2>
            {achievements.length > 0 ? (
              <div className="space-y-4">
                {achievements.slice(0, 5).map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 smooth-transition border-l-4 border-yellow-500"
                    whileHover={{ x: 4 }}
                  >
                    <div className="text-3xl">🏆</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy-blue truncate">
                        {achievement.title}
                      </p>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {achievement.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">No achievements yet</p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
