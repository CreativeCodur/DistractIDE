import React, { createContext, useState, useEffect, useContext } from 'react';

type Theme = 'light' | 'dark';
type ThemeColor = string;

interface ThemeContextType {
  theme: Theme;
  themeColor: ThemeColor;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if user prefers dark mode
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || (prefersDarkMode ? 'dark' : 'light')
  );

  // Initialize theme color from localStorage or default (white)
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    const savedColor = localStorage.getItem('themeColor');
    console.log('Loading theme color from localStorage:', savedColor || '#ffffff (default)');
    return savedColor || '#ffffff';
  });

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Update localStorage when theme color changes and apply throughout the website
  useEffect(() => {
    // Store the selected theme color in localStorage
    if (themeColor) {
      localStorage.setItem('themeColor', themeColor);
      console.log('Theme color saved to localStorage:', themeColor);
    }

    // Extract color components if it's a hex color
    let r, g, b;
    if (themeColor.startsWith('#')) {
      const hex = themeColor.slice(1);
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
    // Handle HSL colors
    else if (themeColor.startsWith('hsl')) {
      const match = themeColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
      if (match) {
        // Convert HSL to RGB (simplified conversion)
        const h = parseInt(match[1]) / 360;
        const s = parseInt(match[2]) / 100;
        const l = parseInt(match[3]) / 100;

        if (s === 0) {
          r = g = b = Math.round(l * 255);
        } else {
          const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
          };

          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;

          r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
          g = Math.round(hue2rgb(p, q, h) * 255);
          b = Math.round(hue2rgb(p, q, h - 1/3) * 255);
        }
      } else {
        // Default fallback
        r = 255; g = 255; b = 255; // Default white
      }
    }
    // Handle linear-gradient
    else if (themeColor.startsWith('linear-gradient')) {
      // For gradients, extract the first color
      const match = themeColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        r = parseInt(match[1]);
        g = parseInt(match[2]);
        b = parseInt(match[3]);
      } else {
        // Default fallback
        r = 255; g = 255; b = 255; // Default white
      }
    }
    // Default fallback
    else {
      r = 255; g = 255; b = 255; // Default white
    }

    // Set CSS variables for theme color in different formats
    document.documentElement.style.setProperty('--theme-color', themeColor);
    document.documentElement.style.setProperty('--theme-color-rgb', `${r}, ${g}, ${b}`);
    document.documentElement.style.setProperty('--theme-color-light', `rgba(${r}, ${g}, ${b}, 0.1)`);
    document.documentElement.style.setProperty('--theme-color-medium', `rgba(${r}, ${g}, ${b}, 0.3)`);
    document.documentElement.style.setProperty('--theme-color-dark', `rgba(${r}, ${g}, ${b}, 0.8)`);

    // Apply theme color to various CSS custom properties for components
    const root = document.documentElement;

    // Primary button and interactive elements
    root.style.setProperty('--primary-color', themeColor);
    root.style.setProperty('--primary-hover', `rgba(${r}, ${g}, ${b}, 0.8)`);

    // Accent backgrounds
    root.style.setProperty('--accent-bg', `rgba(${r}, ${g}, ${b}, 0.1)`);
    root.style.setProperty('--accent-border', `rgba(${r}, ${g}, ${b}, 0.3)`);

    // Text accents
    root.style.setProperty('--accent-text', themeColor);

    // Focus rings
    root.style.setProperty('--focus-ring', `rgba(${r}, ${g}, ${b}, 0.5)`);
  }, [themeColor]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Compute isDarkMode based on theme
  const isDarkMode = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, themeColor, isDarkMode, toggleTheme, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
