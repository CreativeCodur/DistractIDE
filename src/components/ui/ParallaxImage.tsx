import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  opacity?: number;
  blur?: number;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = '',
  speed = 0.2,
  direction = 'up',
  opacity = 1,
  blur = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  // Create smoother scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Calculate transform based on direction
  const getTransform = () => {
    const range = 20 * speed; // Adjust this value to control parallax intensity
    
    switch (direction) {
      case 'up':
        return useTransform(smoothProgress, [0, 1], [`${range}%`, `-${range}%`]);
      case 'down':
        return useTransform(smoothProgress, [0, 1], [`-${range}%`, `${range}%`]);
      case 'left':
        return useTransform(smoothProgress, [0, 1], [`${range}%`, `-${range}%`]);
      case 'right':
        return useTransform(smoothProgress, [0, 1], [`-${range}%`, `${range}%`]);
      default:
        return useTransform(smoothProgress, [0, 1], [`${range}%`, `-${range}%`]);
    }
  };
  
  const transform = getTransform();
  
  return (
    <div
      ref={ref}
      className={`overflow-hidden relative ${className}`}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          [direction === 'up' || direction === 'down' ? 'y' : 'x']: transform,
          filter: `blur(${blur}px)`,
          opacity
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default ParallaxImage;
