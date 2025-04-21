import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import DefinitionTerm from '../ui/DefinitionTerm';
import AnimatedShapes from '../ui/AnimatedShapes';
import ShadcnIcon from '../ui/ShadcnIcon';
import WordByWordTextFixed from '../ui/WordByWordTextFixed';

const EnhancedNetworkVisual: React.FC = () => {
  const { theme, themeColor } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Layer descriptions with more detail
  const layers = [
    {
      name: 'Input Layer',
      description: 'The gateway for data entering the neural network',
      detailedDescription: 'This layer receives raw information from the outside world. For example, when recognizing handwritten digits, each pixel brightness value from the image becomes one input neuron.',
      iconType: 'arrowRight',
      examples: [
        'Image pixels (28×28 = 784 neurons for MNIST digits)',
        'Audio waveform samples',
        'Text converted to numbers',
        'Sensor readings'
      ]
    },
    {
      name: 'Hidden Layers',
      description: 'The brain of the network where patterns are discovered',
      detailedDescription: 'These middle layers transform the input data through a series of mathematical operations. Each neuron combines inputs, applies an activation function, and passes the result forward. Deeper networks have more hidden layers.',
      iconType: 'brain',
      examples: [
        'Edge detectors in early layers',
        'Shape recognizers in middle layers',
        'Feature combiners in deeper layers',
        'Abstract concept detectors in final layers'
      ]
    },
    {
      name: 'Output Layer',
      description: 'The final layer that provides answers or predictions',
      detailedDescription: 'This layer translates the network\'s internal calculations into meaningful results. The number of output neurons depends on the task - one for regression problems, multiple for classification tasks.',
      iconType: 'arrowLeft',
      examples: [
        'Digit classification (10 neurons for digits 0-9)',
        'Disease probability (0-100%)',
        'Stock price prediction',
        'Next word suggestion'
      ]
    }
  ];

  return (
    <motion.div
      className="my-48 relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Additional animated shapes */}
      <AnimatedShapes type="triangle" position="top-left" size="small" opacity={0.2} />
      <AnimatedShapes type="square" position="bottom-right" size="small" opacity={0.15} delay={0.4} />
      <AnimatedShapes type="dots" position="center" size="large" opacity={0.1} delay={0.7} />
      {/* Main flow arrow */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-theme to-transparent opacity-30 transform -translate-y-1/2" />

      {/* Animated arrow head */}
      <motion.div
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        animate={{
          x: [0, -10, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13 5L21 12L13 19"
            stroke={themeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 md:gap-12 relative z-10">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.name}
            className="flex-1 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-10 shadow-lg h-full"
            variants={itemVariants}
          >
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-theme-light mr-4">
                <ShadcnIcon type={layer.iconType} size="large" />
              </div>
              <h3 className="text-2xl font-medium font-mono">
                <DefinitionTerm term={layer.name.toLowerCase()}>
                  {layer.name}
                </DefinitionTerm>
              </h3>
            </div>

            <WordByWordTextFixed
              text={layer.description}
              className="mb-8 text-xl text-light-600 dark:text-dark-300"
              delay={0.2}
              staggerDelay={0.02}
              tag="p"
            />

            <WordByWordTextFixed
              text={layer.detailedDescription}
              className="mb-8 text-lg"
              delay={0.4}
              staggerDelay={0.01}
              tag="p"
            />

            <div className="mt-auto">
              <h4 className="font-medium text-theme mb-6 text-xl font-mono">Examples:</h4>
              <ul className="space-y-4 text-base">
                {layer.examples.map((example, i) => (
                  <li key={i} className="flex items-start">
                    <div className="inline-flex w-5 h-5 rounded-full bg-theme-light items-center justify-center mr-2 mt-0.5">
                      <ShadcnIcon type={`number${i+1}` as any} size="small" />
                    </div>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EnhancedNetworkVisual;
