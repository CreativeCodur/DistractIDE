import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface ModernNeuralAnimationProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  opacity?: number;
  showLabels?: boolean;
  blurAmount?: number;
}

const ModernNeuralAnimation: React.FC<ModernNeuralAnimationProps> = ({
  className = '',
  density = 'medium',
  speed = 'slow',
  opacity = 0.8,
  showLabels = true,
  blurAmount = 0
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

  // Determine node count based on density
  const getNodeCount = () => {
    switch (density) {
      case 'low': return 20;
      case 'high': return 60;
      default: return 35;
    }
  };

  // Animation speed
  const getAnimationSpeed = () => {
    switch (speed) {
      case 'slow': return 0.3;
      case 'fast': return 1.2;
      default: return 0.7;
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

    const nodeCount = getNodeCount();
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
      layer: number;
    }[] = [];

    // Create connections
    const connections: {
      from: number;
      to: number;
      width: number;
      color: string;
      dashOffset: number;
      dashSpeed: number;
      active: boolean;
      activationTime: number;
      activationDuration: number;
      direction: 'forward' | 'backward';
    }[] = [];

    // Define layers
    const layers = 4; // Input, 2 hidden, output
    const nodesPerLayer = [Math.floor(nodeCount / 6), Math.floor(nodeCount / 3), Math.floor(nodeCount / 3), Math.floor(nodeCount / 6)];

    // Initialize nodes in layers
    let nodeIndex = 0;
    for (let layer = 0; layer < layers; layer++) {
      const layerWidth = canvas.width / 5;
      const layerX = layerWidth + layer * layerWidth;

      for (let i = 0; i < nodesPerLayer[layer]; i++) {
        const layerHeight = canvas.height * 0.8;
        const spacing = layerHeight / (nodesPerLayer[layer] + 1);
        const y = spacing * (i + 1) + canvas.height * 0.1;

        nodes.push({
          x: layerX,
          y: y,
          radius: Math.random() * 2 + 3,
          vx: (Math.random() - 0.5) * animationSpeed * 0.2,
          vy: (Math.random() - 0.5) * animationSpeed * 0.2,
          color: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`,
          connections: [],
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
          layer
        });

        nodeIndex++;
      }
    }

    // Connect nodes between adjacent layers
    for (let layer = 0; layer < layers - 1; layer++) {
      const layerStartIndex = nodes.findIndex(n => n.layer === layer);
      const nextLayerStartIndex = nodes.findIndex(n => n.layer === layer + 1);

      const layerNodes = nodes.filter(n => n.layer === layer);
      const nextLayerNodes = nodes.filter(n => n.layer === layer + 1);

      for (let i = 0; i < layerNodes.length; i++) {
        const fromNodeIndex = layerStartIndex + i;

        for (let j = 0; j < nextLayerNodes.length; j++) {
          const toNodeIndex = nextLayerStartIndex + j;

          // Add connection
          connections.push({
            from: fromNodeIndex,
            to: toNodeIndex,
            width: Math.random() * 1 + 0.5,
            color: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.4})`,
            dashOffset: Math.random() * 1000,
            dashSpeed: (Math.random() * 0.3 + 0.2) * animationSpeed,
            active: false,
            activationTime: 0,
            activationDuration: Math.random() * 1000 + 1000,
            direction: Math.random() > 0.7 ? 'backward' : 'forward'
          });

          // Update node connections
          nodes[fromNodeIndex].connections.push(toNodeIndex);
          nodes[toNodeIndex].connections.push(fromNodeIndex);
        }
      }
    }

    // Randomly activate connections
    const activateRandomConnections = () => {
      if (Math.random() > 0.97) {
        const randomConnection = connections[Math.floor(Math.random() * connections.length)];
        randomConnection.active = true;
        randomConnection.activationTime = Date.now();
      }
    };

    // Draw arrow along connection
    const drawArrow = (fromX: number, fromY: number, toX: number, toY: number, color: string, progress: number, direction: 'forward' | 'backward') => {
      const arrowSize = 6;
      const dx = toX - fromX;
      const dy = toY - fromY;
      const angle = Math.atan2(dy, dx);

      // Calculate position along the line based on progress
      let posX, posY;
      if (direction === 'forward') {
        posX = fromX + dx * progress;
        posY = fromY + dy * progress;
      } else {
        posX = toX - dx * progress;
        posY = toY - dy * progress;
      }

      // Draw arrow head
      ctx.save();
      ctx.translate(posX, posY);
      ctx.rotate(direction === 'forward' ? angle : angle + Math.PI);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-arrowSize, -arrowSize / 2);
      ctx.lineTo(-arrowSize, arrowSize / 2);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    // Draw labels
    const drawLabels = () => {
      if (!showLabels) return;

      const labels = ['Input Layer', 'Hidden Layer 1', 'Hidden Layer 2', 'Output Layer'];

      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;

      for (let i = 0; i < layers; i++) {
        const layerWidth = canvas.width / 5;
        const layerX = layerWidth + i * layerWidth;

        ctx.fillText(labels[i], layerX, canvas.height - 20);
      }

      // Draw explanation
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`;

      const explanations = [
        '← Data flows through the network',
        '← Neurons process information',
        '← Arrows show signal direction'
      ];

      explanations.forEach((text, i) => {
        ctx.fillText(text, 20, 30 + i * 20);
      });
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Activate random connections
      activateRandomConnections();

      // Update and draw connections
      for (const connection of connections) {
        const from = nodes[connection.from];
        const to = nodes[connection.to];

        // Calculate distance
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Draw connection
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);

        if (connection.active) {
          const elapsed = Date.now() - connection.activationTime;
          const progress = elapsed / connection.activationDuration;

          if (progress >= 1) {
            connection.active = false;
          } else {
            // Bright active connection
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.8})`;
            ctx.lineWidth = connection.width * 1.5;

            // Draw arrow along connection
            drawArrow(
              from.x, from.y,
              to.x, to.y,
              `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`,
              progress,
              connection.direction
            );
          }
        } else {
          // Normal connection
          ctx.strokeStyle = connection.color;
          ctx.lineWidth = connection.width;

          // Animated dashed line
          connection.dashOffset += connection.dashSpeed;
          ctx.setLineDash([2, 8]);
          ctx.lineDashOffset = connection.dashOffset;
        }

        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Update and draw nodes
      for (const node of nodes) {
        // Small random movement
        node.x += node.vx;
        node.y += node.vy;

        // Keep within layer bounds
        const layerWidth = canvas.width / 5;
        const layerX = layerWidth + node.layer * layerWidth;
        const maxDistance = 20;

        if (Math.abs(node.x - layerX) > maxDistance) {
          node.vx *= -1;
          node.x = layerX + (maxDistance * Math.sign(node.x - layerX));
        }

        const minY = canvas.height * 0.1;
        const maxY = canvas.height * 0.9;

        if (node.y < minY || node.y > maxY) {
          node.vy *= -1;
          node.y = node.y < minY ? minY : maxY;
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
          node.x, node.y, pulseRadius * 2
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, node.color.replace(/[\d.]+\)$/, '0)'));

        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw labels
      drawLabels();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [themeColor, opacity, density, speed, showLabels]);

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
        style={{ filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none' }}
      />
    </motion.div>
  );
};

export default ModernNeuralAnimation;
