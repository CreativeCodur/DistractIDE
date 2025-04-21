import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '../ui/GlassPanel';
import GlassButton from '../ui/GlassButton';
import GlassCard from '../ui/GlassCard';
import { useNetwork, NetworkType } from '../../context/NetworkContext';
import { FiCpu, FiLayers, FiPlus, FiTrash2, FiPlay, FiLoader } from 'react-icons/fi';
import NetworkMetricsChart from './NetworkMetricsChart';
import NetworkLayer from './NetworkLayer';
import RoundsSelectorFixed from '../ui/RoundsSelectorFixed';

const NoDistractionPage: React.FC = () => {
  const {
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
    setSelectedRounds,
    canAddDefaultLayer,
    canAddSpecialLayer,
    canTrain
  } = useNetwork();

  // Network type options
  const networkTypes: { value: NetworkType; label: string; icon: React.ReactNode }[] = [
    { value: 'IRISSCANNING', label: 'Iris Recognition', icon: <FiCpu /> },
    { value: 'IMAGERECOG', label: 'Image Recognition', icon: <FiCpu /> },
    { value: 'CLIMATEPRED', label: 'Climate Prediction', icon: <FiCpu /> }
  ];

  return (
    <div className="space-y-6">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        No-Distraction Mode
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassPanel className="p-6">
            <h2 className="text-xl font-semibold mb-4">Network Builder</h2>

            {/* Network Type Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2 text-light-700 dark:text-dark-200">
                What kind of Neural Network do you wanna build?
              </h3>

              <div className="flex flex-wrap gap-2">
                {networkTypes.map(type => (
                  <GlassButton
                    key={type.value}
                    onClick={() => initiateNetwork(type.value)}
                    className={`flex items-center ${
                      networkType === type.value ? 'border-primary-500 bg-primary-500/10' : ''
                    }`}
                    disabled={isTraining}
                  >
                    {type.icon}
                    <span className="ml-2">{type.label}</span>
                  </GlassButton>
                ))}
              </div>
            </div>

            {/* Layer Management */}
            {networkType && (
              <>
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2 text-light-700 dark:text-dark-200">
                    Like we talked about, there are "layers" in a Neural Network. Add some to yours, and see what happens!
                  </h3>
                  <h3 className="text-sm font-medium mb-2 text-light-700 dark:text-dark-200">
                    (Tip: For best results, add up to 3 Default & Special Layers)
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <GlassButton
                      onClick={() => addLayer('DEFAULT')}
                      className="flex items-center"
                      disabled={!canAddDefaultLayer || isTraining}
                    >
                      <FiPlus className="mr-1" />
                      <span>Add Default Layer</span>
                      <span className="ml-2 text-xs text-light-600 dark:text-dark-300">
                        ({layers.filter(l => l.type === 'DEFAULT').length}/3)
                      </span>
                    </GlassButton>

                    <GlassButton
                      onClick={() => addLayer('SPECIAL')}
                      className="flex items-center"
                      disabled={!canAddSpecialLayer || isTraining}
                    >
                      <FiPlus className="mr-1" />
                      <span>Add Special Layer</span>
                      <span className="ml-2 text-xs text-light-600 dark:text-dark-300">
                        ({layers.filter(l => l.type === 'SPECIAL').length}/3)
                      </span>
                    </GlassButton>
                  </div>

                  {/* Layer Visualization */}
                  <div className="space-y-3">
                    {layers.length === 0 ? (
                      <div className="text-center p-4 border border-dashed border-light-400 dark:border-dark-400 rounded-lg">
                        <p className="text-light-600 dark:text-dark-300">
                          Add layers to build your neural network
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center space-y-2">
                        {layers.map((layer, index) => (
                          <NetworkLayer
                            key={layer.id}
                            layer={layer}
                            index={index}
                            onRemove={() => removeLayer(layer.id)}
                            disabled={isTraining}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Training Controls */}
                <div>
                  <h3 className="text-sm font-medium mb-2 text-light-700 dark:text-dark-200">
                    3. Select Training Rounds
                  </h3>

                  <RoundsSelectorFixed
                    selectedRounds={selectedRounds}
                    onChange={setSelectedRounds}
                    disabled={isTraining}
                  />

                  <h3 className="text-sm font-medium mb-2 text-light-700 dark:text-dark-200">
                    4. Train Network
                  </h3>

                  <div className="flex gap-2">
                    <GlassButton
                      onClick={() => trainNetwork()}
                      className="flex items-center"
                      disabled={!canTrain || isTraining}
                      variant="primary"
                    >
                      {isTraining ? (
                        <>
                          <FiLoader className="mr-2 animate-spin" />
                          <span>Training...</span>
                        </>
                      ) : (
                        <>
                          <FiPlay className="mr-2" />
                          <span>Train Network</span>
                        </>
                      )}
                    </GlassButton>

                    <GlassButton
                      onClick={() => resetNetwork()}
                      className="flex items-center"
                      disabled={isTraining}
                      variant="danger"
                    >
                      <FiTrash2 className="mr-2" />
                      <span>Reset</span>
                    </GlassButton>
                  </div>
                </div>
              </>
            )}
          </GlassPanel>
        </div>

        {/* Results Panel */}
        <div>
          <GlassPanel className="p-6 h-full">
            <h2 className="text-xl font-semibold mb-4">Results</h2>

            {isTraining ? (
              <div className="flex flex-col items-center justify-center h-64">
                <FiLoader className="w-10 h-10 animate-spin text-primary-500 mb-4" />
                <p>Training your neural network...</p>
                <p className="text-sm text-light-600 dark:text-dark-300 mt-2">
                  {selectedRounds <= 1
                    ? "This will take 10-20 seconds"
                    : selectedRounds <= 3
                    ? "This will take 20-40 seconds"
                    : "This will take 40-50 seconds"}
                </p>
              </div>
            ) : metrics ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Accuracy</h3>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {metrics.accuracy.toFixed(1)}%
                  </div>
                </div>

                <NetworkMetricsChart metrics={metrics} />

                <GlassCard className="mt-4">
                  <h3 className="font-medium mb-2">Verdict</h3>
                  <p>{metrics.verdict}</p>
                </GlassCard>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-light-600 dark:text-dark-300">
                <FiLayers className="w-10 h-10 mb-4" />
                <p>Build and train your network to see results</p>
              </div>
            )}
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};

export default NoDistractionPage;
