import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAchievementsStore } from '../store/index.js';

export default function AchievementsPreview() {
  const { achievements } = useAchievementsStore();
  const previewAchievements = achievements.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-navy-blue">Recent Achievements</h2>
            <Link
              to="/achievements"
              className="text-sky-blue font-semibold hover:text-navy-blue smooth-transition"
            >
              View Gallery →
            </Link>
          </div>

          {previewAchievements.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {previewAchievements.map((achievement) => (
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
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">No achievements yet. Check back soon!</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
