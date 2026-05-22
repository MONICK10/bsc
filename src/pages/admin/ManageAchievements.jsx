import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAchievementsStore } from '../../store/index.js';
import { apiService } from '../../services/api.js';

export default function ManageAchievements() {
  const { achievements, addAchievement, deleteAchievement } = useAchievementsStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media_url: '',
    media_type: 'image',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await apiService.createAchievement(formData);
      addAchievement(created);
      setFormData({ title: '', description: '', media_url: '', media_type: 'image' });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this achievement?')) {
      try {
        await apiService.deleteAchievement(id);
        deleteAchievement(id);
      } catch (error) {
        console.error('Error deleting achievement:', error);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        initial={{ y: -30 }}
        animate={{ y: 0 }}
      >
        <div>
          <h1 className="text-5xl font-bebas tracking-wider text-navy-blue">
            MANAGE ACHIEVEMENTS
          </h1>
          <p className="text-cyan-glow font-semibold mt-2">Add and manage club achievements</p>
        </div>
        <motion.button
          onClick={() => setShowForm(!showForm)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`btn-primary px-8 py-3 text-lg font-bold whitespace-nowrap ${
            showForm ? 'bg-red-600 hover:bg-red-700' : ''
          }`}
        >
          {showForm ? '✕ Cancel' : '🏆 Add Achievement'}
        </motion.button>
      </motion.div>

      {/* Add Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card p-8 space-y-6"
        >
          <h2 className="text-2xl font-oswald font-bold text-navy-blue">Create New Achievement</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-navy-blue font-oswald font-bold tracking-wide mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., National Championship 2024"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-3 font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition"
              />
            </div>

            <div>
              <label className="block text-navy-blue font-oswald font-bold tracking-wide mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe this achievement..."
                value={formData.description}
                onChange={handleInputChange}
                required
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-3 font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition h-28 resize-none"
              />
            </div>

            <div>
              <label className="block text-navy-blue font-oswald font-bold tracking-wide mb-2">
                Media URL
              </label>
              <input
                type="url"
                name="media_url"
                placeholder="https://example.com/image.jpg"
                value={formData.media_url}
                onChange={handleInputChange}
                required
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-3 font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition"
              />
            </div>

            <div>
              <label className="block text-navy-blue font-oswald font-bold tracking-wide mb-2">
                Media Type
              </label>
              <select
                name="media_type"
                value={formData.media_type}
                onChange={handleInputChange}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-3 font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition"
              >
                <option value="image">📷 Image</option>
                <option value="video">🎥 Video</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-glow smooth-transition"
              >
                ✓ Add Achievement
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ title: '', description: '', media_url: '', media_type: 'image' });
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-slate-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-slate-600 smooth-transition"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Achievements Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="premium-card overflow-hidden group"
            >
              <div className="relative overflow-hidden h-48 bg-slate-200">
                <img
                  src={achievement.media_url}
                  alt={achievement.title}
                  className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 smooth-transition" />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-navy-blue text-lg line-clamp-2">
                  {achievement.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-2">{achievement.description}</p>
                <div className="pt-3">
                  <motion.button
                    onClick={() => handleDelete(achievement.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2 rounded-lg font-semibold hover:shadow-glow smooth-transition"
                  >
                    🗑️ Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-16"
          >
            <p className="text-5xl mb-4">🏆</p>
            <p className="text-slate-600 text-lg">No achievements yet</p>
            <p className="text-slate-500 text-sm mt-2">
              Click "Add Achievement" to create your first one
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
