import React from 'react';
import GlassButton from './GlassButton';
import { FiClock } from 'react-icons/fi';

interface RoundsSelectorFixedProps {
  selectedRounds: number;
  onChange: (rounds: number) => void;
  disabled?: boolean;
}

const RoundsSelectorFixed: React.FC<RoundsSelectorFixedProps> = ({
  selectedRounds,
  onChange,
  disabled = false
}) => {
  // Options for training rounds
  const roundsOptions = [
    { value: 1, label: '1 Round', time: '10-20 seconds' },
    { value: 2, label: '2 Rounds', time: '20-40 seconds' },
    { value: 3, label: '3 Rounds', time: '20-40 seconds' },
    { value: 4, label: '4 Rounds', time: '40-50 seconds' },
    { value: 5, label: '5 Rounds', time: '40-50 seconds' }
  ];

  const handleClick = (value: number) => {
    console.log('Button clicked with value:', value);
    onChange(value);
  };

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2 text-light-700 dark:text-dark-200">
        How many rounds do you want to train?
      </h3>
      <div className="flex flex-wrap gap-2">
        {roundsOptions.map((option) => (
          <GlassButton
            key={option.value}
            onClick={() => handleClick(option.value)}
            className={`flex items-center ${
              selectedRounds === option.value ? 'border-theme bg-theme-light' : ''
            }`}
            disabled={disabled}
          >
            <span className="mr-2">{option.label}</span>
            <span className="text-xs flex items-center text-light-600 dark:text-dark-300">
              <FiClock className="mr-1" />
              {option.time}
            </span>
          </GlassButton>
        ))}
      </div>
    </div>
  );
};

export default RoundsSelectorFixed;
