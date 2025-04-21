import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface WindWhooshProps {
  side?: 'left' | 'right' | 'both';
  intensity?: 'light' | 'medium' | 'strong';
  color?: string;
}

const WindWhoosh: React.FC<WindWhooshProps> = ({
  side = 'both',
  intensity = 'medium',
  color
}) => {
  const { themeColor } = useTheme();
  const [windowHeight, setWindowHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get scroll position
  const { scrollY } = useScroll();
  
  // Set up window height for calculations
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Parse theme color to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 14, g: 165, b: 233 }; // Default sky blue
  };
  
  const rgb = hexToRgb(color || themeColor);
  
  // Determine opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case 'light': return 0.15;
      case 'medium': return 0.25;
      case 'strong': return 0.35;
      default: return 0.25;
    }
  };
  
  // Create spring animation for smoother scrolling effect
  const scrollYSpring = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Transform values for wind effect
  const leftOpacity = useTransform(
    scrollYSpring,
    [0, windowHeight * 0.5, windowHeight, windowHeight * 1.5, windowHeight * 2],
    [0, getOpacity(), getOpacity() * 0.5, getOpacity(), 0]
  );
  
  const rightOpacity = useTransform(
    scrollYSpring,
    [0, windowHeight * 0.5, windowHeight, windowHeight * 1.5, windowHeight * 2],
    [0, getOpacity() * 0.5, getOpacity(), getOpacity() * 0.5, 0]
  );
  
  const leftTranslateX = useTransform(
    scrollYSpring,
    [0, windowHeight * 2],
    ['-100%', '50%']
  );
  
  const rightTranslateX = useTransform(
    scrollYSpring,
    [0, windowHeight * 2],
    ['100%', '-50%']
  );
  
  // Create wind particles
  const createParticles = (count: number, side: 'left' | 'right') => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const speed = Math.random() * 2 + 0.5;
      const opacity = Math.random() * 0.5 + 0.2;
      const delay = Math.random() * 2;
      const duration = Math.random() * 3 + 2;
      const top = `${Math.random() * 100}%`;
      
      return (
        <motion.div
          key={`${side}-particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size * 3,
            backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`,
            top,
            [side]: '10%',
            boxShadow: `0 0 ${size * 2}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.5})`,
          }}
          animate={{
            x: side === 'left' ? ['0%', '300%'] : ['0%', '-300%'],
            opacity: [0, opacity, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
            times: [0, 0.7, 1]
          }}
        />
      );
    });
  };
  
  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Left side wind effect */}
      {(side === 'left' || side === 'both') && (
        <motion.div
          className="absolute left-0 top-0 h-full w-1/4"
          style={{
            opacity: leftOpacity,
            x: leftTranslateX,
            background: `linear-gradient(to right, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${getOpacity()}), transparent)`,
            filter: 'blur(40px)',
          }}
        >
          {createParticles(15, 'left')}
        </motion.div>
      )}
      
      {/* Right side wind effect */}
      {(side === 'right' || side === 'both') && (
        <motion.div
          className="absolute right-0 top-0 h-full w-1/4"
          style={{
            opacity: rightOpacity,
            x: rightTranslateX,
            background: `linear-gradient(to left, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${getOpacity()}), transparent)`,
            filter: 'blur(40px)',
          }}
        >
          {createParticles(15, 'right')}
        </motion.div>
      )}
    </div>
  );
};

export default WindWhoosh;
