import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMatchesStore } from '../../store/index.js';
import { apiService } from '../../services/api.js';

export default function ManageMatches() {
  const { matches, addMatch, deleteMatch, updateMatch } = useMatchesStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    opponent: '',
    date: '',
    venue: '',
    sport: 'Football',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await apiService.updateMatch(editingId, formData);
        updateMatch(editingId, updated);
      } else {
        const created = await apiService.createMatch(formData);
        addMatch(created);
      }
      setFormData({ opponent: '', date: '', venue: '', sport: 'Football', time: '' });
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving match:', error);
    }
  };

  const handleEdit = (match) => {
    setFormData(match);
    setEditingId(match.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this match?')) {
      try {
        await apiService.deleteMatch(id);
        deleteMatch(id);
      } catch (error) {
        console.error('Error deleting match:', error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ opponent: '', date: '', venue: '', sport: 'Football', time: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-navy-blue">Manage Matches</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-sky-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 smooth-transition"
        >
          {showForm ? '✕ Cancel' : '+ Add Match'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="opponent"
              placeholder="Opponent Team"
              value={formData.opponent}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="venue"
              placeholder="Venue"
              value={formData.venue}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded p-2"
            />
            <select
              name="sport"
              value={formData.sport}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2"
            >
              <option>Football</option>
              <option>Hockey</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-green-500 text-white rounded p-2 font-semibold hover:bg-green-600"
              >
                {editingId ? 'Update' : 'Add'} Match
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-500 text-white rounded p-2 font-semibold hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Matches List */}
      <div className="grid gap-4">
        {matches.length > 0 ? (
          matches.map((match) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow p-6 flex justify-between items-center"
            >
              <div className="flex-1">
                <h3 className="font-bold text-lg text-navy-blue">{match.opponent}</h3>
                <p className="text-gray-600">
                  {match.sport} • {match.date} at {match.time}
                </p>
                <p className="text-gray-600 text-sm">{match.venue}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(match)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(match.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No matches yet. Add one to get started!</p>
        )}
      </div>
    </div>
  );
}
