import React from 'react';
import { motion } from 'framer-motion';
import DefinitionTermFixed, { termDefinitions } from './DefinitionTermFixed';

interface WordByWordTextEnhancedProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
}

const WordByWordTextEnhanced: React.FC<WordByWordTextEnhancedProps> = ({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  once = true,
  tag = 'p'
}) => {
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

  // Process text to handle technical terms
  const processText = () => {
    // Replace span tags with actual term highlighting
    const processedText = text
      .replace(/<span class='text-theme underline cursor-pointer'>([^<]+)<\/span>/g, (match, term) => {
        return `__TERM_START__${term}__TERM_END__`;
      });
    
    // Split the text into words
    const words = processedText.split(' ');
    
    return words.map((word, index) => {
      // Check if this word contains a term marker
      if (word.includes('__TERM_START__')) {
        // Extract the term
        const termMatch = word.match(/__TERM_START__([^_]+)__TERM_END__/);
        if (termMatch) {
          const term = termMatch[1];
          const cleanWord = term.replace(/[.,!?;:'"]$/g, '');
          const punctuation = term.match(/[.,!?;:'"]$/)?.[0] || '';
          
          // Replace the term marker with the actual term component
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
      }
      
      // Check if this word is a technical term
      const cleanWord = word.replace(/[.,!?;:'"]$/g, '').toLowerCase();
      if (Object.keys(termDefinitions).includes(cleanWord)) {
        const punctuation = word.match(/[.,!?;:'"]$/)?.[0] || '';
        
        return (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block"
            style={{ marginRight: '0.6em', letterSpacing: '0.03em' }}
          >
            <DefinitionTermFixed term={cleanWord}>
              {word.replace(/[.,!?;:'"]$/g, '')}
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
    });
  };

  // Create the content with motion spans
  const content = (
    <motion.span
      className="inline"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {processText()}
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

export default WordByWordTextEnhanced;
