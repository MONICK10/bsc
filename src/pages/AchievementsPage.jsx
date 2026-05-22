import { motion } from 'framer-motion';
import { useAchievementsStore } from '../store/index.js';
import AchievementCarousel from '../components/AchievementCarousel.jsx';

export default function AchievementsPage() {
  const { achievements } = useAchievementsStore();

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
          <motion.h1 className="text-5xl font-bold mb-4">Our Achievements</motion.h1>
          <motion.p className="text-xl text-blue-100">
            Celebrating moments of glory and excellence
          </motion.p>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {achievements && achievements.length > 0 ? (
            <>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy-blue mb-8 text-center">Gallery</h2>
                <AchievementCarousel achievements={achievements} />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className="sports-card overflow-hidden hover-lift"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={achievement.media_url}
                      alt={achievement.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-navy-blue mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No achievements yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
