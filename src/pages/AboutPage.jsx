import { motion } from 'framer-motion';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-blue to-navy-blue text-white section-padding-lg relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-glow/20 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container-max relative z-10">
          <motion.div
            className="text-center space-y-6 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <p className="text-cyan-glow font-semibold uppercase tracking-widest">
                ✦ Our Story
              </p>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bebas tracking-wider"
            >
              BEARHATTY SPORTS CLUB
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-cyan-glow font-medium"
            >
              Founded in 1967 • Tradition • Excellence • Community
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* History Section */}
            <motion.div
              variants={itemVariants}
              className="premium-card p-8 md:p-12 border-l-4 border-sky-blue"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-5xl">📖</div>
                  <h2 className="text-4xl font-oswald font-bold text-navy-blue">Our History</h2>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Founded in 1967, Bearhatty Sports Club has been a beacon of athletic excellence
                  and community spirit for over five decades. What started as a small local
                  initiative has grown into a premier sports institution known for
                  championship-winning teams and world-class facilities.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Our legacy is built on the dedication of countless athletes, coaches, and
                  volunteers who have contributed to making our club a place where talent thrives
                  and dreams become reality.
                </p>
              </div>
            </motion.div>

            {/* Sports Programs */}
            <motion.div variants={itemVariants} className="space-y-8">
              <h2 className="text-4xl font-oswald font-bold text-navy-blue">Our Sports</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    emoji: '⚽',
                    title: 'Football',
                    description:
                      'Our football program is renowned for developing elite players and winning prestigious championships. With state-of-the-art training facilities and experienced coaching staff, we continue to set the standard for excellence.',
                    color: 'from-blue-500 to-sky-blue',
                  },
                  {
                    emoji: '🏒',
                    title: 'Hockey',
                    description:
                      'Our hockey team represents the pinnacle of winter sports. Competing nationally, our players demonstrate exceptional skill, discipline, and teamwork both on and off the ice.',
                    color: 'from-purple-500 to-pink-500',
                  },
                ].map((sport, idx) => (
                  <motion.div
                    key={idx}
                    className="premium-card p-8 md:p-10 group relative overflow-hidden"
                    whileHover={{ y: -8 }}
                  >
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${sport.color} smooth-transition`}
                    />
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-5xl">{sport.emoji}</span>
                        <h3 className="text-3xl font-bold text-navy-blue">{sport.title}</h3>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{sport.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Core Values */}
            <motion.div variants={itemVariants} className="space-y-8">
              <h2 className="text-4xl font-oswald font-bold text-navy-blue">Core Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: '🏆',
                    title: 'Excellence',
                    description: 'Pursuing the highest standards in all endeavors',
                    color: 'from-yellow-500 to-orange-500',
                  },
                  {
                    icon: '🤝',
                    title: 'Sportsmanship',
                    description: 'Fair play, respect, and integrity in competition',
                    color: 'from-green-500 to-emerald-500',
                  },
                  {
                    icon: '❤️',
                    title: 'Community',
                    description: 'Building lasting connections and supporting each other',
                    color: 'from-red-500 to-pink-500',
                  },
                ].map((value, idx) => (
                  <motion.div
                    key={idx}
                    className="premium-card p-8 text-center hover-lift"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-6xl mb-4">{value.icon}</div>
                    <h3 className="text-2xl font-bold text-navy-blue mb-3">{value.title}</h3>
                    <p className="text-slate-600">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements Highlights */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-sky-blue to-navy-blue text-white rounded-2xl p-8 md:p-12"
            >
              <h2 className="text-3xl font-bold mb-8">Achievements Highlights</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { stat: '57+', label: 'Years of Excellence' },
                  { stat: '150+', label: 'Trophies Won' },
                  { stat: '1000+', label: 'Athletes Trained' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <p className="text-5xl font-bold mb-2">{item.stat}</p>
                    <p className="text-cyan-glow">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Join CTA */}
            <motion.div
              variants={itemVariants}
              className="premium-card p-8 md:p-12 text-center border-2 border-sky-blue"
            >
              <h2 className="text-4xl font-oswald font-bold text-navy-blue mb-4">
                Join Our Community
              </h2>
              <p className="text-lg text-slate-700 mb-6">
                Whether you're a passionate athlete looking to compete at the highest level or a
                supporter who loves sports, Bearhatty Sports Club welcomes you to be part of our
                growing community.
              </p>
              <p className="text-slate-600 mb-8">
                Contact us to learn about membership, training programs, and how you can be part
                of something special.
              </p>
              <motion.button
                className="btn-primary px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
