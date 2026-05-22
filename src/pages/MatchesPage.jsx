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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
            className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-glow/20 rounded-full blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -100, 0] }}
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
                ✦ Schedule
              </p>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bebas tracking-wider"
            >
              UPCOMING MATCHES
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-cyan-glow font-medium max-w-2xl mx-auto"
            >
              Don't miss the action! Check our upcoming fixtures and join the excitement
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Matches Section */}
      <section className="section-padding">
        <div className="container-max">
          {/* Football Matches */}
          <motion.div
            className="mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-5xl">⚽</span>
                <h2 className="text-4xl md:text-5xl font-oswald font-bold text-navy-blue">
                  Football Matches
                </h2>
              </div>
              <p className="text-slate-600 ml-20">
                Competitive football fixtures featuring our championship-winning team
              </p>
            </motion.div>

            {footballMatches.length > 0 ? (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {footballMatches.map((match) => (
                  <motion.div key={match.id} variants={itemVariants}>
                    <MatchCard match={match} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12 rounded-2xl bg-slate-100"
                variants={itemVariants}
              >
                <p className="text-slate-600 text-lg font-medium">
                  No upcoming football matches scheduled
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Hockey Matches */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-5xl">🏒</span>
                <h2 className="text-4xl md:text-5xl font-oswald font-bold text-navy-blue">
                  Hockey Matches
                </h2>
              </div>
              <p className="text-slate-600 ml-20">
                Elite hockey competitions featuring our top-tier athletes
              </p>
            </motion.div>

            {hockeyMatches.length > 0 ? (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {hockeyMatches.map((match) => (
                  <motion.div key={match.id} variants={itemVariants}>
                    <MatchCard match={match} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12 rounded-2xl bg-slate-100"
                variants={itemVariants}
              >
                <p className="text-slate-600 text-lg font-medium">
                  No upcoming hockey matches scheduled
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* No Matches at All */}
          {matches.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-8xl mb-6">📅</div>
              <h2 className="text-3xl font-bold text-navy-blue mb-2">
                No Matches Scheduled
              </h2>
              <p className="text-slate-600 text-lg">
                Check back soon for upcoming fixtures
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-slate-50 border-t border-slate-200">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl font-oswald font-bold text-navy-blue">
              Want to Stay Updated?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Subscribe to notifications to never miss an upcoming match or live broadcast
            </p>
            <motion.button
              className="btn-primary px-8 py-4 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Notifications
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
