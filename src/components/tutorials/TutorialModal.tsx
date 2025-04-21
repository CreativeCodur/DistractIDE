import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTutorial } from '../../context/TutorialContext';
import GlassPanel from '../ui/GlassPanel';
import GlassButton from '../ui/GlassButton';
import { FiX, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const TutorialModal: React.FC = () => {
  const { 
    activeTutorial, 
    tutorialStep, 
    currentStep, 
    totalSteps,
    nextStep, 
    prevStep, 
    closeTutorial 
  } = useTutorial();
  
  if (!activeTutorial || !tutorialStep) {
    return null;
  }
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-500/30 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <GlassPanel className="p-6" animate={false}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{tutorialStep.title}</h2>
              <button
                onClick={closeTutorial}
                className="p-1 rounded-full hover:bg-light-400/30 dark:hover:bg-dark-300/30"
                aria-label="Close tutorial"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-base">{tutorialStep.content}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                Step {currentStep + 1} of {totalSteps}
              </div>
              
              <div className="flex space-x-2">
                {currentStep > 0 && (
                  <GlassButton onClick={prevStep} className="flex items-center">
                    <FiArrowLeft className="mr-1" />
                    <span>Previous</span>
                  </GlassButton>
                )}
                
                <GlassButton onClick={nextStep} className="flex items-center">
                  <span>{currentStep < totalSteps - 1 ? 'Next' : 'Finish'}</span>
                  {currentStep < totalSteps - 1 && <FiArrowRight className="ml-1" />}
                </GlassButton>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TutorialModal;
