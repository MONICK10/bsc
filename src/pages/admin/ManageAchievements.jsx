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
    if (confirm('Delete this achievement?')) {
      try {
        await apiService.deleteAchievement(id);
        deleteAchievement(id);
      } catch (error) {
        console.error('Error deleting achievement:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-navy-blue">Manage Achievements</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-sky-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 smooth-transition"
        >
          {showForm ? '✕ Cancel' : '+ Add Achievement'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Achievement Title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded p-2 h-24"
            />
            <input
              type="url"
              name="media_url"
              placeholder="Media URL (Image or Video)"
              value={formData.media_url}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
            <select
              name="media_type"
              value={formData.media_type}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-green-500 text-white rounded p-2 font-semibold hover:bg-green-600"
              >
                Add Achievement
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ title: '', description: '', media_url: '', media_type: 'image' });
                }}
                className="flex-1 bg-gray-500 text-white rounded p-2 font-semibold hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={achievement.media_url}
                alt={achievement.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-navy-blue mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
                <button
                  onClick={() => handleDelete(achievement.id)}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8 col-span-full">
            No achievements yet. Add one to get started!
          </p>
        )}
      </div>
    </div>
  );
}
