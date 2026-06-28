import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ size = 'md', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const container = fullScreen ? 'min-h-screen flex items-center justify-center' : '';

  return (
    <div className={container}>
      <motion.div
        className={`${sizeClasses[size]} border-4 border-surface border-t-primary rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default Loader;
