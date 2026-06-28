import React from 'react';
import { motion } from 'framer-motion';

const SkillChip = ({ skill, type = 'found', importance }) => {
  const typeClasses = {
    found: 'bg-primary/20 text-primary border border-primary/30',
    missing: 'bg-danger/20 text-danger border border-danger/30',
    trending: 'bg-accent/20 text-accent border border-accent/30',
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${typeClasses[type]}`}
    >
      {skill}
      {importance && (
        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-surface">
          {importance}
        </span>
      )}
    </motion.span>
  );
};

export default SkillChip;
