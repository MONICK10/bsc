import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MatchForm({ onSubmit, initialData, isLoading }) {
  const [formData, setFormData] = useState(
    initialData || {
      match_name: '',
      team1_name: '',
      team2_name: '',
      venue: '',
      match_date: '',
      match_time: '',
      sport_type: 'Football',
      description: '',
    }
  );

  const [team1File, setTeam1File] = useState(null);
  const [team2File, setTeam2File] = useState(null);
  const [team1Preview, setTeam1Preview] = useState(initialData?.team1_image || null);
  const [team2Preview, setTeam2Preview] = useState(initialData?.team2_image || null);
  const [uploadProgress, setUploadProgress] = useState({ team1: 0, team2: 0 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (team, file) => {
    if (!file) return;

    if (team === 'team1') {
      setTeam1File(file);
      const reader = new FileReader();
      reader.onload = (e) => setTeam1Preview(e.target.result);
      reader.readAsDataURL(file);
      // Simulate upload progress
      simulateUploadProgress('team1');
    } else {
      setTeam2File(file);
      const reader = new FileReader();
      reader.onload = (e) => setTeam2Preview(e.target.result);
      reader.readAsDataURL(file);
      simulateUploadProgress('team2');
    }
  };

  const simulateUploadProgress = (team) => {
    setUploadProgress((prev) => ({ ...prev, [team]: 0 }));
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const current = prev[team];
        if (current >= 90) {
          clearInterval(interval);
          return { ...prev, [team]: 90 };
        }
        return { ...prev, [team]: current + Math.random() * 30 };
      });
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.match_name.trim() ||
      !formData.team1_name.trim() ||
      !formData.team2_name.trim() ||
      !formData.venue.trim() ||
      !formData.match_date ||
      !formData.match_time
    ) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setUploadProgress({ team1: 90, team2: 90 });
      await onSubmit(formData, team1File, team2File);
      setUploadProgress({ team1: 100, team2: 100 });

      // Reset form
      setTimeout(() => {
        setFormData({
          match_name: '',
          team1_name: '',
          team2_name: '',
          venue: '',
          match_date: '',
          match_time: '',
          sport_type: 'Football',
          description: '',
        });
        setTeam1File(null);
        setTeam2File(null);
        setTeam1Preview(null);
        setTeam2Preview(null);
        setUploadProgress({ team1: 0, team2: 0 });
      }, 500);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Match Name */}
      <div className="space-y-2">
        <label className="block text-lg font-oswald font-bold text-navy-blue tracking-wider">
          MATCH NAME *
        </label>
        <p className="text-sm text-slate-600">e.g., RMA vs BAR or Bearhatty SC vs Tigers FC</p>
        <input
          type="text"
          name="match_name"
          value={formData.match_name}
          onChange={handleInputChange}
          placeholder="Enter match name"
          className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-4 text-lg font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition"
          required
        />
      </div>

      {/* Team Names Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-lg font-oswald font-bold text-navy-blue tracking-wider">
            TEAM 1 NAME *
          </label>
          <input
            type="text"
            name="team1_name"
            value={formData.team1_name}
            onChange={handleInputChange}
            placeholder="e.g., Real Madrid"
            className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-4 text-lg font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-oswald font-bold text-navy-blue tracking-wider">
            TEAM 2 NAME *
          </label>
          <input
            type="text"
            name="team2_name"
            value={formData.team2_name}
            onChange={handleInputChange}
            placeholder="e.g., Barcelona"
            className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-4 text-lg font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition"
            required
          />
        </div>
      </div>

      {/* Image Uploads */}
      <div className="space-y-4">
        <p className="text-lg font-oswald font-bold text-navy-blue tracking-wider">
          TEAM IMAGES (OPTIONAL)
        </p>
        <p className="text-sm text-slate-600">Upload team logos or badges for better presentation</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Team 1 Image */}
          <div className="space-y-4">
            <div className="relative">
              {team1Preview ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-48 bg-slate-100 rounded-xl overflow-hidden border-2 border-sky-blue"
                >
                  <img
                    src={team1Preview}
                    alt="Team 1"
                    className="w-full h-full object-cover"
                  />
                  {uploadProgress.team1 > 0 && uploadProgress.team1 < 100 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-white text-sm font-bold">
                          {Math.round(uploadProgress.team1)}%
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center">
                  <span className="text-5xl mb-2">🖼️</span>
                  <p className="text-slate-600 text-sm">Team 1 Image</p>
                </div>
              )}
            </div>
            <label className="relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageSelect('team1', e.target.files?.[0])}
                className="hidden"
              />
              <span className="block w-full text-center bg-gradient-to-r from-blue-500 to-sky-blue text-white py-3 rounded-xl font-semibold hover:shadow-lg smooth-transition">
                📤 Upload Team 1 Image
              </span>
            </label>
          </div>

          {/* Team 2 Image */}
          <div className="space-y-4">
            <div className="relative">
              {team2Preview ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-48 bg-slate-100 rounded-xl overflow-hidden border-2 border-sky-blue"
                >
                  <img
                    src={team2Preview}
                    alt="Team 2"
                    className="w-full h-full object-cover"
                  />
                  {uploadProgress.team2 > 0 && uploadProgress.team2 < 100 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-white text-sm font-bold">
                          {Math.round(uploadProgress.team2)}%
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center">
                  <span className="text-5xl mb-2">🖼️</span>
                  <p className="text-slate-600 text-sm">Team 2 Image</p>
                </div>
              )}
            </div>
            <label className="relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageSelect('team2', e.target.files?.[0])}
                className="hidden"
              />
              <span className="block w-full text-center bg-gradient-to-r from-blue-500 to-sky-blue text-white py-3 rounded-xl font-semibold hover:shadow-lg smooth-transition">
                📤 Upload Team 2 Image
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Venue */}
      <div className="space-y-2">
        <label className="block text-lg font-oswald font-bold text-navy-blue tracking-wider">
          VENUE *
        </label>
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleInputChange}
          placeholder="e.g., Central Stadium"
          className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-4 text-lg font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition"
          required
        />
      </div>

      {/* Date & Time Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-lg font-oswald font-bold text-navy-blue tracking-wider">
            MATCH DATE *
          </label>
          <input
            type="date"
            name="match_date"
            value={formData.match_date}
            onChange={handleInputChange}
            className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-4 text-lg font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-oswald font-bold text-navy-blue tracking-wider">
            MATCH TIME *
          </label>
          <input
            type="time"
            name="match_time"
            value={formData.match_time}
            onChange={handleInputChange}
            className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-4 text-lg font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition"
            required
          />
        </div>
      </div>

      {/* Sport Type */}
      <div className="space-y-2">
        <label className="block text-lg font-oswald font-bold text-navy-blue tracking-wider">
          SPORT TYPE *
        </label>
        <select
          name="sport_type"
          value={formData.sport_type}
          onChange={handleInputChange}
          className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-4 text-lg font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition"
          required
        >
          <option value="Football">⚽ Football</option>
          <option value="Hockey">🏒 Hockey</option>
        </select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-lg font-oswald font-bold text-navy-blue tracking-wider">
          DESCRIPTION (OPTIONAL)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Add any additional details about the match..."
          className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-4 text-lg font-poppins focus:outline-none focus:border-sky-blue focus:shadow-lg smooth-transition resize-none h-24"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-primary py-4 text-xl font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center space-x-2">
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
              ⏳
            </motion.span>
            <span>Saving Match...</span>
          </span>
        ) : (
          '✅ Save Match'
        )}
      </motion.button>
    </motion.form>
  );
}
