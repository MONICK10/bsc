import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMatchesStore } from '../../store/index.js';
import {
  fetchMatches,
  createMatch,
  updateMatch,
  deleteMatch,
} from '../../services/matchesService.js';
import MatchForm from '../../components/admin/MatchForm.jsx';
import ModernMatchCard from '../../components/ModernMatchCard.jsx';

export default function ManageMatches() {
  const { matches, setMatches, setLoading, loading } = useMatchesStore();
  const [showForm, setShowForm] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    setLoading(true);
    try {
      const data = await fetchMatches();
      setMatches(data || []);
    } catch (error) {
      console.error('Load matches error:', error);
      showToast('Failed to load matches', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleCreateMatch = async (matchData, team1File, team2File) => {
    setLoading(true);
    try {
      const newMatch = await createMatch(matchData, team1File, team2File);
      setMatches([...matches, newMatch]);
      showToast('✅ Match created successfully!', 'success');
      setShowForm(false);
      loadMatches(); // Refresh to ensure consistency
    } catch (error) {
      console.error('Create match error:', error);
      showToast('❌ Failed to create match. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditMatch = async (matchData, team1File, team2File) => {
    setLoading(true);
    try {
      const updated = await updateMatch(editingMatch.id, matchData, team1File, team2File);
      setMatches(
        matches.map((m) => (m.id === editingMatch.id ? updated : m))
      );
      showToast('✅ Match updated successfully!', 'success');
      setEditingMatch(null);
      setShowForm(false);
      loadMatches(); // Refresh to ensure consistency
    } catch (error) {
      console.error('Update match error:', error);
      showToast('❌ Failed to update match. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMatch = async (matchId) => {
    if (!confirm('Are you sure you want to delete this match? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    try {
      await deleteMatch(matchId);
      setMatches(matches.filter((m) => m.id !== matchId));
      showToast('✅ Match deleted successfully!', 'success');
    } catch (error) {
      console.error('Delete match error:', error);
      showToast('❌ Failed to delete match. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (match) => {
    setEditingMatch(match);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMatch(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-20 left-4 right-4 md:left-auto md:right-4 md:w-96 p-4 rounded-xl font-semibold z-50 ${
            toastType === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {toastMessage}
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        initial={{ y: -30 }}
        animate={{ y: 0 }}
      >
        <div>
          <h1 className="text-5xl font-bebas tracking-wider text-navy-blue">
            MANAGE MATCHES
          </h1>
          <p className="text-cyan-glow font-semibold mt-2">
            Add, edit, and manage upcoming matches
          </p>
        </div>
        {!showForm && (
          <motion.button
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 py-3 text-lg font-bold whitespace-nowrap"
          >
            ⚽ Add New Match
          </motion.button>
        )}
      </motion.div>

      {/* Form Section */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card p-8 md:p-12 space-y-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-oswald font-bold text-navy-blue">
              {editingMatch ? 'Edit Match' : 'Create New Match'}
            </h2>
            <motion.button
              onClick={handleCancel}
              whileHover={{ scale: 1.1 }}
              className="text-3xl hover:text-red-600"
            >
              ✕
            </motion.button>
          </div>

          <MatchForm
            onSubmit={editingMatch ? handleEditMatch : handleCreateMatch}
            initialData={editingMatch}
            isLoading={loading}
          />
        </motion.div>
      )}

      {/* Matches Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {matches.length > 0 ? (
          matches.map((match) => (
            <ModernMatchCard
              key={match.id}
              match={match}
              onEdit={handleEdit}
              onDelete={handleDeleteMatch}
              isAdmin={true}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-16 premium-card"
          >
            <p className="text-6xl mb-4">⚽</p>
            <p className="text-slate-600 text-xl">No matches yet</p>
            <p className="text-slate-500 text-lg mt-2">
              Click "Add New Match" to schedule your first match
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Info Section */}
      {matches.length > 0 && (
        <motion.div
          className="glass-effect border-2 border-cyan-glow/30 rounded-xl p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-slate-600">
            Total Matches: <span className="font-bold text-navy-blue text-lg">{matches.length}</span>
          </p>
          <p className="text-sm text-slate-500 mt-2">
            All changes are automatically reflected on the homepage and upcoming matches page
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
