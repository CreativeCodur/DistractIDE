import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface NeuralNetworkAnimationProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  size?: 'small' | 'medium' | 'large';
  opacity?: number;
}

const NeuralNetworkAnimation: React.FC<NeuralNetworkAnimationProps> = ({
  className = '',
  density = 'medium',
  speed = 'medium',
  size = 'medium',
  opacity = 0.7
}) => {
  const { themeColor, isDarkMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const isInView = useInView(containerRef, { once: false, margin: "-10%" });
  const controls = useAnimation();
  
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
  
  // Animation parameters based on props
  const getNodeCount = () => {
    switch (density) {
      case 'low': return 30;
      case 'high': return 100;
      default: return 60;
    }
  };
  
  const getAnimationSpeed = () => {
    switch (speed) {
      case 'slow': return 0.5;
      case 'fast': return 2;
      default: return 1;
    }
  };
  
  const getNodeSize = () => {
    switch (size) {
      case 'small': return { min: 2, max: 4 };
      case 'large': return { min: 4, max: 8 };
      default: return { min: 3, max: 6 };
    }
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, scale: 1 });
    } else {
      controls.start({ opacity: 0.3, scale: 0.95 });
    }
  }, [isInView, controls]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const nodeCount = getNodeCount();
    const animationSpeed = getAnimationSpeed();
    const nodeSize = getNodeSize();
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      if (canvas && containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create nodes
    const nodes: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      connections: number[];
      pulses: { target: number; progress: number; active: boolean }[];
      active: boolean;
    }[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (nodeSize.max - nodeSize.min) + nodeSize.min,
        speedX: (Math.random() - 0.5) * 0.5 * animationSpeed,
        speedY: (Math.random() - 0.5) * 0.5 * animationSpeed,
        connections: [],
        pulses: [],
        active: Math.random() > 0.7
      });
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
      const connectionCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < connectionCount; j++) {
        const target = Math.floor(Math.random() * nodes.length);
        if (target !== i && !nodes[i].connections.includes(target)) {
          nodes[i].connections.push(target);
          
          // Create initial pulses
          if (Math.random() > 0.7) {
            nodes[i].pulses.push({
              target,
              progress: Math.random(),
              active: true
            });
          }
        }
      }
    }
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        for (const targetIndex of node.connections) {
          const target = nodes[targetIndex];
          const distance = Math.sqrt(
            Math.pow(target.x - node.x, 2) + Math.pow(target.y - node.y, 2)
          );
          
          // Only draw connections within a certain distance
          if (distance < 150) {
            const alpha = 1 - distance / 150;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.2 * opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Draw pulses
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        for (let j = 0; j < node.pulses.length; j++) {
          const pulse = node.pulses[j];
          if (!pulse.active) continue;
          
          const target = nodes[pulse.target];
          const startX = node.x;
          const startY = node.y;
          const endX = target.x;
          const endY = target.y;
          
          // Calculate pulse position
          const pulseX = startX + (endX - startX) * pulse.progress;
          const pulseY = startY + (endY - startY) * pulse.progress;
          
          // Draw pulse
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
          ctx.fill();
          
          // Update pulse progress
          pulse.progress += 0.01 * animationSpeed;
          
          // Reset pulse when it reaches the target
          if (pulse.progress >= 1) {
            pulse.progress = 0;
            
            // Randomly deactivate pulse
            if (Math.random() > 0.7) {
              pulse.active = false;
            }
            
            // Activate target node
            target.active = true;
            
            // Create new pulse from target
            if (Math.random() > 0.5 && target.connections.length > 0) {
              const newTarget = target.connections[Math.floor(Math.random() * target.connections.length)];
              target.pulses.push({
                target: newTarget,
                progress: 0,
                active: true
              });
            }
          }
        }
      }
      
      // Randomly activate inactive pulses
      if (Math.random() > 0.99) {
        for (const node of nodes) {
          for (const pulse of node.pulses) {
            if (!pulse.active && Math.random() > 0.8) {
              pulse.active = true;
              pulse.progress = 0;
            }
          }
        }
      }
      
      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Update node position
        node.x += node.speedX;
        node.y += node.speedY;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.speedX *= -1;
        if (node.y < 0 || node.y > canvas.height) node.speedY *= -1;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        
        // Active nodes are brighter
        const nodeOpacity = node.active ? opacity : opacity * 0.5;
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${nodeOpacity})`;
        ctx.fill();
        
        // Add glow effect for active nodes
        if (node.active) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            node.x, node.y, node.size,
            node.x, node.y, node.size * 2
          );
          gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.5})`);
          gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Randomly deactivate nodes
          if (Math.random() > 0.99) {
            node.active = false;
          }
        } else {
          // Randomly activate nodes
          if (Math.random() > 0.995) {
            node.active = true;
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [themeColor, isDarkMode, opacity]);
  
  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={controls}
      transition={{ duration: 0.8 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </motion.div>
  );
};

export default NeuralNetworkAnimation;
