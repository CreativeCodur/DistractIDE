import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const EnhancedNeuralAnimation: React.FC = () => {
  const { themeColor } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
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
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions with higher resolution
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Neural network parameters
    const layers = [6, 10, 8, 4]; // Number of neurons in each layer
    const neurons: { x: number, y: number, layer: number }[] = [];
    const connections: { from: number, to: number, weight: number, signal: number, speed: number }[] = [];
    
    // Initialize neurons
    const initializeNeurons = () => {
      neurons.length = 0;
      
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const layerSpacing = width / (layers.length + 1);
      
      layers.forEach((neuronCount, layerIndex) => {
        const neuronSpacing = height / (neuronCount + 1);
        
        for (let i = 0; i < neuronCount; i++) {
          neurons.push({
            x: layerSpacing * (layerIndex + 1),
            y: neuronSpacing * (i + 1),
            layer: layerIndex
          });
        }
      });
    };
    
    // Initialize connections between neurons
    const initializeConnections = () => {
      connections.length = 0;
      
      let neuronIndex = 0;
      for (let layer = 0; layer < layers.length - 1; layer++) {
        const layerNeuronCount = layers[layer];
        const nextLayerNeuronCount = layers[layer + 1];
        const nextLayerStartIndex = neurons.findIndex(n => n.layer === layer + 1);
        
        for (let i = 0; i < layerNeuronCount; i++) {
          const fromIndex = neuronIndex + i;
          
          for (let j = 0; j < nextLayerNeuronCount; j++) {
            const toIndex = nextLayerStartIndex + j;
            
            connections.push({
              from: fromIndex,
              to: toIndex,
              weight: Math.random(),
              signal: 0,
              speed: 0.005 + Math.random() * 0.01
            });
          }
        }
        
        neuronIndex += layerNeuronCount;
      }
    };
    
    initializeNeurons();
    initializeConnections();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      connections.forEach(conn => {
        const from = neurons[conn.from];
        const to = neurons[conn.to];
        
        // Update signal position
        conn.signal += conn.speed;
        if (conn.signal > 1) conn.signal = 0;
        
        // Calculate signal position
        const signalX = from.x + (to.x - from.x) * conn.signal;
        const signalY = from.y + (to.y - from.y) * conn.signal;
        
        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw signal
        ctx.beginPath();
        ctx.arc(signalX, signalY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.6 + conn.weight * 0.4})`;
        ctx.fill();
      });
      
      // Draw neurons
      neurons.forEach((neuron, index) => {
        // Determine if neuron is active (has incoming signals)
        const hasIncomingSignals = connections.some(conn => 
          conn.to === index && conn.signal > 0.4 && conn.signal < 0.6
        );
        
        // Draw neuron
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, hasIncomingSignals ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = hasIncomingSignals 
          ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.9)` 
          : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`;
        ctx.fill();
        
        // Add glow effect for active neurons
        if (hasIncomingSignals) {
          ctx.beginPath();
          ctx.arc(neuron.x, neuron.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
          ctx.fill();
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [themeColor]);
  
  return (
    <motion.div
      className="w-full h-64 md:h-80 my-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full rounded-lg"
      />
    </motion.div>
  );
};

export default EnhancedNeuralAnimation;
