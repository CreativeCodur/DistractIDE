import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const NeuralNetworkAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, themeColor } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = 200; // Fixed height
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Parse theme color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 14, g: 165, b: 233 }; // Default sky blue
    };
    
    const rgb = hexToRgb(themeColor);
    
    // Define network structure
    const layers = [4, 6, 6, 2]; // Input, hidden1, hidden2, output
    const neurons: { x: number, y: number, layer: number }[] = [];
    
    // Create neurons
    const margin = 40;
    const width = canvas.width - 2 * margin;
    const height = canvas.height - 2 * margin;
    
    layers.forEach((count, layerIndex) => {
      const x = margin + (width / (layers.length - 1)) * layerIndex;
      
      for (let i = 0; i < count; i++) {
        const y = margin + (height / (count - 1)) * i;
        neurons.push({ x, y, layer: layerIndex });
      }
    });
    
    // Animation variables
    let animationFrame: number;
    let signals: { startX: number, startY: number, endX: number, endY: number, progress: number, speed: number }[] = [];
    
    // Create new signals periodically
    const createSignals = () => {
      // Connect each neuron to all neurons in the next layer
      neurons.forEach(neuron => {
        if (neuron.layer < layers.length - 1) {
          const nextLayerNeurons = neurons.filter(n => n.layer === neuron.layer + 1);
          
          // Randomly create signals (not all at once)
          if (Math.random() < 0.01) {
            const targetNeuron = nextLayerNeurons[Math.floor(Math.random() * nextLayerNeurons.length)];
            signals.push({
              startX: neuron.x,
              startY: neuron.y,
              endX: targetNeuron.x,
              endY: targetNeuron.y,
              progress: 0,
              speed: 0.005 + Math.random() * 0.01
            });
          }
        }
      });
    };
    
    // Draw function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      neurons.forEach(neuron => {
        if (neuron.layer < layers.length - 1) {
          const nextLayerNeurons = neurons.filter(n => n.layer === neuron.layer + 1);
          
          nextLayerNeurons.forEach(nextNeuron => {
            ctx.beginPath();
            ctx.moveTo(neuron.x, neuron.y);
            ctx.lineTo(nextNeuron.x, nextNeuron.y);
            ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
          });
        }
      });
      
      // Draw and update signals
      signals = signals.filter(signal => signal.progress <= 1);
      
      signals.forEach(signal => {
        const x = signal.startX + (signal.endX - signal.startX) * signal.progress;
        const y = signal.startY + (signal.endY - signal.startY) * signal.progress;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.7 + Math.sin(signal.progress * Math.PI) * 0.3})`;
        ctx.fill();
        
        // Update progress
        signal.progress += signal.speed;
      });
      
      // Draw neurons
      neurons.forEach(neuron => {
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, 6, 0, Math.PI * 2);
        
        // Different colors for different layers
        if (neuron.layer === 0) {
          // Input layer
          ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
        } else if (neuron.layer === layers.length - 1) {
          // Output layer
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.9)`;
        } else {
          // Hidden layers
          ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
        }
        
        ctx.fill();
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Create new signals
      createSignals();
      
      // Continue animation
      animationFrame = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [theme, themeColor]);
  
  return (
    <motion.div 
      className="w-full h-[200px] mt-4 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        aria-label="Neural network animation showing data flowing through network layers"
      />
    </motion.div>
  );
};

export default NeuralNetworkAnimation;
