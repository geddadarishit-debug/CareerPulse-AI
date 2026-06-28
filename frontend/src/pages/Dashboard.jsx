import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiTrendingUp,
  FiFileText,
  FiBarChart2,
  FiAward,
  FiUpload,
  FiClock,
} from 'react-icons/fi';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import StatCard from '../components/StatCard';
import { resumeAPI, analysisAPI } from '../api';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [recentAnalyses, setRecentAnalyses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resumes, history] = await Promise.all([
          resumeAPI.getMyResumes(),
          analysisAPI.getHistory(),
        ]);
        
        const latestAnalysis = history[0];
        const careerScore = latestAnalysis?.career_score || 0;
        
        setStats({
          careerScore,
          totalResumes: resumes?.length || 0,
          totalAnalyses: history?.length || 0,
          bestMatch: latestAnalysis?.role_matches?.[0]?.role || 'N/A',
        });

        setRecentAnalyses(history.slice(0, 5));

        setChartData([
          { month: 'Jan', score: 65 },
          { month: 'Feb', score: 68 },
          { month: 'Mar', score: 72 },
          { month: 'Apr', score: 75 },
          { month: 'May', score: 78 },
          { month: 'Jun', score: careerScore },
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          Good Morning, {stats?.bestMatch !== 'N/A' ? 'Analyst' : 'User'}! 👋
        </h1>
        <p className="text-muted-text">Here's your career overview.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Career Score"
          value={stats?.careerScore || 0}
          icon={FiAward}
          color="primary"
          trend={{ positive: true, value: '+12%' }}
        />
        <StatCard
          title="Total Resumes"
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
          title="Best Match"
          value={stats?.bestMatch || 'N/A'}
          icon={FiTrendingUp}
          color="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold mb-6">Career Score Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#2563EB"
                  fillOpacity={1}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <Link
              to="/upload"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary to-secondary rounded-xl hover:opacity-90 transition-opacity"
            >
              <FiUpload className="w-6 h-6" />
              <span className="font-medium">Upload Resume</span>
            </Link>
            <Link
              to="/analysis"
              className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-surface transition-colors"
            >
              <FiBarChart2 className="w-6 h-6" />
              <span className="font-medium">Run Analysis</span>
            </Link>
            <Link
              to="/history"
              className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-surface transition-colors"
            >
              <FiClock className="w-6 h-6" />
              <span className="font-medium">View History</span>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        {recentAnalyses.length === 0 ? (
          <EmptyState
            icon={FiClock}
            title="No Recent Activity"
            description="Upload a resume and run an analysis to see your activity here."
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
            {recentAnalyses.map((analysis) => (
              <Link
                key={analysis.id}
                to={`/analysis/${analysis.id}`}
                className="flex items-center justify-between p-4 bg-background rounded-xl hover:bg-surface transition-colors"
              >
                <div>
                  <p className="font-medium">{analysis.resume_name || 'Resume Analysis'}</p>
                  <p className="text-sm text-muted-text">
                    {new Date(analysis.created_at).toLocaleDateString()} · Score: {analysis.career_score}
                  </p>
                </div>
                <FiBarChart2 className="text-primary" />
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
