import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'from-primary to-secondary',
    accent: 'from-accent to-primary',
    success: 'from-success to-accent',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-text text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.positive ? 'text-success' : 'text-danger'}`}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} opacity-10`}>
          <Icon className="text-2xl" style={{ color: color === 'primary' ? '#2563EB' : color === 'accent' ? '#06B6D4' : '#10B981' }} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
