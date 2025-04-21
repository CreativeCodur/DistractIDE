import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface FloatingNodesAnimationProps {
  className?: string;
  nodeCount?: number;
  connectionCount?: number;
  speed?: 'slow' | 'medium' | 'fast';
  opacity?: number;
}

const FloatingNodesAnimation: React.FC<FloatingNodesAnimationProps> = ({
  className = '',
  nodeCount = 20,
  connectionCount = 30,
  speed = 'medium',
  opacity = 0.7
}) => {
  const { themeColor } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
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
  
  // Animation speed
  const getAnimationSpeed = () => {
    switch (speed) {
      case 'slow': return 0.5;
      case 'fast': return 2;
      default: return 1;
    }
  };
  
  useEffect(() => {
    controls.start({ opacity: 1, scale: 1 });
  }, [controls]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animationSpeed = getAnimationSpeed();
    
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
      radius: number;
      vx: number;
      vy: number;
      color: string;
      connections: number[];
      pulseSpeed: number;
      pulsePhase: number;
    }[] = [];
    
    // Create connections
    const connections: {
      from: number;
      to: number;
      width: number;
      color: string;
      dashOffset: number;
      dashSpeed: number;
    }[] = [];
    
    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 2,
        vx: (Math.random() - 0.5) * animationSpeed,
        vy: (Math.random() - 0.5) * animationSpeed,
        color: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`,
        connections: [],
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
    
    // Initialize connections
    for (let i = 0; i < connectionCount; i++) {
      const from = Math.floor(Math.random() * nodeCount);
      let to = Math.floor(Math.random() * nodeCount);
      
      // Avoid self-connections
      while (to === from) {
        to = Math.floor(Math.random() * nodeCount);
      }
      
      // Add connection
      connections.push({
        from,
        to,
        width: Math.random() * 1.5 + 0.5,
        color: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.5})`,
        dashOffset: Math.random() * 1000,
        dashSpeed: (Math.random() * 0.5 + 0.5) * animationSpeed
      });
      
      // Update node connections
      nodes[from].connections.push(to);
      nodes[to].connections.push(from);
    }
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw connections
      for (const connection of connections) {
        const from = nodes[connection.from];
        const to = nodes[connection.to];
        
        // Calculate distance
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only draw connections within a certain distance
        if (distance < 300) {
          // Calculate opacity based on distance
          const opacity = 1 - distance / 300;
          
          // Draw connection
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.strokeStyle = connection.color.replace(/[\d.]+\)$/, `${opacity * 0.5})`);
          ctx.lineWidth = connection.width * opacity;
          
          // Animated dashed line
          connection.dashOffset += connection.dashSpeed;
          ctx.setLineDash([4, 4]);
          ctx.lineDashOffset = connection.dashOffset;
          
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
      
      // Update and draw nodes
      for (const node of nodes) {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < node.radius || node.x > canvas.width - node.radius) {
          node.vx *= -1;
          node.x = Math.max(node.radius, Math.min(canvas.width - node.radius, node.x));
        }
        
        if (node.y < node.radius || node.y > canvas.height - node.radius) {
          node.vy *= -1;
          node.y = Math.max(node.radius, Math.min(canvas.height - node.radius, node.y));
        }
        
        // Pulsing effect
        node.pulsePhase += node.pulseSpeed;
        const pulseFactor = 0.5 + 0.5 * Math.sin(node.pulsePhase);
        const pulseRadius = node.radius * (1 + 0.3 * pulseFactor);
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Draw glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, pulseRadius,
          node.x, node.y, pulseRadius * 3
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, node.color.replace(/[\d.]+\)$/, '0)'));
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [themeColor, opacity, nodeCount, connectionCount, speed]);
  
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

export default FloatingNodesAnimation;
