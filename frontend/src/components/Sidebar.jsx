import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUpload,
  FiBarChart2,
  FiClock,
  FiUser,
  FiSettings,
  FiTrendingUp,
  FiBriefcase,
  FiCpu,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FiUpload, label: 'Upload Resume', path: '/upload' },
    { icon: FiBarChart2, label: 'Analysis', path: '/analysis' },
    { icon: FiClock, label: 'History', path: '/history' },
    { icon: FiUser, label: 'Profile', path: '/profile' },
    { icon: FiSettings, label: 'Settings', path: '/settings', disabled: true },
    { icon: FiTrendingUp, label: 'Market Trends', path: '/trends', disabled: true },
    { icon: FiBriefcase, label: 'Jobs', path: '/jobs', disabled: true },
    { icon: FiCpu, label: 'AI Coach', path: '/coach', disabled: true },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          CareerPulse
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.disabled ? '#' : item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : item.disabled
                  ? 'text-muted-text cursor-not-allowed opacity-50'
                  : 'text-muted-text hover:text-white hover:bg-surface'
              }`}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-muted-text hover:text-danger hover:bg-surface/50 transition-all"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass rounded-lg"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isMobileOpen ? 0 : -300 }}
        className="fixed left-0 top-0 h-full w-72 glass z-50 lg:hidden"
      >
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-4 right-4 p-2"
        >
          <FiX className="w-6 h-6" />
        </button>
        {sidebarContent}
      </motion.div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-72 glass h-screen sticky top-0">
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
