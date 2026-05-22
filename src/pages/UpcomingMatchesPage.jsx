import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchMatches } from '../services/matchesService.js';
import ModernMatchCard from '../components/ModernMatchCard.jsx';

export default function UpcomingMatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    setLoading(true);
    try {
      const data = await fetchMatches();
      // Sort by date ascending
      const sorted = (data || []).sort((a, b) => 
        new Date(a.match_date) - new Date(b.match_date)
      );
      setMatches(sorted);
    } catch (error) {
      console.error('Load matches error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMatches =
    filter === 'All'
      ? matches
      : matches.filter((m) => m.sport_type === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen section-padding bg-gradient-to-b from-slate-50 to-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Header */}
          <div>
            <p className="text-sky-blue font-semibold uppercase tracking-widest mb-2">
              ✦ Next Fixtures
            </p>
            <h2 className="text-4xl md:text-5xl font-oswald font-bold text-navy-blue">
              Upcoming Matches
            </h2>
          </div>

          {/* Filter Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 justify-start md:justify-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {['All', 'Football', 'Hockey'].map((sport) => (
              <motion.button
                key={sport}
                onClick={() => setFilter(sport)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-semibold smooth-transition ${
                  filter === sport
                    ? 'bg-gradient-to-r from-sky-blue to-cyan-glow text-white shadow-glow'
                    : 'bg-slate-200 text-navy-blue hover:bg-slate-300'
                }`}
              >
                {sport === 'All' ? '⚽ All Sports' : sport === 'Football' ? '⚽ Football' : '🏒 Hockey'}
              </motion.button>
            ))}
          </motion.div>

          {/* Matches Grid */}
          {loading ? (
            <motion.div
              className="flex items-center justify-center py-20"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-lg text-slate-600">Loading matches...</p>
            </motion.div>
          ) : filteredMatches.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filteredMatches.map((match) => (
                <ModernMatchCard key={match.id} match={match} isAdmin={false} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-16 rounded-2xl bg-slate-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">📅</div>
              <p className="text-slate-600 text-lg font-medium">
                No upcoming matches scheduled at this time
              </p>
            </motion.div>
          )}

          {/* Stats Section */}
          {filteredMatches.length > 0 && (
            <motion.div
              className="mt-12 bg-gradient-to-r from-sky-blue to-navy-blue text-white rounded-2xl p-8 md:p-12"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2">{filteredMatches.length}</p>
                  <p className="text-cyan-glow">Upcoming Matches</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2">
                    {filteredMatches.filter((m) => m.sport_type === 'Football').length}
                  </p>
                  <p className="text-cyan-glow">Football Matches</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2">
                    {filteredMatches.filter((m) => m.sport_type === 'Hockey').length}
                  </p>
                  <p className="text-cyan-glow">Hockey Matches</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}