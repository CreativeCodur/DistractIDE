import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  FiBrain, FiCpu, FiEye, FiMessageSquare, FiThumbsUp,
  FiGamepad, FiPenTool, FiActivity, FiSearch, FiRepeat,
  FiArrowRight, FiArrowLeft, FiX, FiCheck, FiRefreshCw
} from 'react-icons/fi';

type IconType =
  | 'brain'
  | 'cpu'
  | 'eye'
  | 'message'
  | 'thumbsUp'
  | 'game'
  | 'art'
  | 'science'
  | 'search'
  | 'repeat'
  | 'arrowRight'
  | 'arrowLeft'
  | 'error'
  | 'success'
  | 'refresh'
  | 'number1'
  | 'number2'
  | 'number3'
  | 'number4'
  | 'number5';

interface ModernIconProps {
  type: IconType;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
}

const ModernIcon: React.FC<ModernIconProps> = ({
  type,
  size = 'medium',
  animated = true,
  className = ''
}) => {
  const { themeColor } = useTheme();

  // Determine size dimensions
  const getSize = () => {
    switch (size) {
      case 'small': return { width: '16px', height: '16px', fontSize: '16px' };
      case 'medium': return { width: '24px', height: '24px', fontSize: '24px' };
      case 'large': return { width: '32px', height: '32px', fontSize: '32px' };
      default: return { width: '24px', height: '24px', fontSize: '24px' };
    }
  };

  // Get the appropriate icon component
  const getIcon = () => {
    switch (type) {
      case 'brain': return <FiBrain />;
      case 'cpu': return <FiCpu />;
      case 'eye': return <FiEye />;
      case 'message': return <FiMessageSquare />;
      case 'thumbsUp': return <FiThumbsUp />;
      case 'game': return <FiGamepad />;
      case 'art': return <FiPenTool />;
      case 'science': return <FiActivity />;
      case 'search': return <FiSearch />;
      case 'repeat': return <FiRepeat />;
      case 'arrowRight': return <FiArrowRight />;
      case 'arrowLeft': return <FiArrowLeft />;
      case 'error': return <FiX />;
      case 'success': return <FiCheck />;
      case 'refresh': return <FiRefreshCw />;
      case 'number1': return <span className="font-mono font-bold">1</span>;
      case 'number2': return <span className="font-mono font-bold">2</span>;
      case 'number3': return <span className="font-mono font-bold">3</span>;
      case 'number4': return <span className="font-mono font-bold">4</span>;
      case 'number5': return <span className="font-mono font-bold">5</span>;
      default: return <FiBrain />;
    }
  };

  // Animation variants
  const iconVariants = {
    static: {},
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Get specific animations based on icon type
  const getSpecificAnimation = () => {
    switch (type) {
      case 'brain':
        return {
          animate: {
            scale: [1, 1.05, 1],
            opacity: [1, 0.8, 1],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case 'refresh':
      case 'repeat':
        return {
          animate: {
            rotate: [0, 360],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }
          }
        };
      case 'arrowRight':
      case 'arrowLeft':
        return {
          animate: {
            x: [0, 5, 0],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case 'search':
        return {
          animate: {
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      default:
        return {
          animate: {
            scale: [1, 1.05, 1],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
    }
  };

  const animationVariant = getSpecificAnimation();

  return (
    <motion.div
      className={`flex items-center justify-center text-theme ${className}`}
      style={{
        ...getSize(),
        color: themeColor
      }}
      variants={iconVariants}
      animate={animated ? animationVariant.animate : 'static'}
    >
      {getIcon()}
    </motion.div>
  );
};

export default ModernIcon;
