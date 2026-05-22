import { motion } from 'framer-motion';
import { useAchievementsStore } from '../store/index.js';
import AchievementCarousel from '../components/AchievementCarousel.jsx';

export default function AchievementsPage() {
  const { achievements } = useAchievementsStore();

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <section className="bg-gradient-to-r from-sky-blue to-navy-blue text-white section-padding-lg relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-cyan-glow/20 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, 100, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container-max relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-6"
          >
            <motion.div variants={itemVariants}>
              <p className="text-cyan-glow text-lg font-semibold uppercase tracking-widest">
                ✦ Gallery
              </p>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bebas tracking-wider"
            >
              OUR ACHIEVEMENTS
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-cyan-glow font-medium max-w-2xl mx-auto"
            >
              Celebrating moments of glory, excellence, and unforgettable victories
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max">
          {achievements && achievements.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-oswald font-bold text-navy-blue text-center mb-2">
                  Featured Moments
                </h2>
                <p className="text-center text-slate-600">
                  Swipe through our most iconic achievements
                </p>
              </div>
              <AchievementCarousel achievements={achievements} />
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* Grid Gallery */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Grid Header */}
            <div>
              <h2 className="text-3xl font-oswald font-bold text-navy-blue mb-2">
                Complete Collection
              </h2>
              <p className="text-slate-600">
                Browse our entire gallery of achievements and memorable moments
              </p>
            </div>

            {/* Grid */}
            {achievements && achievements.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    variants={itemVariants}
                    className="group cursor-pointer"
                    whileHover={{ y: -8 }}
                  >
                    <div className="relative h-80 rounded-2xl overflow-hidden premium-card shadow-soft hover:shadow-soft-lg smooth-transition-lg">
                      {/* Image */}
                      <img
                        src={achievement.media_url}
                        alt={achievement.title}
                        className="w-full h-full object-cover group-hover:scale-110 smooth-transition-lg"
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 smooth-transition-lg" />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 smooth-transition-lg">
                        <motion.div
                          initial={{ y: 20 }}
                          whileHover={{ y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-2xl font-bold mb-2 font-poppins">
                            {achievement.title}
                          </h3>
                          <p className="text-blue-100 line-clamp-3">
                            {achievement.description}
                          </p>
                        </motion.div>
                      </div>

                      {/* Badge */}
                      <motion.div
                        className="absolute top-4 left-4 badge-primary opacity-0 group-hover:opacity-100 smooth-transition"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                      >
                        <span>🏆</span>
                      </motion.div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-4 space-y-1">
                      <h4 className="font-bold text-navy-blue group-hover:text-sky-blue smooth-transition">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {achievement.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-16 rounded-2xl bg-slate-100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4">🏆</div>
                <p className="text-slate-600 text-lg font-medium">
                  No achievements yet. Check back soon!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      {achievements && achievements.length > 0 && (
        <section className="section-padding bg-gradient-to-r from-sky-blue to-navy-blue text-white">
          <div className="container-max text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-oswald font-bold">
                Be Part of Our Legacy
              </h2>
              <p className="text-xl text-cyan-glow max-w-2xl mx-auto">
                Join Bearhatty Sports Club and help create the next chapter of our winning history
              </p>
              <motion.button
                className="btn-primary px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Us
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}
    </motion.div>
  );
}
