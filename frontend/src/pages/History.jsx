import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiFileText, FiCalendar, FiTrendingUp, FiSearch } from 'react-icons/fi';
import { analysisAPI } from '../api';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const History = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await analysisAPI.getHistory();
        setAnalyses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAnalyses = analyses.filter((a) =>
    a.resume_name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Analysis History</h1>
        <p className="text-muted-text">View all your past career analyses.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
          <input
            type="text"
            placeholder="Search analyses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass border border-surface rounded-xl focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </motion.div>

      {filteredAnalyses.length === 0 ? (
        <EmptyState
          icon={FiFileText}
          title="No Analyses Yet"
          description="Upload a resume and run an analysis to see your history here."
          action={
            <Link
              to="/upload"
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-xl font-medium"
            >
              Upload Resume
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredAnalyses.map((analysis, i) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <FiFileText className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold">{analysis.resume_name || 'Resume Analysis'}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-text mt-1">
                    <span className="flex items-center gap-1">
                      <FiCalendar />
                      {new Date(analysis.created_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiTrendingUp />
                      Score: {analysis.career_score}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to={`/analysis/${analysis.id}`}
                className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                View
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
