import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPalette } from '../../context/CommandPaletteContext';
import GlassPanel from '../ui/GlassPanel';
import { FiCommand, FiSearch } from 'react-icons/fi';

const CommandPalette: React.FC = () => {
  const { isOpen, commands, closeCommandPalette, executeCommand } = useCommandPalette();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Filter commands based on search term
  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Focus input when command palette opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Reset search and selection when command palette opens/closes
  useEffect(() => {
    setSearchTerm('');
    setSelectedIndex(0);
  }, [isOpen]);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredCommands.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex] && !filteredCommands[selectedIndex].disabled) {
        executeCommand(filteredCommands[selectedIndex].id);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeCommandPalette();
    }
  };
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[20vh] bg-dark-500/30 backdrop-blur-sm"
        onClick={closeCommandPalette}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg"
          onClick={e => e.stopPropagation()}
        >
          <GlassPanel className="p-0 overflow-hidden" animate={false}>
            <div className="flex items-center p-3 border-b border-light-400/30 dark:border-dark-400/30">
              <FiSearch className="w-5 h-5 mr-2 text-light-700 dark:text-dark-200" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search commands..."
                className="w-full bg-transparent border-none outline-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="flex items-center justify-center w-6 h-6 text-xs rounded bg-light-400/30 dark:bg-dark-400/30 text-light-700 dark:text-dark-200">
                <FiCommand className="w-3 h-3" />
              </div>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center text-light-700 dark:text-dark-200">
                  No commands found
                </div>
              ) : (
                <ul>
                  {filteredCommands.map((command, index) => (
                    <li key={command.id}>
                      <button
                        className={`w-full px-4 py-3 text-left flex items-center justify-between ${
                          selectedIndex === index 
                            ? 'bg-primary-500/10' 
                            : 'hover:bg-light-400/10 dark:hover:bg-dark-400/10'
                        } ${
                          command.disabled 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'cursor-pointer'
                        }`}
                        onClick={() => {
                          if (!command.disabled) {
                            executeCommand(command.id);
                          }
                        }}
                        disabled={command.disabled}
                      >
                        <div>
                          <div className="font-medium">{command.name}</div>
                          <div className="text-sm text-light-700 dark:text-dark-200">
                            {command.description}
                          </div>
                        </div>
                        {command.shortcut && (
                          <div className="flex items-center justify-center px-2 py-1 text-xs rounded bg-light-400/30 dark:bg-dark-400/30 text-light-700 dark:text-dark-200">
                            {command.shortcut}
                          </div>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
