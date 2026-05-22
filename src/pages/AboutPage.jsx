import { motion } from 'framer-motion';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero */}
      <section className="bg-gradient-to-r from-sky-blue to-navy-blue text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 className="text-5xl font-bold mb-4" variants={itemVariants}>
            Bearhatty Sports Club
          </motion.h1>
          <motion.p className="text-2xl text-blue-100" variants={itemVariants}>
            Founded in 1967 • Tradition • Excellence • Community
          </motion.p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="sports-card p-8 mb-8" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-navy-blue mb-4">Our History</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in 1967, Bearhatty Sports Club has been a beacon of athletic excellence and community spirit for over five decades. What started as a small local initiative has grown into a premier sports institution known for championship-winning teams and world-class facilities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our legacy is built on the dedication of countless athletes, coaches, and volunteers who have contributed to making our club a place where talent thrives and dreams become reality.
            </p>
          </motion.div>

          <motion.div className="sports-card p-8 mb-8" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-navy-blue mb-4">Our Sports</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-sky-blue pl-4">
                <h3 className="text-xl font-bold text-navy-blue mb-2">Football</h3>
                <p className="text-gray-600">
                  Our football program is renowned for developing elite players and winning prestigious championships. With state-of-the-art training facilities and experienced coaching staff, we continue to set the standard for excellence.
                </p>
              </div>
              <div className="border-l-4 border-sky-blue pl-4">
                <h3 className="text-xl font-bold text-navy-blue mb-2">Hockey</h3>
                <p className="text-gray-600">
                  Our hockey team represents the pinnacle of winter sports. Competing nationally, our players demonstrate exceptional skill, discipline, and teamwork both on and off the ice.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div className="sports-card p-8 mb-8" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-navy-blue mb-4">Core Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-bold text-navy-blue mb-2">Excellence</h3>
                <p className="text-gray-600 text-sm">Pursuing the highest standards in all endeavors</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="font-bold text-navy-blue mb-2">Sportsmanship</h3>
                <p className="text-gray-600 text-sm">Fair play, respect, and integrity in competition</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">❤️</div>
                <h3 className="font-bold text-navy-blue mb-2">Community</h3>
                <p className="text-gray-600 text-sm">Building lasting connections and supporting each other</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="sports-card p-8" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-navy-blue mb-4">Join Our Community</h2>
            <p className="text-gray-700 mb-4">
              Whether you're a passionate athlete looking to compete at the highest level or a supporter who loves sports, Bearhatty Sports Club welcomes you to be part of our growing community.
            </p>
            <p className="text-gray-700">
              Contact us to learn about membership, training programs, and how you can be part of something special.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
