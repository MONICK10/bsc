import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection.jsx';
import UpcomingMatchesPreview from '../components/UpcomingMatchesPreview.jsx';
import AchievementsPreview from '../components/AchievementsPreview.jsx';
import LivePreview from '../components/LivePreview.jsx';

export default function HomePage() {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />

      {/* Sports Programs Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Section Header */}
            <motion.div
              variants={itemVariants}
              className="text-center space-y-4 max-w-2xl mx-auto"
            >
              <p className="text-sky-blue font-semibold uppercase tracking-widest">
                ✦ Our Programs
              </p>
              <h2 className="text-4xl md:text-5xl font-oswald font-bold text-navy-blue">
                Excellence in Every Sport
              </h2>
              <p className="text-lg text-slate-600">
                Discover our championship-winning programs designed to develop athletes at every level
              </p>
            </motion.div>

            {/* Programs Grid */}
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Football Program */}
              <motion.div
                variants={itemVariants}
                className="group premium-card p-8 md:p-10 overflow-hidden relative"
                whileHover={{ y: -8 }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-sky-blue/10 opacity-0 group-hover:opacity-100 smooth-transition" />

                <div className="relative z-10 space-y-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-blue flex items-center justify-center text-4xl">
                    ⚽
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-navy-blue group-hover:text-sky-blue smooth-transition">
                      Football
                    </h3>
                    <p className="text-slate-700 text-lg leading-relaxed">
                      Championship-winning football program with state-of-the-art training facilities and dedicated coaching staff. Compete at national level.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <p className="text-2xl font-bold text-sky-blue">50+</p>
                      <p className="text-sm text-slate-600">Active Players</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-sky-blue">15+</p>
                      <p className="text-sm text-slate-600">Trophies Won</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="pt-4"
                  >
                    <Link
                      to="/matches"
                      className="inline-flex items-center space-x-2 text-sky-blue font-semibold hover:text-cyan-glow smooth-transition"
                    >
                      <span>View Football Matches</span>
                      <span className="text-xl">→</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Hockey Program */}
              <motion.div
                variants={itemVariants}
                className="group premium-card p-8 md:p-10 overflow-hidden relative"
                whileHover={{ y: -8 }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 smooth-transition" />

                <div className="relative z-10 space-y-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl">
                    🏒
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-navy-blue group-hover:text-purple-600 smooth-transition">
                      Hockey
                    </h3>
                    <p className="text-slate-700 text-lg leading-relaxed">
                      Elite hockey team competing at national level with modern training facilities and professional coaching. Experience world-class competition.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <p className="text-2xl font-bold text-purple-600">35+</p>
                      <p className="text-sm text-slate-600">Active Players</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">20+</p>
                      <p className="text-sm text-slate-600">Trophies Won</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="pt-4"
                  >
                    <Link
                      to="/matches"
                      className="inline-flex items-center space-x-2 text-purple-600 font-semibold hover:text-pink-600 smooth-transition"
                    >
                      <span>View Hockey Matches</span>
                      <span className="text-xl">→</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live Preview Section */}
      <LivePreview />

      {/* Upcoming Matches Section */}
      <UpcomingMatchesPreview />

      {/* Achievements Section */}
      <AchievementsPreview />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-sky-blue to-navy-blue text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-glow/20 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bebas tracking-wider">
              JOIN BEARHATTY SPORTS CLUB
            </h2>
            <p className="text-xl text-cyan-glow max-w-2xl mx-auto">
              Be part of our winning legacy. Train with champions, compete at the highest level, and achieve greatness.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              whileHover={{ scale: 1.02 }}
            >
              <motion.button
                className="btn-primary px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Our Team
              </motion.button>
              <motion.button
                className="px-8 py-4 text-lg border-2 border-white text-white rounded-xl font-semibold smooth-transition hover:bg-white hover:text-sky-blue"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
