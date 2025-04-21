import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { NetworkProvider } from './context/NetworkContext';
import { TutorialProvider } from './context/TutorialContext';
import { CommandPaletteProvider } from './context/CommandPaletteContext';

// Layout
import Layout from './components/layout/Layout';

// Pages
import HomePage from './components/home/HomePage';
import NoDistractionPage from './components/no-distraction/NoDistractionPage';
import LowDistractionPage from './components/low-distraction/LowDistractionPage';
import SettingsPage from './components/layout/SettingsPage';

function App() {
  return (
    <ThemeProvider>
      <NetworkProvider>
        <TutorialProvider>
          <CommandPaletteProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/no-distraction" element={<NoDistractionPage />} />
                  <Route path="/low-distraction" element={<LowDistractionPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </Layout>
            </Router>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  borderRadius: '0.5rem',
                  background: 'var(--toast-bg, rgba(255, 255, 255, 0.9))',
                  color: 'var(--toast-color, #1f2937)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(229, 231, 235, 0.3)',
                },
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 4000,
                },
              }}
            />
          </CommandPaletteProvider>
        </TutorialProvider>
      </NetworkProvider>
    </ThemeProvider>
  );
}

export default App;
