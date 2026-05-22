import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMatchesStore } from '../store/index.js';
import MatchCard from './MatchCard.jsx';

export default function UpcomingMatchesPreview() {
  const { matches } = useMatchesStore();
  const upcomingMatches = matches.slice(0, 3);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-navy-blue">Upcoming Matches</h2>
            <Link
              to="/matches"
              className="text-sky-blue font-semibold hover:text-navy-blue smooth-transition"
            >
              View All →
            </Link>
          </div>

          {upcomingMatches.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">No upcoming matches scheduled</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
