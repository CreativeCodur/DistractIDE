import React, { createContext, useState, useContext, useEffect } from 'react';

// Tutorial types
export type TutorialType = 'home' | 'no-distraction' | 'low-distraction' | 'command-palette';

// Tutorial step interface
export interface TutorialStep {
  title: string;
  content: string;
}

// Tutorial data
const TUTORIALS: Record<TutorialType, TutorialStep[]> = {
  'home': [
    {
      title: 'Welcome to DistractIDE',
      content: 'DistractIDE is an educational platform designed to teach neural networks to beginners through a distraction-free interface.'
    },
    {
      title: 'Navigation',
      content: 'Use the navigation menu to switch between different modes: Home, No-Distraction Mode, and Low-Distraction Mode.'
    },
    {
      title: 'Command Palette',
      content: 'Press Ctrl+K at any time to open the command palette for quick access to actions like Train, Export, and Reset.'
    }
  ],
  'no-distraction': [
    {
      title: 'No-Distraction Mode',
      content: 'This mode allows you to build neural networks using a simple button-based interface.'
    },
    {
      title: 'Building a Network',
      content: 'Start by initiating a network type, then add layers to build your model. You can add up to 3 Default Layers and 3 Special Layers. Experiment!'
    },
    {
      title: 'Training',
      content: 'Once you\'ve built your network, click the Train button to see how well it performs. Training will take 20-30 seconds to simulate real-world training time.'
    },
    {
      title: 'Rounds',
      content: 'Each round determines how many "cycles" the model will be trained for.'
    }
  ],
  'low-distraction': [
    {
      title: 'Low-Distraction Mode (D-Script)',
      content: 'This mode allows you to build neural networks using a simplified language called D-Script, perfect for dummies creating ther first Neural Network model!.'
    },
    {
      title: 'D-Script Rules',
      content: 'D-Script has a maximum of 10 lines and 4 commands: INITIATEMYNETWORK [Type] , ADDONELAYER, ADDSPECIALLAYER, and RUNMEPLEASE.'
    },
    {
      title: 'Syntax',
      content: 'Line 1 must be INITIATEMY followed by IRISSCANNING (An Iris Scanning Model), IMAGERECOG (An Image Recognition Model), or CLIMATEPRED (A Climate Prediction Model). The last line must be RUNMEPLEASE. Lines between INITIATEMY and RUNMEPLEASE can contain ADDONELAYER or ADDSPECIALLAYER commands.'
    },
    {
      title: 'Rounds',
      content: 'Each round determines how many "cycles" the model will be trained for.'
    },
  ],
  'command-palette': [
    {
      title: 'Command Palette',
      content: 'The command palette provides quick access to common actions.'
    },
    {
      title: 'Available Commands',
      content: 'Train: Start training your network. Export: Save your model metrics. Reset: Clear your current network.'
    },
    {
      title: 'Keyboard Shortcut',
      content: 'Press Ctrl+K at any time to open the command palette.'
    }
  ]
};

// Tutorial context interface
interface TutorialContextType {
  activeTutorial: TutorialType | null;
  currentStep: number;
  totalSteps: number;
  tutorialStep: TutorialStep | null;
  showTutorials: boolean;
  shownTutorials: Record<TutorialType, boolean>;

  // Actions
  startTutorial: (type: TutorialType) => void;
  forceStartTutorial: (type: TutorialType) => void; // Force start a tutorial regardless of shown state
  nextStep: () => void;
  prevStep: () => void;
  closeTutorial: () => void;
  setShowTutorials: (show: boolean) => void;
}

// Create context
const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

// Provider component
export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTutorial, setActiveTutorial] = useState<TutorialType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorials, setShowTutorials] = useState(() => {
    // Check if it's the first visit
    const visited = localStorage.getItem('visited');
    return visited !== 'true';
  });
  const [shownTutorials, setShownTutorials] = useState<Record<TutorialType, boolean>>(() => {
    // Initialize with all tutorials not shown
    return {
      'home': false,
      'no-distraction': false,
      'low-distraction': false,
      'command-palette': false
    };
  });

  // Calculate total steps and current tutorial step
  const totalSteps = activeTutorial ? TUTORIALS[activeTutorial].length : 0;
  const tutorialStep = activeTutorial && currentStep < totalSteps
    ? TUTORIALS[activeTutorial][currentStep]
    : null;

  // Set visited flag on first load
  useEffect(() => {
    localStorage.setItem('visited', 'true');
  }, []);

  // Start a tutorial
  const startTutorial = (type: TutorialType) => {
    // Only start the tutorial if it hasn't been shown already
    if (!shownTutorials[type]) {
      setActiveTutorial(type);
      setCurrentStep(0);

      // Mark this tutorial as shown
      setShownTutorials(prev => ({
        ...prev,
        [type]: true
      }));
    }
  };

  // Force start a tutorial regardless of shown state
  const forceStartTutorial = (type: TutorialType) => {
    setActiveTutorial(type);
    setCurrentStep(0);
  };

  // Move to next step
  const nextStep = () => {
    if (activeTutorial && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      closeTutorial();
    }
  };

  // Move to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Close the tutorial
  const closeTutorial = () => {
    setActiveTutorial(null);
    setCurrentStep(0);
  };

  return (
    <TutorialContext.Provider
      value={{
        activeTutorial,
        currentStep,
        totalSteps,
        tutorialStep,
        showTutorials,
        shownTutorials,
        startTutorial,
        forceStartTutorial,
        nextStep,
        prevStep,
        closeTutorial,
        setShowTutorials
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

// Custom hook to use the tutorial context
export const useTutorial = (): TutorialContextType => {
  const context = useContext(TutorialContext);

  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }

  return context;
};
