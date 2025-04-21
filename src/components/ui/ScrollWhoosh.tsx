import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface ScrollWhooshProps {
  direction?: 'left' | 'right';
  intensity?: 'light' | 'medium' | 'strong';
  className?: string;
}

const ScrollWhoosh: React.FC<ScrollWhooshProps> = ({
  direction = 'right',
  intensity = 'medium',
  className = ''
}) => {
  const { theme, themeColor } = useTheme();
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  // Calculate the range of the effect
  useEffect(() => {
    if (!ref) return;

    const setValues = () => {
      setElementTop(ref.offsetTop);
      setClientHeight(window.innerHeight);
    };

    setValues();
    document.addEventListener('resize', setValues);
    document.addEventListener('scroll', setValues);

    return () => {
      document.removeEventListener('resize', setValues);
      document.removeEventListener('scroll', setValues);
    };
  }, [ref]);

  // Parse theme color to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 14, g: 165, b: 233 }; // Default sky blue
  };

  const rgb = hexToRgb(themeColor);

  // Determine opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case 'light': return 0.1;
      case 'medium': return 0.2;
      case 'strong': return 0.3;
      default: return 0.2;
    }
  };

  // Transform values for the whoosh effect
  const translateX = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    direction === 'right' ?
      ['0%', '100%'] :
      ['100%', '0%']
  );

  const opacity = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop - clientHeight * 0.5, elementTop, elementTop + clientHeight * 0.5, elementTop + clientHeight],
    [0, getOpacity(), getOpacity(), getOpacity(), 0]
  );

  const baseColor = theme === 'dark' ?
    `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ` :
    `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, `;

  return (
    <motion.div
      ref={setRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 1, position: 'relative' }} // Add position relative to fix Framer Motion warning
    >
      <motion.div
        className="absolute inset-0"
        style={{
          translateX,
          opacity,
          background: direction === 'right' ?
            `linear-gradient(to right, transparent, ${baseColor}${getOpacity()}), transparent)` :
            `linear-gradient(to left, transparent, ${baseColor}${getOpacity()}), transparent)`,
          filter: 'blur(40px)'
        }}
      />
    </motion.div>
  );
};

export default ScrollWhoosh;
