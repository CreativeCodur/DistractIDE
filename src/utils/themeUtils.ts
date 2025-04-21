/**
 * Theme utility functions for DistractIDE
 */

/**
 * Applies the theme color from localStorage to the document
 * This is used as a fallback in case the ThemeContext hasn't loaded yet
 */
export const applyThemeColorFromStorage = (): void => {
  // Get theme color from localStorage or use default white
  const themeColor = localStorage.getItem('themeColor') || '#ffffff';
  
  // Extract RGB components
  let r = 255, g = 255, b = 255; // Default white
  
  if (themeColor.startsWith('#')) {
    const hex = themeColor.slice(1);
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  }
  
  // Set CSS variables
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
  
  console.log('Applied theme color from localStorage:', themeColor);
};
