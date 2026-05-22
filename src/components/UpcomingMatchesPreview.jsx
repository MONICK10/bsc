import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMatches } from '../services/matchesService.js';
import ModernMatchCard from './ModernMatchCard.jsx';

export default function UpcomingMatchesPreview() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    setLoading(true);
    try {
      const data = await fetchMatches();
      // Sort by date and get first 3
      const sorted = (data || [])
        .sort((a, b) => new Date(a.match_date) - new Date(b.match_date))
        .slice(0, 3);
      setMatches(sorted);
    } catch (error) {
      console.error('Load matches error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-sky-blue font-semibold uppercase tracking-widest mb-2">
                ✦ Next Fixtures
              </p>
              <h2 className="text-4xl md:text-5xl font-oswald font-bold text-navy-blue">
                Upcoming Matches
              </h2>
            </div>
            <motion.div whileHover={{ x: 4 }}>
              <Link
                to="/upcoming-matches"
                className="inline-flex items-center space-x-2 text-sky-blue font-semibold hover:text-cyan-glow smooth-transition"
              >
                <span>View All Matches</span>
                <span className="text-xl">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Matches Grid */}
          {loading ? (
            <motion.div
              className="flex items-center justify-center py-20"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-lg text-slate-600">Loading matches...</p>
            </motion.div>
          ) : matches.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {matches.map((match) => (
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
        </motion.div>
      </div>
    </section>
  );
}
