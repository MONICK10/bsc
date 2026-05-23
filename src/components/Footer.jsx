import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Products',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Matches', path: '/matches' },
        { name: 'Achievements', path: '/achievements' },
        { name: 'Live Stream', path: '/live' },
      ],
    },
    {
      title: 'About',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'History', path: '/about' },
        { name: 'Team', path: '/about' },
        { name: 'Careers', path: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Contact', path: '#' },
        { name: 'Support', path: '#' },
        { name: 'FAQ', path: '#' },
        { name: 'Blog', path: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', path: '#' },
        { name: 'Terms', path: '#' },
        { name: 'Cookies', path: '#' },
        { name: 'Licensing', path: '#' },
      ],
    },
  ];

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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-slate-dark text-white border-t border-cyan-glow/20">
      {/* Main Footer */}
      <div className="container-max py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <img
                src="/images/logo.png"
                alt="Bearhatty Logo"
                className="h-12 w-12 rounded-full shadow-glow"
                loading="lazy"
                decoding="async"
              />
              <span className="text-xl font-bebas tracking-wider gradient-text">
                BEARHATTY
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premier sports club founded in 1967, dedicated to excellence in Football and Hockey.
            </p>
            <div className="flex space-x-4 mt-6">
              {['f', 't', 'i', 'l'].map((icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-blue to-cyan-glow flex items-center justify-center text-white hover:shadow-glow smooth-transition"
                  whileHover={{ scale: 1.1 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((column, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <h4 className="font-bold text-white mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-cyan-glow smooth-transition text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-slate-700/50 pt-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p
              className="text-slate-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              © {currentYear} Bearhatty Sports Club. All rights reserved. ✦ Proudly serving since
              1967
            </motion.p>
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              {['Privacy', 'Terms', 'Cookies'].map((item, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  className="text-slate-400 hover:text-cyan-glow smooth-transition text-sm"
                  whileHover={{ x: 2 }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-glow to-transparent opacity-20" />
    </footer>
  );
}
