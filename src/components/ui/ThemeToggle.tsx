import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      className="p-2 rounded-full bg-light-300/50 dark:bg-dark-400/50 backdrop-blur-sm"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <FiMoon className="w-5 h-5 text-dark-500" />
      ) : (
        <FiSun className="w-5 h-5 text-light-200" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
