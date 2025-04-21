import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const BackgroundGrid: React.FC = () => {
  const { theme, themeColor } = useTheme();
  const [dotColor, setDotColor] = useState('');

  // Update dot color based on theme and theme color
  useEffect(() => {
    // Extract RGB values from theme color for potential use
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const rgb = hexToRgb(themeColor);

    // Set dot color based on theme
    if (theme === 'dark') {
      // In dark mode, use a subtle light color with a hint of the theme color
      if (rgb) {
        setDotColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`);
      } else {
        setDotColor('rgba(255, 255, 255, 0.07)');
      }
    } else {
      // In light mode, use a subtle dark color with a hint of the theme color
      if (rgb) {
        setDotColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.06)`);
      } else {
        setDotColor('rgba(0, 0, 0, 0.05)');
      }
    }
  }, [theme, themeColor]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle at 50% 50%, rgba(26, 33, 46, 0.7) 0%, rgba(17, 24, 39, 0.95) 100%)'
            : 'radial-gradient(circle at 50% 50%, rgba(249, 250, 251, 0.7) 0%, rgba(243, 244, 246, 0.95) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Primary dot grid */}
      <div
        className="absolute inset-0 z-1"
        style={{
          backgroundImage: `radial-gradient(
            ${dotColor} 1px,
            transparent 1px
          )`,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0',
          opacity: 0.8,
        }}
        aria-hidden="true"
      />

      {/* Secondary dot grid - smaller dots, offset position */}
      <div
        className="absolute inset-0 z-1"
        style={{
          backgroundImage: `radial-gradient(
            ${dotColor} 0.5px,
            transparent 0.5px
          )`,
          backgroundSize: '12px 12px',
          backgroundPosition: '6px 6px',
          opacity: 0.5,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default BackgroundGrid;
