import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import TutorialModal from '../tutorials/TutorialModal';
import CommandPalette from '../command-palette/CommandPalette';
import BackgroundGrid from '../ui/BackgroundGrid';
import { useTutorial, TutorialType } from '../../context/TutorialContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { startTutorial, showTutorials } = useTutorial();

  // Track visited pages and show tutorials on first visit
  useEffect(() => {
    if (showTutorials) {
      const path = location.pathname;
      const visitedPages = JSON.parse(localStorage.getItem('visitedPages') || '{}');

      // If this page hasn't been visited before, show the tutorial
      if (!visitedPages[path]) {
        // Determine which tutorial to show based on current path
        let tutorialType: TutorialType = 'home';

        if (path === '/') {
          tutorialType = 'home';
        } else if (path === '/no-distraction') {
          tutorialType = 'no-distraction';
        } else if (path === '/low-distraction') {
          tutorialType = 'low-distraction';
        } else if (path === '/settings') {
          tutorialType = 'command-palette';
        }

        // Start the tutorial
        startTutorial(tutorialType);

        // Mark this page as visited
        visitedPages[path] = true;
        localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
      }
    }
  }, [location.pathname, showTutorials, startTutorial]);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background grid with dots */}
      <BackgroundGrid />

      {/* Main content layers */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Modals and overlays */}
      <TutorialModal />
      <CommandPalette />
    </div>
  );
};

export default Layout;
