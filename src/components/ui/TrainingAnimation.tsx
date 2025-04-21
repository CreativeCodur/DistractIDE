import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface TrainingAnimationProps {
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

const TrainingAnimation: React.FC<TrainingAnimationProps> = ({
  className = '',
  autoPlay = true,
  loop = true
}) => {
  const { themeColor } = useTheme();
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const networkControls = useAnimation();
  const dataControls = useAnimation();
  const weightControls = useAnimation();
  const outputControls = useAnimation();

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
  const themeRgb = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  // Animation steps - slowed down with more pauses
  const steps = [
    // Step 0: Initial state
    async () => {
      await networkControls.start({ opacity: 1, scale: 1, transition: { duration: 0.8 } });
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    // Step 1: Data flows in
    async () => {
      await dataControls.start({
        x: ['-100%', '0%'],
        opacity: [0, 1],
        transition: { duration: 1.5 }
      });
      await new Promise(resolve => setTimeout(resolve, 800));
    },
    // Step 2: Network processes data
    async () => {
      await networkControls.start({
        scale: [1, 1.05, 1],
        filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
        transition: { duration: 2 }
      });
      await new Promise(resolve => setTimeout(resolve, 800));
    },
    // Step 3: Output is produced
    async () => {
      await outputControls.start({
        x: ['0%', '100%'],
        opacity: [0, 1],
        transition: { duration: 1.5 }
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    // Step 4: Error is calculated and weights are updated
    async () => {
      await weightControls.start({
        rotate: [0, 180],
        scale: [1, 1.2, 1],
        transition: { duration: 2 }
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    // Step 5: Reset for next iteration
    async () => {
      await Promise.all([
        dataControls.start({ x: '-100%', opacity: 0, transition: { duration: 0.8 } }),
        outputControls.start({ x: '100%', opacity: 0, transition: { duration: 0.8 } })
      ]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  ];

  // Run the animation sequence
  useEffect(() => {
    let isMounted = true;

    const runAnimation = async () => {
      if (!isPlaying) return;

      for (let i = 0; i < steps.length; i++) {
        if (!isMounted) return;
        setCurrentStep(i);
        await steps[i]();
      }

      if (loop && isMounted) {
        runAnimation();
      } else {
        setIsPlaying(false);
        setCurrentStep(0);
      }
    };

    if (isPlaying) {
      runAnimation();
    }

    return () => {
      isMounted = false;
    };
  }, [isPlaying, loop]);

  // Labels for each step
  const stepLabels = [
    "Initialize Network",
    "Feed Training Data",
    "Process in Network",
    "Generate Prediction",
    "Update Weights",
    "Repeat with New Data"
  ];

  // Detailed explanations for each step
  const stepExplanations = [
    "The neural network is ready to process data. Each layer contains neurons that will transform the input data.",
    "Training data (like images or text) enters the network through the input layer. This data contains features the network will learn from.",
    "The data flows through the network's layers. Each neuron applies weights to its inputs and passes the result forward.",
    "The output layer produces a prediction based on the current weights. This could be a classification or a numerical value.",
    "The network compares its prediction with the correct answer. The difference (error) is used to adjust weights through backpropagation.",
    "The process repeats with new training examples. Over time, the network's weights are optimized to minimize errors."
  ];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-64 md:h-80 ${className}`}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>

      {/* Neural network visualization */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={networkControls}
      >
        {/* Input layer */}
        <div className="flex flex-col items-center justify-center gap-2 mr-4">
          {[1, 2, 3, 4].map((_, i) => (
            <motion.div
              key={`input-${i}`}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: themeRgb }}
              animate={{
                scale: [1, 1.2, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.2
                }
              }}
            />
          ))}
        </div>

        {/* Hidden layers */}
        {[1, 2].map((layer, layerIndex) => (
          <div key={`layer-${layer}`} className="flex flex-col items-center justify-center gap-2 mx-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <motion.div
                key={`hidden-${layerIndex}-${i}`}
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: themeRgb }}
                animate={{
                  scale: [1, 1.15, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.15 + layerIndex * 0.3
                  }
                }}
              />
            ))}
          </div>
        ))}

        {/* Output layer */}
        <div className="flex flex-col items-center justify-center gap-2 ml-4">
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={`output-${i}`}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: themeRgb }}
              animate={{
                scale: [1, 1.2, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.25 + 0.6
                }
              }}
            />
          ))}
        </div>

        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill={themeRgb} />
            </marker>
          </defs>

          {/* Weight adjustment animation */}
          <motion.g
            animate={weightControls}
            style={{ transformOrigin: 'center' }}
          >
            <circle
              cx="50%"
              cy="50%"
              r="30"
              fill="transparent"
              stroke={themeRgb}
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </motion.g>
        </svg>
      </motion.div>

      {/* Data input animation */}
      <motion.div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-theme-light/30 h-8 w-16 rounded-r-full"
        initial={{ x: '-100%', opacity: 0 }}
        animate={dataControls}
        style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)` }}
      >
        <div className="flex items-center justify-center h-full">
          <span className="text-xs font-mono">Data</span>
        </div>
      </motion.div>

      {/* Output animation */}
      <motion.div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-theme-light/30 h-8 w-16 rounded-l-full"
        initial={{ x: '100%', opacity: 0 }}
        animate={outputControls}
        style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)` }}
      >
        <div className="flex items-center justify-center h-full">
          <span className="text-xs font-mono">Output</span>
        </div>
      </motion.div>

      {/* Explanatory arrows */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex flex-col items-start space-y-4">
        <div className={`flex items-center transition-opacity duration-300 ${currentStep === 1 ? 'opacity-100' : 'opacity-40'}`}>
          <div className="w-8 h-8 rounded-full bg-theme-light/30 flex items-center justify-center mr-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M5 12l6-6M5 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm font-mono">Input Data</span>
        </div>

        <div className={`flex items-center transition-opacity duration-300 ${currentStep === 4 ? 'opacity-100' : 'opacity-40'}`}>
          <div className="w-8 h-8 rounded-full bg-theme-light/30 flex items-center justify-center mr-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2v20M12 2l-6 6M12 2l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm font-mono">Update Weights</span>
        </div>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <div className={`flex items-center transition-opacity duration-300 ${currentStep === 3 ? 'opacity-100' : 'opacity-40'}`}>
          <span className="text-sm font-mono mr-2">Output</span>
          <div className="w-8 h-8 rounded-full bg-theme-light/30 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M19 12l-6 6M19 12l-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Current step indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg max-w-md">
          <div className="text-base font-mono font-medium mb-2">{stepLabels[currentStep]}</div>
          <p className="text-sm">{stepExplanations[currentStep]}</p>
        </div>
      </div>

      {/* Play/pause button */}
      <button
        className="absolute top-2 right-2 p-2 rounded-full bg-theme-light/20 hover:bg-theme-light/30 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setIsPlaying(!isPlaying);
        }}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
            <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4.75C6 4.33579 6.33579 4 6.75 4H7.25C7.66421 4 8 4.33579 8 4.75V19.25C8 19.6642 7.66421 20 7.25 20H6.75C6.33579 20 6 19.6642 6 19.25V4.75Z" fill="currentColor" />
            <path d="M16 4.75C16 4.33579 16.3358 4 16.75 4H17.25C17.6642 4 18 4.33579 18 4.75V19.25C18 19.6642 17.6642 20 17.25 20H16.75C16.3358 20 16 19.6642 16 19.25V4.75Z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default TrainingAnimation;
