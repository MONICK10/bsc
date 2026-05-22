import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection.jsx';
import UpcomingMatchesPreview from '../components/UpcomingMatchesPreview.jsx';
import AchievementsPreview from '../components/AchievementsPreview.jsx';
import LivePreview from '../components/LivePreview.jsx';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sports-card p-8"
            >
              <div className="text-5xl mb-4">⚽</div>
              <h3 className="text-2xl font-bold text-navy-blue mb-4">Football</h3>
              <p className="text-gray-600 mb-4">
                Championship-winning football program with state-of-the-art training facilities and dedicated coaching staff.
              </p>
              <Link to="/matches" className="text-sky-blue font-semibold hover:text-navy-blue">
                View Football Matches →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sports-card p-8"
            >
              <div className="text-5xl mb-4">🏒</div>
              <h3 className="text-2xl font-bold text-navy-blue mb-4">Hockey</h3>
              <p className="text-gray-600 mb-4">
                Elite hockey team competing at national level with modern training facilities and professional coaching.
              </p>
              <Link to="/matches" className="text-sky-blue font-semibold hover:text-navy-blue">
                View Hockey Matches →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <LivePreview />
      <UpcomingMatchesPreview />
      <AchievementsPreview />
    </motion.div>
  );
}
