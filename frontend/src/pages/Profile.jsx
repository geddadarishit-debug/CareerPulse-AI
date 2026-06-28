import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiFileText, FiBarChart2, FiAward, FiLock, FiEdit, FiCheck, FiX } from 'react-icons/fi';
import StatCard from '../components/StatCard';
import { useApp } from '../context/AppContext';
import { resumeAPI, analysisAPI, usersAPI } from '../api';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Profile = () => {
  const { state, dispatch } = useApp();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resumes, history] = await Promise.all([
          resumeAPI.getMyResumes(),
          analysisAPI.getHistory(),
        ]);
        
        const highestScore = history.reduce(
          (max, a) => Math.max(max, a.career_score || 0),
          0
        );

        setStats({
          totalResumes: resumes?.length || 0,
          totalAnalyses: history?.length || 0,
          highestScore,
        });

        if (state.user) {
          setFormData({
            name: state.user.name || '',
            email: state.user.email || '',
            password: '',
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      return toast.error('Name cannot be empty');
    }
    if (!formData.email.trim()) {
      return toast.error('Email cannot be empty');
    }
    if (formData.password && formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters long');
    }

    setUpdating(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
      };
      if (formData.password) {
        payload.password = formData.password;
      }

      const updatedUser = await usersAPI.updateMe(payload);
      
      // Update app context & local storage
      dispatch({ type: 'SET_USER', payload: updatedUser });
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setFormData(prev => ({ ...prev, password: '' }));
    } catch (err) {
      const detail = err.response?.data?.detail;
      const message = typeof detail === 'string' 
        ? detail 
        : 'Failed to update profile. Email might be in use.';
      toast.error(message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold text-white">
              {state.user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{state.user?.name || 'User'}</h1>
              <p className="text-muted-text flex items-center gap-2 mt-1">
                <FiMail />
                {state.user?.email || ''}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              if (state.user) {
                setFormData({
                  name: state.user.name || '',
                  email: state.user.email || '',
                  password: '',
                });
              }
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-surface hover:bg-surface/80 border border-border rounded-xl font-medium transition-colors"
          >
            {isEditing ? (
              <>
                <FiX /> Cancel
              </>
            ) : (
              <>
                <FiEdit /> Edit Profile
              </>
            )}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Resumes"
          value={stats?.totalResumes || 0}
          icon={FiFileText}
          color="accent"
        />
        <StatCard
          title="Analyses"
          value={stats?.totalAnalyses || 0}
          icon={FiBarChart2}
          color="success"
        />
        <StatCard
          title="Highest Score"
          value={stats?.highestScore || 0}
          icon={FiAward}
          color="primary"
        />
      </div>

      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div
            key="info-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-6">Account Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-background rounded-xl">
                <FiUser className="text-muted-text" />
                <div>
                  <p className="text-sm text-muted-text">Name</p>
                  <p className="font-medium">{state.user?.name || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-background rounded-xl">
                <FiMail className="text-muted-text" />
                <div>
                  <p className="text-sm text-muted-text">Email</p>
                  <p className="font-medium">{state.user?.email || 'N/A'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="edit-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-6">Edit Account Details</h3>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-text"
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-text"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  New Password <span className="text-xs text-muted-text">(leave blank to keep current)</span>
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-text"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={updating}
                  className="px-6 py-2.5 bg-surface hover:bg-surface/80 border border-border rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary rounded-xl font-medium hover:opacity-90 transition-opacity text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating ? <Loader size="sm" /> : <><FiCheck /> Save Changes</>}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
