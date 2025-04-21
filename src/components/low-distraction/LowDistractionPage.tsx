import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '../ui/GlassPanel';
import GlassButton from '../ui/GlassButton';
import GlassCard from '../ui/GlassCard';
import { useNetwork } from '../../context/NetworkContext';
import { FiCode, FiPlay, FiLoader, FiAlertCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import NetworkMetricsChart from '../no-distraction/NetworkMetricsChart';
import DScriptEditor from './DScriptEditor';
import RoundsSelectorFixed from '../ui/RoundsSelectorFixed';

const LowDistractionPage: React.FC = () => {
  const {
    dScript,
    setDScript,
    validateDScript,
    runDScript,
    metrics,
    isTraining,
    resetNetwork,
    selectedRounds,
    setSelectedRounds
  } = useNetwork();

  const [errors, setErrors] = useState<string[]>([]);
  const [rulesExpanded, setRulesExpanded] = useState<boolean>(true);

  // Validate D-Script on change
  useEffect(() => {
    const { errors } = validateDScript();
    setErrors(errors);
  }, [dScript, validateDScript]);

  // Toggle rules section
  const toggleRules = () => {
    setRulesExpanded(!rulesExpanded);
  };

  // Example D-Script
  const exampleScript = `INITIATEMYNETWORK IRISSCANNING
ADDONELAYER
ADDONELAYER
ADDSPECIALLAYER
RUNMEPLEASE`;

  // Load example script
  const loadExample = () => {
    setDScript(exampleScript);
  };

  return (
    <div className="space-y-6">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Low-Distraction Mode (D-Script)
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* D-Script Rules Panel - Moved to top and made collapsible */}
          <GlassPanel className="p-6 mb-6">
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleRules}>
              <h2 className="text-xl font-semibold">D-Script Rules</h2>
              <button className="p-2 hover:bg-theme-light rounded-full transition-colors">
                {rulesExpanded ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            </div>

            {rulesExpanded && (
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="font-medium mb-1">Basic Rules:</h3>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Minimum 5 lines, maximum 10 lines</li>
                    <li>4 commands available: INITIATEMYNETWORK, ADDONELAYER, ADDSPECIALLAYER, RUNMEPLEASE</li>
                    <li>Minimum 2 default layers and 1 special layer required</li>
                    <li>Maximum 4 default layers and 4 special layers allowed</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Line Requirements:</h3>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Line 1: Must be INITIATEMYNETWORK followed by IRISSCANNING, IMAGERECOG, or CLIMATEPRED</li>
                    <li>Lines 2-9: Can contain ADDONELAYER or ADDSPECIALLAYER</li>
                    <li>Last line: Must be RUNMEPLEASE</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Example:</h3>
                  <pre className="text-sm bg-light-300/50 dark:bg-dark-400/50 p-2 rounded-lg overflow-x-auto">
                    {`INITIATEMYNETWORK IRISSCANNING
ADDONELAYER
ADDONELAYER
ADDSPECIALLAYER
RUNMEPLEASE`}
                  </pre>
                </div>
              </div>
            )}
          </GlassPanel>

          {/* D-Script Editor Panel */}
          <GlassPanel className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">D-Script Editor</h2>

              <div className="flex space-x-2">
                <GlassButton
                  onClick={loadExample}
                  className="text-sm"
                  disabled={isTraining}
                >
                  Load Example
                </GlassButton>

                <GlassButton
                  onClick={() => resetNetwork()}
                  className="text-sm"
                  variant="danger"
                  disabled={isTraining}
                >
                  Clear
                </GlassButton>
              </div>
            </div>

            <div className="mb-4">
              <DScriptEditor
                value={dScript}
                onChange={setDScript}
                errors={errors}
                disabled={isTraining}
              />
            </div>

            {errors.length > 0 && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-center text-red-600 dark:text-red-400 mb-2">
                  <FiAlertCircle className="mr-2" />
                  <span className="font-medium">Syntax Errors</span>
                </div>
                <ul className="text-sm space-y-1 text-red-600 dark:text-red-400">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2 text-light-700 dark:text-dark-200">
                  Select Training Rounds
                </h3>

                <RoundsSelectorFixed
                  selectedRounds={selectedRounds}
                  onChange={setSelectedRounds}
                  disabled={isTraining}
                />
              </div>

              <GlassButton
                onClick={() => runDScript()}
                className="flex items-center"
                disabled={errors.length > 0 || isTraining || !dScript.trim()}
                variant="primary"
              >
                {isTraining ? (
                  <>
                    <FiLoader className="mr-2 animate-spin" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <FiPlay className="mr-2" />
                    <span>Run D-Script</span>
                  </>
                )}
              </GlassButton>
            </div>
          </GlassPanel>
        </div>

        {/* Results Panel */}
        <div>
          <GlassPanel className="p-6 h-full">
            <h2 className="text-xl font-semibold mb-4">Results</h2>

            {isTraining ? (
              <div className="flex flex-col items-center justify-center h-64">
                <FiLoader className="w-10 h-10 animate-spin text-primary-500 mb-4" />
                <p>Running your D-Script...</p>
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
                <FiCode className="w-10 h-10 mb-4" />
                <p>Write and run your D-Script to see results</p>
              </div>
            )}
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};

export default LowDistractionPage;
