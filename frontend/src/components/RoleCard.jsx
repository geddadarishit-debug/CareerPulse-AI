import React from 'react';
import { motion } from 'framer-motion';

const RoleCard = ({ role, match, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{role}</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-success font-bold">{match}% Match</span>
        </div>
      </div>
      <p className="text-muted-text">{description}</p>
      <div className="mt-4">
        <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${match}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-primary to-secondary"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default RoleCard;
