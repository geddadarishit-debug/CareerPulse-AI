import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {Icon && <Icon className="text-6xl text-muted-text mb-6" />}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-text max-w-md mb-6">{description}</p>
      {action && <div>{action}</div>}
    </motion.div>
  );
};

export default EmptyState;
