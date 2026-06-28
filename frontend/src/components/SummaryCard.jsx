import React from 'react';
import { motion } from 'framer-motion';
import { FiZap } from 'react-icons/fi';

const SummaryCard = ({ summary }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <FiZap className="text-2xl text-accent" />
          <h3 className="text-xl font-bold">AI Summary</h3>
        </div>
        <p className="text-muted-text leading-relaxed">{summary}</p>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
