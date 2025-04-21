import React, { createContext, useState, useContext } from 'react';

// Network types
export type NetworkType = 'IRISSCANNING' | 'IMAGERECOG' | 'CLIMATEPRED' | null;
export type LayerType = 'DEFAULT' | 'SPECIAL';

// Layer interface
export interface Layer {
  id: string;
  type: LayerType;
}

// Network metrics interface
export interface NetworkMetrics {
  accuracy: number;
  epochs: number[];
  values: number[];
  verdict: string;
}

// Network context interface
interface NetworkContextType {
  networkType: NetworkType;
  layers: Layer[];
  metrics: NetworkMetrics | null;
  isTraining: boolean;
  selectedRounds: number;

  // Actions
  initiateNetwork: (type: NetworkType) => void;
  addLayer: (type: LayerType) => void;
  removeLayer: (id: string) => void;
  resetNetwork: () => void;
  trainNetwork: () => Promise<void>;
  setSelectedRounds: (rounds: number) => void;

  // Validation
  canAddDefaultLayer: boolean;
  canAddSpecialLayer: boolean;
  canTrain: boolean;

  // D-Script
  dScript: string;
  setDScript: (script: string) => void;
  validateDScript: () => { isValid: boolean; errors: string[] };
  runDScript: () => Promise<void>;
}

// Create context
const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

// Predefined metrics for different network configurations
const PREDEFINED_METRICS: Record<string, NetworkMetrics> = {
  // Iris Scanning with different layer configurations
  'IRISSCANNING-1-0': {
    accuracy: 75.2,
    epochs: [1, 2, 3, 4, 5],
    values: [65.1, 68.4, 71.9, 73.8, 75.2],
    verdict: 'Basic Iris Model: Needs Improvement'
  },
  'IRISSCANNING-2-0': {
    accuracy: 81.7,
    epochs: [1, 2, 3, 4, 5],
    values: [70.3, 74.8, 78.2, 80.5, 81.7],
    verdict: 'Good Iris Model'
  },
  'IRISSCANNING-3-0': {
    accuracy: 84.3,
    epochs: [1, 2, 3, 4, 5],
    values: [72.1, 76.5, 80.2, 83.1, 84.3],
    verdict: 'Good Iris Model'
  },
  'IRISSCANNING-1-1': {
    accuracy: 82.5,
    epochs: [1, 2, 3, 4, 5],
    values: [71.2, 75.6, 79.1, 81.3, 82.5],
    verdict: 'Good Iris Model'
  },
  'IRISSCANNING-2-1': {
    accuracy: 86.9,
    epochs: [1, 2, 3, 4, 5],
    values: [74.8, 79.2, 83.1, 85.4, 86.9],
    verdict: 'Excellent Iris Model'
  },

  // Image Recognition with different layer configurations
  'IMAGERECOG-1-0': {
    accuracy: 68.7,
    epochs: [1, 2, 3, 4, 5],
    values: [58.2, 61.5, 64.9, 67.3, 68.7],
    verdict: 'Basic Image Model: Needs Improvement'
  },
  'IMAGERECOG-2-0': {
    accuracy: 76.2,
    epochs: [1, 2, 3, 4, 5],
    values: [65.4, 69.1, 72.5, 74.8, 76.2],
    verdict: 'Decent Image Model'
  },
  'IMAGERECOG-3-0': {
    accuracy: 79.8,
    epochs: [1, 2, 3, 4, 5],
    values: [68.3, 72.1, 75.6, 78.2, 79.8],
    verdict: 'Good Image Model'
  },
  'IMAGERECOG-2-1': {
    accuracy: 83.4,
    epochs: [1, 2, 3, 4, 5],
    values: [71.5, 75.2, 79.1, 81.8, 83.4],
    verdict: 'Very Good Image Model'
  },

  // Climate Prediction with different layer configurations
  'CLIMATEPRED-1-0': {
    accuracy: 71.3,
    epochs: [1, 2, 3, 4, 5],
    values: [61.8, 65.2, 68.1, 70.2, 71.3],
    verdict: 'Basic Climate Model: Needs Improvement'
  },
  'CLIMATEPRED-2-0': {
    accuracy: 79.1,
    epochs: [1, 2, 3, 4, 5],
    values: [68.5, 72.3, 75.8, 77.9, 79.1],
    verdict: 'Good Climate Model'
  },
  'CLIMATEPRED-3-0': {
    accuracy: 82.6,
    epochs: [1, 2, 3, 4, 5],
    values: [70.9, 74.8, 78.3, 81.1, 82.6],
    verdict: 'Very Good Climate Model'
  },
  'CLIMATEPRED-2-1': {
    accuracy: 85.2,
    epochs: [1, 2, 3, 4, 5],
    values: [73.1, 77.4, 81.2, 83.8, 85.2],
    verdict: 'Excellent Climate Model'
  },
};

