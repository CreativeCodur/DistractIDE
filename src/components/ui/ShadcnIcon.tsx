import React from 'react';
import { FiCpu, FiCode, FiLayers, FiInfo, FiArrowRight, FiArrowLeft, FiX, FiRefreshCw, FiRepeat, FiEye, FiMessageSquare, FiThumbsUp, FiActivity } from 'react-icons/fi';

type IconType =
  | 'arrowRight'
  | 'arrowLeft'
  | 'error'
  | 'refresh'
  | 'repeat'
  | 'eye'
  | 'message'
  | 'thumbsUp'
  | 'science'
  | 'brain'
  | 'game'
  | 'art'
  | 'number1'
  | 'number2'
  | 'number3'
  | 'number4'
  | 'number5'
  | 'healthcare'
  | 'finance'
  | 'autonomous'
  | string;

interface ShadcnIconProps {
  type: IconType;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const ShadcnIcon: React.FC<ShadcnIconProps> = ({
  type,
  size = 'medium',
  className = ''
}) => {
  // Determine size dimensions
  const getSize = () => {
    switch (size) {
      case 'small': return 'text-sm';
      case 'medium': return 'text-base';
      case 'large': return 'text-xl';
      default: return 'text-base';
    }
  };

  // Get the appropriate icon component
  const getIcon = () => {
    switch (type) {
      case 'brain': return <FiCpu />;
      case 'eye': return <FiEye />;
      case 'message': return <FiMessageSquare />;
      case 'thumbsUp': return <FiThumbsUp />;
      case 'game': return <FiActivity />;
      case 'art': return <FiLayers />;
      case 'science': return <FiActivity />;
      case 'healthcare': return <FiActivity />;
      case 'finance': return <FiActivity />;
      case 'autonomous': return <FiActivity />;
      case 'arrowRight': return <FiArrowRight />;
      case 'arrowLeft': return <FiArrowLeft />;
      case 'error': return <FiX />;
      case 'refresh': return <FiRefreshCw />;
      case 'repeat': return <FiRepeat />;
      case 'number1': return <span className="font-mono font-bold">1</span>;
      case 'number2': return <span className="font-mono font-bold">2</span>;
      case 'number3': return <span className="font-mono font-bold">3</span>;
      case 'number4': return <span className="font-mono font-bold">4</span>;
      case 'number5': return <span className="font-mono font-bold">5</span>;
      default: return <FiInfo />;
    }
  };

  return (
    <div className={`flex items-center justify-center text-theme ${getSize()} ${className}`}>
      {getIcon()}
    </div>
  );
};

export default ShadcnIcon;
