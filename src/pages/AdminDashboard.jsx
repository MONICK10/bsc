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
      color: 'from-sky-blue to-blue-500',
    },
    {
      label: 'Achievements',
      value: achievements.length,
      icon: '🏆',
      color: 'from-yellow-400 to-yellow-500',
    },
    {
      label: 'Football Matches',
      value: matches.filter((m) => m.sport === 'Football').length,
      icon: '🎯',
      color: 'from-green-400 to-green-500',
    },
    {
      label: 'Hockey Matches',
      value: matches.filter((m) => m.sport === 'Hockey').length,
      icon: '🏒',
      color: 'from-purple-400 to-purple-500',
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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="text-4xl font-bold text-navy-blue mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">{stat.label}</p>
                <p className="text-4xl font-bold">{stat.value}</p>
              </div>
              <span className="text-5xl opacity-20">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-navy-blue mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Link
            to="/admin/matches"
            className="bg-sky-blue text-white p-4 rounded-lg text-center font-semibold hover:bg-blue-600 smooth-transition"
          >
            📋 Manage Matches
          </Link>
          <Link
            to="/admin/achievements"
            className="bg-yellow-500 text-white p-4 rounded-lg text-center font-semibold hover:bg-yellow-600 smooth-transition"
          >
            🏆 Manage Achievements
          </Link>
          <Link
            to="/admin/live"
            className="bg-red-500 text-white p-4 rounded-lg text-center font-semibold hover:bg-red-600 smooth-transition"
          >
            📹 Live Control
          </Link>
          <Link
            to="/"
            className="bg-gray-500 text-white p-4 rounded-lg text-center font-semibold hover:bg-gray-600 smooth-transition"
          >
            👀 View Site
          </Link>
        </div>
      </motion.div>

      {/* Recent Matches */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-navy-blue mb-6">Recent Matches</h2>
        {matches.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-navy-blue">Opponent</th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-blue">Sport</th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-blue">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-blue">Venue</th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-blue">Time</th>
                </tr>
              </thead>
              <tbody>
                {matches.slice(0, 5).map((match) => (
                  <tr key={match.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{match.opponent}</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-sky-blue px-3 py-1 rounded-full text-sm font-semibold">
                        {match.sport}
                      </span>
                    </td>
                    <td className="py-3 px-4">{match.date}</td>
                    <td className="py-3 px-4">{match.venue}</td>
                    <td className="py-3 px-4">{match.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No matches yet.</p>
        )}
      </motion.div>
    </motion.div>
  );
}
