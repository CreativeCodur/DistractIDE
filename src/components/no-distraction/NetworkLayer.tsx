import React from 'react';
import { motion } from 'framer-motion';
import { Layer } from '../../context/NetworkContext';
import { FiLayers, FiTrash2 } from 'react-icons/fi';

interface NetworkLayerProps {
  layer: Layer;
  index: number;
  onRemove: () => void;
  disabled?: boolean;
}

const NetworkLayer: React.FC<NetworkLayerProps> = ({ 
  layer, 
  index, 
  onRemove,
  disabled = false
}) => {
  return (
    <motion.div
      className="w-full flex items-center justify-between p-3 rounded-lg bg-light-300/50 dark:bg-dark-400/50 border border-light-400/30 dark:border-dark-400/30"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <div className={`p-2 rounded-full mr-3 ${
          layer.type === 'DEFAULT' 
            ? 'bg-primary-500/20 text-primary-600 dark:text-primary-400' 
            : 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
        }`}>
          <FiLayers className="w-4 h-4" />
        </div>
        
        <div>
          <div className="font-medium">
            {layer.type === 'DEFAULT' ? 'Default Layer' : 'Special Layer'}
          </div>
          <div className="text-xs text-light-600 dark:text-dark-300">
            Layer {index + 1}
          </div>
        </div>
      </div>
      
      <button
        className="p-1.5 rounded-full hover:bg-light-400/30 dark:hover:bg-dark-300/30 text-light-600 dark:text-dark-300"
        onClick={onRemove}
        disabled={disabled}
        aria-label="Remove layer"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default NetworkLayer;
