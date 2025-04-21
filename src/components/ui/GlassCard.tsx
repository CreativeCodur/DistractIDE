import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  animate?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '',
  onClick,
  animate = true
}) => {
  const baseClasses = 'glass-card';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  if (animate) {
    return (
      <motion.div
        className={`${baseClasses} ${clickableClasses} ${className}`}
        onClick={onClick}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        whileHover={onClick ? { scale: 1.02 } : {}}
        whileTap={onClick ? { scale: 0.98 } : {}}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div 
      className={`${baseClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
