import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNetwork } from './NetworkContext';

// Command interface
export interface Command {
  id: string;
  name: string;
  description: string;
  shortcut?: string;
  action: () => void;
  disabled?: boolean;
}

// Command palette context interface
interface CommandPaletteContextType {
  isOpen: boolean;
  commands: Command[];
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  executeCommand: (id: string) => void;
}

// Create context
const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(undefined);

// Provider component
export const CommandPaletteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { trainNetwork, resetNetwork, canTrain, metrics, runDScript } = useNetwork();

  // Define commands
  const commands: Command[] = [
    {
      id: 'train',
      name: 'Train',
      description: 'Train the current neural network',
      shortcut: 'Ctrl+T',
      action: () => {
        trainNetwork();
        setIsOpen(false);
      },
      disabled: !canTrain
    },
    {
      id: 'run-script',
      name: 'Run D-Script',
      description: 'Run the current D-Script code',
      shortcut: 'Ctrl+R',
      action: () => {
        runDScript();
        setIsOpen(false);
      }
    },
    {
      id: 'export',
      name: 'Export',
      description: 'Export the current model metrics',
      shortcut: 'Ctrl+E',
      action: () => {
        // Create a JSON blob and trigger download
        if (metrics) {
          const dataStr = JSON.stringify(metrics, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(dataBlob);
          
          const a = document.createElement('a');
          a.href = url;
          a.download = 'neural-network-metrics.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
        setIsOpen(false);
      },
      disabled: !metrics
    },
    {
      id: 'reset',
      name: 'Reset',
      description: 'Reset the current neural network',
      shortcut: 'Ctrl+Del',
      action: () => {
        resetNetwork();
        setIsOpen(false);
      }
    }
  ];

  // Open command palette
  const openCommandPalette = () => {
    setIsOpen(true);
  };

  // Close command palette
  const closeCommandPalette = () => {
    setIsOpen(false);
  };

  // Execute a command by ID
  const executeCommand = (id: string) => {
    const command = commands.find(cmd => cmd.id === id);
    if (command && !command.disabled) {
      command.action();
    }
  };

  // Add keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K to open command palette
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      // Escape to close command palette
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      
      // Execute commands with shortcuts
      if (isOpen) {
        commands.forEach(cmd => {
          if (cmd.shortcut) {
            const keys = cmd.shortcut.split('+');
            const modifierKey = keys[0].toLowerCase();
            const key = keys[1].toLowerCase();
            
            if (
              (modifierKey === 'ctrl' && e.ctrlKey) &&
              e.key.toLowerCase() === key.toLowerCase() &&
              !cmd.disabled
            ) {
              e.preventDefault();
              cmd.action();
            }
          }
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, commands]);

  return (
    <CommandPaletteContext.Provider
      value={{
        isOpen,
        commands,
        openCommandPalette,
        closeCommandPalette,
        executeCommand
      }}
    >
      {children}
    </CommandPaletteContext.Provider>
  );
};

// Custom hook to use the command palette context
export const useCommandPalette = (): CommandPaletteContextType => {
  const context = useContext(CommandPaletteContext);
  
  if (context === undefined) {
    throw new Error('useCommandPalette must be used within a CommandPaletteProvider');
  }
  
  return context;
};
