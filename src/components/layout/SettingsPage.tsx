import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '../ui/GlassPanel';
import GlassButton from '../ui/GlassButton';
import { useTheme } from '../../context/ThemeContext';
import { useTutorial } from '../../context/TutorialContext';
import { FiSun, FiMoon, FiInfo, FiCheck } from 'react-icons/fi';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme, themeColor, setThemeColor } = useTheme();
  const { setShowTutorials, startTutorial } = useTutorial();
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  // Generate 10 pastel-ish dark colors with dark-pastel green as default
  const generateThemeColors = () => {
    // Start with dark-pastel green as the default
    const colors = ['#009b77']; // Dark-pastel green

    // Add 9 pastel-ish dark colors
    colors.push('#6b5b95'); // Pastel purple
    colors.push('#88b04b'); // Pastel green
    colors.push('#955251'); // Pastel burgundy
    colors.push('#dd4124'); // Pastel red-orange
    colors.push('#5b5ea6'); // Pastel blue-purple
    colors.push('#009b77'); // Pastel teal
    colors.push('#9c5700'); // Pastel amber
    colors.push('#45b5aa'); // Pastel turquoise
    colors.push('#d65076'); // Pastel pink

    return colors;
  };

  const themeColors = generateThemeColors();

  // Reset tutorials
  const resetTutorials = () => {
    // Reset visited flag
    localStorage.removeItem('visited');
    // Reset visited pages
    localStorage.removeItem('visitedPages');
    // Reset shown tutorials
    setShowTutorials(true);
    // Show home tutorial immediately
    startTutorial('home');
  };

  return (
    <div className="space-y-6">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Settings
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassPanel className="p-6">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>

          <div className="space-y-6">
            {/* Theme Toggle */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-light-700 dark:text-dark-200">
                Theme
              </h3>

              <div className="flex space-x-3">
                <button
                  className={`flex items-center justify-center p-4 rounded-lg border ${
                    theme === 'light'
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-light-400/30 dark:border-dark-400/30 hover:bg-light-400/10 dark:hover:bg-dark-400/10'
                  }`}
                  onClick={() => theme === 'dark' && toggleTheme()}
                >
                  <FiSun className="w-6 h-6 mr-2" />
                  <span>Light</span>
                  {theme === 'light' && <FiCheck className="ml-2 text-primary-500" />}
                </button>

                <button
                  className={`flex items-center justify-center p-4 rounded-lg border ${
                    theme === 'dark'
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-light-400/30 dark:border-dark-400/30 hover:bg-light-400/10 dark:hover:bg-dark-400/10'
                  }`}
                  onClick={() => theme === 'light' && toggleTheme()}
                >
                  <FiMoon className="w-6 h-6 mr-2" />
                  <span>Dark</span>
                  {theme === 'dark' && <FiCheck className="ml-2 text-primary-500" />}
                </button>
              </div>
            </div>

            {/* Theme Color */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-light-700 dark:text-dark-200">
                Theme Color (10 Options)
              </h3>

              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-2 rounded-lg border border-light-400/30 dark:border-dark-400/30 hover:bg-light-400/10 dark:hover:bg-dark-400/10"
                  onClick={() => setColorPickerOpen(!colorPickerOpen)}
                >
                  <div
                    className="w-6 h-6 rounded-full shadow-sm"
                    style={{
                      background: themeColor,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <span>Current Color</span>
                </button>

                {colorPickerOpen && (
                  <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-500/30 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setColorPickerOpen(false)}
                  >
                    <motion.div
                      className="bg-light-100 dark:bg-dark-500 rounded-lg border border-light-400/30 dark:border-dark-400/30 shadow-lg p-4 w-full max-w-2xl max-h-[80vh] overflow-hidden"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Select Theme Color</h3>
                        <button
                          className="p-1 rounded-full hover:bg-light-400/30 dark:hover:bg-dark-400/30"
                          onClick={() => setColorPickerOpen(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>

                      <div className="overflow-y-auto max-h-[60vh] pr-2">
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-4">
                          {themeColors.map((color, index) => (
                            <button
                              key={index}
                              className={`w-10 h-10 rounded-full transition-transform hover:scale-110 shadow-md ${
                                color === themeColor ? 'ring-2 ring-offset-2 ring-light-600 dark:ring-dark-300 scale-110' : ''
                              }`}
                              style={{
                                background: color,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                              onClick={() => {
                                setThemeColor(color);
                                // Save to localStorage directly as well for redundancy
                                localStorage.setItem('themeColor', color);
                                console.log('Theme color selected and saved:', color);
                              }}
                              aria-label={`Select color ${color}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-light-400/30 dark:border-dark-400/30 flex justify-end">
                        <GlassButton onClick={() => setColorPickerOpen(false)}>
                          Done
                        </GlassButton>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h2 className="text-xl font-semibold mb-4">Help & Tutorials</h2>

          <div className="space-y-4">
            <p className="text-sm">
              DistractIDE includes interactive tutorials to help you learn how to use each feature.
              You can reset the tutorials to see them again on each page.
            </p>

            <div className="space-y-3">
              <GlassButton
                onClick={() => startTutorial('home')}
                className="flex items-center w-full justify-between"
              >
                <span>Home Tutorial</span>
                <FiInfo />
              </GlassButton>

              <GlassButton
                onClick={() => startTutorial('no-distraction')}
                className="flex items-center w-full justify-between"
              >
                <span>No-Distraction Tutorial</span>
                <FiInfo />
              </GlassButton>

              <GlassButton
                onClick={() => startTutorial('low-distraction')}
                className="flex items-center w-full justify-between"
              >
                <span>Low-Distraction Tutorial</span>
                <FiInfo />
              </GlassButton>

              <GlassButton
                onClick={() => startTutorial('command-palette')}
                className="flex items-center w-full justify-between"
              >
                <span>Command Palette Tutorial</span>
                <FiInfo />
              </GlassButton>
            </div>

            <div className="mt-6">
              <GlassButton
                onClick={resetTutorials}
                variant="primary"
                className="flex items-center"
              >
                <FiInfo className="mr-2" />
                <span>Reset All Tutorials</span>
              </GlassButton>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">About DistractIDE</h2>

          <div className="space-y-4">
            <p>
              DistractIDE is an educational platform designed to teach neural networks to beginners
              through a distraction-free interface. It offers two modes:
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>No-Distraction Mode:</strong> Build neural networks using a simple button-based interface.
              </li>
              <li>
                <strong>Low-Distraction Mode:</strong> Use D-Script, a simple domain-specific language, to build neural networks.
              </li>
            </ul>

            <p>
              DistractIDE is currently in beta. We welcome your feedback and suggestions for improvement.
            </p>

            <div className="text-sm text-light-600 dark:text-dark-300">
              Version 0.1.0 (Beta)
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};

export default SettingsPage;
