import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface NeuralLayersAnimationProps {
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  showLabels?: boolean;
  showExplanations?: boolean;
}

const NeuralLayersAnimation: React.FC<NeuralLayersAnimationProps> = ({
  className = '',
  autoPlay = true,
  loop = true,
  showLabels = true,
  showExplanations = true
}) => {
  const { themeColor } = useTheme();
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredNeuron, setHoveredNeuron] = useState<string | null>(null);

  // Animation controls
  const inputControls = useAnimation();
  const hiddenControls = useAnimation();
  const outputControls = useAnimation();
  const dataControls = useAnimation();
  const connectionControls = useAnimation();

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

  // Layer definitions
  const layers = [
    {
      name: 'Input Layer',
      neurons: 4,
      description: 'Receives raw data like pixel values or sensor readings',
      control: inputControls
    },
    {
      name: 'Hidden Layer 1',
      neurons: 6,
      description: 'Detects simple patterns like edges or basic shapes',
      control: hiddenControls
    },
    {
      name: 'Hidden Layer 2',
      neurons: 5,
      description: 'Combines simple patterns into more complex features',
      control: hiddenControls
    },
    {
      name: 'Output Layer',
      neurons: 3,
      description: 'Makes final predictions or classifications',
      control: outputControls
    }
  ];

  // Animation steps - slowed down with more pauses
  const steps = [
    // Step 0: Initialize network
    async () => {
      await Promise.all([
        inputControls.start({ opacity: 1, scale: 1, transition: { duration: 0.8 } }),
        hiddenControls.start({ opacity: 0.5, scale: 0.9, transition: { duration: 0.8 } }),
        outputControls.start({ opacity: 0.5, scale: 0.9, transition: { duration: 0.8 } }),
        connectionControls.start({ opacity: 0.3, pathLength: 0, transition: { duration: 0.8 } })
      ]);
      await new Promise(resolve => setTimeout(resolve, 1200));
    },
    // Step 1: Data enters input layer
    async () => {
      await dataControls.start({
        x: ['-100%', '0%'],
        opacity: [0, 1],
        transition: { duration: 1.2 }
      });
      await inputControls.start({
        scale: [1, 1.2, 1],
        filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
        transition: { duration: 1.5 }
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    // Step 2: Data flows to first hidden layer
    async () => {
      await connectionControls.start({
        opacity: 0.7,
        pathLength: 1,
        pathOffset: [1, 0],
        transition: { duration: 1.5, ease: "easeInOut" }
      });
      await hiddenControls.start({
        opacity: 1,
        scale: 1.1,
        filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
        transition: { duration: 1.5, delay: 0.5 }
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    // Step 3: Data flows to output layer
    async () => {
      await outputControls.start({
        opacity: 1,
        scale: 1.1,
        filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
        transition: { duration: 1.5 }
      });
      await new Promise(resolve => setTimeout(resolve, 1200));
    },
    // Step 4: Output is produced
    async () => {
      await outputControls.start({
        scale: [1.1, 1.3, 1.1],
        filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
        transition: { duration: 1.8 }
      });
      await new Promise(resolve => setTimeout(resolve, 1200));
    },
    // Step 5: Reset for next iteration
    async () => {
      await Promise.all([
        dataControls.start({ x: '-100%', opacity: 0, transition: { duration: 0.8 } }),
        inputControls.start({ scale: 1, filter: 'brightness(1)', transition: { duration: 0.8 } }),
        hiddenControls.start({ scale: 0.9, opacity: 0.5, filter: 'brightness(1)', transition: { duration: 0.8 } }),
        outputControls.start({ scale: 0.9, opacity: 0.5, filter: 'brightness(1)', transition: { duration: 0.8 } }),
        connectionControls.start({ opacity: 0.3, pathLength: 0, transition: { duration: 0.8 } })
      ]);
      await new Promise(resolve => setTimeout(resolve, 1000));
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
    "Network Initialized",
    "Data Enters Input Layer",
    "Hidden Layers Process Data",
    "Output Layer Activated",
    "Prediction Generated",
    "Ready for Next Input"
  ];

  // Explanations for each step - more detailed
  const stepExplanations = [
    "The neural network is ready to process data. Each circle represents a neuron. Neurons are connected between layers to pass information forward.",
    "Raw data (like pixel values from an image) enters the input layer neurons. These neurons activate based on the input values they receive.",
    "Hidden layers extract features from the data. The connections (lines) show how information flows between neurons. Each connection has a weight that strengthens or weakens the signal.",
    "Deeper hidden layers combine simple patterns into complex features. As signals travel through the network, each layer transforms the data in more abstract ways.",
    "The output layer produces the final prediction or classification. The brightness of neurons shows their activation level - brighter neurons have stronger signals.",
    "The network is ready to process the next input. This cycle repeats thousands of times during training, with weights adjusting to improve accuracy."
  ];

  // Calculate neuron positions
  const getNeuronPositions = () => {
    const positions: { x: number, y: number, layer: number, index: number }[] = [];
    const layerSpacing = 100 / (layers.length + 1);

    layers.forEach((layer, layerIndex) => {
      const x = (layerIndex + 1) * layerSpacing;
      const neuronSpacing = 100 / (layer.neurons + 1);

      for (let i = 0; i < layer.neurons; i++) {
        const y = (i + 1) * neuronSpacing;
        positions.push({ x, y, layer: layerIndex, index: i });
      }
    });

    return positions;
  };

  const neuronPositions = getNeuronPositions();

  // Generate connections between layers
  const getConnections = () => {
    const connections: { from: { x: number, y: number }, to: { x: number, y: number } }[] = [];

    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const fromLayer = neuronPositions.filter(p => p.layer === layerIndex);
      const toLayer = neuronPositions.filter(p => p.layer === layerIndex + 1);

      fromLayer.forEach(from => {
        toLayer.forEach(to => {
          connections.push({
            from: { x: from.x, y: from.y },
            to: { x: to.x, y: to.y }
          });
        });
      });
    }

    return connections;
  };

  const connections = getConnections();

  return (
    <div className={`relative w-full h-96 ${className}`}>
      {/* SVG for connections and neurons */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {/* Connections between neurons */}
        <motion.g animate={connectionControls} initial={{ opacity: 0.3, pathLength: 0 }}>
          {connections.map((conn, index) => (
            <motion.path
              key={`conn-${index}`}
              d={`M ${conn.from.x} ${conn.from.y} L ${conn.to.x} ${conn.to.y}`}
              stroke={themeRgb}
              strokeWidth="0.3"
              fill="none"
              initial={{ pathLength: 0 }}
            />
          ))}
        </motion.g>

        {/* Neurons */}
        {neuronPositions.map((pos, index) => {
          const layer = layers[pos.layer];
          return (
            <motion.g
              key={`neuron-${index}`}
              animate={layer.control}
              initial={{ opacity: pos.layer === 0 ? 1 : 0.5, scale: pos.layer === 0 ? 1 : 0.9 }}
              onMouseEnter={() => setHoveredNeuron(`${layer.name}-${pos.index}`)}
              onMouseLeave={() => setHoveredNeuron(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r="2"
                fill={themeRgb}
              />
              {hoveredNeuron === `${layer.name}-${pos.index}` && (
                <g>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="3"
                    fill="transparent"
                    stroke={themeRgb}
                    strokeWidth="0.3"
                    strokeDasharray="0.5,0.5"
                  />
                  <rect
                    x={pos.x - 10}
                    y={pos.y + 3}
                    width="20"
                    height="6"
                    rx="1"
                    fill="rgba(0,0,0,0.7)"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 7}
                    textAnchor="middle"
                    fill="white"
                    fontSize="2"
                  >
                    Neuron {pos.index + 1}
                  </text>
                </g>
              )}
            </motion.g>
          );
        })}

        {/* Data flow animation */}
        <motion.circle
          cx="0"
          cy="50"
          r="2"
          fill={themeRgb}
          animate={dataControls}
          initial={{ x: '-100%', opacity: 0 }}
        />
      </svg>

      {/* Layer labels */}
      {showLabels && (
        <div className="absolute inset-x-0 top-0 h-8 flex justify-between px-8">
          {layers.map((layer, index) => (
            <div
              key={`label-${index}`}
              className="text-center"
              style={{ width: `${100 / layers.length}%` }}
            >
              <motion.div
                className="text-sm font-mono bg-theme-light/20 backdrop-blur-sm px-2 py-1 rounded-md inline-block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {layer.name}
              </motion.div>
            </div>
          ))}
        </div>
      )}

      {/* Arrows and labels for clarity */}
      {showExplanations && (
        <>
          <motion.div
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentStep === 1 ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-theme-light/30 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M5 12l6-6M5 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="ml-2 text-sm font-mono">Input</div>
            </div>
          </motion.div>

          <motion.div
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentStep === 4 ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <div className="text-sm font-mono mr-2">Output</div>
              <div className="w-8 h-8 rounded-full bg-theme-light/30 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M19 12l-6 6M19 12l-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Current step indicator */}
      <div className="absolute bottom-0 left-0 right-0">
        {showExplanations && (
          <motion.div
            className="bg-theme-light/10 backdrop-blur-sm p-6 rounded-lg mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="font-mono text-xl mb-3">{stepLabels[currentStep]}</h4>
            <p className="text-base">{stepExplanations[currentStep]}</p>
          </motion.div>
        )}

        {/* Play/pause button */}
        <button
          className="absolute bottom-4 right-4 p-2 rounded-full bg-theme-light/20 hover:bg-theme-light/30 transition-colors"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
              <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5.14v14.72L19 12 8 5.14z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default NeuralLayersAnimation;