// Helper function to generate personalized verdicts based on network type and accuracy
const generateVerdict = (networkType: NetworkType, accuracy: number): string => {
  // Define thresholds for different quality levels
  const poor = 70;
  const average = 80;
  const good = 90;

  // Generate verdict based on network type and accuracy
  if (networkType === 'IRISSCANNING') {
    if (accuracy < poor) {
      return "Ooh! Not a good iris scanning model! Try adding more layers or training for more rounds!";
    } else if (accuracy < average) {
      return "This iris scanning model is okay, but could be better with more specialized layers.";
    } else if (accuracy < good) {
      return "Good job! This is a solid iris scanning model that can identify most iris patterns.";
    } else {
      return "Excellent iris scanning model! This could be used in real security systems!";
    }
  } else if (networkType === 'IMAGERECOG') {
    if (accuracy < poor) {
      return "Ooh! Not a good image recognition model! Try harder with different layer combinations!";
    } else if (accuracy < average) {
      return "This image recognition model needs improvement. Try adding more special layers.";
    } else if (accuracy < good) {
      return "Nice work! This image recognition model can identify most common objects.";
    } else {
      return "Outstanding image recognition model! This could compete with commercial systems!";
    }
  } else if (networkType === 'CLIMATEPRED') {
    if (accuracy < poor) {
      return "Ooh! Not a good climate prediction model! Weather forecasting is hard - try more layers!";
    } else if (accuracy < average) {
      return "This climate prediction model is basic. It might predict obvious weather patterns.";
    } else if (accuracy < good) {
      return "Good climate prediction model! It can forecast weather trends with decent accuracy.";
    } else {
      return "Excellent climate prediction model! This could help meteorologists make better forecasts!";
    }
  } else {
    // Generic verdict for unknown network types
    if (accuracy < poor) {
      return "This model needs significant improvement. Try a different architecture.";
    } else if (accuracy < average) {
      return "This model performs adequately but has room for improvement.";
    } else if (accuracy < good) {
      return "This is a good model with solid performance metrics.";
    } else {
      return "Excellent model! The performance metrics are very impressive.";
    }
  }
};

