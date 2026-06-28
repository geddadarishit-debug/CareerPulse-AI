import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, difficulty, techStack, estimatedTime }) => {
  const difficultyColors = {
    easy: 'bg-success/20 text-success',
    medium: 'bg-warning/20 text-warning',
    hard: 'bg-danger/20 text-danger',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
      </div>
      <p className="text-muted-text text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech, i) => (
          <span key={i} className="px-3 py-1 bg-surface rounded-full text-xs">
            {tech}
          </span>
        ))}
      </div>
      <p className="text-sm text-muted-text">⏱️ {estimatedTime}</p>
    </motion.div>
  );
};

export default ProjectCard;
