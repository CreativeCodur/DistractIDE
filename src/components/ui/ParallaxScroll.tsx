import React, { useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxScrollProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  speed?: number;
  className?: string;
}

const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  direction = 'up',
  speed = 0.3,
  className = ''
}) => {
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  // Calculate the range of the parallax effect
  useEffect(() => {
    if (!ref) return;

    const setValues = () => {
      setElementTop(ref.offsetTop);
      setClientHeight(window.innerHeight);
    };

    setValues();
    document.addEventListener('resize', setValues);
    document.addEventListener('scroll', setValues);

    return () => {
      document.removeEventListener('resize', setValues);
      document.removeEventListener('scroll', setValues);
    };
  }, [ref]);

  const getTransformValue = () => {
    switch (direction) {
      case 'up':
        return [clientHeight * 0.1, -clientHeight * speed];
      case 'down':
        return [-clientHeight * 0.1, clientHeight * speed];
      case 'left':
        return [clientHeight * 0.1, -clientHeight * speed, 0];
      case 'right':
        return [-clientHeight * 0.1, clientHeight * speed, 0];
      default:
        return [clientHeight * 0.1, -clientHeight * speed];
    }
  };

  const getPropertyName = () => {
    return direction === 'left' || direction === 'right' ? 'translateX' : 'translateY';
  };

  const transformValue = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    getTransformValue()
  );

  return (
    <motion.div
      ref={setRef}
      style={{
        [getPropertyName()]: transformValue,
        willChange: 'transform',
        position: 'relative' // Add position relative to fix Framer Motion warning
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxScroll;
