import React from 'react';
import { motion } from 'framer-motion';

const JobCard = ({ title, company, match, reason, skills, priority }) => {
  const priorityColors = {
    high: 'bg-danger/20 text-danger',
    medium: 'bg-warning/20 text-warning',
    low: 'bg-success/20 text-success',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-muted-text text-sm">{company}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-primary font-bold">{match}% Match</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
            {priority}
          </span>
        </div>
      </div>
      <p className="text-muted-text text-sm mb-4">{reason}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span key={i} className="px-3 py-1 bg-surface rounded-full text-xs">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default JobCard;
