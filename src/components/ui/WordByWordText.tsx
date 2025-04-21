import React from 'react';
import { motion } from 'framer-motion';

interface WordByWordTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
}

const WordByWordText: React.FC<WordByWordTextProps> = ({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  once = true,
  tag = 'p'
}) => {
  // Split the text into words
  const words = text.split(' ');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };
  
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  // Render the appropriate HTML tag
  const renderTag = () => {
    const content = (
      <motion.div
        className="inline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
      >
        {words.map((word, index) => (
          <motion.span key={index} className="inline-block" variants={wordVariants}>
            {word}{' '}
          </motion.span>
        ))}
      </motion.div>
    );
    
    switch (tag) {
      case 'h1':
        return <h1 className={className}>{content}</h1>;
      case 'h2':
        return <h2 className={className}>{content}</h2>;
      case 'h3':
        return <h3 className={className}>{content}</h3>;
      case 'h4':
        return <h4 className={className}>{content}</h4>;
      case 'h5':
        return <h5 className={className}>{content}</h5>;
      case 'h6':
        return <h6 className={className}>{content}</h6>;
      case 'span':
        return <span className={className}>{content}</span>;
      case 'div':
        return <div className={className}>{content}</div>;
      default:
        return <p className={className}>{content}</p>;
    }
  };
  
  return renderTag();
};

export default WordByWordText;
