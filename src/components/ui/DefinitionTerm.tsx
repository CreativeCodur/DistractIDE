import React from 'react';
import DefinitionTermFixed from './DefinitionTermFixed';

interface DefinitionTermProps {
  term: string;
  children: React.ReactNode;
}

// This is a wrapper component that uses DefinitionTermFixed
// It's kept for backward compatibility
const DefinitionTerm: React.FC<DefinitionTermProps> = ({ term, children }) => {
  return (
    <DefinitionTermFixed term={term}>
      {children}
    </DefinitionTermFixed>
  );
};

export default DefinitionTerm;
