import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAchievementsStore } from '../store/index.js';

export default function AchievementsPreview() {
  const { achievements } = useAchievementsStore();
  const previewAchievements = achievements.slice(0, 3);

  return (
    <section className="section-padding bg-gradient-to-b from-white to-slate-50">
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
                ✦ Gallery Highlights
              </p>
              <h2 className="text-4xl md:text-5xl font-oswald font-bold text-navy-blue">
                Recent Achievements
              </h2>
            </div>
            <motion.div whileHover={{ x: 4 }}>
              <Link
                to="/achievements"
                className="inline-flex items-center space-x-2 text-sky-blue font-semibold hover:text-cyan-glow smooth-transition"
              >
                <span>Explore Gallery</span>
                <span className="text-xl">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Achievements Grid */}
          {previewAchievements.length > 0 ? (
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
              {previewAchievements.map((achievement, idx) => (
                <motion.div
                  key={achievement.id}
                  className="group cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative h-72 rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg smooth-transition">
                    {/* Image */}
                    <img
                      src={achievement.media_url}
                      alt={achievement.title}
                      className="w-full h-full object-cover group-hover:scale-110 smooth-transition-lg"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 smooth-transition-lg flex flex-col justify-end p-6 text-white" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4 badge-primary opacity-0 group-hover:opacity-100 smooth-transition">
                      Featured
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-4 space-y-2">
                    <h3 className="text-lg font-bold text-navy-blue group-hover:text-sky-blue smooth-transition">
                      {achievement.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 group-hover:text-slate-900 smooth-transition">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12 rounded-2xl bg-slate-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <p className="text-slate-500 text-lg font-medium">
                No achievements yet. Check back soon! 🏆
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
