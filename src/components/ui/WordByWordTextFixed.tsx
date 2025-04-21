import React from 'react';
import { motion } from 'framer-motion';
import DefinitionTermFixed, { termDefinitions } from './DefinitionTermFixed';

interface WordByWordTextFixedProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
}

const WordByWordTextFixed: React.FC<WordByWordTextFixedProps> = ({
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

  // Create the content with motion spans
  // Check if a word is a technical term
  const isTechnicalTerm = (word: string): boolean => {
    // Remove any punctuation from the word
    const cleanWord = word.replace(/[.,!?;:'"]$/g, '').toLowerCase();
    return Object.keys(termDefinitions).includes(cleanWord);
  };

  const content = (
    <motion.span
      className="inline"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,!?;:'"]$/g, '');
        const punctuation = word.match(/[.,!?;:'"]$/)?.[0] || '';

        // Check if this word is a technical term
        if (isTechnicalTerm(cleanWord)) {
          return (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block"
              style={{ marginRight: '0.6em', letterSpacing: '0.03em' }}
            >
              <DefinitionTermFixed term={cleanWord.toLowerCase()}>
                {cleanWord}
              </DefinitionTermFixed>
              {punctuation}
            </motion.span>
          );
        }

        // Regular word
        return (
          <motion.span
            key={index}
            className="inline-block"
            variants={wordVariants}
            style={{ marginRight: '0.6em', letterSpacing: '0.03em' }}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );

  // Render the appropriate HTML tag
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

export default WordByWordTextFixed;
