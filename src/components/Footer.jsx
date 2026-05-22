import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-blue text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <img src="/images/logo.png" alt="Bearhatty Logo" className="h-8 w-8" />
              <span>Bearhatty</span>
            </h3>
            <p className="text-blue-200 text-sm">
              A premier sports club founded in 1967, dedicated to excellence in Football and Hockey.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-blue-200 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/matches" className="text-blue-200 hover:text-white">
                  Matches
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="text-blue-200 hover:text-white">
                  Achievements
                </Link>
              </li>
              <li>
                <Link to="/live" className="text-blue-200 hover:text-white">
                  Live Broadcast
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Sports */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h3 className="text-lg font-bold mb-4">Our Sports</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-blue-200">⚽ Football</li>
              <li className="text-blue-200">🏒 Hockey</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-blue-200 text-sm">
              Email: info@bearhatty.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm">
              © {currentYear} Bearhatty Sports Club. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-blue-200 hover:text-white text-sm">
                Privacy
              </a>
              <a href="#" className="text-blue-200 hover:text-white text-sm">
                Terms
              </a>
              <a href="#" className="text-blue-200 hover:text-white text-sm">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
