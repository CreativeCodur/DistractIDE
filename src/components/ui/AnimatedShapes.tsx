import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

type ShapeType = 'circle' | 'square' | 'triangle' | 'hexagon' | 'dots' | 'wave' | 'grid';

interface AnimatedShapesProps {
  type: ShapeType;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'small' | 'medium' | 'large';
  opacity?: number;
  delay?: number;
}

const AnimatedShapes: React.FC<AnimatedShapesProps> = ({
  type,
  position = 'top-right',
  size = 'medium',
  opacity = 0.2,
  delay = 0
}) => {
  const { themeColor } = useTheme();
  
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
  const rgbaColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
  
  // Determine size dimensions
  const getSizeDimensions = () => {
    switch (size) {
      case 'small': return { width: '100px', height: '100px' };
      case 'medium': return { width: '200px', height: '200px' };
      case 'large': return { width: '300px', height: '300px' };
      default: return { width: '200px', height: '200px' };
    }
  };
  
  // Determine position
  const getPosition = () => {
    switch (position) {
      case 'top-left': return { top: '0', left: '0' };
      case 'top-right': return { top: '0', right: '0' };
      case 'bottom-left': return { bottom: '0', left: '0' };
      case 'bottom-right': return { bottom: '0', right: '0' };
      case 'center': return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      default: return { top: '0', right: '0' };
    }
  };
  
  // Render different shapes based on type
  const renderShape = () => {
    const { width, height } = getSizeDimensions();
    
    switch (type) {
      case 'circle':
        return (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              ...getPosition(),
              width,
              height,
              borderRadius: '50%',
              border: `2px solid ${rgbaColor}`,
              opacity: 0
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                borderRadius: '50%',
                border: `1px solid ${rgbaColor}`,
                opacity: 0.5
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        );
        
      case 'square':
        return (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              ...getPosition(),
              width,
              height,
              border: `2px solid ${rgbaColor}`,
              opacity: 0
            }}
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                border: `1px solid ${rgbaColor}`,
                opacity: 0.5
              }}
              animate={{
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        );
        
      case 'triangle':
        return (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              ...getPosition(),
              width,
              height,
              opacity: 0
            }}
            initial={{ opacity: 0, rotate: -30 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <motion.path
                d="M50 10 L90 90 L10 90 Z"
                fill="none"
                stroke={rgbaColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: delay + 0.5 }}
              />
              <motion.path
                d="M50 20 L80 80 L20 80 Z"
                fill="none"
                stroke={rgbaColor}
                strokeWidth="1"
                strokeDasharray="1,3"
                animate={{
                  rotate: [0, 360],
                }}
                style={{ 
                  transformOrigin: 'center',
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </svg>
          </motion.div>
        );
        
      case 'hexagon':
        return (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              ...getPosition(),
              width,
              height,
              opacity: 0
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <motion.path
                d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
                fill="none"
                stroke={rgbaColor}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: delay + 0.5 }}
              />
              <motion.path
                d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z"
                fill="none"
                stroke={rgbaColor}
                strokeWidth="1"
                animate={{
                  rotate: [0, 360],
                }}
                style={{ 
                  transformOrigin: 'center',
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </svg>
          </motion.div>
        );
        
      case 'dots':
        return (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              ...getPosition(),
              width,
              height,
              opacity: 0
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                Array.from({ length: 5 }).map((_, colIndex) => (
                  <motion.circle
                    key={`${rowIndex}-${colIndex}`}
                    cx={20 + colIndex * 15}
                    cy={20 + rowIndex * 15}
                    r="2"
                    fill={rgbaColor}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: (rowIndex + colIndex) * 0.1 + delay,
                      ease: "easeInOut"
                    }}
                  />
                ))
              ))}
            </svg>
          </motion.div>
        );
        
      case 'wave':
        return (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              ...getPosition(),
              width,
              height,
              opacity: 0
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <motion.path
                d="M10 50 Q25 30 40 50 Q55 70 70 50 Q85 30 100 50"
                fill="none"
                stroke={rgbaColor}
                strokeWidth="2"
                initial={{ pathLength: 0, pathOffset: 1 }}
                animate={{ pathLength: 1, pathOffset: 0 }}
                transition={{ duration: 2, delay: delay + 0.5 }}
              />
              <motion.path
                d="M10 70 Q25 50 40 70 Q55 90 70 70 Q85 50 100 70"
                fill="none"
                stroke={rgbaColor}
                strokeWidth="1"
                initial={{ pathLength: 0, pathOffset: 1 }}
                animate={{ pathLength: 1, pathOffset: 0 }}
                transition={{ duration: 2, delay: delay + 0.7 }}
              />
              <motion.path
                d="M10 30 Q25 10 40 30 Q55 50 70 30 Q85 10 100 30"
                fill="none"
                stroke={rgbaColor}
                strokeWidth="1"
                initial={{ pathLength: 0, pathOffset: 1 }}
                animate={{ pathLength: 1, pathOffset: 0 }}
                transition={{ duration: 2, delay: delay + 0.9 }}
              />
            </svg>
          </motion.div>
        );
        
      case 'grid':
        return (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              ...getPosition(),
              width,
              height,
              opacity: 0
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              {/* Horizontal lines */}
              {Array.from({ length: 5 }).map((_, index) => (
                <motion.line
                  key={`h-${index}`}
                  x1="0"
                  y1={20 * (index + 1)}
                  x2="100"
                  y2={20 * (index + 1)}
                  stroke={rgbaColor}
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: index * 0.1 + delay }}
                />
              ))}
              
              {/* Vertical lines */}
              {Array.from({ length: 5 }).map((_, index) => (
                <motion.line
                  key={`v-${index}`}
                  x1={20 * (index + 1)}
                  y1="0"
                  x2={20 * (index + 1)}
                  y2="100"
                  stroke={rgbaColor}
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: index * 0.1 + delay + 0.5 }}
                />
              ))}
            </svg>
          </motion.div>
        );
        
      default:
        return null;
    }
  };
  
  return renderShape();
};

export default AnimatedShapes;