// Provider component
export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [networkType, setNetworkType] = useState<NetworkType>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [metrics, setMetrics] = useState<NetworkMetrics | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [dScript, setDScript] = useState('');
  const [selectedRounds, setSelectedRounds] = useState<number>(3); // Default to 3 rounds

  // Validation flags
  const canAddDefaultLayer = networkType !== null && layers.filter(l => l.type === 'DEFAULT').length < 3;
  const canAddSpecialLayer = networkType !== null && layers.filter(l => l.type === 'SPECIAL').length < 3;
  const canTrain = networkType !== null && layers.length > 0;

  // Initialize network
  const initiateNetwork = (type: NetworkType) => {
    setNetworkType(type);
    setLayers([]);
    setMetrics(null);
  };

  // Add a layer
  const addLayer = (type: LayerType) => {
    if (type === 'DEFAULT' && !canAddDefaultLayer) return;
    if (type === 'SPECIAL' && !canAddSpecialLayer) return;

    const newLayer: Layer = {
      id: `layer-${Date.now()}`,
      type
    };

    setLayers([...layers, newLayer]);
  };

  // Remove a layer
  const removeLayer = (id: string) => {
    setLayers(layers.filter(layer => layer.id !== id));
  };

  // Reset network
  const resetNetwork = () => {
    setNetworkType(null);
    setLayers([]);
    setMetrics(null);
    setDScript('');
  };

  // Set selected rounds
  const handleSetSelectedRounds = (rounds: number) => {
    console.log('Setting rounds to:', rounds);
    setMetrics(null); // Clear previous metrics when changing rounds
    // Update the state directly
    setSelectedRounds(rounds);
  };

  // Train network
  const trainNetwork = async () => {
    if (!canTrain) return;

    setIsTraining(true);

    // Calculate the key for predefined metrics
    const defaultLayerCount = layers.filter(l => l.type === 'DEFAULT').length;
    const specialLayerCount = layers.filter(l => l.type === 'SPECIAL').length;
    const metricsKey = `${networkType}-${defaultLayerCount}-${specialLayerCount}`;

    // Calculate training time based on selected rounds
    let trainingTime = 0;
    if (selectedRounds <= 1) {
      trainingTime = Math.random() * 10000 + 10000; // 10-20 seconds
    } else if (selectedRounds <= 3) {
      trainingTime = Math.random() * 20000 + 20000; // 20-40 seconds
    } else {
      trainingTime = Math.random() * 10000 + 40000; // 40-50 seconds
    }

    // Simulate training delay
    await new Promise(resolve => setTimeout(resolve, trainingTime));

    // Generate rounds array based on selected rounds
    const rounds = Array.from({ length: selectedRounds }, (_, i) => i + 1);

    // Generate values array with increasing accuracy
    const baseAccuracy = 60 + Math.random() * 10;
    const maxAccuracy = baseAccuracy + (selectedRounds * 5) + Math.random() * 5;
    const step = (maxAccuracy - baseAccuracy) / (selectedRounds - 1 || 1);

    const values = rounds.map((_, i) => {
      if (i === 0) return baseAccuracy;
      if (i === selectedRounds - 1) return maxAccuracy;
      return baseAccuracy + step * i + (Math.random() * 2 - 1); // Add some randomness
    });

    // Set metrics from predefined values or generate new ones
    const predefinedMetrics = PREDEFINED_METRICS[metricsKey];

    // Generate a personalized verdict based on network type and accuracy
    const finalAccuracy = predefinedMetrics ? predefinedMetrics.accuracy : maxAccuracy;
    const personalizedVerdict = generateVerdict(networkType, finalAccuracy);

    setMetrics(predefinedMetrics ? {
      ...predefinedMetrics,
      epochs: rounds,
      values: predefinedMetrics.values.slice(0, selectedRounds),
      verdict: personalizedVerdict // Use personalized verdict
    } : {
      accuracy: maxAccuracy,
      epochs: rounds,
      values: values,
      verdict: personalizedVerdict // Use personalized verdict
    });

    setIsTraining(false);
  };

  // Validate D-Script
  const validateDScript = () => {
    const lines = dScript.trim().split('\n');
    const errors: string[] = [];
    const nonEmptyLines = lines.filter(line => line.trim() !== '');

    // Check min and max lines
    if (nonEmptyLines.length < 5) {
      errors.push('Script must have at least 5 lines (including INITIATEMYNETWORK and RUNMEPLEASE)');
    }

    if (nonEmptyLines.length > 10) {
      errors.push('Script exceeds maximum of 10 lines');
    }

    // Check for required commands
    let hasInitiate = false;
    let hasRun = false;
    let defaultLayerCount = 0;
    let specialLayerCount = 0;

    nonEmptyLines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmedLine = line.trim();

      if (index === 0) {
        // First line must be INITIATEMYNETWORK
        const parts = trimmedLine.split(' ');
        if (parts[0] !== 'INITIATEMYNETWORK') {
          errors.push(`Line ${lineNumber}: Must start with INITIATEMYNETWORK`);
        } else if (!parts[1] || !['IRISSCANNING', 'IMAGERECOG', 'CLIMATEPRED'].includes(parts[1])) {
          errors.push(`Line ${lineNumber}: Invalid network type. Use IRISSCANNING, IMAGERECOG, or CLIMATEPRED`);
        } else {
          hasInitiate = true;
        }
      } else if (index === nonEmptyLines.length - 1) {
        // Last line must be RUNMEPLEASE
        if (trimmedLine !== 'RUNMEPLEASE') {
          errors.push(`Line ${lineNumber}: Last line must be RUNMEPLEASE`);
        } else {
          hasRun = true;
        }
      } else {
        // Middle lines can be ADDONELAYER or ADDSPECIALLAYER
        if (trimmedLine === 'ADDONELAYER') {
          defaultLayerCount++;
          if (defaultLayerCount > 4) {
            errors.push(`Line ${lineNumber}: Maximum 4 default layers allowed`);
          }
        } else if (trimmedLine === 'ADDSPECIALLAYER') {
          specialLayerCount++;
          if (specialLayerCount > 4) {
            errors.push(`Line ${lineNumber}: Maximum 4 special layers allowed`);
          }
        } else {
          errors.push(`Line ${lineNumber}: Invalid command. Use ADDONELAYER or ADDSPECIALLAYER`);
        }
      }
    });

    // Check minimum layer requirements
    if (defaultLayerCount < 2) {
      errors.push('Script must have at least 2 default layers (ADDONELAYER)');
    }

    if (specialLayerCount < 1) {
      errors.push('Script must have at least 1 special layer (ADDSPECIALLAYER)');
    }

    if (!hasInitiate) {
      errors.push('Missing INITIATEMYNETWORK command');
    }

    if (!hasRun) {
      errors.push('Missing RUNMEPLEASE command as the last line');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  // Run D-Script
  const runDScript = async () => {
    const validation = validateDScript();
    if (!validation.isValid) return;

    setIsTraining(true);

    // Parse script
    const lines = dScript.trim().split('\n');
    let scriptNetworkType: NetworkType = null;
    const scriptLayers: Layer[] = [];

    // Parse network type
    const initLine = lines[0].trim();
    const parts = initLine.split(' ');
    if (parts[1] === 'IRISSCANNING') {
      scriptNetworkType = 'IRISSCANNING';
    } else if (parts[1] === 'IMAGERECOG') {
      scriptNetworkType = 'IMAGERECOG';
    } else if (parts[1] === 'CLIMATEPRED') {
      scriptNetworkType = 'CLIMATEPRED';
    }

    // Parse layers
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === 'ADDONELAYER') {
        scriptLayers.push({
          id: `script-layer-${Date.now()}-${i}`,
          type: 'DEFAULT'
        });
      } else if (line === 'ADDSPECIALLAYER') {
        scriptLayers.push({
          id: `script-layer-${Date.now()}-${i}`,
          type: 'SPECIAL'
        });
      }
    }

    // Calculate the key for predefined metrics
    const defaultLayerCount = scriptLayers.filter(l => l.type === 'DEFAULT').length;
    const specialLayerCount = scriptLayers.filter(l => l.type === 'SPECIAL').length;
    const metricsKey = `${scriptNetworkType}-${defaultLayerCount}-${specialLayerCount}`;

    // Calculate training time based on selected rounds
    let trainingTime = 0;
    if (selectedRounds <= 1) {
      trainingTime = Math.random() * 10000 + 10000; // 10-20 seconds
    } else if (selectedRounds <= 3) {
      trainingTime = Math.random() * 20000 + 20000; // 20-40 seconds
    } else {
      trainingTime = Math.random() * 10000 + 40000; // 40-50 seconds
    }

    // Simulate training delay
    await new Promise(resolve => setTimeout(resolve, trainingTime));

    // Generate rounds array based on selected rounds
    const rounds = Array.from({ length: selectedRounds }, (_, i) => i + 1);

    // Generate values array with increasing accuracy
    const baseAccuracy = 60 + Math.random() * 10;
    const maxAccuracy = baseAccuracy + (selectedRounds * 5) + Math.random() * 5;
    const step = (maxAccuracy - baseAccuracy) / (selectedRounds - 1 || 1);

    const values = rounds.map((_, i) => {
      if (i === 0) return baseAccuracy;
      if (i === selectedRounds - 1) return maxAccuracy;
      return baseAccuracy + step * i + (Math.random() * 2 - 1); // Add some randomness
    });

    // Set metrics from predefined values or generate new ones
    const predefinedMetrics = PREDEFINED_METRICS[metricsKey];

    // Generate a personalized verdict based on network type and accuracy
    const finalAccuracy = predefinedMetrics ? predefinedMetrics.accuracy : maxAccuracy;
    const personalizedVerdict = generateVerdict(scriptNetworkType, finalAccuracy);

    setMetrics(predefinedMetrics ? {
      ...predefinedMetrics,
      epochs: rounds,
      values: predefinedMetrics.values.slice(0, selectedRounds),
      verdict: personalizedVerdict // Use personalized verdict
    } : {
      accuracy: maxAccuracy,
      epochs: rounds,
      values: values,
      verdict: personalizedVerdict // Use personalized verdict
    });

    setIsTraining(false);
  };

  return (
    <NetworkContext.Provider
      value={{
        networkType,
        layers,
        metrics,
        isTraining,
        selectedRounds,
        initiateNetwork,
        addLayer,
        removeLayer,
        resetNetwork,
        trainNetwork,
        setSelectedRounds: handleSetSelectedRounds,
        canAddDefaultLayer,
        canAddSpecialLayer,
        canTrain,
        dScript,
        setDScript,
        validateDScript,
        runDScript
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

// Custom hook to use the network context
export const useNetwork = (): NetworkContextType => {
  const context = useContext(NetworkContext);

  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }

  return context;
};
