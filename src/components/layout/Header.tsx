import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCommand, FiHelpCircle, FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from '../ui/ThemeToggle';
import { useCommandPalette } from '../../context/CommandPaletteContext';
import { useTutorial, TutorialType } from '../../context/TutorialContext';
import { useTheme } from '../../context/ThemeContext';

// Import logo images
// For dark mode
import logoIconDark from '../../assets/images/logo-icon-dark.png';
import logoTextDark from '../../assets/images/logo-text-dark.png';
// For light mode (using the specified images)
import logoIconLight from '../../assets/images/logo-text-light.png'; // Light mode icon (switched)
import logoTextLight from '../../assets/images/logo-icon-light.png'; // Light mode text (switched)

const Header: React.FC = () => {
  const location = useLocation();
  const { openCommandPalette } = useCommandPalette();
  const { forceStartTutorial } = useTutorial();
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Select the appropriate logo based on the theme
  // In dark mode, use the dark logo
  // In light mode, use the light logo
  const logoIcon = theme === 'dark' ? logoTextLight : logoIconDark;
  const logoText = theme === 'dark' ? logoIconLight : logoTextDark;

  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/no-distraction', label: 'No-Distraction' },
    { path: '/low-distraction', label: 'Low-Distraction' },
    { path: '/settings', label: 'Settings' }
  ];

  // Force show tutorial when Help button is clicked
  const handleHelpClick = () => {
    // Determine which tutorial to show based on current path
    let tutorialType: TutorialType = 'home';
    const path = location.pathname;

    if (path === '/') {
      tutorialType = 'home';
    } else if (path === '/no-distraction') {
      tutorialType = 'no-distraction';
    } else if (path === '/low-distraction') {
      tutorialType = 'low-distraction';
    } else if (path === '/settings') {
      tutorialType = 'command-palette';
    }

    // Force show the tutorial regardless of whether it's been shown before
    forceStartTutorial(tutorialType);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-transparent border-b border-dark-400/30 dark:border-light-400/30">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            {/* Logo icon */}
            <img src={logoIcon} alt="DistractIDE Icon" className="w-8 h-8" />

            {/* Logo text */}
            <img src={logoText} alt="DistractIDE" className="h-6" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-1">
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors font-mono ${
                      location.pathname === link.path
                        ? 'bg-theme-light text-theme'
                        : 'text-light-300 dark:text-dark-500 hover:bg-dark-400/30 dark:hover:bg-light-400/30'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              className="p-2 rounded-lg text-light-300 dark:text-dark-500 bg-dark-500 dark:bg-light-300"
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <motion.button
            className="flex items-center px-2 sm:px-3 py-1.5 text-sm rounded-lg glass-button accent-bg accent-text font-mono"
            onClick={handleHelpClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Help"
          >
            <FiHelpCircle className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">Help</span>
          </motion.button>

          <motion.button
            className="flex items-center px-3 py-1.5 text-sm rounded-lg glass-button font-mono"
            onClick={openCommandPalette}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiCommand className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Command</span>
            <span className="hidden sm:inline text-dark-300 dark:text-light-600 ml-1">Ctrl+K</span>
          </motion.button>

          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-16 inset-x-0 z-50 backdrop-blur-md bg-dark-600/70 dark:bg-light-200/70 border-b border-dark-400/30 dark:border-light-400/30 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container mx-auto px-4 py-3">
              <ul className="space-y-2">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors font-mono ${
                        location.pathname === link.path
                          ? 'bg-theme-light text-theme'
                          : 'text-light-300 dark:text-dark-500 hover:bg-dark-400/30 dark:hover:bg-light-400/30'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
