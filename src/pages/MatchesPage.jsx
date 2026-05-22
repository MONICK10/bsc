import { motion } from 'framer-motion';
import { useMatchesStore } from '../store/index.js';
import MatchCard from '../components/MatchCard.jsx';

export default function MatchesPage() {
  const { matches } = useMatchesStore();

  const footballMatches = matches.filter((m) => m.sport === 'Football');
  const hockeyMatches = matches.filter((m) => m.sport === 'Hockey');

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
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <section className="bg-gradient-to-r from-sky-blue to-navy-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Upcoming Matches</h1>
          <p className="text-xl text-blue-100">Don't miss the action! Check our upcoming fixtures.</p>
        </div>
      </section>

      {/* Matches Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Football Matches */}
          <motion.div className="mb-16" variants={containerVariants} initial="hidden" whileInView="visible">
            <motion.h2 className="text-3xl font-bold text-navy-blue mb-8 flex items-center" variants={itemVariants}>
              <span className="text-4xl mr-3">⚽</span> Football Matches
            </motion.h2>
            {footballMatches.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {footballMatches.map((match) => (
                  <motion.div key={match.id} variants={itemVariants}>
                    <MatchCard match={match} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No upcoming football matches scheduled.</p>
            )}
          </motion.div>

          {/* Hockey Matches */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible">
            <motion.h2 className="text-3xl font-bold text-navy-blue mb-8 flex items-center" variants={itemVariants}>
              <span className="text-4xl mr-3">🏒</span> Hockey Matches
            </motion.h2>
            {hockeyMatches.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hockeyMatches.map((match) => (
                  <motion.div key={match.id} variants={itemVariants}>
                    <MatchCard match={match} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No upcoming hockey matches scheduled.</p>
            )}
          </motion.div>

          {matches.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No matches scheduled. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
