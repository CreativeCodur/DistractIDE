import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import DefinitionTerm from '../ui/DefinitionTerm';

const NetworkLayersVisual: React.FC = () => {
  const { theme, themeColor } = useTheme();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Layer descriptions
  const layers = [
    {
      name: 'Input Layer',
      description: 'Takes in raw data like numbers, images, or text',
      icon: '📥',
      example: 'For a photo, this would be the pixel values'
    },
    {
      name: 'Hidden Layers',
      description: 'Find patterns in the data through many calculations',
      icon: '🧠',
      example: 'These might detect edges, shapes, or features'
    },
    {
      name: 'Output Layer',
      description: 'Provides the final answer or prediction',
      icon: '📤',
      example: 'For a photo, this might say "cat" with 95% confidence'
    }
  ];
  
  return (
    <motion.div
      className="mt-6 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative">
        {/* Connection lines */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-theme to-transparent opacity-30" />
        
        <div className="flex justify-between items-center relative z-10">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.name}
              className="w-[30%] text-center"
              variants={itemVariants}
            >
              <div 
                className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center text-2xl
                  ${index === 0 ? 'bg-blue-100 dark:bg-blue-900' : 
                    index === 1 ? 'bg-purple-100 dark:bg-purple-900' : 
                    'bg-green-100 dark:bg-green-900'}`}
              >
                {layer.icon}
              </div>
              
              <h3 className="mt-3 mb-2 font-medium">
                <DefinitionTerm term={layer.name.toLowerCase()}>
                  {layer.name}
                </DefinitionTerm>
              </h3>
              
              <p className="text-sm opacity-80">{layer.description}</p>
              
              <div className="mt-2 text-xs p-2 rounded-md bg-theme-light text-theme">
                <strong>Example:</strong> {layer.example}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Training process visualization */}
      <motion.div 
        className="mt-10 p-4 rounded-lg border border-theme-light"
        variants={itemVariants}
      >
        <h3 className="text-center font-medium mb-3">
          <DefinitionTerm term="training">
            Training Process
          </DefinitionTerm>
        </h3>
        
        <div className="flex flex-wrap justify-between items-center text-center">
          <div className="w-full md:w-[30%] p-2">
            <div className="text-xl mb-2">1️⃣</div>
            <p className="text-sm">Network makes a prediction</p>
          </div>
          
          <div className="hidden md:block w-[5%] text-xl">→</div>
          
          <div className="w-full md:w-[30%] p-2">
            <div className="text-xl mb-2">2️⃣</div>
            <p className="text-sm">Compare prediction with correct answer</p>
          </div>
          
          <div className="hidden md:block w-[5%] text-xl">→</div>
          
          <div className="w-full md:w-[30%] p-2">
            <div className="text-xl mb-2">3️⃣</div>
            <p className="text-sm">Adjust <DefinitionTerm term="weights">weights</DefinitionTerm> to improve accuracy</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NetworkLayersVisual;
