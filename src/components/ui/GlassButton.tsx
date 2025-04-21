import React from 'react';
import { motion } from 'framer-motion';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
}

const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false,
  type = 'button',
  variant = 'primary'
}) => {
  const baseClasses = 'glass-button';
  
  // Add variant-specific classes
  let variantClasses = '';
  if (variant === 'primary') {
    variantClasses = 'hover:bg-primary-500/20 hover:border-primary-500/50';
  } else if (variant === 'secondary') {
    variantClasses = 'hover:bg-dark-300/20 hover:border-dark-300/50 dark:hover:bg-light-300/20 dark:hover:border-light-300/50';
  } else if (variant === 'danger') {
    variantClasses = 'hover:bg-red-500/20 hover:border-red-500/50';
  }
  
  // Add disabled classes
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer';
  
  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default GlassButton;
