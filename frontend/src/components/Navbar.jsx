import React from 'react';
import { FiBell, FiSun, FiMoon, FiSearch } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { state, toggleTheme } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-background border border-surface rounded-xl focus:outline-none focus:border-primary transition-colors w-64"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-surface transition-colors"
          >
            {state.theme === 'dark' ? (
              <FiSun className="w-5 h-5" />
            ) : (
              <FiMoon className="w-5 h-5" />
            )}
          </button>
          <button className="p-2 rounded-xl hover:bg-surface transition-colors relative">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold">
              {state.user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="hidden sm:block">
              <p className="font-medium text-sm">{state.user?.name || 'User'}</p>
              <p className="text-muted-text text-xs">{state.user?.email || ''}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
